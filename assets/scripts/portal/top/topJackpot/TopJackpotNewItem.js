/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TopJackpotNewItem = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteBg: cc.Sprite,
            spriteIcon: cc.Sprite,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbValue100: cc.LabelIncrement,
            lbValue1k: cc.LabelIncrement,
            lbValue5k: cc.LabelIncrement,
            lbValue10k: cc.LabelIncrement,
        },

        onLoad: function () {

        },

        updateItem: function(item, index, total) {
            this.gameId = item.GameID;
            // this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            // this.lbNickName.string = item.Username;
            // this.lbValue.tweenValue(0, item.PrizeValue);
            if(index % 2 == 0){
                this.spriteBg.node.active = false;
            }else{
                this.spriteBg.node.active = true;
            }

            this.lbNickName.string = cc.Config.getInstance().getGameName(item.GameID);

            this.lbValue100.tweenValue(0, item.JackpotFund100);
            this.lbValue1k.tweenValue(0, item.JackpotFund1k);
            this.lbValue5k.tweenValue(0, item.JackpotFund5k);
            this.lbValue10k.tweenValue(0, item.JackpotFund10k);

            this.spriteIcon.spriteFrame = cc.TopController.getInstance().getIcon(item.GameID);
        },

        openGameClicked: function () {
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().joinGame(this.gameId);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, cc.DDNA.getInstance().getGameById(this.gameId), cc.DDNAUIType.TOP);
            }
        },
    });
}).call(this);
