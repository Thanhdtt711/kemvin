/**
 * Created by Nofear on 3/15/2019.
 */

//He so SPIN
(function () {
    cc.CoefficientView = cc.Class({
        "extends": cc.Component,
        properties: {
            //skeletonX: sp.Skeleton,
            spriteEnable: [cc.Sprite],
            spriteDisable: [cc.Sprite],
        },

        onLoad: function () {
            this.spriteEnable.forEach(element => {
                element.node.active = false;
            });
            this.spriteDisable.forEach(element => {
                element.node.active = true;
            });
            cc.CoefficientController.getInstance().setCoefficientView(this);
        },

        setMultiplier: function (multiplier) {
            console.log('multiplier', multiplier)
            let name = 'x' + multiplier;
            let index;
            switch (multiplier) {
                case 0:
                case 1:
                    index = 0;
                    break;
                case 2:
                    index = 1;
                    break;
                case 3:
                    index = 2;
                    break;
                case 4:
                    index = 3;
                    break;
                case 5:
                    index = 4;
                    break;
                case 10:
                    index = 5;
                    break;
            }
            for (let index = 0; index < this.spriteDisable.length; index++) {
                const element = this.spriteEnable[index];
                element.node.active = false;
            }
            
            for (let i = 0; i <= index; i++) {
                this.spriteEnable[i].node.active = true;
            }

            //this.skeletonX.clearTracks();
            //this.skeletonX.setAnimation(index, name, true);
        },


    });
}).call(this);
