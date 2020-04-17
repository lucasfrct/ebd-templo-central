/*
 * slider.directive.ts
 * Autor: Lucas Costa
 * Data: Março de 2020
 */
import { Directive, OnInit, ElementRef, Input } from '@angular/core'

declare let M: any

@Directive({
    selector: ".slider"
})

export class SliderDirective implements OnInit {
    
    private element: any
    private native: any
    private instanceSlider: any

    public constructor(private el: ElementRef) {
        this.element = el
        this.native = el.nativeElement
    }
    
    ngOnInit() {
        this.instanceSlider = M.Slider.init(this.native, { indicators: true}) 
        this.instanceSlider.start()
    }

    @Input() set next(control: any) {
        setTimeout(()=> {
            ("true" == String(control)) ? this.instanceSlider.next() : ""
        }, 10)
    }

    @Input() set prev(control: any) {
        setTimeout(()=> {
            ("true" == String(control)) ? this.instanceSlider.prev() : ""
        }, 10)
    }
}