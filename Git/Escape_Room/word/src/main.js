var game;
var gameLoaded = false;
var createOnLoaded = false;

window.onload = function () {
    var gameConfig = {
        type: Phaser.AUTO,
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
        this.textures.addBase64('tm', assets.tm);
        this.textures.addBase64('words_3', assets.words_3);
        this.textures.addBase64('words_4', assets.words_4);
        this.textures.addBase64('words_5', assets.words_5);
        this.textures.addBase64('b1', assets.b1);
        this.textures.addBase64('a1', assets.a1);
        this.textures.addBase64('c1', assets.c1);
        this.textures.addBase64('d1', assets.d1);
        this.textures.addBase64('e1', assets.e1);
        this.textures.addBase64('g1', assets.g1);
        this.textures.addBase64('b2', assets.b2);
        this.textures.addBase64('a2', assets.a2);
        this.textures.addBase64('c2', assets.c2);
        this.textures.addBase64('d2', assets.d2);
        this.textures.addBase64('e2', assets.e2);
        this.textures.addBase64('g2', assets.g2);
        this.textures.addBase64('wrong', assets.wrong);
        this.textures.addBase64('right', assets.right);
        this.textures.addBase64('del', assets.del);
        this.textures.addBase64('cursor', assets.cursor);
        this.textures.addBase64('close', assets.close);


        var imageCount = 21;
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


        // this.words = this.add.image(256, 400, 'words_5')
        // // this.del = this.add.image(356, 300, 'del')
        // this.cursor1 = this.add.image(167,318,'cursor')
        // this.cursor2 = this.add.image(212,318,'cursor')
        // this.cursor3 = this.add.image(257,318,'cursor')
        // this.cursor3 = this.add.image(302,318,'cursor')
        // this.cursor3 = this.add.image(347,318,'cursor')
        // this.b1 = this.add.image(196, 440, 'b1')
        // this.a1 = this.add.image(315, 440, 'a1')
        // this.c1 = this.add.image(196, 520, 'c1')
        // this.d1 = this.add.image(315, 520, 'd1')
        // this.e1 = this.add.image(256, 480, 'e1')
        
        // this.a2 = this.add.image(167, 303, 'a2')
        // this.b2 = this.add.image(212, 303, 'b2')
        // this.c2 = this.add.image(257, 303, 'c2')
        // this.d2 = this.add.image(302, 303, 'd2')
        // this.e2 = this.add.image(347, 303, 'e2')





        this.letter_name = ["a", "b", "c","d","e"]
        this.showWOrds(5, this.letter_name, "abcde")
        this.resize();
        window.addEventListener("resize", this.resize, false);
    }

    //第一个参数，使用磁盘显示字母的个数
    //第二个参数，传入的字母的名称，格式为数组
    //第三个参数，传入的单词的拼写
    showWOrds(n, letter_name, word_name) {
        switch (n) {
            case 3:
                this.tm = this.add.image(0, 0, 'tm').setOrigin(0, 0).setInteractive()
                this.tm.alpha = 0.001
                this.words = this.add.image(256, 400, 'words_3').setInteractive()
                break;
            case 4:
                this.tm = this.add.image(0, 0, 'tm').setOrigin(0, 0).setInteractive()
                this.tm.alpha = 0.001
                this.words = this.add.image(256, 400, 'words_4').setInteractive()
                break;
            case 5:
                this.tm = this.add.image(0, 0, 'tm').setOrigin(0, 0).setInteractive()
                this.tm.alpha = 0.001
                this.words = this.add.image(256, 400, 'words_5').setInteractive()
                break;
            case 6:
                this.tm = this.add.image(0, 0, 'tm').setOrigin(0, 0).setInteractive()
                this.tm.alpha = 0.001
                this.words = this.add.image(256, 400, 'words_3').setInteractive()
                break;
            default:
                return "单词长度输入错误"
        }


        switch (letter_name.length) {
            case 3:
                this.letter1 = this.add.image(186, 430, letter_name[0] + '1').setInteractive()
                this.letter2 = this.add.image(256, 430, letter_name[1] + '1').setInteractive()
                this.letter3 = this.add.image(326, 430, letter_name[2] + '1').setInteractive()
                break;
            case 4:
                this.letter1 = this.add.image(215, 420, letter_name[0] + '1').setInteractive()
                this.letter2 = this.add.image(300, 420, letter_name[1] + '1').setInteractive()
                this.letter3 = this.add.image(215, 500, letter_name[2] + '1').setInteractive()
                this.letter4 = this.add.image(300, 500, letter_name[3] + '1').setInteractive()
                break;
            case 5:
                this.letter1 = this.add.image(196, 420, letter_name[0] + '1').setInteractive()
                this.letter2 = this.add.image(315, 420, letter_name[1] + '1').setInteractive()
                this.letter3 = this.add.image(196, 500, letter_name[2] + '1').setInteractive()
                this.letter4 = this.add.image(315, 500, letter_name[3] + '1').setInteractive()
                this.letter5 = this.add.image(256, 460, letter_name[4] + '1').setInteractive()
                break;
            case 6:
                this.letter1 = this.add.image(185, 440, letter_name[0] + '1').setInteractive()
                this.letter2 = this.add.image(255, 440, letter_name[1] + '1').setInteractive()
                this.letter3 = this.add.image(325, 440, letter_name[2] + '1').setInteractive()
                this.letter4 = this.add.image(185, 520, letter_name[3] + '1').setInteractive()
                this.letter5 = this.add.image(255, 520, letter_name[4] + '1').setInteractive()
                this.letter6 = this.add.image(325, 520, letter_name[5] + '1').setInteractive()
                break;
            default:
                break;
        }

        //给字母注册点击事件,判断是否输入正确
        this.str = ''
        this.arr = []
        switch (n) {
            case 3:
                setTimeout(() => {
                   cursor(212) 
                }, 50);
                this.letter1.on('pointerdown', () => {
                    this.str += letter_name[0]
                    this.arr.push(letter_name[0])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.tm.visible = 0
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.words.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        //调用下载函数
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.cursor.x = 212
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }

                }, this)
                this.letter2.on('pointerdown', () => {
                    this.str += letter_name[1]
                    this.arr.push(letter_name[1])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        //调用下载函数
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.cursor.x = 212
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }
                }, this)
                this.letter3.on('pointerdown', () => {
                    this.str += letter_name[2]
                    this.arr.push(letter_name[2])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        //调用下载函数
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.cursor.x = 212
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }
                }, this)
                break;

            case 4:
                setTimeout(() => {
                   cursor(190) 
                }, 50);
                this.letter1.on('pointerdown', () => {
                    this.str += letter_name[0]
                    this.arr.push(letter_name[0])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);

                        // 调用正确符号
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        //调用错误符号函数
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.cursor.x = 190
                        }, 50);
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }
                }, this)
                this.letter2.on('pointerdown', () => {
                    this.str += letter_name[1]
                    this.arr.push(letter_name[1])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        // 调用正确符号
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.cursor.x = 190
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }
                }, this)
                this.letter3.on('pointerdown', () => {
                    this.str += letter_name[2]
                    this.arr.push(letter_name[2])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        // 调用正确符号
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.cursor.x = 190
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }
                }, this)
                this.letter4.on('pointerdown', () => {
                    this.str += letter_name[3]
                    this.arr.push(letter_name[3])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        // 调用正确符号
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.cursor.x = 190
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                        this.str = ''
                        this.arr = []
                    }
                }, this)
                break;

            case 5:
                setTimeout(() => {
                   cursor(167) 
                }, 50);
                this.letter1.on('pointerdown', () => {
                    this.str += letter_name[0]
                    this.arr.push(letter_name[0])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.cursor.x = 167
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                this.letter2.on('pointerdown', () => {
                    this.str += letter_name[1]
                    this.arr.push(letter_name[1])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.cursor.x = 167
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')

                    }
                }, this)
                this.letter3.on('pointerdown', () => {
                    this.str += letter_name[2]
                    this.arr.push(letter_name[2])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.cursor.x = 167
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')

                    }
                }, this)
                this.letter4.on('pointerdown', () => {
                    this.str += letter_name[3]
                    this.arr.push(letter_name[3])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.cursor.x = 167
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                this.letter5.on('pointerdown', () => {
                    this.str += letter_name[4]
                    this.arr.push(letter_name[4])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.cursor.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.cursor.x = 167
                        }, 50);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                break;
            case 6:
                this.letter1.on('pointerdown', () => {
                    this.str += letter_name[0]
                    this.arr.push(letter_name[0])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter6.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                        }, 500);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                this.letter2.on('pointerdown', () => {
                    this.str += letter_name[1]
                    this.arr.push(letter_name[1])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter6.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                        }, 500);
                        //调用错误符号函数
                        symbol('wrong')

                    }
                }, this)
                this.letter3.on('pointerdown', () => {
                    this.str += letter_name[2]
                    this.arr.push(letter_name[2])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter6.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                        }, 500);
                        //调用错误符号函数
                        symbol('wrong')

                    }
                }, this)
                this.letter4.on('pointerdown', () => {
                    this.str += letter_name[3]
                    this.arr.push(letter_name[3])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter6.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                        }, 500);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                this.letter5.on('pointerdown', () => {
                    this.str += letter_name[4]
                    this.arr.push(letter_name[4])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter6.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                        }, 500);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                this.letter6.on('pointerdown', () => {
                    this.str += letter_name[5]
                    this.arr.push(letter_name[5])
                    var j = judge()
                    showWord()
                    if (j == true) {
                        setTimeout(() => {
                            this.letter1.visible = 0
                            this.letter2.visible = 0
                            this.letter3.visible = 0
                            this.letter4.visible = 0
                            this.letter5.visible = 0
                            this.letter6.visible = 0
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                            this.words.visible = 0
                            this.tm.visible = 0
                            this.str = ''
                            this.arr = []
                        }, 500);
                        //调用正确符号函数
                        symbol('right')
                        setTimeout(() => {
                            this.showDownload()
                        }, 1000);
                    }
                    if (j == false) {
                        this.str = ''
                        this.arr = []
                        setTimeout(() => {
                            this.letter1_2.visible = 0
                            this.letter2_2.visible = 0
                            this.letter3_2.visible = 0
                            this.letter4_2.visible = 0
                            this.letter5_2.visible = 0
                            this.letter6_2.visible = 0
                        }, 500);
                        //调用错误符号函数
                        symbol('wrong')
                    }
                }, this)
                break;
            default:
                break;
        }

        //关闭按钮
        (()=>{
            this.close = this.add.image(390, 218, 'close').setInteractive()
            this.close.setDepth(3)
            this.close.on('pointerdown',()=>{
                this.close.visible = 0
                this.tm.visible = 0
                this.cursor.visible = 0
                this.words.visible = 0
                this.letter1.visible = 0
                this.letter2.visible = 0
                this.letter3.visible = 0
                clearInterval(this.cursor_interval)
                if (this.letter1_2) {
                    this.letter1_2.visible = 0
                }
                if (this.letter2_2) {
                    this.letter2_2.visible = 0
                }
                if (this.letter3_2) {
                    this.letter3_2.visible = 0
                }
                if (this.letter4_2) {
                    this.letter4_2.visible = 0
                }
                if (this.letter5_2) {
                    this.letter5_2.visible = 0
                }
                if (this.letter6_2) {
                    this.letter6_2.visible = 0
                }
                if (this.letter4) {
                    this.letter4.visible = 0
                }
                if (this.letter5) {
                    this.letter5.visible = 0
                }
                if (this.letter6) {
                    this.letter6.visible = 0
                }
            },this)
        })()
        
        //判断的函数
        var judge = () => {
            if (this.str.length == n) {
                if (this.str == word_name) {
                    return true
                } else {
                    return false
                }
            }
        }
        // 光标函数
        var cursor = (X) => {
            this.cursor = this.add.image(X,318,'cursor')
            this.cursor_interval = setInterval(() => {
                    this.cursor.scaleY = 1
                setTimeout(() => {
                    this.cursor.scaleY = 0
                }, 300);
                setTimeout(() => {
                    this.cursor.scaleY = 1
                }, 600);
            }, 600);
        }
        // 符号函数
        var symbol = (symbol) => {
            var right = this.add.image(390, 300, symbol);
            right.setDepth(2)
            right.scaleX = 0.5
            right.scaleY = 0.5
            this.tweens.add({
                targets: [right],
                rotation: 0.15,
                duration: 200,
                callbackScope: this,
                onComplete: function (tween) {
                    this.tweens.add({
                        targets: [right],
                        rotation: -0.15,
                        duration: 200,
                        callbackScope: this,
                        onComplete: function (tween) {
                            right.destroy()
                        }
                    });
                }
            });
        }
        // 显示框单词
        var showWord = () => {
            if (n == 3) {
                if (this.str.length == 1) {
                    this.letter1_2 = this.add.image(212, 303, this.arr[0] + "2")
                    this.cursor.x = 258
                }
                if (this.str.length == 2) {
                    this.letter2_2 = this.add.image(258, 303, this.arr[1] + "2")
                    this.cursor.x = 302
                }
                if (this.str.length == 3) {
                    this.letter3_2 = this.add.image(302, 303, this.arr[2] + "2")
                    this.cursor.x = 800
                }
            }
            if (n == 4) {
                if (this.str.length == 1) {
                    this.letter1_2 = this.add.image(190, 303, this.arr[0] + "2")
                    this.cursor.x = 235
                }
                if (this.str.length == 2) {
                    this.letter2_2 = this.add.image(235, 303, this.arr[1] + "2")
                    this.cursor.x = 280
                }
                if (this.str.length == 3) {
                    this.letter3_2 = this.add.image(280, 303, this.arr[2] + "2")
                    this.cursor.x = 325
                }
                if (this.str.length == 4) {
                    this.letter4_2 = this.add.image(325, 303, this.arr[3] + "2")
                    this.cursor.x = 800
                }
            }
            if (n == 5) {
                if (this.str.length == 1) {
                    this.letter1_2 = this.add.image(167, 303, this.arr[0] + "2")
                    this.cursor.x = 212
                }
                if (this.str.length == 2) {
                    this.letter2_2 = this.add.image(212, 303, this.arr[1] + "2")
                    this.cursor.x = 257
                }
                if (this.str.length == 3) {
                    this.letter3_2 = this.add.image(257, 303, this.arr[2] + "2")
                    this.cursor.x = 302
                }
                if (this.str.length == 4) {
                    this.letter4_2 = this.add.image(302, 303, this.arr[3] + "2")
                    this.cursor.x = 347
                }
                if (this.str.length == 5) {
                    this.letter5_2 = this.add.image(347, 303, this.arr[4] + "2")
                    this.cursor.x = 800
                }
            }
            if (n == 6) {
                if (this.str.length == 1) {
                    this.letter1_2 = this.add.image(176, 375, this.arr[0] + "2")
                }
                if (this.str.length == 2) {
                    this.letter2_2 = this.add.image(216, 375, this.arr[1] + "2")
                }
                if (this.str.length == 3) {
                    this.letter3_2 = this.add.image(256, 375, this.arr[2] + "2")
                }
                if (this.str.length == 4) {
                    this.letter4_2 = this.add.image(296, 375, this.arr[3] + "2")
                }
                if (this.str.length == 5) {
                    this.letter5_2 = this.add.image(336, 375, this.arr[4] + "2")
                }
                if (this.str.length == 6) {
                    this.letter6_2 = this.add.image(336, 375, this.arr[5] + "2")
                }
            }
        }
        //点击空白词盘消失
        this.tm.on('pointerdown', () => {
            this.tm.visible = 0
            this.close.visible = 0
            this.cursor.visible = 0
            this.words.visible = 0
            this.letter1.visible = 0
            this.letter2.visible = 0
            this.letter3.visible = 0
            clearInterval(this.cursor_interval)
            if (this.letter1_2) {
                this.letter1_2.visible = 0
            }
            if (this.letter2_2) {
                this.letter2_2.visible = 0
            }
            if (this.letter3_2) {
                this.letter3_2.visible = 0
            }
            if (this.letter4_2) {
                this.letter4_2.visible = 0
            }
            if (this.letter5_2) {
                this.letter5_2.visible = 0
            }
            if (this.letter6_2) {
                this.letter6_2.visible = 0
            }
            if (this.letter4) {
                this.letter4.visible = 0
            }
            if (this.letter5) {
                this.letter5.visible = 0
            }
            if (this.letter6) {
                this.letter6.visible = 0
            }
        }, this)
        
    }

    //弹出下载按钮
    showDownload() {
        var rect = new Phaser.Geom.Rectangle(0, 0, game.config.width, game.config.height);
        var graphics = this.add.graphics({
            fillStyle: {
                color: 0x000000
            }
        });
        graphics.alpha = 0.85;
        graphics.setDepth(8);
        graphics.fillRectShape(rect);
        var winPanel = this.add.sprite(game.config.width / 2, game.config.height / 2 + 500, "win_bg");
        winPanel.setDepth(10);

        // show panel
        this.tweens.add({
            targets: [winPanel],
            y: game.config.height / 2 - 120,
            duration: 1000,
            ease: 'Back',
            callbackScope: this,
            onComplete: function (tween) {
                //原地弹出
                var downloadBtn = this.add.sprite(game.config.width / 2 + 50, game.config.height / 2 + 40, 'btn_download').setInteractive();
                downloadBtn.setDepth(11);

                this.tweens.add({
                    targets: [downloadBtn],
                    y: game.config.height / 2 + 40,
                    duration: 300
                })

                downloadBtn.on('pointerdown', function (pointer) {
                    landingPage();
                }, this);
                downloadBtn.on('touchstart', function (pointer) {
                    landingPage();
                }, this);

                //原地弹出
                var retryBtn = this.add.sprite(game.config.width / 2 - 87, game.config.height / 2 + 40, 'btn_retry').setInteractive();
                retryBtn.setDepth(11);
                retryBtn.on('pointerdown', function (pointer) {
                    this.scene.start("PlayGame")
                }, this);
                retryBtn.on('touchstart', function (pointer) {
                    this.scene.start("PlayGame")
                }, this);



                downloadBtn.scaleX = 0.8;
                downloadBtn.scaleY = 0.8;
                retryBtn.scaleX = 0.8;
                retryBtn.scaleY = 0.8;
                this.tweens.add({
                    targets: [downloadBtn, retryBtn],
                    scaleX: 1,
                    scaleY: 1,
                    duration: 250,
                    ease: 'Back'
                });
            }
        });
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
        } else {
            canvas.style.width = (windowHeight * gameRatio) + "px";
            canvas.style.height = windowHeight + "px";
        }
    }
}

