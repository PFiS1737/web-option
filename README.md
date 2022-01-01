# web-option

> 一个在 localStorage 中管理页面设置的简单解决方案。  
> A simple solution to manage page settings in localStorage.

## 注意 | Attention
- 由于 localStorage 是同步操作的，所以不要储存过大的数据，否则会造成页面卡顿
- Demo: [demo.html](https://PFiS1737.github.io/web-option/demo.html)

## 使用 | Use

```html
<script type="module">
    import { WebOption } from "./index.js"
    let wo = new WebOption()
    wo.addItem("foo", ["foo1", "foo2", "foo3", "foo4","foo5"], (selected, original) => {
        console.log("foo -> from", original, "to", selected)
    }).addItem("bar", ["bar1", "bar2", "bar3", "bar4"], (selected, original) => {
        console.log("bar -> from", original, "to", selected)
    }).init(initResult => console.log({initResult}))
    window.wo = wo
</script>
```

- Class `WebOption(namespace)`
    - 生成一个 WebOption 实例
    - 参数
        - namespace: `string`  
          设置在 `localStorage` 中储存的名称
    - 返回值: `WebOption`
- `WebOption.init(...handlers)`
    - 初始化（在执行完 `init()` 后将不能再次执行）
    - 参数
        - handlers: `Function(initResult)`  
          设置在初始化结束后执行的函数，接受一个参数，是对 `WebOption.getItemValMap()` 的引用
    - 返回值: `void`
- `WebOption.addItem(name, values, handler)`
    - 添加设置（在执行完 `init()` 后将不能再次执行）
    - 参数
        - name: `string`  
          指定设置名称
        - values: `Array`  
          设置所有允许的参数
        - handler: `Function(selected, original)`  
          指定在每次成功更改该设置的值时执行的函数，接受两个参数，分别是刚设置的值和原先的值。在设置完后会自动执行一次，此时仅有一个参数，为传入的 `values` 的第一个元素。
    - 返回值: `WebOption`
- `WebOption.hasItem(name)`
    - 检测是否有指定名称的设置
    - 参数
        - name: `string`  
          指定设置名称
    - 返回值: `bealoon`
- `WebOption.getItem(name)`
    - 获得对应名称的 OptionItem 实例
    - 参数
        - name: `string`  
          指定设置名称
    - 返回值: `OptionItem`
- `WebOption.setItemVal(name, value, handler)`
    - 设置对应设置的值
    - 参数
        - name: `string`  
          指定设置名称
        - values: any possible  
          指定要设置的值，在满足以下条件时设置成功，并执行 `handler`  
          ```
          与已选的值不同
          该值在 `addItem` 时设置的 `values` 中 或 在设置 `values` 时，将其设为 `[]`
          ```
        - handler: `Function(selected, original)`  
          指定在更改成功时执行的函数，接受两个参数，分别是刚设置的值和原先的值
    - 返回值: `WebOption`
- `WebOption.toggleItemVal(name)`
    - 切换对应设置的值
    - 参数
        - name: `string`  
          指定设置名称
    - 返回值: `WebOption`
- `WebOption.getItemVal(name)`
    - 获得对应设置的值
    - 参数
        - name: `string`  
          指定设置名称
    - 返回值: anything possible
- `WebOption.getItemValMap()`
    - 获得所有设置的值
    - 返回值: `Object`
- `WebOption.setStorage()`
    - 将设置添加到 localStorage
    - 返回值: `void`
- `WebOption.getStorage()`
    - 从 localStorage 读取设置（在执行完 `init()` 后将不能再次执行）
    - 返回值: `void`