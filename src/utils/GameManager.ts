import { GameConfig } from './GameConfig';

export interface GameSessionState {
    language: string;
    age: number;
    difficulty: number; // Number of items (1-4)
    category: string; // 'abc', '123', 'random', etc.
}

export class GameManager {
    private static instance: GameManager;
    private sessionState: GameSessionState;

    private constructor() {
        this.sessionState = {
            language: GameConfig.Languages.English,
            age: 2,
            difficulty: 1,
            category: 'random'
        };
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public setLanguage(lang: string) {
        this.sessionState.language = lang;
        localStorage.setItem(GameConfig.LocalStorageKeys.Language, lang);
    }

    public getLanguage(): string {
        return this.sessionState.language;
    }

    public setAge(age: number) {
        this.sessionState.age = age;
    }

    public getAge(): number {
        return this.sessionState.age;
    }

    public setDifficulty(count: number) {
        this.sessionState.difficulty = count;
    }

    public getDifficulty(): number {
        return this.sessionState.difficulty;
    }

    public setCategory(cat: string) {
        this.sessionState.category = cat;
    }

    public getCategory(): string {
        return this.sessionState.category;
    }
}
