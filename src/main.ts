import './style.css'
import Phaser from 'phaser'
import { MainMenuScene } from './scenes/MainMenuScene';

import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainMenuScene, GameScene]
};

new Phaser.Game(config);
