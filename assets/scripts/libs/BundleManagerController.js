(function () {
    var BundleManagerController;

    BundleManagerController = (function () {
        var instance;

        function BundleManagerController() {

        }

        instance = void 0;

        BundleManagerController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        BundleManagerController.prototype.setBundles = function (bundles) {
            return this.bundles = bundles;
        };

        BundleManagerController.prototype.getBundles = function () {
            return this.bundles;
        };

        BundleManagerController.prototype.initBundles = function () {
            return this.bundles = {
                "isDev": true,
                "aquarium": {
                  "link": "https://config.kem123.xyz/web/aquarium",
                  "bundle": "aquarium",
                  "hash": "3c2f8"
                },
                "bacarat": {
                  "link": "https://config.kem123.xyz/web/bacarat",
                  "bundle": "bacarat",
                  "hash": "1d611"
                },
                "bacay": {
                  "link": "https://config.kem123.xyz/web/bacay",
                  "bundle": "bacay",
                  "hash": "83096"
                },
                "baucua": {
                  "link": "https://config.kem123.xyz/web/baucua",
                  "bundle": "baucua",
                  "hash": "bbe44"
                },
                "cowboy": {
                  "link": "https://config.kem123.xyz/web/cowboy",
                  "bundle": "cowboy",
                  "hash": "195c6"
                },
                "dragonball": {
                  "link": "https://config.kem123.xyz/web/dragonball",
                  "bundle": "dragonball",
                  "hash": "fbf1f"
                },
                "dragontiger": {
                  "link": "https://config.kem123.xyz/web/dragontiger",
                  "bundle": "dragontiger",
                  "hash": "c94d2"
                },
                "egypt": {
                  "link": "https://config.kem123.xyz/web/egypt",
                  "bundle": "egypt",
                  "hash": "e55a9"
                },
                "game777": {
                  "link": "https://config.kem123.xyz/web/game777",
                  "bundle": "game777",
                  "hash": "db13e"
                },
                "internal": {
                  "link": "https://config.kem123.xyz/web/internal",
                  "bundle": "internal",
                  "hash": "efe26"
                },
                "lobby": {
                  "link": "https://config.kem123.xyz/web/lobby",
                  "bundle": "lobby",
                  "hash": "dadf2"
                },
                "lode": {
                  "link": "https://config.kem123.xyz/web/lode",
                  "bundle": "lode",
                  "hash": "02738"
                },
                "main": {
                  "link": "https://config.kem123.xyz/web/main",
                  "bundle": "main",
                  "hash": "efed5"
                },
                "maubinh": {
                  "link": "https://config.kem123.xyz/web/maubinh",
                  "bundle": "maubinh",
                  "hash": "1b370"
                },
                "minipoker": {
                  "link": "https://config.kem123.xyz/web/minipoker",
                  "bundle": "minipoker",
                  "hash": "8bdb6"
                },
                "poker": {
                  "link": "https://config.kem123.xyz/web/poker",
                  "bundle": "poker",
                  "hash": "5d87a"
                },
                "resources": {
                  "link": "https://config.kem123.xyz/web/resources",
                  "bundle": "resources",
                  "hash": "b1731"
                },
                "scripts": {
                  "link": "https://config.kem123.xyz/web/scripts",
                  "bundle": "scripts",
                  "hash": "f042c"
                },
                "shootFish": {
                  "link": "https://config.kem123.xyz/web/shootFish",
                  "bundle": "shootFish",
                  "hash": "3e596"
                },
                "taixiu": {
                  "link": "https://config.kem123.xyz/web/taixiu",
                  "bundle": "taixiu",
                  "hash": "25773"
                },
                "tienlenMN": {
                  "link": "https://config.kem123.xyz/web/tienlenMN",
                  "bundle": "tienlenMN",
                  "hash": "23890"
                },
                "tienlenMNSoLo": {
                  "link": "https://config.kem123.xyz/web/tienlenMNSoLo",
                  "bundle": "tienlenMNSoLo",
                  "hash": "5dc07"
                },
                "tk": {
                  "link": "https://config.kem123.xyz/web/tk",
                  "bundle": "tk",
                  "hash": "23af7"
                },
                "tq": {
                  "link": "https://config.kem123.xyz/web/tq",
                  "bundle": "tq",
                  "hash": "9c1f2"
                },
                "xocxoc": {
                  "link": "https://config.kem123.xyz/web/xocxoc",
                  "bundle": "xocxoc",
                  "hash": "fcaca"
                }
              };
        };
        return BundleManagerController;

    })();

    cc.BundleManagerController = BundleManagerController;

}).call(this);

