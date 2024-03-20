import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalWrapperComponent } from "./modal-wrapper/modal-wrapper.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'eco-sixtem';

  isFirstVisit = true;

  dialog = inject(MatDialog);

  ngOnInit() {
    if (!localStorage.getItem('isFirstVisit')) {
      // localStorage.setItem('siteVisited', 'true');
      this.dialog.open(ModalWrapperComponent, {
        minWidth: 600,
        maxWidth: 600,
        minHeight: 300
      })
    }

  }
}
