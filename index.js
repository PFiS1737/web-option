export class WebOption {
    constructor(namespace = "WebOption") {
        this._namespace = namespace
        this.items = {}
    }
    init(...handlers) {
        this.getStorage()
        this.setStorage()
        let initResult = this.getItemValMap()
        handlers.forEach(handler => handler(initResult))
        this.addItem = undefined
        this.getStorage = undefined
        this.init = undefined
    }
    addItem(name, values, handler, defaultValue) {
        this.items[name] = new OptionItem(name, values, handler, defaultValue)
        return this
    }
    hasItem(name) {
        return this.getItem(name) ? true : false
    }
    getItem(name) {
        return this.items[name]
    }
    setItemVal(name, value, handler = () => {}) {
        let item = this.getItem(name)
        let result = item?.select(value)
        if (result) handler(item.selected, item.original)
        this.setStorage()
        return this
    }
    toggleItemVal(name) {
        this.getItem(name)?.toggle()
        this.setStorage()
        return this
    }
    getItemVal(name) {
        return this.getItem(name)?.selected
    }
    getItemValMap() {
        let result = {}
        forEachObject(this.items, key => result[key] = this.getItemVal(key))
        return result
    }
    setStorage() {
        let storage = this.getItemValMap()
        localStorage.setItem(this._namespace + ":all", JSON.stringify(storage))
    }
    getStorage() {
        let storage = JSON.parse(localStorage.getItem(this._namespace + ":all") ?? "{}")
        forEachObject(storage, (key, value) => this.setItemVal(key, value))
    }
}

class OptionItem {
    constructor(name, values = [], handler = () => {}, defaultValue) {
        this.name = name
        this.values = new Set(values)
        this.handler = handler
        this.selected = this.hasVal(defaultValue) ? defaultValue : values[0]
        this.original = undefined
        handler(this.selected)
    }
    select(value) {
        if (this.selected !== value && (this.hasVal(value) || !this.values.size)) {
            this.original = this.selected
            this.selected = value
            this.handler(this.selected, this.original)
            return true
        }
        else return false
    }
    toggle() {
        let _values = [...this.values]
        for (let i = 0; i < _values.length; i++) {
            let item = _values[i]
            if (this.selected === item) {
                if (i < _values.length - 1) this.select(_values[i + 1])
                else this.select(_values[0])
                break
            }
        }
    }
    addVal(value) {
        this.values.add(value)
        return this
    }
    delVal(value) {
        this.values.delete(value)
        return this
    }
    hasVal(value) {
        return this.values.has(value)
    }
}

function forEachObject(obj, callback, thisArg = this) {
    Object.keys(obj).forEach((key, i) => {
        let value = obj[key]
        callback.call(thisArg, key, value, i, obj)
    })
}