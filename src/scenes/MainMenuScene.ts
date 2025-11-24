import Phaser from 'phaser';
import { GameConfig } from '../utils/GameConfig';
import { LanguageManager } from '../utils/LanguageManager';

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        // Load assets here (buttons, backgrounds)
    }

    create() {
        const { width, height } = this.scale;

        // Title
        this.add.text(width / 2, height * 0.2, 'EZ GrowUp', {
            fontSize: '64px',
            color: GameConfig.Colors.Text
        }).setOrigin(0.5);

        // Language Selection
        this.add.text(width / 2, height * 0.4, 'Select Language / Chọn Ngôn Ngữ', {
            fontSize: '32px',
            color: GameConfig.Colors.Text
        }).setOrigin(0.5);

        // English Button
        this.createButton(width / 2 - 150, height * 0.6, 'English', () => {
            this.selectLanguage(GameConfig.Languages.English);
        });

        // Vietnamese Button
        this.createButton(width / 2 + 150, height * 0.6, 'Tiếng Việt', () => {
            this.selectLanguage(GameConfig.Languages.Vietnamese);
        });
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const btn = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 200, 80, GameConfig.Colors.Primary)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', callback)
            .on('pointerover', () => bg.setFillStyle(GameConfig.Colors.Secondary))
            .on('pointerout', () => bg.setFillStyle(GameConfig.Colors.Primary));

        const label = this.add.text(0, 0, text, { fontSize: '28px', color: '#fff' }).setOrigin(0.5);

        btn.add([bg, label]);
        return btn;
    }

    private selectLanguage(lang: string) {
        LanguageManager.getInstance().setLanguage(lang);
        this.scene.start('GameScene');
        console.log(`Starting game in ${lang}`);
    }
}
