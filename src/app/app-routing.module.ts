import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TitulsComponent} from './features/forms/tituls/tituls.component';
import {TitulFormComponent} from './features/forms/titul-form/titul-form.component';
import {DocsComponent} from './features/forms/docs/docs.component';
import {DocFormComponent} from './features/forms/doc-form/doc-form.component';


const routes: Routes = [
  { path: 'tituls', component: TitulsComponent },
  { path: 'docs', component: DocsComponent },
  { path: '',   redirectTo: '/tituls', pathMatch: 'full' },
  { path: 'tituls/:id', component: TitulFormComponent },
  { path: 'docs/:id', component: DocFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
