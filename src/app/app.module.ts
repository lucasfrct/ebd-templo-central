import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { SidenavDirective } from './shared/sidenav/sidenav.directive'
import { SliderDirective } from './shared/slider/slider.directive'
import { CarouselDirective } from './shared/carousel/carousel.directive'

import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './modules/home/home.component';

@NgModule({
    declarations: [
        SidenavDirective,
        SliderDirective,
        CarouselDirective,
        HeaderComponent,
        FooterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [HeaderComponent, HomeComponent, FooterComponent]
})

export class AppModule { }
