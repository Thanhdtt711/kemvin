/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TopJackpotNewView = cc.Class({
        "extends": cc.Component,
        properties: {
            topJackpotListNewView: cc.TopJackpotListNewView,
        },
        onLoad: function () {
            this.isOpen = false;
            this.node.zIndex = cc.NoteDepth.POPUP_GIFTCODE;
        },
        onEnable: function () {
            this.currentRoom = 4;


            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getInfo();
            }, this, 1, 0, delay, false);

            cc.director.getScheduler().schedule(function () {
                self.getInfo();
            }, this, 60, cc.macro.REPEAT_FOREVER, 0, false);
        },

        onDisable: function () {
            this.topJackpotListNewView.resetList();
        },

        getInfo: function () {
            // var getUserJackpotInfoCommand = new cc.GetUserJackpotInfoCommand;
            // getUserJackpotInfoCommand.execute(this, -1);

            var getTopJackpotCommand = new cc.GetTopJackpotCommand;
            getTopJackpotCommand.execute(this, -1);
        },


        onGetTopJackpotResponse: function (response) {
            this.responseList = response.list;
            this.createListByRoomId();
        },

        // onGetUserJackpotInfoResponse: function (response) {
        //     this.responseList = response.list;
        //     this.createListByRoomId();
        // },

        createListByRoomId: function () {
            var self = this;
            var listTemp = [];
            this.responseList.forEach(function (data) {
                //data.RoomID === self.currentRoom &&
                if (("" + data.GameID) !== cc.GameId.THUONG_HAI && ("" + data.GameID) !== cc.GameId.GAINHAY) { // tạm chưa show gái nhảy
                    listTemp.push(data);
                }
            });

            var listNewTemp = [];
            if (listTemp.length > 0) {
                listTemp.forEach((item) => {
                    let JackpotFund100 = 0;
                    let JackpotFund1k = 0;
                    let JackpotFund5k = 0;
                    let JackpotFund10k = 0;

                    let itemPre = listNewTemp.filter(function (element) {
                        return element.GameID === item.GameID;
                    });
                    
                    if (itemPre.length > 0) {
                        if (item.GameID == 11){
                            JackpotFund100 = (itemPre[0].hasOwnProperty("JackpotFund100")) ? itemPre[0].JackpotFund100 : 0;
                            JackpotFund1k = (itemPre[0].hasOwnProperty("JackpotFund1k")) ? itemPre[0].JackpotFund1k : 0;
                            JackpotFund5k = item.JackpotFund5k;
                            JackpotFund10k = item.JackpotFund10k;
                            cc.log(item.JackpotFund5k)
                        }else{
                            JackpotFund100 = (itemPre[0].hasOwnProperty("JackpotFund100")) ? itemPre[0].JackpotFund100 : 0;
                            JackpotFund1k = (itemPre[0].hasOwnProperty("JackpotFund1k")) ? itemPre[0].JackpotFund1k : 0;
                            JackpotFund5k = (itemPre[0].hasOwnProperty("JackpotFund5k")) ? itemPre[0].JackpotFund5k : 0;
                            JackpotFund10k = (itemPre[0].hasOwnProperty("JackpotFund10k")) ? itemPre[0].JackpotFund10k : 0;
                        }
                    }

                    switch (item.RoomID) {
                        case 1:
                            JackpotFund100 = item.JackpotFund;
                            break;
                        case 2:
                            JackpotFund1k = item.JackpotFund;
                            break;
                        case 3:
                            if (item.GameID == 11){
                                JackpotFund5k = item.JackpotFund5k;
                            }else{
                                JackpotFund5k = item.JackpotFund;
                            }
                            
                            break;
                        case 4:
                            JackpotFund10k = item.JackpotFund;
                            break;
                    }
                    let data = {
                        "GameID": item.GameID,
                        "JackpotFund": item.JackpotFund,
                        "JackpotFund100": JackpotFund100,
                        "JackpotFund1k": JackpotFund1k,
                        "JackpotFund5k": JackpotFund5k,
                        "JackpotFund10k": JackpotFund10k,
                        "IsEventJackpot": item.IsEventJackpot
                    };

                    if (itemPre.length > 0) {
                        listNewTemp = listNewTemp.filter(function (element) {
                            return element.GameID !== item.GameID;
                        });
                    }
                    listNewTemp.push(data);
                });
            }

            this.topJackpotListNewView.resetList();
            this.topJackpotListNewView.initialize(listNewTemp);
        },

        roomClicked: function (event, data) {
            this.currentRoom = parseInt(data.toString());
            this.createListByRoomId();
        }
    });
}).call(this);
