import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BoatListComponent } from './boat-list/boat-list.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { EditBoatComponent } from './edit-boat/edit-boat.component';
import { BoatDetailComponent } from './boat-detail/boat-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoatListComponent,
    AddBoatComponent,
    EditBoatComponent,
    BoatDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
