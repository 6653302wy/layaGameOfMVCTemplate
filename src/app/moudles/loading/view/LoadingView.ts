import UIWindowManager from "../../../../fairygui/UIWindowManager";
import Helper from "../../../../util/Helper";


/**
* name 
*/
export default class LoadingView extends fgui.Window {

	private _mediator: any = null;

	private m_Num: fgui.GTextField;

	public m_BG: fgui.GLoader;
	public m_Content: fgui.GTextField;
	public m_StarLoading_BarBlue: fgui.GProgressBar;
	public m_Load:fgui.Transition;

	constructor(mediator: any) {
		super();
		this._mediator = mediator;

		UIWindowManager.CreatWinCom("Level", "loading", this);
	}

	protected onInit(): void {
		this.m_BG = <fgui.GLoader><any>(this.contentPane.getChild("BG"));
		this.m_Content = <fgui.GTextField><any>(this.contentPane.getChild("Content"));
		// this.m_StarLoading_BarBlue = <fgui.GProgressBar><any>(this.contentPane.getChild("StarLoading_BarBlue"));

		this.m_Num = this.contentPane.getChild("Num") as fgui.GTextField;
		this.m_Num.text = '';

		this.m_Load = this.contentPane.getTransition('Load');
		this.m_Load.play(Helper.Handler(this, ()=>{
			this._mediator.showLoadingView(false);
		}));
		// Laya.timer.once(1500, this, ()=>{
		// 	this._mediator.showLoadingView(false);
		// });
		
	}

	public setProValue(cur: number): void {
		this.m_StarLoading_BarBlue.tweenValue(cur, .5);
	}

	protected onHide(): void {
		UIWindowManager.HideWindow('loading', true);
	}

	public dispose(): void {
		super.dispose();
	}

}