import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { WordsService } from './services/words.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InfoComponent } from './components/info/info.component';
import { MatDialog } from '@angular/material/dialog';
import { GameResultDialogComponent } from './dialogs/game-result-dialog/game-result-dialog.component';

@Component({
  selector: 'app-hangman',
  imports: [KeyboardComponent, InfoComponent],
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [WordsService],
})
export class HangmanComponent implements OnInit {
  private readonly wordsService = inject(WordsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  protected readonly allLevels = 5;
  protected readonly maxIncorrectLetters = 6;

  readonly word = signal<string>('');
  readonly words = signal<string[]>([]);

  readonly selectedLetters = signal<Set<string>>(new Set());
  readonly incorrectLetters = signal<number>(0);

  readonly secondsPassed = signal<number>(0);
  readonly level = signal<number>(0);

  readonly containsAllLetters = computed(() => {
    return this.word()
      ? this.word()
          .split('')
          .every(letter => this.selectedLetters().has(letter))
      : false;
  });

  ngOnInit(): void {
    setInterval(() => {
      this.secondsPassed.update(secondsPassed => secondsPassed + 1);
    }, 1000);

    this.startGame();
  }

  onLetterSelected(letter: string): void {
    this.selectedLetters.update(letters => {
      const newLetters = new Set(letters);
      newLetters.add(letter);
      return newLetters;
    });

    if (!this.word().includes(letter)) {
      this.incorrectLetters.update(incorrectLetters => incorrectLetters + 1);

      if (this.incorrectLetters() >= this.maxIncorrectLetters) {
        this.openGameResultDialog(
          'You lost',
          `Word: ${this.word()}`,
          this.secondsPassed()
        );
      }
    } else if (this.containsAllLetters()) {
      if (this.level() === this.allLevels) {
        this.openGameResultDialog(
          'You won!',
          'You have completed all levels!',
          this.secondsPassed()
        );
      } else {
        this.startNewLevel();
      }
    }
  }

  startNewGame(): void {
    this.words.set([]);
    this.word.set('');
    this.selectedLetters.set(new Set());
    this.incorrectLetters.set(0);
    this.level.set(0);
    this.secondsPassed.set(0);
    this.startGame();
  }

  private startGame(): void {
    this.wordsService
      .getRandomWords()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(words => {
        console.log(words);
        this.words.set(words.map(word => word.toUpperCase()));
        this.startNewLevel();
      });
  }

  startNewLevel(): void {
    if (this.level() < this.allLevels) {
      this.word.set(this.words()[this.level()]);
      this.selectedLetters.set(new Set());
      this.incorrectLetters.set(0);
      this.level.update(stage => stage + 1);
    } else {
      this.openGameResultDialog(
        'Congratulations!',
        'You have guessed all words',
        this.secondsPassed()
      );
    }
  }

  private openGameResultDialog(
    title: string,
    message: string,
    secondsPassed: number
  ): void {
    const dialogRef = this.dialog.open(GameResultDialogComponent, {
      data: {
        title,
        message,
        secondsPassed,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.startNewGame();
    });
  }
}
