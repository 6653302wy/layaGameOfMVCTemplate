import DebugLog from "../util/DebugLog";
import LoaderManager from "./LoaderManager";


/**
  *
  * @author 
  *
  */
/**
* Created by yangsong on 15-2-11.
* 资源加载工具类，
* 支持多个resource.json文件加载
* 封装Group的加载
* 增加静默加载机制
*/
export default class MultipleResCfgLoader extends Laya.EventDispatcher  {

    public static RES_GROUP = "resGroup.json";//不要修改
    private static CUR_GROUP_NAME = "";//当前使用的资源组名
    private static CUR_GROUP_KEYS = "";//当前资源组keys
    private static CUR_GROUP_URLS = [];//当前资源组所有json的url 打印验证资源路径使用
    private static CUR_GROUP_URLS_FORMAT = [];//当前资源组所有json的url和类型(预加载格式)
    private resGroupPool = {};//缓存已经解析提取的资源组路径信息

    private static _instance = null;
    public static getinstance(): MultipleResCfgLoader {
        if (MultipleResCfgLoader._instance) {
            return MultipleResCfgLoader._instance;
        }
        return MultipleResCfgLoader._instance = new MultipleResCfgLoader();
    }

    private constructor() {
        super();
    }

    /**
 * 封装成laya预加载需要格式
 * @param groupName ResGroup中的资源组名
 * 返回参数：laya预加载格式资源数组
 */
    public getResArray(groupName: string): Array<any> {

        MultipleResCfgLoader.CUR_GROUP_URLS = [];
        MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT = [];

        if (this.resGroupPool[groupName]) {
            // DebugLog.log("从缓存中提取到资源组信息------------");
            return this.resGroupPool[groupName];//如果已经缓存 则直接返回
        }
        this.loadGroup(groupName);
        this.resGroupPool[groupName] = MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT;    //保存到缓存中
        return MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT;
    }



    /**
     * 该接口仅提供给清理缓存资源时使用。预加载时请使用  getResArray()函数，如果使用该函数，当前缓存信息可能为空！！
     * @param groupName 
     */
    public getNameFromPool(groupName: string) {
        return this.resGroupPool[groupName];
    }

    /**
     * 
     * @param groupName ResGroup中的当前界面的组名
     */
    private loadGroup(groupName: string) {
        if (!groupName.length) {
            DebugLog.log("资源组名称不能为空！" + groupName);
            return "";
        }
        MultipleResCfgLoader.CUR_GROUP_NAME = groupName;
        this.onLoaded();
    }

    /**
     * json加载完成后处理(json文件在登录前已经完成加载)
     */
    private jsonData:object;
    private onLoaded() {
        if(!this.jsonData){
            this.jsonData = LoaderManager.ins.getRes(MultipleResCfgLoader.RES_GROUP);
            LoaderManager.ins.clearRes(MultipleResCfgLoader.RES_GROUP);
        }
        // var json = LoaderManager.ins.getRes(MultipleResCfgLoader.JSON_POSITION);
        this.initGroupKey(this.jsonData);
    }

    /**
     * 通过资源组名获取组内keys给ResGroupMgr.CUR_GROUP_KEYS
     * @param json 资源文件json解析后的对象
     */
    private initGroupKey(json) {
        if (!json) {
            DebugLog.log("资源配置json文件读取错误！");
            return;
        }
        MultipleResCfgLoader.CUR_GROUP_KEYS = "";
        var len = json.groups.length;
        var group = null;
        for (var i = 0; i < len; ++i) {
            if (MultipleResCfgLoader.CUR_GROUP_NAME === json.groups[i].name){
                MultipleResCfgLoader.CUR_GROUP_KEYS = json.groups[i].keys;
                group = json.groups[i];
                break;
            }
        }
        if (!group) {
            DebugLog.log(MultipleResCfgLoader.CUR_GROUP_NAME + " 资源组名字不存在！");
            return;
        }
        if (MultipleResCfgLoader.CUR_GROUP_KEYS === "") {
            DebugLog.log(MultipleResCfgLoader.CUR_GROUP_NAME + " 资源组内容为空！");
            return;
        }
        this.initResUrl(json);
        // DebugLog.log("获取资源组信息: " + group.name + ': ');
    }

    /**
     * 根据keys从resources中寻找类型为json的url
     * @param json 资源文件json解析后的对象
     */
    private initResUrl(json) {
        if (!json || MultipleResCfgLoader.CUR_GROUP_KEYS === "") return;
        var keysArray = MultipleResCfgLoader.CUR_GROUP_KEYS.split(",");
        var keyLen = keysArray.length, resLen = json.resources.length;

        MultipleResCfgLoader.CUR_GROUP_URLS = [];
        MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT = [];
        for (var i = 0; i < keyLen; ++i) {
            var tempKey = keysArray[i];
            for (var j = 0; j < resLen; ++j) {
                var tempRes = json.resources[j];
                //提取json并封装格式
                if (tempRes.type === "atlas" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.ATLAS });
                    break;
                    //提取未打包的jpg资源路径并封装格式
                } else if (tempRes.type === "json" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.JSON });
                } else if (tempRes.type === "sound" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.SOUND });
                } else if (tempRes.type === "xml" && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.XML });
                } else if ((tempRes.type === "buffer" || tempRes.type === "sprite3d") && tempRes.name === tempKey) {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.BUFFER });
                } else if (tempRes.type === "image" && tempRes.name === tempKey)  {
                    MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                    MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.IMAGE });
                }/*else if(tempRes.type === "bin"){
                        DebugLog.log(tempRes.name + ': ' + tempKey);
                    }*/
                else if (tempRes.name === tempKey) {
                    var isJpgFormat = this.isJpgFormat(tempRes.name);
                    if (isJpgFormat) {
                        MultipleResCfgLoader.CUR_GROUP_URLS.push(tempRes.url);
                        MultipleResCfgLoader.CUR_GROUP_URLS_FORMAT.push({ url: tempRes.url, type: Laya.Loader.IMAGE });
                        break;
                    }
                }
            }
        }
    }

    /**
     * 截取字符串后三位 判定image类型 jpg/png
     */
    private isJpgFormat(str: string) {
        if (str) {
            var len = str.length;
            if (len <= 3) return false;
        }
        if ("jpg" === (str[len - 3] + str[len - 2] + str[len - 1]) || "ebp" == (str[len - 3] + str[len - 2] + str[len - 1])) {
            return true;
        }
        return false;
    }
}
