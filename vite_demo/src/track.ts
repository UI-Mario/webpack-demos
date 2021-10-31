export default class Track {
    private id:number
    private top:number
    private unit:string
    public el:HTMLElement
    public bulletArray:[] = []

    constructor(id) {
        this.id = id
        this.el = document.createElement('div')
    }
    mount(targetEl, top, height, unit) {

        this.el.style['width'] = '100%'
        this.el.style['height'] = height + unit
    }
}