import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms"
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { StudentiComponent } from './studenti/studenti.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HomeComponent } from './home/home.component';
import {AutorizacijaLoginProvjera} from "./_guards/autorizacija-login-provjera.service";
import { NotFoundComponent } from './not-found/not-found.component';
import { StudentMaticnaknjigaComponent } from './student-maticnaknjiga/student-maticnaknjiga.component';
import { StudentEditComponent } from './studenti/student-edit/student-edit.component';
import { PostavkeProfilaComponent } from './postavke-profila/postavke-profila.component';
import {DatePipe} from "@angular/common";
@NgModule({
  declarations: [
    AppComponent,
    StudentiComponent,
    LoginComponent,
    RegistracijaComponent,
    HomeComponent,
    NotFoundComponent,
    StudentMaticnaknjigaComponent,
    StudentEditComponent,
    PostavkeProfilaComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'studenti', component: StudentiComponent, canActivate:[AutorizacijaLoginProvjera]},
      {path: 'student-edit/:id', component: StudentEditComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registracija', component: RegistracijaComponent},
      {path: 'student-maticnaknjiga/:id', component: StudentMaticnaknjigaComponent},
      {path: 'home', component: HomeComponent, canActivate: [AutorizacijaLoginProvjera]},
      {path: 'postavke-profila', component: PostavkeProfilaComponent, canActivate: [AutorizacijaLoginProvjera]},
      {path: '**', component: NotFoundComponent, canActivate: [AutorizacijaLoginProvjera]},
    ]),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    AutorizacijaLoginProvjera,DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }