export class Queue {
  private _fx = [];
  private _init = true;
  private _lock = false;
  private _finishDefers = new Set<{ resolve: () => void }>();

  private _next() {
    if (!this._lock) {
      this._lock = true;
      if (this._fx.length === 0) {
        this._init = true;
        this._finishDefers.forEach((d) => d.resolve());
        this._finishDefers.clear();
      } else {
        const fn = this._fx.shift();
        if (fn) {
          fn(() => {
            this._lock = false;
            this._next();
          });
        }
      }
    }
  }

  public add(fn: (next: () => void) => any) {
    this._fx.push(fn);
    if (this._init) {
      this._lock = false;
      this._init = false;
      this._next();
    }
  }

  public awaitFinish() {
    if (this._init) return Promise.resolve();
    const defer = {} as { resolve: () => void };
    this._finishDefers.add(defer);
    return new Promise<void>((resolve) => {
      defer.resolve = resolve;
    });
  }
}
