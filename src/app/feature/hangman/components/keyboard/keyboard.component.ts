import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LETTERS_ARRAY } from '../../constants/letters';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-keyboard',
  imports: [MatButton, MatButtonModule],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class KeyboardComponent {
  word = input.required<string>();
  selectedLetters = input.required<Set<string>>();

  letterSelected = output<string>();

  letters = LETTERS_ARRAY;

  onLetterSelected(letter: string): void {
    this.letterSelected.emit(letter);
  }
}
