/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var UpdateDayMissionCommand;

    UpdateDayMissionCommand = (function () {
        function UpdateDayMissionCommand() {
        }

        UpdateDayMissionCommand.prototype.execute = function (controller) {
            var url = 'api/DailyQuest/UpdateDailyOnlineQuest';

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onUpdateDayMissionResponse(obj);
            });
        };

        return UpdateDayMissionCommand;

    })();

    cc.UpdateDayMissionCommand = UpdateDayMissionCommand;

}).call(this);
