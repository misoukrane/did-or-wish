import {Component, Input } from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'list-form',
  templateUrl: './components/list-form/list-form.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  styleUrls: ['./components/list-form/list-form.css']
})

export class ListFormCmp {
  public itemText = '';
  @Input('collection-ref') private ref: Firebase;

  onKey(event) {
    if (event.keyCode === 13) {
      if (event.target.value.trim().length !== 0) {
        this.addItem(event.target.value.trim());
      }
    }
  }

  addItem(text:string) {
    this.ref.push(text);
    this.itemText = '';
  }
}
