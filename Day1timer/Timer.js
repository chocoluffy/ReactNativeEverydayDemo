class Timer {
  constructor(tick) {
    this._running = false;

    // in milliseconds
    this._accumulatedTime = 0;

    let lastTimeInLoop = null;
    const loop = now => {
      if(this._running == false) {
        lastTimeInLoop = null;
        return;
      }

      if(lastTimeInLoop == null) {
        lastTimeInLoop = now;
      } else {
        const dt = now - lastTimeInLoop;
        this._accumulatedTime += dt;
        lastTimeInLoop = now;
      }

      tick();
      requestAnimationFrame(loop)
    };

    this._loop = loop;
  }

  reset() {
    this._accumulatedTime = 0;
    this._running = false;
  }

  start() {
    this._runloop();
  }

  pause() {
    this._running = false;
  }

  duration() {
    const dt = this._accumulatedTime;
    const dtSeconds = Math.floor(dt / 1000);

    const hundredth = Math.floor(dt % 1000 / 10)
    const seconds = dtSeconds % 60;
    const minutes = Math.floor(dtSeconds / 60);

    return {
      hundredth,
      seconds,
      minutes,
    }
  }

  _runloop() {
    if(this._running == false) {
      this._running = true;
      requestAnimationFrame(this._loop);
    }
  }
}

export default Timer;