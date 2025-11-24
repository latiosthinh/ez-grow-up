import { GameManager } from './GameManager';

export interface LevelData {
    id: number;
    letters: string[];
    // Potential for more data: background, specific audio, etc.
}

export class LevelManager {
    private static instance: LevelManager;
    private currentLevelIndex: number = 0;

    private constructor() { }

    public static getInstance(): LevelManager {
        if (!LevelManager.instance) {
            LevelManager.instance = new LevelManager();
        }
        return LevelManager.instance;
    }

    public getCurrentLevel(): LevelData {
        return this.generateLevel();
    }

    private generateLevel(): LevelData {
        const difficulty = GameManager.getInstance().getDifficulty();
        const category = GameManager.getInstance().getCategory();

        let pool: string[] = [];
        if (category === 'abc') {
            pool = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        } else if (category === '123') {
            pool = ['1', '2', '3', '4', '5', '6', '7'];
        } else {
            pool = ['A', 'B', 'C', '1', '2', '3', 'X', 'Y', 'Z'];
        }

        // Shuffle and pick 'difficulty' number of items
        const shuffled = pool.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, difficulty);

        return {
            id: this.currentLevelIndex + 1,
            letters: selected
        };
    }

    public nextLevel(): boolean {
        this.currentLevelIndex++;
        // Infinite levels for now
        return true;
    }

    public reset() {
        this.currentLevelIndex = 0;
    }
}
