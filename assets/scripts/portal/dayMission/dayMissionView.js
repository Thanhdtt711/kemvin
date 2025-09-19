/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.dayMissionView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParent: cc.Node,
            nodeItemTemp: cc.Node,
        },

        onLoad: function () {
            cc.MissionController.getInstance().setMissionView(this);

            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);

            this.items = [];
            this.duration = 10;
        },

        onEnable: function () {
            this.animation.play('openPopup');
            this.refreshMissionInfo();
        },

        getMission: function () {
           
        },

        refreshMissionInfo: function () {
            var sentDayMissionCommand = new cc.SentDayMissionCommand;
            sentDayMissionCommand.execute(this);
        },

        claimReward: function (item) {
            this.dailyQuestId = item.DailyQuestConfigId;
            var getDayMissionCommand = new cc.GetDayMissionCommand;
            getDayMissionCommand.execute(this);
        },

        onGetMissionRewardResponse: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);
            this.refreshMissionInfo();
            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        onGetDayMissionResponse: function (response) {
            console.log(response);
            var self = this;
            if(response.ResponseCode == 1){
                var listItems = response.Data;
                if (this.items.length === 0) {
                    //tao moi
                    listItems.forEach(function (item) {
                        var nodeItem = cc.instantiate(self.nodeItemTemp);
                        self.nodeParent.addChild(nodeItem);
                        nodeItem.getComponent(cc.dayMissionItem).updateItem(this, item);
                        self.items.push(nodeItem);
                    })
                } else {
                    for (var i = 0; i < listItems.length; i++) {
                        this.items[i].getComponent(cc.dayMissionItem).updateItem(this, listItems[i]);
                    }
                }
            }else{
                cc.PopupController.getInstance().showMessage(response.Message);
            }
        },

        closeFinished: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyDailyMissionView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
