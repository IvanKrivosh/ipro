import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Инвест-Программа';

  forms = [
    { link: 'tituls', label: 'Журнал титулов' },
    { link: 'dogs', label: 'Журнал договоров' },
    { link: 'docs', label: 'Журнал документов' }
  ];

}
