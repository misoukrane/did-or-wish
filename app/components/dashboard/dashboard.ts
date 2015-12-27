import {Component} from 'angular2/Core';
import {NgFor} from 'angular2/Common';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {NavigationCmp} from '../navigation/navigation';
import { CustomDate } from '../../pipes/CustomDate';
import { References} from '../../services/references';

@Component({
  selector: 'dashboard',
  templateUrl: './components/dashboard/dashboard.html',
  styleUrls: ['./components/dashboard/dashboard.css'],
  directives: [NavigationCmp, NgFor, ROUTER_DIRECTIVES],
  pipes: [CustomDate]
})
export class DashboardCmp {
  public lists:Array<any>;
  private listsRef:Firebase;

  public constructor(private router: Router, private references: References) {
    this.listsRef = this.references.getListsRef();
    this.listsRef.on('value', (snap: FirebaseDataSnapshot, prev: string) => {
      this.lists = [];
      snap.forEach((childSnap: FirebaseDataSnapshot) => {
        this.lists.push({key: childSnap.key(), value: childSnap.val()});
      });
    });
  }
  onEdit(list: any) {
    this.router.navigate(['List', {id: list.key}]);
  }

  onDelete(list: any) {
    this.references.getListRef(list.key).remove();
  }
}
