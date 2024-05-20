import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyClientsComponent } from './components/my-clients/my-clients.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },
  { path: 'pocetna', component: HomepageComponent },
  { path: 'clients', component: MyClientsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
