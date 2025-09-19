/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.MomoView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeActive: cc.Node,
            nodeDeActive: cc.Node,
            nodeInput: cc.Node,
            nodeInfo: cc.Node,

            editBoxValue: cc.EditBox,

            lbMoMoName: cc.Label,
            lbMoMoPhone: cc.Label,
            lbMoMoContent: cc.Label,

            lbMoMos: [cc.Label],
            lbCoins: [cc.Label],

            nodeRates: [cc.Node],
            lbColCoin: cc.Label,
            lbRule: cc.Label,
            lbType: cc.Label,
            lbTest: cc.Label,
        },

        onLoad: function () {
            //this.lbTest.string = '1.0.1';
            this.nodeInfo.active = true;
            this.nodeInput.active = false;
            this.lbColCoin.string = cc.Config.getInstance().currency() + ' nhận';
            this.ChargeType = this.lbType.string
            this.lbRule.string = 'Lưu ý:\n' +
                '- Nhập SAI: Số điện thoại, nội dung chuyển khoản sẽ không nhận\n' +
                'được ' + cc.Config.getInstance().currency() + '\n' +
                '- Chỉ chuyển khoản tối thiểu 10.000.\n' +
                '- Kiểm tra nội dung chuyển khoản trước khi thực hiện chuyển khoản.\n' +
                '- Hệ thống sẽ tự động cộng ' + cc.Config.getInstance().currency() + ' trong vòng 3 phút kể từ khi nhận \n' +
                'được tiền trong tài khoản MoMo';
                var GetListMomoInfoCommand = new cc.GetListMomoInfoCommand;
                GetListMomoInfoCommand.execute(this);
        },

        onEnable: function () {
            this.nodeRates.forEach(function (nodeRate) {
                nodeRate.active = false;
            });
            if (this.ChargeType == 'VETTELPAY'){
                this.nodeActive.active = false;
                this.nodeDeActive.active = true
            }
            // this.nodeInfo.active = false;
            // this.nodeInput.active = true;
            // this.editBoxValue.placeholder = 'Số VNĐ bạn muốn nạp';

        },

        onDisable: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        onDestroy: function () {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        onGetListMomoResponse: function (response) {
            var rate = response.Orders.Rate
            
            this.lbMoMoName.string = response.Orders.WalletAccount;
            this.lbMoMoPhone.string = response.Orders.WalletAccountName;
            this.lbMoMoContent.string = response.Orders.Message; 
            if (this.ChargeType == 'VETTELPAY'){
                this.nodeActive.active = false;
                this.nodeDeActive.active = true
            }else{
                this.nodeActive.active = true;
                this.nodeDeActive.active = false;
            }
            
        },

        onGetListMomoResponseError: function (response) {
            this.nodeActive.active = false;
            this.nodeDeActive.active = true;
        },

        copyMoMoAccountClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoName.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
            }
        },

        copyMoMoContentClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoContent.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },

        topupClicked: function () {
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.ChargeType = this.lbType.string
            if (this.editBoxValue.string === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tiền muốn nạp.');
                return;
            }
            this.nodeInput.active = false;
            this.nodeInfo.active = true;
            var getListMomoCommand = new cc.GetListMomoCommand;
            getListMomoCommand.execute(this);
        },

    });
}).call(this);
