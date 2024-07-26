import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import correct
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { RegisterComponent } from './pages/register/register.component';
import { BoardComponent } from './pages/board/board.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NavbarBurgerComponent } from './pages/navbar-burger/navbar-burger.component';
import { ThemeComponent } from './pages/theme/theme.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleComponent } from './pages/article/article.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/jwt.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { ChatService } from './services/chat.service';
import { WebSocketService } from './services/websocket.service';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnexionComponent,
    RegisterComponent,
    BoardComponent,
    NavbarComponent,
    NavbarBurgerComponent,
    ThemeComponent,
    ArticleComponent,
    CreateArticleComponent,
    ProfilComponent,
    ChatComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule ,MatButtonModule // Assurez-vous que ce module est correctement importé et exporté
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },  WebSocketService,
    ChatService,
  ],
  bootstrap: [AppComponent,ChatComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
