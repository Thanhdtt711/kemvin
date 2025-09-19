/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.MissionView = cc.Class({
        "extends": cc.Component,
        properties: {
        },

        onLoad: function () {
            cc.MissionController.getInstance().setMissionView(this);
            this.sentMission();
        },

        sentMission: function () {
            if (this.action && !this.action.isDone()) {
                this.nodeContent.stopAction(this.action);
                this.unscheduleAllCallbacks();
            }

            var SentDayMissionCommand = new cc.SentDayMissionCommand;
            SentDayMissionCommand.execute(this);
        },

        onGetMissionResponse: function (response) {
            console.log(response);
        },
    });
}).call(this);
