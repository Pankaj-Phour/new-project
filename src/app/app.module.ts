import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpInterceptorService } from './services/http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NotifyComponent } from './notify/notify.component';
import { NotificationComponent } from './notification/notification.component';
import { CatalogueComponent, singleFIlterComponent } from './catalogue/catalogue.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { NewLoginComponent } from './new-login/new-login.component';
import { VideosComponent } from './videos/videos.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { CommentsComponent } from './comments/comments.component';
import { RelatedVideosComponent } from './related-videos/related-videos.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CreditCardDirective } from './directives/credit-card.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotifyComponent,
    NotificationComponent,
    CatalogueComponent,
    CreateProfileComponent,
    NewLoginComponent,
    VideosComponent,
    SingleVideoComponent,
    CommentsComponent,
    RelatedVideosComponent,
    CardDetailsComponent,
    singleFIlterComponent,
    CreditCardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTooltipModule,
    MatRadioModule,
    MatDividerModule,
    MatToolbarModule,
    MatSelectModule,
    FlexLayoutModule,
    MatMenuModule

  ],
  providers: [ HttpInterceptorService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    // CookieService 
  ],
  bootstrap: [AppComponent],
  entryComponents:[singleFIlterComponent]
})
export class AppModule { }
