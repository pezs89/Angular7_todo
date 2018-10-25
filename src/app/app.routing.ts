import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'dummy',
        loadChildren: './dummy/dummy.module#DummyModule'
    }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule { }