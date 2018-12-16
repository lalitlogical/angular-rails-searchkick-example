import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileListComponent } from './mobile-list/mobile-list.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: MobileListComponent  },
    { path: 'mobiles', component: MobileListComponent },
    { path: 'mobiles/:id', component: MobileDetailComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
