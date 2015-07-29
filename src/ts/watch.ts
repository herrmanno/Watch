module ho.watch {
	const ie8 = !-[1,];
	export var interval: number = 400;

	export type Handler = (obj:any, name:string, oldV, newV)=>any;

	export function watch(obj: any, name: string, handler: Handler) {
		!ie8 ? watchIE8(obj, name, handler) : watchNewer(obj, name, handler);
	}

	function watchNewer(obj: any, name: string, handler: Handler): void {
		let oldval = obj[name];
		let newval = oldval
		let getter = function () {
			return newval;
		};
		let setter = function (val) {
			oldval = newval;
			newval = val;
			handler.call(obj, name, oldval, val);
		};

			if (delete obj[name]) {
				Object.defineProperty(this, name, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
			else
				throw `Could not watch property ${name} on Object ${obj}`;
	}

	function watchIE8(obj: any, name: string, handler: Handler): void {
		new Watcher(obj, name, handler);
	}

	class Watcher {

		private oldVal:any;

		constructor(private obj: any, private name: string, private handler: Handler) {
			this.oldVal = this.copy(obj[name]);

			this.watch(function() {
				if(this.oldVal !== obj[name])
					this.handler.call(null, obj, name, this.oldVal, obj[name]);
					this.oldVal = this.copy(obj[name]);
			}.bind(this));
		}

		private watch(cb: Function): void {
			let fn =
			window.requestAnimationFrame       ||
	  		window.webkitRequestAnimationFrame ||
	  		window.mozRequestAnimationFrame    ||
	  		window.oRequestAnimationFrame      ||
	  		window.msRequestAnimationFrame     ||
	  		function(callback: Function){
				window.setTimeout(callback, 1000 / 60);
	  		};

			let wrap = () => {
				fn(wrap);
				cb();
			}

			wrap();
		}

		private copy(val: any): any {
			return JSON.parse(JSON.stringify(val));
		}
	}

}
