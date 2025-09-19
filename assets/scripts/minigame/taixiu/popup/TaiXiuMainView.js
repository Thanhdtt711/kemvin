/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.TaiXiuMainView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabGraph: cc.Prefab, //soi cau
            prefabHonor: cc.Prefab,
        },

        onLoad: function () {
            cc.TaiXiuMainController.getInstance().setTaiXiuMainView(this);
        },

        createGraphView: function () {
            this.nodeGraphView = this.createView(this.prefabGraph);
        },

        destroyGraphView: function () {
            if (this.nodeGraphView)
                this.nodeGraphView.destroy();
        },

        createHonorView: function () {
            this.nodeHonorView = this.createView(this.prefabHonor);
        },

        destroyHonorView: function () {
            if (this.nodeHonorView)
                this.nodeHonorView.destroy();
        },
    });
}).call(this);
