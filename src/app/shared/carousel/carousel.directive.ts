/*
 * carousel.directive.ts
 * Autor: Lucas Costa
 * Data: Março de 2020
 */

 import { Directive, OnInit, ElementRef, Input, ɵConsole } from '@angular/core'
 
 declare let M: any

 @Directive({
     selector: '.carousel'
 })

 export class CarouselDirective implements OnInit {
    
    private element: any
    private native: any
    private instanceCarousel: any

    public constructor(private el: ElementRef) {
        this.element = el
        this.native = el.nativeElement
    }

    public ngOnInit() { 
        this.instanceCarousel = M.Carousel.init(this.native, { fullWidth: true, indicators: true,})
    }
 }