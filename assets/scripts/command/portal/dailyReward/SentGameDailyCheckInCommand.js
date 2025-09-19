/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var SentGameDailyCheckInCommand;

    SentGameDailyCheckInCommand = (function () {
        function SentGameDailyCheckInCommand() {
        }

        SentGameDailyCheckInCommand.prototype.execute = function (controller) {
            var url = 'api/DailyQuest/UserCheckIn';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGameDailyCheckInResponse(obj, true);
            });
        };

        return SentGameDailyCheckInCommand;

    })();

    cc.SentGameDailyCheckInCommand = SentGameDailyCheckInCommand;

}).call(this);
