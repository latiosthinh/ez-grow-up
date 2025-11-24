import Phaser from 'phaser';

export class AudioManager {
    private static instance: AudioManager;
    private scene: Phaser.Scene | null = null;

    private constructor() { }

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    public setScene(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public playSound(key: string, config: Phaser.Types.Sound.SoundConfig = {}) {
        if (!this.scene) return;
        this.scene.sound.play(key, config);
    }

    public stopSound(key: string) {
        if (!this.scene) return;
        this.scene.sound.stopByKey(key);
    }

    public setRate(key: string, rate: number) {
        if (!this.scene) return;
        // Phaser 3 Sound Manager handles multiple instances. 
        // For this app, we assume one instance of a letter sound playing at a time or we track the specific sound instance.
        // Simplified: get the first active sound instance of this key
        const sounds = this.scene.sound.getAll(key);
        sounds.forEach(sound => {
            if (sound.isPlaying) {
                (sound as Phaser.Sound.WebAudioSound).setRate(rate);
            }
        });
    }
}
