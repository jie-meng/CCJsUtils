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
        
        let texture = display.loadImage(res.ImgEdgar);
        let width = texture.getPixelsWide();
        let height = texture.getPixelsHigh();
        
        let frames = [];
        let f0 = display.newSpriteFrame(texture, cc.rect(0, 0, 320, 320));
        let f1 = display.newSpriteFrame(texture, cc.rect(320, 0, 320, 320));
        frames.push(f0);
        frames.push(f1);
        
        let animation = display.newAnimation(frames);
        
        //display.spriteRunAnimationForever(this.sprite, animation);
        display.spriteRunAnimationOnce(this.sprite, animation);
        
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

//function AnimationCacheHoster:addCache()
//    for k, v in pairs(self.tb_) do
//        -- load image
//        local texture = display.loadImage(v.fn)
//        local frameWidth = texture:getPixelsWide() / v.cnt
//        local frameHeight = texture:getPixelsHigh()

//        -- create sprite frame based on image
//        local frames = {}
//        for i = v.fr-1, v.t-1 do
//            local frame = display.newSpriteFrame(texture, cc.rect(frameWidth * i, 0, frameWidth, frameHeight))
//            frames[#frames + 1] = frame
//        end

//        -- create animation
//        local animation = display.newAnimation(frames, v.f)
//        -- caching animation
//        display.setAnimationCache(v.key, animation)
//    end
    
//    return self
//end