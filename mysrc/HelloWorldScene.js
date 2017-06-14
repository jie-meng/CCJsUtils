import res from 'resource';
import display from 'utils/display';
import Timer from 'utils/timer/Timer';

let HelloWorldLayer = cc.Layer.extend({
    __sprite: null,
    _timer: null,
    
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        let size = cc.winSize;
        
        this._timer = Timer.create(1, 0, 15, (o, times) => {
            cc.log('test');
        });

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        let helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this._sprite = new cc.Sprite(res.HelloWorld_png);
        this._sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        
        this.addChild(this._sprite, 0);
        
        let animation = display.createAnimation({ image: res.ImgBahamute, cx: 4, cy: 4 }, [cc.p(0, 1), cc.p(1, 1), cc.p(2, 1), cc.p(3, 1)], 0.2);
        display.setAnimationCache('edgar', animation);
        this.setScale(2, 2);
        
        display.spriteRunAnimationForever(this._sprite, display.getAnimationCache('edgar'));
        
        this.scheduleUpdate();
        
        return true;
    },
    
    update: function (dt) {
        this._super(dt);
        this._timer.passTime(dt);
    },
});

let HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        let layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

export default HelloWorldScene;
