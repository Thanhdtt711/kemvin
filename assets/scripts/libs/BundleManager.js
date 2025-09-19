(function () {
    cc.BundleManager = cc.Class({
        "extends": cc.Component,

        loadBundle: function (bundle, onLoaded) {
            var itemBundle = cc.assetManager.getBundle(bundle);
            if (itemBundle) {
                itemBundle.releaseAll();
                cc.assetManager.removeBundle(itemBundle);
            }
            // let bundles = cc.BundleManagerController.getInstance().getBundles();
            // cc.log(bundles)
            // let option = {};

            // let urlBundle = bundles[bundle].bundle;
            // if (!bundles.isDev) {
            //     option = { version: bundles[bundle].hash }
            //     urlBundle = bundles[bundle].link;
            // }

            cc.assetManager.loadBundle(bundle, function (err, bundle) {
                if (err) {
                    return console.error(err);
                } else {
                    onLoaded(err, bundle);
                }
            });
        },

        loadAsset: function (bundle, link, onLoaded, onProgess) {
            //cc.log(bundle+"/"+link)
            var itemBundle = cc.assetManager.getBundle(bundle);
            if (itemBundle) {
                if (onProgess == null) {
                    itemBundle.load(link, function (err, prefab) {
                        onLoaded(err, prefab);
                    });
                } else {
                    itemBundle.load(link, onProgess, function (err, prefab) {
                        onLoaded(err, prefab);
                    });
                }
            } else {
                if (onProgess == null) {
                    this.loadBundle(bundle, function (err, bundle) {
                        if (bundle) {
                            bundle.load(link, function (err, prefab) {
                                onLoaded(err, prefab);
                            });
                        }
                    });
                } else {
                    this.loadBundle(bundle, function (err, bundle) {
                        if (bundle) {
                            bundle.load(link, onProgess, function (err, prefab) {
                                onLoaded(err, prefab);
                            });
                        }
                    });
                }
            }
        },

        loadScript: function (bundleScript, onLoaded) {
            let bundles = cc.BundleManagerController.getInstance().getBundles();

            let option = {};
            let urlBundle = bundles[bundleScript].bundle;

            if (!bundles.isDev) {
                option = { version: bundles[bundleScript].hash }
                urlBundle = bundles[bundleScript].link;
            }

            var itemBundle = cc.assetManager.getBundle(bundleScript);
            if (itemBundle) {
                onLoaded(null, itemBundle);
            } else {
                cc.assetManager.loadBundle(urlBundle, option, function (err, bundle) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    onLoaded(err, bundle);
                });
            }
        },

        preloadScene: function (sceneName, onLoaded, onProgess) {
            let bundles = cc.BundleManagerController.getInstance().getBundles();

            let option = {};
            let urlBundle = bundles[sceneName].bundle;

            if (!bundles.isDev) {
                option = { version: bundles[sceneName].hash }
                urlBundle = bundles[sceneName].link;
            }

            var itemBundle = cc.assetManager.getBundle(sceneName);
            if (itemBundle) {
                itemBundle.loadScene(sceneName, onProgess, function (err, scene) {
                    onLoaded(err, scene);
                });
            } else {
                cc.assetManager.loadBundle(urlBundle, option, function (err, bundle) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    bundle.loadScene(sceneName, onProgess, function (err, scene) {
                        onLoaded(err, scene);
                    });
                });
            }
        }
    });
}).call(this);
