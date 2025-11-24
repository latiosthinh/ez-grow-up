import Phaser from 'phaser';
import { GameConfig } from '../utils/GameConfig';

export class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        const { width, height } = this.scale;

        // Loading Bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.load.on('progress', (value: number) => {
            progressBar.clear();
            progressBar.fillStyle(GameConfig.Colors.Primary, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load Assets (Placeholders for now)
        // this.load.image('logo', 'assets/images/logo.png');
        // this.load.audio('bgm', 'assets/audio/bgm.mp3');

        // Simulate load time
        for (let i = 0; i < 100; i++) {
            this.load.image(`test${i}`, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==');
        }
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2, 'EZ GrowUp', {
            fontSize: '64px',
            color: GameConfig.Colors.Text
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 2 + 60, 'Tap to Start', {
            fontSize: '24px',
            color: GameConfig.Colors.Text
        }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.checkOnboarding();
        });
    }

    private checkOnboarding() {
        const onboardingComplete = localStorage.getItem('ez_growup_onboarding_complete');
        if (onboardingComplete === 'true') {
            this.scene.start('LanguageSelectionScene');
        } else {
            this.scene.start('OnboardingScene');
        }
    }
}
