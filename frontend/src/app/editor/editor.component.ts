import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {CodemirrorComponent, CodemirrorModule} from '@ctrl/ngx-codemirror';

interface Settings {
  lineNumbers: boolean;
  theme: string;
  mode: string;
  indentUnit: number;
  tabSize: number;
  readOnly: boolean;
  gccFlags: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  settings: Settings;
  content = 'int main() {\n\t\n}';
  output = [];
  warning = [];
  error = [];
  lineNumber: true;
  option;
  isLoading: boolean;

  constructor(private http: HttpClient, private dialog: MatDialog, private cookieServer: CookieService) {
    this.content = this.cookieServer.get('content');
    this.isLoading = true;
    if (this.cookieServer.check('settings')) {
      console.log('COOCKIE SETTINGS');
      this.settings = JSON.parse(this.cookieServer.get('settings'));
      console.log(this.settings.theme);
    } else {
      console.log('DEFAULT SETTINGS');
      this.settings = {
        lineNumbers: true,
        theme: 'material',
        mode: 'clike',
        indentUnit: 2,
        tabSize: 4,
        readOnly: false,
        gccFlags: '',
      };
    }
    if (this.content?.length === 0) {
      this.content = 'int main() {\n\t\n}';
    }
    this.option = {
      lineNumbers: this.settings?.lineNumbers,
      theme: this.settings?.theme,
      mode: 'clike',
      indentUnit: this.settings?.indentUnit,
      tabSize: this.settings?.tabSize,
      readOnly: false
    };
    this.isLoading = false;
  }

  open(): void {
    const dialog = this.dialog.open(DialogSettingsComponent, {
      data: this.option
    });
    dialog.afterClosed().subscribe(result => {
      this.settings = result;
    });
  }

  async submit(): Promise<void> {
    this.isLoading = true;
    const response: any = await this.http.post('https://app.malloc.studio:3030/uploadjson',
      {content: this.content}, {headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      })}).toPromise();
    console.log(response);
    this.output = response.output?.split('\n');
    this.warning = response.warning?.split('\n');
    this.error = response.error?.split('\n');
    this.cookieServer.set('content', `${this.content}`);
    this.isLoading = false;
  }

  onKeyDown(event: any): void {
    if ((event.key === 'Enter' && event.ctrlKey) || event.key === 'F9') {
      this.submit();
      console.log('submit');
    }
  }
  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-dialog-settings',
  templateUrl: 'dialog-settings.html'
})
export class DialogSettingsComponent{
  theme = ['material', 'idea', 'neo', 'base16-dark', '3024-day', '3024-night', 'yeti', 'zenburn', 'yonce', 'xq-light', 'xq-dark'];
  constructor(public dialogRef: MatDialogRef<DialogSettingsComponent>, @Inject(MAT_DIALOG_DATA) public settings: any, private cookie: CookieService) {
  }
  changeTheme(value: string): void {
    console.log(value);
    this.settings.theme = value;
  }

  save(): void {
    this.cookie.set('settings', JSON.stringify(this.settings));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
