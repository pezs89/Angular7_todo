import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyRoutingModule } from './dummy.routing';
import { DummyComponent } from './dummy.component';

@NgModule({
    imports: [
        CommonModule,
        DummyRoutingModule
    ],
    declarations: [
        DummyComponent
    ]
})

export class DummyModule { }