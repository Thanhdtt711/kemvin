/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BacaratTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,

            lbRank: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            lbAward: cc.Label,
            spriteTop: cc.Sprite,
            spTop: [cc.SpriteFrame]
            
        },
        onLoad() {
            this._award_list = [
                200000,
                100000,
                50000,
                50000,
                50000,
                10000,
                10000,
                10000,
                10000,
                10000
            ]
        },
        updateItem: function(item, itemID) {
            // this.sprite.enabled = itemID % 2 !== 0;
            if(itemID < 3) {
                this.lbRank.node.active = false;
                this.spriteTop.node.active = true;
                this.spriteTop.spriteFrame = this.spTop[itemID];
            }else {
                this.lbRank.node.active = true;
                this.spriteTop.node.active = false;
                this.lbRank.string = itemID + 1;
            }

            this.lbSID.string = cc.Config.getInstance().getServiceNameNoFormat(item.ServiceID);
            this.lbNickName.string = item.DisplayName;
            this.lbTotalWin.string = cc.Tool.getInstance().formatNumber(item.Award);

            // console.log('this.lbAward', this.lbAward)
            // console.log('position', position)
            if(this.lbAward && itemID < 10) {
                this.lbAward.string = cc.Tool.getInstance().formatNumber(this._award_list[itemID]) + ' KEM';
            }
            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
