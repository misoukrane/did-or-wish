import {Component, ViewEncapsulation} from 'angular2/Core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES,
  Router
} from 'angular2/router';
// import {HTTP_PROVIDERS} from 'http/http';

import {AboutCmp} from '../about/about';
import {DashboardCmp} from '../dashboard/dashboard';
import {HomeCmp} from '../home/home';
import {ListCmp} from '../list/list';
import {SignInCmp} from '../signIn/signIn';
import {REF} from '../../constants/references';

@Component({
  selector: 'app',
  templateUrl: './components/app/app.html',
  styleUrls: ['./components/app/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/about', component: AboutCmp, as: 'About' },
  { path: '/dashboard', component: DashboardCmp, as: 'Dashboard' },
  { path: '/list/:id', component: ListCmp, as: 'List' },
  { path: '/sign-in', component: SignInCmp, as: 'Sign-In' }
])
export class AppCmp {
  public authData:any;
  public loggedIn = false;
  private ref = new Firebase(REF);

  public constructor(private router: Router) {
    this.authData = this.ref.getAuth();
    if (this.authData) {
      this.loggedIn = true;
    }
    this.ref.onAuth((authData: FirebaseAuthData) => {
      if (!authData) {
        this.router.navigate(['/Home']);
        this.loggedIn = false;
      } else {
        this.authData = authData;
        this.loggedIn = true;
      }
    });
  }

  signOut() {
    this.ref.unauth();
  }
}
