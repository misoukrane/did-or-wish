import {Component, Input, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'item',
  templateUrl: './components/item/item.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  styleUrls: ['./components/item/item.css']
})
export class ItemCmp implements OnInit {
  public text:string;
  public inputText:string;
  public editing = false;
  private itemRef:Firebase;
  @Input('item') private itemDataSnapShot: FirebaseDataSnapshot;

  ngOnInit() {
    this.text = this.itemDataSnapShot.val();
    this.itemRef = this.itemDataSnapShot.ref();
  }

  delete() {
    this.itemRef.remove();
  }

  edit(element) {
    this.inputText = this.text;
    this.editing = true;
    setTimeout(() => {
      element.focus();
      console.log(element);
    }, 100);
  }

  save() {
    var text = this.inputText.trim();
    if (text.length !== 0) {
      this.itemRef.set(text);
    }
    this.editing = false;
  }
}
