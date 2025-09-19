/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.dayMissionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            dayMissionView: cc.dayMissionView,

            spriteIcon: cc.Sprite,
            spriteClaim: cc.Sprite,
            spriteX3: cc.Sprite,
            progressBar: cc.ProgressBar,
            btnClaim: cc.Button,

            lbProgress: cc.Label,

            lbRemaining: cc.Label,
            lbDescription: cc.Label,
            lbPrizeValue: cc.LabelIncrement,

            sfLogin: cc.SpriteFrame,
            sfTaiXiu: cc.SpriteFrame,
            sfXocXoc: cc.SpriteFrame,
            sfTLMN: cc.SpriteFrame,
            sfSlot: cc.SpriteFrame,
            sfNv7Ngay: cc.SpriteFrame,

            sfReceiveOn: cc.SpriteFrame,
            sfReceiveOff: cc.SpriteFrame,
            sfReceived: cc.SpriteFrame,
        },

        onLoad: function () {
            this.lbRemaining.node.active = false;
        },

        updateItem: function (controller, item) {
            this.controller = controller;
            this.item = item;

            if (item.IsFinish && !item.IsReward) {
                this.btnClaim.interactable = true;
                this.spriteClaim.spriteFrame = this.sfReceiveOn;
            } else {
                this.btnClaim.interactable = false;
                this.spriteClaim.spriteFrame = this.sfReceiveOff;
            }

            switch (item.MissionType) {
                case 1:
                    this.spriteIcon.spriteFrame = this.sfLogin;
                    break;
                case 2:
                    this.spriteIcon.spriteFrame = this.sfTaiXiu;
                    break;
                case 3:
                    this.spriteIcon.spriteFrame = this.sfNv7Ngay;
                    break;
            }

            switch (item.GameID) {
                case cc.GameId.TAI_XIU:
                    this.spriteIcon.spriteFrame = this.sfTaiXiu;
                    break;
                case cc.GameId.XOC_XOC:
                    this.spriteIcon.spriteFrame = this.sfXocXoc;
                    break;
                case 52:
                    this.spriteIcon.spriteFrame = this.sfTLMN;
                    break;
                case 55:
                    this.spriteIcon.spriteFrame = this.sfSlot;
                    break;
            }

            this.lbDescription.string = item.Description;
            this.lbPrizeValue.tweenValueto(item.PrizeValue);
            let Progress = parseInt(item.Step / item.TotalStep * 100);

            this.lbProgress.string = Progress + '%';
            var progress = Progress / 100;
            console.log(progress);
            this.progressBar.progress = progress;

        },

        claimClicked: function () {
            this.dayMissionView.claimReward(this.item);
        },

    });
}).call(this);
