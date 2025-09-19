/**
 * Ket qua, effect ket qua,
 */


var taiXiuConfig = require('TaiXiuConfig');

(function () {
    cc.TaiXiuResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            soundDice: cc.AudioClip,
            soundWin: cc.AudioClip,
            //node ket qua
            nodeResult: cc.Node,
            //node 3 dice ket qua
            nodeResultDice: cc.Node,

            //bat de nan
            nodeBowl: cc.Node,

            //animation Dice
            animationDice: cc.Animation,
            //sprite 3 dice
            spriteDice1: cc.Sprite,
            spriteDice2: cc.Sprite,
            spriteDice3: cc.Sprite,

            //label tong diem cua 3 dice
            nodeBgTotalDice: cc.Node,
            lbTotalDice: cc.Label,

            //node effect bat len khi win
            nodeTaiWins: [cc.Node],
            nodeXiuWins: [cc.Node],

            //node Tai/Xiu tat di khi chay fx
            nodeTai: cc.Node,
            nodeXiu: cc.Node,

            //spriteFrame 6 dice
            sfDice1s: [cc.SpriteFrame],
            sfDice2s: [cc.SpriteFrame],
            sfDice3s: [cc.SpriteFrame],
            nodeDiceAnim: {
                default: null,
                type: cc.Node
             }
        },

        onLoad: function () {
            //setView
            cc.TaiXiuController.getInstance().setTaiXiuResultView(this);
            this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc

            this.animXocBat = this.nodeDiceAnim.getComponent(sp.Skeleton);

            this.reset();


            //touch bowl
            var self = this;

            this.isTouch = false;

            this.lastX = this.nodeBowl.x;
            this.lastY = this.nodeBowl.y;
            this.countTouch = 0;


            //this.node.opacity = 160;
            

            this.nodeBowl.on('touchstart', function () {
                //this.opacity = 255;
                 self.isTouch = true;
                 self.node.zIndex = cc.Config.getInstance().getZINDEX();
            }, this.nodeBowl);

            this.nodeBowl.on('touchmove', function (event) {
                
                if (self.isTouch) {
                    //this.opacity = 255;
                    
                    var delta = event.touch.getDelta();
                    self.countTouch ++;
                    this.x += delta.x;
                    this.y += delta.y;
                    // console.log('moveeee', this.x, this.y)
                    //240, -150
                    if(this.y >= 200  || this.y <= -200 || this.x > 200 || this.x < -200) {
                        self.isTouch = false
                        clearTimeout(self.timeOpenBowl)
                        self.moveBowl()
                    }
                }
            }, this.nodeBowl);

            this.nodeBowl.on('touchend', function (event) {
                
                if (self.isTouch) {
                    self.countTouch = 0;
                    self.lastX = this.x;
                    self.lastY = this.y;
                    self.isTouch = false;
                }
            }, this.nodeBowl);
        },
        moveBowl() {

            var vitri = ''
            if(this.nodeBowl.y > 0) {
                vitri = 'top'
            }
            if(this.nodeBowl.y < 0) {
                vitri = 'bot'
            }
            if(this.nodeBowl.x > 0) {
                vitri += 'right'
            }
            if(this.nodeBowl.x < 0) {
                vitri += 'left'
            }
            
            var toado = {
                'topleft': {x: -290, y: 345},
                'topright': {x: 450, y: 335},
                'botright': {x: 500, y: -386},
                'botleft': {x: -490, y: -380}
            }

            cc.tween(this.nodeBowl)
            .to(0.5, {position: new cc.Vec2(toado[vitri])})
            .call(() => {
                //tat node Dice Anim
                this.animationDice.node.active = false;

                //Bat node Dice Ket qua (3 Dice)
                this.nodeResultDice.active = true;

                //Bat node ket qua tong
                this.nodeBgTotalDice.active = true;
                this.lbTotalDice.node.active = true;

                //effect
                this.startEffectResult();
            })
            .start()
        },
        disableTouch: function () {
            this.isTouch = false;
        },

        onDestroy: function () {
            cc.TaiXiuController.getInstance().setTaiXiuResultView(null);
        },

        reset: function () {
            this.currentState = 999;
            this.resetUI();
        },

        resetUI: function () {
            //dang play anim dice?
            this.animationOpenPlaying = false;
            this.animationDice.stop();
            this.animationDice.node.active = false;
            this.nodeResult.active = false;
            this.nodeResultDice.active = false;
            this.nodeBowl.active = false;
            this.nodeDiceAnim.active = false;

            this.nodeBgTotalDice.active = false;
            this.lbTotalDice.node.active = false;

            //reset lai vi tri bowl
            this.nodeBowl.position = this.rootPasBowl;

            this.nodeTaiWins.forEach(function (nodeTaiWin) {
                nodeTaiWin.active = false;
            });
            this.nodeXiuWins.forEach(function (nodeXiuWin) {
                nodeXiuWin.active = false;
            });

            this.nodeTai.active = true;
            this.nodeXiu.active = true;
        },

        getIsBowl: function () {
            return this.nodeBowl.active;
        },

        updateResult: function (sessionInfo) {
            if (sessionInfo.CurrentState !== this.currentState) {
                //check state de xu ly hien thi
                switch (sessionInfo.CurrentState) {
                    case cc.TaiXiuState.BETTING: //54
                        //reset lai UI
                        this.resetUI();
                        break;
                    case cc.TaiXiuState.END_BETTING:
                        //Ko cho dat cuoc nua
                        //reset lai UI
                        this.resetUI();
                        break;
                    case cc.TaiXiuState.RESULT: //15
                        this.playAnimationAndSetResult(sessionInfo);

                        break;
                    case cc.TaiXiuState.PREPARE_NEW_SESSION:
                        //neu dang hien thi bat de nan -> tat bat di + play fx
                        if (this.nodeBowl.active) {
                            this.nodeBowl.active = false;
                            this.startEffectResult();
                            //hien effect
                        } else {
                            this.setResult(sessionInfo);
                        }
                        break;

                }
            }

            this.currentState = sessionInfo.CurrentState;
        },

        playAnimationAndSetResult: function (sessionInfo) {
            //tinh total Dice
            this.totalDice = sessionInfo.Result.Dice1 +  sessionInfo.Result.Dice2 + sessionInfo.Result.Dice3;

            //bat node Result
            this.nodeResult.active = true;

            //set thong so diem cua Dice
            this.lbTotalDice.string  = this.totalDice;

            //set ket qua vao sprite Dice
            this.spriteDice1.spriteFrame = this.sfDice1s[sessionInfo.Result.Dice1 - 1];
            this.spriteDice2.spriteFrame = this.sfDice2s[sessionInfo.Result.Dice2 - 1];
            this.spriteDice3.spriteFrame = this.sfDice3s[sessionInfo.Result.Dice3 - 1];

            //Tat node Dice Ket qua (3 Dice)
            this.nodeResultDice.active = false;

            //anim mới
            this.nodeDiceAnim.active = true;               
            this.animXocBat.__preload();

            //Bat node Dice Anim
            this.animationDice.node.active = true;
            this.animationDice.play('diceAnimNew'); //diceAnimationOld

            //danh dau la dang play
            this.animationOpenPlaying = true;

            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundDice, false, 1)
            // }
        },

        //chi bat ket qua xuc xac (che do Nan)
        setResultDice: function (sessionInfo) {
            //bat node Result
            this.nodeResult.active = true;

            //set ket qua vao sprite Dice
            this.spriteDice1.spriteFrame = this.sfDice1s[sessionInfo.Result.Dice1 - 1];
            this.spriteDice2.spriteFrame = this.sfDice2s[sessionInfo.Result.Dice2 - 1];
            this.spriteDice3.spriteFrame = this.sfDice3s[sessionInfo.Result.Dice3 - 1];

            //Bat node Dice Ket qua (3 Dice)
            this.nodeResultDice.active = true;
        },

        //goi set ket qua luon (ko chay animation dice)
        setResult: function (sessionInfo) {
            //neu dang play animation dice thi return luon. Ket qua se tu hien sau khi anim ket thuc
            if (this.animationOpenPlaying) return;

            //hien luon ket qua
            this.totalDice = sessionInfo.Result.Dice1 +  sessionInfo.Result.Dice2 + sessionInfo.Result.Dice3;

            //bat node Result
            this.nodeResult.active = true;

            //set thong so diem cua Dice
            this.lbTotalDice.string  = this.totalDice;

            //set ket qua vao sprite Dice
            this.spriteDice1.spriteFrame = this.sfDice1s[sessionInfo.Result.Dice1 - 1];
            this.spriteDice2.spriteFrame = this.sfDice2s[sessionInfo.Result.Dice2 - 1];
            this.spriteDice3.spriteFrame = this.sfDice3s[sessionInfo.Result.Dice3 - 1];

            //Bat node Dice Ket qua (3 Dice)
            this.nodeResultDice.active = true;

            //effect
            this.startEffectResult();
        },

        startEffectResult: function () {
            //Kiem tra xem ban nao thang
            if (this.totalDice > 10) {
                //TAI
                this.nodeTaiWins.forEach(function (nodeTaiWin) {
                    nodeTaiWin.active = true;
                });
                this.nodeXiuWins.forEach(function (nodeXiuWin) {
                    nodeXiuWin.active = false;
                });
                this.nodeTai.active = false;
            } else if (this.totalDice > 2 && this.totalDice <= 10) {
                //XIU
                this.nodeTaiWins.forEach(function (nodeTaiWin) {
                    nodeTaiWin.active = false;
                });
                this.nodeXiuWins.forEach(function (nodeXiuWin) {
                    nodeXiuWin.active = true;
                });
                this.nodeXiu.active = false;
            }
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundWin, false, 1)
            // }
        },

        //sau khi play xong animation Dice
        diceAnimFinish: function () {
            // anim mới xong
            this.nodeDiceAnim.active = false; 
            //dang mo bat de nan -> ko chay animation thang
            if (cc.TaiXiuController.getInstance().getIsNan()) {
                this.nodeBowl.active = true;

                //tat node Dice Anim
                this.animationDice.node.active = false;

                //Bat node Dice Ket qua (3 Dice)
                this.nodeResultDice.active = true;

                this.timeOpenBowl = setTimeout(() => {
                    this.moveBowl()
                }, 20000)
            } else {
                //tat node Dice Anim
                this.animationDice.node.active = false;

                //Bat node Dice Ket qua (3 Dice)
                this.nodeResultDice.active = true;

                //Bat node ket qua tong
                this.nodeBgTotalDice.active = true;
                this.lbTotalDice.node.active = true;

                //effect
                this.startEffectResult();
            }
        },
    });
}).call(this);
