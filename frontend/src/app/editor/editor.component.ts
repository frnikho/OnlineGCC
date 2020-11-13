import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  content = 'int main() {\n\t\n}';
  output = [];
  warning = [];
  error = [];
  lineNumber: true;
  option = {
    lineNumbers: true,
    theme: 'material',
    mode: 'clike',
  };

  constructor(private http: HttpClient) {
    this.lineNumber = true;
  }

  async submit(): Promise<void> {
    console.log(this.output === undefined);
    const response: any = await this.http.post('http://localhost:3030/uploadjson', {content: this.content}).toPromise();
    console.log(response);
    this.output = response.output?.split('\n');
    this.warning = response.warning?.split('\n');
    this.error = response.error?.split('\n');
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
