/*
 * sidenav.directive.ts
 * Autor: Lucas Costa
 * Data: Março de 2020
 */
import { Directive, OnInit, ElementRef, Input } from '@angular/core'

declare let M: any

@Directive({
    selector: '.sidenav',
})

export class SidenavDirective implements OnInit {

    private instanceSidenav: any
    private element: any
    private native: any
    
    public constructor(private el: ElementRef) {
        this.element = el
        this.native = el.nativeElement
    }

    ngOnInit(){
        this.instanceSidenav = M.Sidenav.init(this.native)
     }

    @Input() set control(control: any) {
        ("true" == String(control)) ? this.instanceSidenav.open() : this.instanceSidenav.close()
    }
}