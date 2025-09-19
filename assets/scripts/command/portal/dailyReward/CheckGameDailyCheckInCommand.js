/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var CheckGameDailyCheckInCommand;

    CheckGameDailyCheckInCommand = (function () {
        function CheckGameDailyCheckInCommand() {
        }

        CheckGameDailyCheckInCommand.prototype.execute = function (controller) {
            var url = 'api/DailyQuest/GetCheckInReward';
            var params = JSON.stringify({
                checkInRewardId: controller.checkInRewardId
            });
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetDailyRewardInResponse(obj);
            });
        };

        return CheckGameDailyCheckInCommand;

    })();

    cc.CheckGameDailyCheckInCommand = CheckGameDailyCheckInCommand;

}).call(this);
