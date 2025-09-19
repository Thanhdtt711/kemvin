

(function () {
    var MPGetTopCommand;

    MPGetTopCommand = (function () {
        function MPGetTopCommand() {
        }

        MPGetTopCommand.prototype.execute = function (controller, type) {
            var url = 'api/xpoker/GetBigWinner?top=50&type=' + type;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.MINI_POKER, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onMPGetTopResponse(obj);
            });
        };

        return MPGetTopCommand;

    })();

    cc.MPGetTopCommand = MPGetTopCommand;

}).call(this);
