export interface LevelData {
    id: number;
    letters: string[];
    // Potential for more data: background, specific audio, etc.
}

export class LevelManager {
    private static instance: LevelManager;
    private levels: LevelData[] = [];
    private currentLevelIndex: number = 0;

    private constructor() {
        this.loadLevels();
    }

    public static getInstance(): LevelManager {
        if (!LevelManager.instance) {
            LevelManager.instance = new LevelManager();
        }
        return LevelManager.instance;
    }

    private loadLevels() {
        // Mock levels
        this.levels = [
            { id: 1, letters: ['A', 'B', 'C'] },
            { id: 2, letters: ['D', 'E', 'F'] },
            { id: 3, letters: ['G', 'H', 'I'] }
        ];
    }

    public getCurrentLevel(): LevelData {
        return this.levels[this.currentLevelIndex];
    }

    public nextLevel(): boolean {
        if (this.currentLevelIndex < this.levels.length - 1) {
            this.currentLevelIndex++;
            return true;
        }
        return false;
    }

    public reset() {
        this.currentLevelIndex = 0;
    }
}
