

var netConfig = require('NetConfig');
(function () {
    cc.LoadingView = cc.Class({
        "extends": cc.Component,
        properties: {
            hotUpdate: cc.HotUpdate,
            progressBar: cc.ProgressBar,
            lbProgress: cc.Label,
            lbMessage: cc.Label,


        },

        onLoad: function () {
            if (cc.sys.isNative) {
                if (cc.Device) {
                    cc.Device.setKeepScreenOn(true);
                } else if ( jsb.Device) {
                    jsb.Device.setKeepScreenOn(true);
                } else {
                    // console.log('cc.Device undefined');
                }
            } else {
                // this.getGeolocation();
            }
            this.sceneName = 'lobby';
            // if (!cc.sys.isNative) {
            //     this.loadSceneGame();
            // } else {
            //     var GetBundleVersCommand = new cc.GetBundleVersCommand;
            //     GetBundleVersCommand.execute(this);
            //     //this.hotUpdate.init();
            // }
            this.loadSceneGame();
        },
        
        onGetConfigResponse: function(response) {
            netConfig.HOTS_U = response.host;
            netConfig.HOST = response.api;
            console.log('Loading onGetConfigResponse host: ', response.host);
            console.log('Loading onGetConfigResponse api: ', response.api);
            this.hotUpdate.init();
        },
        // onBundleVersResponse: function(response) {
        //     //cc.log(response)
        //     this.loadSceneGame(response);
        // },
        activeProgressHotUpdate: function (enable) {
            this.lbMessage.node.active = enable;
            if (enable) {
                this.lbMessage.string = 'Đang cập nhật phiên bản mới...';
            }
        },

        setProgressHotUpdate: function (progress,downloadBytes,totalBytes) {
            if (progress) {
                this.progressBar.progress = progress;
               // this.lbProgress.string = Math.round(progress * 100) + '%';
                this.lbProgress.string = Math.round((downloadBytes/totalBytes)*100) + '%';
            } else {
                this.progressBar.progress = 0;
                this.lbProgress.string = '0%';
            }
        },

        loadSceneGame: function () {
            
            var self = this;
            var progress = 0;
      
            self.activeProgressHotUpdate(false);
            self.progressBar.progress = progress / 100;
            self.lbProgress.string = '0%';
            if (cc.sys.isNative){
                let isUpdate = 1;
                
                cc.assetManager.loadBundle('bundles', function (err, bundle) {
                    if (err) {
                        return console.error(err);
                    }
                    
                    cc.assetManager.loadBundle('lobby', function (err, bundlelobby) {
                    if (err) {
                        return console.error(err);
                    }
                    bundlelobby.loadScene(self.sceneName,
                        function (completedCount, totalCount, item) {
                            var tempProgress = Math.round(100 * completedCount / totalCount)                        
                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempProgress > progress) {
                                progress = tempProgress;
                            }
                            self.progressBar.progress = progress / 100;
                            self.lbProgress.string = Math.round(progress) + '%';
                        },
                        function (err, scene) {
                             cc.director.runScene(scene);
                             
                        }
                    );
                });
                });

            }else{
                //var self = this;
                cc.assetManager.loadBundle('bundles', function (err, bundle) {
                    if (err) {
                        return console.error(err);
                    }
                    
                    cc.assetManager.loadBundle('lobby', function (err, bundlelobby) {
                        if (err) {
                            return console.error(err);
                        }
                        bundlelobby.loadScene(self.sceneName,
                            function (completedCount, totalCount, item) {
                                var tempProgress = Math.round(100 * completedCount / totalCount)                        
                                //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                                if (tempProgress > progress) {
                                    progress = tempProgress;
                                }
                                self.lbMessage.string = 'Đang Tải Game ...'
                                self.progressBar.progress = progress / 100;
                                self.lbProgress.string = Math.round(progress) + '%';
                                
                            },
                            function (err, scene) {
                                    cc.director.runScene(scene);
                                    
                            }
                        );
                    });
                }); 
            }
     
        }
    });
}).call(this);
