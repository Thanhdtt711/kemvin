/**
 * Input dat cuoc
 */

(function () {
    cc.TaiXiuInputBetView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInput: cc.Node, //node input
            nodeInputValue: cc.Node, //node chon so tien de bet
            nodeInputFree: cc.Node, //node tu do chon so tien

            nodeTaiBg: cc.Sprite,
            nodeXiuBg: cc.Sprite,

            lbBetTaiTemp: cc.Label,
            lbBetXiuTemp: cc.Label,
            audioChonSo: cc.AudioSource,
            editBoxDatTai: cc.EditBox,
            editBoxDatXiu: cc.EditBox,
            soundClick: cc.AudioClip,
            soundMoney: cc.AudioClip,
        },

        onLoad: function () {
            this.resetInput();

            this.animation = this.node.getComponent(cc.Animation);
            cc.TaiXiuController.getInstance().setTaiXiuInputBetView(this);

            this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuController.getInstance().setTaiXiuInputBetView(null);
        },

        reset: function () {
            /* ko can cua so input
            this.nodeInput.active = false;
            this.isInputValue = true;
            */

            //reset lai gia tri input
            //this.resetInput();
            if (cc.sys.isNative) {
                this.editBoxDatTai.active = false;
                this.editBoxDatXiu.active = false;
            }
        },

        //reset lai gia tri input
        resetInput: function () {
            this.lbBetTaiTemp.string = 'Đặt';
            this.lbBetXiuTemp.string = 'Đặt';
            this.nodeTaiBg.node.active = false;
            this.nodeXiuBg.node.active = false;

            // this.lbBetTaiTemp.string = '0';
            // this.lbBetXiuTemp.string = '0';
            this.editBoxDatXiu.string = '';
            this.editBoxDatTai.string = '';

            this.betValue = 0;
        },

        //mo cua so input
        openInput: function () {
            cc.TaiXiuController.getInstance().resetPositionTX();

            this.nodeInput.active = true;

            this.nodeInputValue.active = true;
            this.nodeInputFree.active = false;
            this.isInputValue = true;

            this.animation.play('openBetInput');
        },

        //dong input
        closeInput: function () {
            this.resetInput();
            this.animation.play('closeBetInput');
        },

        //animation trigger goi sau khi dong cua so input
        closeBetInputEvent: function () {
            this.nodeInput.active = false;
        },

        //cap nhat gia tri bet dua tren so tien Bet
        updateValueBetUI: function () {
            if (this.betSide === cc.TaiXiuBetSide.TAI) {
                this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            }
        },

        //click mo cua so input Tai
        openInputBetTaiClicked: function () {
            this.nodeXiuBg.node.active = false;
            if (this.nodeInput.active && this.betSide === cc.TaiXiuBetSide.TAI) {
                this.closeInput();
            } else if (this.nodeInput.active && this.betSide === cc.TaiXiuBetSide.XIU) {
                this.betSide = cc.TaiXiuBetSide.TAI;
                this.lbBetXiuTemp.string = 'Đặt';
                this.nodeTaiBg.node.active = false;
                // this.lbBetXiuTemp.string = '0';
                this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.betSide = cc.TaiXiuBetSide.TAI;
                this.nodeTaiBg.node.active = true;
                this.lbBetTaiTemp.string = 0;
                this.openInput();
                if (!cc.sys.isNative) {
                    this.editBoxDatTai.focus();
                }
            }
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundClick, false, 1)
            // }
        },

        //click mo cua so input Xiu
        openInputBetXiuClicked: function () {
            this.nodeTaiBg.node.active = false;
            if (this.nodeInput.active && this.betSide === cc.TaiXiuBetSide.XIU) {
                this.closeInput();
            } else if (this.nodeInput.active && this.betSide === cc.TaiXiuBetSide.TAI) {
                this.betSide = cc.TaiXiuBetSide.XIU;
                // this.lbBetTaiTemp.string = '0';
                this.lbBetTaiTemp.string = 'Đặt';
                this.nodeXiuBg.node.active = false;
                this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.betSide = cc.TaiXiuBetSide.XIU;
                this.lbBetXiuTemp.string = 0;
                this.nodeXiuBg.node.active = true;
                this.openInput();
                if (!cc.sys.isNative) {
                    this.editBoxDatXiu.focus();
                }
            }
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundClick, false, 1)
            // }
        },

        //chon gia tri
        betValueClicked: function (event, data) {
            this.betValue += parseInt(data.toString());

            this.updateValueBetUI();
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },

        //them so
        addValueClicked: function (event, data) {
            this.betValue += data.toString();
            this.betValue = parseInt(this.betValue);

            this.updateValueBetUI();
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },

        //lui 1 so
        deleteClicked: function () {
            this.betValue = (this.betValue.toString().substring(0, this.betValue.toString().length - 1));
            if (this.betValue === '') {
                this.betValue = 0;
            } else {
                this.betValue = parseInt(this.betValue);
            }

            this.updateValueBetUI();
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },

        //huy input
        cancelClicked: function () {
            this.closeInput();
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },

        //xac nhan bet
        confirmClicked: function () {
            //goi len Hub params(bet, betValue, betSide)

            if (this.betValue < 1000) {
                cc.PopupController.getInstance().showMessage('Đặt tối thiểu 1.000 ' + cc.Config.getInstance().currency());
            } else if (cc.BalanceController.getInstance().getBalance() < this.betValue) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ');
            } else {
                cc.TaiXiuController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, this.betValue, this.betSide);
            }

            this.closeInput();
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },

        acceptAllInClicked: function(){
            cc.TaiXiuController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, cc.BalanceController.getInstance().getBalance(), this.betSide);
            this.closeInput();
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
            cc.PopupController.getInstance().closePopup();
        },

        cancelAllInClicked: function(){
            cc.PopupController.getInstance().closePopup();
        },

        //xac nhan bet allIn
        confirmAllInClicked: function () {
            //goi len Hub params(bet, betValue, betSide)

            var clickEventHandlerBlue = new cc.Component.EventHandler();
            clickEventHandlerBlue.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerBlue.component = 'TaiXiuInputBetView';//This is the code file name
            clickEventHandlerBlue.handler = 'acceptAllInClicked';

            var clickEventHandlerRed = new cc.Component.EventHandler();
            clickEventHandlerRed.target = this; //This node is the node to which your event handler code component belongs
            clickEventHandlerRed.component = 'TaiXiuInputBetView';//This is the code file name
            clickEventHandlerRed.handler = 'cancelAllInClicked';

            cc.PopupController.getInstance().showPopup(
                'Bạn muốn tất tay tài xỉu?',
                'Hủy',
                'Đồng ý',
                clickEventHandlerRed,
                clickEventHandlerBlue
            );
        },

        //chuyen kieu input
        otherClicked: function () {
            this.betValue = 0;
            this.updateValueBetUI();

            this.nodeInputValue.active = !this.isInputValue;
            this.nodeInputFree.active = this.isInputValue;
            this.isInputValue = !this.isInputValue;
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },

        //text xiu change
        onTextXiuChange: function(data) {
            this.betValue = data.toString();
            this.betValue = parseInt(this.betValue);
            this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        },
        //text tai change
        onTextTaiChange: function(data) {
            this.betValue = data.toString();
            this.betValue = parseInt(this.betValue);
            this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            // this.audioChonSo.play();
            // if(!cc.Tool.getInstance().getItem("@onAudioBg") || cc.Tool.getInstance().getItem("@onAudioBg").toString() === 'true') {
                cc.audioEngine.play(this.soundMoney, false, 1)
            // }
        }
    });
}).call(this);
