cc.Class({
    extends: cc.Component,

    statics: {
        _instance: null,
        getInstance() {
            if (!this._instance) {
                this._instance = new ServerConnector();
            }
            return this._instance;
        }
    },
});

class ServerConnector {
    constructor() {
        this.token = null;
        this.cookie = null;
    }

    sendRequest(subdomain, url, callback) {
        let fakeResponse = JSON.stringify({
            ResponseCode: 1,
            Message: "Fake GET response",
            Data: { balance: 999999, jackpot: 12345 }
        });
        cc.log("[FAKE] GET", subdomain, url, fakeResponse);
        callback(fakeResponse);
    }

    sendRequestPOST(subdomain, url, params, callback) {
        let fakeResponse = JSON.stringify({
            ResponseCode: 1,
            Message: "Fake POST response",
            Data: { result: "ok", params: params }
        });
        cc.log("[FAKE] POST", subdomain, url, fakeResponse);
        callback(fakeResponse);
    }

    getToken() { return this.token; }
    setToken(t) { this.token = t; }
    getCookie() { return this.cookie; }
    setCookie(c) { this.cookie = c; }
}

// Gắn vào cc để toàn project dùng được
cc.ServerConnector = ServerConnector;
