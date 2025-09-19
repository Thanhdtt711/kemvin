/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BankTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbLoainhan: cc.Label, //loai nhan
            lbGiaTri: cc.Label, //gia tri
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);
        },

        updateItem: function (item, itemID) {
            // {
            //     "RequestID": 52,
            //     "StatusStr": "Chờ xử lý",
            //     "RequestType": 2,
            //     "Type": "Rút tiền ",
            //     "Code": null,
            //     "RequestDate": "2019-09-06T15:46:30.317",
            //     "AmountGame": 1000000
            // }
            //LoaiNhan: 99: Điểm danh, 98: Nhiệm vụ, 26: Giftcode
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.ThoiGian); //UpdateDate
            let loaiNhanlbl = "";
            if (item.LoaiNhan == 99) {
                loaiNhanlbl = "Điểm danh";
            }
            if (item.LoaiNhan == 98) {
                loaiNhanlbl = "Nhiệm vụ";
            }
            if (item.LoaiNhan == 26) {
                loaiNhanlbl = "Giftcode";
            }
            this.lbLoainhan.string = loaiNhanlbl;
            this.lbGiaTri.string = '+'+ cc.Tool.getInstance().formatNumber(Math.abs(item.SoKemNhan));

            // FAILED2: '-2', //Thất bại
            //     FAILED: '-1', //Thất bại
            //     PENDING: '0', //Chờ xử lý
            //     SUCCESS: '1', //Thành công
            //     PENDING_BANK: '3', //Chờ duyệt từ ngân hàng
            //     ADMIN_CANCEL: '4', //Admin huỷ giao dịch
            //     BANK_CANCEL: '5', //Ngân hàng từ chối giao dịch
            //Còn lại là thất bại

            // switch (item.Status.toString()) {
            //     //Thành công
            //     case cc.BankState.SUCCESS:
            //         this.lbGiaTri.node.color = cc.Color.GREEN;
            //         break;

            //     //Chờ xử lý
            //     case cc.BankState.PENDING:
            //     case cc.BankState.PENDING_BANK:
            //         this.lbGiaTri.node.color = cc.Color.ORANGE;
            //         break;

            //     //Thất bại
            //     case cc.BankState.FAILED:
            //     case cc.BankState.FAILED2:
            //     case cc.BankState.ADMIN_CANCEL:
            //     case cc.BankState.BANK_CANCEL:
            //         this.lbGiaTri.node.color = cc.Color.RED;
            //         break;

            //     //Thất bại
            //     default:
            //         this.lbGiaTri.node.color = cc.Color.RED;
            //         break;
            // }

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
