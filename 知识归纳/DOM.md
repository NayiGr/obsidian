getElement(s)Byxxxx获取的是动态集合，querySelector获取的是静态集合


浏览器url地址：window.location.href
服务器+域名： https://www.baidu.com/ => www(服务器)，baidu.com(域名)
获取url地址参数：window.location.href.split('?')[1].split('&')	// 等号右边为参数值

substr()：		起始，长度（包含开始索引）
substring()：	起始，结尾（包含开始索引，不包含结束索引）
slice()：		起始，结尾（包含开始索引，不包含结束索引，可负值：倒序）
split()：		（划分成数组）