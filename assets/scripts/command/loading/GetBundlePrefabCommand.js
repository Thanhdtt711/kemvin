/**
 * Created by Nofear on 2/27/2019.
 */

 var netConfig = require('NetConfig');
 (function () {
     var GetBundlePrefabCommand;
 
     GetBundlePrefabCommand = (function () {
         function GetBundlePrefabCommand() {
         }
 
         GetBundlePrefabCommand.prototype.execute = function (controller) {
             var e, request;
             try {
                 request = cc.loader.getXMLHttpRequest();
                 var urlRequest = 'http://bundle.kem123.xyz/assets/scenes/settings.js';
 
                 request.timeout = 60000;
                 request.open(cc.RequestType.GET, urlRequest); //+ '?' + Math.random()
 
                 request.onreadystatechange = function () {
                     if (request.readyState === 4 && request.status === 200) {
                         var obj = JSON.parse(request.responseText);
 
                         return controller.onBundleVersResponse(obj);
                     }
                 };
                 return request.send();
             } catch (error) {
                 e = error;
                 return console.log('Caught Exception: ' + e.message);
             }
         };
 
         return GetBundlePrefabCommand;
 
     })();
 
     cc.GetBundlePrefabCommand = GetBundlePrefabCommand;
 
 }).call(this);
 