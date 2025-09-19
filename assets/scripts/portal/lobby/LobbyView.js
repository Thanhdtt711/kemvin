/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.LobbyView = cc.Class({
        "extends": cc.Component,
        properties: {
            //prefab portal
            prefabLoginViewKV: cc.Prefab, //#KingViet
            prefabLoginView: cc.Prefab,
            prefabAccountView: cc.Prefab,
            prefabSecurityView: cc.Prefab,

            prefabShopView: cc.Prefab,
            prefabShopViewBank: cc.Prefab,
            prefabShopViewKV: cc.Prefab, //#KingViet

            prefabShopTopupView: cc.Prefab,
            prefabShopTopupViewBank: cc.Prefab,

            prefabHistoryView: cc.Prefab,
            prefabHistoryViewBank: cc.Prefab,
            prefabHistoryViewKV: cc.Prefab, //#KingViet

            prefabPopupUpdateUserPass: cc.Prefab,

            prefabGiftcode: cc.Prefab,
            prefabDailyReward: cc.Prefab,
            prefabDailyMission: cc.Prefab,
            prefabEvent: cc.Prefab,
            prefabVQMM: cc.Prefab,
            prefabAppSafeHelp: cc.Prefab,
            //DNS Help
            prefabDNSHelp: cc.Prefab,
            //Update Account
            prefabUpdateAccount: cc.Prefab,
            prefabMoveBB: cc.Prefab,
            prefabBlockBB: cc.Prefab,

            //event - san kho bau
            prefabTreasure: cc.Prefab,
            prefabCarrotDailyBonus: cc.Prefab,
            prefabBuyCarrot: cc.Prefab,
            prefabTreasureGift: cc.Prefab,
            prefabTreasureRule: cc.Prefab,
            prefabTreasureTop: cc.Prefab,

            //event - x2 Nap
            prefabX2Popup: cc.Prefab,
            prefabX2Reward: cc.Prefab,

            //prefab FX summon Dragon
            prefabFxSummonDragon: cc.Prefab,

            //#KingViet
            prefabEventPopup: cc.Prefab,

            //#GameVN
            prefabEventVNPopup: cc.Prefab,

            //slots chinh
            lbLoadingEgypt: cc.Label,
            lbLoadingTK: cc.Label,
            lbLoadingAquarium: cc.Label,
            lbLoadingDragonBall: cc.Label,
            lbLoadingBumBum: cc.Label,
            lbLoadingCowboy: cc.Label,

            lbLoadingMonkey: cc.Label,
            lbLoadingDragonTiger: cc.Label,
            lbLoadingXocXoc: cc.Label,
            lbLoadingBauCua: cc.Label,
            lbLoadingLoDe: cc.Label,

            //minigame
            lbLoadingTaiXiu: cc.Label,
            lbLoadingMiniPoker: cc.Label,
            lbLoading777: cc.Label,
            lbLoadingTQ: cc.Label,
            lbLoadingLuckyWild: cc.Label,

            //card game
            lbLoadingPoker: cc.Label,
            lbLoadingThreeCards: cc.Label,
            lbLoadingTLMN: cc.Label,
            lbLoadingTLMNSolo: cc.Label,
            lbLoadingMB: cc.Label,
            lbLoadingBaccarat: cc.Label,

            //xo so
            lbLoadingVietlot: cc.Label,

            //ban ca
            lbLoadingShootFish: cc.Label,

            nodeLobbys: [cc.Node],
            nodeTopBar: cc.Node,
            nodeSetting: cc.Node,

            //audio
            audioBg: cc.AudioSource,
            toggleAudio: cc.Toggle,
            lbTopVp: cc.Label,
            prefabEventTop: cc.Prefab,
            nodeEventTop: cc.Node,

        },

        // use this for initialization
        onLoad: function () {
            this.BundleManager = new cc.BundleManager;
            cc.LobbyController.getInstance().setLobbyView(this);
            this.nodeTaiXiu = null;
            this.nodeMiniPoker = null;
            this.node777 = null;
            this.nodeTQ = null;
            this.nodeLW = null;
            this.nodeSlotsView = null;
            this.nodeVQMMView = null;
            var tool = cc.Tool.getInstance();
            if (tool.getItem('@onAudioBg') !== null) {
                if (tool.getItem('@onAudioBg') === 'true') {
                    this.IsOnAudioBg = true;
                } else {
                    this.IsOnAudioBg = false;
                }
            } else {
                this.IsOnAudioBg = true;
            }
            this.toggleAudio.isChecked = this.IsOnAudioBg;
        },

        onEnable: function () {
            if (this.IsOnAudioBg) {
                this.audioBg.play();
            } else {
                this.audioBg.stop();
            }
            this.lbTopVp.string = cc.Tool.getInstance().formatNumber(cc.LoginController.getInstance().getTopVPResponse());
            if (!cc.LoginController.getInstance().getLoginState()) {
                var tool = cc.Tool.getInstance();
                if (tool.getItem('@isLanding') !== null) {
                    if (tool.getItem('@isLanding') === 'true') {
                        cc.LobbyController.getInstance().showRegisterView();
                    }
                }
            }
        },

        //event X2
        createX2PopupView: function () {
            this.nodeX2Popup = this.createView(this.prefabX2Popup);
        },

        destroyX2PopupView: function () {
            if (this.nodeX2Popup)
                this.nodeX2Popup.destroy();
        },

        createX2RewardView: function () {
            this.nodeX2Reward = this.createView(this.prefabX2Reward);
        },

        destroyX2RewardView: function () {
            if (this.nodeX2Reward)
                this.nodeX2Reward.destroy();
        },

        //event san KHO BAU
        createEventPopupView: function () {
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeEventPopup = this.createView(this.prefabEventPopup);
            } else {
                this.nodeEventPopup = this.createView(this.prefabEventVNPopup);
            }
        },

        destroyEventPopupView: function () {
            if (this.nodeEventPopup)
                this.nodeEventPopup.destroy();
        },

        //event san KHO BAU
        createTreasureView: function () {
            this.nodeTreasureView = this.createView(this.prefabTreasure);
        },

        destroyTreasureView: function () {
            if (this.nodeTreasureView)
                this.nodeTreasureView.destroy();
        },

        //buy carrot
        createBuyCarrotView: function () {
            this.nodeBuyCarrotView = this.createView(this.prefabBuyCarrot);
        },

        destroyBuyCarrotView: function () {
            if (this.nodeBuyCarrotView)
                this.nodeBuyCarrotView.destroy();
        },

        //chon qua vat ly
        createTreasureGiftView: function () {
            this.nodeTreasureGiftView = this.createView(this.prefabTreasureGift);
        },

        destroyTreasureGiftView: function () {
            if (this.nodeTreasureGiftView)
                this.nodeTreasureGiftView.destroy();
        },


        //carrot daily bonus popup
        createCarrotDailyBonusView: function () {
            this.nodeCarrotDailyBonusView = this.createView(this.prefabCarrotDailyBonus);
        },

        destroyCarrotDailyBonusView: function () {
            if (this.nodeCarrotDailyBonusView)
                this.nodeCarrotDailyBonusView.destroy();
        },

        //treasure rule popup
        createTreasureRuleView: function () {
            this.nodeTreasureRuleView = this.createView(this.prefabTreasureRule);
        },

        destroyTreasureRuleView: function () {
            if (this.nodeTreasureRuleView)
                this.nodeTreasureRuleView.destroy();
        },

        //treasure top popup
        createTreasureTopView: function () {
            this.nodeTreasureTopView = this.createView(this.prefabTreasureTop);
        },

        destroyTreasureTopView: function () {
            if (this.nodeTreasureTopView)
                this.nodeTreasureTopView.destroy();
        },

        //Fx
        createFxSummonDragon: function () {
            this.nodeFxSummonDragon = this.createView(this.prefabFxSummonDragon);
        },

        destroyFxSummonDragon: function () {
            if (this.nodeFxSummonDragon)
                this.nodeFxSummonDragon.destroy();
        },
        //end fx

        //Portal Portal Portal
        createLoginView: function () {
            if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeLoginView = this.createView(this.prefabLoginView);
            } else {
                this.nodeLoginView = this.createView(this.prefabLoginViewKV);
            }
        },

        destroyLoginView: function () {
            if (this.nodeLoginView)
                this.nodeLoginView.destroy();
        },

        createVQMMView: function () {
            if (this.nodeVQMMView === null) {
                this.nodeVQMMView = this.createView(this.prefabVQMM);
            }
        },

        destroyVQMMView: function () {
            if (this.nodeVQMMView) {
                this.nodeVQMMView.destroy();
                this.nodeVQMMView = null;
            }
        },

        createHistoryView: function () {
            // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
            //     || cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2) {
            //     this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
            // } else {
            //     this.nodeHistoryView = this.createView(this.prefabHistoryView);
            // }

            if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
            } else {
                this.nodeHistoryView = this.createView(this.prefabHistoryViewKV);
            }

            //hide cac node o lobby
            // this.activeNodeLobby(false);
        },

        destroyHistoryView: function () {
            // this.activeNodeLobby(true);

            //cc.BannerController.getInstance().switchPage();

            if (this.nodeHistoryView)
                this.nodeHistoryView.destroy();
        },

        createAccountView: function () {
            this.nodeAccountView = this.createView(this.prefabAccountView);
            //hide cac node o lobby
            // this.activeNodeLobby(false);
        },

        destroyDailyRewardView: function () {
            if (this.nodeDailyRewardView)
                this.nodeDailyRewardView.destroy();
        },

        destroyDailyMissionView: function () {
            if (this.nodeDailyMissionView)
                this.nodeDailyMissionView.destroy();
        },

        destroyAccountView: function () {
            // this.activeNodeLobby(true);

            //cc.BannerController.getInstance().switchPage();

            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeAccountView)
                this.nodeAccountView.destroy();
        },

        createSecurityView: function () {
            this.nodeSecurityView = this.createView(this.prefabSecurityView);
            //hide cac node o lobby
            // this.activeNodeLobby(false);
        },

        destroySecurityView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeSecurityView)
                this.nodeSecurityView.destroy();
        },

        createPopupUpdateUserPassView: function () {
            this.nodePopupUpdateUserPass = this.createView(this.prefabPopupUpdateUserPass);
        },

        destroyPopupUpdateUserPassView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodePopupUpdateUserPass)
                this.nodePopupUpdateUserPass.destroy();
        },

        createShopTopupView: function () {
            // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
            //     this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);
            // } else {
            //     this.nodeShopTopupView = this.createView(this.prefabShopTopupView);
            // }

            this.nodeShopTopupView = this.createView(this.prefabShopTopupView);

            //hide cac node o lobby
            // this.activeNodeLobby(false);
        },

        destroyShopTopupView: function () {
            // this.activeNodeLobby(true);

            //cc.BannerController.getInstance().switchPage();

            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeShopTopupView)
                this.nodeShopTopupView.destroy();
            //hide cac node o lobby
        },

        createShopView: function () {

            this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);

            /* if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                // this.nodeShopView = this.createView(this.prefabShopView);
                // this.nodeShopView = this.createView(this.prefabShopViewBank);

                if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
                    this.nodeShopView = this.createView(this.prefabShopViewBank);
                } else {
                    this.nodeShopView = this.createView(this.prefabShopView);
                }
            } else {
                this.nodeShopView = this.createView(this.prefabShopViewKV);
            } */


            //hide cac node o lobby
            // this.activeNodeLobby(false);
        },

        destroyShopView: function () {
            // this.activeNodeLobby(true);

            //cc.BannerController.getInstance().switchPage();

            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeShopView)
                this.nodeShopView.destroy();

            if (this.nodeShopTopupView)
                this.nodeShopTopupView.destroy();
            //hide cac node o lobby
        },

        createGiftcodeView: function () {
            this.nodeGiftcodeView = this.createView(this.prefabGiftcode);
        },

        createDailyRewardView: function () {
            this.nodeDailyRewardView = this.createView(this.prefabDailyReward);
        },

        createDailyMissionView: function () {
            this.nodeDailyMissionView = this.createView(this.prefabDailyMission);
        },

        destroyGiftcodeView: function () {
            if (this.nodeGiftcodeView)
                this.nodeGiftcodeView.destroy();
        },

        createEventView: function () {
            this.nodeEventView = this.createView(this.prefabEvent);
        },

        createEventViewTopVP: function () {
            this.nodeEventViewTopVP = this.createView(this.prefabEventTop);
        },

        createAppSafeHelpView: function () {
            this.createView(this.prefabAppSafeHelp);
        },

        createDNSHelpView: function () {
            this.createView(this.prefabDNSHelp);
        },

        createUpdateAccountView: function () {
            this.createView(this.prefabUpdateAccount);
        },

        createMoveBBView: function () {
            this.createView(this.prefabMoveBB);
        },
        destroyMoveBBView: function () {
            if (this.prefabMoveBB)
                this.prefabMoveBB.destroy();
        },
        createBlockBBView: function () {
            this.createView(this.prefabBlockBB);
        },

        loadResGame: function (bundle, url, lbLoading, gameId, activeNodeLobby, activeNodeTopBar = false) {
            var self = this;
            var percent = 0;
            cc.log(bundle +url)
            // cc.resources.load("test assets/prefab", function (err, prefab) {
            //     var newNode = cc.instantiate(prefab);
            //     cc.director.getScene().addChild(newNode);
            // });
            let cbProgess = (completedCount, totalCount, item) => {
                var tempPercent = Math.round(100 * completedCount / totalCount);

                //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                if (tempPercent > percent) {
                    percent = tempPercent;
                }

                lbLoading.string = percent + '%';
            }

            let cbCompleteLoad = (err, prefab) => {
                if (err) {
                    //Tat loading
                    lbLoading.node.parent.active = false;
                    console.log(err);
                    return;
                }
                //Load xong
                self.isLoading = false;
                //Tat loading
                lbLoading.node.parent.active = false;
                //Tao game
                switch (gameId) {
                    case cc.GameConfig.SHOOT_FISH:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.EGYPT:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.THREE_KINGDOM:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.BUM_BUM:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.AQUARIUM:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.DRAGON_BALL:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.COWBOY:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.MONKEY:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.DRAGON_TIGER:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.XOC_XOC:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.TAI_XIU:
                        self.nodeTaiXiu = self.createView(prefab);
                        break;
                    case cc.GameConfig.MINI_POKER:
                        self.nodeMiniPoker = self.createView(prefab);
                        break;
                    case cc.GameConfig.SEVEN77:
                        self.node777 = self.createView(prefab);
                        break;
                    case cc.GameConfig.BLOCK_BUSTER:
                        self.nodeTQ = self.createView(prefab);
                        break;
                    case cc.GameConfig.LUCKY_WILD:
                        self.nodeLW = self.createView(prefab);
                        break;
                    case cc.GameConfig.POKER_TEXAS:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.BA_CAY:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.TIEN_LEN_MN:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.MAU_BINH:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.BACCARAT:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.BAUCUA:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.LODE:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    case cc.GameConfig.VIETLOT:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                    default:
                        self.nodeSlotsView = self.createView(prefab);
                        break;
                }

                //hide cac node o lobby
                if (activeNodeLobby) {
                    self.activeNodeLobby(false);
                }

                if (activeNodeTopBar) {
                    self.activeNodeTopBar(true);
                }
            }
            this.BundleManager.loadAsset(bundle, url, cbCompleteLoad, cbProgess);
        },

        //Tao cac game (prefab load dynamic)
        createDynamicView: function (gameId) {
            switch (gameId) {
                case cc.GameId.SHOOT_FISH:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingShootFish.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.SHOOT_FISH_PREFAB, self.lbLoadingShootFish, cc.GameConfig.SHOOT_FISH, true, false)
                    
                    break;

                case cc.GameId.EGYPT:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingEgypt.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.EGYPT_PREFAB, self.lbLoadingEgypt, cc.GameConfig.SHOOT_FISH, true, false)
                    
                    break;

                case cc.GameId.THREE_KINGDOM:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTK.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.THREE_KINGDOM_PREFAB, self.lbLoadingTK, cc.GameConfig.THREE_KINGDOM, true, false)
                    
                    break;

                case cc.GameId.BUM_BUM:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBumBum.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.BUM_BUM_PREFAB, self.lbLoadingBumBum, cc.GameConfig.BUM_BUM, true, false)
                    break;

                case cc.GameId.AQUARIUM:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingAquarium.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.AQUARIUM_PREFAB, self.lbLoadingAquarium, cc.GameConfig.AQUARIUM, true, false)
                    
                    break;

                case cc.GameId.DRAGON_BALL:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingDragonBall.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.DRAGON_BALL_PREFAB, self.lbLoadingDragonBall, cc.GameConfig.DRAGON_BALL, true, false)
                    
                    break;

                case cc.GameId.COWBOY:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingCowboy.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.COWBOY_PREFAB, self.lbLoadingCowboy, cc.GameConfig.COWBOY, true, false)
                    
                    break;

                case cc.GameId.MONKEY:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingMonkey.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.MONKEY_PREFAB, self.lbLoadingMonkey, cc.GameConfig.MONKEY, true, false)
                    break;

                case cc.GameId.DRAGON_TIGER:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingDragonTiger.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.DRAGON_TIGER_PREFAB, self.lbLoadingDragonTiger, cc.GameConfig.DRAGON_TIGER, true, false)
                    
                    break;

                case cc.GameId.XOC_XOC:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingXocXoc.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.XOC_XOC_PREFAB, self.lbLoadingXocXoc, cc.GameConfig.XOC_XOC, true, false)
                    
                    break;

                case cc.GameId.TAI_XIU:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeTaiXiu !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTaiXiu.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.TAI_XIU_PREFAB, self.lbLoadingTaiXiu, cc.GameConfig.TAI_XIU, false, false)
                    // var percent = 0;
                    // cc.loader.loadRes("prefabs/taixiuView",
                    //     function (completedCount, totalCount, item) {
                    //         var tempPercent = Math.round(100 * completedCount / totalCount);

                    //         //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                    //         if (tempPercent > percent) {
                    //             percent = tempPercent;
                    //         }

                    //         self.lbLoadingTaiXiu.string = percent + '%';
                    //     },
                    //     function (err, prefab) {
                    //         //Load xong
                    //         self.isLoading = false;
                    //         //Tat loading
                    //         self.lbLoadingTaiXiu.node.parent.active = false;
                    //         //Tao game
                    //         self.nodeTaiXiu = self.createView(prefab);
                    //     }
                    // );
                    break;

                case cc.GameId.MINI_POKER:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeMiniPoker !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingMiniPoker.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.MINI_POKER_PREFAB, self.lbLoadingMiniPoker, cc.GameConfig.MINI_POKER, false, false)
                    
                    break;

                case cc.GameId.SEVEN77:
                    //kiem tra da tao roi -> ko tao them
                    if (this.node777 !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoading777.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.SEVEN77_PREFAB, self.lbLoading777, cc.GameConfig.SEVEN77, false, false)
                    
                    break;

                case cc.GameId.BLOCK_BUSTER:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeTQ !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTQ.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.BLOCK_BUSTER_PREFAB, self.lbLoadingTQ, cc.GameConfig.BLOCK_BUSTER, false, false)
                    
                    break;

                case cc.GameId.LUCKY_WILD:

                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeLW !== null) return;
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingLuckyWild.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.LUCKY_WILD_PREFAB, self.lbLoadingLuckyWild, cc.GameConfig.LUCKY_WILD, false, false)
                    break;

                case cc.GameId.POKER_TEXAS:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingPoker.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.POKER_TEXAS_PREFAB, self.lbLoadingPoker, cc.GameConfig.POKER_TEXAS, false, true)
                    
                    break;

                case cc.GameId.BA_CAY:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingThreeCards.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.BA_CAY_PREFAB, self.lbLoadingThreeCards, cc.GameConfig.BA_CAY, true, true)
                    
                    break;

                case cc.GameId.TIEN_LEN_MN:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTLMN.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.TIEN_LEN_MN_PREFAB, self.lbLoadingTLMN, cc.GameConfig.TIEN_LEN_MN, true, true)
                    
                    break;

                case cc.GameId.TIEN_LEN_MN_SOLO:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTLMNSolo.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.TIEN_LEN_MN_SOLO_PREFAB, self.lbLoadingTLMNSolo, cc.GameConfig.TIEN_LEN_MN_SOLO, true, true)
                    
                    break;

                case cc.GameId.MAU_BINH:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingMB.node.parent.active = true;
                   this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.MAU_BINH_PREFAB, self.lbLoadingMB, cc.GameConfig.MAU_BINH, true, true)
                   
                   break;

                case cc.GameId.BACCARAT:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBaccarat.node.parent.active = true;
                   this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.BACCARAT_PREFAB, self.lbLoadingBaccarat, cc.GameConfig.BACCARAT, true, false)
                   var percent = 0;
                   
                   break;

                case cc.GameId.BAUCUA:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBauCua.node.parent.active = true;
                   this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.BAUCUA_PREFAB, self.lbLoadingBauCua, cc.GameConfig.BAUCUA, true, false)
                   
                   break;

                case cc.GameId.LODE:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;

                    //Bat loading
                    self.lbLoadingLoDe.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.LODE_PREFAB, self.lbLoadingLoDe, cc.GameConfig.LODE, true, true)
                    
                    break;

                case cc.GameId.VIETLOT:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;

                    //Bat loading
                    self.lbLoadingVietlot.node.parent.active = true;
                    this.loadResGame(cc.GameConfig.BUNDLE_ALL, cc.GameConfig.VIETLOT_PREFAB, self.lbLoadingVietlot, cc.GameConfig.VIETLOT, true, false)
                    break;
            }
        },

        destroyDynamicView: function (gameId) {

            switch (gameId) {
                case cc.GameId.EVENT_TREASURE:
                    if (this.nodeTreasureView) {
                        this.nodeTreasureView.destroy();
                        this.nodeTreasureView = null;
                    }

                    if (this.nodeTreasureGiftView) {
                        this.nodeTreasureGiftView.destroy();
                        this.nodeTreasureGiftView = null;
                    }

                    if (this.nodeBuyCarrotView) {
                        this.nodeBuyCarrotView.destroy();
                        this.nodeBuyCarrotView = null;
                    }
                    break;
                case cc.GameId.TAI_XIU:
                    if (this.nodeTaiXiu) {
                        this.nodeTaiXiu.destroy();
                        this.nodeTaiXiu = null;
                    }
                    break;
                case cc.GameId.MINI_POKER:
                    if (this.nodeMiniPoker) {
                        this.nodeMiniPoker.destroy();
                        this.nodeMiniPoker = null;
                    }
                    break;
                case cc.GameId.SEVEN77:
                    if (this.node777) {
                        this.node777.destroy();
                        this.node777 = null;
                    }
                    break;
                case cc.GameId.BLOCK_BUSTER:
                    if (this.nodeTQ) {
                        this.nodeTQ.destroy();
                        this.nodeTQ = null;
                    }
                    break;
                case cc.GameId.LUCKY_WILD:
                    if (this.nodeLW) {
                        this.nodeLW.destroy();
                        this.nodeLW = null;
                    }
                    break;
                default:
                    this.activeNodeTopBar(false);
                    //bat lai cac node o lobby
                    this.activeNodeLobby(true);

                    //cc.BannerController.getInstance().switchPage();

                    //mac dinh se là cac game slots
                    if (this.nodeSlotsView) {
                        this.nodeSlotsView.destroy();
                        this.nodeSlotsView = null;
                    }

                    if (this.nodeEventView) {
                        this.nodeEventView.destroy();
                        this.nodeEventView = null;
                    }

                    if (this.nodeEventViewTopVP) {
                        this.nodeEventViewTopVP.destroy();
                        this.nodeEventViewTopVP = null;
                    }

                    break;
            }
            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        destroyAllMiniGameView: function () {
            this.destroyDynamicView(cc.GameId.TAI_XIU);
            this.destroyDynamicView(cc.GameId.MINI_POKER);
            this.destroyDynamicView(cc.GameId.SEVEN77);
            this.destroyDynamicView(cc.GameId.BLOCK_BUSTER);
            this.destroyDynamicView(cc.GameId.LUCKY_WILD);

            this.destroyDynamicView(null);
        },


        createView: function (prefab, posY) {
            var nodeView = cc.instantiate(prefab);
            nodeView.parent = this.node;
            if (posY) {
                nodeView.setPosition(0, posY);
            } else {
                nodeView.setPosition(0, 0);
            }

            return nodeView;
        },

        loginSuccess: function () {
            cc.OneSignalController.getInstance().sendTag('AccountID', cc.LoginController.getInstance().getUserId());
            cc.OneSignalController.getInstance().sendTag('AccountName', cc.LoginController.getInstance().getNickname());

            //cap nhat lai trang thai
            cc.LoginController.getInstance().setLoginState(true);
            //hien UI NickName + avatar
            cc.LobbyController.getInstance().updateUILogin(false);
            //open hub portal
            cc.GameController.getInstance().portalNegotiate();

            cc.LobbyController.getInstance().topBarUpdateInfo();

            //Kiem tra thu chua doc
            cc.LobbyController.getInstance().getMailUnRead();

            //Bat huong dan appSafe sau khi Login + chua tich hopj AppSafe
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            if (!cc.DomainController.getInstance().checkErrorDomain()) {
                //bat event sau khi login thanh cong

                // cc.Tool.getInstance().setItem('@startTabEvent', 0);
                // cc.Tool.getInstance().setItem('@startSubTabEvent', 'TOP');
                // cc.LobbyController.getInstance().createEventView();

                // if (loginResponse.PhoneSafeNo === null) {
                //     cc.LobbyController.getInstance().createAppSafeHelpView();
                // }

                //check xem co luot quay VQMM ko? -> show VQMM
                this.checkVQMMInfo(); //ALPHA chua chay

                cc.DDNA.getInstance().clientDevice();
                cc.DDNA.getInstance().gameStarted();

                var getChargeDefaultCommand = new cc.GetChargeDefaultCommand;
                getChargeDefaultCommand.execute(this);
            }

            // //#KingViet
            // if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     cc.AccountController.getInstance().setAppSafeSatus(false);
            //     var checkSafeLinkAccountCommand = new cc.CheckSafeLinkAccountCommand;
            //     checkSafeLinkAccountCommand.execute();
            // } else {
            //
            //
            //
            // }

            // cc.LobbyController.getInstance().createDNSHelpView();

            // var checkHaveGiftcodeCommand = new cc.CheckHaveGiftcodeCommand;
            // checkHaveGiftcodeCommand.execute();

            // show sieu xe
            if (this.nodeX2Popup == null)
                cc.LobbyController.getInstance().createX2PopupView(); // comment

            if (cc.LoginController.getInstance().checkLogin()) {
                this.lbTopVp.string = cc.Tool.getInstance().formatNumber(cc.LoginController.getInstance().getTopVPResponse());
            } else this.lbTopVp.string = "0";
        },

        //EVENT SAN KHO BAU
        checkHaveDailyBonus: function () {
            var treasureGetCarrotNameKnownCommand = new cc.TreasureGetCarrotNameKnownCommand;
            treasureGetCarrotNameKnownCommand.execute(this);
        },

        onTreasureGetCarrotNameKnownResponse: function (response) {
            if (response !== null)
                cc.TreasureController.getInstance().setIsDailyBonus(response.IsInDay); //= true la nhan roi

            //chua nhan thi moi hien
            if (response !== null && !response.IsInDay) {
                cc.LobbyController.getInstance().createCarrotDailyBonusView();
            }
        },

        joinGame: function (gameId) {
            if (cc.LoginController.getInstance().checkLogin()) {
                if (this.isLoading) return;

                if (gameId === undefined) { // || gameId === cc.GameId.BLOCK_BUSTER
                    //cc.PopupController.getInstance().showMessage('Sắp ra mắt!');
                    cc.PopupController.getInstance().showMessage('Sắp ra mắt!');
                    return;
                }

                //CHECK LOCATION
                //         if (gameId === cc.GameId.TIEN_LEN_MN
                //             // gameId === cc.GameId.POKER_TEXAS ||
                //             // gameId === cc.GameId.BA_CAY ||
                //             // gameId === cc.GameId.TIEN_LEN_MN_SOLO ||
                //             // gameId === cc.GameId.MAU_BINH
                //         ) {
                //
                //             if (cc.LocationController.getInstance().askEnableLocationService()) {
                //                 //tren native phai goi them lay lat long
                //                 if (cc.sys.isNative) {
                //                     if (cc.LocationController.getInstance().getLatitude() && cc.LocationController.getInstance().getLongitude()) {
                //
                //                     } else {
                //                         cc.PopupController.getInstance().showPopupRequireEnableLocation();
                //                         return;
                //                     }
                //                 } else {
                //
                //                 }
                //
                //             } else {
                //
                //                 if (cc.sys.isNative) {
                //                     cc.PopupController.getInstance().showPopupRequireEnableLocation();
                //                 } else {
                //                     var error = cc.LocationController.getInstance().getGeoErrorCode();
                //
                //                     if (error.code === error.PERMISSION_DENIED) {
                //                         // detailError = "User denied the request for Geolocation.";
                //                         cc.PopupController.getInstance().showMessage('Để tiếp tục chơi game bạn cần cấp quyền thu thập thông tin vị trí.');
                //                     } else if (error.code === error.POSITION_UNAVAILABLE) {
                //                         // detailError = "Location information is unavailable.";
                //                         cc.PopupController.getInstance().showMessage('Để tiếp tục chơi game bạn cần cấp quyền thu thập thông tin vị trí.');
                //                     } else if (error.code === error.TIMEOUT) {
                //                         // detailError = "The request to get user location timed out."
                //                         cc.PopupController.getInstance().showMessage('Để tiếp tục chơi game bạn cần cấp quyền thu thập thông tin vị trí.');
                //                     } else if (error.code === error.UNKNOWN_ERROR) {
                //                         // detailError = "An unknown error occurred."
                //                         cc.PopupController.getInstance().showMessage('Để tiếp tục chơi game bạn cần cấp quyền thu thập thông tin vị trí.');
                //                     } else {
                //                         cc.PopupController.getInstance().showPopupRequireEnableLocation();
                //                     }
                //                 }
                //
                //                 return;
                //             }
                //         }
                // } else {
                //     //Bat yeu cau bat cap nhap phien ban moi
                //     cc.PopupController.getInstance().showMessage('Cập nhật phiên bản mới để chơi');
                //     return;
                // }
                // }

                switch (gameId.toString()) {
                    case cc.GameId.SHOOT_FISH:
                        this.createDynamicView(cc.GameId.SHOOT_FISH);
                        break;

                    //Game slots chinh
                    case cc.GameId.EGYPT:
                        this.createDynamicView(cc.GameId.EGYPT);
                        break;
                    case cc.GameId.THREE_KINGDOM:
                        this.createDynamicView(cc.GameId.THREE_KINGDOM);
                        break;
                    case cc.GameId.AQUARIUM:
                        this.createDynamicView(cc.GameId.AQUARIUM);
                        break;
                    case cc.GameId.DRAGON_BALL:
                        this.createDynamicView(cc.GameId.DRAGON_BALL);
                        break;
                    case cc.GameId.BUM_BUM:
                        this.createDynamicView(cc.GameId.BUM_BUM);
                        break;
                    case cc.GameId.COWBOY:
                        this.createDynamicView(cc.GameId.COWBOY);
                        break;
                    case cc.GameId.THUONG_HAI:
                        this.createDynamicView(cc.GameId.THUONG_HAI);
                        break;
                    case cc.GameId.GAINHAY:
                        this.createDynamicView(cc.GameId.GAINHAY);
                        break;
                    //Game mini full màn hình
                    case cc.GameId.BACCARAT:
                        this.createDynamicView(cc.GameId.BACCARAT);
                        break;
                    case cc.GameId.MONKEY:
                        this.createDynamicView(cc.GameId.MONKEY);
                        break;
                    case cc.GameId.DRAGON_TIGER:
                        this.createDynamicView(cc.GameId.DRAGON_TIGER);
                        break;
                    case cc.GameId.BAUCUA:
                        this.createDynamicView(cc.GameId.BAUCUA);
                        break;
                    //CARD GAME
                    case cc.GameId.XOC_XOC:
                        this.createDynamicView(cc.GameId.XOC_XOC);
                        break;
                    case cc.GameId.POKER_TEXAS:
                    case cc.GameId.BA_CAY:
                    case cc.GameId.TIEN_LEN_MN:
                    case cc.GameId.TIEN_LEN_MN_SOLO:
                        if (cc.BalanceController.getInstance().getBalance() < 10000) {
                            cc.PopupController.getInstance().showMessage('Bạn không đủ tiền để vào phòng. Tối thiểu cần 10.000');
                            return;
                        } else {
                            this.createDynamicView(gameId.toString());
                        }
                        break;
                    case cc.GameId.MAU_BINH:
                        if (cc.BalanceController.getInstance().getBalance() < 30000) {
                            cc.PopupController.getInstance().showMessage('Bạn không đủ tiền để vào phòng. Tối thiểu cần 30.000');
                            return;
                        } else {
                            this.createDynamicView(gameId.toString());
                        }
                        break;
                    //MINI game
                    case cc.GameId.TAI_XIU:
                        this.createDynamicView(cc.GameId.TAI_XIU);
                        break;
                    case cc.GameId.MINI_POKER:
                        this.createDynamicView(cc.GameId.MINI_POKER);
                        break;
                    case cc.GameId.SEVEN77:
                        this.createDynamicView(cc.GameId.SEVEN77);
                        break;
                    case cc.GameId.BLOCK_BUSTER:
                        this.createDynamicView(cc.GameId.BLOCK_BUSTER);
                        break;
                    case cc.GameId.LUCKY_WILD:
                        this.createDynamicView(cc.GameId.LUCKY_WILD);
                        break;

                    case cc.GameId.LODE:
                        this.createDynamicView(cc.GameId.LODE);
                        break;
                    case cc.GameId.VIETLOT:
                        this.createDynamicView(cc.GameId.VIETLOT);
                        break;
                    case '100':
                        cc.PopupController.getInstance().showMessage('Sắp ra mắt');
                        break;
                    case '101':
                        cc.PopupController.getInstance().showMessage('Sắp ra mắt');
                        break;


                }
            }
        },

        refreshAccountInfo: function () {
            var getAccountInfoCommand = new cc.GetAccountInfoCommand;
            getAccountInfoCommand.execute(this);
        },

        activeNodeLobby: function (enable) {
            if (enable) {
                this.activeNodeTopBar(false);
                this.playAudioBg();
            } else {
                this.audioBg.stop();
            }
            this.nodeEventTop.active = enable;

            this.nodeLobbys.forEach(function (nodeLobby) {
                nodeLobby.active = enable;
            });

            cc.LobbyController.getInstance().setLobbyActive(enable);
        },

        activeNodeTopBar: function (enable) {
            this.nodeTopBar.active = enable;
            this.nodeSetting.active = enable;
            this.nodeTopBar.getComponent(cc.TopBarView).isCardGame = enable;
            if (enable) {
                this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR_CARD_GAME;
                this.refreshAccountInfo();
            } else {
                this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR;
            }
        },

        //response
        onGetAccountInfoResponse: function (response) {
            if (response !== null) {
                cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
                cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
                cc.LoginController.getInstance().setTopVPResponse(response.TopVP);
            }
            cc.LobbyController.getInstance().topBarUpdateInfo();
            this.lbTopVp.string = cc.Tool.getInstance().formatNumber(cc.LoginController.getInstance().getTopVPResponse());
        },

        checkVQMMInfo: function () {
            var vqmmGetInfoCommand = new cc.VQMMGetInfoCommand;
            vqmmGetInfoCommand.execute(this);
        },

        onVQMMGetInfoResponse: function (response) {
            //{"Quantity":1,"IsOpen":false,"Response":0}
            if (response !== null && response.Quantity > 0 && response.IsOpen) {
                this.createVQMMView();
            }
        },

        joinGameClicked: function (event, data) {
            if (cc.LoginController.getInstance().checkLogin()) {
                this.joinGame(data);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, cc.DDNA.getInstance().getGameById(data.toString()), cc.DDNAUIType.BUTTON);
            }
        },

        setIsAudioBg: function () {
            this.IsOnAudioBg = !this.IsOnAudioBg;
            cc.Tool.getInstance().setItem('@onAudioBg', this.IsOnAudioBg);
            if (this.IsOnAudioBg)
                this.audioBg.play();
            else
                this.audioBg.stop();
            this.toggleAudio.isChecked = this.IsOnAudioBg;
        },

        playAudioBg: function () {
            if (this.IsOnAudioBg) {
                this.audioBg.play();
            } else {
                this.audioBg.stop();
            }
        }

    });
}).call(this);
