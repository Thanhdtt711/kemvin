/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var MissionController;

    MissionController = (function () {
        var instance;

        function MissionController() {

        }

        instance = void 0;

        MissionController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        MissionController.prototype.setMissionView = function (missionView) {
            return this.missionView = missionView;
        };

        MissionController.prototype.onGetMissionResponse = function (Response) {
            if (this.missionView !== null && this.missionView !== undefined)
                return this.missionView.onGetMissionResponse(Response);
            else
                return null;
        };
        return MissionController;

    })();

    cc.MissionController = MissionController;

}).call(this);
