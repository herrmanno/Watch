interface Window {
    webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
    oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
}
declare module ho.watch {
    type Handler = (obj: any, name: string, oldV: any, newV: any, timestamp?: number) => any;
    function watch(obj: any, name: string, handler: Handler): void;
}
