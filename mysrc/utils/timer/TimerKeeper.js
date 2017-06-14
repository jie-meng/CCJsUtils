let TimerKeeper = cc.Class.extend({
    _timers: null,
    
    ctor: () => {
        this._timers = new Map();
    },
    
    addTimer: (id, timer, failIfExists) => {
        if (!id) {
            id = "";
        }
        
        if (!this._timers.has(id) || !failIfExists) {
            this._timers.set(id, timer);
        }
        
        return this;
    },
    
    removeTimer: (id) => {
        this._timers.delete(id);
        
        return this;
    },
    
    getTimer: (id) => {
        return this._timers.get(id);
    },
        
    getTimerState: (id) => {
        let timer = this.getTimer(id);
        if (!timer) {
            return timer;
        }
        
        return timer.getState();
    },

    updateTimers: (dt) => {
        _.forEach(this._timers, (v, k) => {
            if (v.passTime(dt)) {
                this._timers.delete(k);
            }
        });
    },
    
    clearTimers: () => {
        this._timers.clear();
        return this;
    },
});

export default TimerKeeper;