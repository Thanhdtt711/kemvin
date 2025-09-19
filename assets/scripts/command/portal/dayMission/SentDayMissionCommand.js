/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var SentDayMissionCommand;

    SentDayMissionCommand = (function () {
        function SentDayMissionCommand() {
        }

        SentDayMissionCommand.prototype.execute = function (controller) {
            var url = 'api/DailyQuest/GetDailyQuestStatus';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetDayMissionResponse(obj);

                // if (obj.ResponseCode === 1) {
                //     return controller.onGetDayMissionResponse(obj);
                // } else {
                //     cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                // }
            });
        };

        return SentDayMissionCommand;

    })();

    cc.SentDayMissionCommand = SentDayMissionCommand;

}).call(this);
