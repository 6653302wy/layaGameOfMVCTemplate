import Handler = Laya.Handler;
export default class GameStateBase {
    private cb: Handler;
    private error: Handler;
    constructor() {
       
    }
    EnterState(info?: any): void {
        this.cb = info.comCb;
        this.error = info.errCb;
    }

    ExitState(): void {

    }

    onComplete(): void {
        if (this.cb) this.cb.run();
    }

    onError(): void {
        if (this.error) this.error.run();
    }
}