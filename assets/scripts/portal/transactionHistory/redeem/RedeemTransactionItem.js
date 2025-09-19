/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.RedeemTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbCardType: cc.Label, //Loai the
            lbCardValue: cc.Label, //Menh gia
            lbValue: cc.Label, //B Doi
            lbState: cc.Label, //Trang Thai

            nodeButtonOpen: cc.Node,
            nodeButtonCancel: cc.Node,

            popupBoxDetail: cc.Node,
            lbBoxDetail: cc.RichText,
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);

            this.lbValue.node.color = cc.Color.YELLOW;
            this.lbCardValue.node.color = cc.Color.YELLOW;
        },

        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.ThoiGian);
            this.lbCardType.string = cc.Config.getInstance().getCardTypeByCode(item.KieuRut);
            this.lbCardValue.string = cc.Tool.getInstance().formatNumber(item.MenhGia);
            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.SoKemRut);
            let lbStateTxt = "";
            if (item.KieuRut == "VNP" || item.KieuRut == "VMS"|| item.KieuRut == "VTT"){
                if (item.TrangThai == 0) {
                    this.lbState.node.color = cc.Color.RED;
                    lbStateTxt = "Thất bại";
                }
                
                if (item.TrangThai == 1) {
                    this.lbState.node.color = cc.Color.GREEN;
                    lbStateTxt = "Thành công";
                }
                if (item.TrangThai == 2) {
                    this.lbState.node.color = cc.Color.ORANGE;
                    lbStateTxt = "Chờ duyệt";
                }
                
            }else{
                this.lbCardType.string = "Banking"
                if (item.TrangThai == 0) {
                    this.lbState.node.color = cc.Color.ORANGE;
                    lbStateTxt = "Chờ duyệt";
                }
                if (item.TrangThai == 1) {
                    this.lbState.node.color = cc.Color.GREEN;
                    lbStateTxt = "Thành công";
                }
                if (item.TrangThai == -2) {
                    this.lbState.node.color = cc.Color.RED;
                    lbStateTxt = "Thất bại";
                }
            }
            

            this.lbState.string = lbStateTxt;

            // switch (item.Status.toString()) {
            //     case cc.RedeemState.SUCCESS:
            //         this.nodeButtonOpen.active = true;
            //         this.nodeButtonCancel.active = false;
            //         break;
            //     case cc.RedeemState.PENDING:
            //         this.nodeButtonOpen.active = false;
            //         this.nodeButtonCancel.active = true;
            //         break;
            //     case cc.RedeemState.CANCEL:
            //         this.nodeButtonOpen.active = false;
            //         this.nodeButtonCancel.active = false;
            //         break;
            // }

            this.trangThai = lbStateTxt;
            this.item = item;
            this.itemID = itemID;
        },

        onCancelCardResponse: function (response) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().showMessage(response.Message);
            //refresh lại list
            cc.HistoryController.getInstance().refreshRedeemTransactionList();
        },

        onCancelCardResponseError: function (response) {
            cc.PopupController.getInstance().hideBusy();
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        openInboxClicked: function () {
            cc.LobbyController.getInstance().createAccountView(cc.AccountTab.INBOX);
        },

        //huy doi the
        cancelClicked: function () {
            cc.PopupController.getInstance().showBusy();
            var cancelCardCommand = new cc.CancelCardCommand;
            cancelCardCommand.execute(this, this.item.UserCardSwapID);
        },

        
        onClickBoxDetail: function () {
            //mã gia dịch, mã thẻ, seri, mạng, mệnh giá
            cc.log(this.item)
            let maGiaoDich = this.item.MaGD;
            let maThe = this.item.MaThe;
            let seri = this.item.Serial;
            let mang = cc.Config.getInstance().getCardTypeByCode(this.item.KieuRut);
            let menhGia = cc.Tool.getInstance().formatNumber(this.item.MenhGia);
            if (this.item.KieuRut == "VNP" || this.item.KieuRut == "VMS"|| this.item.KieuRut == "VTT"){
                if (this.item.TrangThai == 1){
                    this.lbBoxDetail.string = 'Nhà Mạng: ' + mang
                                         + '\nMã Thẻ: '+maThe
                                         + '\nSeri: '+seri
                }else if (this.item.TrangThai == 2){
                    this.lbBoxDetail.string = 'Chờ Duyệt'
                }else{
                    this.lbBoxDetail.string = 'Yêu cầu đổi thẻ bị từ chối.\n Đã hoàn Kem'
                }
            }else{
                if (this.item.TrangThai == 1){
                    this.lbBoxDetail.string = 'Rút '+menhGia+' '+this.item.KieuRut+' thành công'
                }else if (this.item.TrangThai == -2){
                    this.lbBoxDetail.string = 'Yêu cầu rút '+this.item.KieuRut+' bị từ chối.\n Đã hoàn Kem'
                }else{
                    this.lbBoxDetail.string = 'Chờ Duyệt'
                }
                //this.lbBoxDetail.string = this.item.NoiDung;
            }
            

            this.popupBoxDetail.active = true;
        },

        onCloseBoxDetail: function () {
            this.popupBoxDetail.active = false;
        }
    });
}).call(this);
