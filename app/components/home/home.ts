import {Component} from 'angular2/Core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html',
  styleUrls: ['./components/home/home.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class HomeCmp {
  public constructor(private router: Router) {}

  public getStarted() {
    this.router.navigate(['/Sign-In']);
  }
}
