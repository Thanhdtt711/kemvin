/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.TaiXiuSummonDragonView = cc.Class({
        "extends": cc.Component,
        properties: {
            btnDayThang: cc.Button,
            btnDayThua: cc.Button,

            //list nguoi choi trong TOP
            taiXiuListView: cc.TaixiuSummonDragonListView,
            //phan thuong hien tai cua user
            lbReward: cc.Label,
            lbDateValue: cc.Label,
            //menu chon ngay thang
            menuDateView: cc.E1TabTaiXiuDragonMenuDateView,
            //animation menu
            animationMenuDate: cc.Animation,

            nodeBusy: cc.Node,
            spriteIcon: cc.Sprite,
        },

        onLoad: function () {
            if (this.spriteIcon)
                this.spriteIcon.spriteFrame = cc.LobbyController.getInstance().getGameAssets().icons[cc.Config.getInstance().getIndexIcon(cc.Config.getInstance().getServiceId())];
        },

        onEnable: function () {
            //reset scale
            this.animationMenuDate.node.scaleY = 0;

            //khoi tao -> truyen controler sang menu
            this.menuDateView.init(this.node);

            this.activeBtnDayInteractable(true);

            this.cordType = 1; // thang1,thua2
            this.recallCode = 1;
        },

        activeBtnDayInteractable: function (btnDayThang) {
            this.btnDayThang.interactable = !btnDayThang;
            this.btnDayThua.interactable = btnDayThang;

            this.btnDayThang.active = btnDayThang;
            this.btnDayThua.active = !btnDayThang;
        },

        clickSetDaythang: function () {
            this.activeBtnDayInteractable(true);
            this.cordType = 1;
            this.getEventHonors();
        },

        clickSetDaythua: function () {
            this.activeBtnDayInteractable(false);
            this.cordType = 2;
            this.getEventHonors();
        },

        //set gia tri ngay dang chon vao label
        setLBDate: function (value) {
            this.lbDateValue.string = value;
        },

        onDisable: function () {
            this.taiXiuListView.resetList();
        },


        getEventHonors: function () {
            this.showEventBusy();
            this.taiXiuListView.resetList();
            var txGetEventHonorsCommand = new cc.TXGetEventHonorsCommand;
            txGetEventHonorsCommand.execute(this);
        },

        onTXGetEventHonorsResponse: function (response) {
            this.hideEventBusy();
            //co ket qua -> kiem tra xem con dang bat cua so Event ko
            if(response != null){
                var list = response.LstEventHonors;

                this.lbReward.string = cc.Tool.getInstance().formatNumber(response.PrizeValue);
    
                if (list !== null && list.length > 0) {
                    this.taiXiuListView.initialize(list);
                }
            }
        },

        selectDateValueEvent: function (event, data) {
            this.recallCode = event.target.name;
            this.lbDateValue.string = data.toString();
            this.animationMenuDate.play('hideDropdownMenu');

            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getEventHonors();
            }, this, 1, 0, delay, false);
        },

        openMenuDateClicked: function () {
            this.animationMenuDate.play('showDropdownMenu');
        },

        closeMenuDateClicked: function () {
            this.animationMenuDate.play('hideDropdownMenu');
        },

        showEventBusy: function () {
            if (this.nodeBusy)
                this.nodeBusy.active = true;
        },

        hideEventBusy: function () {
            if (this.nodeBusy)
                this.nodeBusy.active = false;
        },
    });
}).call(this);
