
var c = document.getElementById('c')
var v = document.getElementById('v')
var video = document.getElementById('video')
// video.pause()
var game;
var gameLoaded = false;
var createOnLoaded = false;
var this_ , hand_arr = [],answer_arr = [],num =0
window.onload = function () {
    c.style.visibility="hidden";
    var gameConfig = {
        type: Phaser.AUTO,
        parent:'c',
        width: 512,
        height: 800,
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

        var pic_name = [],addFlag = false;
        
        for (var p1 in assets) {
            if (assets.hasOwnProperty(p1))
                pic_name.push(p1);
        }
        for (var i = 0; i < pic_name.length; i++) {
            this.textures.addBase64(pic_name[i], eval("assets." + pic_name[i]))
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
        this_= this
        video.play()
        this.bg = this.add.image(256,400,'bg1')    
        this.hand()


        this.resize();
        window.addEventListener("resize", this.resize, false);
    }

    update(){
        if (!gameLoaded) {
            createOnLoaded = true;
            return;
        }
        console.log(video.currentTime.toFixed(1))
        this.showHand()
        if(video.currentTime.toFixed(1) == 7.2 && num == 0){
            c.style.visibility="visible";
            video.pause()
            setTimeout(() => {
                this.tattoo()
                setTimeout(() => {
                    this.hand.visible = 1
                }, 400);
            }, 500);
            num = 1
        }
        if( answer_arr[0] == 'oo') {
            setTimeout(() => {
                video.play()
                c.style.visibility = 'hidden'
                this.bg.destroy()
                this.bg = this.add.image(256,400,'bg2')
            }, 500);
            answer_arr = []
        }

        if(video.currentTime.toFixed(1) == 9.7 && num == 1){
            c.style.visibility="visible";
            video.pause()
            setTimeout(() => {
                this.glasses()
            }, 500);
            num =2
        }

        if( answer_arr[0] == 'ses') {
            setTimeout(() => {
                video.play()
                c.style.visibility = 'hidden'
                this.bg.destroy()
                this.bg = this.add.image(256,400,'bg3')

            }, 500);
            answer_arr = []
        }
        if(video.currentTime.toFixed(1) == 13.0 && num == 2 ){
            c.style.visibility="visible";
            video.pause()
            setTimeout(() => {
                this.cinah()
            }, 500);
            num =3
        }
    }

    tattoo(){
        // var letters = ['t','a','o','t','t','o']
        // this.showWords1(letters,{name:'words',x:256,y:580},'oo') 
        // setTimeout(() => {
        //     this.hand.visible = 1 
        //     this.box1 = this.add.image(256-163,480,'box').setDepth(2)
        //     this.box2 = this.add.image(256-98,480,'box').setDepth(2)
        //     this.box3 = this.add.image(256-33,480,'box').setDepth(2)
        //     this.box4 = this.add.image(256+32,480,'box').setDepth(2)
        //     this.p = this.add.image(256-163,480,'t1').setDepth(2)
        //     this.i = this.add.image(256-98,480,'a1').setDepth(2)
        //     this.l = this.add.image(256-33,480,'t1').setDepth(2)
        //     this.l2 = this.add.image(256+32,480,'t1').setDepth(2)
        // }, 300);
        var letters = ['a','t','t']
        this.showWords(letters,{name:'words',x:256,y:580},'tat')
    }
    glasses(){
        var letters = ['g','l','s','e','a','t','o','s']
        this.showWords2(letters,{name:'words',x:256,y:580},'ses')
        setTimeout(() => {
            this.box1 = this.add.image(256-153,480,'box').setDepth(2).setScale(0.8)
            this.box2 = this.add.image(256-103,480,'box').setDepth(2).setScale(0.8)
            this.box3 = this.add.image(256-53,480,'box').setDepth(2).setScale(0.8)
            this.box4 = this.add.image(256+53,480,'box').setDepth(2).setScale(0.8)
            this.p = this.add.image(256-153,480,'g1').setDepth(2).setScale(0.8)
            this.i = this.add.image(256-103,480,'l1').setDepth(2).setScale(0.8)
            this.l = this.add.image(256-53,480,'a1').setDepth(2).setScale(0.8)
            this.l2 = this.add.image(256,480,'s1').setDepth(2).setScale(0.8)
        }, 300);
        // var letters = ['a','l','g','s',]
        // this.showWords(letters,{name:'words',x:256,y:580},'glas')
    }
    cinah(){
        var zzc = this.add.image(0,0,'bg3').setOrigin(0,0).setDepth(5).setInteractive().setAlpha(0.001).once(
            'pointerdown',
            function (params) {
                this.showDownload()
            },this
        )
        var letters = ['c','i','a','h','n','a']
        this.showWords(letters,{name:'words',x:256,y:580},'cinah') 
        setTimeout(() => {
            this.m = this.add.image(256-163,480,'c1').setDepth(2)
            this.m = this.add.image(256-98,480,'h1').setDepth(2)
        }, 300);
    }

    showWords(letters,words_bg,answer,callback){
        var rect = new Phaser.Geom.Rectangle(-100, -100, game.config.width+1000, game.config.height+1000);
        var graphics1 = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });
        graphics1.alpha = 0.5;
        graphics1.setDepth(2);
        graphics1.fillRectShape(rect);
        var words_arr_c =  []
        var words_arr =  []
        var box_arr =  []
        var w_arr =  []
        var result = []
        var coordinate = {
            letter:{
                six:[
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+90
                    },
                ],
                five:[],
                four:[
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+50,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+50,
                        y:words_bg.y+90
                    },
                ],
                three:[
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+50
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+50
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+50
                    },
                ]
            },
            box:{
                six:[
                    {
                        x:words_bg.x-163,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-98,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-33,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+162,
                        y:words_bg.y-100
                    },
                ],
                five:[],
                four:[
                    {
                        x:words_bg.x-98,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-33,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                ],
                three:[
                    {
                        x:words_bg.x-80,
                        y:words_bg.y-80
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y-80
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y-80
                    },
                ]
            }
        }
        switch (letters.length) {
            case 6:
                var letter = coordinate.letter.six
                var box = coordinate.box.six
                break;
            case 5:
                
                break;
            case 4:
                var letter = coordinate.letter.four
                var box = coordinate.box.four
                break;
            case 3:
                var letter = coordinate.letter.three
                var box = coordinate.box.three
                break;
            default:
                break;
        }
        this.words_bg = this.add.image(words_bg.x,words_bg.y,words_bg.name).setDepth(2).setScale(0,0)
        this.tweens.add({
            targets:[this.words_bg],
            scaleX:1,
            scaleY:1,
            duration:200,
            onComplete:()=>{
                showletter(callback)
            }
        })
        var showletter = (callback) => {
            for(var i = 0;i<letters.length;i++){
                words_arr_c[i] = this.add.image(letter[i].x,letter[i].y,letters[i]+letters[i]).setDepth(2)
            }
            for(var i = 0;i<letters.length;i++){
                words_arr[i] = this.add.image(letter[i].x,letter[i].y,letters[i]).setDepth(2).setInteractive().on('pointerdown',function(){
                    this.visible = 0
                    result.push(this.texture.key)
                    hand_arr = result
                    var  index
                    for(let i = 0;i < result.length; i++){
                        if(result[i] == this.texture.key){
                            index = i
                        }
                    }
                    var this_l = this
                    w_arr[index] = this_.add.image(box[index].x,box[index].y,this.texture.key+ '1').setDepth(3).setInteractive().on('pointerdown',function(){
                        if(w_arr.indexOf(this) == w_arr.length-1){
                            this_l.visible = 1
                            this.destroy()
                            w_arr.pop()
                            result.pop()
                        }
                    })
                    if(result.length == answer.length){
                        if(result.join('') == answer){
                            answer_arr.push(answer)
                            for (let i = 0; i < w_arr.length; i++) {
                                w_arr[i].setTint(0x00FF00)
                                var a = w_arr[i]
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                                setTimeout(() => {
                                    w_arr[i].destroy()
                                    box_arr[i].destroy()
                                }, 500);
                                        
                            }
                            setTimeout(() => {
                                for (let j = 0; j < words_arr.length; j++) {
                                    words_arr[j].destroy()
                                    words_arr_c[j].destroy()
                                }
                                this_.words_bg.destroy()
                                graphics1.destroy()
                                this_.hand.visible = 0
                            }, 500);
                            if(callback){
                                setTimeout(() => {
                                    eval(callback+'()')
                                }, 500);
                            }
                            
                        }else{
                            for (let i = 0; i < w_arr.length; i++) {
                                w_arr[i].setTint(0xDC143C)
                                var a = w_arr[i]
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                            }
                            setTimeout(() => {
                                for (let j = 0; j < w_arr.length; j++) {
                                    w_arr[j].destroy()
                                }
                                for (let j = 0; j < words_arr.length; j++) {
                                    words_arr[j].visible = 1                                        
                                }
                                w_arr = []
                                hand_arr = result =[]
                            }, 200);
                        }
                    }
                })
            }
            for(var i = 0; i<letters.length; i++){
                box_arr[i] = this.add.image(box[i].x,box[i].y,'box').setDepth(2)
            }
        }
    }


    showWords1(letters,words_bg,answer,callback){
        var rect = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        var graphics1 = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });
        graphics1.alpha = 0.5;
        graphics1.setDepth(2);
        graphics1.fillRectShape(rect);
        var words_arr_c =  []
        var words_arr =  []
        var box_arr =  []
        var w_arr =  []
        var result = []
        var coordinate = {
            letter:{
                six:[
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+90
                    },
                ],
                five:[],
                four:[
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+50,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+50,
                        y:words_bg.y+90
                    },
                ],
                three:[

                ]
            },
            box:{
                six:[
                    {
                        x:words_bg.x-163,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-98,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-33,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+162,
                        y:words_bg.y-100
                    },
                ],
                five:[],
                four:[
                    {
                        x:words_bg.x-98,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-33,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                ],
                three:[
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+162,
                        y:words_bg.y-100
                    },
                ],
                two:[
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+162,
                        y:words_bg.y-100
                    },
                ]
            }
        }
        switch (letters.length) {
            case 6:
                var letter = coordinate.letter.six
                // var box = coordinate.box.six
                if(answer.length == 3){
                    var box = coordinate.box.three
                }else if(answer.length == 2){
                    var box = coordinate.box.two
                }else{
                    var box = coordinate.box.six
                }
                break;
            case 5:
                
                break;
            case 4:
                var letter = coordinate.letter.four
                var box = coordinate.box.four
                break;
            case 3:
            // var letter = coordinate.letter.six
            // var box = coordinate.box.three
                break;
            default:
                break;
        }
        this.words_bg = this.add.image(words_bg.x,words_bg.y,words_bg.name).setDepth(2).setScale(0,0)
        this.tweens.add({
            targets:[this.words_bg],
            scaleX:1,
            scaleY:1,
            duration:200,
            onComplete:()=>{
                showletter(callback)
            }
        })
        var showletter = (callback) => {
            for(var i = 0;i<letters.length;i++){
                words_arr_c[i] = this.add.image(letter[i].x,letter[i].y,letters[i]+letters[i]).setDepth(2)
            }
            for(var i = 0;i<letters.length;i++){
                words_arr[i] = this.add.image(letter[i].x,letter[i].y,letters[i]).setDepth(2).setInteractive().on('pointerdown',function(){
                    this.visible = 0
                    result.push(this.texture.key)
                    hand_arr = result
                    var  index
                    for(let i = 0;i < result.length; i++){
                        if(result[i] == this.texture.key){
                            index = i
                        }
                    }
                    var this_l = this
                    w_arr[index] = this_.add.image(box[index].x,box[index].y,this.texture.key+ '1').setDepth(3).setInteractive().on('pointerdown',function(){
                        if(w_arr.indexOf(this) == w_arr.length-1){
                            this_l.visible = 1
                            this.destroy()
                            w_arr.pop()
                            result.pop()
                        }
                    })
                    if(result.length == answer.length){
                        if(result.join('') == answer){
                            if(this_.p){
                                this_.p.setTint(0x00FF00)
                                this_.i.setTint(0x00FF00)
                                this_.l.setTint(0x00FF00)
                                this_.l2.setTint(0x00FF00)
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                                setTimeout(() => {
                                    this_.p.destroy()
                                    this_.i.destroy()
                                    this_.l.destroy()
                                    this_.l2.destroy()
                                    this_.box1.destroy()
                                    this_.box2.destroy()
                                    this_.box3.destroy()
                                    this_.box4.destroy()
                                }, 500);
                            }
                            for (let i = 0; i < w_arr.length; i++) {
                                w_arr[i].setTint(0x00FF00)
                                var a = w_arr[i]
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                                setTimeout(() => {
                                    w_arr[i].destroy()
                                    box_arr[i].destroy()
                                }, 500);
                                        
                            }
                            setTimeout(() => {
                                for (let j = 0; j < words_arr.length; j++) {
                                    words_arr[j].destroy()
                                    words_arr_c[j].destroy()
                                }
                                this_.words_bg.destroy()
                                graphics1.destroy()
                                this_.hand.visible = 0
                            }, 500);
                            setTimeout(() => {
                                answer_arr.push(result.join(''))
                            }, 500);
                            
                        }else{
                            if(this_.p){
                                this_.p.setTint(0xDC143C)
                                this_.i.setTint(0xDC143C)
                                this_.l.setTint(0xDC143C)
                                this_.l2.setTint(0xDC143C)
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                    onComplete:()=>{
                                        this_.p.clearTint()
                                        this_.i.clearTint()
                                        this_.l.clearTint()
                                        this_.l2.clearTint()
                                    }
                                })
                            }
                            for (let i = 0; i < w_arr.length; i++) {
                                w_arr[i].setTint(0xDC143C)
                                var a = w_arr[i]
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                            }
                            setTimeout(() => {
                                for (let j = 0; j < w_arr.length; j++) {
                                    w_arr[j].destroy()
                                }
                                for (let j = 0; j < words_arr.length; j++) {
                                    words_arr[j].visible = 1                                        
                                }
                                w_arr = []
                                hand_arr = result =[]
                            }, 200);
                        }
                    }
                })
            }
            for(var i = 0; i<box.length; i++){
                box_arr[i] = this.add.image(box[i].x,box[i].y,'box').setDepth(2)
            }
        }
    }
    showWords2(letters,words_bg,answer,callback){
        var rect = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        var graphics1 = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });
        graphics1.alpha = 0.5;
        graphics1.setDepth(2);
        graphics1.fillRectShape(rect);
        var words_arr_c =  []
        var words_arr =  []
        var box_arr =  []
        var w_arr =  []
        var result = []
        var coordinate = {
            letter:{
                eight:[
                    {
                        x:words_bg.x-80-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+80-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+80+80-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-80-40,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+80-40,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+80+80-40,
                        y:words_bg.y+90
                    },
                ],
                six:[
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-80,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+80,
                        y:words_bg.y+90
                    },
                ],
                five:[],
                four:[
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x+50,
                        y:words_bg.y+10
                    },
                    {
                        x:words_bg.x-40,
                        y:words_bg.y+90
                    },
                    {
                        x:words_bg.x+50,
                        y:words_bg.y+90
                    },
                ],
                three:[

                ]
            },
            box:{
                seven:[
                    {
                        x:words_bg.x-153,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-103,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-53,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+53,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+103,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+153,
                        y:words_bg.y-100
                    },
                ],
                six:[
                    {
                        x:words_bg.x-163,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-98,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-33,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+162,
                        y:words_bg.y-100
                    },
                ],
                five:[],
                four:[
                    {
                        x:words_bg.x-98,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x-33,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+32,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                ],
                three:[
                    {
                        x:words_bg.x+53,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+103,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+153,
                        y:words_bg.y-100
                    },
                ],
                two:[
                    {
                        x:words_bg.x+97,
                        y:words_bg.y-100
                    },
                    {
                        x:words_bg.x+162,
                        y:words_bg.y-100
                    },
                ]
            }
        }
        var letter , box

            letter = coordinate.letter.eight
            box = coordinate.box.three
            console.log(letter)

        this.words_bg = this.add.image(words_bg.x,words_bg.y,words_bg.name).setDepth(2).setScale(0,0)
        this.tweens.add({
            targets:[this.words_bg],
            scaleX:1,
            scaleY:1,
            duration:200,
            onComplete:()=>{
                showletter(callback)
            }
        })
        var showletter = (callback) => {
            for(var i = 0;i<letters.length;i++){
                console.log(letter)
                words_arr_c[i] = this.add.image(letter[i].x,letter[i].y,letters[i]+letters[i]).setDepth(2)
            }
            for(var i = 0;i<letters.length;i++){
                words_arr[i] = this.add.image(letter[i].x,letter[i].y,letters[i]).setDepth(2).setInteractive().on('pointerdown',function(){
                    this.visible = 0
                    result.push(this.texture.key)
                    hand_arr = result
                    var  index
                    for(let i = 0;i < result.length; i++){
                        if(result[i] == this.texture.key){
                            index = i
                        }
                    }
                    var this_l = this
                    w_arr[index] = this_.add.image(box[index].x,box[index].y,this.texture.key+ '1').setDepth(3).setScale(0.8,0.8).setInteractive().on('pointerdown',function(){
                        if(w_arr.indexOf(this) == w_arr.length-1){
                            this_l.visible = 1
                            this.destroy()
                            w_arr.pop()
                            result.pop()
                        }
                    })
                    if(result.length == answer.length){
                        if(result.join('') == answer){
                            if(this_.p){
                                this_.p.setTint(0x00FF00)
                                this_.i.setTint(0x00FF00)
                                this_.l.setTint(0x00FF00)
                                this_.l2.setTint(0x00FF00)
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                                setTimeout(() => {
                                    this_.p.destroy()
                                    this_.i.destroy()
                                    this_.l.destroy()
                                    this_.l2.destroy()
                                    this_.box1.destroy()
                                    this_.box2.destroy()
                                    this_.box3.destroy()
                                    this_.box4.destroy()
                                }, 500);
                            }
                            for (let i = 0; i < w_arr.length; i++) {
                                w_arr[i].setTint(0x00FF00)
                                var a = w_arr[i]
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                                setTimeout(() => {
                                    w_arr[i].destroy()
                                    box_arr[i].destroy()
                                }, 500);
                                        
                            }
                            setTimeout(() => {
                                for (let j = 0; j < words_arr.length; j++) {
                                    words_arr[j].destroy()
                                    words_arr_c[j].destroy()
                                }
                                this_.words_bg.destroy()
                                graphics1.destroy()
                                this_.hand.visible = 0
                            }, 500);
                            setTimeout(() => {
                                answer_arr.push(result.join(''))
                            }, 500);
                            
                        }else{
                            if(this_.p){
                                this_.p.setTint(0xDC143C)
                                this_.i.setTint(0xDC143C)
                                this_.l.setTint(0xDC143C)
                                this_.l2.setTint(0xDC143C)
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[this_.p,this_.i,this_.l,this_.l2],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                    onComplete:()=>{
                                        this_.p.clearTint()
                                        this_.i.clearTint()
                                        this_.l.clearTint()
                                        this_.l2.clearTint()
                                    }
                                })
                            }
                            for (let i = 0; i < w_arr.length; i++) {
                                w_arr[i].setTint(0xDC143C)
                                var a = w_arr[i]
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:50,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 0,
                                    delay:100,
                                    duration:50,
                                })
                                this_.tweens.add({
                                    targets:[a],
                                    visible : 1,
                                    delay:150,
                                    duration:50,
                                })
                            }
                            setTimeout(() => {
                                for (let j = 0; j < w_arr.length; j++) {
                                    w_arr[j].destroy()
                                }
                                for (let j = 0; j < words_arr.length; j++) {
                                    words_arr[j].visible = 1                                        
                                }
                                w_arr = []
                                hand_arr = result =[]
                            }, 200);
                        }
                    }
                })
            }
            for(var i = 0; i<box.length; i++){
                box_arr[i] = this.add.image(box[i].x,box[i].y,'box').setDepth(2).setScale(0.8,0.8)
            }
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
        var win_bg = this.add.image(256, -400, 'nice').setDepth(10)
        var down = this.add.image(256, 520, 'continue').setDepth(10).setScale(0, 0).setInteractive().on('pointerdown', () => {
            landingPage()
        })
        this.tweens.add({
            targets: [win_bg],
            y: 400,
            duration: 800,
            ease: 'Back',
            onComplete: () => {
                this.tweens.add({
                    targets: [down],
                    scaleX: 1,
                    scaleY: 1,
                    duration: 500,
                    onComplete: () => {
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
    hand(){
        this.hand = this.add.image(-100,0,'hand').setDepth(10).setOrigin(0.3,0.1).setVisible(0)
        setInterval(() => {
            this.tweens.add({
                targets:[this.hand],
                scaleX:1,
                scaleY:1,
                duration:300,
                onComplete:()=>{
                    this.tweens.add({
                        targets:[this.hand],
                        scaleX:1.1,
                        scaleY:1.1,
                        duration:300,
                        onComplete:()=>{
                        }
                    })
                }
            })
        }, 600);
    }
    showHand(){
        
        if(hand_arr.length == 0){
            this.hand.x = 256+80
            this.hand.y = 630-30
        }
        if(hand_arr[hand_arr.length-1] == 'o'){
            this.hand.x = 256+80
            this.hand.y = 690-10
        }

        
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
        }
        else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
            v.style.width = (windowHeight * gameRatio) + "px";
            v.style.height = windowHeight + "px";
            c.style.width = (windowHeight * gameRatio) + "px";
            c.style.height = windowHeight + "px";
        }
    }
}

var assets = {"aa": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAADCwsIrKyv///8AAAAAAAAAAAAAAAAAAAAAAAAAAABsbGzT09OhoaE/QEBXV1iHh4fm5ubu8/F7AAAACnRSTlPp////ZB5j6gW60vW5rQAAAiBJREFUWMPtmGGPgyAMhhHdTkFA//+fvc7cbbzQlkVMLrmsX9Vn8KwUqJnn+b6Yr54wy50oZr4trj+WG5EIFH1fRELNZnLOD2tfDN65ySwuDuvQF+sQ3WKM870gQnlnPqR/S9qSfUbyHSRvMU6TQgGy/iyJhhTGZ6zWxrMkGsX+Io3kLJwjbdZuGWikyaZzpEiKc9IoOm+QaAgRQOMmOW+Q0LfqvEEqfGvOddJjKgVIdK6TKt+Kc5VU+1acq6Tat+JcJdHk1pokONdID7cMSHCukRJMbm8410j0QTaQ0HCukHDx+tRwrpAgmXaQzzmXSeg7gDPOuUzCZIqYpIxzmQSLdz32AtW5SELfx77gVeciCRdvPLaVXXMukXDx0lSjbziXSPjdz+6ZNOcSCefyu2uuinOBhMXyuQ9re6hAYoulXlt4El8s9drCk/hiqddzniQUy6qeby2SVCwxBnTOktI7kyudsyQolqpzr5PKk44UOzjnSLEsIBCSc4aEybSX58wgOGdI1aIvTqyCc4aEi9fjosCHufOahL73IpNxwPnTmoS+Q1E8ihWZOa9IxauxrLL4Q5nziuTlf4dLtpfzihRLpZt2WsheaJBivW2nctBenh1EbF6JNtk4pjR3rMojiVkQfMxeC62r4/a5Uf8xKV1ASgfJhu7+U7AHyUn35LeDQEQ6+n22L46e36NPd0lMR+/wijbkpf3MeZ66e6wTUb4BQohMJwXnZ/8AAAAASUVORK5CYII=", "r": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAD///84ODgAAAAAAAAAAAAAAAAAAAAAAAAAAACIiIjv7+/BwcEwMDBqamrX19eioqJOTk6RVB6aAAAACnRSTlPp////ZB5j6gW60vW5rQAAAchJREFUWMPtmMGOwyAMRAmkLQGCzf//7EJarWLTqIA5rFadc/vCwGADylp739RDIrXdM0XZ22bk2m6ZlEHayaQzyqrVmOgXmXw0ZlWb0VJQljabUsbJQYsz6kv6A6QQ9YVSRIR20iXnpYi+jRT0Z2ETyWkdLncFIj5tgpB0CFxhwQTScwLSFNICSWs3hbQA9zdMWpANapzk2aDGSWVQ2EMCkm22fnGUlP8KxF4aJ5FR5CD4PlI85zGQjT5KYpMcyeIJSYNjAqQR6p+ns9ystTt3fRjPU8Igyfj1vkuz9h2yWjdMYikV1Ew9qWbOquNQWmvyUlLAKlmDJH80u9Dfg8vU0kSW9R/p5vDGC74bVOtuoShXrVxjVUFWdvPpm6eptT4FPjOh9tdY6QLv3difzFcVcmyqij8cIpUaUvmDEdKbvd9bVX5rbOUvUXRHb/ngr4NU+aOh6ul33B8QdFcP5v5IqCQnDBqqvnMB91fQfohU+Tv9tJPE/Z36cMsNCOlXmKD9VkabSNIXh5ePN8XqLofn78TwvZv/G1KcQIoHaQcxCPaDZPbgZQq7yaTjvW+X6XjzK+90U7Qeb4czniGnvmdau4rfWNdM+QH7QTrJ33jbmQAAAABJRU5ErkJggg==", "ee": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAADCwsL///8AAAAAAAAAAAAAAAAAAABHcEwAAAArKytra2vS0tIpKSmVlZY+Pz9OTk415coFAAAACnRSTlPp////EmRj6gC6wZtbWgAAARlJREFUWMPtmMFuxCAMRE1NtsaOIf//tU1yW7QVbuxWq5Q5R0+jMEZ4gCg/Cnx6BOWRiYByQb9KJjhATXxqBwoWREmrT0kQFyjY0pp8WlPDAoDiBe0oQZikdyDVjQdqUi2kjXVE2r+oY1Jlk2RMEub0MZJys5B0SFqNpD/1xNPTL3lKvmSqhVRjPNkmuPckl2+V3pOH9ORJ4zy90FaveDJkwJenH3t6LenidH3uzKTp6RaenMnksGnRsAl+//vp1p7YcnqOPKluURlXrTFvle7/XX+r9Gc6Pd3Nk2kD0ueb/NutzCLDtFg2RdsEz938X5I0oH/Sk4RcnaTKuJPOvk99Oju/o6cL0QIhJeTZHcb1mUR5cXesSyb6AmvHT7IheRMKAAAAAElFTkSuQmCC", "h1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAAAAAD///9WVlYAAAAAAAA4ODhHcEwAAAAAAACoqKi/v7+JiYnr6+t/f3/Nzc2ioqIgICDLjLizAAAACnRSTlPx////ldb/AG4mzXR3fgAAAO5JREFUSMftl9kKwyAQRd2Ncf//n62a2tomCE4KbYrnJTB4VIIDd5CUUjGOBuFMJRFJuWAQS5azG+kgsdhIpY8hw5ikKcRAbrEZ4jgSEBGn34wFTBYY/Y6sqdigel9yvivXdZn17jYl4Tvyy0Kx30+4jmyEqLd19ZjHLsSmm095yp+T397pJeQDptyT9frkWo8kFGY/T/kf5JQMzL0NUyCwNRnU1uwnA9tGCDqYSUho3IPmdP0oZfXWiKE5w4d97fsJEJx6s4w1xNV4k6Mfd33MMs/DhlsHcdnieUyAwsqAAkQh6FhVRqNzQ9mJcfAG7uMt9NxDfvQAAAAASUVORK5CYII=", "box": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAHlBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaVcReAAAACnRSTlMA+SzmO8qxQmwVOAE+mAAAAH5JREFUSMft1zESBCEIRFFaQOH+Fx41mNqaZMW4f/6qlKxFZHRc5CGzcEDLTTP1cPRh9UKn7ugpF2VABTC5qjkESkxMTExMTExMTEz8H6eN8/KDQ8+3ie5t8IOtF4rvn9t5+T7bEXcHWwNlTRxr5WxNqn0qvwh7UuWadPXWyR9cBQqY+AWRYAAAAABJRU5ErkJggg==", "gg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9ra2vT09NMTEwpKSmhoaGFhYWvsLDv7++yVCZXAAAACnRSTlPq////ZB5jALoM3OjzFgAAApdJREFUWMPtmN16gyAMhgXcrIYQ8P4vdgR/aqwC1p5sz3LWp+3LlxBCQtN1/fejuWeP777rmu7rYe7b46tr+ghCuGcYUX3TGgPK3jMFxrTNw6Cy6p5ZhSbG2sBdUESBaf5JnyCRB9SLoffhPZJH7aKtpPhJI4TLJK9PDOgSiXD+F43DYkQ0sy6QQEenkIYXswmGoZIUoiCHaji0MbrtNFWRAi/rx+HMFH9PNSQOkRoyZpEll0kMssNQQkGR5EuKFgepQOK9CUPRvMyFI1Lcf79bn+FI0uGRF8ySKO6w2LWw5rbczSjKZ0kQ/d8uDZtDh1ZGCnMkdmSz9IipBMTYEnCyjtK9HMlrt5XEivzTbxHBAglFKgWx14ya02NMZznnXYgeSN+8zDTPZ5iWLciQpt8eB3U+j1PBS+HL5ROIrJQbPX29FuLCCZZhQpF8cz2O9fegmh+Rnhtt1wPvUdbfCu9iBESYYC0OR5bZuxhSFDkA2athE8U8ieafwnGVUdtqUCK5meSOSQ5+saZl0Xc0cXXelP15n9/RJHN8qUBvaQJxWmCqKW9pkrWXplVFZtpKTfxfEah0hPGElNOkZBlfLrXNCa7VxMurrSgn7ke8oEkWTY7UE+UvaVK77iL9e7mltLh4Cpr2N2dSpd1akKrzaar6dtfgLJxwIZ8mUbDvMJBbV3spx2dRNFRYUVNdJ1ajKfnnVA0oU8c3jWbBQW6l813PinKZLnrKDdH9ns4I7KA7kzXS68hxPm1MlYTsAWZqDpCqJ6C5myB6Bj+s/Q76S1MZXhjLCpMiwSsMj6a7uunVi+mV/qf8v0py4fb7U3CJZDTdJJE2kZTe+9w9S29+/E73EWvT2+EnniH7D75ndl3f3n5jbfuu+wFWKWXkJPwHdQAAAABJRU5ErkJggg==", "xx": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAArKyv///8AAAAAAAAAAADCwsIAAAAAAAAAAABsbGzS0tK+vr4/QEBbW1uoqKiYmJiKiorl5eUeISJw3LVYAAAACnRSTlPp////ZGP/6gm6iJSMwwAAAj5JREFUWMPtmNtuwyAMQLmkLCFAoP3/fx1ka0uMDbREmibV2sMm0lMOMzaBzfN8WdjXSLDlEilsnhc5HksiRZDVY2ETik1SarWOhdJSTmyRVq1qLFZl5cKY1KOgiNKSfUh/TQqOP8OFbGTTlhrCSDln/8ATBEZ4qJI8J5+H38FtlRQ438Qz0jy2xwi/ZkPuMUKSQva40He/nZkNXOOamRopfUDlH7j7xSno/CtCy07FSVhR+kE3E//2jSyIs/biuB4OddOtfPKYX8ONyPG0yNAPuCngRpAM4nd0E9CN2nfJbwV+DrqZrh2M+NXdSFLyO9i4DdjqzqpiPFjh/HfhS7dKfXLAr+FWIcFMbLjVaibcHfnql27V6guz+jdW1K1KIvxcXkU7OwLqR7g1egvidyXcGiTEj3Jr9bvCL6vqr5HgTsazu4NU7D4qK3tW3HXtlBapcKv61TLTUpmpXyRpvBqol3cL6kZU3irJWLKq2Neqij6r0pFupF+lIxw6nlYtv+4u5cRbXao4GcApFqeC3m6easKxKXd2c+hmfk6uonJ66jz1pAnA9Oo59Rh0UXzLDz8dYiKu4Yefx7HkMQ2/gmSof7iBRT35BZqUnrdEEsKmldqDoefkcDe0aYV8pQqSPSocii3087keNicQnn7NyptfQSrevDRoytQgkgWOfhusvSp+3s3/PcmdQHI76bYN3z9tt50k054w5v2fWNZkJO33fXws9ju/dE93SkzslEvI/e7wxPvMeZ6G71inSPkGd0NxvOAdpXUAAAAASUVORK5CYII=", "b1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAAAAAD///84ODgAAAAAAAAAAABHcEwAAAAAAACoqKg5OTlYWFi+vr6JiYmhoaF8fHzm5ubR0dHyVRtPAAAACnRSTlPw////JswnAG6VJTCB+AAAAX5JREFUSMfdl9mOgzAMRWPclpLE2f7/Y8fJlKWClthoXua+IBWdOt6CbcZxvE13I9R9ujFoxvEJKj0rXFn0QmGjzYMfYRArMPYwk4pt9GQMwKASAAcOnA52/wcmj3v5WHpgj27POv7N21OYjtjZfDmBAyId+Ee2OUMqmFUqXpTwkBOfXAsP2b+9lMEcza3przDZl/Imj5j74LQkeWnZiGhlMOMzYRFjNxyr+Jk0cEtrWcMkgudjh6NcdMI+q6ONS65sf573FYb6CqudkZS1nQNesFxNO5e1jVHbKggb4z1kWZrnsumMKIP57pzNFXRe1Bj17lo85b8SNUb11B9cB30wm0M1TDrLi9YQr4fohf2a6P5ov9C1TOwm8MLybC4XLRy3t4EQ5kM7UsKWv91B18+2BjCdTAYY7IGwTQzp+8c94+e5wtHZQBM/TiTUMUpligcqfzLEoQ7GBgNpWPodmQGKnC0ww5CsUAkaPIFaU1tQlHoY7VrVVqNrS9mFdfAHWnovqn6m9GMAAAAASUVORK5CYII=", "a": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAAAAACIiIju7u4AAAA4ODj///8AAAAAAAAAAAAwMDBVVVXT09O9vb2oqKhwcHCcnJyDjZvAAAAACnRSTlPq////Hv//Bbpk0dFGQwAAAg5JREFUWMPtmOuOhCAMRoUO6wUQ3/9pF81e+KCtRkw22Ux/zuABjrQgwziO8zT0xTRnyjC+JtMf0yuTMsjZvnAZNQ6zMYk++oKSMfMwGdcLyuFMdm1sP+jDmuFN+rekmNxPpI3uk6yD8HSXFFwV211SHtIKXH+XlEdRzsc7F++RonPw35qt3yPVY6BqjJdJrRcrOtdJ6Ft3rpOYuYjOVVJk/IrOVRLXv+hcIwU2OSTnGmljn5Gca6Q8uXBxzjopCp0LzhVSKvsmOnMuk/CBuJ45l0krJG/yZ85lEvgmkM86F0nY8QoTYp2LJExeD4uUdS6SoPFRzaPuXCJhsdx2ktWdSySQSv7YVkh1LpCw0321ozfGuUDC5752T6/WFoEEDel71wyac56ExTIy+y+zV7AkZYMUm7CkoJ0kJOcsaVMOEqJzliQUS30v5EhROZHIzjlSanbeK2WeISmnCKUUcqSqxVXnDMnXixmCxJRqSKFJMIgotWxJTdJjJGn0LQlnkPAF4Z9gtCFhsdwnJy9HcN6QMDPr91gtxxJck6rkbfIGfyjBNensJF8NsgDXJA9KtyZvqHG+XSERUxTgBFO+H2Z2+O3EbIT8UmWMS0v6d1DsSm1WQbC+aBbPPh3j+4v6j0npAVI6SEvoBoXlIJklUl/ExWTScd+39MVx57ff0z0S83F3+MQ15KP3mU/dsX4CkjtyKaZJ4a0AAAAASUVORK5CYII=", "n": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAA4ODgAAAD///8AAAAAAAAAAAAAAAAAAAAAAACHh4erq6thYWHv7+8wMDCioqLk5OTMzMxLS0sdDrnGAAAACnRSTlPp////ZB5j6gW60vW5rQAAAYxJREFUWMPt2NuSgyAMBmAOtstRhfd/2AXcbgVlbPlzsTvTXLUyfto0HhKmlLpr9oUE0/ekMHXTAg99S1KCuMGCJ0qxSQjjJRbeCDExLSIKJSoKzZgwEg8j2Ef6A5J1/BHOrL0Vey0ZXsXaWwlXUqghbnor8UpaOH+e+Lo/drXiqrO9lqTdHRuTvHt+xaSSnEAi5T/M0EiePzagUkm6J5HyToZGeiQdl/ImRyP5WLYRSDnpaT8KaUs6iVSuZBKpFBWNlK9kGunnNkchbbdeEsljkm2KalxyoS4qQHJ10gGpytkCSfvXNB8Rie9XAyRVT+0ASe70NXREOi/UIanaBcn4dhMnkNbz3zci/T45YaktKkAK7avgsFSenJ5EkvGY9EEpHItqUJLHohqVjkU1KslDUQ1L+dNCI7VFNS61SQckXxfVC1K3z7H8zQ6o6b1st12z73WKtrPwUqf46c3/keQIJFekOcBQmIskZuuxsLNIUpn3zViUmV+e05HEVGaHFGNI0nmmUhM8Y52S8g1dvFYp/mxZFQAAAABJRU5ErkJggg==", "bb": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD///9qamrT09MpKSmjpKRMTEyDg4Px8fGjOYZ4AAAACnRSTlPq////ZB5jALoM3OjzFgAAAd5JREFUWMPtmNFuwyAMRYPJSgLBhv//2RmqbqQqFY552VS/Vro9MfY1eHFuv22LLrbb7tzivjarj+3LLTsLUdAFsdS+rNYGc+jCBGvXZbNkDqOLw5DlXNugFWKpYJeP0r9SSgSdoJRQoNTVAYgcFEaVErwLloKYxpQCgPGdOBALcSTUKlU1ho6AQ0rxrZL3plBNYCpYBDHMYLpT4Qwm75FrawqTzww1h8nzASYRk2lqEs05U0HEZNryBmyO75woEVPpFNMkKpKU6fERyD+ENuVSpt8SLCfffJ2CiXs3tXkK1/MEcDSlGdPls4P27BgQrzIR5lM5wZQaz3Qu8et9l56QrjLlIoQz/Alr2qZ4ZoWa5E8FK83xJ3NO1XWmcnztUBDVOCH2/Vfcd6bnv9K+O0lh6wZDTD+uUi5D5F97ncifOE6+ktuOkXnmc4EMKHWZqGXyUqZfJR4JkbLo63rzLvYnnriesDeFZUyEhxdW5lDfDXXLiBc83aAUTPl8q1MwBekMfjNcIs7wcf63GfMu19mSlLOFnxv3d01Sv4DKJZH9AbWvskex61+KQOH1U/HzNv/zShHV+yeMVckCKpUQLCvVfV/URd35lT3dlFjr7nDGGnKfuM90bl/VO9Z1d+4bxbBiR+wCTV4AAAAASUVORK5CYII=", "rr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAArKysAAAD///8AAAAAAADCwsIAAAAAAAAAAABra2vT09NQUFCcnZ2EhISxsbHy8vJ0ZCxjAAAACnRSTlPq////4x7/BbpkbWmi6wAAAbxJREFUWMPtmMuWgyAMhkm0qIGA7/+0A7TTARwdgSxm0Sx76nfyx1xM1LIs2zqrEZvXLVDU8lhx3NZHIAUQ0JhBQC1qQyRtBo0QN7Wi1UaPmdEWVzUjjYICijC8NCGS+pC6Sc7CmVnn+D7pnPOikb9HcvC30S0SAejpxHZmfvrlB0nJTPKaBUjTpKNXIqTJ2CpW3aTkFYuQJi6dGiDtwSkvQopOuRaSydORq0jZXlJ41JTy+klgM6dsHqhbJJsXpBYhRRTLkEiIxFGdGSHl5qTeHe0i+WRZj+T4ed1Zqbrjstf9g/5kQKhnSvXx+I8i3H0kLzbv9jTsXPsMjqFlX7//XlJZJU8Ud5LAFihXFG9DV4kPUl0p1EPSSU6dmNxD0lWPe4aqixR/K0K1t39hvEi+1tdewd99nKHKV9faVd4T4Td9rouka30eeqfUQR/lQW+ad7W+IqnaZnCtL0+qNlKtL0+q9u+CQp/+CXoj6aDPvTOhlVTr42uSu9h26LALccNW5q82Nrq9KR52uWKLtO6zm39IBxL44fuTh0CaEYEHSQyIs0r3PhizdPOLdzoR29LtUOIMKXrPlLqxfgF2SmigrMzUFAAAAABJRU5ErkJggg==", "tt": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAAAAAABHcEwAAAAAAAAAAAAAAADCwsIAAAArKyv////S0tJsbGyPj48pKSlNTU7SOuuZAAAAB3RSTlPp6gC6EmRjzMR22QAAANtJREFUWMPt2NEOwiAMBdBaQIpQ+v9/K+NFQ1xglgdjet93cpdsy7iA6O8ObpqAu3tEQO9IH+cRDkiKLnJQEIhKzLrEQhTAkcQcdclRyAFQ0UKNKgQm/YJUJM0jPJfSYngmlVVJZlK7tfyYp1EmmTSXxifzdTFffDLjqsRX3+ATaeUNHvq9S5W//j6NnbZJ1sk6WSfrZJ2sk3WyTn/aSc7PTxel4deyKM6cLCe/lnaiNumzVDfsT7VLlFgpcaIm9b0vVVX65nfsdFsSYMsI2bfDfXsmog/qjTV4xCdpYqaxYOeEwQAAAABJRU5ErkJggg==", "bg1": "data:image/png;base64,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", "bg2": "data:image/png;base64,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", "bg3": "data:image/png;base64,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", "m1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAD///8AAACmpqYAAAAAAAA4ODhHcEwAAAAAAABVVVXp6emxsbGbm5uJiYnR0dHAwMBMTExxcXFiYmIgICBqk/H5AAAACnRSTlPx////ldb/AG4mzXR3fgAAAZRJREFUSMfN19mygyAMAFAWxarIVv7/Wy9BpEDrHUJfmpeW1DNDNEUgy7Ks00yQMU9rgGRZHmwoHoDB+g0ZPmqyhg9F0aECW8k0ZKOeyMw8HQrPwm1mYgwLRn4Ea7WJHE+TssbZD9kWa1HH+RTMx+wbVs1lQkPWtdn9I97yDxBcCB4vEuVNOYSQHTgU4c5ZKzym5wxVvhqFAzNvyV4sYcK7EJYO4OC2tuRuTENv7E3J/ThA3ua6MTyspuR+TKt2xOLYmXIQ86KV0Rj+Zo6isc4Pi1eJHrzz/LCS4giscoemxIHA9urQVLLE4OuLveaPwukKnkp2KJyKvtbK3GdduO5og8G6aReOxLJuchxW9d8Lh21VMhI36z8Sy2o9evZjU68gFo1tuQZj8atoOYBl+erF4qMoGY1dUXK+A7cY3hBnnHuE12DLA5cXpv/2JLIcVPuSm91QsSk5bgfybh+m0+TMfjfQP7MDHN71AmZmxBp2Yq/xVnvAMxw2HEeGAzXDMWE0pnhAGYyVjB6r4tHou0PZF8fBP7IPK2ApayFSAAAAAElFTkSuQmCC", "o1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAAAAAA4ODgAAAAAAAAAAAAAAABHcEwAAAAAAAD///+oqKhZWVnV1dWHh4dvb2+8vLzu7u6enp5LS0sgICC7FD5+AAAACnRSTlPxKP//1iYnAG6VzWIAUQAAAhZJREFUSMe1l4tyhCAMRa3aWhcCBP3/b63BdbkgbJVOM9PpuHryIpDQTdP0OY/dTRnnzw3spul7aJJvgYVd9U1ZA919bf/M47aYDfvo5iY20HM3DuujSdZhS/PQt8H90P0LzM7bfhfr6RbsDvAQ667CJ7SIl2EfPjbqcJaUCb/4C3AwqzKFKhjn32BhDZ8TKNYXfg/LN664NE5sv4Vdld1iT+M+wZyFq5TiVDPVYY+e8Z5kSxiTrsOoml5L/PKFF3ifw9uCmIS1Pl04/CCHdVQsRjQdzhPkpAJvrxawcayqAXM2KspgB18tcckkAI46fRn2CaAxyfC7LcPgEzqBDxBZBuvonsdiAXMSDhdhSKXBWmKIQV+ALcLlF3UYIqi51Aa7CzG7R6l4qjHHTKYwZrsK62IlpYsevasXCRrLKkyXYRUrg3FnL0WlGYzmfHTVQ41A5eX7GbYPv0675ExcqltSgsZDozf0IOkfBlKnayeJyzbi0aa4tPynA3DBzaSebOwfDsroDKcnMytRBs+J7nPHkJOZa7OAxagKMJ2aYdrG6G2jE8d1aYxgm7WxUot1oY9zqUemXbvY3N3eYtA67Yl3F8aKZ4Prtdrl+Wjp2jRUmGjO41B9DiOPvDZ0dwIk773a/ujfxsfmqVfgwbWwbtjhle6ztAo8ymXDqptihRrlmtAqc7igNMpH13qtClejv13K/nAd/AFTSnCwFhDoRAAAAABJRU5ErkJggg==", "nice": "data:image/png;base64,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", "mm": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABvb2/S0tKnp6dAQEApKSno6OiPj49aWlpkcjQDAAAACnRSTlPq////ZB5jALoM3OjzFgAAAgFJREFUWMPtmNmOwyAMRUNIhwRqCPz/x45JF9ZWxY40Gql+qCogp+TWBtuTUtvPOvFs/dmUmtRl1XxbL2raEGQNzyyitmnR2ogrz4TReplWbcVV8OwqrEatteGCEGX09CX9MQmClYUFnyZ9KKZcmmtJIFt7LjfSuRLlwktS6JDCm19x8IqEr7bPheEuHu+G2yvnkG0+J5nn7+J+BYeUVuPLzBwSAuxdJmdYpBmH4PbPSeCR/N0PWplGSY/lrUyjpP0mVEemUdJdqI5Mw6SbULaVaZgEMWDww85cEgolMVScZ5PmKFFPpnFSfODlxBAJXSn0ZBonzcdJ5M8gmYgCBmnPnsjGxTgJMqFkePIJJF8EzPNxAsnsWcAIFintQ7o0SiAFnwImnSiOQkrOaDP1KaT03SeZMscaIEHjEOilPFJ+J5NIphfNJJLshRqNJHqn3jjJdg4ASSLJ9orbqaRedkIliebuy9KxIRI09zGRVAm1S/qeZCMTleT2WiYKyTVCWRopJk5l4lyPjJFsdb9RSbYQKiYsMjsgRkhlihI3RCWVFYYcIFUVUMC1LiudMLmrSiD4sCoDYeoKzXfrrPeVog1QVYdHZZgNvKsUv7X5PyOFE0jhIDlg95/AHST98HmygdRIOvp9jmdHzy/26U6x5egdntGG3E7sZyq1Lewe67Ip9Qv/FlaysmjHdgAAAABJRU5ErkJggg==", "ll": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAAAAAArKyv///8AAAAAAADCwsJHcEwAAAAAAABra2vS0tIpKSmFhYWXl5dAQEDq6uqlpqbxXn7CAAAACnRSTlPq////ZB7/ALoMK36tCgAAANZJREFUWMPt2AsKgzAMgOEmq33Eatb7X3ZZQcbEoTOFjS3/AT6stNDGxZh9crqSzzG6OCTQl4boskBMulio7DwAhVFXIADvEnAYg64xMMi/BtJCQhE4k75AmhmXmKpCInxUSqmnpYpPFTotTYjzZekqCzTJJJNMMskkk0wy6UPSRjz1khCpm7S+x+5L28mlduollcm+6ae/qeKR5ndfZa+2+KHTIuvjHejgCba3+X9KparnT7U0CdZ7/+0qgkht3ld0tZnffU7XJd9mhz3GkLnjPLPbjPUGkdZ04S4GOg8AAAAASUVORK5CYII=", "g1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAAD///8AAAA4ODgAAAAAAAAAAABHcEwAAAAAAAA5OTmoqKhaWlrs7Oyenp61tbWJiYnExMRubm7X19dNTU0gICDQbSs7AAAACnRSTlPw////JswnAG6VJTCB+AAAAiFJREFUSMe9lwtzgyAMgFW2Wnm//P9/dYFSiU4Q6W252/VW+pEHSQjDPM9fy/dwU76XLwCHeX5OXfIMcGBXflPWSA8P+NDjbdGAPYali430MgzTOnbJOkHgJtoH07+CnbSevMRKI+7AzBJKsFjVCjNyIta0wI7HHzP2ttUwDf9Twq5hFUhtzozRV3BgvfkdBRG0yzpsgnfiNP4SlkwNFr7IQkaCTTUY1jliHWP4iCCSqgw7sMyhIMWzlgL55MuwRjFJJ0awLRztfYSDYoG8p1xLSDW60Qwd1xGWSLEFViVbKcu78xKMrDLZ++ypgSiUNAsUD40CC3tKxlKNlXw2eV/Yh+wTNokuRRtcZtlqGzBLYkmcVeYB1jn9wDkZvzgKVQXYZo9kcNmdlbW/hnVQofZllGInGmDwoBeOZv8nTHO0gbsFy5xV8Zwh2pa9RFzCCmUu1BKsb6d7DePctjHcG30NwxJ1OZ99vHRAfBOsc3ILvhUBa9PskN2hoLkaheKhozTAYc2cXFhajA2wQkqibnK4P2rw6NFpgXIIglZtSZK0qco4UIXjhVSmWbmet5ZbmK2crXSSjSb85I41ttoAkeXEs91dqeKXlKrLmUSlFq1TSb37IJWiZRpSfNcxT+ehyhzmtN9PUu7mBGigohj8GfFH4+NHU+9kelgzveDV3WfdmuBpejfJZrGBGsIzoVeW+EDplMfQ+6yKT6PPHmUfPAd/AAJBLiWZN90fAAAAAElFTkSuQmCC", "i1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAM1BMVEUAAAD///84ODg5OTkAAAAAAAAAAABHcEwAAAAAAABVVVWnp6fr6+vKysqFhYUgICBra2vbM0y5AAAACnRSTlPw////lcz/AG4mCOaTYwAAAK9JREFUSMft18EOhCAMBNCqWES2lP//WguyCXtsvbhJ5wKXlxBOMxBjTGEHZfaQBEKMB5pyNNwsn8pw15DkKIs6RViCYLJdBwDkxRRG+TjcbHh7JaZyrncqaTGtU7ISlxlXJZY3f8ZVtGPHjh07duz477E0gzyibwY/nYS0bWgqJUXfw+j7bHpnA3zUepEslvDGbNDEAyPWrExtCtpMsCb0gWJMAuus6tPo2Sh7MAcvo04giLEXrXUAAAAASUVORK5CYII=", "hand": "data:image/png;base64,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", "a1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAD///8AAACmpqYAAAAAAAA4ODhHcEwAAAAAAABXV1eIiIjMzMzx8fG5ubnb29tNTU1ycnIgICBiYmIdEk3yAAAACnRSTlPx////ldb/AG4mzXR3fgAAAc9JREFUSMfdl8uWgyAMQKkoVnmp/f9/HXBqCUlQobOabHq03HINMQUxjuPUD6Iyhn4KoBjHZ9cUzwhHdpsrY9tpMYUP/agOHbBJ9E3sTvdi6LZHU2xdSHOn2mDVif8Gu5f6xMvVwVploWtgo1CYCjhMLNOV5KYuw2Eun65suLwPB+sViZjbcBicJdihHzuFg6aF1xbfOIEdSRBWOYFXMjT83HwTTpKHq12IdwEG1s6wC38CA2st0+LNd2CQWquW4+6SlU0RBsXoEiGxNw/PqZzAk3qVLMpwHGXTA3yIFypRFgZ+TqnMW1/CuXXmra5gk0zt3gYWsILmAsbWRW8OntPodx+TfEtgYGi9vHsn783AtIZLLYGBSRUWWwKFDbC86E4UPrNGLYHC6sQatQQCw5YrQXBiBAYPlf3heKYlEBikU0JYMouBYQMKMAw7pEF9g+LF8JpZz0zFggJEsM2tJTMdaAkIdrm1YeodvFoIBrn2WacF3v5TggiWKUf0zz1lj5/ZZxsJm78RZIeBs625pcWLrktF4g85sg8w5Js/2MQ173oj3JkW1nS/8ObrWb9FeIiHjVVWxhqpIR4TWqPfDyiNMYnWY9V+NPruUPbFcfAHE6AkGbqn/ZkAAAAASUVORK5CYII=", "hh": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAMFBMVEUAAABHcEwAAAAAAAAAAAAAAADCwsIrKysAAAD///9ra2vT09MpKSmHh4eZmZlSUlLWo2WJAAAABnRSTlPqALoMZB5ZMvsvAAAA4ElEQVRYw+2Y7QqDMAxF+2UT21rf/20XC4oKUrZkKFvu37THoxSh11jrgzO8uOCtNXZwyI8brPEEgsQLEMqbgJhiZiYhBuMQYo685AhI3xoTF0SohEZJ95OmGdbM6WIA89Qn7ZYv2YGOg9QjndbvNpweAbVDSqQxrsn0GtuENm+DsQJMXVIRI6mTOqnT3U6HsJw4pK84XeddJyZJnX7C6YlnXNRJ/5nqpE7q9BQnuRuQ3K1M8Kaod/P/JJXK7p9qaSQ8HPxPUgGJ1Pq+wkvr/JaeTiShdYcSNaQX7DPFOtYX0BOZQVxtMk0AAAAASUVORK5CYII=", "kk": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsIrKysAAAAAAAAAAAAAAABHcEwAAAAAAAD////T09Nra2ukpKR+fn4pKSlTU1M+Pz/u7u5YhaEKAAAACnRSTlPq////ZB5jALoM3OjzFgAAAg9JREFUWMPtmNluxCAMRYNJSxZjIP//sQW6CJxl2KSqUv02ODpjDJiLJ6XW92Xqs+V9VWpSb4vst+VNTasHOewz51HrNEuJYu8zgVLO0yKd2EWf7cJJn2uJvSCPQjn9k36dRBa+zFhKHRp/PCfnFQnTrw0kIP8b7pwXJA254Y/HwcnwiUQAevu2HcCmoH1LLHXWkCwHbRoMNZBC9gQD+S/rSR5kTiCDopqEftX0KSIU1SQCYCCRR1RKugQl61ZM8iOGThFZUU2KGXkRURkpgA62I3lERaTw/xx0iqiQ5E4gEE0kxw8bONFGykCHA+NEGymPyF1HVEISLKL01FaRNI/oBvSStD3UkR7S4XcpDSH5Y2LMkNltG90tXTUpLB4NIcUyoIeQwvzsGNIB1/MrIx0Fm6qIxI4M5pdKBckn2fK6Qi2kqDj4iGsgfUmXLFWW3XVFJPKXL6IB4vPTDTUTowQTTKW4hlvqcyy7X3xRMNRECipMPxeFUpLmN8OpKNToJ3osCsUkzSUdLwrl6pD4XcyKQoVi5UlnRaGC5PeQ2Qco1s+k5zIKW5W94Cc56CjdRDolXSeZqiKFpBPb6VjxAqJ7FzzHlL3KmHwjxjG29KUIlp14Sp+Kmff/bf7nSXYAyUaS0d39J20iSd5K2lLTID0p9vtMn8WeX+jTDbE59g5HtCHXgf1Mpda5u8c6r0p9AOy0YuqtYq7CAAAAAElFTkSuQmCC", "words": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaoAAAFOCAMAAADghKlQAAAAElBMVEWnp6eenp7V1dWJiYnMzMy0tLS3bN2iAAAAAnRSTlMEfEtMNSsAAARUSURBVHja7d3ZUttAEEBRLd3//8tB8jaSbAhGjtrkXPNEoKB00jMjVcXpuqZhiMxRJcrs++5RmKr1CAvUm2D117kL7dRPruV1icv+7khlDNqvzGe/c3aIvGd1+pyLuzPVj//m59qqn1c/E1Vnqm7jtbJKI/WKYo/9ZF4Fr1bzlA2GquJUXeaqOfttMZ3dD7rz3czM9OmTVG73KUyHasV2rvrLUOV25HRksZmcy1Bt9rFpEN1k/fMDxXTre2+yTmMVq6EK98IHn/3OWrEZq1h+NkAVOKbn6onEabdarn/hqUUFqojVXM3n9WxpwlOLIje/K4l5BWynKJJUlecUyzPEhSraT1j9ijxSWhwiYk1FqtLTv3ZrWlNZ/mo9qG041lSGqhRVO1YrqjBUtahiadNQpaGqRdUsc6iKU+UjKltVNaq4PknaUtmqUKFChUqoUKFCJVSoUKESKlSoUAkVKlSohAoVKlRC9b5U+1xIVO8jjgqVUKFChUqoUKFCJVSoUKESKlRCJVSohEqoUAmVUKESKqFCJVRChUqoUKFCJVSoUKESKlSoUAkVKpcHlVChEiqhQiVUQoVKqIQKlVAJFSqhEipUQoUKFSqhQoUKlVChQoVKqFC97KfmE6+//DJUO1O9LFR7/9hvv+b/XffLVwSqAr9p/ud7JypUqFChQoUKFSpUqFChQoUKFSpUqFChQoUKFSpUqFChQoUKFSpUqIRKqFAJlVChEipUqFAJFSpUqIQKFSpUQoUKFSqhQiVUQoVKqIQKlVAJFarnf3BMbzW748dvftvaQ6m8G/TbUMXljdO/8fHlt5iqKr+qvcq/WkSFChUqVKhQoUKFChUqVKhQoXrmNx0GVO9BNaBChUqoUKFCJVSoUKESKlQuDyqhQiVUQoVKqIQKlVAJFSqhEipUQiVUqIQKFSpUQoUKFSqhQoUKlVChEiqhQiVUQoVKqIQKlVAJFSqhEipUQiVUqIQKFSpUQoUKFapfc7V2C9WLy91CZapkrxIqVEIlVKiESqhQCZVQoRIqoUIlVKhQoRIqVKhQCRUqVKiECpVQCRUqoRKqXS5OvrBAhUoWQKFCJVRChUqohAqVUAkVKqESKlRChQoVKqFChQqVUKFChUqoUOkdqNLleQuqRFWsm8iKKlAVa/yEymZVbf272fRdf/OxApZb/8bhPpWxKrf+NTRd1zU8zoDVhuqy/sXHUE1U2S6OrArtVHljm6j6hiotgSWlrlTj4s9ZVZFqJMaZqlvgjNbAglKnU8ViBTx/TRqs408U7QDllWpcHRFhHTpRM9RiHzqvf6uxOpOO01tixOD1T18xvcXJuJHKhmp5lIhRB5crj7PUZgm8DJYOKjZPLbruZpWbBRPXMfO0PiZENkM1j9VoPy/7JLCR+rDq3fqWvcFaSM03wm59S95g9Wup0yLodqrcDdYW6oI1bWsq0PlYd1/qtGOpUP0jKVy1mD51ahZCVZunP3ETk6C5kV22AAAAAElFTkSuQmCC", "n1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAD///9VVVXAwMAAAAA4ODgAAABHcEwAAAAAAACmpqaIiIjW1tZsbGzt7e2oqKibm5sgICCvYVAeAAAACnRSTlPx////1v//AIImeqL+KQAAAWRJREFUSMfN19mygyAMBmAWQZTV93/ZQ3App0xt8/emuWkn41ecSGMQ8zwvbhLMmNxSoZhnZ6FwhMluihlb02KpH16yw1e2CAfZpp2Y7Cah2GwtszUYNlb8DtbR7BH1kIsl3eKTUvgxp9IN1qYPPebKDfankDLXdZ5yod75Zzip4zuC2+0mFFOhPIzrtSagWJZWMxDvNQOxXGlpFMu69ApjqhmMKYHj1G1yNqYtjmN6XGycQrfF2Th2W5yNr/sPCL5aTgHw1XKSArA5a7YiWF27FMAm/3/mPNy3aSZWj74P4eEP+jmuPSwmFFMjyTDW3cNm49ZIYBzM01uAg9u7MqGYalZg3NfsDa6X+rzHWar6e+pIlfvJIPUjRHh0wKfci4GmjPOMVmPuxSiV9LpHvzmOVA6/NAHCUy9hqxGr7Y63wLdhIzzRYSPmvDIi50hqEuDZpp1v2gEFjEXM8NLu20PZF8fBP3E+K4LnGswdAAAAAElFTkSuQmCC", "c1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAP1BMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAABVVVWmpqapqanT09Ps7OyGhoa8vLxwcHCampo+Pj4gICCntAhMAAAACnRSTlPw////JswnAG6VJTCB+AAAAg1JREFUSMfVl9GSgyAMRVG7tSKBgP7/ty6kVqKIKJ192Dy0M+iJIYRLEH3fP4YfcdN+hocHRd+/2ip7BTiws7xpM9Hi6f9Md9uMx55iqGKJHoRo567K5tYnrp3q4Ingpg5u/gzWaGRDJg3qWzBaT03NahYvw4TuzMA12L3fVkuwWhkawCswfVZtx1QYc2U4sCbJkLY7j4ewSQJkD+AcxhxLtDyFtdwEB0rpzTM8gx33jlQlcf4jf3gAT2xe5rPEwD4NedjP2HJWOvrVccHGPGzjrGBZGpBxgYH5TmEftY4fdquX9yA6ls0EZp71ioRwnFJyO/8UHqNn5gf59shn28Upjyw3n7RbdVZhNobFp+drZRyhtJ8ZbDaFfEWG5CbZ/wbOJcxrmixqGIN5GZMuTTv+bJ0xFgQrkulkP7PKgLh3TXCpl/rEK7XdrbKxVrlW9uquUp99bFhFez952MQcB9mQ2AEXTc10KIWByQasaVIsoe5Ew7h4gtyxBQ2jZYliO/oMMe11BfUkZdfHBQlNQbfpDXtIh6BN4azCDB0yIIunJDZHx1U4Yycon89ES5YoX1s0BFc6A1i6Ci+4wRb9253Z+YYG5b4lSTqas1YKDOMTJSg3cUFwg6HOy9BXvedXXW+LNSy2b3iG+yzMC9y2Vi25uWZK2UCJcE2otYEuKJX2FLXXKroafXcp++I6+As/GDRAQ83ISQAAAABJRU5ErkJggg==", "x1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAPFBMVEUAAAAAAAD///+np6cAAAAAAAA4ODhHcEwAAAAAAABWVlbd3d3w8PC2trbJyclubm6BgYGVlZU9PT0gICBmBYWZAAAACnRSTlPx////ldb/AG4mzXR3fgAAAetJREFUSMetl9m2gyAMAAW3Krv+/79eoreVhOBCm5eeoiNDDAjNOI5T1zcPo++mCDbj+BJV8QIY2HV+GOtGN1P8CfJxhIhNTSeElxXhheiaXqyyKlYR0yyWOngRMetiqIOHn8I6uOE/nHk3GqaNgfU8JOH2Rse0cXAYUJhSGwvHTtRHNt5ppbT7zx7xjz/r2aVPinfGgYR0VOWe9ZJc1SAZHzfrd0sb/5xk25B7l3SUKh0B957ndFRbngN/jYMt7QqLqPMKa8n96EnmqjzT9ErnSfIvYCxelC5MDPR20Hu7M6uQeEm6BFv8PpNavTOfM3FclxeLARX3qC4vYCLOSZ8sQ2FYDnGQbh+sYQ6tGXOe6hMYPJOMqSfaaiHJbbm6KcAeSf+P2t+DQVoRl7tFAtJZcmFe6BtwJl0Q52AkbVVZnIGRtJ6d5JdOHkbSAT2IFHwOI2lQPYqFztQMJtL40xaweAajuQejTFcfIk7hTNqasjiBcXnsbxYtXkicwIFKa7ISy3RmE3gm0iabUekHOu+5fcehC/qf5nLPFm0g3h8I3HpkjGbbp6xJRn9EeVsh7ccPTQK2+QebuK/2ntW7XoCFrWGt2OFVPWfVCnAPhw3XPgwHVA/HhNrotgNKZUxN7bFqOxp9dyj74jj4B7HuLj639bbUAAAAAElFTkSuQmCC", "e1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAAAAAD///+oqKgAAAAAAAA4ODhHcEwAAAAAAAChoaFWVlbW1tZtbW2EhIS9vb0gICBnZ2efsvmXAAAACnRSTlPx////ldb/AG4mzXR3fgAAAQRJREFUSMft100PwiAMBmA+i9QO2P//s47pwRmBtBizw97LTk+yFYutCiFE5xUz3sUNqhBuWpRbxdWWOzNl1ypuj2TYSRuLyonsrp3yuhhRit7KrEGGQasTYVyhlTUPMHSTuxj7eO3iBYDaXwlw4TbO9jOMaif2OfdxMgyMx5DhYOI1Rue1V5zAx4PiYzTSHwkBLBdmNAZyqv3lqGgCJyNuDEvmf42RZ/DvWnL8XzW4w6YuwPcqMO/tfDjqC78mA7StpEG1qT9WvL/Wl4EmdS0ORimy2Eo+1QQonnor1llis37iQnxLpWJfl43FMrNU5euaII3bFxRhopKuVftqNLeUTayDD3IBLS5h5ljfAAAAAElFTkSuQmCC", "cc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABsbGzS0tKenp4pKSmFhYVVVVVBQkKwsLDl5eWNVuU+AAAACnRSTlPq////ZB5jALoM3OjzFgAAApRJREFUWMPtmNuWqyAMQEU7YyUGCP7/v56A7UgoiNaeteZh8tjqNgm50o3j9H3vrsn9exrHbvy66+ty/xq7iUEE14QYNXU3rUHN10SB1rfurknN6prMijT7WsNVEKNAd3+k30ZCCzSsYpzFd0nIFGOGpxgWZ98goRtKQvYkycP6HuLSP8Sjffx2hoTxnY3yQwuKGnucFD+OfUkUn4CBo6QAcktfkfAvHCOFR21fl2C6PULC4Im+b6D8ARI7Avp9AWlfhcS20dIgLeFAWiTPDylpS2BnAYFCqTIJMiepZ3BbqZQxLRK/M2dH/hARFzY1r0iyUiUba4DnZA6oNNhT84okJ7zktyBEGfWqSWIdki9T8jxuf80xl+0uCUUsMZdydVdDg637HrfCBCuyIvhs838rMp04uSwpfkqfA+tbecfldkkjmWT4u3I1L5LMUDmfk72FT53SlDD2AsmJ5PoY6Tfq9PtIPo8CjqfByaCsxhMHsIgn99IFQ4gf6Zyc/PUYT6YDQHUq70jk3VonVs2MmA5KJK4YvlYL4FknYl0x5FtVxVbqU6ifT8sXpFbNlInXu+R52XTm9DSK1ZeEo9RW0rhVpP+0SfxlzJpU7C0uG4OwVceFN5J+Z/LWKY612oOx2IMx6+bU6sGYKbXOBZANeHRgwghh4xqjSqZSjeQbE93r0LM70+EuiLKZtTpnwv54uLisD+7MviGvoDbXzZTZtjuPx9bvq9NqBtrdEey6VrwYxu2GqwCe2Vse+w8gbhRcFzTwJ3cpS8VdyuE7+93LXkaA7++cT5oheH/n/Nvy/w/JfYDkIsn4y/dP3kSSHvAiCQfNpHjfZ65JvPML93QfkVu8O/zENeT0wfvMcZxul+9Yb9M4/gOyfVE6FjZSEAAAAABJRU5ErkJggg==", "r1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAACoqKhWVlaGhoa/v7+goKDPz8/o6Ohubm4gICBjJejhAAAACnRSTlPw////JswnAG6VJTCB+AAAAY9JREFUSMfNl9uygyAMRbm0tXIL8P8fe4BaAbWWxIee/eIMw5KQQEjYNE23+c6Qus+3BLJpekqSnhnObNRIxUKzR/oYgZZJ2IPNJLbQM2MyCpKiTI6TnAbzfwXbwPcKzsEAfIQuP7DfYMtPFPw5bDi3B/sDpQoOFPhtlKbCwmvODRUW0BmOhIVrlz6FrVpUF/Np6THYrCHSvjkFgISrk1PA3CjsihLtCTBsx9Aw6LpRDLzbc9qCwsKW7u0a6PE4H2XM4RN2fK88Ec5X2tFuFWQfBMp99krzDfv1VvnuKtcQj4XKdGkk4OBmvu/dNXRITOdsQMC2PZp5QCNgcG0aydtWCFh02daOZ88Cw9Zwg4BFb3j7q5FMojce1xi4N1zXYA/lMNdGqHlxxrJnZ3gN9hjcRSgH23+uDMzyRK2ziuHvh0udwL4tI3Tjpv3wQUHjmkmrk6GlNXwupbx9vVB97QTObYd/XQFeqnqlpbBWvuAIeBbiAksZFFIhUyy3CVTNpUEh6sGobVVpja41ZRfawT/EZCwa0XUhKwAAAABJRU5ErkJggg==", "oo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABsbGzT09O8vLyfoKCEhIQpKSlAQEBYWFjn5+fUAk1EAAAACnRSTlPq////ZB5jALoM3OjzFgAAAr9JREFUWMPtmNl2hCAMQAWnVUHC4v//axPsdAgo4vLYnD7MqXoJ2aEbhul77O7J+D0NQzd8jeq+jF9DNyHI63viETV1L6W0mO+J0Eq9ulF5MYt7Mguv0NZK3wUhSqvun/QECawN/a94beEiCbTvnXNvUvwZ4DzpowwT5+05EoQ+KgMg5K8sACt8g7VPsvETWGQu4OmBbiZFEMhNMcTypo1EIL3IPbElaoeEbzorK2LI8OaYBLhkFSTljK+EI5IhO2h5IIJWO9JJ43LyUAy5pE6ivc3sowXIxGA4SvdO10k6dz/ZPwapZ6wF/w01EqmU+n/2SaYwP0Cq1AYpU2mOEQ0Gi4LPUKSUqZDwcaLSgsXAw98ijq1iE/eVJOARYFkwW75zk8RUSbJsczOzqhCB7w/B+yR8V6RG5VlP7mCB8BdSJckz/T2LvriQM2whu0fCrXvmHV/ktmWG0nskbnBTlDTDMkl8TL5Fspvav8WlhporJIu+2g6YLTsmu98g9ZwE10lcJ5eTQloo2nXSpU4nSAc6+TQtT9npjsXrUdDzKHChLTJFEZnF89CaLa7MFmjLFq69DLnzfF4qbHtVCdnmfGtV4eovvKmRSmn5dbVKl1Vf7B9JSKHCvrn6iqxJhU/XNvTbNHeEvEst1JuCfXcpONGlMqPKZR0IXZxXgXfOvto5c6vGL1YJ86luXrRzYsUJQxSD3cGEQf2jbepxB1MPKeXsEQiTl+Xk7nTo4IHpcI2EulaiGH73pmicShz3VO5N1zZF1yd7cknzZI+oeIqCUq/16KJN+wnI6BjZeAL6pBqAPn8CWk9T2XnsfSozJ893mLW6POIF+8DpFSlXT6+rZub/vuBxUniAFCIJs+IuCFwkKSytxpDHL/5hSVNIivd9LjaPyxLv/Oie7hF5xbvDJ64hpwfvM4dhet2+Y31Nw/ADUo1Xsj6UkrgAAAAASUVORK5CYII=", "ii": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAAAAAD///8rKysAAAAAAADCwsJHcEwAAAAAAABra2vS0tIpKSmZmpo/Pz+Ghobq6uo7P0ACQ2AWAAAACnRSTlPq////ZB7/ALoMK36tCgAAALVJREFUWMPt2EsKwzAMRVGpcvxRrKTe/2brGgLNoFAiDwJ9dwEHYshAj1IqIZOvHEpKlJbM/vKSqHSoqa/WqUKBWePqKypzoMwtrtHXGhv3t2b1Qp1SJkg3k0w3Odp2h2RS5SO9Lqmcs8tS/7Tn48hEdkiQIEGCBAkSJEiQIEG6mTTvArIz5LjK5l2KuM3/Rqrm3p+sDom//gS/ZsJdGntf9TU2v/dON6UwtsMZM2SZuGdO21hf8/d39RMzJXIAAAAASUVORK5CYII=", "c": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAP1BMVEUAAAD///8AAACHh4cAAAAAAAA4ODhHcEwAAAAAAADv7+8wMDCkpKRgYGCRkZHR0dG1tbXCwsJycnJMTEzi4uKcisZbAAAACnRSTlPq////ZDT/ALoSWgCnzAAAAoJJREFUWMPtmNl2hCAMQB3wqINsAf//WwvojARRXOg5fWjeWplLCFlp+v7dDs0zGdp33zf9eyDPZXj3jQd19Jl0HtW0hBj2eibMENI2A7FPQQ5libM1oa/nQknzT/prJMWl6BYRXN0lqZXypekbJDBdTqy+SJrk/DvOp8+/NKezXnCFBOE3K+VLC+fl50k8rM8GJFj3SZ4leZCY9sKVblF7JO2W0oMM4U2oz5CUBx06otd5OkFyRjUFnzbJ+fIkt2Ex+U1OKVUisWSRQ0vvV1O6HS2RkjWLZ/nrYsl+JVKikoxiLkY5V4BjksYqyRC1zAVzgtLI5jmSQXvp1QkBRwmgHXMkt55F1SfaGdZPiifOmSEp5EvuxyJVF/iSbcSxxTk6gkQba5SnSp5p0M2howbn/+RhYKW4E3FATfgIc3bKZvMMycZaQCmSD0jOde2e0a6R8HmqknQdkqxG4jVJleyk0xoS/EmzU/6EEphKErrebQ5Knpn6eBR1VL0uxR3iLirCkkVFoSLgi9/8NV/AnFfiApQhATIyxMHDonLJuEX3miHhwPOpQUY1gO7dRi77CmSoKHlzXHTKpMQbP7UlNHjJh+PThTrN8vUOpR+Leoxs5aRJiHxrME9UF6UarNKOJvQFBjd4XiUo9ioyqds7DZQodz1Tpo/MLIETnRh0hWziz0ZP9ZnyWCsmNqbc7X09anc6VnbTqx3048GLspmXhVYdzs8Ieh41WJZj1ZW5Rc0dieF8pfgEkLaJZ2YpLbKzlIEb8912LrNU3Z85xUq5P3P+T/m/QzIVSCaQRvUYpMZAIqNmz0SPxJHCe9/4TMKbn3+nqyJtU+URMrwd1nvPrPbG+gNEvTir4Xc8vQAAAABJRU5ErkJggg==", "b": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAACGhoaJiYnv7+/AwMAwMDBlZWWoqKjY2NgFZoQrAAAACnRSTlPq////ZB5jALoM3OjzFgAAAbhJREFUWMPtmNFyxCAIRaNma1SM+P8/W+NOZ9Q02Qi8tczkJbs5g4hXYLHWfW0Lz7YvZ+1iX5vh2/ayiysg5QPHvCoot6zGeNA8A2/MumxGcUEFpUyJtfGab96UwJsgQAqVJOfTP4lGikldWELME6RLTrG9PAgPSVF9NHxG8krFq2hkxOpxyk9I4YZUaf5gZQHSe/1JhKRzQQURUkVFEZLGcX1kEhSnQIR0+tdHUpumGPv982RSl9t5CNQkqfkBCKSfxMmh/ZhD6j/OHJ9Sm9iZF/Hm3OKgLfS9S4MczJBSq5XHe5HTAknqBPvRJSIJ/ElUiCRUZ9Ekrg6CEtMnVLP5dHsrZBHSsX2enJl4o790fRp9nyW1oYndnTelKkdJkK70d0rptO6cgu7ETJL60HBIvSjRSbXcAcbqrtJgPuJXZeF8FjScrOmZ+bhaYZCGCopOguEU0klp9g6+u1yyhI4nmYoV8JeOY5pU2g1/0jxGB6T8o77ltit7K3rkd4oqBYx/tqOWm4bIkZIAKVXSntmgvFeS2RF4hrsppDrv23lWZ37HnE7E1jo7lBhDOsF5prVuZc9YV2ftN42FQUmmQZccAAAAAElFTkSuQmCC", "e": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACGhoaJiYnCwsLu7u4wMDBeXl7l5eW0tLS/t+6eAAAACnRSTlPq////ZB5jALoM3OjzFgAAAQRJREFUWMPt2NsOwiAMBmDaMctpIO//siJ3OhfY2plM+a+XL6ZrmVQR2ZtRvJibJVI0G+THzKRsgcB5ThwUyiqN6JaJl8UhamUQuFChAEut0U38OCyFRy8g+SrJ/aY/k3KCRpILPVLTqbm3pdwFgWtLHiC0exrSkIa0WwpinbktBRmpb4LfJX/4VLmC9KlMWUoCyGIS7JY2qrJ6ZEhD+m5nnj0tByf4t0+6i5y+67fH+XLKfc1fm/PwP4xV/YY0JN4NqKMzO29lHdPSc1Psm+BxNz99GyInJQEpVSkGNhRilTDmhZccsUh13xd5qTu/555OJLruDiXWkFZwn0lkNXvHqi3RA8GPSXHMBo+KAAAAAElFTkSuQmCC", "nn": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAADT09NsbGyjo6NYWFh/f3+urq4pKSk+Pz8i6KGHAAAACnRSTlPq////ZB5jALoM3OjzFgAAAZ1JREFUWMPt2NuSgyAMAFAgtsj98v8fu4GZtrLq2JI87M40jyJnBINtIrQ291XQYr0brYW+rZYe600Lg1D1tKhIGbFY66WjhfTWLmK1VTpJCyerxb22ngoh5a34Sn9AShEeUX0+HikxXUse74NX5LORdCUFGCOejdQrKQEE9QiHM8LhSBye9lpSAUrlkdqMxCPJ1/qIkkrPTadK7vnCqZLK+MIzi9QmeR7pkVR0CZOqJzSDpGrfdA4p95PMISnfkopFwk0vgUXqm84j4czCJOFJLoVFaieZ55mUKiQpjJtOkKIbTzJB8mNSESTIw/ooUh1OMkWCtE0qkgRyS5GkeJhdM1IJXBKA45HaLwuP1L+8PBJeqDySrGNSEaTwK6nmpXYp8khtfYFHCvukmpTkPqlmpX1SzUpyl1TT0m7T5yX8Y14ci9SKlsgj5XF9b0indU6CDysgGYf709nAdVU2VIpjPbgZgHcqxW9t/o+kyCDFLpVM7j/l0iX7KuQnI4BFqff7Ci16z6/16Vhi6b1DjjakYexnam0Wco91MVr/ALcoVKM4a0ZnAAAAAElFTkSuQmCC", "g": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+8wMDC8vLxra2tVVVWpqanR0dHh4eGenp5wNnJKAAAACnRSTlPp////ZB5j6gW60vW5rQAAAnRJREFUWMPtmMuCqyAMQEWcuQoSCPz/v17AtkMoAhUXs5gsFY/kScK0ruv3Nv0bkWn79pRp/dr4uGxfnuRBTIwJ86h1WjgHOY+JBM6XaeNsFOSF8W2auBgHzYJPf6Q7SOiEZk8BZ+w1kgL2JuDsxySlWVkEfkTCgwPG/IStMe5guQ9I8RNtSoaLb2wnSQYDaXWSYyKwsIskg2biPBmxgCqTAkjVgsf6FbqDBIXNF1CuSTJt0KEgNkjYUu3xpbdkg5Qv8SFqYkRQx0v/TFZJmK2Y1U9sy+yPpkrKFsg09TTSX0KNZOmWYmSB8wQM8aglVa9GctS7kJg/ZGK6+wZJE+cq4sfE89IEL9S0kyR2g26KRppfis+KQN7lJEUUUFlOSFrzVC2eHPmRyGPUvbwYvVAjATGTZvnpHOpxuZrnJPKtfSlXKugN7YhnX0aDk4Je8Z0lJlaP2FLsTFSNBMTprmj4kp+rexok/bo9ydzi4iqJRsGzAl0i+ci0bxXoEkmQbHnkziWSI7X3qCI0MrGTRItzKMU2y5Ze0kzL+PPESjK4mwTEJpa9lfVuEn0dT3ZBmrxu0szSOIj6MR1PKaezbq5FElkT4tjZ0dki2bwJwVfjmjV5LVLYFGQdjtGhdcWPIvORI6ZnKmiSsoN3hBT91UZhtY4nfUVDwdhKQ7sfh3oXfUQsPenPZoTYvJ9tS5rCyHE6bRyLDRYwUDiBqxOQOMLRGJW0rqZ4kjensrNDvDiW1SdFdO8wLfDq9JrQwDn8m/J/FwluIEEk7TgMwj2S+K7kmKide1K879vHJN75hXu6W2SJd4d3XEPeep+5rsvwHeviKf8Br6tJl6dtQ3gAAAAASUVORK5CYII=", "i": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAD///84ODiIiIgAAAAAAAAAAABHcEwAAAAAAAAwMDDv7++wsLDs7OxTU1Obm5vV1dVubm5imS3aAAAACnRSTlPq////ZDT/ALoSWgCnzAAAAK9JREFUWMPt2EsOwyAMRVFjkPm3sP/NBpCqKtPYgwzeXcCRgpSBH8WYQyJdKeQYKeYk+lKOtCH2unhTFERmd7rqFAmUhKtTx7LeWrwecl4I0suk4T/8azaFNPiWfy75u8TjsbQ+7f8nfZkbJEiQIEGCBAkSJEiQIL1MsruA7K4yu0sRt/nLpWkgzSOVoYZGOZKU1qum3oos6ex9RdfZ/PZOZ1IgkxHybId2e6bZxnoBABMvCYUQvY8AAAAASUVORK5CYII=", "h": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAAAAAABHcEwAAACIiIi4uLjv7+8wMDCbm5vW1tZubm5nZ2crr8g0AAAACnRSTlPp////EmRj6gC6wZtbWgAAANJJREFUWMPt2N0KgzAMBeAkti79s/X9X3a2MKpj4kUK2yTntuHTCyvkALOZHTwkATcbZmDjSB5nGCqEXhasFFiiEidZYiGy4Ail0BYkB0BeDk2eQKXvS2HFV9Ylfj7ANVxLu/GaToXjgb+S3uZxOXsE5gvJI/YXz4ilf8aIfWzZj6mkkkr3lw65l3QelVTS26L/TJVUUulnpXEb0LitbOCmqLv5P0llgFSalLIYyqlJlEKUJSTapNb3JVla51d7uiGxMKSEbN3huD6T2Vhxx2oN8xP3cE/7z8SwYgAAAABJRU5ErkJggg==", "k": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAACHh4fv7+/X19c4ODgAAAD///8AAAAAAAAAAAAwMDCoqKhra2uioqK7u7tOTk6bm5sGJ+pGAAAACnRSTlPq////////CbpkBdN3AAAAAdhJREFUWMPt2OluwyAMAGDOnBTy/k87nK0N2KwxhzRpqn9VJXwJhJhDzPO8LqIvljUqYp4X2x8LSBEysi8MUGK11qmpL5SzdhWLNb1QDGNjX1vZD03Sio/055J35hnuSMeHllcJKSxIMr3ahOtqbXAkhQUJX3+8hnEg0lVYkh7G7Cnrnr+hZXrK7+laJAJNe9szQe95DKU0VypDcqqWANrzoYIgprTfQzzJ5+/7B3JTtUTvX4A4Eq1WgjgSVFNoRFKIITEhlhQIFFSTFDQH4kg5FH6BGBITupc8hlBCYEts6E7K43gD1UnK4e+vVaKvslmCPBXGSDC/7EOkMw3oIRK0z42RFJkaaiTFaR9H0nlNh3MxW/Jmc3hQ+RYJZijyTyEf3ErH96JE3bbvToLJN+4A8prF9jFypqQ1j8JHw57Ns/mllBSYKwz8uRWSAlMiw5EmhYr1k3yfFLgS6XT6lNzVIRmOOCnwV6wBvS6cFPgSaY5vW7GWclz+0VRIJMflg6pCgubknR7fwqNJgk6XqKdkyw6otJlKmluzK3slq2SL17hTzIqg1H/25v9IcgMkd0qb7ob0dkp286ov/GajdJ73bX1xnvnBOd2QWMWQQ8jz7HDgeeaoM9Yvn411yWvp89oAAAAASUVORK5CYII=", "m": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAABHcEwAAAAAAADt7e2GhoasrKyKiopSUlIxMTGhoaHKyspsbGwiIiJZ+N7DAAAACnRSTlPq////12RjALoSCdtXwAAAAgVJREFUWMPtmNuygyAMRY2MRbkp8f//9QBWRaAdCc55ap6cIMu4uSYd59Nr7NpsfE2cd3waWbuNE+88CKRuMQke1Q2MoejbTCBjQzcyaAU5A+a0ZrId1EvmhGf6MZL8kapJVhqIzaA9GxVe2gDVZ5KF3A7UkrfJjyRZIOE+keHLZzKS+7XrhPfd938DSGae8yy3ST0e38XoRymk82340naH5MbA7A/Yt5DE7nIjpxLSUkXq9VueXKbKmI4hg2JTDUlsQhVkqiW9fQWZqkmbUCaXqZqk/PIS+2RoGLttwdhsqRBiCuOvCzLVk3yHjw1VJD8BSjLVk7aNST9A6sOme8gk6sdORN+O/LY+JhXv7sdSEQSSjt0HVhFIUqQ7C5mkoi6HGwkk1Oc8OGUCAsmck9FE6lNiOp/1KVO0/u7HFA3YKROFhIXlL4AWE5ZWMymm4gZKiinfupFKyoQCEgnyI06QSYXbCZVks7Pv6FxJUtl5TCVhvqMTSZDJRCaJVKa5nrQdTiqVCUgkcz3mNg+VZJLrHZV0PUn9bSzKMKpI1yuKv7RQSZdrkx+C26QkA5Iiy4buZkA2fW9JHepmVhZnikbaJDvExPEtU/zl5v9CeqKuogMJHyBhIK22GWTXQGKzEm2mZuZIod63zi22hpqfr9M9YkP3SBEy1A6fq2dyPg3NNdZh4vwP1PlIeW+prQcAAAAASUVORK5CYII=", "l": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACHh4ft7e0wMDCvr6+cnJxWVlbU1NSMjIzjaUo1AAAACnRSTlPq////ZB5jALoM3OjzFgAAANZJREFUWMPt2NEKwyAMBVCT2kZTrfr/PzsnDNZNGBihHeQ+y0FEwVxD5DdnZHGbJzK0OpTHrWR8hYALj6cwVMobi8j7IsvOiNY4BClUKcB61siLPIxGpRtIMcEribNAKnBKHpbyGQIeliLA8XZ3IamkkkoqqaSSSiqpdJHUSYqzpM6XcVj6+sf+lPrpLLlcOm64Jz2nzgQ0fjM/p7Lx13KaFEHygnU2/ycpTZBSk0IWQzk0CUPcZYkBq9T6viBL6/yePd2U2NYdzqgh/cQ+k8hbccdqPdEDIvFLFqyvm5sAAAAASUVORK5CYII=", "o": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAOVBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+8wMDCurq7Y2Nhra2tQUFCdnZ3Gxsa+BM/sAAAACnRSTlPp////ZB5j6gW60vW5rQAAAkdJREFUWMPtmMl2hSAMQLHYVsEw/f/HVtBaEiZ90N3LziNeQwaSwJZl+VrZd4+w9WunsOVz5f2yfu6kHTSJPpl21MJmzrX86BOpOZ/Zyqde0C4TXxnjoh/0ITh7k0aQlLV6OsUIq14kKXFRLpp2z0mQYE4YPCMpcXwHcCkh4YTnWEUSHJjELhKMf2FvkwII8hZxnpVkaoHkQbriJ79DeYfkQdUYcx51g+RaoN0fXukmSRq6qqAVtEgiY8+8c1WdpMgS73lvYiDBrbEJMiRBokWKK7gRS+I/piSvUrw3ZaJEQb+06DklEZVUADh/KBiC8krVSFhn78drU5b4S8SPCUnhCBAomIm/XLw2IVn0W783h8GisL2EJNCnlviRuENHKiYkg5YaGloaqRxvgJIkykyV5KlD24NIZUrCBockk/H72OSUVP7nX5DkuZSEv8XmT+0Y2+IxKXbXmzTA4uOiIIm8VmSKV7MFHxW1bCEZrGkGG3pUFDPYf+vKiadwFa+eKlh9SU46g1xQP+nI6QsIhc/ixulLK4L+Q4XCd78i4NdHcZm0k2eVAlKlZL1yotZIxt0mPKmc3qqQaRST3qxZzUM/c6fDEM0OY1zXE4pac/5QtAEudod2RHd4tBJCtjpWeaeLFvUu2t7uok/P27xaTmdA5WnDHUOFKsxF4sEEJEdNQL+7GDCVHQNnCtMwYnrVL0+v7/uC/yLpASQdSJvrBrktkPgGsk9g4zsp3PdtfRLu/Pw93RCZw93hiGvIofeZyzJ337HOO+UH3FZJ5crCnl0AAAAASUVORK5CYII=", "t1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAANlBMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACmpqaFhYXFxcVXV1e0tLTc3NwgICBra2sb9IgrAAAACnRSTlPw////JswnAG6VJTCB+AAAAOVJREFUSMft19kOhCAMBdAWF2SR5f9/dgB1ohOnIzWZ+MB9McGcRFm0BSllrwaozKD6BEHKSbAyZZxtmCsTioYxXUxXHZPYCIpli1YAInSsBJEmTiAP45Owi/g90ZHYIR1D4fgDoydwuk28pkZ0DX/Ott5i1zH/Hon0bLuTNbX7pSJ3mKGxo/e2XR/xgM0y5i8eDHvEdaeq4YYbbrjhv2OPOK+ff3P4UVyqhubzYuIatjut6+uw7a/l/CMrwFtVr7Aca8WCg6+3PqxYiKgrE7OC3CZwo0qDwswI3LaqtEb3mrIb7eALfwkubyAxZFMAAAAASUVORK5CYII=", "ss": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAADCwsL///8rKysAAAAAAAAAAABHcEwAAAAAAAAAAABsbGzT09O9vb2hoqKCgoIpKSlWVlZAQEDm5uaespTeAAAACnRSTlPq////ZB5jALoM3OjzFgAAAtNJREFUWMPtmN2WqyAMhUU6Y+UnQHj/dz0JagWPIlYvJ71xWf0MIewEumEYf9/dPXv/jsPQDT9vdd/eP0M3Egj1PUNCjd1LKS3MPRNaqVf3ViiMuGdGoKJYK30XRCituj/SIyRwLsjFgnP2O5Ilivd+AfGVD+46yWp6Ue7YjmNVksP0GoDoFwNw6R7CFVJ6x62UxdhT6V07iUHB9HsmMH2jkQT8cH9k7Ba0kSzSAPq+gvJom0g0ttDXLGzGd0Sy5L2okgQ9YRtIrhakyVzp1BGJfLfZWwZCCnGRDDT+BhJ6uZmpKbdjdpey/5wERbw/IOl1yYcW0hqmSAgNLAqyGDMUgdonWSiSCWcUz4POSd5d84ljy3oSHF9c84lIRUSim8MUpM9Vxp/HiT6ORfLElAYlpzELpIzbVJylKVPiltXCM7yT11OGLhPQpAVwuIDnccpmpcN9pybP0jB1I4kfjoerN+pNvGuaSc/iMaoH2ahPk/qiqaF8nk61igCpQlX1CRurFGCdhS05Pmf6NN8gDkMVmvsC7i1ohXjY9Yz+sy0Rd85pnNsCz/XbVJX8SAuI8VmuPqxLfzu8MxJsFj3MHRRplChrgj4hpRYCyOIq16AnXcnk15C7J6RCU+DzZeA2yMeMJC+RTNZM2KIONpBCUcq5RbBr3se8oJ+RXJHaXKXQcZniZtFdijgU1WipLZPkxktZIIrAzj1cmrminGNehA9I/8m45QiFMs1NIQbH9a6imOtM6KbactY/bVqxSm3Js3lPykNbJ8ZOedNXW1aJtkkzQ9UrLi6FjFdIFreTvsmwTe2skGzaRcHOEKcq3LxHEDZVT887IJvVcph6xQCXdmWg5b6hu7pTtLO+1dqdL3evqB18v6O2f+cFz5PCA6SQSLQo7oLAJ5IiQbZWfP8jQVNESud93NzcsHTmx+d0j9grnR0+cQw5PnieOQzj6/YZ62schn8IgVb5e7XiIwAAAABJRU5ErkJggg==", "s": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAA4ODj///8AAAAAAAAAAAAAAAAAAAAAAAAAAACHh4fv7+/V1dUwMDBqamqpqam8vLxPT0+goKCampr4X8DBAAAACnRSTlPp////ZB5j6gW60vW5rQAAAo1JREFUWMPtmMuWgyAMhrU4MwqRi7z/uw6gtoYmiIOLWTSrnh79CDH5Q+jGcfyeup8W66bvQOnGr0m02/QVSAHUyzbrA2rsBiG0erSZ0kIM3ST6VlCwXkxdJ2Q76CFF9yHdQoJl0f1uerHqjyTzojxp9jpJ+Z42c5Fk3fqagZeLRqb/nL1CMvEVCe8LpA3belIEaaA/giNQLMlGh/h6fUexJFcABQsoV0cKeysqTfTKVJGC91BMaQhP1JBseW/pzSxSDEnjxyCluoFsMV1BCvF+RUnJPbflIXQq2x5NUmi9Q+lp7DecklCYYmw9RFHASeTx16NJcCQpt1cNDk1IlOWaTyndQyJqG0OjrpEAR+QZ8lysoCbiuBYUoXhZyvFZkKe4MrKonQzJ07oIu2uEbDGkLFDEPquVztFOrcvInhAvjmSLYpCUTlYqXVjXFQQqarOvI8UacVBG2bqOAFxjOzhd2aVSB+FZsRxtZefcisQDuz9dfS6wWyJ6yjNcz4WIm2WRh2JzBspKzmiBdMcC239k+8SyQpIgF4+nEqD2jlWMJMk1NushZZNr8Ik2W644SZLLpNHvoXMoyBUk1DXgWIGoD14lxb1qsq7hPE4GpXaqwCW2KY8VwKAi5r6dfuS9Zft46lIW5CcVcFQ7z8SeJslcfGw6K+I0BywGbL87H9RkTeeMT52dn/LV+N7S25MhM9MuTgv8yfFQvR1ZWVXRRa+IYzRLWs86TNhtf+E8vi5LSq8hx42S+pptcDKHojWbVL3PIUUdB8lMZcQodTYpbvpWMypenV7lAp8p/1+R9A0knUgzNINgTiQxW9VmdhaBlO775jZLd37xnu4WG9Ld4R3XkLfeZ47j0HzHOgTKL+nmSFTG/Y/hAAAAAElFTkSuQmCC", "continue": "data:image/png;base64,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", "t": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAM1BMVEUAAAA4ODgAAAD///8AAAAAAAAAAABHcEwAAAAAAACIiIjv7+8wMDCxsbGbm5tra2vW1tZDsKltAAAACnRSTlPq////ZB5jALoM3OjzFgAAANRJREFUWMPt2N0KwyAMBWCT2sbfxvd/2jnvWhDt4mCMnNvCRysGmmOI/OGMLO7wRIZ2h/K4nYyvEARZoFLeWESOmyyREa1xCFKoBrCeNQY5tAU0Kv2AFE+GcTgPpQiTySPpnJV4JNVPKzO3GkAllcbS/WZ2n/DTaelK+ekEd6SJCe6fxnl9D5VUUkkllVRSSSWVvind97PysZSvUBDsnJl7v5a6m/+VxAskblIqYqikJmHKUZacsEqt70uytM7v3dMtiW3d4Yoa0i/sM4m8FXes1hO9AElZR2LgSFWTAAAAAElFTkSuQmCC", "l1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAOVBMVEUAAAA4ODioqKg5OTkAAAAAAAD///9HcEwAAAAAAACioqJXV1eZmZmvr69wcHDAwMAgICDW1tY9PT0VAWLEAAAACnRSTlPx////1v//AIImeqL+KQAAANVJREFUSMft19sOgyAMgOFWqYBznN7/YVc0JpsLca3ejf/Gq08NmEjBWuudAWHGeYZgrSNVruJq00NYWjV4viyTuIWZB6eyq3ZgKE2qEvEyU9HhQrzqNOrweDd+BtwKUYx3WluEOON7WYZnxGHfSMRnxx133HHH/4M/O/y8ZPjwJlIcfsZfse74iCOWMDQ6XW2+fRmx1ck+T0NT8judn8Pi3Cjffoi7dPZUn3orpqixkTacstzmVLGpw0bzw2gVqjKgnG3W+WYdUJR5sOpHu6tD2YVx8AUkmEtXhcVleAAAAABJRU5ErkJggg==", "x": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAMAAAALZVrlAAAAPFBMVEUAAAD///84ODgAAAAAAAAAAAAAAABHcEwAAAAAAACHh4fw8PCKiopXV1cwMDChoaHJycl8fHzf39+5ubl8D8AGAAAACnRSTlPq////12RjALoSCdtXwAAAAilJREFUWMPtmNGWxBAMhltOVztoqfd/18XZ2alIxKyeszeTq+ng5yOETEptX+s0ZuvXptSktlWO27qpKQkJb0bMiyQ1LVJ6PY+Z9lIu0yrFqFCUEjLOtfTzuD1knHhpblN6fJTeVwpWvMyGS8lpyCJMyYvSXh5yghIRmkpOkPVhH8I2lQ4hjrn4FOcP9etnNlt+VkqxfuGn/smX2K596KikW0o6NnDXWX7y+euURTMcXeKxuuaDbAH0iHmBLSnSt0fZDs6fHMbHseE+bhA+wAZ7o3YLwsexEUpwdk/ohTUbtYMRPoaNUoKj15ZjI0+Vim8GHtd/Pnm09i9b6FeCnliymXfOTMjHsLVOX+jVcEf3K+F82uIdNCNC4tMYm347tiB8JFtbCVluko2JdxXfQS0op+Rgw4P216ZSvb8or+yYcbhO6CnAKjlsUmg+Wgk/O/B/2d2C+SDJRyo5asHNmzuYpqBKKCVD7i+Kj1CCbJrnI5QggXd/jAiQLZSf/VEK1qwG0R05kYZg2jqjec2WL5W6dXvquvXkAfB8HTex3MixfLWSwUFgUOZvh9S6setXKZENAsMHlWA8uwwRBq0k3VDytE9WQbmsC5XAxb84bCHfUYRDZEzA3NwoPGml6illQCwnC6u1O33jNdh6Kn7e5v+jdEdexWSlO3I9PivtbljI7VlJ7kGPWdhlVMr5vn3Mcs4v5elusWW6JQmZc4f35TOV2pbhHOuyKfUN7gM5+TU4tOIAAAAASUVORK5CYII=", "s1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAASFBMVEUAAAAAAAA4ODgAAAAODg4AAAAAAABHcEwAAAAAAAD///+oqKhZWVna2trGxsbw8PC1tbVNTU2NjY2fn59vb2+AgIA+Pj4nJyeYovYLAAAACnRSTlPxJ///8CbMAG6VwlDvkgAAAidJREFUSMell9uWgyAMRS3asQrhJtj//9MJaEUKotK8uJayBZKTEJq+75/DX3PT/oYngk3fv9oqeznYsW92096ebh740ONt04g9mqGK9fTQdG03VhmCTdPOdfDcotdbUgeTAgyTIYsxLeEODHYmkRl5GZ5IaoxfggXzc9HPaKDLz+gFWCgcqEX8UqqEzsLOTzzZibDfr3OwxEE5545IqzMY1yezsXOukGWYo1/DeEqpyH/Kwjr8HhaVBN+paEMZmG0DvNc9/flGCZlKsAheQc/N1msUwrp1CYawLxxKZg1TiC9+NCczs1ikKHJGF5uuLxvnNonCyw5DL+2UCZRFrC6Hyn5rRFC9glOc1mci2SRr/e75WCdP4b1XnRjAvuijlFRwkBjsDIY5rRqbXvlZGQIvaioSmkZTHxRAXzUwNjQztThZtpz0Rxomnl/vI5GB5bck1Y6Xe3GnsI4q/fqkYy4nExjc2IlSWJcIVu3FUYZ36/ro1KWWvjqz2bnW4Aq4CuuWRXicQzB42LzIFbEUNjsRyaQCROUzhRGwu1RWrgaJfLpm4pw9qEJZlkWYHuTUUhDVSVaxIxp/e3ZWjXwmuVrik0Wfns+eVnFGcF+F7IW2Yj3gMKVWU+RyW+ECxtKGxsLlPmzNiC2/KNxq4lwbtxoUOsCfes93Hfz2cMtrWN4ucAf3Wegc3LnLxhbSq2Yc1blrQq0N/oJSaY+m9lrlr0a/Xcp+uA7+A/4AcjapYKVhAAAAAElFTkSuQmCC"}