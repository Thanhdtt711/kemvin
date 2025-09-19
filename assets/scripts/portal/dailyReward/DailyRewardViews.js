(function () {
    cc.DailyRewardViews = cc.Class({
        "extends": cc.Component,
        properties: {
            layoutNumber: cc.Node,
            nodeNotify: cc.Node,
            itemDate: cc.Prefab,
            lbNgay: [cc.Label],
            lbTienNgay: [cc.Label],
            sprNgay: [cc.Sprite],
            spr7Ngay: [cc.SpriteFrame],
            spr15Ngay: [cc.SpriteFrame],
            spr30Ngay: [cc.SpriteFrame],
            sprDaNhan: [cc.Sprite],

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_GIFTCODE;
            this.node.parent = cc.find('Canvas');
            this.RewardInfo = null;
        },

        onEnable: function () {
            var getGameDailyCheckInCommand = new cc.GetGameDailyCheckInCommand;
            getGameDailyCheckInCommand.execute(this);
        },

        onGetDailyRewardInResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);
            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        onGameDailyCheckInResponse: function (response, isShowMessage) {
            if (response.ResponseCode == 1) {
                this.fillDateChoose(response.Data.CheckDate);
                this.fillRewards(response.Data.RewardInfo);
                if (isShowMessage) {
                    cc.PopupController.getInstance().showMessage(response.Message);
                }
            }else{
                cc.PopupController.getInstance().showMessage(response.Message);
            }
        },

        fillDateChoose: function (CheckDate) {
            //Clear layout
            this.layoutNumber.removeAllChildren();
            // console.log('CheckDate', CheckDate)
            if (CheckDate) {
                for (let i = 0; i < CheckDate.length; i++) {
                    let item = cc.instantiate(this.itemDate);
                    item.getComponent('DailyRewardItemNumbers').init(CheckDate[i].Num, CheckDate[i].Checked);
                    item.parent = this.layoutNumber;
                }
            }
        },

        fillRewards: function (RewardInfo) {
            console.log(RewardInfo);
            if (RewardInfo) {
                this.RewardInfo = RewardInfo;
                for (let i = 0; i < RewardInfo.length; i++) {
                    let spriteFrameReward = this.spr7Ngay[0];
                    if (i == 0) {
                        spriteFrameReward = (RewardInfo[i].IsFinish) ? this.spr7Ngay[1] : this.spr7Ngay[0];
                    }
                    if (i == 1) {
                        spriteFrameReward = (RewardInfo[i].IsFinish) ? this.spr15Ngay[1] : this.spr15Ngay[0];
                    }
                    if (i == 2) {
                        spriteFrameReward = (RewardInfo[i].IsFinish) ? this.spr30Ngay[1] : this.spr30Ngay[0];
                    }
                    this.sprNgay[i].spriteFrame = spriteFrameReward;
                    this.lbNgay[i].string = RewardInfo[i].Description;
                    this.sprDaNhan[i].node.active = RewardInfo[i].IsReward;
                    this.lbTienNgay[i].string = cc.Tool.getInstance().formatNumber(RewardInfo[i].PrizeValue);
                }
            }
        },

        clickDiemDanh: function () {
            var sentGameDailyCheckInCommand = new cc.SentGameDailyCheckInCommand;
            sentGameDailyCheckInCommand.execute(this);
        },

        clickNhanThuong: function (event, customEventData) {
            if (this.RewardInfo != null) {
                let IsReward = false;
                let IsFinish = false;
                if (customEventData == 7) {
                    this.checkInRewardId = this.RewardInfo[0].ID;
                    IsReward = this.RewardInfo[0].IsReward;
                    IsFinish = this.RewardInfo[0].IsFinish;
                }
                if (customEventData == 15) {
                    this.checkInRewardId = this.RewardInfo[1].ID;
                    IsReward = this.RewardInfo[1].IsReward;
                    IsFinish = this.RewardInfo[1].IsFinish;
                }
                if (customEventData == 30) {
                    this.checkInRewardId = this.RewardInfo[2].ID;
                    IsReward = this.RewardInfo[2].IsReward;
                    IsFinish = this.RewardInfo[2].IsFinish;
                }
                //!IsReward && 
                if (IsFinish) {
                    var checkGameDailyCheckInCommand = new cc.CheckGameDailyCheckInCommand;
                    checkGameDailyCheckInCommand.execute(this);
                }
            }
        },

        securityClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createSecurityView(cc.AccountTab.SECURITY);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SETTING_SECURITY', cc.DDNAUIType.BUTTON);
            }
        },

        closeClicked: function () {
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDailyRewardView();
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
