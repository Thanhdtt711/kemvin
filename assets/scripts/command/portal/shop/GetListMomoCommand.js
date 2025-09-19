/**
 * Created by Nofear on 3/19/2019.
 */

(function () {
    var GetListMomoCommand;

    GetListMomoCommand = (function () {
        function GetListMomoCommand() {
        }

        GetListMomoCommand.prototype.execute = function (controller) {
            var url = 'api/Momo/CreateDeposit';

            var params = JSON.stringify({ ChargeType: controller.ChargeType, Amount: controller.amount });
            cc.log(params);
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onGetListMomoResponse(obj);
                } else {
                    return controller.onGetListMomoResponseError(obj);
                }
            });
        };

        return GetListMomoCommand;

    })();

    cc.GetListMomoCommand = GetListMomoCommand;

}).call(this);
