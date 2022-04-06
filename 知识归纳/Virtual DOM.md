`Virtual DOM`是一个JS对象，且最少包含`tag`、`props`和`children`三个属性。不同框架对这三个属性命名有所差异，但表达意思一致。分别指标签名(`tag`)、属性(`props`)和子元素对象(`children`)。

eg:
```
{
    tag: 'div',
    props: {},
    children: [
        'Hello World',
        {
          tag: 'span',
          props: {
            id: 'spanId-1',
            class: 'spanClass-1'
          },
          children: ['Virtual DOM']
        }
      ]
    }

    <div>
      Hello World
      <span id="spanId-1" class="spanClass-1">
        Virtual DOM
      </span>
    </div>
```


`Virtural DOM`和`DOM`对象一一对应，上面的`Virtural DOM`由下面的`HTML`生成。换而言之，一个`DOM`对象，生成一个由`tag`、`props`和`children`三个属性组成的`Virtural DOM`，剔除了其他复杂的内容。

`Virtural DOM`最大的特点是将页面的状态抽象为JS对象的形式，配合不同的渲染工具，实现跨平台渲染(服务端渲染，浏览器渲染，移动端渲染等)。^[理解：`Virtural DOM`作为以三个属性的对象，配合不同渲染工具的调用。]

在进行页面更新时，借助`Virtural DOM`，`DOM`元素的改变可在内存中进行比较，再结合框架的事务机制将多次比较结果合并后一次性更新到页面，从而有效地减少页面渲染的次数，提高渲染效率。