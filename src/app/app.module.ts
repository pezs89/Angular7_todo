import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }