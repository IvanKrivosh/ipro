import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TitulsComponent} from './features/forms/tituls/tituls.component';
import {TitulFormComponent} from './features/forms/titul-form/titul-form.component';
import {DocsComponent} from './features/forms/docs/docs.component';
import {DocFormComponent} from './features/forms/doc-form/doc-form.component';
import {DogovorsComponent} from './features/forms/dogovors/dogovors.component';
import {CheckPointComponent} from './features/forms/check-point/check-point.component';
import {CheckPointShComponent} from './features/forms/check-point-sh/check-point-sh.component';
import {RutokentestComponent} from './rutokentest/rutokentest.component';

const routes: Routes = [
  { path: '',   redirectTo: '/tituls', pathMatch: 'full' },
  { path: 'tituls', component: TitulsComponent },
  { path: 'tituls/:id', component: TitulFormComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'docs/:id', component: DocFormComponent },
  { path: 'dogs', component: DogovorsComponent },
  { path: 'tituls/:id/checkpoint', component: CheckPointComponent },
  { path: 'checkpointsh', component: CheckPointShComponent },
  { path: 'rutokentest', component: RutokentestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
