import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { References } from '../../services/references';

@Component({
  selector: 'home',
  templateUrl: './components/signIn/signIn.html',
  styleUrls: ['./components/signIn/signIn.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SignInCmp {
  private ref: Firebase;

  public constructor(private router: Router, private references:References) {
    this.ref = this.references.getGlobalRef();
    if (this.ref.getAuth()) {
      this.router.navigate(['/Dashboard']);
    }
  }

  onOAuth(provider) {
    this.ref.authWithOAuthPopup(provider, (error) => {
      if (error) {
        console.log(error);
      } else {
        this.references.getUserRef().update({info: this.ref.getAuth()}, (err) => {
          this.router.navigate(['/Dashboard']);
        });
      }
    });
  }
}
