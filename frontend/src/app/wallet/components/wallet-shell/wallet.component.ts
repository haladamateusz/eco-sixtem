import { Component, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  imports: [MatFormField, MatAutocomplete, MatAutocompleteTrigger, FormsModule, MatOption],
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
  filterValue: string = '';

  options: string[] = ['One', 'Two', 'Three'];

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || ''))
    // );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
