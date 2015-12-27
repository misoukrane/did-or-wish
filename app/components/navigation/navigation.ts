import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { References } from '../../services/references';

@Component({
  selector: 'navigation',
  templateUrl: './components/navigation/navigation.html',
  directives: [ROUTER_DIRECTIVES]
})
export class NavigationCmp {
  private listsRef:Firebase;

  public constructor(private router: Router, private references: References) {
    this.listsRef = this.references.getListsRef();
  }

  createNewList() {
    var newList = this.listsRef.push({
      createdAt: Firebase.ServerValue.TIMESTAMP
    });
    this.router.navigate(['/List', {id: newList.key()}]);
  }
}
