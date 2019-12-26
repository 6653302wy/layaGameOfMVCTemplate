import GlobalDefine from "../GlobalDefine";
import Helper from "../util/Helper";


export default class AudioManager {

    private static _Instance: AudioManager;
    public onFocus: boolean = true;
    public audioMuted: number = 0; //当前是否为静音

    constructor() {
    }

    public static get inst() {
        if (!this._Instance) {
            this._Instance = new AudioManager();
            Laya.SoundManager.autoStopMusic = true;

            // this._Instance.initWebAuido();
        }

        // Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, () => {
		// 	if (Laya.stage.isVisibility) {
		// 		DebugLog.log('切换回来，继续渲染');
		// 		Laya.stage.renderingEnabled = true;  //打开渲染并继续
		// 		AudioManager.Instance.onFocus = true;
		// 	} else {
		// 		DebugLog.log('切到后台，停止渲染');
		// 		Laya.stage.renderingEnabled = false; //关闭渲染并停止游戏
		// 		AudioManager.Instance.onFocus = false;
		// 	}
        // });
        
        return this._Instance;
    }

    private musicPath: string = "res/Audio/";
    private soundPath: string = "res/Audio/Sound/";

    public playingMusic: Laya.SoundChannel;
    public playingSound: Laya.SoundChannel;
    public oldmusicVolume: number = 0;
    public newmusicVolume: number = 0;
    public oldSoundVolume: number = 0;
    public newSoundVolume: number = 0;
    private currMusicname = "";
    //播放音乐
    public PlayMusic(audioName: string, path: string = null, loops: number = 0, reStart: boolean = false, complete?: Laya.Handler, beginPlayEvent?: Function): void {
        if(GlobalDefine.MusicMuted)return;
        if (!audioName)audioName = "bgMusic";
        this.currMusicname = audioName;

        AudioManager.inst.SetMusicVolume(.3);

        Laya.loader.load(path ? path : this.musicPath + audioName + ".mp3", Laya.Handler.create(this, () => {
            this.playingMusic = Laya.SoundManager.playMusic(path ? path : this.musicPath + audioName + ".mp3", loops, complete);
            if (!this.playingMusic || this.playingMusic.isStopped || this.playingMusic.url.indexOf(audioName) == -1 || this.playingMusic.loops != loops) {
                if (beginPlayEvent)
                    beginPlayEvent(this.playingMusic);
            }
        }));
    }

    //播放音效
    private lastSound:string = '';
    private lastSoundPlayTime:number = 0;
    public PlaySound(audioName: string, path: string = null, loops: number = 1, complete?: Laya.Handler, beginPlayEvent?: Function): void {
        if (!audioName) return;
        if(GlobalDefine.SoundMuted)return;
        if(this.lastSound == audioName && new Date().getTime() - this.lastSoundPlayTime < 100)return;
        this.lastSound = audioName;
        this.lastSoundPlayTime = new Date().getTime();
        
        if (this.webAuSupport && !Helper.isIOS()) {
            this.PlaySoundByArraryBuffer(audioName, loops, complete);
        } else {
            this.playingSound = Laya.SoundManager.playSound(path ? path : this.soundPath + audioName + ".wav", loops, complete);
            if (beginPlayEvent)
                beginPlayEvent(this.playingSound);
            // this.SetMusicVolume(1);
        }
    }
    // public StopSound(audioName: string, path: string = null): void {
    //     if (!audioName) return;
    //     if (this.webAuSupport && !Helper.isIOS()) {
    //         this.StopSoundByArraryBuffer(audioName);
    //     } else {
    //         Laya.SoundManager.stopSound(path ? path : this.soundPath + audioName + ".wav");
    //         // this.SetSoundVolume(1);
    //     }
    // }

