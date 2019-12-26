
export default interface IModule  {
    start(fa: puremvc.IFacade, data: Object): void;
    dispose(): void;
    getResGroup(): string[];
}
