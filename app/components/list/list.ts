import { Component } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { ItemCmp } from '../item/item';
import { ListFormCmp } from '../list-form/list-form';
import { NavigationCmp } from '../Navigation/Navigation';
import { References } from '../../services/references';

@Component({
  selector: 'list',
  templateUrl: './components/list/list.html',
  styleUrls: ['./components/list/list.css'],
  directives: [ItemCmp, ListFormCmp, NavigationCmp, NgFor]
})
export class ListCmp {
  public listRef:Firebase;
  public createdAt:number;
  public didCollectionRef: Firebase;
  public wishCollectionRef: Firebase;
  public shouldntCollectionRef: Firebase;
  public didCollection: Array<FirebaseDataSnapshot>;
  public wishCollection: Array<FirebaseDataSnapshot>;
  public shouldntCollection: Array<FirebaseDataSnapshot>;
  public didItem = '';
  private listId: string;
  public constructor(private router: Router, private params: RouteParams, private references: References) {
    this.listId = this.params.get('id');
    this.listRef = this.references.getListRef(this.listId);
    this.listRef.on('value', (dataSnapShot: FirebaseDataSnapshot, prevChildName: string)=> {
      this.createdAt = dataSnapShot.child('createdAt').val();
      this.didCollectionRef = dataSnapShot.child('did').ref();
      this.wishCollectionRef = dataSnapShot.child('wish').ref();
      this.shouldntCollectionRef = dataSnapShot.child('shouldnt').ref();
      this.didCollection = [];
      dataSnapShot.child('did').forEach((child: FirebaseDataSnapshot) => {
        this.didCollection.push(child);
      });
      this.wishCollection = [];
      dataSnapShot.child('wish').forEach((child: FirebaseDataSnapshot) => {
        this.wishCollection.push(child);
      });
      this.shouldntCollection = [];
      dataSnapShot.child('shouldnt').forEach((child: FirebaseDataSnapshot) => {
        this.shouldntCollection.push(child);
      });
    });
  }
}
