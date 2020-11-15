import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CodemirrorComponent, CodemirrorModule} from '@ctrl/ngx-codemirror';
import {FormsModule} from '@angular/forms';
import {DialogSettingsComponent, EditorComponent} from './editor/editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { CookieService } from 'ngx-cookie-service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DialogSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CodemirrorModule,
    FormsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
