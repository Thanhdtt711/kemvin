/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetDayMissionCommand;

    GetDayMissionCommand = (function () {
        function GetDayMissionCommand() {
        }

        GetDayMissionCommand.prototype.execute = function (controller) {
            var url = 'api/DailyQuest/GetReward';

            var params = JSON.stringify({
                dailyQuestId: controller.dailyQuestId,
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetMissionRewardResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return GetDayMissionCommand;

    })();

    cc.GetDayMissionCommand = GetDayMissionCommand;

}).call(this);
