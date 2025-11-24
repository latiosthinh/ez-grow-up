import { GameConfig } from './GameConfig';

export class LanguageManager {
    private static instance: LanguageManager;

    private constructor() { }

    public static getInstance(): LanguageManager {
        if (!LanguageManager.instance) {
            LanguageManager.instance = new LanguageManager();
        }
        return LanguageManager.instance;
    }

    public setLanguage(lang: string): void {
        if (lang !== GameConfig.Languages.English && lang !== GameConfig.Languages.Vietnamese) {
            console.error('Invalid language selected');
            return;
        }
        localStorage.setItem(GameConfig.LocalStorageKeys.Language, lang);
        console.log(`Language set to: ${lang}`);
    }

    public getLanguage(): string {
        return localStorage.getItem(GameConfig.LocalStorageKeys.Language) || GameConfig.Languages.English;
    }
}
