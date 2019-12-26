/**
* name 
*/
export default class EventMgr extends Laya.EventDispatcher {
	static eventDispatcher: Laya.EventDispatcher = new Laya.EventDispatcher();
	static _instance: EventMgr;

	constructor() {
		super();
	}

	public static get Ins() {
		return EventMgr._instance == null ? new EventMgr() : EventMgr._instance;
	}

	///派发事件
	public sendEvent(evtName, ...args) {
		EventMgr.eventDispatcher.event(evtName, args);
	}
	//侦听事件
	public AddEvent(evtName, caller: any, listener: Function, arg?: any[]): void {
		EventMgr.eventDispatcher.on(evtName, caller, listener, (arg == null) ? null : ([arg]));
	}

	//单次侦听事件
	public AddEventOnce(evtName, caller: any, listener: Function, arg?: any[]): void {
		EventMgr.eventDispatcher.once(evtName, caller, listener, (arg == null) ? null : ([arg]));
	}

	//取消侦听事件
	public offEvent(evtName, caller: any, listener: Function): void {
		EventMgr.eventDispatcher.off(evtName, caller, listener);
	}



}