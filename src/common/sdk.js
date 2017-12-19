import service from '@/common/service'
//微信第三方登录
var Wechat = {
    Scene: {
        SESSION:  0, // 聊天界面
        TIMELINE: 1, // 朋友圈
        FAVORITE: 2  // 收藏
    },

    Type: {
        APP:     1,
        EMOTION: 2,
        FILE:    3,
        IMAGE:   4,
        MUSIC:   5,
        VIDEO:   6,
        WEBPAGE: 7
    },

    isInstalled: function (onSuccess, onError) {
        cordova.exec(onSuccess, onError, "Wechat", "isWXAppInstalled", []);
    },

    /**
     * Share a message to wechat app
     *
     * @example
     * <code>
     * Wechat.share({
     *     message: {
     *        title: "Message Title",
     *        description: "Message Description(optional)",
     *        mediaTagName: "Media Tag Name(optional)",
     *        thumb: "http://YOUR_THUMBNAIL_IMAGE",
     *        media: {
     *            type: Wechat.Type.WEBPAGE,   // webpage
     *            webpageUrl: "https://github.com/xu-li/cordova-plugin-wechat"    // webpage
     *        }
     *    },
     *    scene: Wechat.Scene.TIMELINE   // share to Timeline
     * }, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    share: function (message, onSuccess, onError) {
        cordova.exec(onSuccess, onError, "Wechat", "share", [message]);
    },

    /**
     * Sending an auth request to Wechat
     *
     * @example
     * <code>
     * Wechat.auth(function (response) { alert(response.code); });
     * </code>
     */
    auth: function (scope, state, onSuccess, onError) {
        if (typeof scope == "function") {
            // Wechat.auth(function () { alert("Success"); });
            // Wechat.auth(function () { alert("Success"); }, function (error) { alert(error); });
            return cordova.exec(scope, state, "Wechat", "sendAuthRequest");
        }

        if (typeof state == "function") {
            // Wechat.auth("snsapi_userinfo", function () { alert("Success"); });
            // Wechat.auth("snsapi_userinfo", function () { alert("Success"); }, function (error) { alert(error); });
            return cordova.exec(state, onSuccess, "Wechat", "sendAuthRequest", [scope]);
        }

        return cordova.exec(onSuccess, onError, "Wechat", "sendAuthRequest", [scope, state]);
    },

    /**
     * Send a payment request
     *
     * @link https://pay.weixin.qq.com/wiki/doc/api/app.php?chapter=9_1
     * @example
     * <code>
     * var params = {
     *     mch_id: '10000100', // merchant id
     *     prepay_id: 'wx201411101639507cbf6ffd8b0779950874', // prepay id returned from server
     *     nonce: '1add1a30ac87aa2db72f57a2375d8fec', // nonce string returned from server
     *     timestamp: '1439531364', // timestamp
     *     sign: '0CB01533B8C1EF103065174F50BCA001', // signed string
     * };
     * Wechat.sendPaymentRequest(params, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    sendPaymentRequest: function (params, onSuccess, onError) {
        cordova.exec(onSuccess, onError, "Wechat", "sendPaymentRequest", [params]);
    },

    /**
     * jumpToBizProfile （跳转到某个微信公众号）2016-11-11 测试是失效的，囧
     *
     * @link https://segmentfault.com/a/1190000007204624
     * @link https://segmentfault.com/q/1010000003907796
     * @example
     * <code>
     * var params = {
     *     info: 'gh_xxxxxxx', // 公众帐号原始ID
     *     type:  'Normal' // 普通号
     * }
     * or 
     * var params = {
     *     info: 'extMsg', // 相关的硬件二维码串
     *     type:  'Device' // 硬件号
     * };
     * Wechat.jumpToBizProfile(params, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */

    jumpToBizProfile: function (params, onSuccess, onError) {
        cordova.exec(onSuccess, onError, "Wechat", "jumpToBizProfile", [params]);
    },

    /**
     * jumpToWechat （因为jumpToBizProfile失效了，暂时新增了一个临时的api)
     *
     * @link https://segmentfault.com/a/1190000007204624
     * @example
     * <code>
     * var url = "wechat://" 现阶段貌似只支持这一个协议了
     * Wechat.jumpToWechat(url, function () {
     *     alert("Success");
     * }, function (reason) {
     *     alert("Failed: " + reason);
     * });
     * </code>
     */
    jumpToWechat: function (url, onSuccess, onError) {
        cordova.exec(onSuccess, onError, "Wechat", "jumpToWechat", [url]);
    }
};


//第三方QQ登录
var Qq = {
    Scene: {
        QQ:  0, // QQ 好友
        QQZone: 1, // QQ 空间
        Favorite: 2  // 收藏
    },
    ClientType: {
        QQ:  0, // QQ 手机客户端
        TIM: 1 // TIM 客户端
    },
   clientInstalled:function(successCallback,errorCallback){   //检测是否安装
     var args = {};
		 cordova.exec(function(e){
        successCallback && successCallback(e);
     }, function(e){
        errorCallback && errorCallback(e);
     }, "QQSDK", "checkClientInstalled", [args]);
   },
   login:function (successCallback) {   //QQ登录
      var args = {};
      cordova.exec(function(result){
            successCallback && successCallback(result);
        }, function(failReason){
            service.openToast(true,"认证错误"+failReason);
       }, "QQSDK", "ssoLogin",[args]);
   },
   logout:function(successCallback,errorCallback){  //退出
        cordova.exec(function(e){
              successCallback && successCallback(e);
          }, function(e){
            errorCallback && errorCallback(e);
          }, "QQSDK", "logout", []);
   },
    shareText:function(successCallback, errorCallback, args){
        cordova.exec(successCallback, errorCallback, "QQSDK", "shareText", [args]);
    },
    shareImage:function(successCallback, errorCallback, args){
        cordova.exec(successCallback, errorCallback, "QQSDK", "shareImage", [args]);
    },
    shareNews:function(successCallback, errorCallback, args){
        cordova.exec(successCallback, errorCallback, "QQSDK", "shareNews", [args]);
    },
    shareAudio:function(successCallback, errorCallback, args){
        cordova.exec(successCallback, errorCallback, "QQSDK", "shareAudio", [args]);
    },
};


var AliPay = {
    login:function(params,callback){
        cordova.exec(function(e){
          callback && callback(e)
        }, function(e){
          service.openToast(true,"失败："+JSON.stringify(e));
        }, "AliPay", "pay", [params]);
    }
};


export default {
  Qq,Wechat,AliPay
}


//#QQ：（注意把YOUR_QQ_APPID替换成第一步申请的QQ APPID）
//cordova plugin add https://github.com/iVanPan/Cordova_QQ.git --variable QQ_APP_ID=1106330289
//https://github.com/iVanPan/Cordova_QQ
 
//#微信：（注意把YOUR_WECHAT_APPID替换成第一步申请到的微信APPID）
//cordova plugin add https://github.com/xu-li/cordova-plugin-wechat --variable wechatappid=wx8a9f3adeb2140706
//https://github.com/xu-li/cordova-plugin-wechat

//#支付宝：（注意把PARTNER_ID替换成第一步申请到的支付宝PID）
//cordova plugin add https://github.com/chenyuanchn/cordova-plugin-alipay.git --variable PARTNER_ID=2088721863005439
//https://github.com/chenyuanchn/cordova-plugin-alipay