/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopupTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTime: cc.Label,
            lbInfoKieurut: cc.Label, //Thong tin Nap
            lbInfoMenhGia: cc.Label, //Gia tri
            lbValueKemRut: cc.Label, //Gia tri
            lbState: cc.Label, //Trang thai
            btKhieuNai: cc.Node, //Khieu nai
            popupDetail: cc.Node,
            lbDetail: cc.RichText,
        },

        onLoad: function () {
            // this.sprite = this.node.getComponent(cc.Sprite);

            this.lbInfoMenhGia.node.color = cc.Color.YELLOW;
            this.lbState.node.color = cc.Color.GREEN;
        },

        updateItem: function (item, itemID) {
            // this.sprite.enabled = itemID % 2 === 0;
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.ThoiGian); //UpdateDate\
            let lbKieurut;
            let lbStateTxt = "";
            if (item.KieuNap == "1" || item.KieuNap == "2" || item.KieuNap == "3"){
                if (item.KieuNap == "1") {
                    lbKieurut = "Viettel";
                } else if (item.KieuNap == "2") {
                    lbKieurut = "Vinaphone";
                } else if (item.KieuNap == "3") {
                    lbKieurut = "Mobifone";
                }
                if (item.TrangThai == 0) {
                    this.lbState.node.color = cc.Color.ORANGE;
                    lbStateTxt = "Chờ duyệt";
                }
                if (item.TrangThai == 1 || item.TrangThai == 2) {
                    this.lbState.node.color = cc.Color.GREEN;
                    lbStateTxt = "Thành công";
                }
                if (item.TrangThai == -2) {
                    this.lbState.node.color = cc.Color.RED;
                    lbStateTxt = "Thất bại";
                }
            }else{
                lbKieurut = item.KieuNap;
                if (item.TrangThai==0){
                    this.lbState.node.color = cc.Color.ORANGE;
                    lbStateTxt = "Chờ Nạp";
                }else if (item.TrangThai==-2){
                    this.lbState.node.color = cc.Color.RED;
                    lbStateTxt = "Thất bại";
                }else{
                    this.lbState.node.color = cc.Color.GREEN;
                    lbStateTxt = "Thành công";
                }
                
            }
            this.lbState.string = lbStateTxt;
            this.lbInfoKieurut.string = lbKieurut;
            this.lbInfoMenhGia.string = cc.Tool.getInstance().formatNumber(item.SoKemNap);
            this.lbValueKemRut.string = cc.Tool.getInstance().formatNumber(item.MenhGia);
            
            this.trangThai = lbStateTxt;
            this.mang = lbKieurut;
            this.item = item;
            this.itemID = itemID;
        },

        onClickDetail: function () {
            //mã gia dịch, mã thẻ, seri, mạng, mệnh giá
            let maGiaoDich = this.item.MaGD;
            let maThe = this.item.MaThe;
            let seri = this.item.Serial;
            let mang = this.mang;
            let trangThai = this.trangThai;
            let menhGia = cc.Tool.getInstance().formatNumber(this.item.MenhGia);
            if (this.item.KieuNap == "1" || this.item.KieuNap == "2" || this.item.KieuNap == "3") {
                this.lbDetail.string = trangThai + "\nMạng: " + mang + "\n Mã thẻ: " + maThe + "\n Seri: " + seri + "\n Mệnh giá: " + menhGia;
            } else {
                this.lbDetail.string = trangThai + "\nBank: " + mang + "\n Mã giao dịch: " + maGiaoDich + "\n Mệnh giá: " + menhGia;
            }
            this.popupDetail.active = true;
        },

        onCloseDetail: function () {
            this.popupDetail.active = false;
        }

    });
}).call(this);
