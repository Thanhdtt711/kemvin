/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListMomoInfoCommand;

    GetListMomoInfoCommand = (function () {
        function GetListMomoInfoCommand() {
        }

        GetListMomoInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Momo/GetInfor?type='+controller.ChargeType.toLowerCase();

            //var params = JSON.stringify({ type:"MOMO" });

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
            
                    return controller.onGetListMomoResponse(obj);
                } else {
                    return controller.onGetListMomoResponseError(obj);
                }
            });
        };

        return GetListMomoInfoCommand;

    })();

    cc.GetListMomoInfoCommand = GetListMomoInfoCommand;

}).call(this);
