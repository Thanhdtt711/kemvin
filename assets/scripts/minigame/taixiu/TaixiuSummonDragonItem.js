/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaixiuSummonDragonItem = cc.Class({
        "extends": cc.Component,
        properties: {
            // sprite: cc.Sprite,
            lbNo: cc.Label,
            lbSID: cc.Label,
            lbNickName: cc.Label,
            lbCord: cc.Label,
            lbPrize: cc.Label,
            iconTop: cc.Sprite,
        },

        updateItem: function (item, itemID, iconTops) {
            // this.sprite.enabled = itemID % 2 !== 0;
            if (itemID < 4) {
                this.iconTop.spriteFrame = iconTops[itemID];
                this.iconTop.node.active = true;
            } else {
                this.iconTop.node.active = false;
            }

            this.lbNo.string = itemID + 1;

            this.lbNickName.string = item.GameAccountName;

            this.lbCord.string = cc.Tool.getInstance().formatNumber(item.CountCord);
            this.lbPrize.string = cc.Tool.getInstance().formatNumber(item.PrizeValue);

            this.item = item;
            this.itemID = itemID;
        },
    });
}).call(this);
