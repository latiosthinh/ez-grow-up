import Phaser from 'phaser';
import { GameConfig } from '../utils/GameConfig';

export class OnboardingScene extends Phaser.Scene {
    private currentSlide: number = 0;
    private slides: string[] = [
        "Welcome to EZ GrowUp!\nLearn while playing.",
        "Drag letters to the\ncorrect placeholders.",
        "Listen to the sounds\nand learn pronunciation.",
        "Have fun and\ncollect stars!"
    ];
    private textObject: Phaser.GameObjects.Text | null = null;

    constructor() {
        super('OnboardingScene');
    }

    create() {
        const { width, height } = this.scale;

        // Background
        this.add.rectangle(width / 2, height / 2, width, height, 0x2c3e50);

        // Slide Text
        this.textObject = this.add.text(width / 2, height / 2 - 50, this.slides[0], {
            fontSize: '32px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Next Button
        const nextBtn = this.add.text(width - 100, height - 50, 'Next >', {
            fontSize: '24px',
            color: GameConfig.Colors.Primary.toString()
        })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.nextSlide());
    }

    private nextSlide() {
        this.currentSlide++;
        if (this.currentSlide < this.slides.length) {
            if (this.textObject) {
                this.textObject.setText(this.slides[this.currentSlide]);
            }
        } else {
            this.finishOnboarding();
        }
    }

    private finishOnboarding() {
        localStorage.setItem('ez_growup_onboarding_complete', 'true');
        this.scene.start('LanguageSelectionScene');
    }
}
