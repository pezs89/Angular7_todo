import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DummyComponent } from "./dummy.component";

const routes: Routes = [
    {
        path: '',
        component: DummyComponent
    },
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class DummyRoutingModule { }