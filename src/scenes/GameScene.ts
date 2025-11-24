import Phaser from 'phaser';
import { LevelManager } from '../utils/LevelManager';
import { AudioManager } from '../utils/AudioManager';
import { GameConfig } from '../utils/GameConfig';

export class GameScene extends Phaser.Scene {
    private placeholders: Phaser.GameObjects.Container[] = [];
    private letters: Phaser.GameObjects.Container[] = [];

    constructor() {
        super('GameScene');
    }

    preload() {
        // Load sound assets here
        // this.load.audio('letter_sound', 'assets/audio/letter.mp3');
    }

    create() {
        AudioManager.getInstance().setScene(this);
        this.setupLevel();

        this.input.on('dragstart', this.onDragStart, this);
        this.input.on('drag', this.onDrag, this);
        this.input.on('dragend', this.onDragEnd, this);
    }

    private setupLevel() {
        const levelData = LevelManager.getInstance().getCurrentLevel();
        const { width, height } = this.scale;

        // Clear previous
        this.placeholders.forEach(p => p.destroy());
        this.letters.forEach(l => l.destroy());
        this.placeholders = [];
        this.letters = [];

        // Create Placeholders (Left side)
        levelData.letters.forEach((char, index) => {
            const y = height * 0.2 + (index * 150);
            const x = width * 0.3;

            const container = this.add.container(x, y);
            const bg = this.add.rectangle(0, 0, 100, 100, 0x333333).setStrokeStyle(2, 0xffffff);
            const label = this.add.text(0, 0, char, { fontSize: '48px', color: '#555' }).setOrigin(0.5);

            container.add([bg, label]);
            container.setData('char', char);
            this.placeholders.push(container);
        });

        // Create Letters (Right side)
        levelData.letters.forEach((char, index) => {
            const y = height * 0.2 + (index * 150);
            const x = width * 0.7;

            const container = this.add.container(x, y);
            const bg = this.add.rectangle(0, 0, 100, 100, GameConfig.Colors.Primary);
            const label = this.add.text(0, 0, char, { fontSize: '48px', color: '#fff' }).setOrigin(0.5);

            container.add([bg, label]);
            container.setSize(100, 100);
            container.setInteractive({ draggable: true });
            container.setData('char', char);
            container.setData('startPos', { x, y });
            this.letters.push(container);
        });
    }

    private onDragStart(_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) {
        this.children.bringToTop(gameObject);
        // Play sound
        // AudioManager.getInstance().playSound('letter_sound', { loop: true });

        // Visual feedback (scale up)
        this.tweens.add({
            targets: gameObject,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 100
        });
    }

    private onDrag(_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) {
        gameObject.x = dragX;
        gameObject.y = dragY;

        // Find matching placeholder to adjust sound speed
        const char = gameObject.getData('char');
        const target = this.placeholders.find(p => p.getData('char') === char);

        if (target) {
            const dist = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, target.x, target.y);
            // Speed up as we get closer (mock logic)
            // const rate = 1 + (500 / (dist + 50));
            // AudioManager.getInstance().setRate('letter_sound', rate);

            // Blink target if close
            if (dist < 200) {
                if (!target.getData('blinking')) {
                    target.setData('blinking', true);
                    this.tweens.add({
                        targets: target,
                        alpha: 0.5,
                        duration: 200,
                        yoyo: true,
                        repeat: -1
                    });
                }
            } else {
                if (target.getData('blinking')) {
                    target.setData('blinking', false);
                    this.tweens.killTweensOf(target);
                    target.setAlpha(1);
                }
            }
        }
    }

    private onDragEnd(_pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) {
        // Stop sound
        // AudioManager.getInstance().stopSound('letter_sound');

        // Scale down
        this.tweens.add({
            targets: gameObject,
            scaleX: 1,
            scaleY: 1,
            duration: 100
        });

        const char = gameObject.getData('char');
        const target = this.placeholders.find(p => p.getData('char') === char);

        if (target) {
            const dist = Phaser.Math.Distance.Between(gameObject.x, gameObject.y, target.x, target.y);
            if (dist < 50) {
                // Snap to target
                gameObject.x = target.x;
                gameObject.y = target.y;
                gameObject.disableInteractive();

                // Success feedback
                // AudioManager.getInstance().playSound('success');

                this.checkLevelComplete();
                return;
            }
        }

        // Return to start
        const startPos = gameObject.getData('startPos');
        this.tweens.add({
            targets: gameObject,
            x: startPos.x,
            y: startPos.y,
            duration: 300,
            ease: 'Back.out'
        });
    }

    private checkLevelComplete() {
        const allPlaced = this.letters.every(l => !l.input?.enabled);
        if (allPlaced) {
            console.log('Level Complete!');
            this.time.delayedCall(1000, () => {
                if (LevelManager.getInstance().nextLevel()) {
                    this.setupLevel();
                } else {
                    console.log('All Levels Done!');
                    // Go back to menu or show win screen
                    this.scene.start('MainMenuScene');
                }
            });
        }
    }
}
