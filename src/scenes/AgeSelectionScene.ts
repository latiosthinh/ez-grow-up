import Phaser from 'phaser';
import { GameConfig } from '../utils/GameConfig';
import { GameManager } from '../utils/GameManager';

export class AgeSelectionScene extends Phaser.Scene {
    constructor() {
        super('AgeSelectionScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height * 0.2, 'Select Age', {
            fontSize: '48px',
            color: GameConfig.Colors.Text
        }).setOrigin(0.5);

        const ages = [2, 3, 4, 5, 6];
        ages.forEach((age, index) => {
            const x = width / 2;
            const y = height * 0.35 + (index * 80);

            this.createButton(x, y, `${age} Years Old`, () => {
                this.selectAge(age);
            });
        });
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const btn = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, 300, 60, GameConfig.Colors.Primary)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', callback);

        const label = this.add.text(0, 0, text, { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        btn.add([bg, label]);
    }

    private selectAge(age: number) {
        GameManager.getInstance().setAge(age);
        this.scene.start('DifficultySelectionScene');
    }
}
