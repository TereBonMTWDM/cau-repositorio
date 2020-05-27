import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';

//Repositorio:
import { RepositorioGroupComponent } from './components/pages/repositorio/repositorio-group/repositorio-group.component';
import { RepositorioListComponent } from './components/pages/repositorio/repositorio-list/repositorio-list.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'repositorio',          component: RepositorioGroupComponent },
    //{ path: 'listado',          component: RepositorioListComponent },
    { path: 'listado/:tipo',          component: RepositorioListComponent },
    //{ path: '', redirectTo: 'home', pathMatch: 'full' }
    { path: '', redirectTo: 'repositorio', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
