import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {

  content = 'int main() {}';
  lineNumber: true;
  option = {
    lineNumbers: true,
    theme: 'material',
    mode: 'clike',
  };

  constructor() {
    this.lineNumber = true;
  }

  submit(): void {
      
  }

  ngOnInit(): void {
  }

}
