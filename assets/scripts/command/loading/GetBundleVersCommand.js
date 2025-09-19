/**
 * Created by Nofear on 2/27/2019.
 */

 var netConfig = require('NetConfig');
 (function () {
     var GetBundleVersCommand;
 
     GetBundleVersCommand = (function () {
         function GetBundleVersCommand() {
         }
 
         GetBundleVersCommand.prototype.execute = function (controller) {
             var e, request;
             try {
                 request = cc.loader.getXMLHttpRequest();
                 var urlRequest = 'http://caltr.xyz/bundle/assets/bundles/settings.js';
 
                 request.timeout = 60000;
                 request.open("GET", urlRequest); //+ '?' + Math.random()
 
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
 
         return GetBundleVersCommand;
 
     })();
 
     cc.GetBundleVersCommand = GetBundleVersCommand;
 
 }).call(this);
 