require('polyfills');

var CONST = require('const');
var Extend = require('utils/object/Extend');

var Phaser = {

    Game: require('core/Game'),
    GameObjects: {
         DisplayList: require('gameobjects/DisplayList'),
         UpdateList: require('gameobjects/UpdateList'),

         Image: require('gameobjects/image/Image'),
         Particle: require('gameobjects/particles/Particle'),
         // Sprite: require('gameobjects/sprite/Sprite'),
         Graphics: require('gameobjects/graphics/Graphics'),
         // Light: require('gameobjects/lights/Light'),
         Factories: {
             Image: require('gameobjects/image/ImageFactory'),
             Particle: require('gameobjects/particles/ParticleManagerFactory'),
             // Sprite: require('gameobjects/sprite/SpriteFactory'),
             Graphics: require('gameobjects/graphics/GraphicsFactory')
         },

         Creators: {
             Image: require('gameobjects/image/ImageCreator'),
             // Sprite: require('gameobjects/sprite/SpriteCreator'),
             Particle: require('gameobjects/particles/ParticleManagerCreator'),
             Graphics: require('gameobjects/graphics/GraphicsFactory')
         }
     },
    // GameObjects:require('gameobjects'),
    Scene: require('scene/Scene'),
    ScenePlugin: require('scene/ScenePlugin'),
    Input: require('input/InputPlugin'),
    Time: require('time'),
    Tweens: {
        TweenManager: require('tweens/TweenManager') 
    },
    Geom: require('geom'),
    Cameras: {
        Scene2D: require('cameras/2d')
    },
    Events: require('events/EventEmitter'),
    Loader: require('loader'),
};

//  Merge in the consts

Phaser = Extend(false, Phaser, CONST);

//  Export it

module.exports = Phaser;

global.Phaser = Phaser;
