import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class WordsService {
  private readonly http = inject(HttpClient);
  protected readonly url = 'assets/answers.json';

  getAnswers(): Observable<any> {
    return this.http.get(this.url);
  }

  getRandomWords(): Observable<string[]> {
    return this.getAnswers().pipe(
      map(words => {
        const shuffledWords = words.sort(() => Math.random() - 0.5);
        return shuffledWords.slice(0, 5); // Always return 5 words
      })
    );
  }
}