var assets = {"words_5": "data:image/png;base64,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", "f1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHUGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjRUMTU6MTY6NDIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDAwOjM4OjU3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDAwOjM4OjU3KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExZjk5ZTJiLTk0YWItNDhiNy1iYWJiLWU5MzkxMGZlYmJlNCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjgzZmU3YjQ5LWE3Y2UtMjA0ZS04Y2IyLTk0NDAxMDIyNzJiNiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQyNDI1YmQ4LWM1ZmItNGY2ZC1hYzgyLTc0NzVkYjY4NWFhZCI+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iRiIgcGhvdG9zaG9wOkxheWVyVGV4dD0iRiIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDI0MjViZDgtYzVmYi00ZjZkLWFjODItNzQ3NWRiNjg1YWFkIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI0VDE1OjE2OjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmQ1MzJkZTItYTI0Zi00Y2Y0LWEwZDgtNTU1OThkYWU4OTM4IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI3VDIxOjAzOjAzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTFmOTllMmItOTRhYi00OGI3LWJhYmItZTkzOTEwZmViYmU0IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDAwOjM4OjU3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4iVX5hAAACBElEQVRo3u3bvU7CUBQHcMChbAwMLA48gImLUYmkqWwuMMDiwOLGzDPwAA6dHByIgyYkxDS68BFdSHRqiIMhOGDASYgxsWpCjj0kJobcolRKe+Cc5L91uL/be9vTUnwA4FvU+BhHHfejcmZKZqrEgmPeR4AIJ5k5DoVCEIvFIJFIkEo8HodgMIiQExEuFw6HodlsAtXSNA0kSXoT4Uqop16yLD+LcHU8vdQrmUwJcVXGMc69SqczjGPcUuEMw4BKpTJVsGMaTz6fh1ar5Q1csVgUDvI/URRlNFmu4qxmfxbp9/uLictms+4vSydwuOe63a439hzOstVAcT/+9eIy7R6bC65cLlvidF2nfSuYtDQbjQZtHAIWFodLzwqHZ5VxvCwJ4LDz+L78j7duhULB1j2OTG9pp68k1X55okPBZeSFptkRnBOPO3avsDPH4QxP6i2nCU6UnYdU166Wqqr+2jDzfY5xjGMc4xjHOMYxjnFL//aL/EtZLHy/L3rnP89y9MdHpx5lPIFzuxjHOA+W5RdE+J3lcDgkC3v/+ISNbUWIq62tb8HVbQ/anQE8Pr1Ap0cjOFYcM47dCldF3HmtDWcXdyRzed2xxKnRaHSEw4O0+gOp4JhPNR0ikdWBCLfp9/tfU5kDODzSSGZH3oNAYEV45rB2zdzjARRjjv0GDcB/miCeL4zYdY6fZbz7AAAAAElFTkSuQmCC", "f2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAR0lEQVQ4jWNgoCX4//+/y3/ygBLMDCZqOwqfgekMDAyMROJ7A+LCUQMHoYEzGRgY/hOBlZA1DcqEfQ9Z09COlFEDh4uBVAcA+xRGonJbACcAAAAASUVORK5CYII=", "right": "data:image/png;base64,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", "w1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjEzOjU3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjEzOjU3KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkOThhNzQwMi0wYjRkLTQwNWMtOTNlOC01ZDE5Mzc4NmYwZTAiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OTljMjU2OC03MWI5LTM1NGUtODA4YS0wMmI3ZWUzNGQ1MjciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxOGE3NmE2My05MDYyLTQ2ZWUtYjcxMC1iNmFiNjUzZDNlMDMiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlciIHBob3Rvc2hvcDpMYXllclRleHQ9IlciLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE4YTc2YTYzLTkwNjItNDZlZS1iNzEwLWI2YWI2NTNkM2UwMyIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDk4YTc0MDItMGI0ZC00MDVjLTkzZTgtNWQxOTM3ODZmMGUwIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjEzOjU3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7WWRnJAAADeElEQVRo3u1bv2tTURRO6pBsGTJ0ccgfILiINhhCzObSDu3ikMWtc/6G/AEOmRwcgoNCIchDl6RFl4BOIThIaIdI6tQUEYwK4ZpPeOX1cd+559z7wNzyLpylP26+757v/LjntjmlVO6mWi4j5zu5yDpc29Hahp4ZMD8BAR25wtpelEolVa1WVbPZ9MpqtZoqFosg8lJH7rBcLqvJZKJ8XUEQqEKh8FNH7gjsfV/1ev1CR+4E7vV97e7uackNM3IZuf+39vcPMnI3k1yv18MXrqzT6ajFYrExBKbTqWq1WtcwjkYjM7nBYHDtl0LDZpuwlsulajQaWozz+Zwm1+/3tb8YPR2bk+52u1f74DNslTAej0l8Vp6DtdttMRicZppKoPCBOEmOcjsMXkgLjI0SogoQy9IECMkmLTBIVNJFHTwrWyIekjbA5vCua/CHJom9JIlHQ4ZV56gTh2ddg1+6l0lRSFJschQwbmKhMq9NkqIOHHhFHUq8UMaD17QA3ESOu5cp3sJQYZPjyMAmPqR7mZQEj4p7S5fEQh2Mbi8XiUdLiqhxRrq2qVNcScZjxkWSYnIgIK1TlMdt6icaB44kxeRMtUpXpySS5Mg8fkuh1CO+z1Gb6+oUlWWpg0qSOVeSVuQoWcQbYCpLAiQl87jEJFnS6SZOeSPaTFNZLYwriSc4hduZHLeZ5twouDIHUWn5sCLHqXmUhKLypWQezcA2TYT1gIiqXSAmabYpmYcZmPq8pNuENTnqJKlirwND7YXvUYmJugdak7MpzklgqL3gVdtZjtPcUtpWUWBM3rbpaZ3ISbsPCgxV82zHHE7kpNKkwHDGENIBlfM4XSJNExiq5tlcjZzJccYH3NkkVfNsLrXO5Li3bO7wh6p50nFEKq88nFjhjgA5SYo740yFHNWNSIe3nCTFnU6nQs502tKHDqrmSd4VUiFHnbbNmJyqeZI3hdReVnVZE7HInUNyEov0ZSnVZ2PcBiDR0LhJhJJ71LI38YxcRm6zV+JfEOHvLFerlbfEfv3+o+7tNLTkju/cfaDefzpXp7NL9fXbdzU798OAFZiBPYncEOTeHJ+q128/e2nvPswSyXUrlco/cvih4OTMKwPmV8FYbW/fvtSRu5/P53/sHTxVz54HXtrD+mO1tXVL6zmsR2v7gh/w0dbYP4KDyv5pwnP7C1cvDma4sz6uAAAAAElFTkSuQmCC", "words_3": "data:image/png;base64,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", "words_4": "data:image/png;base64,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", "h2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAQ0lEQVQ4jWNgoBX4//9/2n8EcCFSz26YBpgYE7UdNmrgSDCQBYf4bqSkRRKgm5ddGYkADAwMewbMhaMGjhpITwOpDgAOXR9SDFYIBgAAAABJRU5ErkJggg==", "h1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjAyOjIyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjAyOjIyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5YzJkMWQyYi0xNTgyLTQzNmYtODhkZC04MTRjZDBhZGJlZDgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiNjE3YThlNi01MGU2LTAwNDEtYjFkMS05MzQ3MzljOWNhMmMiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1ZDBkZmQ1MS05ZjRmLTQ2MTYtYWVlMi0wM2RhOWM0YTRiYjEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkgiIHBob3Rvc2hvcDpMYXllclRleHQ9IkgiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjVkMGRmZDUxLTlmNGYtNDYxNi1hZWUyLTAzZGE5YzRhNGJiMSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWMyZDFkMmItMTU4Mi00MzZmLTg4ZGQtODE0Y2QwYWRiZWQ4IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjAyOjIyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4DaJIbAAAB60lEQVRo3u3bv0sCYRgHcLXh3BwcXBr8A4KWqCQ5LrcWHXRpcGlz9m/wD2i4qaFBGgoEiaMWf1CLUNMhDSE2GNqUEkFWIE/3derivdBLPF97HvgOwvne87k79F7f00dEvmWNj3Gy475VzkrJSlWyoOd9AEQ4xcpxKBSiWCxGiURCqsTjcQoGg4CciHC5cDhMzWaTZC3DMEhRlDcRrgS97KWq6rMIV8fplb2SyZQQV2Uc47yrdDrDuP+Nq1QqeKMtpmm6aqrRaFA2m7WNpeu6NzgRDNE0beqGWq2WcCw3B2smuHw+79hQv9+fqqFyuew4Fg7i3HE/L6G/4IrFIuMYxzjGMY5xjGMc4xg3l2BfmDksJQ7BLGRpcZPOExm3aDhMaBcCh0bwKTdpfpvVFwqF8e8r/FXAOMYxjnGMYxzjGLe8OKf7QTdLWE7LYZ4tYWGnszjSKJxp0ZWAm2ZPFh9R3W7XdneP125rOBzaxnK7Qstr4oxj3HzL8QkiPGc5Go2khb1/fNLGtibE1dbWt+jqtkftzoAen16o05Mj6BU9o3cnXBW481qbzi7upMzldccRp0ej0TEOGxn1B6mCnk8NkyKR1YEIt+n3+19TmQM6PDKkzI66R4HAivDMoXat3GMDGWP1fgMD8Z8mJM8Xy3V9wcyvDOoAAAAASUVORK5CYII=", "j1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjAyOjUxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjAyOjUxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjYTJjZThkOC1lZjZkLTRkYjctYWYxMC1hMGYyM2M0ODhjOWUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYTA5NWQxZi0xMDcxLWJiNGUtODEyZi0xODBiOTA1ODQyOTIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowYzdiZDRjZS1hNDIxLTRmNDAtOWU4Yy1kOTE1ODk5ZjgzYTUiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkoiIHBob3Rvc2hvcDpMYXllclRleHQ9IkoiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjBjN2JkNGNlLWE0MjEtNGY0MC05ZThjLWQ5MTU4OTlmODNhNSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2EyY2U4ZDgtZWY2ZC00ZGI3LWFmMTAtYTBmMjNjNDg4YzllIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjAyOjUxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4zUywhAAACR0lEQVRo3u2bv0tCURTH1Ybn5uDQ0uAfELREJYmYW0sNujS4tDX7N/gHNDg1NEhDQSDxqMUf1CLUJNIQYoNhTRkRZAVyet9AELvv+qzne149B76TV9/53B/nnnvu00NEnmmVh+FUh+uzPUOnhoqKCT7vAEAEpxk6DAQCFA6HKR6PK6VIJEJ+vx8gRyK4vWAwSLVajVQ1XddJ07R3Edwp6FW3aDT6LIIrY3hVt62tbSFckeEYzj1LJJIMN9tw1WqVYrEYvjw24ffxHEfh6vX6WKEG1W63nYMrFAqOwlUqlemFszo1bVtz6XTaETA8x5VoiemCURxFqVTKFGSwrdXpODFbQSaTMYVTfp9jOFXhstns9MLlcjmGYziGYzh7LJ/PTy+cLOlmOIbjNcfRkuFmAm7ijzw4/vfXLBEBO53Ov2svrsOhEiVyDLURK4CyGorrcLJ9Cp/JDPCy6vJEww2rDsv2OJzQXYdD78vuCLCmRNNzWKcMG3VHA8qwQmqv5og1KouQvSlpNSA5shXICj2jyo5RsxUOPS2LfFZlx1obyybearX+BYbpaqfZnqH89a5u1HsA19IvhH9Zzji4vuwIHq7klmY3P1ZvR5VOnBmO4X6b6RtEeM+y2+0qC/bx+UXLazEhXGlxaZUubx6p0Xyhh6dXaj6qIfgKn+G7GVwRcGelBp2c3yqpi6umKVw2FAr9wKGRXr5XSvD5WK/S/PzCiwhuxev1vm0nd2n/QFdS69FN8vnmhCMH2zB0hwYqyvD9GgzEf5pQXN+s8r8DYK00UQAAAABJRU5ErkJggg==", "j2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAd0lEQVQ4jWNgoDX4//8/IZz2Hwqw6WeitoNGDRw1cNTAQWPgfyhOo5aBhIAglH5PqoGCBMTvEWvgWShtjMNAFzR1+MH////L/yNAOVLBKvj///+ZSHIuhE1jgJfYu//jB+U4CmycBsKK+jNoBs38//+/C0wNXQAASw6fhVm92MoAAAAASUVORK5CYII=", "w2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMA7mbdu5l3RCLMMxGqiFX7DpTJAAAAjUlEQVQI15XKURGCMACA4X8cAt75QAPXYCMBNnANiECErYERqKCJtAI4N+RlroHH9/zx13gBFUEEbAtDgNuGiNC9QWnKQO0nx2CoPFUYJb2knilXa5rk4OweWrRF7lylMqd4+ACjGV5FOC6A1R2NFysgFg+90kD5DfCcDFCkDWySQJM0iPkO+Zm8PLv8ACUcLhztmYGKAAAAAElFTkSuQmCC", "b2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAADnRSTlMA3Xe77pkiEarMZlWIRD8IUhkAAABeSURBVAjXY0AGjO+A4PECCBPMBjMfAYnL7xRgTAa5CXBm3AME0wHGZPcLgDF3PkmAG2aGZG4CTEHOO3G4CXqP4EyWx3Am80NsTJYXCG2vYczSdw0IKwpgzBcLUDwJAAcMPVj2WgTvAAAAAElFTkSuQmCC", "y1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjE1OjA2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjE1OjA2KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxZTRhNmYxMi03NzUxLTQ1MWUtOWJmZC1hOTA4ZjUwZjg3ZmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDowMDM1ZTE5Yi1jMjkzLTkzNDYtOGRiYi00YTA3NDMzOTAzYzUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NjJlZmZiNy02ZDI2LTQ3OTctOGE1Ni02MGQ3NTBmY2RiYWEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlkiIHBob3Rvc2hvcDpMYXllclRleHQ9IlkiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjY2MmVmZmI3LTZkMjYtNDc5Ny04YTU2LTYwZDc1MGZjZGJhYSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWU0YTZmMTItNzc1MS00NTFlLTliZmQtYTkwOGY1MGY4N2ZjIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjE1OjA2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4qYyFdAAACfElEQVRo3u2bPYsaURSG1RTaWVjYpPAHBNIsuysRMXZptNBmC5vtrP0N/oAtrFKkkBQJCBKGpPGDpBGylcgWi7iFi5sqLiEQdwNyMm/AYOR+ODrOeOQeeAsZ53qee84999xRA0QUOFQFDBx3uCUr22rYajMTfD4DgAgubOtNNBqlZDJJ2WyWlVKpFEUiEYC8FcGVY7EYDQYD4mqWZVE4HP4lgmuAnrul0+nvIrguwsvdcrm8EK5t4Aycf1YoFA2cgTtIuFqthpv+Ca9ns9lWjk2nU6pWq1uNuzVcq9X6z4FlR7axVbCF6vW6d3CrUVvWptHr9/vSMSuVyn7AIapODRNSKpWkYyKinsGpZhlOOrVmsykdDxoOh94WFNVM93o9V9LR6XpzDU5WVJxED9Uxk8lIx8E1p2vYFTh8qMqxddYeCoUqaoiqb5u4KnrQZDKR3ot0U92Ldeh7h6Jae7gmSivdpDgp/TuFQ3RUjq5u7LoCIpsQ33pLXSQWKYaJ0BUQVSr71jirNvYFoCqFNy0gnsDpugydNulsPD3y6Patddfl3p7ndOvKzcroy2EVveA6YEhjRJvdSVwH6EZl9PUxg2qLcNJcs4NzcowxcF7DIfUMnIEzcAZu53BunAD2Fo79Jm7gDNwewqkeBrEvKLIHr24fUH2DWzTQy9qlma+NDZyB89akvyDC7yzn8zlbsIfH33R0mhHCdZ49P6HPl3c0Gt/T7bcfNL7jIfgKn+G7DK4NuA+dEb3/eMVSn76MpXC1RCLxFw5vsro3rASf31l9isef3ovgjoPB4M988ZwuXlss9SL9ikKhJ8LIwV7ausYbOMr2/SsYyPxpgrn+ALa4tLIBRcBTAAAAAElFTkSuQmCC", "close": "data:image/png;base64,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", "y2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAuElEQVQ4je2RXRHCMBCEMziIhViohVrAAhZiAQu1UCTUQizUAhY+XjKwND9NOvAE+5S52/vmsmfMNwQ4Xlo75q4y59ubDUsAicHGBsAdcDvARYBjAoyms5imCmwU3wyYLDCaZzEPBc/bT/aAms2S6ftt1lVgZugidRu3AghSrwM331oBG2uTHqIXqMF7YCgdrAmY2SjIIexRoJPMkky7gdGsBwoFzxN4amDeCu+sWoBd+gN/AfhxPQDQd4tiTWnejgAAAABJRU5ErkJggg==", "d2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAADnRSTlMAZnfuIplVEd1EzIgzu6goI5QAAABjSURBVAjXY0AGcu+AoKkAznz3DMx8yMDArvxOAMpkYOl7AmMyzHsKZ/K+K4Axmd4lwJg87zbAmCzvAmBMBqxMFoRazncKCMMOwJhcj+G25T1COMccxlR+lwB3uiXcF4sYUAAAcic4/MWpVVIAAAAASUVORK5CYII=", "d1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjAwOjM2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjAwOjM2KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1ZjQ3MTJlZC00MzQxLTRiYzgtYjhlNC04OWMwMjEwNGUxNWUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDphMmM2MzgxYS02OWNjLWI4NDUtYmY1NS0zMDc2Mjk5YTc0MTYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyZGJhYjBhYi1mOWZkLTRmZDEtOWVjYy1jNDQzYzlmMDNlZGEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkQiIHBob3Rvc2hvcDpMYXllclRleHQ9IkQiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjJkYmFiMGFiLWY5ZmQtNGZkMS05ZWNjLWM0NDNjOWYwM2VkYSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NWY0NzEyZWQtNDM0MS00YmM4LWI4ZTQtODljMDIxMDRlMTVlIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjAwOjM2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4JEwRCAAACpUlEQVRo3u2bsW4aQRCGARfQUVC4ScEDREoTxUFG6EKXxi5M44ImnWuegQdIQZXCBXLhSJZQdEoasGU3SEmFkIsIkQILpwpWFCkkltD4fqyTULS3u3cc3A65kf6K9TLfzd7M7ixOEFFiU5WI4bjDLdiRozNHHWaCz4cAEMGlHR1ns1kqFApULpdZqVgsUiaTAciJCO4ol8tRv98nrmbbNqXT6d8iuDPQc7dSqfRDBHeB8HK3vb19IVwnhovhorODg0oMF8P9N3Ddbpfa7fZclmVhUk81m835uMFgYC4cHKzX61IQHWGe6XRqBlyv11NGJyhkpHBwIGyoRdVqNZpMJtHAVavVlcJB+I7xeLx+ODxZ3Qi4CcaVn/cTgH4juDQcsqKOc8iIXoYs2Wg0tB7Q2hMKMhsi0Wq1AsG5hqWnWuZ+kkyopQDLZhk490HJljqysm6ZMA7OnUdWWnSjZySc6l3WffeMhVOVGZ3SYDScLEHpLE2j4bCt85oP4KzhZPOhLrKGo0dnhMLuhjUc6tnGwiEjbuyylNU6nfmMhpNtplmXArxvsi0Y6yIuO+EDmu32SxU1nQJuLJzq4Kp7IjcODuOCnuiNhcPfqnoqfg6qRsBhc6yKliuMjazjrILD527nS6chtCgU9Ejb6TK4ZRQEzHg4tBOCNGNXAifbxfvtMAeN1kqvsHQ70F77xTCvsUKHkx1TvNrrYVxXrfXy8d97gTCWmTFwJlgMF8MZaJ6/IMLvLGezGVuwP3/v6flLSwh3/vTZDl1+uaXh6I5uvv+k0S0PwVf4DN+94DqA+3A+pPcfr1nq09XIE66Rz+fncBhkX3xjJfh8avdoe/vJnQjuRTKZ/LVfeUNv39kstVt6TanUljBysFeOvmIARzm+fwYDxf80wVwPSZCcIeO3pi4AAAAASUVORK5CYII=", "q1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjA3OjQ0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjA3OjQ0KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NGM2YjdkMS1mYmE0LTRmYjgtOTlmZS0zNTJkMGFkZjdiZGIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpkODAzMzE5YS1kNGFlLWUyNGItYTNiNi02MGE1MTQ0NDdhNTAiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjZTU5ZmYwYy1mN2NjLTQ5YjItODAyMi02OTg0ZDI0ZjM1ZWEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlEiIHBob3Rvc2hvcDpMYXllclRleHQ9IlEiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNlNTlmZjBjLWY3Y2MtNDliMi04MDIyLTY5ODRkMjRmMzVlYSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTRjNmI3ZDEtZmJhNC00ZmI4LTk5ZmUtMzUyZDBhZGY3YmRiIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjA3OjQ0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5upBvHAAADO0lEQVRo3u2bv4tTQRDHk7NIuhQprrHIHyDYiBoMIaazuSvuGos0dlfnb8gfYJHKwiJYKBwEeWiT3KFNQKsQLCScReTOyhwiGBXCmK8QeRy78/Zn3lvJwlS3eZnP2+/Mzs7mckSU+18tt4ULHS42jlZ2vLJhYAafHwJABFdY2dNSqUTVapWazWZQVqvVqFgsAuSZCO6oXC7TZDKhUEcURVQoFH6I4I5BH/qo1+tfRXCnWN7Qx97evhBuuIXbwqU3Dg4O/cOdn5/TYDCgTqeDh0sNc2BBwI1GI2q32yyQzPr9Pi0Wi+zBYaVMoa4aXlBm4OCMC6i49Xq99OEQL67B4jJNDW48His72u12/yUPHfnqJhsncPP5nBqNBusY/i5zDp+H9JLg8AzM3SgcVoJzqtVqKTmFRJT0knTizxpuOp0mgumkdBUVqD7PGo7bmHVlpBq/qrFnBQcZ+dqjuJeGMPAOh/TMydFmcHKHIrzDcWncZtXWg4s9lbgzhuMkqfpmbbIwvt8bHBf0puWSTsUD2XqD4+IN4C4GV6d6heMkY3tUSR1OlkxcxVuSLL3GHFK96EsBvQk4leLAORw2X1eDk77XfW4TcLbqyKwsIbvUyi/ThIIsF38xmC/aOrh48144m1QP2CJU90autFPJlFZwJm82qRheZ0Buno7svdSWsqTCrVzccW7VdPooVqcCrmqXVRBc2bYG5FZXp/qxguOkKTvPwTlZps1U9wuOcqsnS9lJJ3gXvRgnPZSkRiziT+SUbgPX5KThpLWXJDNZzzIp/jLRTldpx8XlZdJ2NwF01k5XaajaGte19n4RAkDTTGiSOZMSjJf7OdVYkq2OznzuRO7tZhVxqBNbmLuuGXU+xxXqG7kTXzssMpm0VG9+uFP5xuBsrqA5SK6znXm4eDV0Va6ogLheSjBwqW3iWR3SXxDhd5bL5TJYsJ+/ftOtuw0h3MmNm3fozfsLOptd0ucv32h2EYbBV/gM32VwQ8C9PDmjF68+BGmv386kcN1KpfIXDpOi009BGXx+Ho1pd/f6pQjudj6f/75/+IgeP4mCtHv1B7Szc024chj3V/YRE0K0le/vwEDbf5oI3P4AXLML3XymB8YAAAAASUVORK5CYII=", "q2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAd6oR3URmmSLMVTO77oicLwP7AAAAoUlEQVQI12NAAcwy//8fbAAz5f8DwXcQi/2/IwODyP/JIEGwgP4nBgaO/wogJtP/AKA8UAdI5AADL1AGrOIzw/6PEKb8V4b8XxDm+m8gHhjEg5gwUbgC+V8M8VBt738w2EMNmz+BgQlkBbcC638BBlaQxSZfdv41AFoDdA6r//9vQEWW/x0NGPL/O4M01P8HgS8bQI6S/P+/jNv/M9yHRgsA6qpCFaHS4BoAAAAASUVORK5CYII=", "s2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAd0Tu3RG7qplmIjPMiFUEAjcLAAAAlklEQVQI12NABWL//3dCWMr/gcAJxOKyP8nAKv9/A5DJ/iWAgYH7fwKQyfwRJNf/FUis/wlivv8FJPh/wI1i+18EY3L5//8uBGUz+v///0cAyhHM//95A0yV7n9TuOb3INP7HUBMHpCR8l/BRoKY+mDbmP8CCZbPC0BynxhAjvoYwDD9fwFITgXk9I8Qg8T//08MQPEiAAA9NhvTlnMNAAAAAElFTkSuQmCC", "s1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjEwOjEyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjEwOjEyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5ZTZlOTc3NS04NGMxLTQ4Y2ItOGY0OS0wMzg1MmM5NGM3MGQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1ZGEwYTQ2Ni04MmM2LTcyNDgtODUzMC01Y2IyNTE5MzNhNDgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphZTU5NzRhNS1lODUyLTQ5OTEtYTM3NS1kNjVkNWU3N2ZjNDMiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlMiIHBob3Rvc2hvcDpMYXllclRleHQ9IlMiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmFlNTk3NGE1LWU4NTItNDk5MS1hMzc1LWQ2NWQ1ZTc3ZmM0MyIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWU2ZTk3NzUtODRjMS00OGNiLThmNDktMDM4NTJjOTRjNzBkIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjEwOjEyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4xA5NuAAACuUlEQVRo3u2bv2siQRTHNVdoZ2GR5gr/gMA1R+4kIsbumqRImits0qX2b/APuMLqihSSIoGAHEuu0YSkEe4qkSuCJIWHueoMIXAmB/KyX0FYZPbt7uzoziQ78C2EUd5n5837pSaIKPFSlYjhTIdzrH1bJ7bahgk2fwaACC5l6yCTyVA+n6dyuWyUCoUCpdNpgByK4Paz2Sz1ej0ydVmWRalU6p8I7gT0pq9isfhXBHeO4zV9bW1tC+HaMVwMF93a2dmN4WK4Vws3HA6p1WpNharITY1GY7pnPB7rDwdDS6USC8SBhoFcGFy325WGcqpareoF12w2Q0M51e/39YBTDaYNHIzwYyzcdRZcoFqtxu6VvXdK4TgjoXq9TqPRiH04zgCE/bKnphQOT5cD63Q65uY5ziUR0o1O4jgZnU5NKRzymhsc7pHRcCivuDsXBaDSaOlVkSCaLtNFlcJ5FcXzZRX2LxJWeYWCyChThVQqlSkslwdfRG0J9w2TvBfeFSDAoMIIA4n3a9nyzN/FMO4q66qRjBlmNaRfYNmeTosZip9uXSaqajMgguvBBVWenlbTLwBypxc0uGg32uMibND0oB0cV+VEBicySiZPcQVAJHBcF44ggYTud3FBJcjnKIPzCgQQTiTMqSFVRBYt/Q5gRZ0AXnsNl2RGFUuZoaiQTAmmfG6pYoQu49JLSQV4wl4uFvTLEO26AtwjLvL5UdgufeFJHFOxIO3OrCPXthPnXNb5HcG8tJ+h6LRiuBhOw+X6CyL8znIymRgL9vj0n95/LAnhztbefaCLn7d0Pbij33/uaXBrhmArbIbtbnBtwH07u6bj019G6vvlwBWunsvlpnDYZJ3fGCXYfGR1aXX17Z0Ibj2ZTD5s7+7Rl6+WkdoofqKVlTfCk8PatHWFDSbKtv0HGCj+04ThegYwbrMwCoPGTgAAAABJRU5ErkJggg==", "u1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDE3OjExOjM0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDE3OjExOjM0KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowOGI1ZTVlNi0wM2JjLTRmYmMtOWMxOS0yODQxOTc2ZmJkNzgiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMDc1OTA3My0xYmRiLWRjNDItOThiZi1lYWMyY2NmYTIwNWYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZjViMzcwMy1hMzZmLTRiYjYtYTBmYS00NDJiNTZjMGViZWUiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlUiIHBob3Rvc2hvcDpMYXllclRleHQ9IlUiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRmNWIzNzAzLWEzNmYtNGJiNi1hMGZhLTQ0MmI1NmMwZWJlZSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDhiNWU1ZTYtMDNiYy00ZmJjLTljMTktMjg0MTk3NmZiZDc4IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDE3OjExOjM0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz62F4KGAAACqElEQVRo3u2bv2siQRTHNVdoZ2GR5gr/gINrjruTiBi7a7QwTQqbdNb+Df4BV1hdkUJSJBCQsCSNRpJGuKtEUhxiCg9z1RlC4EwO5GW/gscSZibZ2dnVWefBt1uH99mZ92PfrhEiioRVEQOnO5zDKraObbU1E3zeBQALLmZrP5FIUDqdpnw+r5UymQzF43GAHLDgKslkkvr9PulqlmVRLBb7y4I7Br3uls1m/7DgOthe3a1QKDLh2gbOwC3PSqUdA7fecIPBgMrlMn48Vy6Xo26368m5Vqv1fz2oVqvRZDIJFm46nc5hnI4sBGgZw41hrYcbGCgcAFiOQLj7MtZoNLhrvnb3VhauXq+HFw7xtRJwvPjwCy7QmFtbONlyUK1WwwvnrJlrA4d6Glq4wIu4CE62Qwk1HG89ZFEDt6pwaMR566Hn1DqhoL3irddsNoOF6/V6SuHG47GSjsf3xlkGTtV6K/lUoCqGlcCJYkQG7vl4QeZxR+mYQUV2WxiShte+UumASEVdeulxB08KS4FT0egujDdswuhhKXCimQeO7TLiVxmcKE5QB1UkEzfrKIUTFXI3x0k0XnBzApTCiTImhK7Dy665TSbK3xWI4g5JQgQoOtay9VIpnKizcNY9Z+zAadG8RKZ4+/aW5zWOupVMI+ALnKijlxFulttE4hvcS5nTjZBEZI6jr3CLHRQNVv06ioHAOZOMqHaxsqKX3QoU7vlxhfMs+WHmnbiBM3DBGvcLInxnOZvNtAV7ePxHHz7nmHDn795/oosfNzQc3dKv33c0utFD8BU+w3ceXBtwJ+dDOjq90lJnlyMuXD2VSs3hcJHVudZK8PnQ6tHm5ttbFtzHaDR6X9zZo6/fLC21lf1CGxtvmDsH27b1ExfoKNv372Ag86cJzfUEZnU8QQCz4vgAAAAASUVORK5CYII=", "u2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAJFBMVEUAAAD///////////////////////////////////////////+0CY3pAAAAC3RSTlMARLtmqnfu3REizEReXgYAAABKSURBVAjXY0AG0ptBJNPuQcDcBiRmbwUztwMJti0MMJJlWwNIGUiOcbcDAwPH6gyQnPcWAYbw3QEgJstuINgK8ZLo7t2lE1A8CQBS2iRP3cj2agAAAABJRU5ErkJggg==", "k2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAwUlEQVQ4jbXTURGDMAwG4N4czEItzAIWsFALWJiFWqgFJgELWMDCv5ds+y9AaCjLG0n4LrlrQvhXAOggUdk/4hfj6jcPqDHJnQMVVijvBxWWVc0HWpgbBFAszAUCyEdYNViLMXgzGnIIIVHqZYFbQMfTYB0zgPvRhHsgwwN9l22uDsxUmyifNFYD6kcbqbYAiC5wZwJefWoGpYevZbgCjLLyJx5NoPQlAr9P6TQovXzbzytAvXrfBEp/T+AC44qa4g0HNmITvCJadAAAAABJRU5ErkJggg==", "k1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAHh2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMTgtMTItMjhUMTc6MDk6MjcrMDg6MDAiCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTEyLTI4VDAwOjQ0OjA4KzA4OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0xMi0yOFQxNzowOToyNyswODowMCIKICAgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIKICAgdGlmZjpPcmllbnRhdGlvbj0iOCIKICAgZGM6Zm9ybWF0PSJpbWFnZS9wbmciCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyNWFiYWQ1Ni00OWQ1LTQ0ZjUtYTJkMS1lYzY0MWM4MTAxZGYiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OGU3NDNjMWItODgxNC00NmFhLTkxNDgtYzk2ZTk3YzgyMmI2IgogICB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZWZlMGNkYTktYTBkMi0yYjQxLThhYmUtM2M2MWNmNWVhZTE0IgogICBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChNYWNpbnRvc2gpIgogICAgICBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDAwOjQ0OjA4KzA4OjAwIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1YWJhZDU2LTQ5ZDUtNDRmNS1hMmQxLWVjNjQxYzgxMDFkZiIKICAgICAgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIKICAgICAgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0OndoZW49IjIwMTgtMTItMjhUMTc6MDk6MjcrMDg6MDAiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGU3NDNjMWItODgxNC00NmFhLTkxNDgtYzk2ZTk3YzgyMmI2IgogICAgICBzdEV2dDphY3Rpb249InNhdmVkIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaQogICAgICBwaG90b3Nob3A6TGF5ZXJOYW1lPSJLIgogICAgICBwaG90b3Nob3A6TGF5ZXJUZXh0PSJLIi8+CiAgICA8L3JkZjpCYWc+CiAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+ZiU+PAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAntJREFUaN7t279LQlEUB3C1QTcHh5YG/4CgJSpJHubWUkMtDS5tzv4N/gENTg0N0lDQEo9a/EEtQk0iDSE2GNqUEkFWIKf3DYqS+3763rv3yjtwFtHH/XQv59x7tRARhWY1QwFOdtyfyGt5pmVVssSY9wBg4aJaHsXjcUqlUpTNZqXKdDpNsVgMkGMWLp9IJKjVapGsoaoqRaPRNxbuDHrZQ1GUZxaujumVPba2tpm4aoALcPxiZ2c3wAW4mcUNBgMqFov48G9WKpXZwE3CfrLRaNj6A5VKpX+fx3NHoxE/HAbFgiHL5bLlZ+RyuameISQOM1MoFHSfgdmTFje5FGdm5lB0jGBYqni+dLhms2kIy2Qy1Ov1+FZLJ7h2u20IQ04Dc7UV2MFh0GYwN3qk7zjAsNy8KCBccVaWotOyzxVnVhWR6HVOdyNccBiwUYN2o+Rzw1nJaUu+sDjMmBcw7jgsV7eXojA4t0q+sMvSS6AQBcWrE7svrcBKj/MC6FsTx3WD30Bft19WZtDOnYtwG2c/gVyOPH4BueAQeN0MiFMEdxx28k76mNdAz68ZzM5nVoBO957ccVaATk8NQuCMruP/Au1usoXBWQHa3YcKhTMD4uzHpRXo3WjhqtxOGH1vgNe54PQas5NCAODkDDo5sbv6zSp6EpA/6eUp23ecaBHgApyAofsLIvzOcjweSwt7//ik5bUME1dbXFqlq9s+dbpDenx6oW5fjsRYMWaMXQ9XBe681qHTizsp8/K6q4srJZPJbxzepNYfpEqM+URt0vz8wpCFWwmHw6/bu/t0cKhKmevKJkUic8yZQ2xoeY83yJja2G9goOCfJiTPL7tlPTRm32GrAAAAAElFTkSuQmCC", "tm": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAMgCAYAAABVo9p4AAAGWElEQVR4nO3OMQEAIBAAIRua1IznYgZ/gQSsBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEC1pw8AwGfVmT4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBf8awb3K/B9VQAAAABJRU5ErkJggg==", "m1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjA1OjQ2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjA1OjQ2KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozOTQ2MzZmZC01N2FkLTQ5MzUtOWE4YS1lOTBhODZkZDhmZjYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4ZjFlYTRlZS1lYmU1LWQwNGQtOWZlMi00Mjg1MjhjNzE3ZWYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMTIyZGM0OS1iODkxLTQxMDQtODMxYS05NmVjMTQwNzNhNjEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik0iIHBob3Rvc2hvcDpMYXllclRleHQ9Ik0iLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxMjJkYzQ5LWI4OTEtNDEwNC04MzFhLTk2ZWMxNDA3M2E2MSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Mzk0NjM2ZmQtNTdhZC00OTM1LTlhOGEtZTkwYTg2ZGQ4ZmY2IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjA1OjQ2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6ir4Q5AAADdUlEQVRo3u2bv2tTURTHkzokW4YMXRzyBwguog2GELO5tEO7OGRx65y/IX+AQyYHh+CgUAjy0CVp0SWgUwgOEtohkjo1RQSjQrjmW3gSH/eee8597ylX34UzNb33fO73nh/3ps0ppXL/quUyON/hNsbh2o7WNvTM4PMDAOjgCmt7UiqVVLVaVc1m0yur1WqqWCwC5KkO7rBcLqvJZKJ8HUEQqEKh8FUHdwR630e9Xr/QwZ1AXt/H7u6eFm6YwWVwf2/s7x9kcP8X3Hw+V+12Gx/+ZYPBIFHnMN/m/J1ORy0Wi/ThWq3WbwuHNhqNUgHbBEwVbrlcaheGNRqNq5/HHabNg3HVc4LDkTQtnMTxHI/HiczvBDedTsnF46qHo0fN3+1204NDXFGLw/r9vhMYjpxtbmxeanCmYHeNDZe5ERqpwEEVjgO9Xk8MB1U4c3PizgkOTnMckKpnSyTSuHOCswW8q3pwmDsvJ+6c4KKdSRLqUbXTNe6c4LhxIVGPm0gkcecEJ3WCo570NHDiTgzHqUNS9aiOB/FtOim2uBPDUY7YEoJJPaq0oGGg5qVOhBiOSteIAapMmNSjlEGioeIR/iQGR7VeWMh2bKM7TW1WuBlUL0u1eWI4ahfhhK3IR9Wjjlw4H1UmkIgSg6McD1Xhqkc5jfscJ5tSSUUMR+305jWHox51CqI1jFrXVMzFcFTrJSkZ+DlV26Kx6ZJUxHCm63/0GNnUo8B07yS2LJ0InCSwXQu+7pHJVl9jw1EJwLSA5HpEPVG4ZEwRHKWEqUBL1aPaNOpFLDYcVUypDl2iXljbpMlM14aJ4KjuhILDwpxrki4pcTdJtykiONcej3tfs93PqDl0SSgxOOo4hQnBpp7tzic9OSI4TuvluvOcBx8q5nWJSARHBTTnhZlSz6a8LfPqCr8IzqV51RXjzU3C70q+GUoNzqQcde1Iepg2WHesRXCmFojztJ3UMPWYOh+cHoiQGEJz+T4g7gAIx4fsO/EMLoP7s8P4F0T4O8vVauUt2LfvP9StnYYW7vjGzTvq9btzdTq7VB8/fVazcz8MvsJn+G6CGwLuxfGpev7yvZf26s3MCNetVCpXcPhQcHLmlcHnZ8FYbW9fv9TB3c7n81/2Dh6qR48DL+1u/b7a2rqmVQ7j3to+4AM+2tr3t2BQ2T9NeG4/AXOPOc4XKJ1bAAAAAElFTkSuQmCC", "m2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAA3ElEQVQ4jbWUWw3DMAxFr8egFEphFEahFEKuFAphpTAKgeD9xJVn+ZFJW35axfHJPa5U4NeLmRt/rvZF71M3AsDNOfeYhK0A7nbfA27MvEwwN29TA18AenY4AJ4READ28Uy1je6uaxZ4CLDQ1um6LnjADmApUgpwtwUNXImoq5TuHI3uYeveV77mGGhfukR02qIHrLRDXReYaVe6UUJ9u9VOdTNgpC3vrm4I9LRHUgG6ullCnUK05S8U6lZAq13qpkCj3TChWyXUzQJLdWeAVi9NVwKHtoam8/vLegN+O3GshJQz7QAAAABJRU5ErkJggg==", "del": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAWCAYAAAClrE55AAAAAXNSR0IArs4c6QAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAQpJREFUSA29k1ESgzAIRJve/852UJd5ZaJgNPpDICv7JKZ96s9Sl15XtuIrUyGMoQLiEMviyyJ/LmttQ/gmUneeAUHvM5DXIAzoCOQShI1XI+ZXcp1peiCXIKIZc60zSNNFkCEI/j/RlDl1glQkyBCEGtFE5oqm4b7eYdT1vQXx13C/jqydQQjWJvIYhJlH05gTkGseDeuvrw1Ex5NewQqdRi1tzFWPURN5BIamPBLWI4BygVh+C4ZmglBcm3d+YkFYJMiq1yYbq3YUqaW56ZlTF3tFENsfngxNaXRUp8ZNWdzXj17rTv+1pCn1JqJ3HFJibcyIZyDm9xqMGyVf6ceU6Ia3qyBmMBXmB+JvVi7nfETkAAAAAElFTkSuQmCC", "o2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAd2ZEu8wR7plVIqqI3TPdGppmAAAAlUlEQVQI12NAAWwi//87LgAz5f8DwQ8Qi+N/YQKD7P8wkOCXBCDZ/5uBget/AEiO5b8BAwcQM4BEHBjYv0LM8f/G8P4PhCn/mUH/E4Q5/xOD/mcI0x6V+RPMAtHvP0KY5/8xpH+BMO9fYOD+D3YU838BIN4AYrJ+TwAqAtvR/xPskEAGBlGgPMzplWC9XKL//29E9SMAY9c79J9m/58AAAAASUVORK5CYII=", "o1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjA2OjE0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjA2OjE0KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmMDI3MGYyMC0zYWEwLTQwODctODE1ZS00ZWNiMTE3N2JmZWQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNjRiNWJmZi1jOWM1LWQ5NDgtOTZjYi0xNDFlYzkwMDExOGEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkNjI2YTY5Mi03NDIxLTRiMjEtOTI3Ni1hZWZiYmU5YmEwNGEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9Ik8iIHBob3Rvc2hvcDpMYXllclRleHQ9Ik8iLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQ2MjZhNjkyLTc0MjEtNGIyMS05Mjc2LWFlZmJiZTliYTA0YSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZjAyNzBmMjAtM2FhMC00MDg3LTgxNWUtNGVjYjExNzdiZmVkIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjA2OjE0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5kBrGIAAADEklEQVRo3u2bMYsTQRTHk7NIuhQprrHIBxBsRC8YQkxnc1fcNRZp7K7OZ8gHuCKVhUWwUDgIsmiT3KFNQKsQLCScRSRnZQ4RjArhuf/AQjhm3szuzNxmZB+86vY285v33n/ezCQ5Isr9r57L4HyH27Dj0E9DH3rmGPMTAIjgCqE/L5VKVK1WqdlseuW1Wo2KxSJAXojgjsvlMk0mE/LVgiCgQqHwSwR3CnrfrV6vfxfBnSO8vtv+/oEQbpjBZXDp2eHhUQaXwalsMBisHY2DyBuNxvrvo9HID7j5fE7dblcKxHm/36flcrmdcL1eLxHUdR+Px9sDt1gsqN1uWwGLHBOVOhzSqNVqWQVLCmgdTjdimIBIYOLUJJ5PBQ4CoDP7SFuZmupEXfb/zuCgityAIPPT6VTrXapIdjqdm4XDB3JggLeptDrRswKHRdeFlHMpqlN7VuA4EUEdJjVMiuy9+EzncKgjLh1NOgwY3iF7t3M4rvjjyHaS96vqzggOUeFm1jRq0fIgg1OJlBEcVxNJ2qW4YqVaWozguEU7qUJuDRy3ttlISVVaOoWTrUM6Mm2jpXMqKDIxgcLZMi47nC4FrsWEm0BkjVM42QfbguMaBJ3scFJzul27SfPsvLeU9ZQ6rZFJg6CrxkZwJq2RyRKgK1hGcNwATPpKTAwXNd1NrxEct/vWUbMkW6g49Wy8K+BmOMleTrUD142aFTguNeFxjsZVYHGbA2M4larprHtIb64TiRQ4rkhZOWZQRW/zkmNzD4ao6h65J9llWDv9sn18bkN5rcEhPV0AmiwpVk+cAaiqnZu43XF6y4NaMrkMgSqadjjO7+ewJumITbTBxbO2dvDO4a63VNGtzqbbuiJOFS4Ny+B8Nek3iPA9y9Vq5S3Y7z9/6d5eQwh3dufuA3r38ZIuZlf09dsPml364Rgrxoyxy+CGgHt9dkGv3nzy0t++n0nhupVKZQ2Hh4LzL145xvwyGNPu7u0rEdz9fD7/8+DoKZ08C7z0h/XHtLNzSxg52KPQP+MBHz0c+wcwUPajCc/9HxJnbbBRghkDAAAAAElFTkSuQmCC", "g2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAZnfMEd2qiO4iRDO7mVXRzTThAAAAkUlEQVQI12NABWr//x9yALOW/geCTyAW4/8mBwbV/wlA5v7PIMnzH4FEfAhIzuMzSF4AxGT/P4GB7YcDzCSOb3BD53+HM/d/gjPXg5hAO4C693+HM/2h2oBM5h9gFieQyf7/AcQlAkCuAYjJDLK0/i+ImQ9kAvlGDAyqn+NBTrkPMiqlHsTkVP3/X4vhPZAJBwCm0D23nVsCiwAAAABJRU5ErkJggg==", "g1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjAxOjM4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjAxOjM4KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3OTNjYjAwZS04ZDc2LTQ4OGQtYWZjNC04YmIzYzM5YTE1NWIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyMjc2ZmQ2Ny0yYjJiLTMxNDUtOTlmYi1iMDJkMWM1NjE3NWUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3ZDNhY2E0ZC1hMDViLTQyMjMtOTJmZS05YzRkODE2NjRiMWUiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkciIHBob3Rvc2hvcDpMYXllclRleHQ9IkciLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjdkM2FjYTRkLWEwNWItNDIyMy05MmZlLTljNGQ4MTY2NGIxZSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NzkzY2IwMGUtOGQ3Ni00ODhkLWFmYzQtOGJiM2MzOWExNTViIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjAxOjM4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6+q6PWAAACxElEQVRo3u2bv2obQRDGJaeQOhUq3KTQAwTShNgiQijq0tiF3aRQk861nkEPkEKVixQiRQIGEY6kkWySRpBUQqQIwi4UZFeWCYHICYjJfYKAMHv7527vbifcwNeYBc1POzszOyvniCj3vyqXwXGH27AjXye+hswEn58DQARX8PWqVCpRtVqlZrPJSrVajYrFIkBei+COyuUyTSYT4mqe51GhUPglgjsBPXer1+vXIrgzbC9329vbF8INM7gMLj07ODjM4DI4XRuPxzQYDKjT6eDDhGq1Wus1kPNwi8Vi7WgQjEq9Xs89OEDBsbBQUQBjg1sul9agNkM1dTicqUajYRUMMj1/1uHCnqt/ySNI0+k03TNnCob18/nc/VIAJ3WA2u02jUYjXnUOTqvAkoKyCgenVbuFksCyQ0GKloGhLLBsv5D2g8BQDtLYMWtw3W7XWl1yDi6oWOPvaYWjFThZ+seOsr7yyM5bUEiqMqtOndTtViLByRwF+F2DUzZ6TN2QjwQna7dE326U+9xd6bRtie6cTTidEpPomUMoyQq+rkRfnDPZUnW9kV1yTW7jsda5sCZLPInCyTqUsLcAZ+BkScV05uEcHJKEbF7S7/f5wumkeN3s5iScavdMAWWhnjicquZtOqZqm1RRYBLmVqdf+GCdIox1mzuJMASUzqzT5I5ofW4pe9yIKtORRSwT5zgAUVZMRxaxvRXYbJLDDplifeVB76kzz7T9dJXo+xySh6xNC0ocUSdnib+sYjdlNwInx+kuWgaXwTlogb8gwu8sV6sVW7Db33/o0W5DCHf64OEOffxySeezG/p+9YNmlzwEX+EzfA+CGwLu3ek5vX3/laU+fJoFwnUrlcoaDou8swtWgs9vvDFtb9+/EcE9zufzP/cPX9DLY4+lntSf0dbWPeHOwZ76+oYFHOX7/hkMlP3TBHP9BRPpmfx5h71QAAAAAElFTkSuQmCC", "i1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHUGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjRUMTU6MTY6NDIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDAwOjQwOjEzKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDAwOjQwOjEzKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk3NWViNzI0LWY5MmYtNDkzOC04M2UzLTkwOTc1ODUyNzU1YiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjlhMjQwM2QzLThmYTgtMTQ0MS1hYmNjLWQ5OTY0MGMyMWQ2NiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQyNDI1YmQ4LWM1ZmItNGY2ZC1hYzgyLTc0NzVkYjY4NWFhZCI+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iSSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iSSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDI0MjViZDgtYzVmYi00ZjZkLWFjODItNzQ3NWRiNjg1YWFkIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI0VDE1OjE2OjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmQ1MzJkZTItYTI0Zi00Y2Y0LWEwZDgtNTU1OThkYWU4OTM4IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI3VDIxOjAzOjAzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTc1ZWI3MjQtZjkyZi00OTM4LTgzZTMtOTA5NzU4NTI3NTViIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDAwOjQwOjEzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5VbSlnAAAB2klEQVRo3u3bv0sCYRgHcM+Gc3NwcGnwDwhaopKO43Jr0UGXBpc2Z/8G/4CGmxoajoYClzhqOZVahJoOaQjRwdCmlAiyAnm6pyFueA+qO+t98nngu8iLvB/fX3DvGQOA2H9NjHHUcb6qeKl7aRAL9nkXASKc6uUwmUxCNpuFXC5HKpqmQSKRQMiRCFdJpVLQ6XSAatm2DaqqPotwddRTL13XH0S4Fg4v9crnC0Jcg3GM+7sqFkuMY9zC4FzXhXK5jF/27VSrVRgOh3LixuPxj1D+GIYB0+lUPly73Q6Nw3S7XflwOCWjwIWdmnNbc7VaLRTMsiy5d0ucno7jfAbXUdD68rfDkSd3FATtnvg5+XOOcYxjHOMYxzjGMY5xjGMc4xjHOMYxjnELhAtzV4CJ4vGetHcF0j5Oj+quAB/QSoeL6q4g7NSc25ozTTMUDO8apN4t8Zf33wF8NTityR0Fv12MY5yEFfgGEb5nOZvNyMJeXt9gbdMQ4porqxtwcT2C3mACd/ePMBjRCPYV+4x9D8I1EHfa7MHJ2Q3JnF8OAnFmJpP5wGEju9UnFezzse1COr08EeHWFUV5KpT2YP/AJpktfQfi8SXhyGFte7nFBhTj9f0KDcB/miCed52A7OZBLAtXAAAAAElFTkSuQmCC", "i2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAKklEQVQ4jWNgGBbg////d/9DwG5CapmobfmogaMGjho4auCogTQykOoAALdfC7PJkK4+AAAAAElFTkSuQmCC", "a1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDE3OjA3OjE5KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDE3OjA3OjE5KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0OWJhMTJmNy1kM2YzLTQwODMtYTdmMC1kZDFhNDIyNzQ4NzUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozZGJhZGJmMy1iOGEyLWFhNDUtYmI4ZC04OGYzNDI1MTQyNDUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNDExM2FhNy1kOGU4LTQ3MTAtYmVkMy04ZDMyZGUzNWQzZjMiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkEiIHBob3Rvc2hvcDpMYXllclRleHQ9IkEiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0MTEzYWE3LWQ4ZTgtNDcxMC1iZWQzLThkMzJkZTM1ZDNmMyIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NDliYTEyZjctZDNmMy00MDgzLWE3ZjAtZGQxYTQyMjc0ODc1IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDE3OjA3OjE5KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5y38gHAAAC30lEQVRo3u2bv2taURTHNR10c3DIksE/oNCltJWKWLcuyZAsHVy6ZfZv8A/o4JShg3RoISDl0S6a0C5CO4l0KJIOFtOphlKIbUFO3zfwwIT7jve9e17iCe/Ad1LkfN459/y4aoaIMrdVmRROO9yS7fs69NVXJvj8DAAmuJyvl4VCgcrlMtXrdVWqVCqUz+cB8soEt18sFmk0GpFW8zyPcrncuQnuEPTarVqt/jTBHSO82m17e8cI10/hUribs93dvRROxAaDAfV6vQsNh8PbATebzajRaOCDL6nT6eiHA8RVsEDdblcvHKIWBhYI6aoSjovasvAQVMHZRC1Qs9nUBWcbtUCooirg5vN5JDCoVquJpmdicIhCVDjp9pAYHKIQBtBqtVjA6XS6vnAo7VzqIWVRQDj4tYXjIhMUjfF4zEYPr68dHFLKtp9xD0EieuJwGKdsHV7VB12jJw7HFRLTJtButxOrnKJwcJ4rJCZbdfZc+p4oXNzpnzt7LluDKByXklzv4qIXtI4bheNS0mYo5qIXdyUSg4s6JMcVNnrbKwoxOC4lk5BNoRGBW9W4k5BNqorAcY07KdmkpggcNwQnIdut3RmOW0px+IN7SltxDwqvRamcznDcehOnAbu2FFE4bjaMc6uMTOAqb5SG7gwn5UgSD8wJjmsBLvsYd/8SJdWd4DgnXK7puIcW5dw5wXHp43rJE5buYauTOFxY2Y7iQJxB2nbHc4JL8mqcm3psrx+c4MJSR+JanDvPtlVYvKBgKonbAq72O9MXljjn19bnkCLL45O0LX921KU1/cI/hUvhrtdCf0GE31kuFgu1YH/+/qP7j2pGuKO79x7Sh8+ndDI5o+8/ftHkVIfgK3yG72FwfcC9PTqhN+++qNT7j5NQuHapVLqAw5u842+qBJ9fe0Pa3Nw6M8E9yGazv3f2ntOLA0+lHlef0sbGHWPkYE98fcUbNMr3/RMYKP3ThHL9B0shuRlnFtH7AAAAAElFTkSuQmCC", "v1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjEyOjMxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjEyOjMxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZWMwODFkNS0xNzM0LTRkZjgtOTQ2NS05ODRkMjdjNDYzNzUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4YzA5NmQxMi1kZWFhLTRiNDctODQyZC0yN2M2MDU4YWVmMTciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3OWQzMmExZC1jMWM3LTQ1MzctYWNjZS1iODdlZjQ4MzMxMWIiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlYiIHBob3Rvc2hvcDpMYXllclRleHQ9IlYiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjc5ZDMyYTFkLWMxYzctNDUzNy1hY2NlLWI4N2VmNDgzMzExYiIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2VjMDgxZDUtMTczNC00ZGY4LTk0NjUtOTg0ZDI3YzQ2Mzc1IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjEyOjMxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7x8qdbAAAC0UlEQVRo3u2bsWobQRCGJaeQOhUq3KTQAwTShCQiQijq0tiF3aRQ4861nkEPkEJVihTChQMGEQ67kWzsRpBUQqQIwi5k5FSRCQYrCYjJ/YYEY3bn9nS7e7f2Dfzd6W6+nd2Z2b1Thogy91WZFM51uFu27WvPV98xwee3ABDB5Xx9KBQKVC6XqV6vO6VKpUL5fB4gOyK47WKxSKPRiFw1z/Mol8tdi+D2QO+6VavVHyK4I4TXdVtbWxfC9VO4FC4+29jYTOEeJtx0OqVms4kf/ddgMNDmoOj+vV7PDtzdB+sEnM/n1Gg0hPcfDofm4UQPhgAd1RAh2f1VohcZTjayEKbUsjabzaT3tQbHjW63210artPpSO9bq9VupqxxOG6E4YSJqKmuZy2loNVqRXZENWpYBlbrHABkzgA8bIbUETVtcHAIU1DmEKaZjgwZdqC0dSjcVFItukGDNB6P44HDg6OuE53TW3tvydU8lVHnfq/SkRiF49YLpq3pyBuFC6p5XOFtt9tay4mRLQ9X82SJhRuUZaNmBI5LCrJmOmqDbA0uKJ2LmmnuepUe0upOnKt5d5tpLtJBSSgWuDCZj1ujYYu2tTMUlZrHDYKOza4xOJWap6NliwUuqOZFqYmJONrj1pPsYElHIrECx2VCTlETiRW4oJqnuyOxfuLMJQ1TicQaHJfudXcksbwr4JLHbWFn4NyLEK7mmUgkVuGCTrR0JxKrcEGbUd2JxDoczkA4uDDHf4mD4/Zty5xsJQ5OFr0ob4MSAwcDCNbXP5mYjrHB2bQULoVLoEm/IMJ3lovFwlmwX7//0LOXNSHc4ZOnL+j4ywWdTi7p/PtPmly4IfgKn+G7DK4PuE+Hp/Rx/6uTOjiZSOHapVLpBg4XeUdnTgk+73pDWl19fCmCe57NZq/WN7fo3XvPSb2qvqGVlUfCyMFe+/qGC1yU7/tnMFD6pwnH9RcL79cw3Ez1XAAAAABJRU5ErkJggg==", "wrong": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKOWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgICAgICAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHBob3Rvc2hvcDpJQ0NQcm9maWxlPnNSR0IgSUVDNjE5NjYtMi4xPC9waG90b3Nob3A6SUNDUHJvZmlsZT4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEwMTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTAxPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxOC0xMC0xOFQyMDo1MzoxOSswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTgtMTAtMThUMjA6NTM6MTkrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0xMC0xOFQyMDo1MzoxOSswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTgtMTAtMThUMjA6NTM6MTkrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZjIzY2ExYzYtZTkyMy00OTRiLTlkOGYtMjYzODc3OTJmYTdmPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxOC0xMC0xOFQyMDo1MzoxOSswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0NzNmYjJlNy02MjBlLTQ0MDAtOWU3ZS0yZDQzMTA2N2VhNTI8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjQ3M2ZiMmU3LTYyMGUtNDQwMC05ZTdlLTJkNDMxMDY3ZWE1MjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmYyM2NhMWM2LWU5MjMtNDk0Yi05ZDhmLTI2Mzg3NzkyZmE3ZjwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6YzFjMzliYzYtMTMxOS0xMTdjLThhMzctZGE1MDc3NDdiNzI1PC94bXBNTTpEb2N1bWVudElEPgogICAgICA8L3JkZjpEZXNj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", "a2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAd8wR7iKqiGYz3btVRJnRdYihAAAAjElEQVQI12NAA/2f4Mz9/wOgLNb//wWgTMZP+gugTKaP8j+hzPlf53+HMusVmL5Amf4CjP8vgFk8/w1Y/z8AM9m+MTDoO4OZ9j8YGOT/QKx1BnK/Qa0FAQOwtWAgALIWZCbz/w1AkgtsU/5XIHH/L1jvRyDxfgHYxE8gawvA9vyfALR2AojJ8b8AyYcA8501y2pZPeQAAAAASUVORK5CYII=", "x2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAEd3uIqqIRHdmVTO7zJlBOslLAAAAiklEQVQI12NABvHfQOT+TwIMDM7/NwCZ+t+BBOd/BQYGjv8JYBU/GBj8QfIQFeeB8mAVF8DyEBXOIHmICpA8VAVIHqoCJs/AaP+/AMpk/f9fEcpc/6//G4TFYq/IC1QBkV/ADVUx/x8DQ/43iLwhA4MQWAXP/wUMDFxgFf1fYX5h+W8CYgoDVSAAAKJWNNuYJXHeAAAAAElFTkSuQmCC", "c2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAA20lEQVQ4jb2UWxGDMBBFQx3EAhawgAUs1AIWsIAFLFAJWKASQMLpR8PMNmweDJneH2bYuyc7eVxj/iWgAwbOWoEeqHNBDbAoIE19DmwTDQPQeJ6nt+AQglkB23yQ4p8EtNMMY9QQH2DRiofmFEz0yUOzstBfmS6mh/vKK/AqCdyrqtqLAu/AJPA2KAS0IeNV4PsA/hx/AaAxxrS5zXwD5HzdgFoUxgtA+bqsX5xFMfqOs4bwDCuRvHNP9UicLej19gSUIHX/ZMTF9xxo3YQprUmYMsmkgEZSSV1SH1pMz61Hh0TYAAAAAElFTkSuQmCC", "c1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDE3OjA1OjM0KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDE3OjA1OjM0KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNzFkZTc1OS0wYWNjLTQ0MzMtOWZkNi01ZTkzYTcyNzYwNmIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3N2QzOWRmMy1iY2VkLTZmNDctYmIyNC03N2YwNDlkNGM4ZjkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphMDEyZmFiOC1jOTk1LTQyM2EtYmJkNC0xNDFlMWYxZGY3YjUiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkMiIHBob3Rvc2hvcDpMYXllclRleHQ9IkMiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmEwMTJmYWI4LWM5OTUtNDIzYS1iYmQ0LTE0MWUxZjFkZjdiNSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTcxZGU3NTktMGFjYy00NDMzLTlmZDYtNWU5M2E3Mjc2MDZiIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDE3OjA1OjM0KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6KO5bnAAACsklEQVRo3u2bMWsiQRTHNVdoZ2GRJoUf4OCakDs5EWN3TVIkTQqbdKn9DH6AK6xSXCFXJBCQsCSNJiSNcKlEUgRJCg9z1RmOg3h3IO/2LwibMDu7s866+2QG/iC46vvte/PmzZs1QUSJZVXCwHGHc4wDWye22swEm/cAIIJL2fqSyWQon89TuVxmpUKhQOl0GiBfRXAH2WyWer0ecR2WZVEqlXoWwZ2AnvsoFos/RXCXcC/3sbW1LYRrGzgDF93Y2dk1cAYuyBgOh9RqtahareKHX6hUKk3fG4/HvOA6nY4QSCRA9vv9+MPBEzDWD9RrwcuxhIOngkLNVKlU4gU3Go2oVqvNBeUUPB8LOISRirfq9frUeNnNwDyNHA4JQMUbzoyI1243JXI4vx5rNpuu39HtduMZlpj4MijcfT+ZD/MVMDOpLgfa4WCEDAzziWWFIpsriwbTDifzGkI1aBkVCziZ15Ag2BbObtktinDUDoe07gaH0os1nKzCX/Rc0woH43WUS7GEw2IrqxeXFq7RaBg4E5ZRZculTSheOwF4ljUcwk9Ha0DWc1Et4bTBeRXNunbxKlGgDU62kKt4D98jC3GVDavWXQHSvgzQT1h5NWpVepda4WRLglcRjc96gakuK9rbDLLdgXML5IT0ak0E3eyG0iDyewYQZis9NDiEmFcHTEVB94OhNWX9zCE/mqc9EfpZgVcGnbe3GSnczIt+Es0scehqSyz8fO51F9kp3e0IcyZu4AzcYofrE0R4znIymbAF+/P3H61/KAnhLt6+e09XN490P3ii7z9+0eCRh2ArbIbtbnBtwJ1e3NPx2S1LnV8PXOHquVxuCoeLrMsHVoLNR1aXVlfXnkRwG8lk8vf27j59PrRY6mPxE62svBF6DmPT1h0u4Cjb9m9gIPOnCeb6DwvtDobkqVlyAAAAAElFTkSuQmCC", "x1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjE0OjI4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjE0OjI4KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowZTU3MGQwMy1lN2I4LTRkMGMtODI2My1lOTIwZTNlOWYzYTMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyMGFjZTE0Yy01MzZjLWFmNDQtOGEyYS1jYzRhNjI1MDMwOTQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplMjNlZTE3YS03Nzg2LTQyMzQtYWExYy1kMDg4YjUxMmYxM2UiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlgiIHBob3Rvc2hvcDpMYXllclRleHQ9IlgiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmUyM2VlMTdhLTc3ODYtNDIzNC1hYTFjLWQwODhiNTEyZjEzZSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MGU1NzBkMDMtZTdiOC00ZDBjLTgyNjMtZTkyMGUzZTlmM2EzIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjE0OjI4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ueaRtAAAC8UlEQVRo3u2bv48SQRTH4Sygo6C4xoI/wMTG6BEJQTqbu+KusaCxu5q/gT/gCioLC2KhySXEbLSBu2hDohUhFoacBYazkosxETUhz/2aYDgyM29md3ZgzL7kVcfNvs++37uQIaLM/6qZFM53uBU5DvU01L5nCpsfAUAElwv1aaFQoHK5TPV63SutVCqUz+cB8kwEd1wsFmk0GpGvEgQB5XK5HyK4U9D7LtVq9asI7hzu9V329w+EcP0ULoXbnBweHqVwKVwSMhwOYdA/bTabNJvN3MCNx2NqNBrXDOj1elbAptPptXOX2mq13MDVarVYBqgEXhKdjZuZOBzCQ3TxVcD5fB4JDN6XnQtoJ55bD0mRIaaA3E0bDAbuck5lSBRAWTiahruVaonEl+WeqVHdbld5jm6ltNoKcFEuRNvttlHZX1fTKmy1z+kAwjOy/1V5X7eIJNrEdQBFHlDlGaBNwjHRCYXzAhSFSDfPog4FiY1fXJFZeoPLMy5PNzZbcoZz4Yu/Rx0CnAzOqkmDU3h/67cCLqdECq97s/KoqqFuu9haOJ0WEbWfbcWyqhOecfNsI3CY5HVC0jvP6WwOXuaczsbgZbVEA9YpIjbnSWdwXPnHaGV7E3ACB8N1CgeXj3HyLxE4ruSvz4zciBY1/6zDcYbKcknl6a3Y57gtQNWkueITZfWxBid7OmwSXtwZuo/0rMLpbN6627QqrHENk/0uNpxOLzOteKoW0ul03MFxJT9KrnBPnJ285YHXkhqCVeGp673E4BCqcccnWbg7ecsjC0skvo29TLYmOYNbhtCq2hTRzdO9hhfvxFdvnMkolr7wT+G2UKTfIML3LBeLhbdgP3/9pjt7NSHc2a3b9+jN+0u6mFzR5y/faHLph8JW2AzbZXB9wL08u6AXrz54qa/fTqRw7VKp9BcOHwrOP3mlsPl5MKTd3ZtXIri72Wz2+8HRYzp5Enip96sPaWfnhtBzkAehfsQHfNTQ9ndgoPRHE57rH9WFKPTxpl4tAAAAAElFTkSuQmCC", "e1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHUGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjRUMTU6MTY6NDIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDAwOjQyOjU1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDAwOjQyOjU1KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM2NTJkMzc5LTM5NzAtNGIwYi1hYmU2LWQ0N2M2NjJhMWI2NCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjQ4MjVhZWYzLTc1NTktYWE0ZC05YjQ5LTU2YWRhZTg3ZWMxZCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQyNDI1YmQ4LWM1ZmItNGY2ZC1hYzgyLTc0NzVkYjY4NWFhZCI+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iRSIgcGhvdG9zaG9wOkxheWVyVGV4dD0iRSIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDI0MjViZDgtYzVmYi00ZjZkLWFjODItNzQ3NWRiNjg1YWFkIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI0VDE1OjE2OjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmQ1MzJkZTItYTI0Zi00Y2Y0LWEwZDgtNTU1OThkYWU4OTM4IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI3VDIxOjAzOjAzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzY1MmQzNzktMzk3MC00YjBiLWFiZTYtZDQ3YzY2MmExYjY0IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDAwOjQyOjU1KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7EAGLvAAACCElEQVRo3u3bv0sCYRgHcK3h3BwcXBr8A4KWqCQ5LrcWHXRpcGlz9m/wD2i4qaFBGgoEiaMWf1CLUNMhDSE2GNqUEkFWIE/3GILIe6UvHq/v2/PAdzuO93N3vu9773v6AMCnanyEkx03UVknRScVyYJtPkAAC6c5OQkGgxCNRiEej0uVWCwGgUAAIacsXDYUCkGj0QBZy7Is0DTtnYUrol720nX9hYWr4e2VvRKJJBNXIRzhxFUqlSYc4f4Vrl6vQ7lcHiWfz+OJuVIqlWAwGIjHISiXy3FD3IIXRygOr/CiUZOZ9+4tFOclzDAMdXH4uAt9LE3T/LOR+HscdzKzptPpLEdv+Vuv2Ov15B4KCoUC4QhHOMIRjnA8uGazubDBWwiOJ4hUFocTZmVxP8v9iuJ4XlKlwOG5eJYXhODwTd2LVxsa5whHOMIRThncePI8fQ4cQqQaxOfdO8DzKjm3xGQyGXVxwjdCsHAK5cVd4+mMPNmfw45hlqX1WZbdefYIPMVNl23bnu4JCMWJKsIRbgnL9Qsi/M5yOBxKC/v4/ILNHYOJq65vbMP1XRda7T48Pb9CuytHsK3YZmy7G66CuItqC84v76XM1U3bFWdGIpERDg+yao9SBdt8ZtkQDq/1Wbgtv9//lkwfwtGxJWV29X1YWVll3jmsPScPeICMcdp+iwagP01Inm9S3HcJqVM7XAAAAABJRU5ErkJggg==", "z1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjE1OjM3KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjE1OjM3KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5MTU1NTNjYS1jYmU3LTQ3NjAtYTkyZi05ODAyZDIzMDYzMjUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjOTAxNGI4OC02YzkxLTVjNDMtOWQzYS0yMDUxOGU1YWQxYTciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5Mzc1Y2IyMi1lMzg2LTQ0MDAtYTgzMS1kMTE2Y2JiYmUyNDciPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IloiIHBob3Rvc2hvcDpMYXllclRleHQ9IloiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjkzNzVjYjIyLWUzODYtNDQwMC1hODMxLWQxMTZjYmJiZTI0NyIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTE1NTUzY2EtY2JlNy00NzYwLWE5MmYtOTgwMmQyMzA2MzI1IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjE1OjM3KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bafrLAAACYklEQVRo3u2bMUtCURTHtQbdHBxcGvwAQUtUkoi5teigS4NLW7OfwQ/Q4NTQIA0FgcSjFi1qEWoSaQipwdCmlAiyAjm9fyA0PLlPffdeT9wD/+3JO7/3zvmfe997+ojI91/lM3Dc4f7Enq1TWzVmQs47AHCCC9g6DIVCFIvFKJVKsVI8HqdgMAiQIye4vXA4TM1mk7iGZVkUCAQ+nOBOQc89EonEqxPcFW4v90inM45wNQNn4PRFNpszcAbOwHGC6/V6VCqV8CPpwnkGg4E6uGKxqARsJJxPGZxKMCifz6uDSyaTSuEKhYI6uHq9rhSu0WiodUuYSrVanVrlclkIhQpptVq8RgEuDPpI1Gc4jtWcg62LwNBjk9j/XMAhYSQuC0wrnGg+zgqmDU60ovECTAucyBnRg16AKYeD7YvsfhpX1A7nZthPOsfmAg5Ji8AAz24/1+l0hOvPSqXCb7PqZkjDOVnuxEVD2ktnVAqHUlPpjMrgRJY/6dZlbuBgICIwwLN8+qXTQKTCifpMtoFIg0MP6TYQKXBu5pkKA5ECJypHWSsQ6XBu1o1eCuXttgrYPXEeCSNHKhwMQgeY2+3RTHAwEh1gKE03I2XmslT1hufv6sbtSPHELdHgszxxFmnajax5+WjgDJyB8yzGfkGE7yyHwyFbsM+vb1rdSDrCXS6vrNP1XZce2316fnmjdpeHkCtyRu7j4GqAO7t8pJPze5a6uGmPhStFo9FfOBxkXT2xEnI+thoUiSz1neDW/H7/eya3S/sHFkttJrZpYWHR8c4htmw94ACOsnO/BQOZP00w1w/pYCnPFmtMbAAAAABJRU5ErkJggg==", "z2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAV0lEQVQ4jWNgoCX4//9/+X/ywF2YGUw0dSEp4P///6uQXFhOqWHIQbOKUsOMkcPu////gpQYJgg1BAaMKXXdaLiRZ+BouJFn4Gi4kWdg2n/ywSAssXEBAH+eg0ueO/IvAAAAAElFTkSuQmCC", "e2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAP0lEQVQ4jWNgoBX4//+/0n/ywF1kc5jo5UIXcs2hugtHDRyEBsIBBQlbaUBcOJqwRw0kBlCQsFESN+1cSC0AALGzz6TAgYHBAAAAAElFTkSuQmCC", "p2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAJFBMVEUAAAD///////////////////////////////////////////+0CY3pAAAAC3RSTlMAu3ci7t2qZhFEMydbwgUAAAA7SURBVAjXY0AGjLtBQBnB3D0BzAQSTLudYUyG6k1wJss2OJN1I5zJvQ2L2qbdEQhzF6DbBrafhkwEAABdtyRt666KIwAAAABJRU5ErkJggg==", "p1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDE3OjEzOjQ5KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDE3OjEzOjQ5KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNjVkZjA0Zi1lZjhkLTRhNzktYjEzMS0wMzBmNDQ4MDkyNjMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozMjJiMzhiOS01YmU2LWRlNDEtYmViYi02NWE3ZDJjNTRhZjQiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNjk4NjczNC1iODY1LTQwZDgtOTIyZi1lM2UyZjk0MTM4ZGEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlAiIHBob3Rvc2hvcDpMYXllclRleHQ9IlAiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmM2OTg2NzM0LWI4NjUtNDBkOC05MjJmLWUzZTJmOTQxMzhkYSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDY1ZGYwNGYtZWY4ZC00YTc5LWIxMzEtMDMwZjQ0ODA5MjYzIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDE3OjEzOjQ5KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4oCcRbAAACc0lEQVRo3u2bMUtjQRDHE69IuhQpbCzyAQQb8QwXQkxno4U2V6Sxs85nyAewSHXFFcFCQQjy0CZRtAloFcIVErSIxKuMyMHl7iDMvX8g8Irdzdu4SXbCDvy7fcv8dvbNzg7vRYgosqiKODjucAE79HXmq85M8PkrAERwMV/fE4kEpdNpyufzrJTJZCgejwPkWAR3mEwmqdVqEVfzPI9isdhvEdwZ6LlbNpt9FcFdI7zcbWdnVwhXd3AObn62t7fv4D5k3W6XarUaVatVTC4VxjQaDfvher3e0NlcLqcEEgnP4Fmr4BChQqGgDSNTsVgcLpIVcCbBRsKckwIag2u328bBghFkA4do4J2CKpVKqGeQjKyFw+qrksS4TArpbs+ZwIVddcyhyq6IsnVwOmm92Wwqo9fv9/nCwbCFZXMBnjUcxptILFbCqeYql8u84ZAVZXOVSqXFjRx7ONU7p3McWAmnqlF15rIOThU1CDcPlnBhSri5VCiqFQ8DF6a21DnAjcGNcwwZDlEJGsqoMK2HSc43o3DTuscFr0g6NSUbuLnfxMNuLbY9lHEpXFe6d7epwqnqQR1hF3wkWjOHQ7Yc9UxkMgU0czgTDVYH5+AcnIObuFvMBs7EgezgpgWHqn1ht6WsgEbvfxrVx8zhRr3+YFk1yT3MWjibzMFxNekXRPjOcjAYsAX78/cfrW/mhHBXq2uf6eb+hR47b/T88506LzwEX+EzfJfB1QF3fvVIpxc/WOrytiOFK6dSqSEcBnnXT6wEn0+8Ji0vr7yJ4Dai0eiv3f0DOvrmsdSX7DYtLX0SRg625esBAzjK9/0ODOR+mmCu/9PL+hRn8sU4AAAAAElFTkSuQmCC", "r1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjA4OjE2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjA4OjE2KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmNzQ4ZDFkNS0yZDI4LTQ5YzUtOTM0My00YTdlMTJjZWRjN2YiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyY2ZkNTBmYS00ZmIyLWMwNDItODU0NS0xN2I5Y2Y5NzU3NDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMTQwZDA0Yi1mYTgzLTQ4N2ItOThkNy02NmZhMDUwNzc1OWEiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlIiIHBob3Rvc2hvcDpMYXllclRleHQ9IlIiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxNDBkMDRiLWZhODMtNDg3Yi05OGQ3LTY2ZmEwNTA3NzU5YSIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Zjc0OGQxZDUtMmQyOC00OWM1LTkzNDMtNGE3ZTEyY2VkYzdmIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjA4OjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4NE4aJAAACqUlEQVRo3u2bv0tbURTHEx2SLUMGF4f8AYUuRQ2GELN10UGXDlm6OedvyB/QIZODQ+hQQQjloUuitEugnULoIEGHlOhkpBQaLYTT9xUsQe599937rr575B34bpfL+dwf555z8pIiotRLVSqB4w43Z7u+Dn11mQk+vwOACC7jaz+Xy1GxWKRqtcpKpVKJstksQD6K4Hbz+TwNBgPiap7nUSaT+SOCOwQ9dyuXy9ciuFNsL3fb3NwSwnUTuAQuPtve3kngjK3T6dyrXq9jYqEqlcr/cc7D9ft9ajabUhiVWq0WTadTt+AAVavVjKEe7+ZwOIwfDqvcaDSsQD1WlKNqBQ7H6CnAogJagdPZtYfAAeksyng8jgdOFTxwD4MCBO5qUDSFsICxwGFVEQCiOqbaSd0AYzVa2lj1oFPQbrd5w00mE+k8OLqs4WCy+4e7yx5OFn1fBJwsOLGHQ0SUzYNgwxouKCHQzVScgoPzQe8cIilLuF6v52aGEhUuTI4ZW25pAofAgYwjTNKsm5k8KxxC+EMlEJSD2oiQzw5nKpN7xgLORrPIOTjklSbBg83ORW0MOQ2HoGNj92J5CtByULUAAaibkTjzzsFx1bOg6r04naGoei8m1bdT6VdQiRP1vXMitwwDiPyTJVyYqoB9PRcGEGPYVuKqglWnaHWyQaQqhcIeT6twsofZpGwJ6jzHAie7M6aplKg5q5O5WP/ZGGF9/meqqCnU/Fy68yVfMyRwDpr0CyJ8ZzmbzdiC3d79pTdrFSHcyavXq/Tl+yWdj27o59UvGl3yEHyFz/BdBtcF3OeTczo4+sFSx19HUrhmoVC4h8Mg7/SCleDzJ69PS0vLNyK4lXQ6/Xtr5z192PNYar38lhYWFoU7B9vwdYYBHOX7/g0MlPxpgrn+AafWB7BCT9cPAAAAAElFTkSuQmCC", "r2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAmXci3UTuqohmVTMRzLuUfxe9AAAAWklEQVQI12NABvL/geCLDoQJBgEg5gcgwfQ/GcZk0P8EZ9p/hzP5/yFEfyDU/oIxT/wvgJv7EWHFlw0IKxwQ2n7DmfFfEeb+QjB/YmPyf0Iw/8KZbP8VkDwJANUMPVdpDW72AAAAAElFTkSuQmCC", "t2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAANklEQVQ4jWNgoBX4////zP+UASUGBgYGJpq5kIDrYWAmHjUMDAw0cOGogaMGjho4auCogTQCAPqnUSnS6OuqAAAAAElFTkSuQmCC", "v2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAEXeqzLtm7lUziN2ZIkRvsFDdAAAAlklEQVQI11WOyxGCQBBEG1Qsv2UGmMGSgSEsGUAKRqAZYAaEoCGY0rIq6GXsWfag79D1qqamZ/DDRkqQpewB61SnsgNMp9p6Rv5UNQNjpiPYIyOTWpfv1EQKIJUzyMGxoIfSvLj7CTr3LHgHXbOiugXdSp3wbOBUZHIZ9eomD4y0Q95FXfnGRU37qoy6EL4RsWyOGI9/vq0FLa/BeAznAAAAAElFTkSuQmCC", "t1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjExOjU4KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjExOjU4KzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNzY4YzMyNy1jMDc3LTRkMGYtYjcwNC00ZmNiZmIwYzc1YWUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYTQ4MmJmNi0wYTViLTlkNDAtODJmMy1lMThmYmUxYTM2NGYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMTg2Y2ZlNy1mYWJjLTQ0ZmMtYTU3NC1lZmI3NGU1MjZlM2QiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlQiIHBob3Rvc2hvcDpMYXllclRleHQ9IlQiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmYxODZjZmU3LWZhYmMtNDRmYy1hNTc0LWVmYjc0ZTUyNmUzZCIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDc2OGMzMjctYzA3Ny00ZDBmLWI3MDQtNGZjYmZiMGM3NWFlIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjExOjU4KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5LCyTqAAABuUlEQVRo3u3bv07CUBQGcMChbAwMLA48gImLURubprK5wACLA4sbM8/AAzh0cnBy0ITFNLrwJ7qQ6NQQB0NwgICTEGNi1IQce5yIuSUsXDjkO8m3FXp+vRc6nDZCRJF1TQQ46bipKgWpBqkLC/d8zAAVzghynkgkyDRNymQyomJZFsXjcYZcqHClZDJJ7XabpJbneWQYxqcKV2W99LJt+02Fa/LySq9sNqfE1YEDbnmVzxeAA25tcb7vk+M4/OGFhb+fz6MVNxgMFor6n9FopA/XarW04mq1mj4cbxWdOL6YWn9z5XJZC4zPs5R/S76ivGVmpVgsztxuszLvii3tVlCpVEJx4u9zwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccKuGc103dDwlHhc27pp3crPSOC6er03PADqdzkLOg7ExcMDprdAniPg5y8lkIhb29f1DO/uOEtfY2t6ju8chdXtj6r++U28oI9wr98y9h+HqjLtudOnq5klkbu97oTg3nU7/4fggr/kiKtzzpedTKrU5VuF2o9HoR65wQqdnnsgc2EcUi20oV47rMMgzHyAxQe8PbCC8NCE8vxr94ZG6f3eMAAAAAElFTkSuQmCC", "cursor": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAACAQMAAACaKJU/AAAAA1BMVEX///+nxBvIAAAACklEQVQI12OAAwAACgABaQY5MgAAAABJRU5ErkJggg==", "l2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAAOklEQVQ4jWNgoDX4//9/+X8EUPr//z8DIYwMmKjtoFEDRw0cNXDUwFEDIYCFgPxdIs1hhDGo7kKqAwAIACp3PRtNcwAAAABJRU5ErkJggg==", "l1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIyOjAzOjMxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIyOjAzOjMxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDphNDJhMGQyMC0yOTUzLTRjZDYtYTQzYi0wNzE3OTBlYjdjNTUiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNzhkMjNjNi01ZGFiLTQ1NDAtOTUxYS00ZDUyMTkxYjNiNWIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2MjE3MmY3MC1iYjkwLTRiNWUtODY1ZC1mZmVlMzQ5ZmVkMWYiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkwiIHBob3Rvc2hvcDpMYXllclRleHQ9IkwiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjYyMTcyZjcwLWJiOTAtNGI1ZS04NjVkLWZmZWUzNDlmZWQxZiIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YTQyYTBkMjAtMjk1My00Y2Q2LWE0M2ItMDcxNzkwZWI3YzU1IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIyOjAzOjMxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz58/ZX2AAABoklEQVRo3u3bMUvDQBQH8LYO6dYhQxeHfgDBRdRiCbGbSzu0i0MXt879JA5ODk4OCoUgQZe0RZeCTiE4SKlDhTrZIoJVoTzzOkiRy2Kjzav/B38IueN4Pw4CIZcYEcUWNTHgpOOmquqn7qchLNzzLgNUOM3PUSqVomw2S/l8XlRyuRwlk0mGHKtwVV3XyfM8klq2bZOmaa8qXJ310sswjCcVrsXbK70KhaIS1wAOuPlVqVQGDriFx7muS6Zp8iKT8DXfE48bDAZfqO/hMdG4drsdiOMx4IADDjjggAMOOOCAA+4/4+bxTvdnuE6nAxxwwIWMcxwHOOCAAw444IJwP80s3xoij5tl58XgLMsC7tdwo9GIarVa6LBKpTJZe6646R0MM5F4WkatgAMughV4gojPWY7HY7Gwt/cPWts0lbjmyuoGXd70qdsb0sPjM/X6MsK9cs/cexCuwbizZpdOz29F5uKqF4g7yGQyExxPslv3osI9n9gupdPLQxVuPR6PvxTLe7R/aIvMlrFDicSScue4tv3c8QSJ8Xu/ZgPhpwnh+QQXoTF3HgMt6wAAAABJRU5ErkJggg==", "n1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHUGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjRUMTU6MTY6NDIrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDAwOjQxOjEyKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDAwOjQxOjEyKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdhMjc5MWI2LTMxYWQtNDRhZC05ZWE3LWM1NzE3YmMxZmE3ZSIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmUzZmYzZmExLTRkMTgtNzY0ZC05NWVhLTZjYWZlYzdhOGZhZiIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmQyNDI1YmQ4LWM1ZmItNGY2ZC1hYzgyLTc0NzVkYjY4NWFhZCI+IDxwaG90b3Nob3A6VGV4dExheWVycz4gPHJkZjpCYWc+IDxyZGY6bGkgcGhvdG9zaG9wOkxheWVyTmFtZT0iTiIgcGhvdG9zaG9wOkxheWVyVGV4dD0iTiIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDI0MjViZDgtYzVmYi00ZjZkLWFjODItNzQ3NWRiNjg1YWFkIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI0VDE1OjE2OjQyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NmQ1MzJkZTItYTI0Zi00Y2Y0LWEwZDgtNTU1OThkYWU4OTM4IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI3VDIxOjAzOjAzKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2EyNzkxYjYtMzFhZC00NGFkLTllYTctYzU3MTdiYzFmYTdlIiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDAwOjQxOjEyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5x4ifjAAACeUlEQVRo3u2bMUsCYRjHtQbdHBxaGvwAQUtUkoi5tdRQS4NLm7OfwQ/Q4NTQIA0FgcRRixa1CDWJNITYYGhTRgRZgTzdP7hQed+797Sue477w3/wOI7nd/fe8z7P+54BIgp41QEfjjvcgLK6j3VXmBkxbwNABBfSvR+JRCgej1M6nWblRCJB4XAYIAciuGw0GqV6vU5cpWkahUKhNxHcMei5K5lMPongLvB4uWt9fUMIV/HhfLj/0+bmlg/nw/2FCoUCAvoxfvd6Pefg2u025XK5oSCKxaJyEDKVy+Whaw5e2zG4fD4vDALHJ1EmkxFeF8cdgxMFYPcus4SDMbw8CwfXajXvwqVSqe/E40k4Iyg7GZQVnN0Myg4OLpVK3oWDq9Wqd+FgqwTDGg5BdrtdnnBIHrLSzDBqUrZwSP2yIK0SjNkTdwWc0TWMU6JNOp04AmfWvpglGDZwosbTqoJhBafy/uEGsISDkPpRRKt0EOzgIARv1UE0Gg2ecBDSv9X7pzJ0XQlnNklb2dEFonHhVOY/tnCq8x9bOLOlwUn7QVfAqUwP46ymuQIOQvPqWTg7w5MlnOrwVFmicB2cavZkCweN7hiNGqUZWzizutJxONmdVq0BRcJELYNzdPNRVuXb3RsYTS6i2lN1Av/VbWOAIBkYNluys5tgDNvdKfI3/H04F0r6BRG+s+z3+2zB3j8+aWE5JYQ7n5tfosubDjVbz/Tw+EKtDg8jVsSM2GVwFcCdnDfp6PSWpc+uWlK4QiwW+4bDSdrFPSsj5kOtRjMzs88iuMVgMPi6sbVDu3saS68k12hqalr45KBV3Xc4gaP12K/BQP6fJpj7C1vWl365n642AAAAAElFTkSuQmCC", "n2": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAZt137pnMMxEiu6qIVURnvQeLAAAAZUlEQVQI12NABvofQSQ/iNT/0gBn/g+AM/2/w5mHvsGZtv8FYEyD/R5w5pSvcCbz/wIYk0E/Ac58/xHOZP3SAGNy+gfAmAz23+FMtm9wJvt/eRiTId4fzmz5D2cyIpgM64FMBAAAuMgxyXTSP/0AAAAASUVORK5CYII=", "b1": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA8CAYAAADCHCKFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGvWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjhUMDA6NDQ6MDgrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI4VDIxOjU4OjQxKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI4VDIxOjU4OjQxKzA4OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MmRhZmRiOS1jOTU3LTQ0ZjktYjM5YS1iNWIyNjE0ZmY4NzciIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDplMWMxNmIzZC0xMWNkLWRjNDEtYjcyYi0yN2FiYjI5MGZiYzIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmYjBkM2UwOS02NjU0LTRjMDYtOGZjZC1hMTBiZDFmMWE2NDAiPiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IkIiIHBob3Rvc2hvcDpMYXllclRleHQ9IkIiLz4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpUZXh0TGF5ZXJzPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmZiMGQzZTA5LTY2NTQtNGMwNi04ZmNkLWExMGJkMWYxYTY0MCIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yOFQwMDo0NDowOCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTJkYWZkYjktYzk1Ny00NGY5LWIzOWEtYjViMjYxNGZmODc3IiBzdEV2dDp3aGVuPSIyMDE4LTEyLTI4VDIxOjU4OjQxKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5X6uPsAAACh0lEQVRo3u2bv2oiURTGNSm0s7CwSeEDBNIsm0hEjF2apEiaLWy2s/YZfIAUVilSyBYbECQMu40m7DZCthLZYpGkcNFUUUIgJgE5mU8YmOLOXGccnXvkHviq0eH8vOeeP3PHCBFF1lURDccdzmYlU3VTLWaCz18AIIKLmbpIJBKUyWSoUCiwUjabpXg8DpBvIrhSMpmkbrdLXM0wDIrFYi8iuDrouVsul3sUwd1gebnb0dGxEK6l4TRceHZycqrhNJyTjUYjajabM6FpEKlarc6uTyYT9eHgJJwtFouOQE6q1WqzH0RJuEaj4RlIpE6now7cYDDwtVJuarfb4cMhjPL5fKBglvCjhQrnlixEe0qWYOxCNLCAEyWKXq9H5XI58P0XGBxCxy+clV3dAJGkQk0oVj2rVCqe4awVdPoe7qlEKXALUVn9Wls4t5VDEmILJ9tzfuqdEnBIRm5gqJ9+es5Q4RCGCDdZhsX9lOktvRR0mTAtKNU4BwWHUF1kBFIaDqu2tnBWMgm9cV4WnAXoZ3hdOZw9883Trtn3H9sijtCTQXqdDJTrLZFEgioLysEhO7rtPdZwMLdWTMOpCofrQT1LUQpONvZ4nemUgcO8Jns0iCmCBdw85weLTge6/dKN85xdhhchO/oFUxoOmXHRs7qlwM379FnU+SOkgzibW+rhoz0byrQs02fiGk7DrdYc3yDCe5bT6ZQt2OvbO33aywvhrrd3dunXnyHd9cf0/+GJ+kMegq/wGb47wbUAd3V9R5c//rLUz999R7hqOp2eweFDxs09K8Hn70aHUqmtsQjuczQafT4+/Upn5wZL7ecOaWNjU7hysANT//ABjjJ9vwUD6T9NMNcHJ2VQzRoiIikAAAAASUVORK5CYII="}