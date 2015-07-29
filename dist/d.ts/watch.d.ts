declare module ho.watch {
    var interval: number;
    type Handler = (obj: any, name: string, oldV, newV) => any;
    function watch(obj: any, name: string, handler: Handler): void;
}
