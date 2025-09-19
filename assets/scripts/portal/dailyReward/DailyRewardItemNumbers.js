(function () {
    cc.DailyRewardItemNumbers = cc.Class({
        extends: cc.Component,
        properties: {
            dateValue: -1,
            sfChoose: cc.SpriteFrame,
            sfUnChoose: cc.SpriteFrame,
            spriteDate: cc.Sprite,
            lbNumber: cc.Label,
            isChecked: false
        },

        init: function (date, isChecked) {
            this.dateValue = date;
            this.isChecked = isChecked;
            this.spriteDate.spriteFrame = (isChecked) ? this.sfChoose : this.sfUnChoose;
            let strNumber = (date < 10) ? "0" + date : date;
            this.lbNumber.string = strNumber;
        },

        onChoose: function () {
            if(!this.isChecked){
                this.spriteDate.spriteFrame = (this.isChecked) ? this.sfChoose : this.sfUnChoose;
                this.isChecked = !this.isChecked;            
            }
        }
    });
}).call(this);
