import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitedCharacters',
  standalone: true,
})
export class LimitedCharactersPipe implements PipeTransform {
  transform(value: string): string {
    return value.slice(0, 25) + '...';
  }
}
