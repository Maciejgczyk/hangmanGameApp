import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-info',
  imports: [NgClass],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoComponent {
  incorrectLetters = input.required<number>();
  selectedLetters = input.required<Set<string>>();
  word = input.required<string>();
  allLevels = input.required<number>();
  level = input.required<number>();
  maxIncorrectLetters = input.required<number>();

  hiddenSelectedWord = computed(() => {
    return [...this.word()]
      .map(letter => (this.selectedLetters().has(letter) ? letter : '_'))
      .join(' ');
  });

  isLetterCorrect(letter: string): boolean {
    return this.word().includes(letter);
  }
}
