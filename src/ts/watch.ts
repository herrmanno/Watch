interface Window {
	webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
	mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
	oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
}

module ho.watch {

	export type Handler = (obj:any, name:string, oldV:any, newV:any,  timestamp?: number)=>any;

	export function watch(obj: any, name: string, handler: Handler): void {
		new Watcher(obj, name, handler);
	}

	class Watcher {

		private oldVal:any;

		constructor(private obj: any, private name: string, private handler: Handler) {
			this.oldVal = this.copy(obj[name]);

			this.watch(timestamp => {
				if(this.oldVal !== obj[name]) {
					this.handler.call(null, obj, name, this.oldVal, obj[name], timestamp);
					this.oldVal = this.copy(obj[name]);
				}
			});
		}

		private watch(cb: (timeStamp:number)=>any): void {
			let fn: Function =
			window.requestAnimationFrame       ||
	  		window.webkitRequestAnimationFrame ||
	  		window.mozRequestAnimationFrame    ||
	  		window.oRequestAnimationFrame      ||
	  		window.msRequestAnimationFrame     ||
	  		function(callback: Function){
				window.setTimeout(callback, 1000 / 60);
	  		};

			let wrap = (ts: number) => {
				cb(ts);
				fn(wrap);
			}

			fn(wrap);
		}

		private copy(val: any): any {
			return JSON.parse(JSON.stringify(val));
		}
	}

}
