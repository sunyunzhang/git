var game;
var gameLoaded = false;
var createOnLoaded = false;
var c = document.getElementById('c')
var v = document.getElementById('v')
var html = document.querySelector('html')
var video = document.getElementById('video')
var num = 0

window.onload = function () {
    var gameConfig = {
        type: Phaser.AUTO,
        width: 512,
        height: 800,
        parent:'c',
        transparent:true,
        backgroundColor: 0x000000,
        scene: [playGame]
    };
    game = new Phaser.Game(gameConfig);
}

class playGame extends Phaser.Scene {

    constructor() {
        super("PlayGame");
    }

    preload() {
        if (gameLoaded) {
            return;
        }

        var pic_name = [],
            addFlag = false;

        for (var p1 in assets) {
            if (assets.hasOwnProperty(p1))
                pic_name.push(p1);
        }
        for (var i = 0; i < pic_name.length; i++) {
            if(pic_name[i] != 'video'){
                this.textures.addBase64(pic_name[i], eval("assets." + pic_name[i]))
            }
        }

        var imageCount = pic_name.length;
        var loadedCount = 0;
        this.textures.on('addtexture', function () {
            loadedCount++;
            if (imageCount == loadedCount) {
                gameLoaded = true;
                if (createOnLoaded) {
                    this.create();
                }
            }
        }, this);
    }

    create() {
        if (!gameLoaded) {
            createOnLoaded = true;
            return;
        }
        video.src = assets.video
        c.style.visibility="hidden";
        video.play()
        this.num = 0

        this.letters = {
            big: {
                letter_c: ['i', 'b', 'g'],
                answer: 'big',
                // prompt:['a'],
                add_letter:'j',
                box: 'box',
                plate: {
                    key: 'words',
                    x: 256,
                    y: 600,
                    width: 426,
                    height: 334
                },
                h:true,
                flag:false,
                light:false,
                guide:true
            },
            red: {
                letter_c: ['d', 'e', 'r'],
                answer: 'red',
                // prompt:['a'],
                add_letter:'j',
                box: 'box',
                plate: {
                    key: 'words',
                    x: 256,
                    y: 600,
                    width: 426,
                    height: 334
                },
                h:true,
                flag:false,
                light:false,
                guide:false
            },
            big: {
                letter_c: ['r', 'e', 'o','p'],
                answer: 'rope',
                // prompt:['a'],
                add_letter:'j',
                box: 'box',
                plate: {
                    key: 'words',
                    x: 256,
                    y: 600,
                    width: 426,
                    height: 334
                },
                h:true,
                flag:false,
                light:false,
                guide:false
            },
        }
        
        this.resize();
        window.addEventListener("resize", this.resize, false);
    }
    update() {
        if (!gameLoaded) {
            createOnLoaded = true;
            return;
        }
        console.log(video.currentTime.toFixed(1))
        // this.currentTime(['big','red','rope'],[2.5,])
    }
    big(){
        this.clickWord('big', this.letters)
    }
    red(){
        this.clickWord('red', this.letters)
    }
    rope(){
        var z = this.add.image(game.config.width/2,game.config.height/2,'words').setScale(3).setAlpha(0.001).setDepth(3).setInteractive().on('pointerdown',function (params) {
            this.showDownload()
        },this)
        this.clickWord('rope', this.letters)
    }
    clickWord(levelName, jsonName) {
        var this_ = this
        var level, plate
        var letter_name = [],
            letter_name1 = []
        var letter_c1 = [],
            letter_c2 = []
        var result = []
        var boxName = []
        var showLetterName = []
        var hand, click, hand_falg
        var rect = new Phaser.Geom.Rectangle(-100, -100, game.config.width + 1000, game.config.height + 1000);
        var graphics1 = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });
        graphics1.alpha = 0;        
        this.tweens.add({
            targets:graphics1,
            alpha:0.7,
            duration:300
        })
        graphics1.fillRectShape(rect);
        showPlate()
        //显示磁盘
        function showPlate() {
            for (var key in jsonName) {
                if (levelName == key) {
                    level = jsonName[key]
                    plate = this_.add.image(jsonName[key].plate.x, jsonName[key].plate.y, jsonName[key].plate.key).setScale(0, 0)
                    if(level.h == true){
                        plate.setAngle(90)
                    }
                    this_.tweens.add({
                        targets: [plate],
                        scaleX: 1.05,
                        scaleY: 1,
                        duration: 200,
                        onComplete: () => {
                            showLetter()
                        }
                    })
                }
            }
        }
        // 显示字母
        function showLetter() {
            if (!level.prompt) {
                level.prompt = []
            }
            for (let i = 0; i < level.prompt.length; i++) {
                result.push(level.prompt[i])
            }

            for (let i = 0; i < level.answer.length; i++) {
                
                if(level.h == true){
                    boxName[i] = this_.add.image(level.plate.x +100, level.plate.y +(i - (level.answer.length - 1) / 2) * 50, level.box).setScale(0.8, 0.8).setAngle(90)
                }else{
                    boxName[i] = this_.add.image(level.plate.x + (i - (level.answer.length - 1) / 2) * 50, level.plate.y - 100, level.box).setScale(0.8, 0.8)
                }
            }

            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    
                    if(level.h == true){
                        showLetterName[i] = this_.add.image(boxName[i].x, boxName[i].y, result[i] + '1').setScale(0.8, 0.8).setInteractive().setAngle(90)
                    }else{
                        showLetterName[i] = this_.add.image(boxName[i].x, boxName[i].y, result[i] + '1').setScale(0.8, 0.8).setInteractive() 
                    }
                }
            }



            //找寻名字数组分割数组,排列按钮
            if (level.letter_c.length % 2 === 0) {
                letter_c1 = level.letter_c.slice(0, level.letter_c.length / 2)
                letter_c2 = level.letter_c.slice(level.letter_c.length / 2, level.letter_c.length)
                for (let i = 0; i < letter_c1.length; i++) {
                    if(level.h == true){
                        letter_name1.push(this_.add.image(level.plate.x,level.plate.y + (i - (letter_c1.length - 1) / 2) * 90,  letter_c1[i] + letter_c1[i]).setAngle(90))
                        letter_name.push(this_.add.image(level.plate.x,level.plate.y + (i - (letter_c1.length - 1) / 2) * 90,  letter_c1[i]).setInteractive().setAngle(90))
                    }else{
                        letter_name1.push(this_.add.image(level.plate.x + (i - (letter_c1.length - 1) / 2) * 90, level.plate.y, letter_c1[i] + letter_c1[i]))
                        letter_name.push(this_.add.image(level.plate.x + (i - (letter_c1.length - 1) / 2) * 90, level.plate.y, letter_c1[i]).setInteractive())
                    }
                }
                for (let i = 0; i < letter_c2.length; i++) {
                    if(level.h == true){
                        letter_name1.push(this_.add.image(level.plate.x - 90,level.plate.y + (i - (letter_c2.length - 1) / 2) * 90,  letter_c2[i] + letter_c2[i]).setAngle(90))
                        letter_name.push(this_.add.image(level.plate.x - 90,level.plate.y + (i - (letter_c2.length - 1) / 2) * 90,  letter_c2[i]).setInteractive().setAngle(90))
                    }else{
                        letter_name1.push(this_.add.image(level.plate.x + (i - (letter_c2.length - 1) / 2) * 90, level.plate.y + 90, letter_c2[i] + letter_c2[i]))
                        letter_name.push(this_.add.image(level.plate.x + (i - (letter_c2.length - 1) / 2) * 90, level.plate.y + 90, letter_c2[i]).setInteractive())
                    }
                }
            } else {
                if (level.letter_c.length == 3) {
                    for (let i = 0; i < level.letter_c.length; i++) {
                        if(level.h == true){
                            letter_name1.push(this_.add.image(level.plate.x-30,level.plate.y + (i - (letter_c2.length - 1) / 2) * 90-135,  level.letter_c[i] + level.letter_c[i]).setAngle(90))
                            letter_name.push(this_.add.image(level.plate.x -30,level.plate.y + (i - (letter_c2.length - 1) / 2) * 90-135,  level.letter_c[i]).setInteractive().setAngle(90)) 
                        }else{
                            letter_name1.push(this_.add.image(level.plate.x + (i - (letter_c2.length - 1) / 2) * 90 - 135, level.plate.y + 30, level.letter_c[i] + level.letter_c[i]))
                            letter_name.push(this_.add.image(level.plate.x + (i - (letter_c2.length - 1) / 2) * 90 - 135, level.plate.y + 30, level.letter_c[i]).setInteractive())
                        }
                    }
                } else {
                    level.letter_c.push(level.add_letter)
                    letter_c1 = level.letter_c.slice(0, level.letter_c.length / 2)
                    letter_c2 = level.letter_c.slice(level.letter_c.length / 2, level.letter_c.length)
                    for (let i = 0; i < letter_c1.length; i++) {
                        if(level.h == true){
                            letter_name1.push(this_.add.image(level.plate.x,level.plate.y + (i - (letter_c1.length - 1) / 2) * 90,  letter_c1[i] + letter_c1[i]).setAngle(90))
                            letter_name.push(this_.add.image(level.plate.x,level.plate.y + (i - (letter_c1.length - 1) / 2) * 90,  letter_c1[i]).setInteractive().setAngle(90))
                        }else{
                            letter_name1.push(this_.add.image(level.plate.x + (i - (letter_c1.length - 1) / 2) * 90, level.plate.y, letter_c1[i] + letter_c1[i]))
                            letter_name.push(this_.add.image(level.plate.x + (i - (letter_c1.length - 1) / 2) * 90, level.plate.y, letter_c1[i]).setInteractive())
                        }
                    }
                    for (let i = 0; i < letter_c2.length; i++) {
                        if(level.h == true){
                            letter_name1.push(this_.add.image(level.plate.x-90 ,level.plate.y + (i - (letter_c2.length - 1) / 2) * 90 , letter_c2[i] + letter_c2[i]).setAngle(90))
                            console.log(letter_c2[i] + letter_c2[i])
                            letter_name.push(this_.add.image(level.plate.x-90 ,level.plate.y + (i - (letter_c2.length - 1) / 2) * 90 , letter_c2[i]).setInteractive().setAngle(90))
                        }else{
                            letter_name1.push(this_.add.image(level.plate.x + (i - (letter_c2.length - 1) / 2) * 90, level.plate.y + 90, letter_c2[i] + letter_c2[i]))
                            letter_name.push(this_.add.image(level.plate.x + (i - (letter_c2.length - 1) / 2) * 90, level.plate.y + 90, letter_c2[i]).setInteractive())
                        }
                       
                    }
                }

            }
            console.log(letter_name)
            clickEvent()
            // Bomb()
            if(level.light == true){
                light()
            }
            if(level.guide == true){
                guide()
            }
        }
        //字母点击事件
        function clickEvent() {
            for (let i = 0; i < letter_name.length; i++) {
                letter_name[i].on('pointerdown', function () {
                    this.visible = 0
                    result.push(this.texture.key)
                    if(level.h == true){
                        showLetterName.push(this_.add.image(boxName[result.length - 1].x, boxName[result.length - 1].y, result[result.length - 1] + '1').setScale(0.8, 0.8).setInteractive().setAngle(90))
                    }else{
                        showLetterName.push(this_.add.image(boxName[result.length - 1].x, boxName[result.length - 1].y, result[result.length - 1] + '1').setScale(0.8, 0.8).setInteractive())
                    }
                    back()
                    if (result.length == level.answer.length) {
                        if (result.join('') == level.answer) {
                            for (let i = 0; i < showLetterName.length; i++) {
                                showLetterName[i].setTint(0x00FF00)
                                var item = showLetterName[i]
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 0,
                                    delay: 50,
                                    duration: 50
                                })
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 1,
                                    delay: 100,
                                    duration: 50
                                })
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 0,
                                    delay: 150,
                                    duration: 50
                                })
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 1,
                                    delay: 200,
                                    duration: 50,
                                    onComplete: () => {
                                        if (item == showLetterName[showLetterName.length - 1]) {
                                            this_.tweens.add({
                                                targets: [plate],
                                                alpha: 0,
                                                scaleX: 0,
                                                scaleY: 0,
                                                duration: 200
                                            })
                                            for (let i = 0; i < letter_name.length; i++) {
                                                var item2 = letter_name[i]
                                                var item3 = letter_name1[i]
                                                this_.tweens.add({
                                                    targets: [item2, item3],
                                                    x: level.plate.x,
                                                    y: level.plate.y,
                                                    scaleX: 0,
                                                    scaleY: 0,
                                                    alpha: 0,
                                                    duration: 200
                                                })
                                            }
                                            for (let i = 0; i < boxName.length; i++) {
                                                var box = boxName[i]
                                                var showletter = showLetterName[i]
                                                this_.tweens.add({
                                                    targets: [box, showletter],
                                                    x: level.plate.x,
                                                    y: level.plate.y,
                                                    scaleX: 0,
                                                    scaleY: 0,
                                                    alpha: 0,
                                                    duration: 200,
                                                    onComplate: () => {
                                                        graphics1.destroy()
                                                        level.flag = true

                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }
                        } else {
                            for (let i = 0; i < showLetterName.length; i++) {
                                showLetterName[i].setTint(0xed1941)
                                var item = showLetterName[i]
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 0,
                                    delay: 50,
                                    duration: 50
                                })
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 1,
                                    delay: 100,
                                    duration: 50
                                })
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 0,
                                    delay: 150,
                                    duration: 50
                                })
                                this_.tweens.add({
                                    targets: [item],
                                    alpha: 1,
                                    delay: 200,
                                    duration: 50,
                                    onComplete: () => {
                                        if (item == showLetterName[showLetterName.length - 1]) {
                                            for (let i = 0; i < letter_name.length; i++) {
                                                letter_name[i].visible = 1
                                            }
                                            for (let i = 0; i < showLetterName.length; i++) {
                                                showLetterName[i].destroy()
                                                if (i == showLetterName.length - 1) {
                                                    showLetterName = []
                                                    result = []
                                                }
                                            }
                                            for (let i = 0; i < level.prompt.length; i++) {
                                                result.push(level.prompt[i])
                                            }
                                            if (result.length > 0) {
                                                for (let i = 0; i < result.length; i++) {
                                                    showLetterName[i] = this_.add.image(boxName[i].x, boxName[i].y, result[i] + '1').setScale(0.8, 0.8).setInteractive()
                                                }
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    }
                    if (this.texture.key == 'b' && hand_falg == true) {
                        hand.destroy()
                    }
                })
            }
        }
        //回退
        function back() {
            for (let i = 0; i < showLetterName.length; i++) {
                showLetterName[i].on('pointerdown', function () {
                    if (this == showLetterName[showLetterName.length - 1]) {
                        showLetterName[showLetterName.length - 1].destroy()
                        showLetterName.pop()
                        result.pop()
                        for (let i = 0; i < letter_name.length; i++) {
                            if (this.texture.key == letter_name[i].texture.key + '1') {
                                letter_name[i].visible = 1
                            }
                        }
                    }
                })

            }
        }
        //灯光引导
        function light() {
            var n= 1
            var answer_arr = []
            var index = []
            var index_f = []
            graphics1.setDepth(2)
            var zz = this_.add.image(level.plate.x,level.plate.y,'words').setAlpha(0.0001).setInteractive().setDepth(2)
            var cricle = this_.add.image(-600,100,'cricle').setScale(1.3).setDepth(2).setAlpha(0.7)
            var hand = this_.add.image(-600,100,'hand').setScale(1).setDepth(4).setAngle(-30).setOrigin(0.3,0)
            if(level.h == true){
                hand.setAngle(60)
            }
            this_.tweens.add({
                targets:hand,
                scaleX:1.2,
                scaleY:1.2,
                duration:400,
                yoyo:true,
                repeat:-1
            })
            for (let i = 0; i < level.answer.length; i++) {
                answer_arr.push(level.answer[i])                
            }
            for (let i = 0; i < answer_arr.length; i++) {
                for (let j = 0; j < letter_name.length; j++) {
                    if(answer_arr[i] == letter_name[j].texture.key){
                        if(index.indexOf(j) == -1){
                            index.push(j)
                        }
                    }
                }
            }
            for (let i = 0; i < letter_name.length; i++) {
                if(letter_name[i].texture.key == answer_arr[0]){
                    index_f.push(i)
                }

                letter_name[i].on('pointerdown',function () {
                    this.visible = 0
                    if(result.join('') == level.answer){
                        cricle.visible = 0
                        hand.visible = 0
                        graphics1.destroy()
                        zz.destroy()
                    }else{
                        letter_name[index[n]].setDepth(3)
                        cricle.x = letter_name[index[n]].x
                        cricle.y = letter_name[index[n]].y
                        if(level.h == true){
                            hand.x = letter_name[index[n]].x-15
                            hand.y = letter_name[index[n]].y+15 
                        }else{
                            hand.x = letter_name[index[n]].x+15
                            hand.y = letter_name[index[n]].y+15                            
                        }
                        if(n<index.length-1){
                            n++
                        }
                    }
                })
            }

            letter_name[index_f[0]].setDepth(3)
            cricle.x = letter_name[index_f[0]].x
            cricle.y = letter_name[index_f[0]].y
            if(level.h == true){
                hand.x = letter_name[index[n]].x-15
                hand.y = letter_name[index[n]].y+105 
            }else{
                hand.x = letter_name[index[n]].x+15
                hand.y = letter_name[index[n]].y+15                            
            }
        }
        //全部引导
        function guide(params) {
            var n= 1
            var answer_arr = []
            var index = []
            var index_f = []
            var zz = this_.add.image(level.plate.x,level.plate.y,'words').setAlpha(0.0001).setInteractive().setDepth(2)
            var hand = this_.add.image(-600,100,'hand').setScale(1).setDepth(4).setAngle(-30).setOrigin(0.3,0)
            if(level.h == true){
                hand.setAngle(60)
            }
            this_.tweens.add({
                targets:hand,
                scaleX:1.2,
                scaleY:1.2,
                duration:400,
                yoyo:true,
                repeat:-1
            })
            for (let i = 0; i < level.answer.length; i++) {
                answer_arr.push(level.answer[i])                
            }
            if(level.prompt.length>0){
                answer_arr.splice(0,level.prompt.length)
            }
            for (let i = 0; i < answer_arr.length; i++) {
                for (let j = 0; j < letter_name.length; j++) {
                    if(answer_arr[i] == letter_name[j].texture.key){
                        if(index.indexOf(j) == -1){
                            index.push(j)
                        }
                    }
                }
            }
            for (let i = 0; i < letter_name.length; i++) {
                if(letter_name[i].texture.key == answer_arr[0]){
                    index_f.push(i)
                }
                letter_name[i].on('pointerdown',function () {
                    this.visible = 0
                    if(result.join('') == level.answer){
                        hand.visible = 0
                        graphics1.destroy()
                        zz.destroy()
                    }else{
                        letter_name[index[n]].setDepth(3)
                        if(level.h == true){
                            hand.x = letter_name[index[n]].x-15
                            hand.y = letter_name[index[n]].y+15 
                        }else{
                            hand.x = letter_name[index[n]].x+15
                            hand.y = letter_name[index[n]].y+15                            
                        }
                        if(n<index.length-1){
                            n++
                        }
                    }
                })
            }
            letter_name[index_f[0]].setDepth(3)
            if(level.h == true){
                hand.x = letter_name[index[n]].x-15
                hand.y = letter_name[index[n]].y+105 
            }else{
                hand.x = letter_name[index[n]].x+15
                hand.y = letter_name[index[n]].y+15                            
            }
        }

        //炸弹
        function Bomb() {
            var rect = new Phaser.Geom.Rectangle(-100, -100, game.config.width + 1000, game.config.height + 1000);
            var graphics1 = this_.add.graphics({
                fillStyle: {
                    color: 0x000000
                }
            });
            graphics1.alpha = 0.5;
            graphics1.setDepth(1)
            graphics1.fillRectShape(rect);
            click = this_.add.image(462,120,'click').setScale(0.7,0.7).setDepth(3).setAlpha(0.4)
            hand = this_.add.image(460,130,'hand').setScale(0.1,0.1).setDepth(3)
            var bomb_arr = []
            var u,p,t
            var u1 = {},p1 = {}, t1 = {}
            var bomb = this_.add.image(460,115,'bomb').setDepth(2).setScale(1,1).setInteractive().once('pointerdown',function (params) {
                graphics1.destroy()
                for (let i = 0; i < letter_name.length; i++) {
                    if(letter_name[i].texture.key == 'u'){
                        u1.x = letter_name[i].x
                        u1.y = letter_name[i].y
                        u = this_.add.image(letter_name[i].x,letter_name[i].y,'bomb_u')
                        letter_name[i].destroy()
                        letter_name1[i].destroy()
                    }
                    if(letter_name[i].texture.key == 'p'){
                        p1.x = letter_name[i].x
                        p1.y = letter_name[i].y
                        p = this_.add.image(letter_name[i].x,letter_name[i].y,'bomb_p')
                        letter_name[i].destroy()
                        letter_name1[i].destroy()
                    } 
                    if(letter_name[i].texture.key == 't'){
                        t1.x = letter_name[i].x
                        t1.y = letter_name[i].y
                        t = this_.add.image(letter_name[i].x,letter_name[i].y,'bomb_t')
                        letter_name[i].destroy()
                        letter_name1[i].destroy()
                    }                    
                }
                bomb.once('pointerup',function (params) {
                    setTimeout(() => {
                        u.destroy()
                        this_.boom(u1.x,u1.y)
                        p.destroy()
                        this_.boom(p1.x,p1.y)
                        t.destroy()
                        this_.boom(t1.x,t1.y)
                        hand_falg = true
                        setTimeout(() => {
                            hand.visible = 1
                            hand.x = 256+90
                            hand.y = 570
                            this_.six.visible = 0
                            bomb.visible = 0
                            img1.style.visibility = 'hidden'
                        }, 500);
                    }, 700);
                })
                hand.visible = 0
                click.visible = 0
                
            })
            this_.tweens.add({
                targets:hand,
                scaleX:0.12,
                scaleY:0.12,
                yoyo:true,
                repeat:-1,
                duration:200
            })
            this_.tweens.add({
                targets:click,
                scaleX:0.5,
                scaleY:0.5,
                yoyo:true,
                repeat:-1,
                duration:200
            })
        }

    }
    currentTime(){
        if (video.currentTime.toFixed(1) == 3.1 && this.num == 0) {
            video.pause()
            setTimeout(() => {
                this.big()
            }, 500);
            this.num = 1
        }
        if (this.letters.big.flag == true) {
            setTimeout(() => {
                video.play()
            }, 500);
            this.letters.big.flag = false
        }

        if (video.currentTime.toFixed(1) == 5.0 && this.num == 1) {
            video.pause()
            setTimeout(() => {
                this.red()
            }, 500);
            this.num = 2
        }

        if (this.letters.red.flag == true) {
            setTimeout(() => {
                video.play()
            }, 500);
            this.letters.red.flag = false
        }
        if (video.currentTime.toFixed(1) == 7.2 && this.num == 2) {
            video.pause()
            setTimeout(() => {
                this.rope()
            }, 500);
            this.num = 3
        }
        
    }
    showDownload() {
        var rect = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        var graphics1 = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });
        graphics1.alpha = 0.2;
        graphics1.setDepth(8);
        graphics1.fillRectShape(rect);
        var win_bg = this.add.image(game.config.width/2*3, game.config.height/2, 'nice').setDepth(10)
        
        var down = this.add.image(game.config.width/2-50, game.config.height/2+50, 'continue').setDepth(10).setScale(0, 0).setInteractive().on('pointerdown', () => {
            landingPage()
        })
        win_bg.setAngle(90)
        down.setAngle(90)
        //竖版注释
        // win_bg.x = game.config.width/2
        // win_bg.y = -game.config.height/2
        // down.x = game.config.width/2
        // down.y = -game.config.height/2+120
        this.tweens.add({
            targets: [win_bg],
            // y: game.config.height/2,
            x: game.config.width/2,
            duration: 800,
            ease: 'Back',
            onComplete: () => {
                this.tweens.add({
                    targets: [down],
                    scaleX: 1,
                    scaleY: 1,
                    duration: 500,
                    onComplete: () => {
                        landingPage()
                        setInterval(() => {
                            this.tweens.add({
                                targets: [down],
                                scaleX: 1.1,
                                scaleY: 1.1,
                                duration: 300,
                                onComplete: () => {
                                    this.tweens.add({
                                        targets: [down],
                                        scaleX: 1,
                                        scaleY: 1,
                                        duration: 300,
                                        onComplete: () => {

                                        }
                                    })
                                }
                            })
                        }, 600);

                    }
                })
            }
        })
    }
    resize() {
        var canvas = document.querySelector("canvas");
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var windowRatio = windowWidth / windowHeight;
        var gameRatio = game.config.width / game.config.height;
        if (windowRatio < gameRatio) {
            canvas.style.width = windowWidth + "px";
            canvas.style.height = (windowWidth / gameRatio) + "px";
            v.style.width = windowWidth + "px";
            v.style.height = (windowWidth / gameRatio) + "px";
            c.style.width = windowWidth + "px";
            c.style.height = (windowWidth / gameRatio) + "px";
            html.style.width = windowWidth + "px";
            html.style.height = (windowWidth / gameRatio) + "px";
        } else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
            v.style.width = (windowHeight * gameRatio) + "px";
            v.style.height = windowHeight + "px";
            c.style.width = (windowHeight * gameRatio) + "px";
            c.style.height = windowHeight + "px";
            html.style.width = (windowHeight * gameRatio) + "px";
            html.style.height = windowHeight + "px";
        }
    }
}

