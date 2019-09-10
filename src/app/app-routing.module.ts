import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TitulsComponent} from "./features/forms/tituls/tituls.component";
import {DocsComponent} from "./features/forms/docs/docs.component";


const routes: Routes = [
  { path: 'tituls', component: TitulsComponent },
  { path: 'docs', component: DocsComponent },
  { path: '',   redirectTo: '/tituls', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
