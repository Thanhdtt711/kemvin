var netConfig = require('NetConfig');
(function () {
    cc.HotUpdate = cc.Class({
        "extends": cc.Component,
        properties: {
            loadingView: cc.LoadingView,
            manifestUrl: {
                type: cc.Asset,
                default: null
            },
            _updating: false,
            _canRetry: false,
            _storagePath: ''
        },


        // use this for initialization
        init: function () {
            // Hot update is only available in Native build
            if (!cc.sys.isNative) {
                this.loadingView.loadSceneGame();
                cc.log("hot update")
                return;
            }
            this._storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + 'remote-asset');
            console.log('Storage path for remote asset : ' + this._storagePath);

            // Setup your own version compare handler, versionA and B is versions in string
            // if the return value greater than 0, versionA is greater than B,
            // if the return value equals 0, versionA equals to B,
            // if the return value smaller than 0, versionA is smaller than B.
            this.versionCompareHandle = function (versionA, versionB) {
                console.log("JS Custom Version Compare: version A is " + versionA + ', version B is ' + versionB);
                var vA = versionA.split('.');
                var vB = versionB.split('.');
                for (var i = 0; i < vA.length; ++i) {
                    var a = parseInt(vA[i]);
                    var b = parseInt(vB[i] || 0);
                    if (a === b) {
                        continue;
                    } else {
                        return a - b;
                    }
                }
                if (vB.length > vA.length) {
                    return -1;
                } else {
                    return 0;
                }
            };

            // Init with empty manifest url for testing custom manifest
            if (netConfig.IS_APPSTORE) {
                console.log('HotUpdate jsb.AssetsManager manifestRemoteUrl');
                this.manifestRemoteUrl = netConfig.HOTS_U;
                this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle, this.manifestRemoteUrl);
            } else {
                this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
            }

            // Setup the verification callback, but we don't have md5 check function yet, so only print some message
            // Return true if the verification passed, otherwise return false
            this._am.setVerifyCallback(function (path, asset) {
                // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
                var compressed = asset.compressed;
                // Retrieve the correct md5 value.
                var expectedMD5 = asset.md5;
                // asset.path is relative path and path is absolute.
                var relativePath = asset.path;
                // The size of asset file, but this value could be absent.
                var size = asset.size;
                if (compressed) {
                    console.log("Verification passed : " + relativePath);
                    return true;
                } else {
                    console.log("Verification passed : " + relativePath + ' (' + expectedMD5 + ')');
                    return true;
                }
            });

            console.log('Hot update is ready, please check or directly update.');

            if (cc.sys.os === cc.sys.OS_ANDROID) {
                // Some Android device may slow down the download process when concurrent tasks is too much.
                // The value may not be accurate, please do more test and find what's most suitable for your game.
                this._am.setMaxConcurrentTask(2);
                console.log("Max concurrent tasks count have been limited to 2");
            }

            this.checkUpdate();
        },

        checkCb: function (event) {
            console.log('Code: ' + event.getEventCode());
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    console.log("No local manifest file found, hot update skipped.");
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    console.log("Fail to download manifest file, hot update skipped.");
                    this.loadingView.lbMessage.string = 'Quá trình tải thông tin cập nhật không thành công.\nVui lòng thử lại!';
                    this.loadingView.nodeButtonTryCheckVersion.active = true;
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    console.log("Already up to date with the latest remote version.");
                    this.loadingView.loadSceneGame();
                    break;
                case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                    console.log('New version found, please try to update. (' + this._am.getTotalBytes() + ')');
                    break;
                default:
                    return;
            }

            if (event.getEventCode() === jsb.EventAssetsManager.NEW_VERSION_FOUND) {
                this._am.setEventCallback(null);
                this._checkListener = null;
                this._updating = false;

                console.log("HOT UPDATE: call hotUpdate.");

                //tien hanh cap nhat
                this.hotUpdate();
                //bat UI progress Hot Update
                this.loadingView.activeProgressHotUpdate(true);
            } else {
                this._am.setEventCallback(null);
                this._checkListener = null;
                this._updating = false;
            }

        },

        updateCb: function (event) {
            var needRestart = false;
            var failed = false;
            switch (event.getEventCode()) {
                case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                    console.log('No local manifest file found, hot update skipped.');
                    failed = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                    console.log('HOT UPDATE byteProgress: ' + event.getPercent());
                    console.log('HOT UPDATE fileProgress: ' + event.getPercentByFile());
                    console.log('HOT UPDATE fileLabel: ' + event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                    console.log('HOT UPDATE byteLabel: ' + event.getDownloadedBytes() + ' / ' + event.getTotalBytes());

                    this.loadingView.setProgressHotUpdate(event.getPercentByFile(),event.getDownloadedBytes(),event.getTotalBytes());
                    var msg = event.getMessage();
                    if (msg) {
                        console.log('Updated file: ' + msg);
                        // cc.log(event.getPercent()/100 + '% : ' + msg);
                    }
                    break;
                case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                    console.log('Fail to download manifest file, hot update skipped.');
                    failed = true;
                    break;
                case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    console.log('Already up to date with the latest remote version.');
                    failed = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_FINISHED:
                    console.log('Update finished. ' + event.getMessage());
                    needRestart = true;
                    break;
                case jsb.EventAssetsManager.UPDATE_FAILED:
                    console.log('Update failed. ' + event.getMessage());
                    this.loadingView.lbMessage.string = 'Cập nhật thất bại. Vui lòng thử lại!';
                    this.loadingView.nodeButtonTry.active = true;

                    this._updating = false;
                    this._canRetry = true;
                    break;
                case jsb.EventAssetsManager.ERROR_UPDATING:
                    console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                    break;
                case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                    console.log('Asset decompress error: ' + event.getMessage());
                    break;
                default:
                    break;
            }

            if (failed) {
                this._am.setEventCallback(null);
                this._updateListener = null;
                this._updating = false;
                this.loadingView.lbMessage.string = 'Cập nhật thất bại. Vui lòng thử lại sau';
            }

            if (needRestart) {
                this._am.setEventCallback(null);
                this._updateListener = null;
                // Prepend the manifest's search path
                var searchPaths = jsb.fileUtils.getSearchPaths();
                var newPaths = this._am.getLocalManifest().getSearchPaths();
                console.log('HOT UPDATE: newPaths: ' + JSON.stringify(newPaths));
                Array.prototype.unshift.apply(searchPaths, newPaths);
                // This value will be retrieved and appended to the default search path during game startup,
                // please refer to samples/js-tests/main.js for detailed usage.
                // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
                cc.sys.localStorage.setItem('HotUpdateSearchPaths', JSON.stringify(searchPaths));
                jsb.fileUtils.setSearchPaths(searchPaths);

                cc.audioEngine.stopAll();
                cc.game.restart();
            }
        },

        loadCustomManifest: function () {
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                var manifest = new jsb.Manifest(customManifestStr, this._storagePath);
                this._am.loadLocalManifest(manifest, this._storagePath);
                console.log('Using custom manifest');
            }
        },

        retryCheckVersionClicked: function () {
            this.loadingView.nodeButtonTryCheckVersion.active = false;
            this.checkUpdate();
        },

        retry: function () {
            if (!this._updating && this._canRetry) {
                this._canRetry = false;
                console.log('Retry failed Assets...');
                this.loadingView.activeProgressHotUpdate(true);
                this._am.downloadFailedAssets();
            }
        },

        checkUpdate: function () {
            this.loadingView.activeProgressHotUpdate(true);

            if (this._updating) {
                console.log('Checking or updating ...');
                return;
            }
            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                if (netConfig.IS_APPSTORE) {
                    console.log('HOT UPDATE: loadLocalManifest manifestRemoteUrl: ', this.manifestRemoteUrl);
                    this._am.loadLocalManifest(url, this.manifestRemoteUrl);
                } else {
                    this._am.loadLocalManifest(url);
                }
            }
            if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
                console.log('Failed to load local manifest ...');
                return;
            }
            this._am.setEventCallback(this.checkCb.bind(this));

            if (netConfig.IS_APPSTORE) {
                this._am.checkUpdate(this.manifestRemoteUrl);
            } else {
                this._am.checkUpdate();
            }
            this._updating = true;
        },

        hotUpdate: function () {
            if (this._am && !this._updating) {
                this._am.setEventCallback(this.updateCb.bind(this));

                if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                    // Resolve md5 url
                    var url = this.manifestUrl.nativeUrl;
                    if (cc.loader.md5Pipe) {
                        url = cc.loader.md5Pipe.transformURL(url);
                    }
                    if (netConfig.IS_APPSTORE) {
                        console.log('HOT UPDATE: loadLocalManifest manifestRemoteUrl: ', this.manifestRemoteUrl);
                        this._am.loadLocalManifest(url, this.manifestRemoteUrl);
                    } else {
                        this._am.loadLocalManifest(url);
                    }
                }

                this._failCount = 0;
                if (netConfig.IS_APPSTORE) {
                    this._am.update(this.manifestRemoteUrl);
                } else {
                    this._am.update();
                }
                this._updating = true;
            }
        },

        onDestroy: function () {
            if (this._updateListener) {
                this._am.setEventCallback(null);
                this._updateListener = null;
            }
        }
    });
}).call(this);
