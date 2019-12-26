import Dictionary from "../util/Dictionary";

export default class UIWindowManager {
    
    public constructor() {
        //初始化FGUI
    }
    private static windowslist: Dictionary = new Dictionary();

    //加载UI资源
    
    //关闭所有窗口
    public static CloseAllWindow()
    {

    }

    //关闭其他窗口
    public static CloseOtherWindow(view:fgui.Window)
    {
        
    }

    //创建窗口组件
    public static CreatWinCom(pkgName:string, resName:string, view?:fgui.Window) : fgui.GComponent
    {
        if(!fgui.UIPackage.getByName(pkgName))
        {
            fgui.UIPackage.addPackage("res/GUI/"+pkgName);
        }

        if(UIWindowManager.windowslist.indexOf(resName) > 0)
        {
            return UIWindowManager.windowslist.get(resName).contentPane;
        }
        else
        {
            var acom:fgui.GComponent = fgui.UIPackage.createObject(pkgName, resName).asCom;
            if(view)
            {
                view.contentPane = acom;
                view.setSize(Laya.stage.width, Laya.stage.height);
                view.center();
                view.name = resName;
            }
            UIWindowManager.windowslist.set(resName, view);
            return acom;
        }
    }
    
    //获得窗口
    public static getWindow(winName:string):fgui.Window
    {
        if(UIWindowManager.windowslist.indexOf(winName) > 0)
        {
            return UIWindowManager.windowslist.get(winName);
        }
        return null
    }

    public static HideWindow(winName:string, isdispose?:boolean)
    {
        if(UIWindowManager.windowslist.indexOf(winName) > 0)
        {
            var win:fgui.Window = UIWindowManager.windowslist.get(winName);
            if(!isdispose)
            {
                win.hide();
            }
            else
            {
                win.dispose();
                UIWindowManager.windowslist.remove(winName);
            }
        }
    }
}