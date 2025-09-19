/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetGameDailyCheckInCommand;

    GetGameDailyCheckInCommand = (function () {
        function GetGameDailyCheckInCommand() {
        }

        GetGameDailyCheckInCommand.prototype.execute = function (controller) {
            var url = 'api/DailyQuest/GetCheckInStatus';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGameDailyCheckInResponse(obj, false);
            });
        };

        return GetGameDailyCheckInCommand;

    })();

    cc.GetGameDailyCheckInCommand = GetGameDailyCheckInCommand;

}).call(this);
