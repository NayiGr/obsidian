import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

import * as Msal from 'msal';
import {AuthenticationParameters, Configuration, Constants, WindowUtils} from 'msal';
import {buildConfiguration} from 'msal/lib-commonjs/Configuration';
import {AuthResponse, buildResponseStateOnly} from 'msal/lib-commonjs/AuthResponse';
import {Account} from 'msal/lib-commonjs/Account';
import {ServerRequestParameters} from 'msal/lib-commonjs/ServerRequestParameters';
import TelemetryManager from 'msal/lib-commonjs/telemetry/TelemetryManager';
import ApiEvent, {API_EVENT_IDENTIFIER} from 'msal/lib-commonjs/telemetry/ApiEvent';
import {TrustedAuthority} from 'msal/lib-commonjs/authority/TrustedAuthority';
import {AuthorityFactory} from 'msal/lib-commonjs/authority/AuthorityFactory';
import {DEFAULT_AUTHORITY, ErrorCacheKeys, InteractionType} from 'msal/lib-commonjs/utils/Constants';
import {RequestUtils} from 'msal/lib-commonjs/utils/RequestUtils';
import {UrlUtils} from 'msal/lib-commonjs/utils/UrlUtils';
import {AuthCache} from 'msal/lib-commonjs/cache/AuthCache';
import {AuthError} from 'msal/lib-commonjs/error/AuthError';
import {ClientAuthError, ClientAuthErrorMessage} from 'msal/lib-commonjs/error/ClientAuthError';

import {AuthService} from '../auth.service';
import {CacheService} from '../../core/providers/cache.service';

