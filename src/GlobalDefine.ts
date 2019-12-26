export default class GlobalDefine {
    constructor() {
    }

    /** 是否显示调试面板 */
    public static Debug_panel: boolean = true;

    /** 是否显示log */
    public static Debug_log: boolean = true;

    /** 平台 */
    public static Platform: number = 0;

     /** 请求服务器地址 */
    public static CurrServerUrl:string = '';

    /** 版本号 */
    public static Version:string = '1.0.0';

    /** 音乐是否静音 */
    public static MusicMuted: boolean;

    /** 音效是否静音 */
    public static SoundMuted: boolean;

    /** 语言 */
    public static Language: string;

    /** 动态加载资源路径 */
    public static ImageUrl: string = 'res/GIMG/';


    public static getFUIImg(img: string): string {
        return GlobalDefine.ImageUrl + img + ".png";
    }

}