    private curBgSoundChannel: Laya.SoundChannel;
    public PlayBgMusic(): void {
        // this.PlayMusic(this.currMusicname, null, 1, true, Laya.Handler.create(this, () => {
        //     this.PlayBgMusic();
        // }), sound => this.curBgSoundChannel = sound);
        this.PlayMusic(this.currMusicname);
    }

    //暂停当前背景音乐
    public PauseCurMusic(): void {
        if (this.playingMusic) {
            this.playingMusic.pause();
        }
    }

    //停止当前背景音乐
    public StopCurMusic(): void {
        if (this.playingMusic) {
            this.playingMusic.stop();
            this.playingMusic = null;
        }
    }

    //继续播放当前背景音乐
    public ResumeCurMusic(): void {
        if (this.playingMusic) {
            this.playingMusic.resume();
        } else {
            this.PlayMusic(null);
        }
    }

    //设置背景音乐音量 1 最大   0最小
    public SetMusicVolume(volume: number) {
        this.oldmusicVolume = Laya.SoundManager.musicVolume;
        Laya.SoundManager.setMusicVolume(volume);

    }

    //设置音效音量 1 最大   0最小
    public SetSoundVolume(volume: number) {
        this.oldSoundVolume = Laya.SoundManager.soundVolume;
        Laya.SoundManager.setSoundVolume(volume);
    }

    // public initWebAuido(): void {
    //     try {
    //         this.webAuSupport = true;
    //         let webAu = window['AudioContext'] || window['webkitAudioContext'];
    //         this.audioCtx = new webAu();
    //         // this._gainNode = this.audioCtx.createGain();
    //         // this._gainNode.connect(this.audioCtx.destination);
    //         DebugLog.log('该浏览器支持web Audio');
    //     } catch (err) {
    //         this.webAuSupport = false;
    //         DebugLog.log('浏览器不支持web Audio');
    //     }

    // }

    // public setWebAuVolume(val: number): void {
    //     if(this._gainNode)this._gainNode.gain.value = val;
    // }

    public webAuSupport: boolean;
    private _audioSourceList: Object = {};
    public audioCtx: any;// = new AudioContext();
    // private _gainNode: GainNode;
    public PlaySoundByArraryBuffer(audioName: string, loop: number = 0, complete: Laya.Handler = null): void {
        if (!this.onFocus || Laya.SoundManager.soundMuted || Laya.SoundManager.muted) {
            if (complete) complete.run();
            return;
        }
        console.log('播放音效====', audioName);

        // let buffer: AudioBuffer = GameStaticDataMgr.getInstance().getAudioBuffer(audioName);
        // let source = this.audioCtx.createBufferSource();
        // source.connect(this.audioCtx.destination);
        // source.buffer = buffer;
        // source.start(0);
        // // source.loop = loop > 0 ? true : false;
        // source.onended = () => {
        //     this.StopSoundByArraryBuffer(audioName);
        //     if (complete) complete.run();
        // }

        // this._audioSourceList[audioName] = source;
    }

    private StopSoundByArraryBuffer(audioName: string): void {
        let audioSource = this.getSoundSoure(audioName);
        if (audioSource) {
            audioSource.stop();
            audioSource.disconnect(this.audioCtx.destination);
            delete this._audioSourceList[audioName];
            audioSource = null;
        }
    }

    private getSoundSoure(audioName: string): AudioBufferSourceNode {
        return this._audioSourceList[audioName];
    }
    
    //背景音乐状态切换
    public swichMusicState():void{
        const isMute:boolean = GlobalDefine.MusicMuted;
        Laya.SoundManager.musicMuted = !isMute;
        GlobalDefine.MusicMuted = !isMute;

        if(!GlobalDefine.MusicMuted){
            this.PlayBgMusic();
        }
    }

    //音效状态切换
    public swichSoundState():void{
        const isMute:boolean = GlobalDefine.SoundMuted;
        Laya.SoundManager.soundMuted = !isMute;
        GlobalDefine.SoundMuted = !isMute;
    }

}