@Injectable()
export class AzureLoginService {
  private isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
  public msalConfig: any = {
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: this.isIE, // set to true for IE 11
    },
    scopes: ['User.Read', 'openid', 'profile', 'offline_access'],
    unprotectedResources: ['https://www.microsoft.com/en-us/'],
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ])
  };

  private app;
  private cacheStorage: AuthCache;
  private clientId;
  private config: Configuration;
  private telemetryManager: TelemetryManager;
  private authorityInstance: any;

  private set authority(val: string) {
    this.authorityInstance = AuthorityFactory.CreateInstance(val, this.config.auth.validateAuthority);
  }

  private get authority(): string {
    return this.authorityInstance.CanonicalAuthority;
  }

  constructor(private http: HttpClient,
              private authService: AuthService,
              private inAppBrowser: InAppBrowser,
              private cache: CacheService) {
  }

  azureLogin(token): Promise<any> {
    return new Promise ((resolve,reject) => {
      this.http.post('azureLogin', `\"${token}\"`)
        .subscribe((res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err);
        });
    });
  }

  public getLoginConfig(appGuid): Promise<any> {
    let params = {appId: appGuid};
    return new Promise<any>(async (resolve, reject) => {
      await this.http.post('adLoginConfig', null, {params})
        .subscribe((res: any) => {
          if(res.isSuccess) {
            this.config = {
              auth: {
                clientId:  res.aadConfig.appId,
                authority:  `${res.aadConfig.authority}/${res.aadConfig.tenant}`,
                validateAuthority:  true,
                redirectUri: res.aadConfig.redirecUrl,
  
              },
              cache: this.msalConfig.cache,
              framework: {
                isAngular: true,
                unprotectedResources: this.msalConfig.unprotectedResources,
                protectedResourceMap: this.msalConfig.protectedResourceMap
              }
            };
            this.app = new Msal.UserAgentApplication(this.config);
            resolve(res);
          } else {
            reject(res.message);
          }
        }, err => {
          reject(err);
        });
    })
  }

  initAzureLoginConfiguration() {
    this.config = buildConfiguration(this.config);
    this.clientId = this.config.auth.clientId;
    this.telemetryManager = TelemetryManager.getTelemetrymanagerStub(this.clientId, this.config.system.logger);
    TrustedAuthority.setTrustedAuthoritiesFromConfig(this.config.auth.validateAuthority, this.config.auth.knownAuthorities);
    AuthorityFactory.saveMetadataFromConfig(this.config.auth.authority, this.config.auth.authorityMetadata);
    this.authority = this.config.auth.authority || DEFAULT_AUTHORITY;
    this.cacheStorage = new AuthCache(this.clientId, "localStorage", true);
    // check if back button is pressed
    WindowUtils.checkIfBackButtonIsPressed(this.cacheStorage);
  }

  async loginPopup(userRequest?: AuthenticationParameters): Promise<AuthResponse> {
    // validate request
    const request: AuthenticationParameters = RequestUtils.validateRequest(userRequest, true, this.clientId, Constants.interactionTypePopup);
    const apiEvent: ApiEvent = this.telemetryManager.createAndStartApiEvent(request.correlationId, API_EVENT_IDENTIFIER.LoginPopup);
    this.cache.setCache('correlation', request.correlationId);

    return new Promise<AuthResponse>((resolve, reject) => {
      this.acquireTokenInteractive(Constants.interactionTypePopup, request, resolve, reject);
    })
      .then((resp) => {
        console.log("Successfully logged in");
        this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, true);
        return resp;
      })
      .catch((error: AuthError) => {
        this.cacheStorage.resetTempCacheItems(request.state);
        this.telemetryManager.stopAndFlushApiEvent(request.correlationId, apiEvent, false, error.errorCode);
        throw error;
      });
  }

  private async acquireTokenInteractive(interactionType: InteractionType, request: AuthenticationParameters, resolve?: Function, reject?: Function) {
    // block the request if made from the hidden iframe
    WindowUtils.blockReloadInHiddenIframes();
    const interactionProgress = this.cacheStorage.isInteractionInProgress(false);

    // If already in progress, do not proceed
    if (interactionProgress) {
      const thrownError = ClientAuthError.createLoginInProgressError();
      const stateOnlyResponse = buildResponseStateOnly(this.app.getAccountState(request.state));
      this.cacheStorage.resetTempCacheItems(request.state);
      this.authErrorHandler(interactionType, thrownError, stateOnlyResponse, reject);
      return;
    }

    await this.acquireTokenHelper(null, interactionType, request, resolve, reject);
  }

  private async acquireTokenHelper(account: Account, interactionType: InteractionType, request: AuthenticationParameters, resolve?: Function, reject?: Function): Promise<void> {
    // Track the acquireToken progress
    this.cacheStorage.setInteractionInProgress(true);
    let serverAuthenticationRequest: ServerRequestParameters;
    const acquireTokenAuthority = (request && request.authority) ? AuthorityFactory.CreateInstance(request.authority, this.config.auth.validateAuthority, request.authorityMetadata) : this.authorityInstance;

    try {
      if (!acquireTokenAuthority.hasCachedMetadata()) {
        await AuthorityFactory.saveMetadataFromNetwork(acquireTokenAuthority, this.telemetryManager, request.correlationId);
      }

      // On Fulfillment
      const accountsMatch = Account.compareAccounts(account, this.app.getAccount());
      const responseType: string = ServerRequestParameters.determineResponseType(accountsMatch, request.scopes);

      serverAuthenticationRequest = new ServerRequestParameters(
        acquireTokenAuthority,
        this.clientId,
        responseType,
        this.app.getRedirectUri(request && request.redirectUri),
        request.scopes,
        request.state,
        request.correlationId
      );

      // populate QueryParameters (sid/login_hint) and any other extraQueryParameters set by the developer
      serverAuthenticationRequest.populateQueryParams(account, request);
      // Construct urlNavigate
      const urlNavigate = UrlUtils.createNavigateUrl(serverAuthenticationRequest) + Constants.response_mode_fragment;

      if (interactionType === Constants.interactionTypePopup) {
        try {
          const browser = this.inAppBrowser.create(urlNavigate, '_blank', 'fullscreen=yes,location=no,clearcache=yes,clearsessioncache=yes');
          browser.on('loadstart').subscribe(
            async (event) => {
              if (event.url.startsWith(this.config.auth.redirectUri.toString())) {
                const hash = UrlUtils.GetUrlComponents(event.url).Hash;
                const resInfo = UrlUtils.deserializeHash(hash);
                this.cacheStorage.setInteractionInProgress(false);
                resolve(resInfo);
                browser.close();
              }
            }
          );
        } catch (e) {
          this.app.logger.info(ClientAuthErrorMessage.popUpWindowError.code + ":" + ClientAuthErrorMessage.popUpWindowError.desc);
          this.cacheStorage.setItem(ErrorCacheKeys.ERROR, ClientAuthErrorMessage.popUpWindowError.code);
          this.cacheStorage.setItem(ErrorCacheKeys.ERROR_DESC, ClientAuthErrorMessage.popUpWindowError.desc);
          if (reject) {
            reject(ClientAuthError.createPopupWindowError());
            return;
          }
        }
      }
    } catch (err) {
      this.cacheStorage.resetTempCacheItems(request.state);
      this.authErrorHandler(interactionType, ClientAuthError.createEndpointResolutionError(err.toString), buildResponseStateOnly(request.state), reject);
    }
  }

  private authErrorHandler(interactionType: InteractionType, authErr: AuthError, response: AuthResponse, reject?: Function) : void {
    // set interaction_status to complete
    this.cacheStorage.setInteractionInProgress(false);
    if (interactionType === Constants.interactionTypePopup) {
      reject(authErr);
    } else {
      throw ClientAuthError.createInvalidInteractionTypeError();
    }
  }
}
