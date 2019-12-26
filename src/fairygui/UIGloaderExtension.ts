import LoaderManager from "../manager/LoaderManager";
import GlobalDefine from "../GlobalDefine";


export default class UIGloaderExtension extends fgui.GLoader {
    constructor() { super(); }

    public imgurl: string = '';
    protected loadExternal(): void {
        if (this.imgurl == this.url) {
            this.displayObject.visible = true;
            // ResManager.ins.setResUseCount(this.imgurl);
        }
        else {
            if (this.url) {
                if (this.url.split('/')[0] != 'atlas') {
                    if(this.url.indexOf('gif') != -1 || this.url.indexOf('webp') != -1){
                        this.imgurl = GlobalDefine.ImageUrl + this.url;
                    }else{
                        this.imgurl = GlobalDefine.getFUIImg(this.url);
                    }
                }
                else if (this.url.slice(0, 4) == 'http') {
                    this.imgurl = this.url;
                }
                else {
                    this.imgurl = 'res/' + this.url + ".png";
                }
                //加载图片
                LoaderManager.ins.loadRes(this.imgurl, Laya.Handler.create(this, this.onLoadSuccess));
            }
            else
            {
                this.displayObject.visible = false;
                //释放图片
                Laya.loader.clearTextureRes(this.imgurl);
                // ResManager.ins.setResUseCount(this.imgurl, false);
            }
        }
    }

    protected freeExternal(texture: laya.resource.Texture): void {
        this.displayObject.visible = false;
        Laya.loader.clearTextureRes(this.imgurl);
        // ResManager.ins.setResUseCount(this.imgurl, false);
    }

    protected onLoadSuccess(): void  {
        var img: laya.resource.Texture = LoaderManager.ins.getRes(this.imgurl);
        this.displayObject.visible = true;
        if (img) {
            // ResManager.ins.setResUseCount(this.imgurl);
            this.onExternalLoadSuccess(img);
        }
        else
        {
            this.url = null;
        }
    }
}