import { PreloadScene } from './scenes/PreloadScene';
import { OnboardingScene } from './scenes/OnboardingScene';
import { LanguageSelectionScene } from './scenes/LanguageSelectionScene';
import { AgeSelectionScene } from './scenes/AgeSelectionScene';
import { DifficultySelectionScene } from './scenes/DifficultySelectionScene';
import { CategorySelectionScene } from './scenes/CategorySelectionScene';
import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
        }
    },
    scene: [
        PreloadScene,
        OnboardingScene,
        LanguageSelectionScene,
        AgeSelectionScene,
        DifficultySelectionScene,
        CategorySelectionScene,
        GameScene
    ]
};

new Phaser.Game(config);
