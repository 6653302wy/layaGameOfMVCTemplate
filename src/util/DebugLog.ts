import GlobalDefine from "../GlobalDefine";

/*
* name;
*/
export default class DebugLog {

    public static log(message?: any, ...optionalParams) {
        if(!GlobalDefine.Debug_log)return;

        if (optionalParams.length > 1) console.log(message, optionalParams);
        else if (optionalParams.length == 1) console.log(message, optionalParams[0]);
        else console.log(message);
    }

    public static err(message?: any, ...optionalParams)  {
        if(!GlobalDefine.Debug_log)return;
        
        if (optionalParams.length > 1) console.error(message, optionalParams);
        else if (optionalParams.length == 1) console.error(message, optionalParams[0]);
        else console.error(message);
    }

    public static alert(msg:string):void{
        if(!GlobalDefine.Debug_log)return;

        alert(msg);
    }

}