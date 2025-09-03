// client/src/app/services/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizConfig } from '../_models/quiz';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  constructor(private http: HttpClient) {}
  async load(): Promise<QuizConfig> {
    return await firstValueFrom(this.http.get<QuizConfig>('http://localhost:4000/api/config'));
  }
}
