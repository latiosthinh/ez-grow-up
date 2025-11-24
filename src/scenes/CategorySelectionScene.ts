import Phaser from 'phaser';
import { GameConfig } from '../utils/GameConfig';
import { GameManager } from '../utils/GameManager';

export class CategorySelectionScene extends Phaser.Scene {
    constructor() {
        super('CategorySelectionScene');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height * 0.2, 'Select Category', {
            fontSize: '48px',
            color: GameConfig.Colors.Text
        }).setOrigin(0.5);

        const categories = [
            { id: 'abc', label: 'A - B - C' },
            { id: '123', label: '1 - 2 - 3' },
            { id: 'random', label: 'Random' }
        ];

        categories.forEach((cat, index) => {
            const x = width / 2;
            const y = height * 0.4 + (index * 100);

            this.createButton(x, y, cat.label, () => {
                this.selectCategory(cat.id);
            });
        });
    }

    private createButton(x: number, y: number, text: string, callback: () => void) {
        const btn = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, 300, 80, GameConfig.Colors.Primary)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', callback);

        const label = this.add.text(0, 0, text, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
        btn.add([bg, label]);
    }

    private selectCategory(catId: string) {
        GameManager.getInstance().setCategory(catId);
        this.scene.start('GameScene');
    }
}
