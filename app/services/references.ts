import {Injectable} from 'angular2/core';
import {REF} from '../constants/references';

@Injectable()
export class References {
  private auth:FirebaseAuthData;
  private ref:Firebase;

  constructor() {
    this.ref = new Firebase(REF);
    this.ref.onAuth((authData) => {
      this.auth = authData;
    });
  }

  getGlobalRef() {
    return this.ref;
  }

  getUserRef() {
    return new Firebase(REF+'/users/'+this.auth.uid) ;
  }

  getListsRef() {
    return this.getUserRef().child('lists') ;
  }

  getListRef(listId: string) {
    return this.getListsRef().child(listId);
  }

    getItemRef(listId: string, collectionName: string, itemId: string) {
    return this.getListRef(listId).child(collectionName).child(itemId) ;
  }
}