var assets = {"aa": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAADCwsIrKyv///8AAAAAAAAAAAAAAAAAAAAAAAAAAABsbGzT09OhoaE/QEBXV1iHh4fm5ubu8/F7AAAACnRSTlPp////ZB5j6gW60vW5rQAAAiBJREFUWMPtmGGPgyAMhhHdTkFA//+fvc7cbbzQlkVMLrmsX9Vn8KwUqJnn+b6Yr54wy50oZr4trj+WG5EIFH1fRELNZnLOD2tfDN65ySwuDuvQF+sQ3WKM870gQnlnPqR/S9qSfUbyHSRvMU6TQgGy/iyJhhTGZ6zWxrMkGsX+Io3kLJwjbdZuGWikyaZzpEiKc9IoOm+QaAgRQOMmOW+Q0LfqvEEqfGvOddJjKgVIdK6TKt+Kc5VU+1acq6Tat+JcJdHk1pokONdID7cMSHCukRJMbm8410j0QTaQ0HCukHDx+tRwrpAgmXaQzzmXSeg7gDPOuUzCZIqYpIxzmQSLdz32AtW5SELfx77gVeciCRdvPLaVXXMukXDx0lSjbziXSPjdz+6ZNOcSCefyu2uuinOBhMXyuQ9re6hAYoulXlt4El8s9drCk/hiqddzniQUy6qeby2SVCwxBnTOktI7kyudsyQolqpzr5PKk44UOzjnSLEsIBCSc4aEybSX58wgOGdI1aIvTqyCc4aEi9fjosCHufOahL73IpNxwPnTmoS+Q1E8ihWZOa9IxauxrLL4Q5nziuTlf4dLtpfzihRLpZt2WsheaJBivW2nctBenh1EbF6JNtk4pjR3rMojiVkQfMxeC62r4/a5Uf8xKV1ASgfJhu7+U7AHyUn35LeDQEQ6+n22L46e36NPd0lMR+/wijbkpf3MeZ66e6wTUb4BQohMJwXnZ/8AAAAASUVORK5CYII=", "f1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAMFBMVEUAAABHcEwAAAAAAAAAAAAAAAA4ODgAAAD///+pqalaWlqfn5/Dw8OJiYnj4+O4uLitnoKNAAAABnRSTlPxAG4mldY0137xAAAA7ElEQVRIx+3Xyw6DIBAF0EEeozz//28LdNGSCjjQNi64G1cnUeAaBhhjXEggRgoeITC24VC2hJNVmhiVNfD4cDs5LjIOYshmLUAi7kNBjMuMagwrhFvhoNV5dOjiGk0JHRwaVukOdkrZylfGd/ILN7A9ykR8fbXNzFZ9YG1J2LzHds92iQ9aMb6Iq50iL1iYwZqCW+dr4W6ryk79dqtMo1PEVtn/FmPhhc9vBu7VI0/DvigD9TZkqj/bK1cpHyo9uvcNkITRjliLTwyebj0mLNOwoQ9idFIyjQmjEXlAGQyH0bEqj0ZzQ9nEOPgA8URn6YX7JOMAAAAASUVORK5CYII=", "cricle": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MDk0OTY4MzRFMEMxMUU5QkFGQTlERjZFQUJBMzZFOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MDk0OTY4NDRFMEMxMUU5QkFGQTlERjZFQUJBMzZFOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUwOTQ5NjgxNEUwQzExRTlCQUZBOURGNkVBQkEzNkU5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUwOTQ5NjgyNEUwQzExRTlCQUZBOURGNkVBQkEzNkU5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+X28nKwAABedJREFUeNrsXVts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", "jj": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9rbGzT09NYWFivr68pKSmfoKCGhoY/QEDz8/McXljrAAAACnRSTlPq////ZB5jALoM3OjzFgAAAZtJREFUWMPtmNuywiAMRSFUKQVKgP//1xNQe9FWK/TM+MB+UmZYJnvamIRJqa49q1N/VVIyeelFvfqLZIpAQdcpEEqxTgjNTZ24FqJjvQjc8DoZHgR5LXQtiFBasEb6UZK38JCzvoLkwbkZBb6cFGClUEwaAewwiRIdG6mRGqmRGqmRGul/SOi9t+k/3GINiRoT5+4thXNYTro1Jm5qcspJuVVCUhyGSB8pVwBdQqJo5msPkp+PwmESLEk5AL8iZfj3pARJJJxO4lekON0js8NIgfHpxBzv6cgHM0dwbwzjkmQPkjRZM6fHM2hObkBwRzvWtb+D8eTU4jv9EB4kJWvisKctw3fflrA0+FnpKT1MovTsXlAGNpLbrwVhZfEqN7sV0j4JYQcVye6XV+VtfbLbKGM3c3tb6dIV+2R7TKG+Tj+fqq++PZBTYBx1KlsBv5/v/NP8lKXHoklxMR3eOVg8c+IMCx7bbP57JHsCyWaSG6v3T6PLJAFYSUIQRMr7PlenvPNLe7pT1OXd4RlrSHXiPlNK1VXvWDsl5R9ae1CB+TiR0gAAAABJRU5ErkJggg==", "vv": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD////T09NoaGhvb28pKSmpqamNjY1DQ0Pz8/N4hNUcAAAACnRSTlPq////ZB5jALoM3OjzFgAAAlJJREFUWMPtmNtyrCAQRQVM0JGr//+xByeVyIZuYEYfUnXSr+iCTdOby6T1+rlM12L5XLWe9Meirsfyoac1gaK9FjGh1mlWyojtWgij1DwtKopNXItNRJXmWtmroISyarqVZG4gmf+M5E2UPxFD+UdgWmuSl87JLAqUkRCmQSo+lRJAHtuc8zwpDX5//IQpBmWl9Gdr4tomaYNvTU7C1pD1U5Ow1x3lJXA8Gx+J65szbh6cPOxGJG5rFUTpWHm8OIrUkIfi9lwcuTJxLnJ5xyAYcWS1pK4ELQ9bLEwhRcKeM3mFOEwrRTp+2KmusYsjyT0v4OS1xNGkIB3Ic44QtxUlSZKOMiXkleLOmuOdzhR1+jUhKM7I0wd4UurdQpIcIc7FEfel5FWZsyOkUt6RPRQHldIgHf9C9qTHVYaV0tpbZFX0KC5UBs+RSiNyBsQlG8DM8aRKXtpwmuL4nRP9Lhz7SFMcT7KlFYE4WWauQaodJBNX2EDnXIDLBzNna3ENUum0TnAe1yPhSkxp39nttHfqKeQF3gZ6pEKeYD2uS0K/23fW4/pnOjSEhg10SQEqJhcXXz1not9lS8u+SjpyNCquTfKUPEGL65yi0e++xbnwOsnW2aNsYIBUHIC+7fOdO0Ks5FE2MEJCvzt30ddJlTzSBoZuQGgI9Ul/nISGwNjAEKk4ANE2MHa/qy5E/l1SKC5P5v07Z8hHFcPfjfq3kX7ju4rzl9+fvHuSFFsEo+GlSqTne5+7Fs83v+Od7paYn2+HdzxDrje+Z2q9zpffWOdV639Rf1rwCd1K5QAAAABJRU5ErkJggg==", "ee": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAADCwsL///8AAAAAAAAAAAAAAAAAAABHcEwAAAArKytra2vS0tIpKSmVlZY+Pz9OTk415coFAAAACnRSTlPp////EmRj6gC6wZtbWgAAARlJREFUWMPtmMFuxCAMRE1NtsaOIf//tU1yW7QVbuxWq5Q5R0+jMEZ4gCg/Cnx6BOWRiYByQb9KJjhATXxqBwoWREmrT0kQFyjY0pp8WlPDAoDiBe0oQZikdyDVjQdqUi2kjXVE2r+oY1Jlk2RMEub0MZJys5B0SFqNpD/1xNPTL3lKvmSqhVRjPNkmuPckl2+V3pOH9ORJ4zy90FaveDJkwJenH3t6LenidH3uzKTp6RaenMnksGnRsAl+//vp1p7YcnqOPKluURlXrTFvle7/XX+r9Gc6Pd3Nk2kD0ueb/NutzCLDtFg2RdsEz938X5I0oH/Sk4RcnaTKuJPOvk99Oju/o6cL0QIhJeTZHcb1mUR5cXesSyb6AmvHT7IheRMKAAAAAElFTkSuQmCC", "a": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAAAAACIiIju7u4AAAA4ODj///8AAAAAAAAAAAAwMDBVVVXT09O9vb2oqKhwcHCcnJyDjZvAAAAACnRSTlPq////Hv//Bbpk0dFGQwAAAg5JREFUWMPtmOuOhCAMRoUO6wUQ3/9pF81e+KCtRkw22Ux/zuABjrQgwziO8zT0xTRnyjC+JtMf0yuTMsjZvnAZNQ6zMYk++oKSMfMwGdcLyuFMdm1sP+jDmuFN+rekmNxPpI3uk6yD8HSXFFwV211SHtIKXH+XlEdRzsc7F++RonPw35qt3yPVY6BqjJdJrRcrOtdJ6Ft3rpOYuYjOVVJk/IrOVRLXv+hcIwU2OSTnGmljn5Gca6Q8uXBxzjopCp0LzhVSKvsmOnMuk/CBuJ45l0krJG/yZ85lEvgmkM86F0nY8QoTYp2LJExeD4uUdS6SoPFRzaPuXCJhsdx2ktWdSySQSv7YVkh1LpCw0321ozfGuUDC5752T6/WFoEEDel71wyac56ExTIy+y+zV7AkZYMUm7CkoJ0kJOcsaVMOEqJzliQUS30v5EhROZHIzjlSanbeK2WeISmnCKUUcqSqxVXnDMnXixmCxJRqSKFJMIgotWxJTdJjJGn0LQlnkPAF4Z9gtCFhsdwnJy9HcN6QMDPr91gtxxJck6rkbfIGfyjBNensJF8NsgDXJA9KtyZvqHG+XSERUxTgBFO+H2Z2+O3EbIT8UmWMS0v6d1DsSm1WQbC+aBbPPh3j+4v6j0npAVI6SEvoBoXlIJklUl/ExWTScd+39MVx57ff0z0S83F3+MQ15KP3mU/dsX4CkjtyKaZJ4a0AAAAASUVORK5CYII=", "h1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAAAAAD///9WVlYAAAAAAAA4ODhHcEwAAAAAAACoqKi/v7+JiYnr6+t/f3/Nzc2ioqIgICDLjLizAAAACnRSTlPx////ldb/AG4mzXR3fgAAAO5JREFUSMftl9kKwyAQRd2Ncf//n62a2tomCE4KbYrnJTB4VIIDd5CUUjGOBuFMJRFJuWAQS5azG+kgsdhIpY8hw5ikKcRAbrEZ4jgSEBGn34wFTBYY/Y6sqdigel9yvivXdZn17jYl4Tvyy0Kx30+4jmyEqLd19ZjHLsSmm095yp+T397pJeQDptyT9frkWo8kFGY/T/kf5JQMzL0NUyCwNRnU1uwnA9tGCDqYSUho3IPmdP0oZfXWiKE5w4d97fsJEJx6s4w1xNV4k6Mfd33MMs/DhlsHcdnieUyAwsqAAkQh6FhVRqNzQ9mJcfAG7uMt9NxDfvQAAAAASUVORK5CYII=", "ww": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABrbGzS0tKGhoahoqIpKSlDQ0OxsrJYWFjh4eGfz4sWAAAACnRSTlPq////ZB5jALoM3OjzFgAAAwtJREFUWMPtmEmO4zAMRe0oVY6taLLvf9dWNFj8JFO9cIAGGsVFgGj4Ip8lapiWZf1+TNfs8b0uy7R8Pbbr9vhapjULRXvNYpZap/u22fl5zWa7bffpscX5OV+z5xy3zHqzV4WylN2mX6V/pOR20yxE63uDZKM5Lezu7Dma1+KhFE0YVSE0qWTAgrFNyOZGpNgNJce62N6Blbch2AgmDqXcZb51O15VxXJox22YN6bGlwd2ozgHmqhSGlVZILWhIxG6zZlJV/LYnEZHBnFtbCzNltkUpV2EcCplv+3okH2xDVMCpVxQQGVirPX4dhkbjcLsCqYTFI5bIhhK4O/NlCg8w3SCciYwTEQJGdYosIyAgqjrlx5K6LA3wTGudAiIukIlqwVA1VooIqBwclR2REl+WHSTgMKK6iZdwWKyKZgqKKyo6FAJ5mbwCqbqAVS0GUOUZPAKJqWiTTGa6eCDvHgomKoLMGbOL54p4dIo2UdiahVOLEWqJDIF+EhB0SH7wqJKCOoFY/ydPeVCh+gpC3YEPnOJi95SJ2giaJhQia8m8s8aAGNlxgIlnHAQgwkJZpTAhEp8EUTa3lEys8zsuHMCAI+dQfYQeZopsVUAAZHeIcq9gykBqGP0PXAKOafsZ6jE0jPMCBJr8mLrECcMAPWEWUpAHbPExJXUPFJgxLc1SVUS+9sJQ816BBNXEnvuCcOrKWZg4kpJbHAnDEAoMYkzndh0TxgqwoFJKGmgKgwNFMEklDRQvsDIv/sPmISSBqqdT5TA60795uyrtG8ZSAm8n4FUJQm2ZyAlcNOynKokwfYMlJQjUMtyqpKcgT1Ra8eygUm5I4iNtyfq90fFN0oc1AhBuEsxKUoclB8LgrkLmBQlPnLsmIS7gEm7S+HIdEEwdwGTppSdOPQFwdwFTJoSv/SQgdlliGLSlPg1iTTnFy7/lzsnXA7J3RCvh7nK/97N/yul/QNKe1EK6fL7UwpFaTP+opI3W1Yq733hmpU3v9c73UfsXt4OP/EMuX7wPXNZ1vvlN9b7uix/ADNtWZ8IZ4b6AAAAAElFTkSuQmCC", "j1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAAAAAD///83NzcAAAAAAAAAAABHcEwAAAAAAAA5OTmnp6dnZ2dXV1fm5ubW1tbBwcGUlJR7e3tKSkrREHX3AAAACnRSTlPw////JswnAG6VJTCB+AAAAVtJREFUSMftl9uSgyAMholptQTk+P7vuoCroNW10Nnp7oz/jccPSICQsGEYbvzOKnXntwCyYXhAkx4RjiyOlcJEsz5cbFctG7Ce8Sa26xwAZwygaxJAcBxQG0x/GVZW4iRpamHlkXCWqYQFFvKVcBizzrfqM/D4sZ4vmy+bL5v/o83KiBhwY6ythU0M1FO8tbXwKtjqSptTj0IExCKJEWkmfL49gg2iy2MQRXeh0bOgr5Fc0U4mFOJ4Bod/ZGnB8qSLD4c2+zy66DsyywPZU9gVp6FAb/be/zBVtJfgBF/Q+fkcbFtPybJE7AuHu926dXpJ2yZ3YRWWptz86J7ygqONYeIMCbVesc+OONhVhtLWEJN8mm7xcjakXLE5YkvO1KRS2o05j9lDTyKJ/h62/r0MENtgTDCYFtZMKTOArmc1zDBIUSkJCebQLJ4KlEb1rLWsSqXRe0XZG+XgF8RaLBCY8RRYAAAAAElFTkSuQmCC", "d": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAA4ODgAAAD///8AAAAAAAAAAAAAAAAAAAAAAACHh4e/v7/u7u6KioowMDBqampQUFCqqqrR0dGA+WToAAAACnRSTlPp////ZB5j6gW60vW5rQAAAaVJREFUWMPtmNtugzAMhpNA25ADjvP+DzsvrTbMQEDsabvof4dAnxxjxwfjvb9P5iGRme5EMf42ObmmG5EIZEOWKFhCeTM6B2mQKYFzo5mclYJI1k3GuCAHDcEZImU1UniTukgR7JYKINZLpG3OSxDPk6I9UDxLCjvfDgkRn8esQtLCh1GBRKxCKNQgUeJvWNVFeqKqBqmhigppSGX9US9pwLVRh6SvMEVM60SIfSRSTjwTSjfJssIB/PedIbW3FWGFIk/lHtLLvEVoJ368K6TmmoVRFAipkzTwIMrs6RopMtcgO+w1EncNe3WRxF1T6V92k2BJ4hZeJ1UdUmBxTfElIcV/SFI6nZ7H9aLArkigky1VkC0/Mjj3kgLLfsGtkpibJDcdMMd0374VCzepoyIshLIq9d2xVpXKWTDKqrleh/HbXY9eJxaUukO1jhWtThfdQl3a2dO08RyO4OS0cTQBldMTkN5Utj8phv1B8T2b/xFJY6+SGwkUSNBIcxWD6txIbsYkU5wdkdq+b5ap7fw+93QqGtvuUGMNqbrP9H4U71hHonwA98ZTL4O87ywAAAAASUVORK5CYII=", "gg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9ra2vT09NMTEwpKSmhoaGFhYWvsLDv7++yVCZXAAAACnRSTlPq////ZB5jALoM3OjzFgAAApdJREFUWMPtmN16gyAMhgXcrIYQ8P4vdgR/aqwC1p5sz3LWp+3LlxBCQtN1/fejuWeP777rmu7rYe7b46tr+ghCuGcYUX3TGgPK3jMFxrTNw6Cy6p5ZhSbG2sBdUESBaf5JnyCRB9SLoffhPZJH7aKtpPhJI4TLJK9PDOgSiXD+F43DYkQ0sy6QQEenkIYXswmGoZIUoiCHaji0MbrtNFWRAi/rx+HMFH9PNSQOkRoyZpEll0kMssNQQkGR5EuKFgepQOK9CUPRvMyFI1Lcf79bn+FI0uGRF8ySKO6w2LWw5rbczSjKZ0kQ/d8uDZtDh1ZGCnMkdmSz9IipBMTYEnCyjtK9HMlrt5XEivzTbxHBAglFKgWx14ya02NMZznnXYgeSN+8zDTPZ5iWLciQpt8eB3U+j1PBS+HL5ROIrJQbPX29FuLCCZZhQpF8cz2O9fegmh+Rnhtt1wPvUdbfCu9iBESYYC0OR5bZuxhSFDkA2athE8U8ieafwnGVUdtqUCK5meSOSQ5+saZl0Xc0cXXelP15n9/RJHN8qUBvaQJxWmCqKW9pkrWXplVFZtpKTfxfEah0hPGElNOkZBlfLrXNCa7VxMurrSgn7ke8oEkWTY7UE+UvaVK77iL9e7mltLh4Cpr2N2dSpd1akKrzaar6dtfgLJxwIZ8mUbDvMJBbV3spx2dRNFRYUVNdJ1ajKfnnVA0oU8c3jWbBQW6l813PinKZLnrKDdH9ns4I7KA7kzXS68hxPm1MlYTsAWZqDpCqJ6C5myB6Bj+s/Q76S1MZXhjLCpMiwSsMj6a7uunVi+mV/qf8v0py4fb7U3CJZDTdJJE2kZTe+9w9S29+/E73EWvT2+EnniH7D75ndl3f3n5jbfuu+wFWKWXkJPwHdQAAAABJRU5ErkJggg==", "xx": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAArKyv///8AAAAAAAAAAADCwsIAAAAAAAAAAABsbGzS0tK+vr4/QEBbW1uoqKiYmJiKiorl5eUeISJw3LVYAAAACnRSTlPp////ZGP/6gm6iJSMwwAAAj5JREFUWMPtmNtuwyAMQLmkLCFAoP3/fx1ka0uMDbREmibV2sMm0lMOMzaBzfN8WdjXSLDlEilsnhc5HksiRZDVY2ETik1SarWOhdJSTmyRVq1qLFZl5cKY1KOgiNKSfUh/TQqOP8OFbGTTlhrCSDln/8ATBEZ4qJI8J5+H38FtlRQ438Qz0jy2xwi/ZkPuMUKSQva40He/nZkNXOOamRopfUDlH7j7xSno/CtCy07FSVhR+kE3E//2jSyIs/biuB4OddOtfPKYX8ONyPG0yNAPuCngRpAM4nd0E9CN2nfJbwV+DrqZrh2M+NXdSFLyO9i4DdjqzqpiPFjh/HfhS7dKfXLAr+FWIcFMbLjVaibcHfnql27V6guz+jdW1K1KIvxcXkU7OwLqR7g1egvidyXcGiTEj3Jr9bvCL6vqr5HgTsazu4NU7D4qK3tW3HXtlBapcKv61TLTUpmpXyRpvBqol3cL6kZU3irJWLKq2Neqij6r0pFupF+lIxw6nlYtv+4u5cRbXao4GcApFqeC3m6easKxKXd2c+hmfk6uonJ66jz1pAnA9Oo59Rh0UXzLDz8dYiKu4Yefx7HkMQ2/gmSof7iBRT35BZqUnrdEEsKmldqDoefkcDe0aYV8pQqSPSocii3087keNicQnn7NyptfQSrevDRoytQgkgWOfhusvSp+3s3/PcmdQHI76bYN3z9tt50k054w5v2fWNZkJO33fXws9ju/dE93SkzslEvI/e7wxPvMeZ6G71inSPkGd0NxvOAdpXUAAAAASUVORK5CYII=", "b1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAAAAAD///84ODgAAAAAAAAAAABHcEwAAAAAAACoqKg5OTlYWFi+vr6JiYmhoaF8fHzm5ubR0dHyVRtPAAAACnRSTlPw////JswnAG6VJTCB+AAAAX5JREFUSMfdl9mOgzAMRWPclpLE2f7/Y8fJlKWClthoXua+IBWdOt6CbcZxvE13I9R9ujFoxvEJKj0rXFn0QmGjzYMfYRArMPYwk4pt9GQMwKASAAcOnA52/wcmj3v5WHpgj27POv7N21OYjtjZfDmBAyId+Ee2OUMqmFUqXpTwkBOfXAsP2b+9lMEcza3przDZl/Imj5j74LQkeWnZiGhlMOMzYRFjNxyr+Jk0cEtrWcMkgudjh6NcdMI+q6ONS65sf573FYb6CqudkZS1nQNesFxNO5e1jVHbKggb4z1kWZrnsumMKIP57pzNFXRe1Bj17lo85b8SNUb11B9cB30wm0M1TDrLi9YQr4fohf2a6P5ov9C1TOwm8MLybC4XLRy3t4EQ5kM7UsKWv91B18+2BjCdTAYY7IGwTQzp+8c94+e5wtHZQBM/TiTUMUpligcqfzLEoQ7GBgNpWPodmQGKnC0ww5CsUAkaPIFaU1tQlHoY7VrVVqNrS9mFdfAHWnovqn6m9GMAAAAASUVORK5CYII=", "zz": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAABHcEwAAAAAAAAAAAAAAADCwsIrKyv///9sbGzT09NMTU2FhYWZmZmtra3w8PD65CAeAAAABnRSTlP+ABihOKDNYCjMAAABe0lEQVRYw+2Y0ZLDIAhF1TS6ipL//9vVdGaniRiI+tCZzX3p2ylwFQlKa7OqUa1Ga6VfaoZeWpn8A35MkBlGLUp5G8ZkvSocBTbYMQULe4p+FJRR/iF9CcmDYwRRQkInURSQoojkBKScWvhhlP8tzSH5aaQnpu+MiT6Z+AkKspOJLGjLYfvOG+zPuTns6CoZC9up3IcqSUk5ADg4gOdOICSVTOwnyLpTkYSkWNlWku3ovqlkcqg2BRKQkLQtdZAq25AE8aQSAGebiFTZFgjbJKREXRLoeDkr27ZyRvE+qZSEuyQyEmlb7JgLKttsq9oMKVK9zXfMKqXaSWbbNQn53iYkVdVObdsuSSUAsW1XJFFvk5BkvU1Aqi8JD6JJ5SmrLgk3aFIkpC4JO2hSpHg6ku3xFW6SWjoOBg/pITXPuFDcydx7yu3PskZXAVFE8e4k9nyb/xOSw+H9E7r3ju3yoZYoub99nRvTG7KoOVr33eEMmYn7TK3NMmXH+gs+ToKKmQBNwgAAAABJRU5ErkJggg==", "y1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAAAAAD///9VVVUAAAAAAAA4ODhHcEwAAAAAAACoqKju7u6FhYXY2NjAwMCenp5oaGggICD5oeKmAAAACnRSTlPx////ldb/AG4mzXR3fgAAAYZJREFUSMftl9uygyAMRUEUK3f+/2cP4VgMClToSx/MTKfWssImgQwh67pu80I6bZm3AJJ1fdEhewEMrGed5iNNtvClpm5TAdvIPMRGeiYL9dOQeRrCTPkYzCn5DVgrxndz5hhlXHprZQ3WHJt4DxL4LZMVWGUw1yWX3FbgoDn5DY7U+Sk6cvWZk1YZJonLNoeGOMI21qzRStkuJ40HR7U1g+OkSrKow6AYSYcnvqTqrTXp3V3kYiqbBM8TI2WRlsx1aYexPLQcR8Gh/4pw5t0Cq7JltPe2xQFiKLrww3w6GDg1AkVL5dEqw5k6l1RcRJePJE62Nki0vXGes9TiUNwqBvkmLKa4UUnUKaHXFDfgyzwiKwIfathpsCyJrhdAlslUJdF1+Hq8ekovOk3F1LXrdpjtWDGbHviBH3gvPGK38mluwaZwwbh/lUIXFNV/D9PWCgsf/aM3wOFbL8DUjLCG/sNe97PaA7xAs+FEpzmgFmgTRm2ODcqgbWS0rYqt0XdN2Rft4B/4KimO7ymImAAAAABJRU5ErkJggg==", "n": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAA4ODgAAAD///8AAAAAAAAAAAAAAAAAAAAAAACHh4erq6thYWHv7+8wMDCioqLk5OTMzMxLS0sdDrnGAAAACnRSTlPp////ZB5j6gW60vW5rQAAAYxJREFUWMPt2NuSgyAMBmAOtstRhfd/2AXcbgVlbPlzsTvTXLUyfto0HhKmlLpr9oUE0/ekMHXTAg99S1KCuMGCJ0qxSQjjJRbeCDExLSIKJSoKzZgwEg8j2Ef6A5J1/BHOrL0Vey0ZXsXaWwlXUqghbnor8UpaOH+e+Lo/drXiqrO9lqTdHRuTvHt+xaSSnEAi5T/M0EiePzagUkm6J5HyToZGeiQdl/ImRyP5WLYRSDnpaT8KaUs6iVSuZBKpFBWNlK9kGunnNkchbbdeEsljkm2KalxyoS4qQHJ10gGpytkCSfvXNB8Rie9XAyRVT+0ASe70NXREOi/UIanaBcn4dhMnkNbz3zci/T45YaktKkAK7avgsFSenJ5EkvGY9EEpHItqUJLHohqVjkU1KslDUQ1L+dNCI7VFNS61SQckXxfVC1K3z7H8zQ6o6b1st12z73WKtrPwUqf46c3/keQIJFekOcBQmIskZuuxsLNIUpn3zViUmV+e05HEVGaHFGNI0nmmUhM8Y52S8g1dvFYp/mxZFQAAAABJRU5ErkJggg==", "yy": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAABHcEwAAAAAAAAAAADCwsIrKyv///9ra2vS0tKGhoY/QECYmJjp6emnqKhWVlbbGkypAAAABXRSTlP+AMsioa72RHIAAAHBSURBVFjD7ZjRboUgDIYxHlihWN7/bQduM20FPASTJSf2TsEP+tMWwSzL+jKz9lqXxSyrucPWxRQQwpxhQZnsGlg/ZxZM4Ri03s6Zt7i7CLOgjIKH9M+kkByzFGV30ZpCjxScMoHSrdAhJU1C1plcZxxNyq1fzNA55gLkJ9ZIolGT8qeb7OyOvtHJxtgl5WGBTwqYGHmUyJp8BlObVCZBqns85EY+SOorvi+PcgGPKZF0HPuRqWTd/kTPQyT+3gmVaqSiqz2PTeo1SN+q2VLXI50iQAZtNe8qaxRVBGyofKuTyldeia7kDkruVi0AJS7uacPe2JNvDRKdF1zKnbTczfqkgyrJSdLZt2alU0njhXBbxbcmSSdNCL1Q6lbfsjh81TepGg3UcZSR2EmTK5JOGh5KaWxvUUHFQ4kGdykVVNV6/B5JJ40qVyM7Z8U/Xw2lSxKd/UvVULrezXXS1NPkrf8CXYldS+5LkgoqaPt2+a8SePnc2nKPk9A+pIf0kB7Sp5Goc3gaPClC54w2eOZkZ0MEek7Un0xKN5DSTnI0ff9E7ueOrRe9b1l0x32dm7PfC0Rzj73MehNpvfE+87Y71m8nRm/ZdnKOFwAAAABJRU5ErkJggg==", "d1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAAAAAD///+oqKgAAAAAAAA4ODhHcEwAAAAAAACFhYVXV1e/v7+goKDLy8tmZmbe3t7v7+8gICBMTEzL/Ig3AAAACnRSTlPx////Jif/AILWawghtAAAAW5JREFUSMftl8mShCAMhllaRGT3/d91AKftaLcjiZc+zH/RkvoqCxgSNo7jQ08MqUk/CsjGUXOSdIUrm2ekcqPZUB5GoGUKNjBNYhut2cSzICnzkmauaLDi7ItgG9RRwfk++B1dZeI1bNWp3CVslLJvDlrZ/JkTBS6KZUEtiQYL4attKixiTRsVbrZ9J2xlE1h0O8f/hM3ziGzW0gJNd8FKbdYljPoKds61HX6aS+W9G/a/z/Apn12wKJHGl98OB7tX1B4E3QcDogS94OAIggYZ64MhEV7x/8NnMNwfNHxrq+zukMw4GHxDH89au6g/hp+BtQBKSWcl2QxHkPde2INVh4KDTLByJ2LdTmF32+Fgs7+tUHANw9KumxhgAUfBa68hrzsDI49a077Yq84gnXcV6bqhcR/JYPtaqWTdUf4rO0By11thbims5SucI56NucJTHTaCRCpUamLE2abNN21AIWpgI9m0vjuU3RgHfwBWYy7HTlq2QAAAAABJRU5ErkJggg==", "q1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAAAAAAD///8AAAAAAAAAAAAAAABHcEwbGxsAAAA4ODinp6c5OTlZWVnw8PDMzMyTk5Pf39+7u7tubm6AgIBLS0ujAl2lAAAACnRSTlPwJ///lSbMAPluYcQtDAAAAmhJREFUSMe1l+l2rCAMgJ3BViv74vu/6iWgEpBM1Z6bPz0d+QhZSMIwTdPX+D3clO/xK4LDNP2wR/IDMLCzvClzoodX/GPet8VE7DWMjIX3AwmMjcPA5vcjmdkcYfEMFmz4P7DmfsnijVN3YL2DSUTcwF2Fa3QT6S7BJi0OfF9tef7FXICTWt5YyVdQrn6DgTUdB4H2VX2GQ1zj+u4H3R9hF33riMDa2u4TbGNUODaVY+NBt6bhaJg//lEmxThY/FmSsIqrLdaT5bBDrUh1CxtklE2ZmXP0oHmMPwXLohiUSNBiAVflaIKA46cV6dij6hdhShYI3YcdOjWyLhovVNmT92FTrLPYr77aKPRhtAgfAqtTZdMGlsUzZhEcJ8fh4+i9Plw+QIprnJfyHBAa9ihbqg9yEb/CkoaXC7B4rrmyGScPqXnF3kYlwS5CntecQ2Wr0Gq/QtFFQUeHaOBQZZI/LqUpSWLJJKkzaVFyL/qil3kNrFEdMUlhvFgOSuLaSf/2PovisXzkdBAbSl1DPm1hj8pf6hLbQq3KqSVVSTS+iOHUYNJvjqyeK75MZglN53Aojc6wQ/UKOlzdWqGuGUt3jNC2s7bhkKHa6pUn6dQGdp92Gh00K2nJQcSaw+xeiwVa8A/z157D3ebuRDqbxsflFnekT2OFDdsUwrMY3HFKw6GmIefzdcCSYx6jtbcMeg4rU1g6w9HuOHklTxtkgRGO53vCURe6MT4es1lzMS5OvckRue1uUy/ATF8cVaMdZalmGZ7t/ZlXzxvMmOc3xQM1wzPhqYzpgfJQXsPTZ1V6Gv3tUfaH5+A/BBNDMkYdjnoAAAAASUVORK5CYII=", "pp": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9qamrT09MpKSlLS0ujo6OFhYXv7++Rl5hdAAAACnRSTlPq////ZB5jALoM3OjzFgAAAZ9JREFUWMPtmM2WgyAMhfmxgxhC8P1fdgJtT7GjLRIWs/Aue+r1U8MlRDnnf2Yl0/zjnVPuNlu55ptTno0iyBTZyqvJWtBBJg3WTmq2UQctU9DR8ru2IDViK7DqcvofTimaXUVIdMrpwKcIMVKzUzKfhUCNTmCMXnYViPJt0KRWJzxwylopcyUh04OM/2BIzpSx3q16mdiKvy6MYGKrLVQ/07LQBkrAVKBOMulnPRJtrKB+vCYm/aptCJvHw9TJxKUd16X+HU4zlSt4mSCm+kVhPM30uDd/LlzrVx7PMiG8wkYPYcpOYQhTzoB1AFMJpqqkQgfTM3W7qsC0VKZJfUyc3ZvVEg3SkCwIjSv4exZAvewkTLRBEjCtb7tLN1OIdTEJmDiamnepT0z3roFkezBv5nRvDHr6Av3eqvzZyjty/NFDpfb+6ZCJG7Fzndhujnd1h0eZ2eO0n+MX08V0MX08AeFOHPWeyuKgk2L8TnSdzS+nyglJPH8iLE7WkNCJjGWnMu9DmcrML8/phmgqs8MRY0g/cJ7pnJ/EM9bJO/cL9OhV5TB9wx0AAAAASUVORK5CYII=", "bb": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9qamrT09MpKSmjpKRMTEyDg4Px8fGjOYZ4AAAACnRSTlPq////ZB5jALoM3OjzFgAAAd5JREFUWMPtmNFuwyAMRYPJSgLBhv//2RmqbqQqFY552VS/Vro9MfY1eHFuv22LLrbb7tzivjarj+3LLTsLUdAFsdS+rNYGc+jCBGvXZbNkDqOLw5DlXNugFWKpYJeP0r9SSgSdoJRQoNTVAYgcFEaVErwLloKYxpQCgPGdOBALcSTUKlU1ho6AQ0rxrZL3plBNYCpYBDHMYLpT4Qwm75FrawqTzww1h8nzASYRk2lqEs05U0HEZNryBmyO75woEVPpFNMkKpKU6fERyD+ENuVSpt8SLCfffJ2CiXs3tXkK1/MEcDSlGdPls4P27BgQrzIR5lM5wZQaz3Qu8et9l56QrjLlIoQz/Alr2qZ4ZoWa5E8FK83xJ3NO1XWmcnztUBDVOCH2/Vfcd6bnv9K+O0lh6wZDTD+uUi5D5F97ncifOE6+ktuOkXnmc4EMKHWZqGXyUqZfJR4JkbLo63rzLvYnnriesDeFZUyEhxdW5lDfDXXLiBc83aAUTPl8q1MwBekMfjNcIs7wcf63GfMu19mSlLOFnxv3d01Sv4DKJZH9AbWvskex61+KQOH1U/HzNv/zShHV+yeMVckCKpUQLCvVfV/URd35lT3dlFjr7nDGGnKfuM90bl/VO9Z1d+4bxbBiR+wCTV4AAAAASUVORK5CYII=", "nn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAADT09NsbGyjo6NYWFh/f3+urq4pKSk+Pz8i6KGHAAAACnRSTlPq////ZB5jALoM3OjzFgAAAZ1JREFUWMPt2NuSgyAMAFAgtsj98v8fu4GZtrLq2JI87M40jyJnBINtIrQ291XQYr0brYW+rZYe600Lg1D1tKhIGbFY66WjhfTWLmK1VTpJCyerxb22ngoh5a34Sn9AShEeUX0+HikxXUse74NX5LORdCUFGCOejdQrKQEE9QiHM8LhSBye9lpSAUrlkdqMxCPJ1/qIkkrPTadK7vnCqZLK+MIzi9QmeR7pkVR0CZOqJzSDpGrfdA4p95PMISnfkopFwk0vgUXqm84j4czCJOFJLoVFaieZ55mUKiQpjJtOkKIbTzJB8mNSESTIw/ooUh1OMkWCtE0qkgRyS5GkeJhdM1IJXBKA45HaLwuP1L+8PBJeqDySrGNSEaTwK6nmpXYp8khtfYFHCvukmpTkPqlmpX1SzUpyl1TT0m7T5yX8Y14ci9SKlsgj5XF9b0indU6CDysgGYf709nAdVU2VIpjPbgZgHcqxW9t/o+kyCDFLpVM7j/l0iX7KuQnI4BFqff7Ci16z6/16Vhi6b1DjjakYexnam0Wco91MVr/ALcoVKM4a0ZnAAAAAElFTkSuQmCC", "p": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAAAAAD///+Hh4cAAAAAAAA4ODgAAAAAAAAAAADv7+/BwcEwMDCJiYnZ2dlubm6jo6O1tbVVVVVNns60AAAACnRSTlPq////ZB7/BbrXPLRkvQAAAXpJREFUWMPt2M2OhCAMAGALDhrQFnj/h92KmWRwxx2hzc7FHj18gUr56TBN0zgPsphHVobpMYM85gdLDDm7SsI6pqZhBCBvZOEJYBxmcFKIwwHnGqwcMhY48bCqSfaWeqVE7m1QjKFJOnGeXLgsJfchLF6UrHPv52AwRlusJJVKkcU3VJfEI9vyGDQkrn2mUEMyPju3qkgGD4Pqlwyn3epIngfVKIXncozpWAfYKXGZYD292C25/LLj83dqluxeKK5KMv+93Cftf96/prxb2pIc1CRUkbRmVzIeq4yT2iqw316ZdDhVcnO1nG8rWWcvoGpyAilVK0Ig4fF06ZUwV4upXyoHHsqlkLc1irKTkw/zuF8MfMdpHn5fMHK6elf5W6J0/f50XsFrTNhyEzvb6dpvh7d0S7f0/9LxBZT633f1q4yUXop0YUT32/xbkkZfZS0SKUhUpCWIIVyKBEvyskgLsFT6fYssSs9v69OpxFh6hxptSNV+plaP9Qdp/T/ntXc/4AAAAABJRU5ErkJggg==", "tt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAAAAAABHcEwAAAAAAAAAAAAAAADCwsIAAAArKyv////S0tJsbGyPj48pKSlNTU7SOuuZAAAAB3RSTlPp6gC6EmRjzMR22QAAANtJREFUWMPt2NEOwiAMBdBaQIpQ+v9/K+NFQ1xglgdjet93cpdsy7iA6O8ObpqAu3tEQO9IH+cRDkiKLnJQEIhKzLrEQhTAkcQcdclRyAFQ0UKNKgQm/YJUJM0jPJfSYngmlVVJZlK7tfyYp1EmmTSXxifzdTFffDLjqsRX3+ATaeUNHvq9S5W//j6NnbZJ1sk6WSfrZJ2sk3WyTn/aSc7PTxel4deyKM6cLCe/lnaiNumzVDfsT7VLlFgpcaIm9b0vVVX65nfsdFsSYMsI2bfDfXsmog/qjTV4xCdpYqaxYOeEwQAAAABJRU5ErkJggg==", "u1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAAAAAA4ODj///8AAAAAAAAAAABHcEwAAAAAAAA5OTmnp6doaGjo6OhXV1eBgYHW1tZRUVHKysq6urqTk5PoVjDeAAAACnRSTlPw////JswnAG6VJTCB+AAAAYNJREFUSMftl9uWgyAMRUlsa+UiCPz/tw6gDrHDUKGra+ah50VXdJOAlxzYOI6X6coadZ0uAWTjeIcu3SMcWZwbhYlmt3DwQ7N8wG5sAtBDhzTAxBjA0CWAsHDA+2D+n2DlJa6Sbo+5PbRoU4PVglliY0kITQX29EZcY3Q81BVY5rE1ok3FhBnsdYXKm+H5FVj+Gfwp+1P2p+x3lW3yaXvZBnkN3omuzBq5q8HPMrv8F3YP6Z5kFsjFN7ye2vyzdsh1Fd77RGwUegv5HPIVmFxWseGowfI8EzJ0sVeRWa2th/P8Yvg8TrFLhsakyOql3qhKF0uwppXZkGoRisxprvZnQzM9SNKqi85gps/yIEE/izJswxIVvVXs8e6ZJ4k3yZ+V+0Nn/9XQiLjE3h6cSoxxecYNOb4+IrFp8xr+nJVSR2uS3hVpT/swJSRFDx7qlImze9lOvckBYh+MCQbbw9rVMgOYdtbADoMUjZKQ4Am6NaUNSqdurHdblbZGr23KXtgOfgEwajkYcoIq7gAAAABJRU5ErkJggg==", "w1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAAAAAAA4ODgAAAAAAAAAAAAAAABHcEwAAAAAAAD///+mpqZUVFTOzs7y8vK5ubmPj49wcHB2dnbi4uJfX18gICBHH5kTAAAACnRSTlPxKP//JqAnAHfWkoPlSAAAAltJREFUSMfFl9GWqyAMRR2cjlURUev//+qVEMhJ7Jq1yn2YvNSGHMyGgNANw/D9HLsPbXx+X8JuGJ59kz2TOGlP/6GdpO5+rp84fWzxkn11jyYtqR/d2J9Tk539Ncy9axO7vvtzcZhfLttrzW1rcbxxkaOKg3diNPirQyN1BMcO4lmFhtSvtpScciwi3tI/nj96z+LcVuly68o5TfSuWcSRM5tKDDVPGIsuCq9i6PW4xmOadkmF0tiVyyc0GTDnPDcEImTy967cv0zV1dcBhAr55sp5ihigE1tE5OyyyCAG6PT4kkQKNHRPyCDOGIXIyxBUaOmPY6G2YYR8LTOElv44SxDvqkwkxQot/TEAiGE8KJJTDBVa2j0XsIhhJlJkGYAo0CWzMjy4ngU6yFuOwrlLc5kYFAO0LJO1pL9KYmXOUKyLIJSnueZqkJVYlclWA+VpxUI3YlgbB7xPcjhwidkNEEpSkIXeq8VtxVC8O5RLSSLa0VRigOa30bZY16FB1uJgVgPXVZ19g2w2fbMOCU9tR3pGtTja5XDhzXpXwALSYhuY8Mx+BMhGbAMJT+2EiGw/dCaQMjHQkJ0Rm0DCMyzwaTFiHZjxNAsgW7EOZDzFAsi3j7sK5DwUC+ZmxRsG8h/FggFWjGVS8BbZ0BTyTQxrIz3vZec43iDfxGltzGw1wyudyL4dEW6nIW/PErydWN9b8fKypxhzkJl/PYctJW2otbDefX9/Amw+9SZxv7Rolz6Lzwb1cibxmC4b2/yhbUk1pmtCqz3ogtJoP13rtYquRv93KRuGr9br4D+YfW6kuC9S4gAAAABJRU5ErkJggg==", "i1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAM1BMVEUAAAD///84ODg5OTkAAAAAAAAAAABHcEwAAAAAAABVVVWnp6fr6+vKysqFhYUgICBra2vbM0y5AAAACnRSTlPw////lcz/AG4mCOaTYwAAAK9JREFUSMft18EOhCAMBNCqWES2lP//WguyCXtsvbhJ5wKXlxBOMxBjTGEHZfaQBEKMB5pyNNwsn8pw15DkKIs6RViCYLJdBwDkxRRG+TjcbHh7JaZyrncqaTGtU7ISlxlXJZY3f8ZVtGPHjh07duz477E0gzyibwY/nYS0bWgqJUXfw+j7bHpnA3zUepEslvDGbNDEAyPWrExtCtpMsCb0gWJMAuus6tPo2Sh7MAcvo04giLEXrXUAAAAASUVORK5CYII=", "k1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAAAAAD///9VVVUAAAAAAAA4ODhHcEwAAAAAAACoqKiGhoa+vr7w8PDNzc3c3NyioqJsbGybm5sgICDKO9UMAAAACnRSTlPx////Jif/AILWawghtAAAAa5JREFUSMfNl9uSgyAMhkFaRCBS6vu/6xLtclCQQy92/xmnncgnSQwRyDzPD7GQTi3i4UAyz4IOSSCM7MY6te00ebofNXVLOexJxBC704IsdJuGtFGXZsrHYE7J/4G15Yes/jWtinF+sWZgy4Pk53E8kSrC6cBjXn7SWoIV5zr8xWHGDWfgB0jOX80wuHCZ8fdN18yYg5Qtx3yGr2wIoQa7i+sCW4NPLEvYGhzedYatwynrE90Ev2/YaszeDle2At+z97CFW/YWfqesnnrgKXFaT4MwLqWoSDthLHE1DJtc0K0wOp6UZgsMHmBXxyswWJlrIU0wuDz5qd/O8Q4Y2bA08GXLZhiOFm7irty1JN1l43usA9YQv99zlVa7p/M1LK5Tldb7dpKmtErrMKYJ8lXa8K1KupHsafqfj6SJc6Y6YCwtO/ihc7MlgUZV2gJjzljSz6C8M1DyEPOxsmDczSUY4v3Dr3+njUXRbYzJD9IZozOv5a0U6NehNWeMzX+9Axze9SJM9Qir6QFvpp81G8ILHjas7JRFaiGDZ5v9fLMfUAb1JPPw1OLbQ9kXx8Ef6zcwLom5v8EAAAAASUVORK5CYII=", "m1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAD///8AAACmpqYAAAAAAAA4ODhHcEwAAAAAAABVVVXp6emxsbGbm5uJiYnR0dHAwMBMTExxcXFiYmIgICBqk/H5AAAACnRSTlPx////ldb/AG4mzXR3fgAAAZRJREFUSMfN19mygyAMAFAWxarIVv7/Wy9BpEDrHUJfmpeW1DNDNEUgy7Ks00yQMU9rgGRZHmwoHoDB+g0ZPmqyhg9F0aECW8k0ZKOeyMw8HQrPwm1mYgwLRn4Ea7WJHE+TssbZD9kWa1HH+RTMx+wbVs1lQkPWtdn9I97yDxBcCB4vEuVNOYSQHTgU4c5ZKzym5wxVvhqFAzNvyV4sYcK7EJYO4OC2tuRuTENv7E3J/ThA3ua6MTyspuR+TKt2xOLYmXIQ86KV0Rj+Zo6isc4Pi1eJHrzz/LCS4giscoemxIHA9urQVLLE4OuLveaPwukKnkp2KJyKvtbK3GdduO5og8G6aReOxLJuchxW9d8Lh21VMhI36z8Sy2o9evZjU68gFo1tuQZj8atoOYBl+erF4qMoGY1dUXK+A7cY3hBnnHuE12DLA5cXpv/2JLIcVPuSm91QsSk5bgfybh+m0+TMfjfQP7MDHN71AmZmxBp2Yq/xVnvAMxw2HEeGAzXDMWE0pnhAGYyVjB6r4tHou0PZF8fBP7IPK2ApayFSAAAAAElFTkSuQmCC", "o1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAAAAAA4ODgAAAAAAAAAAAAAAABHcEwAAAAAAAD///+oqKhZWVnV1dWHh4dvb2+8vLzu7u6enp5LS0sgICC7FD5+AAAACnRSTlPxKP//1iYnAG6VzWIAUQAAAhZJREFUSMe1l4tyhCAMRa3aWhcCBP3/b63BdbkgbJVOM9PpuHryIpDQTdP0OY/dTRnnzw3spul7aJJvgYVd9U1ZA919bf/M47aYDfvo5iY20HM3DuujSdZhS/PQt8H90P0LzM7bfhfr6RbsDvAQ667CJ7SIl2EfPjbqcJaUCb/4C3AwqzKFKhjn32BhDZ8TKNYXfg/LN664NE5sv4Vdld1iT+M+wZyFq5TiVDPVYY+e8Z5kSxiTrsOoml5L/PKFF3ifw9uCmIS1Pl04/CCHdVQsRjQdzhPkpAJvrxawcayqAXM2KspgB18tcckkAI46fRn2CaAxyfC7LcPgEzqBDxBZBuvonsdiAXMSDhdhSKXBWmKIQV+ALcLlF3UYIqi51Aa7CzG7R6l4qjHHTKYwZrsK62IlpYsevasXCRrLKkyXYRUrg3FnL0WlGYzmfHTVQ41A5eX7GbYPv0675ExcqltSgsZDozf0IOkfBlKnayeJyzbi0aa4tPynA3DBzaSebOwfDsroDKcnMytRBs+J7nPHkJOZa7OAxagKMJ2aYdrG6G2jE8d1aYxgm7WxUot1oY9zqUemXbvY3N3eYtA67Yl3F8aKZ4Prtdrl+Wjp2jRUmGjO41B9DiOPvDZ0dwIk773a/ujfxsfmqVfgwbWwbtjhle6ztAo8ymXDqptihRrlmtAqc7igNMpH13qtClejv13K/nAd/AFTSnCwFhDoRAAAAABJRU5ErkJggg==", "qq": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsIrKyv///8AAAAAAAAAAABHcEwAAAAAAAAAAABra2vT09Oenp5MTEwpKSl7e3uKioqvr6/m5uZzkS6ZAAAACnRSTlPq////ZB5jALoM3OjzFgAAAsVJREFUWMPtmNuioyAMRRV7jgok3P7/XwfoqAQUafFtJo+tLkNIwg7DPK+/y9Bny+86z8P8s/B+W37mYfUgFH2GHrUOL87FKPtsFJy/hoXjKMc+kyNyH2suekEeJfjwn/QECbRGthlq+JJkE8pOM5+TAJliZ6Y/I1kR31IWxmkzC+8fmfmAZOIbIKfc3l8QtpWkgzswndoYWdBGCs+im64MStQFKXikp4rJsKf2nhRiBFPVnEfhLcmGzZluzDGl9B3JBwmnWxvDltRJIZw02A50jDBFGaawTsI8SGYvlDEPFdRI1n+q2KbNgOaCEjWSoM/LUHsCQlPIk9WFWqqQ/N+OLmFfQ8hXS5etr0k+3iKLEU19R7YPr0maLE5mVYF0fclnSpJfzUgKjDSjkCEJSRzfKUk+TMmjmMR0c8qSD5kKCcnuYNG2kkLydSWuSCFHTp88ahLTkKsKKW0nUPZsEih5+FyQDNkcU3ZsTPPAVUlpEuiiyQaSbCSlPolbkmr0STzmk37Mp7uI1/bO51M9C1RrFtBWsGemwb/SIs/M6xynHXOLg9ikhaXVkvh8VneMVHAIORyahbYKU6vgvKuEwno35E280A/Zxk4XWrXZjy2pWf4vNnffQBFHjkmRdl9IWsXpiUDOTb8ARVKoiGLrKeWuhZRMT4sTEmSqQOKVcNFp3rae5uBOJUYioVoVhmC6UJxISulC9aS9/Mqi7hDQr8Q2CSPu1KGCe5TzIVfb4XKtWFWDVz6Ae9RrKlq4BpYvTPO9ss9yCu6nDaXU2bSRy9a2CciXHMDxLgRhl6rNI6fupjJWzmX+B+2SNO+YFBPlirWeWcBMPr3q6FlQ57aq6RosjotK0ZHxy9kccNf63VO+3U/Af+kOQ9nu+yerIokz6CQB454U7/tUn8U7v3BP94i94t3hE9eQ64P3mfO8vrrvWF/rPP8BvblZOmxY3tkAAAAASUVORK5CYII=", "ll": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAAAAAArKyv///8AAAAAAADCwsJHcEwAAAAAAABra2vS0tIpKSmFhYWXl5dAQEDq6uqlpqbxXn7CAAAACnRSTlPq////ZB7/ALoMK36tCgAAANZJREFUWMPt2AsKgzAMgOEmq33Eatb7X3ZZQcbEoTOFjS3/AT6stNDGxZh9crqSzzG6OCTQl4boskBMulio7DwAhVFXIADvEnAYg64xMMi/BtJCQhE4k75AmhmXmKpCInxUSqmnpYpPFTotTYjzZekqCzTJJJNMMskkk0wy6UPSRjz1khCpm7S+x+5L28mlduollcm+6ae/qeKR5ndfZa+2+KHTIuvjHejgCba3+X9KparnT7U0CdZ7/+0qgkht3ld0tZnffU7XJd9mhz3GkLnjPLPbjPUGkdZ04S4GOg8AAAAASUVORK5CYII=", "g1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAAD///8AAAA4ODgAAAAAAAAAAABHcEwAAAAAAAA5OTmoqKhaWlrs7Oyenp61tbWJiYnExMRubm7X19dNTU0gICDQbSs7AAAACnRSTlPw////JswnAG6VJTCB+AAAAiFJREFUSMe9lwtzgyAMgFW2Wnm//P9/dYFSiU4Q6W252/VW+pEHSQjDPM9fy/dwU76XLwCHeX5OXfIMcGBXflPWSA8P+NDjbdGAPYali430MgzTOnbJOkHgJtoH07+CnbSevMRKI+7AzBJKsFjVCjNyIta0wI7HHzP2ttUwDf9Twq5hFUhtzozRV3BgvfkdBRG0yzpsgnfiNP4SlkwNFr7IQkaCTTUY1jliHWP4iCCSqgw7sMyhIMWzlgL55MuwRjFJJ0awLRztfYSDYoG8p1xLSDW60Qwd1xGWSLEFViVbKcu78xKMrDLZ++ypgSiUNAsUD40CC3tKxlKNlXw2eV/Yh+wTNokuRRtcZtlqGzBLYkmcVeYB1jn9wDkZvzgKVQXYZo9kcNmdlbW/hnVQofZllGInGmDwoBeOZv8nTHO0gbsFy5xV8Zwh2pa9RFzCCmUu1BKsb6d7DePctjHcG30NwxJ1OZ99vHRAfBOsc3ILvhUBa9PskN2hoLkaheKhozTAYc2cXFhajA2wQkqibnK4P2rw6NFpgXIIglZtSZK0qco4UIXjhVSmWbmet5ZbmK2crXSSjSb85I41ttoAkeXEs91dqeKXlKrLmUSlFq1TSb37IJWiZRpSfNcxT+ehyhzmtN9PUu7mBGigohj8GfFH4+NHU+9kelgzveDV3WfdmuBpejfJZrGBGsIzoVeW+EDplMfQ+6yKT6PPHmUfPAd/AAJBLiWZN90fAAAAAElFTkSuQmCC", "I": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAD///84ODiIiIgAAAAAAAAAAABHcEwAAAAAAAAwMDDv7++wsLDs7OxTU1Obm5vV1dVubm5imS3aAAAACnRSTlPq////ZDT/ALoSWgCnzAAAAK9JREFUWMPt2EsOwyAMRVFjkPm3sP/NBpCqKtPYgwzeXcCRgpSBH8WYQyJdKeQYKeYk+lKOtCH2unhTFERmd7rqFAmUhKtTx7LeWrwecl4I0suk4T/8azaFNPiWfy75u8TjsbQ+7f8nfZkbJEiQIEGCBAkSJEiQIL1MsruA7K4yu0sRt/nLpWkgzSOVoYZGOZKU1qum3oos6ex9RdfZ/PZOZ1IgkxHybId2e6bZxnoBABMvCYUQvY8AAAAASUVORK5CYII=", "dd": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9ra2vT09MpKSmXl5hBQkJWVlbw8PCTRi3uAAAACnRSTlPq////ZB5jALoM3OjzFgAAAexJREFUWMPtmMtywyAMRQ04wY6MRP7/ZytoMwUPbhFi0elEi2ycuT6WBHos3u/3bdHZdt+9X/xtc3rbbn7ZWYhAZ8RS+7I6B+bQmQHn1mVzZA6js8OQY1870AqxFLjlrfQHlDDahgWKgChSIhtCUyr9ROxXQvuT8UuwVwmsNY+WPRHx8zOxVym0lbKlF9mAOqaXFjWkBpjSV/I/zlJDTFnKnvw+xsRSnHA0g4ml6AQ1ysRu51yQMZlXRiI+K6lYx+93JlNkd6V1ghIwJan4vITqYoJ8GCHdD6UUfj0RMEFxsrEIX5UIPUwBikuCCii+fAaZ0sVVZhqWKSVjYqiAF44SMpkQ6NF+JGRKKfHtqINjOczEjjrawZMyRanSJVOsgsffOswEUqVLJpjGFKcxnT0+zkTTYnfOTFLkeHFaNDmO1QWlOXexqjo9t8oFE1ZuelAROiET5wA82g6XMCFQjdRVEdr1zta1OVb1XFbvyFSV09JYDeaOcKCa254Ow9KUXoW7noAz+qfU1NGUnq67O7RG2maOMeVwgr4fR0rzC+pmBJ42wF5MQQMTUM7R3qksinWEk6IlAHxP1P9WKU5QilkpoHr/hCErOYtKJbSOlfK+L+gs7/zSnm6KrXl3OGMNuU/cZ3q/r+od67p7/wEoiV6jqC640QAAAABJRU5ErkJggg==", "v": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+8wMDCvr69nZ2eTk5PGxsZMTEzS0tLg4ODWIWymAAAACnRSTlPp////ZB5j6gW60vW5rQAAAjpJREFUWMPtmO1uhCAQRWFxWwVF0fd/17Km2XCHGcYNmzRpln/t6tEjw+XDjOP4NZnvnmamr0wx431y/W26Z1IGWd/XbEaNZnAuhltfC9G5wUwu9YJyS24yxvl+0M078yH9MWn3yT5bXOgNSxR+rUi7xUZQHn/1DRK51FoA0efYXSZltaLgs8pWklZ4yaX8qyLlew+4Fnojlm+B3IqETw2ol+XSDd7/aH7xeJP08DEbXFpXQQIB1GvIMaSG3gFyATuHqUz8FqVefsFVkuNGC36aUi/BLx7LliHhkws9IkeqliHlS8o09s8XwUcsKMdmQaJ6kfs/LX+OJOih3EGHJEd63MvoVXKrnnSRjtPIyu06aYPC/tULVC5dSV9OT5ETSJ7Rw75KVE4gYSCcPYBVRkZKY26xkHePQY06axXwEqkOIpALkHFNUq2nyYkzZ6KZpsmJpJVGEchhlbRJdYIUcgsjJ68Lqqlg5YLmCqlK2k3MOIWElZi7PYjTqbbqIXprIwYUEtHb5IzTSKSrQyMGtDVdZMqPjwGNxA2JeuFwaZ3JVTItrWskz+oxMaCSWA/BWVlFW+bxq9APbRJzV+A/nkbaq6lIllP2CPW48JKcQqp6nI+BC6RqpuVj4MoOiC5tIpdxl0hktB6ynEYinS7EwKX9XZS3PC+SNituw17dc26xuXH87M3/Dym+gRRP0rx3g/b5JLl5CX1tmV0mned9c187z/we53RvacN5dviOY8i3nmeO49B9xjpkyg+VVEaowk+5HQAAAABJRU5ErkJggg==", "hand": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABwCAMAAABrcdPkAAAAgVBMVEUAAACtq6qQjIp3dXYFBAUWFBZQTk86ODklIyRiYGH1rzXMrnvkp0XdrFvw2M4EAgP/ryz/+O7///754NUODSD+6t8mHh3ix7w5MSz/yjRuZWR9XihUQy3/8Tj/2zVYUlPCs6yFenegeS3Swbr9uzK7ji7mqzHTnjCmmJK1pqCXioVW2xw1AAAADnRSTlMAH0dm8eKhudCA+3rjs3GjLpMAAAWVSURBVFjDvNZBz6MgEAbg2qrVy0yGccQQEyBchP//A1etS92YfIt72PeiafJkhmmBPk6p+gaxfdzIC3H2Bpty0eOkiZQrr1MhggIA5bEqJO1aRFZCEV+FpJlN4I0spZ09MRlNREweu8K+Rj1rWBZQdh7KFtNNyk7GGjOZiM+iedVGwSasEVdIMBGT2lI6sicuxBBTWjS5cgLgUopwjwiRgNwhe/4ToUJSYcpVion/N8IiDHSLhBgdULxBOHifdHGV2hC7xWkAuUO0Nz6whDLyaCwBkzCDhKEvIt1K9twhkgmWkfckfBA9tn3XdO2zmDBMOFo7I76rUsLjxEQEHpvqZ8K/iYzzxkUF7B5V2zTN3uOVjPytcnDlsGvQGjNi+3NjMk3Hq0o4A4EOBt9X0mQCZEfgj6ZxEog+qOtBXTVoCI6QRyfH64JJ1oAy2Pev6iRwOJOYdzUzzrsWGHFAfGVRjxFTJhK+W1RZBP50ixps/l10yBFdJgxLyOtK6Oho0anVPY9LclEWg0AO8bfi0bFoNMI0dJ+FWIJk9/rXiPFyjH4UVste5o3AgenT09WRHE+DQYSH93boeaU1fBK0HOiiacFIG6zWIix54c54x4cGorNibYJ8Tqza0vlzp4+3aMyi/zDEAAxD+6j9iQAz51n5XPEUmd6ZXMK5MTnP3zYXcqUhOZZMTH0lV5Osj8BbNQbyKzF/I0AcwvaMSygk+UtyPu6kmwUKIyQ7aUdgKM5Oegxykzwx0h1i6nyxFkambr8mbgiN/X6ClRPa/qzdG9m+Xx4vdFQqWMZflZiNdqIwEIWPdldbtAISQkIiPyEQ9f0fcO8ElCpC3Xv0SON8mTuTQtJubwe+N3XbRzfh4d1qjvA1nHeP7/pi29vpNU7eK56eSaSxAWn8CyL+3p/JOvZEdV3INp7UxjRpI+p0qZK4/LMaNyQep1jQXFfpApKN+xI1jdYmvtTg5uKz9IriR21gban8NM2yhH8+7pUsWfCUXsT5mPskD9bSbOFe5MllssN+hVUyw6BAfc3Cz+khroTf1xAWrOlPJ9M0s0zCaUkmaagaKHmF5OGU8I3ODq/S0Bx8O3fuf+0sO+AgOHdWfoF4r3OnbdzR6ZTwCO6TuYNv8oQkWfM7ckj+N0u/CA/YL0hKW3X1sKEiLcqfRfJjjM00P18P2TEeNfdnwGq95mWT1VzkohTltc7zspcWQoR/t5/rZ4KHEzHeC0hJ1OR/Heemqi4V1DQNVRPHxwehnmfkcFxW84x8sQrTvlZ8iQmZZsmO6WumrsrzBFl/rDdhXue96jovfbv6d47yeV7WOJF/fKxXPbENIRGGnF5enOMlMEifTGj6oB+gTf9LryxXjnWKS8O6QmgphZJFi2uuTkKdcHXSujCs7Vi4IoS5VlvuDEeUOwEstJCFY+2J65MWRccMRv2AYWztEaU7YRzrCdbhbSkOBC6lZAqhlgaMMOGASK0lc44IvMldgDghvCWhTx1rySPMuwFpHYd7S4kR4vC9RYD2XsgowqkWSwYHxKhWCRqHMzhSIH5Y6gCfDECka++1oArZT0PzF1Jo7w5g61NLOKOsnVA3RLLWcItpKBoN4xQ6NKsIqHXK94Qbdyu/a2kRFChqr2EI9UVI1qdUojeIjwGhdWulVeTBSswqqaEsKCglSIcWe4PIeEcia6PI0sLQyhco2zdLSIS7Qqi+N53kmt8RknXMSGmE5KhpiKFuRE4aLSOUxYwNP34iUqO9AXdUD0oPhgkwF17UUVSlR8QrsJHtnMYSoH/SGYvEHeK9HHC0jY+Il6VcppMRNxIT08hA0FUnDftGKTdklLSRUzaaCqbb3bBJAHnSbSDYewWRV7cH4RFUtPveTyYNvner+3NxR1qPt/7KDz9ge3z/jjAbuADxq4Wgf/1RFicNOo9GAAAAAElFTkSuQmCC", "a1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAD///8AAACmpqYAAAAAAAA4ODhHcEwAAAAAAABXV1eIiIjMzMzx8fG5ubnb29tNTU1ycnIgICBiYmIdEk3yAAAACnRSTlPx////ldb/AG4mzXR3fgAAAc9JREFUSMfdl8uWgyAMQKkoVnmp/f9/HXBqCUlQobOabHq03HINMQUxjuPUD6Iyhn4KoBjHZ9cUzwhHdpsrY9tpMYUP/agOHbBJ9E3sTvdi6LZHU2xdSHOn2mDVif8Gu5f6xMvVwVploWtgo1CYCjhMLNOV5KYuw2Eun65suLwPB+sViZjbcBicJdihHzuFg6aF1xbfOIEdSRBWOYFXMjT83HwTTpKHq12IdwEG1s6wC38CA2st0+LNd2CQWquW4+6SlU0RBsXoEiGxNw/PqZzAk3qVLMpwHGXTA3yIFypRFgZ+TqnMW1/CuXXmra5gk0zt3gYWsILmAsbWRW8OntPodx+TfEtgYGi9vHsn783AtIZLLYGBSRUWWwKFDbC86E4UPrNGLYHC6sQatQQCw5YrQXBiBAYPlf3heKYlEBikU0JYMouBYQMKMAw7pEF9g+LF8JpZz0zFggJEsM2tJTMdaAkIdrm1YeodvFoIBrn2WacF3v5TggiWKUf0zz1lj5/ZZxsJm78RZIeBs625pcWLrktF4g85sg8w5Js/2MQ173oj3JkW1nS/8ObrWb9FeIiHjVVWxhqpIR4TWqPfDyiNMYnWY9V+NPruUPbFcfAHE6AkGbqn/ZkAAAAASUVORK5CYII=", "v1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAAAAAD///9WVlYAAAAAAAA4ODhHcEwAAAAAAACnp6e8vLzR0dHn5+eUlJSBgYH39/dwcHA+Pj4gICCulAoaAAAACnRSTlPx////ldb/AG4mzXR3fgAAAd1JREFUSMe1l9uagyAMhKEoVsDz+7/rgrVlkIStuJub9qP9w5DhKLqu65tWXIy26T0ouu4pq+IZ4MBu6mJsOy16/zE+LsfosV40Uk6PipikbEQrt0dVbNKXWa518Cp91aWug/Wfwm5S+hWLmeGPdjma1eQ42GkIFekJ2x0DJ3/ShsypJwb2mocIqM+EiImG2Ez0bI+vMyRa41fL9ww/QXe+dSHSn+FZU7oB8Kr1zFlF6qZV5zAqfOvGtiUmJ2bYmuteEtVrYXqCK4dxMwzTaD0W4NxeHKaK84tcGPD7KxGoxswkPIKykAjNwTGRMMy/fYg2JsNZwKznk24VVaNnDGxS3bA00WQGHlJrYqrEZG4bSssbB5GYzMEnYz+qE5M5GIsKvaUms7tnugQdaTILoyVKETtLcd+GpWXGmFF9tenjhufysZThrDap+78cN2dX9rJPX55VWWWJdCyc6SYGwp+S547G09Qswqd5nJtcgofkkCRMLh7uKrE1N7kI49KiTC7CuFtTJpfvJLjnECaX4VAjcwRVrvJtSOFVwl6ErcqvIRfuYe4t2/3XJe7W3bP61htgaWtYK1/w5q6zbgtwGx4bi7kYS6Da8EyojWZ/oFRGL2qfVfvT6N6j7MZz8AfiDSw7BSRNZQAAAABJRU5ErkJggg==", "hh": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAABHcEwAAAAAAAAAAAAAAADCwsIrKysAAAD///9ra2vT09MpKSmHh4eZmZlSUlLWo2WJAAAABnRSTlPqALoMZB5ZMvsvAAAA4ElEQVRYw+2Y7QqDMAxF+2UT21rf/20XC4oKUrZkKFvu37THoxSh11jrgzO8uOCtNXZwyI8brPEEgsQLEMqbgJhiZiYhBuMQYo685AhI3xoTF0SohEZJ95OmGdbM6WIA89Qn7ZYv2YGOg9QjndbvNpweAbVDSqQxrsn0GtuENm+DsQJMXVIRI6mTOqnT3U6HsJw4pK84XeddJyZJnX7C6YlnXNRJ/5nqpE7q9BQnuRuQ3K1M8Kaod/P/JJXK7p9qaSQ8HPxPUgGJ1Pq+wkvr/JaeTiShdYcSNaQX7DPFOtYX0BOZQVxtMk0AAAAASUVORK5CYII=", "b": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAACGhoaJiYnv7+/AwMAwMDBlZWWoqKjY2NgFZoQrAAAACnRSTlPq////ZB5jALoM3OjzFgAAAbhJREFUWMPtmNFyxCAIRaNma1SM+P8/W+NOZ9Q02Qi8tczkJbs5g4hXYLHWfW0Lz7YvZ+1iX5vh2/ayiysg5QPHvCoot6zGeNA8A2/MumxGcUEFpUyJtfGab96UwJsgQAqVJOfTP4lGikldWELME6RLTrG9PAgPSVF9NHxG8krFq2hkxOpxyk9I4YZUaf5gZQHSe/1JhKRzQQURUkVFEZLGcX1kEhSnQIR0+tdHUpumGPv982RSl9t5CNQkqfkBCKSfxMmh/ZhD6j/OHJ9Sm9iZF/Hm3OKgLfS9S4MczJBSq5XHe5HTAknqBPvRJSIJ/ElUiCRUZ9Ekrg6CEtMnVLP5dHsrZBHSsX2enJl4o790fRp9nyW1oYndnTelKkdJkK70d0rptO6cgu7ETJL60HBIvSjRSbXcAcbqrtJgPuJXZeF8FjScrOmZ+bhaYZCGCopOguEU0klp9g6+u1yyhI4nmYoV8JeOY5pU2g1/0jxGB6T8o77ltit7K3rkd4oqBYx/tqOWm4bIkZIAKVXSntmgvFeS2RF4hrsppDrv23lWZ37HnE7E1jo7lBhDOsF5prVuZc9YV2ftN42FQUmmQZccAAAAAElFTkSuQmCC", "box": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAHlBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaVcReAAAACnRSTlMA+SzmO8qxQmwVOAE+mAAAAH5JREFUSMft1zESBCEIRFFaQOH+Fx41mNqaZMW4f/6qlKxFZHRc5CGzcEDLTTP1cPRh9UKn7ugpF2VABTC5qjkESkxMTExMTExMTEz8H6eN8/KDQ8+3ie5t8IOtF4rvn9t5+T7bEXcHWwNlTRxr5WxNqn0qvwh7UuWadPXWyR9cBQqY+AWRYAAAAABJRU5ErkJggg==", "kk": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD////T09Nra2ukpKR+fn4pKSlTU1M+Pz/u7u5YhaEKAAAACnRSTlPq////ZB5jALoM3OjzFgAAAg9JREFUWMPtmNluxCAMRYNJSxZjIP//sQW6CJxl2KSqUv02ODpjDJiLJ6XW92Xqs+V9VWpSb4vst+VNTasHOewz51HrNEuJYu8zgVLO0yKd2EWf7cJJn2uJvSCPQjn9k36dRBa+zFhKHRp/PCfnFQnTrw0kIP8b7pwXJA254Y/HwcnwiUQAevu2HcCmoH1LLHXWkCwHbRoMNZBC9gQD+S/rSR5kTiCDopqEftX0KSIU1SQCYCCRR1RKugQl61ZM8iOGThFZUU2KGXkRURkpgA62I3lERaTw/xx0iqiQ5E4gEE0kxw8bONFGykCHA+NEGymPyF1HVEISLKL01FaRNI/oBvSStD3UkR7S4XcpDSH5Y2LMkNltG90tXTUpLB4NIcUyoIeQwvzsGNIB1/MrIx0Fm6qIxI4M5pdKBckn2fK6Qi2kqDj4iGsgfUmXLFWW3XVFJPKXL6IB4vPTDTUTowQTTKW4hlvqcyy7X3xRMNRECipMPxeFUpLmN8OpKNToJ3osCsUkzSUdLwrl6pD4XcyKQoVi5UlnRaGC5PeQ2Qco1s+k5zIKW5W94Cc56CjdRDolXSeZqiKFpBPb6VjxAqJ7FzzHlL3KmHwjxjG29KUIlp14Sp+Kmff/bf7nSXYAyUaS0d39J20iSd5K2lLTID0p9vtMn8WeX+jTDbE59g5HtCHXgf1Mpda5u8c6r0p9AOy0YuqtYq7CAAAAAElFTkSuQmCC", "ff": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAABHcEwAAAAAAAAAAAAAAAAAAADCwsIAAAArKyv///9ra2vT09MpKSlQUFCZmpqAOpMlAAAAB3RSTlPqALoMZB5jrTHQzQAAAQZJREFUWMPtmEFywzAIRYWkRFAM3P+2Vb1qNaktGy3SDv8AL28cwQw/AZRnTr7kZwFI8MjoT35AKh1E7At1VEkVkdvmDCPWlFHb1nzZmmL/1sheUEcxpiC9CcmUjiJqkyQloWOU8BTJ6DQiNkNiovZxmP5bPEeSZaRw+hdO2y9v0y47vSZNTsu50+wEj056e6uMTh7S+zsdL0zHfyeia5zGhemYuza8y/tzd4l04kTh9CecXrzxnwvT9cZ10dxdmuDYmeEUTuG00mm8gPj+fTdcd4suRT01its8SN9IYu7+yWQnIZmTZISdtPd94sve+X31dEtS9+5wRQ1ZFvaZAKW6O9ZaAD4Bm6CnrBugTAcAAAAASUVORK5CYII=", "n1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAD///9VVVXAwMAAAAA4ODgAAABHcEwAAAAAAACmpqaIiIjW1tZsbGzt7e2oqKibm5sgICCvYVAeAAAACnRSTlPx////1v//AIImeqL+KQAAAWRJREFUSMfN19mygyAMBmAWQZTV93/ZQ3App0xt8/emuWkn41ecSGMQ8zwvbhLMmNxSoZhnZ6FwhMluihlb02KpH16yw1e2CAfZpp2Y7Cah2GwtszUYNlb8DtbR7BH1kIsl3eKTUvgxp9IN1qYPPebKDfankDLXdZ5yod75Zzip4zuC2+0mFFOhPIzrtSagWJZWMxDvNQOxXGlpFMu69ApjqhmMKYHj1G1yNqYtjmN6XGycQrfF2Th2W5yNr/sPCL5aTgHw1XKSArA5a7YiWF27FMAm/3/mPNy3aSZWj74P4eEP+jmuPSwmFFMjyTDW3cNm49ZIYBzM01uAg9u7MqGYalZg3NfsDa6X+rzHWar6e+pIlfvJIPUjRHh0wKfci4GmjPOMVmPuxSiV9LpHvzmOVA6/NAHCUy9hqxGr7Y63wLdhIzzRYSPmvDIi50hqEuDZpp1v2gEFjEXM8NLu20PZF8fBP3E+K4LnGswdAAAAAElFTkSuQmCC", "c1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAABVVVWmpqapqanT09Ps7OyGhoa8vLxwcHCampo+Pj4gICCntAhMAAAACnRSTlPw////JswnAG6VJTCB+AAAAg1JREFUSMfVl9GSgyAMRVG7tSKBgP7/ty6kVqKIKJ192Dy0M+iJIYRLEH3fP4YfcdN+hocHRd+/2ip7BTiws7xpM9Hi6f9Md9uMx55iqGKJHoRo567K5tYnrp3q4Ingpg5u/gzWaGRDJg3qWzBaT03NahYvw4TuzMA12L3fVkuwWhkawCswfVZtx1QYc2U4sCbJkLY7j4ewSQJkD+AcxhxLtDyFtdwEB0rpzTM8gx33jlQlcf4jf3gAT2xe5rPEwD4NedjP2HJWOvrVccHGPGzjrGBZGpBxgYH5TmEftY4fdquX9yA6ls0EZp71ioRwnFJyO/8UHqNn5gf59shn28Upjyw3n7RbdVZhNobFp+drZRyhtJ8ZbDaFfEWG5CbZ/wbOJcxrmixqGIN5GZMuTTv+bJ0xFgQrkulkP7PKgLh3TXCpl/rEK7XdrbKxVrlW9uquUp99bFhFez952MQcB9mQ2AEXTc10KIWByQasaVIsoe5Ew7h4gtyxBQ2jZYliO/oMMe11BfUkZdfHBQlNQbfpDXtIh6BN4azCDB0yIIunJDZHx1U4Yycon89ES5YoX1s0BFc6A1i6Ci+4wRb9253Z+YYG5b4lSTqas1YKDOMTJSg3cUFwg6HOy9BXvedXXW+LNSy2b3iG+yzMC9y2Vi25uWZK2UCJcE2otYEuKJX2FLXXKroafXcp++I6+As/GDRAQ83ISQAAAABJRU5ErkJggg==", "x1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAAAAAD///+np6cAAAAAAAA4ODhHcEwAAAAAAABWVlbd3d3w8PC2trbJyclubm6BgYGVlZU9PT0gICBmBYWZAAAACnRSTlPx////ldb/AG4mzXR3fgAAAetJREFUSMetl9m2gyAMAAW3Krv+/79eoreVhOBCm5eeoiNDDAjNOI5T1zcPo++mCDbj+BJV8QIY2HV+GOtGN1P8CfJxhIhNTSeElxXhheiaXqyyKlYR0yyWOngRMetiqIOHn8I6uOE/nHk3GqaNgfU8JOH2Rse0cXAYUJhSGwvHTtRHNt5ppbT7zx7xjz/r2aVPinfGgYR0VOWe9ZJc1SAZHzfrd0sb/5xk25B7l3SUKh0B957ndFRbngN/jYMt7QqLqPMKa8n96EnmqjzT9ErnSfIvYCxelC5MDPR20Hu7M6uQeEm6BFv8PpNavTOfM3FclxeLARX3qC4vYCLOSZ8sQ2FYDnGQbh+sYQ6tGXOe6hMYPJOMqSfaaiHJbbm6KcAeSf+P2t+DQVoRl7tFAtJZcmFe6BtwJl0Q52AkbVVZnIGRtJ6d5JdOHkbSAT2IFHwOI2lQPYqFztQMJtL40xaweAajuQejTFcfIk7hTNqasjiBcXnsbxYtXkicwIFKa7ISy3RmE3gm0iabUekHOu+5fcehC/qf5nLPFm0g3h8I3HpkjGbbp6xJRn9EeVsh7ccPTQK2+QebuK/2ntW7XoCFrWGt2OFVPWfVCnAPhw3XPgwHVA/HhNrotgNKZUxN7bFqOxp9dyj74jj4B7HuLj639bbUAAAAAElFTkSuQmCC", "e1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAAAAAD///+oqKgAAAAAAAA4ODhHcEwAAAAAAAChoaFWVlbW1tZtbW2EhIS9vb0gICBnZ2efsvmXAAAACnRSTlPx////ldb/AG4mzXR3fgAAAQRJREFUSMft100PwiAMBmA+i9QO2P//s47pwRmBtBizw97LTk+yFYutCiFE5xUz3sUNqhBuWpRbxdWWOzNl1ypuj2TYSRuLyonsrp3yuhhRit7KrEGGQasTYVyhlTUPMHSTuxj7eO3iBYDaXwlw4TbO9jOMaif2OfdxMgyMx5DhYOI1Rue1V5zAx4PiYzTSHwkBLBdmNAZyqv3lqGgCJyNuDEvmf42RZ/DvWnL8XzW4w6YuwPcqMO/tfDjqC78mA7StpEG1qT9WvL/Wl4EmdS0ORimy2Eo+1QQonnor1llis37iQnxLpWJfl43FMrNU5euaII3bFxRhopKuVftqNLeUTayDD3IBLS5h5ljfAAAAAElFTkSuQmCC", "z1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAAAAAAA4ODj///8AAAAAAAAAAABHcEwAAAAAAAAAAACoqKhXV1ehoaF0dHTKysrc3Ny0tLTv7++MjIwZGRknJye7dICmAAAACnRSTlPx4P//JswnAG6VuYtnZgAAAWJJREFUSMftl9tuwyAMhglpkwYIhhze/1UXmKZhDobQm0rbf1NF0Vc1H3Zcs3meH8uT3cxzeVwgm+eX6MrLwY491c2cnmbT9bGPt7Nf2MSWLtbTCxvEMXblEANjgvfBXLDPga3mhah1q8BF1OMbCQMns5LwyrksPaPhXP/DqW0tUQDdo8+5fLSbin5VCssINmH5qGptw/qTi7WhDQ7NjQGooiz6php8uQ38uKu9vSV1LEu397OOZQVXNRg/4p7IomAnS1KyCBjLgriRabguqwwjPVtSWSRskZ68rGJ5IlkyL6sAt8kqwKpJVvm9bUJWtU8M2SgrB6eyoH1WqVgWirYUDKEso9JxsxMwevGq3LAyjXCaFdfLX4EleVTRpELRpO2R10JVmKywlu6q30mVBj7rH+DZB58eFtDDgviGD3OfNYeDB7dsULWRLxhHDW5N6M3iF5TOTKx3rfKr0XtL2Rvr4BeaI0AqTaEl9AAAAABJRU5ErkJggg==", "cc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABsbGzS0tKenp4pKSmFhYVVVVVBQkKwsLDl5eWNVuU+AAAACnRSTlPq////ZB5jALoM3OjzFgAAApRJREFUWMPtmNuWqyAMQEU7YyUGCP7/v56A7UgoiNaeteZh8tjqNgm50o3j9H3vrsn9exrHbvy66+ty/xq7iUEE14QYNXU3rUHN10SB1rfurknN6prMijT7WsNVEKNAd3+k30ZCCzSsYpzFd0nIFGOGpxgWZ98goRtKQvYkycP6HuLSP8Sjffx2hoTxnY3yQwuKGnucFD+OfUkUn4CBo6QAcktfkfAvHCOFR21fl2C6PULC4Im+b6D8ARI7Avp9AWlfhcS20dIgLeFAWiTPDylpS2BnAYFCqTIJMiepZ3BbqZQxLRK/M2dH/hARFzY1r0iyUiUba4DnZA6oNNhT84okJ7zktyBEGfWqSWIdki9T8jxuf80xl+0uCUUsMZdydVdDg637HrfCBCuyIvhs838rMp04uSwpfkqfA+tbecfldkkjmWT4u3I1L5LMUDmfk72FT53SlDD2AsmJ5PoY6Tfq9PtIPo8CjqfByaCsxhMHsIgn99IFQ4gf6Zyc/PUYT6YDQHUq70jk3VonVs2MmA5KJK4YvlYL4FknYl0x5FtVxVbqU6ifT8sXpFbNlInXu+R52XTm9DSK1ZeEo9RW0rhVpP+0SfxlzJpU7C0uG4OwVceFN5J+Z/LWKY612oOx2IMx6+bU6sGYKbXOBZANeHRgwghh4xqjSqZSjeQbE93r0LM70+EuiLKZtTpnwv54uLisD+7MviGvoDbXzZTZtjuPx9bvq9NqBtrdEey6VrwYxu2GqwCe2Vse+w8gbhRcFzTwJ3cpS8VdyuE7+93LXkaA7++cT5oheH/n/Nvy/w/JfYDkIsn4y/dP3kSSHvAiCQfNpHjfZ65JvPML93QfkVu8O/zENeT0wfvMcZxul+9Yb9M4/gOyfVE6FjZSEAAAAABJRU5ErkJggg==", "r1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAACoqKhWVlaGhoa/v7+goKDPz8/o6Ohubm4gICBjJejhAAAACnRSTlPw////JswnAG6VJTCB+AAAAY9JREFUSMfNl9uygyAMRbm0tXIL8P8fe4BaAbWWxIee/eIMw5KQQEjYNE23+c6Qus+3BLJpekqSnhnObNRIxUKzR/oYgZZJ2IPNJLbQM2MyCpKiTI6TnAbzfwXbwPcKzsEAfIQuP7DfYMtPFPw5bDi3B/sDpQoOFPhtlKbCwmvODRUW0BmOhIVrlz6FrVpUF/Np6THYrCHSvjkFgISrk1PA3CjsihLtCTBsx9Aw6LpRDLzbc9qCwsKW7u0a6PE4H2XM4RN2fK88Ec5X2tFuFWQfBMp99krzDfv1VvnuKtcQj4XKdGkk4OBmvu/dNXRITOdsQMC2PZp5QCNgcG0aydtWCFh02daOZ88Cw9Zwg4BFb3j7q5FMojce1xi4N1zXYA/lMNdGqHlxxrJnZ3gN9hjcRSgH23+uDMzyRK2ziuHvh0udwL4tI3Tjpv3wQUHjmkmrk6GlNXwupbx9vVB97QTObYd/XQFeqnqlpbBWvuAIeBbiAksZFFIhUyy3CVTNpUEh6sGobVVpja41ZRfawT/EZCwa0XUhKwAAAABJRU5ErkJggg==", "oo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABsbGzT09O8vLyfoKCEhIQpKSlAQEBYWFjn5+fUAk1EAAAACnRSTlPq////ZB5jALoM3OjzFgAAAr9JREFUWMPtmNl2hCAMQAWnVUHC4v//axPsdAgo4vLYnD7MqXoJ2aEbhul77O7J+D0NQzd8jeq+jF9DNyHI63viETV1L6W0mO+J0Eq9ulF5MYt7Mguv0NZK3wUhSqvun/QECawN/a94beEiCbTvnXNvUvwZ4DzpowwT5+05EoQ+KgMg5K8sACt8g7VPsvETWGQu4OmBbiZFEMhNMcTypo1EIL3IPbElaoeEbzorK2LI8OaYBLhkFSTljK+EI5IhO2h5IIJWO9JJ43LyUAy5pE6ivc3sowXIxGA4SvdO10k6dz/ZPwapZ6wF/w01EqmU+n/2SaYwP0Cq1AYpU2mOEQ0Gi4LPUKSUqZDwcaLSgsXAw98ijq1iE/eVJOARYFkwW75zk8RUSbJsczOzqhCB7w/B+yR8V6RG5VlP7mCB8BdSJckz/T2LvriQM2whu0fCrXvmHV/ktmWG0nskbnBTlDTDMkl8TL5Fspvav8WlhporJIu+2g6YLTsmu98g9ZwE10lcJ5eTQloo2nXSpU4nSAc6+TQtT9npjsXrUdDzKHChLTJFEZnF89CaLa7MFmjLFq69DLnzfF4qbHtVCdnmfGtV4eovvKmRSmn5dbVKl1Vf7B9JSKHCvrn6iqxJhU/XNvTbNHeEvEst1JuCfXcpONGlMqPKZR0IXZxXgXfOvto5c6vGL1YJ86luXrRzYsUJQxSD3cGEQf2jbepxB1MPKeXsEQiTl+Xk7nTo4IHpcI2EulaiGH73pmicShz3VO5N1zZF1yd7cknzZI+oeIqCUq/16KJN+wnI6BjZeAL6pBqAPn8CWk9T2XnsfSozJ893mLW6POIF+8DpFSlXT6+rZub/vuBxUniAFCIJs+IuCFwkKSytxpDHL/5hSVNIivd9LjaPyxLv/Oie7hF5xbvDJ64hpwfvM4dhet2+Y31Nw/ADUo1Xsj6UkrgAAAAASUVORK5CYII=", "II": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAAAAAD///8rKysAAAAAAADCwsJHcEwAAAAAAABra2vS0tIpKSmZmpo/Pz+Ghobq6uo7P0ACQ2AWAAAACnRSTlPq////ZB7/ALoMK36tCgAAALVJREFUWMPt2EsKwzAMRVGpcvxRrKTe/2brGgLNoFAiDwJ9dwEHYshAj1IqIZOvHEpKlJbM/vKSqHSoqa/WqUKBWePqKypzoMwtrtHXGhv3t2b1Qp1SJkg3k0w3Odp2h2RS5SO9Lqmcs8tS/7Tn48hEdkiQIEGCBAkSJEiQIEG6mTTvArIz5LjK5l2KuM3/Rqrm3p+sDom//gS/ZsJdGntf9TU2v/dON6UwtsMZM2SZuGdO21hf8/d39RMzJXIAAAAASUVORK5CYII=", "c": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAP1BMVEUAAAD///8AAACHh4cAAAAAAAA4ODhHcEwAAAAAAADv7+8wMDCkpKRgYGCRkZHR0dG1tbXCwsJycnJMTEzi4uKcisZbAAAACnRSTlPq////ZDT/ALoSWgCnzAAAAoJJREFUWMPtmNl2hCAMQB3wqINsAf//WwvojARRXOg5fWjeWplLCFlp+v7dDs0zGdp33zf9eyDPZXj3jQd19Jl0HtW0hBj2eibMENI2A7FPQQ5libM1oa/nQknzT/prJMWl6BYRXN0lqZXypekbJDBdTqy+SJrk/DvOp8+/NKezXnCFBOE3K+VLC+fl50k8rM8GJFj3SZ4leZCY9sKVblF7JO2W0oMM4U2oz5CUBx06otd5OkFyRjUFnzbJ+fIkt2Ex+U1OKVUisWSRQ0vvV1O6HS2RkjWLZ/nrYsl+JVKikoxiLkY5V4BjksYqyRC1zAVzgtLI5jmSQXvp1QkBRwmgHXMkt55F1SfaGdZPiifOmSEp5EvuxyJVF/iSbcSxxTk6gkQba5SnSp5p0M2howbn/+RhYKW4E3FATfgIc3bKZvMMycZaQCmSD0jOde2e0a6R8HmqknQdkqxG4jVJleyk0xoS/EmzU/6EEphKErrebQ5Knpn6eBR1VL0uxR3iLirCkkVFoSLgi9/8NV/AnFfiApQhATIyxMHDonLJuEX3miHhwPOpQUY1gO7dRi77CmSoKHlzXHTKpMQbP7UlNHjJh+PThTrN8vUOpR+Leoxs5aRJiHxrME9UF6UarNKOJvQFBjd4XiUo9ioyqds7DZQodz1Tpo/MLIETnRh0hWziz0ZP9ZnyWCsmNqbc7X09anc6VnbTqx3048GLspmXhVYdzs8Ieh41WJZj1ZW5Rc0dieF8pfgEkLaJZ2YpLbKzlIEb8912LrNU3Z85xUq5P3P+T/m/QzIVSCaQRvUYpMZAIqNmz0SPxJHCe9/4TMKbn3+nqyJtU+URMrwd1nvPrPbG+gNEvTir4Xc8vQAAAABJRU5ErkJggg==", "p1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAACoqKiGhoZWVla/v7/Pz8+fn5/p6elra2sgICBpidm3AAAACnRSTlPx////JiegAHfWka0ruAAAAVJJREFUSMft19uSgyAMBmCQKnIIp/d/2BJ0Rly3lWRvujP9b3rhfBbBIBFa68dqBDFmfVQotF4VKytitMUTU5oWc/1xEzmuslksLNv0IowqEytF1WlWkoelEh+FIcuf8S6GIXylWzLcY5Av49IddlLC5fmStW30iYMxETUXTwFHzsVNBy7GkbtRDBbT3SrVvx7Fbl+i+OuwBvExVtvd6R7HGHM3TXXK8jgO2zRZNoZj3HTcPSgZY6UAC+/l3JVcJOKjmMjrnO1x0UuZuO+27YuSiJPsr9Fw8vx6DtXKxMKhzR6Mb0NbPWP2JQuE3dOdd157v2+/wNmOfDEu9YwJg9+qa1URPnRf/G8wbrT7G+1PVTSC0+kgQz0Nxc4C+SiV4M0b/TknQPapF7ECjgW14RLoNhTEBpuNbInJqAy2CdwsrUFhZhbctqq1Rn9ryrSeue3gE2iFKdJaPJFpAAAAAElFTkSuQmCC", "e": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACGhoaJiYnCwsLu7u4wMDBeXl7l5eW0tLS/t+6eAAAACnRSTlPq////ZB5jALoM3OjzFgAAAQRJREFUWMPt2NsOwiAMBmDaMctpIO//siJ3OhfY2plM+a+XL6ZrmVQR2ZtRvJibJVI0G+THzKRsgcB5ThwUyiqN6JaJl8UhamUQuFChAEut0U38OCyFRy8g+SrJ/aY/k3KCRpILPVLTqbm3pdwFgWtLHiC0exrSkIa0WwpinbktBRmpb4LfJX/4VLmC9KlMWUoCyGIS7JY2qrJ6ZEhD+m5nnj0tByf4t0+6i5y+67fH+XLKfc1fm/PwP4xV/YY0JN4NqKMzO29lHdPSc1Psm+BxNz99GyInJQEpVSkGNhRilTDmhZccsUh13xd5qTu/555OJLruDiXWkFZwn0lkNXvHqi3RA8GPSXHMBo+KAAAAAElFTkSuQmCC", "rr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAArKysAAAD///8AAAAAAADCwsIAAAAAAAAAAABra2vT09NQUFCcnZ2EhISxsbHy8vJ0ZCxjAAAACnRSTlPq////4x7/BbpkbWmi6wAAAbxJREFUWMPtmMuWgyAMhkm0qIGA7/+0A7TTARwdgSxm0Sx76nfyx1xM1LIs2zqrEZvXLVDU8lhx3NZHIAUQ0JhBQC1qQyRtBo0QN7Wi1UaPmdEWVzUjjYICijC8NCGS+pC6Sc7CmVnn+D7pnPOikb9HcvC30S0SAejpxHZmfvrlB0nJTPKaBUjTpKNXIqTJ2CpW3aTkFYuQJi6dGiDtwSkvQopOuRaSydORq0jZXlJ41JTy+klgM6dsHqhbJJsXpBYhRRTLkEiIxFGdGSHl5qTeHe0i+WRZj+T4ed1Zqbrjstf9g/5kQKhnSvXx+I8i3H0kLzbv9jTsXPsMjqFlX7//XlJZJU8Ud5LAFihXFG9DV4kPUl0p1EPSSU6dmNxD0lWPe4aqixR/K0K1t39hvEi+1tdewd99nKHKV9faVd4T4Td9rouka30eeqfUQR/lQW+ad7W+IqnaZnCtL0+qNlKtL0+q9u+CQp/+CXoj6aDPvTOhlVTr42uSu9h26LALccNW5q82Nrq9KR52uWKLtO6zm39IBxL44fuTh0CaEYEHSQyIs0r3PhizdPOLdzoR29LtUOIMKXrPlLqxfgF2SmigrMzUFAAAAABJRU5ErkJggg==", "g": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+8wMDC8vLxra2tVVVWpqanR0dHh4eGenp5wNnJKAAAACnRSTlPp////ZB5j6gW60vW5rQAAAnRJREFUWMPtmMuCqyAMQEWcuQoSCPz/v17AtkMoAhUXs5gsFY/kScK0ruv3Nv0bkWn79pRp/dr4uGxfnuRBTIwJ86h1WjgHOY+JBM6XaeNsFOSF8W2auBgHzYJPf6Q7SOiEZk8BZ+w1kgL2JuDsxySlWVkEfkTCgwPG/IStMe5guQ9I8RNtSoaLb2wnSQYDaXWSYyKwsIskg2biPBmxgCqTAkjVgsf6FbqDBIXNF1CuSTJt0KEgNkjYUu3xpbdkg5Qv8SFqYkRQx0v/TFZJmK2Y1U9sy+yPpkrKFsg09TTSX0KNZOmWYmSB8wQM8aglVa9GctS7kJg/ZGK6+wZJE+cq4sfE89IEL9S0kyR2g26KRppfis+KQN7lJEUUUFlOSFrzVC2eHPmRyGPUvbwYvVAjATGTZvnpHOpxuZrnJPKtfSlXKugN7YhnX0aDk4Je8Z0lJlaP2FLsTFSNBMTprmj4kp+rexok/bo9ydzi4iqJRsGzAl0i+ci0bxXoEkmQbHnkziWSI7X3qCI0MrGTRItzKMU2y5Ze0kzL+PPESjK4mwTEJpa9lfVuEn0dT3ZBmrxu0szSOIj6MR1PKaezbq5FElkT4tjZ0dki2bwJwVfjmjV5LVLYFGQdjtGhdcWPIvORI6ZnKmiSsoN3hBT91UZhtY4nfUVDwdhKQ7sfh3oXfUQsPenPZoTYvJ9tS5rCyHE6bRyLDRYwUDiBqxOQOMLRGJW0rqZ4kjensrNDvDiW1SdFdO8wLfDq9JrQwDn8m/J/FwluIEEk7TgMwj2S+K7kmKide1K879vHJN75hXu6W2SJd4d3XEPeep+5rsvwHeviKf8Br6tJl6dtQ3gAAAAASUVORK5CYII=", "f": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAA4ODgAAAD///8AAAAAAAAAAAAAAABHcEwAAACIiIjv7+8wMDC+vr5ra2vV1dWkpKTIFLYlAAAACnRSTlPp////EmRj6gC6wZtbWgAAAOhJREFUWMPt2EEOhCAMBdC2wkxBKNz/tKOsJsYooSycTP8B3gJtk35gdq8Ab00gvBwzsAukT3AMO4RRF9wp8ESyLrqsQuQhEGqhLUgBgKIeWiKBSQ+RsuBlJHdKN86e2CVl7EjpkSJivn6XilhNMmlAKtP+zKKZlnupd4KPkgxvlf+Sbp5b8+1kmpTyiLScLedokklj0ul+yk+bFsUE2840ySSTdNLxAqrj993hKlvHpe9LUWpHn2C3+a9LMkGSJqWihkpqEqW86pITbVLr+5IurfPbe7op8TClhGzd4bw+k9l5dcfqHfMHhkpNVQgwvAYAAAAASUVORK5CYII=", "uu": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAArKyv///8AAAAAAAAAAADCwsIAAAAAAAAAAABsbGzT09NYWFiurq5SUlKPj49AQUGhoaKzs7MB4UbIAAAACnRSTlPp////ZB7/6gW6JWPnsQAAAaFJREFUWMPtmN1yhCAMhYlYqkEk4f0ftsGOLrj+Fme6F5xLIh8QmDEnquu6tlffJVJ9KxTVffW6XP2XkAREWCYSVKdardHYMhnUulW9JmNNmawh3SulsRQkKNSqkj6AFHCEWaNPI/4VyCPbpECQakxAWQD8GQlhb0K+BNAZaQCwzSwDgHPAAQxLoJHP3AlprKRKqqRKqqRKqqQbJPmbm08nDXOAhXqXFJbvbVL25CQpVi5UPZySKCmf+BZJJvjXBKmZeGuJ5kL9lJP8cjwHaQLtBVKejngK8s4ET9nVpVexW7HK3IQUknrQZsN4Ssoeuaw+l5eUjvoLFWvMbJKouH4sej1nYzISTkmSWmpO5LI07XoEWm/qXWN2uF2Sz+57S5y9gQPfgqv0rhVyh3DkgOgQFUHDRS/Fk83YAeEb6MiVcXxExO8YO9mg4Ya/C79GCJlfp7TMtHZRV5yiX1mnRci3PWdqDBcrhu5v7pURKaFsbKe6/P8kDQ+QhokErrj/5GAiaeBCEoMW0tTvgzJNPb/Yp3tE7dQ7fKIN+Wg/86ke6w+QOnAeiLzVxQAAAABJRU5ErkJggg==", "h": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAAAAAABHcEwAAACIiIi4uLjv7+8wMDCbm5vW1tZubm5nZ2crr8g0AAAACnRSTlPp////EmRj6gC6wZtbWgAAANJJREFUWMPt2N0KgzAMBeAkti79s/X9X3a2MKpj4kUK2yTntuHTCyvkALOZHTwkATcbZmDjSB5nGCqEXhasFFiiEidZYiGy4Ail0BYkB0BeDk2eQKXvS2HFV9Ylfj7ANVxLu/GaToXjgb+S3uZxOXsE5gvJI/YXz4ilf8aIfWzZj6mkkkr3lw65l3QelVTS26L/TJVUUulnpXEb0LitbOCmqLv5P0llgFSalLIYyqlJlEKUJSTapNb3JVla51d7uiGxMKSEbN3huD6T2Vhxx2oN8xP3cE/7z8SwYgAAAABJRU5ErkJggg==", "k": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAACHh4fv7+/X19c4ODgAAAD///8AAAAAAAAAAAAwMDCoqKhra2uioqK7u7tOTk6bm5sGJ+pGAAAACnRSTlPq////////CbpkBdN3AAAAAdhJREFUWMPt2OluwyAMAGDOnBTy/k87nK0N2KwxhzRpqn9VJXwJhJhDzPO8LqIvljUqYp4X2x8LSBEysi8MUGK11qmpL5SzdhWLNb1QDGNjX1vZD03Sio/055J35hnuSMeHllcJKSxIMr3ahOtqbXAkhQUJX3+8hnEg0lVYkh7G7Cnrnr+hZXrK7+laJAJNe9szQe95DKU0VypDcqqWANrzoYIgprTfQzzJ5+/7B3JTtUTvX4A4Eq1WgjgSVFNoRFKIITEhlhQIFFSTFDQH4kg5FH6BGBITupc8hlBCYEts6E7K43gD1UnK4e+vVaKvslmCPBXGSDC/7EOkMw3oIRK0z42RFJkaaiTFaR9H0nlNh3MxW/Jmc3hQ+RYJZijyTyEf3ErH96JE3bbvToLJN+4A8prF9jFypqQ1j8JHw57Ns/mllBSYKwz8uRWSAlMiw5EmhYr1k3yfFLgS6XT6lNzVIRmOOCnwV6wBvS6cFPgSaY5vW7GWclz+0VRIJMflg6pCgubknR7fwqNJgk6XqKdkyw6otJlKmluzK3slq2SL17hTzIqg1H/25v9IcgMkd0qb7ob0dkp286ov/GajdJ73bX1xnvnBOd2QWMWQQ8jz7HDgeeaoM9Yvn411yWvp89oAAAAASUVORK5CYII=", "j": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA5OTkAAAD///8AAAAAAAAAAABHcEwAAAAAAACGhobv7+9hYWGKioowMDDk5OStra3KysoK0R9jAAAACnRSTlPq////12RjALoSCdtXwAAAAYRJREFUWMPtmN2SgyAMhQmORcOPyfu/bAPObKULrYI7sxecu9bhMxwjJlHGrI9F9Wl5rMYosy66X8tqVAQB+h4hRJSatUY79cmi1rNaNPSCBAVavNY49Qu1GK/9DSSfSPfFNEjk4EeOOkgEmaid5HKSayZt2WLBboM0SIM0SIM0SIP0NyQmIozfcOQeUixMQggQhBSA20n0q5xoJaXCRHZHNpbHALLXRlJanP0QEmZ/2QZSCkBIvnL9PMmDWE7HMs5eItmD/cFZjLhycn1zfMsiiOnwYuemfST5rCTl9xpVojxbseb+Tox7oh9C5pOkLVrzoQErGF57W4p3PewdT5PkoVeDkidXuk3tLCi2AfveXG7iNxJXUfGd3K50QFhGsYOKhfWTLqLc2xrroRrrh9MX94Sk1yG6d0F8vb9jKMjbpk6R3nqxPNWvfVv4BXPEozf/f3MVdwPJJVLgbhCHRNKBbJ8oaCGleV/oU5r5xTndLZrVLUPINDu8b55pzDp3z1jn1ZgnNGBPTzR8cCUAAAAASUVORK5CYII=", "m": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAADt7e2GhoasrKyKiopSUlIxMTGhoaHKyspsbGwiIiJZ+N7DAAAACnRSTlPq////12RjALoSCdtXwAAAAgVJREFUWMPtmNuygyAMRY2MRbkp8f//9QBWRaAdCc55ap6cIMu4uSYd59Nr7NpsfE2cd3waWbuNE+88CKRuMQke1Q2MoejbTCBjQzcyaAU5A+a0ZrId1EvmhGf6MZL8kapJVhqIzaA9GxVe2gDVZ5KF3A7UkrfJjyRZIOE+keHLZzKS+7XrhPfd938DSGae8yy3ST0e38XoRymk82340naH5MbA7A/Yt5DE7nIjpxLSUkXq9VueXKbKmI4hg2JTDUlsQhVkqiW9fQWZqkmbUCaXqZqk/PIS+2RoGLttwdhsqRBiCuOvCzLVk3yHjw1VJD8BSjLVk7aNST9A6sOme8gk6sdORN+O/LY+JhXv7sdSEQSSjt0HVhFIUqQ7C5mkoi6HGwkk1Oc8OGUCAsmck9FE6lNiOp/1KVO0/u7HFA3YKROFhIXlL4AWE5ZWMymm4gZKiinfupFKyoQCEgnyI06QSYXbCZVks7Pv6FxJUtl5TCVhvqMTSZDJRCaJVKa5nrQdTiqVCUgkcz3mNg+VZJLrHZV0PUn9bSzKMKpI1yuKv7RQSZdrkx+C26QkA5Iiy4buZkA2fW9JHepmVhZnikbaJDvExPEtU/zl5v9CeqKuogMJHyBhIK22GWTXQGKzEm2mZuZIod63zi22hpqfr9M9YkP3SBEy1A6fq2dyPg3NNdZh4vwP1PlIeW+prQcAAAAASUVORK5CYII=", "l": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACHh4ft7e0wMDCvr6+cnJxWVlbU1NSMjIzjaUo1AAAACnRSTlPq////ZB5jALoM3OjzFgAAANZJREFUWMPt2NEKwyAMBVCT2kZTrfr/PzsnDNZNGBihHeQ+y0FEwVxD5DdnZHGbJzK0OpTHrWR8hYALj6cwVMobi8j7IsvOiNY4BClUKcB61siLPIxGpRtIMcEribNAKnBKHpbyGQIeliLA8XZ3IamkkkoqqaSSSiqpdJHUSYqzpM6XcVj6+sf+lPrpLLlcOm64Jz2nzgQ0fjM/p7Lx13KaFEHygnU2/ycpTZBSk0IWQzk0CUPcZYkBq9T6viBL6/yePd2U2NYdzqgh/cQ+k8hbccdqPdEDIvFLFqyvm5sAAAAASUVORK5CYII=", "o": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+8wMDCurq7Y2Nhra2tQUFCdnZ3Gxsa+BM/sAAAACnRSTlPp////ZB5j6gW60vW5rQAAAkdJREFUWMPtmMl2hSAMQLHYVsEw/f/HVtBaEiZ90N3LziNeQwaSwJZl+VrZd4+w9WunsOVz5f2yfu6kHTSJPpl21MJmzrX86BOpOZ/Zyqde0C4TXxnjoh/0ITh7k0aQlLV6OsUIq14kKXFRLpp2z0mQYE4YPCMpcXwHcCkh4YTnWEUSHJjELhKMf2FvkwII8hZxnpVkaoHkQbriJ79DeYfkQdUYcx51g+RaoN0fXukmSRq6qqAVtEgiY8+8c1WdpMgS73lvYiDBrbEJMiRBokWKK7gRS+I/piSvUrw3ZaJEQb+06DklEZVUADh/KBiC8krVSFhn78drU5b4S8SPCUnhCBAomIm/XLw2IVn0W783h8GisL2EJNCnlviRuENHKiYkg5YaGloaqRxvgJIkykyV5KlD24NIZUrCBockk/H72OSUVP7nX5DkuZSEv8XmT+0Y2+IxKXbXmzTA4uOiIIm8VmSKV7MFHxW1bCEZrGkGG3pUFDPYf+vKiadwFa+eKlh9SU46g1xQP+nI6QsIhc/ixulLK4L+Q4XCd78i4NdHcZm0k2eVAlKlZL1yotZIxt0mPKmc3qqQaRST3qxZzUM/c6fDEM0OY1zXE4pac/5QtAEudod2RHd4tBJCtjpWeaeLFvUu2t7uok/P27xaTmdA5WnDHUOFKsxF4sEEJEdNQL+7GDCVHQNnCtMwYnrVL0+v7/uC/yLpASQdSJvrBrktkPgGsk9g4zsp3PdtfRLu/Pw93RCZw93hiGvIofeZyzJ337HOO+UH3FZJ5crCnl0AAAAASUVORK5CYII=", "t1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACmpqaFhYXFxcVXV1e0tLTc3NwgICBra2sb9IgrAAAACnRSTlPw////JswnAG6VJTCB+AAAAOVJREFUSMft19kOhCAMBdAWF2SR5f9/dgB1ohOnIzWZ+MB9McGcRFm0BSllrwaozKD6BEHKSbAyZZxtmCsTioYxXUxXHZPYCIpli1YAInSsBJEmTiAP45Owi/g90ZHYIR1D4fgDoydwuk28pkZ0DX/Ott5i1zH/Hon0bLuTNbX7pSJ3mKGxo/e2XR/xgM0y5i8eDHvEdaeq4YYbbrjhv2OPOK+ff3P4UVyqhubzYuIatjut6+uw7a/l/CMrwFtVr7Aca8WCg6+3PqxYiKgrE7OC3CZwo0qDwswI3LaqtEb3mrIb7eALfwkubyAxZFMAAAAASUVORK5CYII=", "q": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACIiIjv7+/a2towMDCtra2dnZ3FxcVxcXFMTExhYWErljBlAAAACnRSTlPp////ZB5j6gW60vW5rQAAAohJREFUWMPtmNmW2yAMQJ3gmdqgiO3//7VAxjZitYNP24fqaTLHXIQktDAty/K9Tr9GZFq/HWVavlY2LuuXIznQg4/Jw6GWaWZMi+eYCM3YPK3MjIIcyrB1mhh/jgtn03/SHSSQ0j5+xGgJH5LgoOyi8TpJ6UdZ8BoJ+M8yVHv0Ieoqq0pSYUXBLm8YF2dJGDiifmqjzpH8yWzdT2EfOEOSXv9W8IDJUEWSt5Fsx6FH2S4JehptH8keyRnJ9hOWV1y1SSozgUDvAVSZV2ybZJPAE3yLbatoliQ75iRnAJKMg5s2kUks8BaJ0+8hRLTyt9kkKOF+iwaJWskfYQ9nntw4Hv/MSE4HTT+OzsqJFt43uk6SZFtIXK3J+fzx6iRNlsrEyECV0pElMpIhn5o0tDRROT5ASnIKG6KCzSKbkziQNRI1OGYXkLJjk6ek+p5HkJQdnZLoWk49l9kx1vAyKXYXsWqbpLMc+/dJ953uhMX/QBRUIhNdIrVYikx+7bZs+VcKPH1bijcYop6HWC62YyervFV458atTxHlbTuZzucytSel0AjJynXuZd/QIRzLQccqEaN1K4JNTgS0MkK7SmFapWStNTBXK2e5SaWV8WQ1Ryi3GOJyh6EfHLLhKSmj5a5Hn5gJQpmH8U7sKWTwKm92h9jvDo+OnY91rBsLD5s2umgNJ1jH5ap19rLR2Sdbqs60gdVpI42Y0xOQxGMt+tY1njOiKP5oKtvHH9WoLf1JMfwHRXax+tMrRjQr1W7B919maKIGXho/P5vNdwvq8Skf9gr477886BtIOpBeahikXoHEXijGBF/MkcJ732tMwpuff6e7RebwdnjHM+St75nLMg+/sc6O8huqdktkr57/YwAAAABJRU5ErkJggg==", "ss": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABsbGzT09O9vb2hoqKCgoIpKSlWVlZAQEDm5uaespTeAAAACnRSTlPq////ZB5jALoM3OjzFgAAAtNJREFUWMPtmN2WqyAMhUU6Y+UnQHj/dz0JagWPIlYvJ71xWf0MIewEumEYf9/dPXv/jsPQDT9vdd/eP0M3Egj1PUNCjd1LKS3MPRNaqVf3ViiMuGdGoKJYK30XRCituj/SIyRwLsjFgnP2O5Ilivd+AfGVD+46yWp6Ue7YjmNVksP0GoDoFwNw6R7CFVJ6x62UxdhT6V07iUHB9HsmMH2jkQT8cH9k7Ba0kSzSAPq+gvJom0g0ttDXLGzGd0Sy5L2okgQ9YRtIrhakyVzp1BGJfLfZWwZCCnGRDDT+BhJ6uZmpKbdjdpey/5wERbw/IOl1yYcW0hqmSAgNLAqyGDMUgdonWSiSCWcUz4POSd5d84ljy3oSHF9c84lIRUSim8MUpM9Vxp/HiT6ORfLElAYlpzELpIzbVJylKVPiltXCM7yT11OGLhPQpAVwuIDnccpmpcN9pybP0jB1I4kfjoerN+pNvGuaSc/iMaoH2ahPk/qiqaF8nk61igCpQlX1CRurFGCdhS05Pmf6NN8gDkMVmvsC7i1ohXjY9Yz+sy0Rd85pnNsCz/XbVJX8SAuI8VmuPqxLfzu8MxJsFj3MHRRplChrgj4hpRYCyOIq16AnXcnk15C7J6RCU+DzZeA2yMeMJC+RTNZM2KIONpBCUcq5RbBr3se8oJ+RXJHaXKXQcZniZtFdijgU1WipLZPkxktZIIrAzj1cmrminGNehA9I/8m45QiFMs1NIQbH9a6imOtM6KbactY/bVqxSm3Js3lPykNbJ8ZOedNXW1aJtkkzQ9UrLi6FjFdIFreTvsmwTe2skGzaRcHOEKcq3LxHEDZVT887IJvVcph6xQCXdmWg5b6hu7pTtLO+1dqdL3evqB18v6O2f+cFz5PCA6SQSLQo7oLAJ5IiQbZWfP8jQVNESud93NzcsHTmx+d0j9grnR0+cQw5PnieOQzj6/YZ62schn8IgVb5e7XiIwAAAABJRU5ErkJggg==", "s": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+/V1dUwMDBqamqpqam8vLxPT0+goKCampr4X8DBAAAACnRSTlPp////ZB5j6gW60vW5rQAAAo1JREFUWMPtmMuWgyAMhrU4MwqRi7z/uw6gtoYmiIOLWTSrnh79CDH5Q+jGcfyeup8W66bvQOnGr0m02/QVSAHUyzbrA2rsBiG0erSZ0kIM3ST6VlCwXkxdJ2Q76CFF9yHdQoJl0f1uerHqjyTzojxp9jpJ+Z42c5Fk3fqagZeLRqb/nL1CMvEVCe8LpA3belIEaaA/giNQLMlGh/h6fUexJFcABQsoV0cKeysqTfTKVJGC91BMaQhP1JBseW/pzSxSDEnjxyCluoFsMV1BCvF+RUnJPbflIXQq2x5NUmi9Q+lp7DecklCYYmw9RFHASeTx16NJcCQpt1cNDk1IlOWaTyndQyJqG0OjrpEAR+QZ8lysoCbiuBYUoXhZyvFZkKe4MrKonQzJ07oIu2uEbDGkLFDEPquVztFOrcvInhAvjmSLYpCUTlYqXVjXFQQqarOvI8UacVBG2bqOAFxjOzhd2aVSB+FZsRxtZefcisQDuz9dfS6wWyJ6yjNcz4WIm2WRh2JzBspKzmiBdMcC239k+8SyQpIgF4+nEqD2jlWMJMk1NushZZNr8Ik2W644SZLLpNHvoXMoyBUk1DXgWIGoD14lxb1qsq7hPE4GpXaqwCW2KY8VwKAi5r6dfuS9Zft46lIW5CcVcFQ7z8SeJslcfGw6K+I0BywGbL87H9RkTeeMT52dn/LV+N7S25MhM9MuTgv8yfFQvR1ZWVXRRa+IYzRLWs86TNhtf+E8vi5LSq8hx42S+pptcDKHojWbVL3PIUUdB8lMZcQodTYpbvpWMypenV7lAp8p/1+R9A0knUgzNINgTiQxW9VmdhaBlO775jZLd37xnu4WG9Ld4R3XkLfeZ47j0HzHOgTKL+nmSFTG/Y/hAAAAAElFTkSuQmCC", "r": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAD///84ODgAAAAAAAAAAAAAAAAAAAAAAAAAAACIiIjv7+/BwcEwMDBqamrX19eioqJOTk6RVB6aAAAACnRSTlPp////ZB5j6gW60vW5rQAAAchJREFUWMPtmMGOwyAMRAmkLQGCzf//7EJarWLTqIA5rFadc/vCwGADylp739RDIrXdM0XZ22bk2m6ZlEHayaQzyqrVmOgXmXw0ZlWb0VJQljabUsbJQYsz6kv6A6QQ9YVSRIR20iXnpYi+jRT0Z2ETyWkdLncFIj5tgpB0CFxhwQTScwLSFNICSWs3hbQA9zdMWpANapzk2aDGSWVQ2EMCkm22fnGUlP8KxF4aJ5FR5CD4PlI85zGQjT5KYpMcyeIJSYNjAqQR6p+ns9ystTt3fRjPU8Igyfj1vkuz9h2yWjdMYikV1Ew9qWbOquNQWmvyUlLAKlmDJH80u9Dfg8vU0kSW9R/p5vDGC74bVOtuoShXrVxjVUFWdvPpm6eptT4FPjOh9tdY6QLv3difzFcVcmyqij8cIpUaUvmDEdKbvd9bVX5rbOUvUXRHb/ngr4NU+aOh6ul33B8QdFcP5v5IqCQnDBqqvnMB91fQfohU+Tv9tJPE/Z36cMsNCOlXmKD9VkabSNIXh5ePN8XqLofn78TwvZv/G1KcQIoHaQcxCPaDZPbgZQq7yaTjvW+X6XjzK+90U7Qeb4czniGnvmdau4rfWNdM+QH7QTrJ33jbmQAAAABJRU5ErkJggg==", "u": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAD///+IiIjv7+8AAAA4ODgAAAAAAAAAAAAAAABgYGAwMDDk5OS9vb3U1NRvb2+oqKhLS0uampquTwflAAAACnRSTlPq////Hv//Bbpk0dFGQwAAAZRJREFUWMPtmMuygzAIhjUpUWMuxPd/2IM50zZUaWvjwkVYdQbzQQgz5acbhmEauzobJ6J0w2009TbeiEQgUHUGhBq6yZio+zrT0ZipG02qBREqGaq1UX29KdM10gVIerFwN+tLj386Xjy7JJ2gNFuAmAP8J9IC0gEeAtInUgQIZRoPt2MJ0kVdIzVSIzVSIzVSI51IUuUf+BVJASAWv9Uh0iKRPCPRsPLF1IP93o0QYDlE4gfS8yWxDKG/mJ/4JZZHUpRe0R68/PuksjQ5Nlh0vfaJneVfCRMrndX7w6WTaiCQWJNT9Pt4mYLUKxJp4eEorXWIVcgGZJ64QKJifhRqnpdJ0gj2NamtnrP8chLJA6/U1pB3k6xbqJzJvb8bT0lWQPblpbYg9aWWCuurC7XSlDEv91tVlpso4dbhsqyJB/RdjkxHEJ8Fc4j/XYrHlGIp5pipcFhz7rGscr+p14CqEKAKQ9PmlyLFE0gxk+ZQDQpzJpnZ6zrzsyFS3vfNdZZ3fuue7hSb8u7wjDXkqfvMs3asfyzTORZrELdnAAAAAElFTkSuQmCC", "t": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACIiIjv7+8wMDCxsbGbm5tra2vW1tZDsKltAAAACnRSTlPq////ZB5jALoM3OjzFgAAANRJREFUWMPt2N0KwyAMBWCT2sbfxvd/2jnvWhDt4mCMnNvCRysGmmOI/OGMLO7wRIZ2h/K4nYyvEARZoFLeWESOmyyREa1xCFKoBrCeNQY5tAU0Kv2AFE+GcTgPpQiTySPpnJV4JNVPKzO3GkAllcbS/WZ2n/DTaelK+ekEd6SJCe6fxnl9D5VUUkkllVRSSSWVvind97PysZSvUBDsnJl7v5a6m/+VxAskblIqYqikJmHKUZacsEqt70uytM7v3dMtiW3d4Yoa0i/sM4m8FXes1hO9AElZR2LgSFWTAAAAAElFTkSuQmCC", "w": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAP1BMVEUAAAD///+Hh4fu7u4AAAA4ODgAAAAAAAAAAAAAAADOzs4wMDBycnK4uLiPj4+pqan19fXh4eFMTExeXl6hoaGQ1S7kAAAACnRSTlPq////Hv//Bbpk0dFGQwAAAupJREFUWMPtmNuS4yAMRB17cBKCbyT//61rGwPdkrwvTtVWbY2eEsAHqRHX5n6/Px/NNXs8V0pz/3n01+3xs5JWkGuvmVtR9+bZ96G7XbMu9P2zefRxvl21Ofar1n17u25t3/yS/hFpeLtssfW5fhlrsXPvoXwIzVNxIeEHqx2oxQnL3n+4eKikwf5ilKSji06Uxkpqd25O/b1qs9XTBbSYnPuk2Jwba/HeKpNGJN2icx0jk3nnQg5uouYzRgedZC6XrpNrDWT/EYqSScx3ja70Rs6zp0Bwmxfcuowd1WWukKkIxf2ONHbs7xHFImQqiKI8qFpIrGHi8gfQBUWdZKokdjgxyE/sgqI+RK2zxRCRiqCLmaI+oqkkPbDsJgjFFSE5WEk62bgEhKKKnGOwFlAWrrPHGzIl16kiO1hJPDM2PQyZUkXEijzAsNLRgGw9GTLliqjTHkiUJNvwGDIlWVCHMhWBpFYK8HH26AN2WcYRSCzU6PCvn1AXlKHMA9wRZOaCi1NAJ1DwMo5IkrMJ/oX67SZM0DIRSSXcAn+QCs1quiNJToKI7UdUZtAy8c7pOOPoY8Iuap0WJDELKCAMNeq9Q5BIqMV1sGthROMoVzlFYqFaygiIdZjU1qFOGLwtUJZCSIs3ZBIkcx3ZxXjThmHIJEhqfytifMzpDDIJktxza6k3lxhsz6RObXDFU3PZwxjEmU5tukUMU0KQSZIsoZIYllAokyRZQk17mcevrNaCZAl1xBV14LTby7OvFiqvQEbgpJ0kaWHz+OvA6ypnkbSwOYTu7Ah0QtIZWLw8O5ad3RFkBtYQTo+KJyQpVHVSussyaZIUCkIQ7gqyIsmeY/VRuCvOjvouxT3jhBDuCrAm8RBhFrG7QiaDNNp3nsNdsvB30nLefDjtw75z0uXwTSmE18MY/O/d/L8ihS+Qwk56+csg/9pJ/Wvortnw6lfS/t73umb7m9/2TvcVe+5vh994hvzqe+a33lj/AH4xQ0+FQL1sAAAAAElFTkSuQmCC", "l1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAA4ODioqKg5OTkAAAAAAAD///9HcEwAAAAAAACioqJXV1eZmZmvr69wcHDAwMAgICDW1tY9PT0VAWLEAAAACnRSTlPx////1v//AIImeqL+KQAAANVJREFUSMft19sOgyAMgOFWqYBznN7/YVc0JpsLca3ejf/Gq08NmEjBWuudAWHGeYZgrSNVruJq00NYWjV4viyTuIWZB6eyq3ZgKE2qEvEyU9HhQrzqNOrweDd+BtwKUYx3WluEOON7WYZnxGHfSMRnxx133HHH/4M/O/y8ZPjwJlIcfsZfse74iCOWMDQ6XW2+fRmx1ck+T0NT8judn8Pi3Cjffoi7dPZUn3orpqixkTacstzmVLGpw0bzw2gVqjKgnG3W+WYdUJR5sOpHu6tD2YVx8AUkmEtXhcVleAAAAABJRU5ErkJggg==", "y": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4ft7e0wMDC1tbWgoKBPT09kZGTR0dF3Ha0cAAAACnRSTlPp////ZB5j6gW60vW5rQAAAcFJREFUWMPtmO2ugyAMhkHchiBf93+zB8zJji1tncHkJIv9t8ke+taXMlDW2ueiXiOhlmelKPtYzHgsj0qqIO3GQleUVbMxzk9j4Z0xs1qMHgVVlDaLUsZN4+GMukn/SgpZ/0XKBY4GT3OQSEGjAKiIHjqBlDEpAfNJ8yBSfbr/adJ6J8HBLGqGUcxpv3Ca2PfnouHDCKbBpDpt3ovPuzQSzKHI6lopmOE1v+SZSUgX9BIymVJE4N6ZqKzvokeouyUfZI8XNORXFK4K1katlkjWA6UasGnJdZeJoiMHIKNxJCykVQiVG5uF6wVoXEsAKi69Nprk+xcOxHikX+hP2FQZJhnhwhY7HdJXgJjeSgIJD3ZOtJLUfdEi856XftTHmYlZbTyJfNGcleS9pfmREBG4GYRdKlGm8eS3ByRy9shpE3dOoiK1ems5TyKUsG/0YDfvnNN13I//F+BOzFnpmIQ6saTt6L8K2GY9a6UPSAGR0nSTbtJNuknfRirS4encSdEJZ7STZ87d2TC5cp+ov5mULyDljbSWYVBZN5JZgx+LsJpK2u771rHY7vzaPd0lMW93h1dcQ156n2ntPHzHOlfKD8LyRKaVqwu+AAAAAElFTkSuQmCC", "x": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAD///84ODgAAAAAAAAAAAAAAABHcEwAAAAAAACHh4fw8PCKiopXV1cwMDChoaHJycl8fHzf39+5ubl8D8AGAAAACnRSTlPq////12RjALoSCdtXwAAAAilJREFUWMPtmNGWxBAMhltOVztoqfd/18XZ2alIxKyeszeTq+ng5yOETEptX+s0ZuvXptSktlWO27qpKQkJb0bMiyQ1LVJ6PY+Z9lIu0yrFqFCUEjLOtfTzuD1knHhpblN6fJTeVwpWvMyGS8lpyCJMyYvSXh5yghIRmkpOkPVhH8I2lQ4hjrn4FOcP9etnNlt+VkqxfuGn/smX2K596KikW0o6NnDXWX7y+euURTMcXeKxuuaDbAH0iHmBLSnSt0fZDs6fHMbHseE+bhA+wAZ7o3YLwsexEUpwdk/ohTUbtYMRPoaNUoKj15ZjI0+Vim8GHtd/Pnm09i9b6FeCnliymXfOTMjHsLVOX+jVcEf3K+F82uIdNCNC4tMYm347tiB8JFtbCVluko2JdxXfQS0op+Rgw4P216ZSvb8or+yYcbhO6CnAKjlsUmg+Wgk/O/B/2d2C+SDJRyo5asHNmzuYpqBKKCVD7i+Kj1CCbJrnI5QggXd/jAiQLZSf/VEK1qwG0R05kYZg2jqjec2WL5W6dXvquvXkAfB8HTex3MixfLWSwUFgUOZvh9S6setXKZENAsMHlWA8uwwRBq0k3VDytE9WQbmsC5XAxb84bCHfUYRDZEzA3NwoPGml6illQCwnC6u1O33jNdh6Kn7e5v+jdEdexWSlO3I9PivtbljI7VlJ7kGPWdhlVMr5vn3Mcs4v5elusWW6JQmZc4f35TOV2pbhHOuyKfUN7gM5+TU4tOIAAAAASUVORK5CYII=", "z": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAD///84ODgAAAAAAAAAAAAAAAAAAAAAAAAAAACHh4ft7e0wMDBra2uxsbHNzc2bm5tQUFAjT0MpAAAACnRSTlPp////ZB5j6gW60vW5rQAAAXtJREFUWMPtmNuygyAMRSnYHi4G8P9/ttE3ucgWfDidYT926pqYZAeM0Fp/jPgbkTAfpgj9Nmpc5s0kBkk7JskoLRalyL3G5EipRRglR0EsqYwQyo6DXlaJSfoPJBdJNkQeIblNAvIAKUpIAIlfLTTzkvxnkibpXmeeetphnVl0yxnEYdtOB1P6/snwx6YKh3g+fThJaSYhEj+3nUA+mwQYKaYBBP4hdszMLIC9HtQxffcAbFq2rWOOu6xshWxDJCplO3ScLTbtm1LZEFJMn8uyBpICVrY2qVw2d5/kMpNEWR83VyRCTIKQLGQSgORLs8123FWyAComaZIcMNsw0q2yXZFwkwBnS8BMck3yN0xySUJnW5tUPEmaF80CyZVM0j6UCySftKSvX39vkqofT+eLwSRNUq3HQbU6s2KzDrfw+xEUkQfPlvlt/hskeoBEB2kNw6CwHiS1ejcmvyomHfu+dUzHzm/f0z2i5dgdPrGGfHSfqfUyvGNdmPIFQsk0i6QqPAMAAAAASUVORK5CYII=", "words": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaoAAAFOCAMAAADghKlQAAAAElBMVEWnp6eenp7V1dWJiYnMzMy0tLS3bN2iAAAAAnRSTlMEfEtMNSsAAARUSURBVHja7d3ZUttAEEBRLd3//8tB8jaSbAhGjtrkXPNEoKB00jMjVcXpuqZhiMxRJcrs++5RmKr1CAvUm2D117kL7dRPruV1icv+7khlDNqvzGe/c3aIvGd1+pyLuzPVj//m59qqn1c/E1Vnqm7jtbJKI/WKYo/9ZF4Fr1bzlA2GquJUXeaqOfttMZ3dD7rz3czM9OmTVG73KUyHasV2rvrLUOV25HRksZmcy1Bt9rFpEN1k/fMDxXTre2+yTmMVq6EK98IHn/3OWrEZq1h+NkAVOKbn6onEabdarn/hqUUFqojVXM3n9WxpwlOLIje/K4l5BWynKJJUlecUyzPEhSraT1j9ijxSWhwiYk1FqtLTv3ZrWlNZ/mo9qG041lSGqhRVO1YrqjBUtahiadNQpaGqRdUsc6iKU+UjKltVNaq4PknaUtmqUKFChUqoUKFCJVSoUKESKlSoUAkVKlSohAoVKlRC9b5U+1xIVO8jjgqVUKFChUqoUKFCJVSoUKESKlRCJVSohEqoUAmVUKESKqFCJVRChUqoUKFCJVSoUKESKlSoUAkVKpcHlVChEiqhQiVUQoVKqIQKlVAJFSqhEipUQoUKFSqhQoUKlVChQoVKqFC97KfmE6+//DJUO1O9LFR7/9hvv+b/XffLVwSqAr9p/ud7JypUqFChQoUKFSpUqFChQoUKFSpUqFChQoUKFSpUqFChQoUKFSpUqIRKqFAJlVChEipUqFAJFSpUqIQKFSpUQoUKFSqhQiVUQoVKqIQKlVAJFarnf3BMbzW748dvftvaQ6m8G/TbUMXljdO/8fHlt5iqKr+qvcq/WkSFChUqVKhQoUKFChUqVKhQoXrmNx0GVO9BNaBChUqoUKFCJVSoUKESKlQuDyqhQiVUQoVKqIQKlVAJFSqhEipUQiVUqIQKFSpUQoUKFSqhQoUKlVChEiqhQiVUQoVKqIQKlVAJFSqhEipUQiVUqIQKFSpUQoUKFapfc7V2C9WLy91CZapkrxIqVEIlVKiESqhQCZVQoRIqoUIlVKhQoRIqVKhQCRUqVKiECpVQCRUqoRKqXS5OvrBAhUoWQKFCJVRChUqohAqVUAkVKqESKlRChQoVKqFChQqVUKFChUqoUOkdqNLleQuqRFWsm8iKKlAVa/yEymZVbf272fRdf/OxApZb/8bhPpWxKrf+NTRd1zU8zoDVhuqy/sXHUE1U2S6OrArtVHljm6j6hiotgSWlrlTj4s9ZVZFqJMaZqlvgjNbAglKnU8ViBTx/TRqs408U7QDllWpcHRFhHTpRM9RiHzqvf6uxOpOO01tixOD1T18xvcXJuJHKhmp5lIhRB5crj7PUZgm8DJYOKjZPLbruZpWbBRPXMfO0PiZENkM1j9VoPy/7JLCR+rDq3fqWvcFaSM03wm59S95g9Wup0yLodqrcDdYW6oI1bWsq0PlYd1/qtGOpUP0jKVy1mD51ahZCVZunP3ETk6C5kV22AAAAAElFTkSuQmCC", "s1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAASFBMVEUAAAAAAAA4ODgAAAAODg4AAAAAAABHcEwAAAAAAAD///+oqKhZWVna2trGxsbw8PC1tbVNTU2NjY2fn59vb2+AgIA+Pj4nJyeYovYLAAAACnRSTlPxJ///8CbMAG6VwlDvkgAAAidJREFUSMell9uWgyAMRS3asQrhJtj//9MJaEUKotK8uJayBZKTEJq+75/DX3PT/oYngk3fv9oqeznYsW92096ebh740ONt04g9mqGK9fTQdG03VhmCTdPOdfDcotdbUgeTAgyTIYsxLeEODHYmkRl5GZ5IaoxfggXzc9HPaKDLz+gFWCgcqEX8UqqEzsLOTzzZibDfr3OwxEE5545IqzMY1yezsXOukGWYo1/DeEqpyH/Kwjr8HhaVBN+paEMZmG0DvNc9/flGCZlKsAheQc/N1msUwrp1CYawLxxKZg1TiC9+NCczs1ikKHJGF5uuLxvnNonCyw5DL+2UCZRFrC6Hyn5rRFC9glOc1mci2SRr/e75WCdP4b1XnRjAvuijlFRwkBjsDIY5rRqbXvlZGQIvaioSmkZTHxRAXzUwNjQztThZtpz0Rxomnl/vI5GB5bck1Y6Xe3GnsI4q/fqkYy4nExjc2IlSWJcIVu3FUYZ36/ro1KWWvjqz2bnW4Aq4CuuWRXicQzB42LzIFbEUNjsRyaQCROUzhRGwu1RWrgaJfLpm4pw9qEJZlkWYHuTUUhDVSVaxIxp/e3ZWjXwmuVrik0Wfns+eVnFGcF+F7IW2Yj3gMKVWU+RyW+ECxtKGxsLlPmzNiC2/KNxq4lwbtxoUOsCfes93Hfz2cMtrWN4ucAf3Wegc3LnLxhbSq2Yc1blrQq0N/oJSaY+m9lrlr0a/Xcp+uA7+A/4AcjapYKVhAAAAAElFTkSuQmCC", "mm": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABvb2/S0tKnp6dAQEApKSno6OiPj49aWlpkcjQDAAAACnRSTlPq////ZB5jALoM3OjzFgAAAgFJREFUWMPtmNmOwyAMRUNIhwRqCPz/x45JF9ZWxY40Gql+qCogp+TWBtuTUtvPOvFs/dmUmtRl1XxbL2raEGQNzyyitmnR2ogrz4TReplWbcVV8OwqrEatteGCEGX09CX9MQmClYUFnyZ9KKZcmmtJIFt7LjfSuRLlwktS6JDCm19x8IqEr7bPheEuHu+G2yvnkG0+J5nn7+J+BYeUVuPLzBwSAuxdJmdYpBmH4PbPSeCR/N0PWplGSY/lrUyjpP0mVEemUdJdqI5Mw6SbULaVaZgEMWDww85cEgolMVScZ5PmKFFPpnFSfODlxBAJXSn0ZBonzcdJ5M8gmYgCBmnPnsjGxTgJMqFkePIJJF8EzPNxAsnsWcAIFintQ7o0SiAFnwImnSiOQkrOaDP1KaT03SeZMscaIEHjEOilPFJ+J5NIphfNJJLshRqNJHqn3jjJdg4ASSLJ9orbqaRedkIliebuy9KxIRI09zGRVAm1S/qeZCMTleT2WiYKyTVCWRopJk5l4lyPjJFsdb9RSbYQKiYsMjsgRkhlihI3RCWVFYYcIFUVUMC1LiudMLmrSiD4sCoDYeoKzXfrrPeVog1QVYdHZZgNvKsUv7X5PyOFE0jhIDlg95/AHST98HmygdRIOvp9jmdHzy/26U6x5egdntGG3E7sZyq1Lewe67Ip9Qv/FlaysmjHdgAAAABJRU5ErkJggg=="}