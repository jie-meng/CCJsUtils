import res from 'resource';
import display from 'utils/display';

let HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        let size = cc.winSize;

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
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        
        this.addChild(this.sprite, 0);
        
        let animation = display.createAnimation({ image: res.ImgBahamute, cx: 4, cy: 4 }, [cc.p(0, 0), cc.p(1, 0), cc.p(2, 0), cc.p(3, 0)], 0.1);
        display.setAnimationCache('edgar', animation);
        
        display.spriteRunAnimationForever(this.sprite, display.getAnimationCache('edgar'));
        
        return true;
    }
});

let HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        let layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

export default HelloWorldScene;