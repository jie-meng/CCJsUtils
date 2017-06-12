const display = {
    _loadImage: (imageFilename, callback) => {
        if (!callback) {
            return cc.textureCache.addImage(imageFilename);
        } else {
            cc.textureCache.addImageAsync(imageFilename, callback);
        }
    },
    
    _newSpriteFrame: (texture, rect, rotated, offset, originalSize) => {
        return cc.SpriteFrame.createWithTexture(texture, rect, rotated, offset, originalSize)
    },

    _newAnimation: (frames, time) => {
        let count = frames.length;
        cc.assert(count > 0, "display.newAnimation() - invalid frames");
        time = time || 1.0 / count;
        
        return cc.Animation.createWithAnimationFrames(frames, time);
    },
    
    spriteRunAnimationForever: (sprite, animation) => {
        let animate = cc.Animate.create(animation);
        let action = cc.RepeatForever.create(animate);
        sprite.runAction(action);
        return action;
    },
    
    spriteRunAnimationOnce: (sprite, animation, args) => {
        let actions = [];
        
        if (!args) {
            args = {}
        }
        
        let showDelay = args.showDelay;
        if (showDelay) {
            sprite.setVisible(false);
            actions.push(cc.DelayTime.create(showDelay));
            actions.push(cc.Show.create());
        }

        let delay = args.delay || 0;
        if (delay > 0) {
            actions.push(cc.DelayTime.create(delay));
        }
        
        actions.push(cc.Animate.create(animation));

        if (args.removeSelf) {
            actions.push(cc.RemoveSelf.create());
        }

        if (args.onComplete) {
            actions.push(cc.CallFunc.create(args.onComplete));
        }

        let action = null;
        if (actions.length > 1) {
            action = cc.Sequence.create(actions);
        } else {
            action = actions[0];
        }
        sprite.runAction(action);
        return action;
    },
    
    createAnimation: (imageInfo, animationSeq) => {
        let texture = display._loadImage(imageInfo.image);
        let width = texture.getPixelsWide();
        let height = texture.getPixelsHigh();
        
        let frames = [];
        _.forEach(animationSeq, (s) => {
            frames.push(display._newSpriteFrame(texture, cc.rect(imageInfo.width * s.x, imageInfo.height * s.y, imageInfo.width, imageInfo.height)));
        });
        
        return display._newAnimation(frames);
    }
};

export default display;
