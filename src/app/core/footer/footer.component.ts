import { Component} from '@angular/core';

import { CurrentStatus } from 'src/app/currentStatus';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  //STATUS
    public currentYear=CurrentStatus.currentYear;
    public currentVersion=CurrentStatus.currentVersion;
//MAIN
  constructor() { }
}