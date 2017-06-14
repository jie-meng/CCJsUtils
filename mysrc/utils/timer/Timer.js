let Timer = cc.Class.extend({
    _interval: null,
    _startAfter: null,
    _triggerTimes: null,
    _onTime: null,
    _onTimeObject: null,
    _times: 0,
    _passedTime: 0,
    _stopped: false,
    
    ctor: (interval, startAfter, triggerTimes, onTime, onTimeObj) => {
        this._interval = interval;
        this._startAfter = startAfter;
        this._triggerTimes = triggerTimes;
        this._onTime = onTime;
        this._onTimeObject = onTimeObj;
        this._times = 0;
        this._passedTime = 0;
        this._stopped = false;
    },
    
    passTime: (dt) => {
        if (!this._stopped) {
            if (this._startAfter > 0) {
                this._startAfter = this._startAfter - dt;
            } else {
                this._passedTime = this._passedTime + dt
                if (this._passedTime >= this._interval) {
                    this._passedTime = 0;
                    ++this._times;
                    this._onTime(this._onTimeObject, this._times);
                    
                    if (this._triggerTimes > 0) {
                        if (this._times >= this._triggerTimes) {
                            this._stopped = true;
                        }
                    }
                }
            }
        }
        
        return this._stopped;
    },
    
    getState: () => {
        return { 
            passTime: this._passedTime, 
            times: this._times, 
            interval: this._interval, 
            triggerTimes: this._triggerTimes 
        };
    },
    
    stop: () => {
        this._stopped = true;
    },
    
    isStopped: () => {
        return this._stopped;
    },
});

Timer.create = (interval, startAfter, triggerTimes, onTime, onTimeObj) => {
    return new Timer(interval, startAfter, triggerTimes, onTime, onTimeObj);
};

export default Timer;