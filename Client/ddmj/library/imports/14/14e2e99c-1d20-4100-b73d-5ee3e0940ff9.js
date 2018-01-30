"use strict";
cc._RF.push(module, '14e2emcHSBBALc9XuPglA/5', 'WSManager');
// Script/Modules/WSManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ModuleManager_1 = require("./ModuleManager");
var Protocol_1 = require("./Protocol");
var ENCManager_1 = require("./ENCManager");
var UDManager_1 = require("./UDManager");
/**
 * ws网络管理类
 *
 * @export
 * @class WSManager
 */
var WSManager = /** @class */ (function () {
    function WSManager() {
        /**
         * 心跳间隔时间，单位毫秒
         *
         * @type {number}
         * @memberof WSManager
         */
        this.heartbeatInterval = 5000;
        /**
         * 心跳发送后清零，之后累加
         *
         * @private
         * @type {number}
         * @memberof WSManager
         */
        this.intervalTime = 0;
        /**
         * 消息超时时长
         *
         * @type {number}
         * @memberof WSManager
         */
        this.timeoutTime = 10000;
        /**
         * 心跳最大间隔时间，超过则掉线
         *
         * @type {number}
         * @memberof WSManager
         */
        this.timeoutMax = 30000;
        /**
         * 心跳最早一次发送的时间
         *
         * @private
         * @type {number}
         * @memberof WSManager
         */
        this.heartbeatStart = 0;
        /**
         * 心跳最后一次收到的时间
         *
         * @private
         * @type {number}
         * @memberof WSManager
         */
        this.heartbeatEnd = 0;
        /**
        * 时间调度器id（setInterval）
        *
        * @private
        * @type {number}
        * @memberof WSManager
        */
        this.timeID = null;
        /**
         * ws连接地址
         *
         * @private
         * @type {string}
         * @memberof WSManager
         */
        this.url = null;
        /**
         * WebSocket对象
         *
         * @private
         * @type {WebSocket}
         * @memberof WSManager
         */
        this.ws = null;
        /**
         * 当前连接状态
         *
         * @private
         * @type {number}
         * @memberof WSManager
         */
        this.readyState = null;
        /**
         * 延迟时间，单位毫秒
         *
         * @private
         * @type {number}
         * @memberof WSManager
         */
        this.delayTime = 0;
        /**
         * 存放发送数据的数组，用于判断消息超时
         *
         * @private
         * @type {SendData[]}
         * @memberof WSManager
         */
        this.sendDataArray = [];
        /**
         * 主动断开时发送过来的回调
         *
         * @private
         * @type {Function}
         * @memberof WSManager
         */
        this.cb_close = null;
        /**
         * 是否登录游戏服
         *
         * @private
         * @type {boolean}
         * @memberof WSManager
         */
        this.isLogin = false;
    }
    /**
     * 获取WSManager单例对象
     *
     * @static
     * @returns {WSManager}
     * @memberof WSManager
     */
    WSManager.getInstance = function () {
        if (WSManager._instance === null) {
            WSManager._instance = new WSManager();
        }
        return WSManager._instance;
    };
    /**
     * 修改登录状态
     *
     * @param {boolean} state
     * @memberof WSManager
     */
    WSManager.prototype.setLoginState = function (state) {
        this.isLogin = state;
    };
    /**
     * 连接ws服务器
     *
     * @param {string} url 连接地址
     * @memberof WSManager
     */
    WSManager.prototype.connect = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.ws || url.length < 1 || _this.readyState) {
                _this.destroySelf();
                reject('参数错误');
            }
            _this.readyState = WebSocket.CONNECTING;
            _this.ws = new WebSocket(url);
            _this.ws.binaryType = "arraybuffer";
            /**
             * ws连接上时触发
             */
            _this.ws.onopen = function (ev) {
                _this.readyState = WebSocket.OPEN;
                _this.url = url;
                _this.checkTimeOut();
                resolve();
            };
            /**
             * ws断开连接时触发
             */
            _this.ws.onclose = function (ev) {
                switch (_this.readyState) {
                    case WebSocket.CONNECTING://连接失败
                        reject('连接失败');
                        break;
                    case WebSocket.OPEN://意外断开连接
                        cc.log('意外断开连接');
                        cc.systemEvent.emit('cb_diconnect');
                        break;
                    case WebSocket.CLOSING://客户端主动断开连接
                        cc.log('客户端主动断开连接');
                        if (_this.cb_close) {
                            _this.cb_close();
                        }
                        break;
                    case WebSocket.CLOSED://心跳超时
                        cc.log('心跳超时');
                        cc.systemEvent.emit('cb_diconnect');
                        break;
                    default:
                        cc.log('onclose：未知状态！');
                        cc.systemEvent.emit('cb_diconnect');
                        break;
                }
                _this.destroySelf();
            };
            /**
             * 收到服务器消息时触发
             */
            _this.ws.onmessage = function (ev) {
                var msgId = _this.getMessageId(ev.data, 12);
                var msgBody = _this.getMessageBody(ev.data, 32);
                var s_data = JSON.parse(msgBody);
                if (msgId > 10000) {
                    //服务器的推送消息
                    if (s_data.code === 0) {
                        _this.doPush(msgId, s_data.content);
                    }
                    else {
                        cc.log('推送了错误消息过来');
                    }
                }
                else {
                    //客户端请求返回的数据
                    var sendData = _this.getSendData(msgId);
                    if (sendData) {
                        _this.delayTime = Date.now() - sendData.sendTime;
                        sendData.callback(s_data.code, s_data.content);
                        cc.js.array.remove(_this.sendDataArray, sendData);
                    }
                    else {
                        if (msgId !== Protocol_1.Protocol.ACCOUNT_PING)
                            cc.log('onmessage:协议号' + msgId + '超时或未知');
                    }
                }
            };
        });
    };
    /**
     * 检查消息超时
     *
     * @memberof WSManager
     */
    WSManager.prototype.checkTimeOut = function () {
        var _this = this;
        var dateTime = Date.now();
        this.heartbeatStart = dateTime;
        this.heartbeatEnd = dateTime;
        this.intervalTime = 0;
        this.sendDataArray.length = 0;
        this.timeID = setInterval(function () {
            if (_this.readyState !== WebSocket.OPEN)
                return;
            _this.checkHeartbeat();
            var tempRemove = [];
            _this.sendDataArray.forEach(function (item) {
                if (Date.now() - item.sendTime >= _this.timeoutTime) {
                    ModuleManager_1.ui_manager.showTip('消息超时');
                    ModuleManager_1.ui_manager.hideLoading();
                    item.callback(-1);
                    tempRemove.push(item);
                }
            });
            cc.js.array.removeArray(_this.sendDataArray, tempRemove);
        }, 1000);
    };
    /**
     * 停止心跳检测
     *
     * @memberof WSManager
     */
    WSManager.prototype.stopCheck = function () {
        if (this.timeID) {
            clearInterval(this.timeID);
            this.timeID = null;
        }
    };
    /**
     * 心跳检测
     *
     * @memberof WSManager
     */
    WSManager.prototype.checkHeartbeat = function () {
        var _this = this;
        if (this.intervalTime === 0) {
            this.heartbeatStart = Date.now();
            //发送心跳包
            this.sendMsg(Protocol_1.Protocol.ACCOUNT_HEART, '', function (flag, content) {
                if (flag === 0) {
                    _this.heartbeatEnd = Date.now();
                    _this.delayTime = _this.heartbeatEnd - _this.heartbeatStart;
                    if (_this.isLogin) {
                        var obj = { ping: _this.delayTime };
                        _this.sendMsg(Protocol_1.Protocol.ACCOUNT_PING, JSON.stringify(obj), null);
                    }
                }
                else {
                    cc.log('心跳返回错误了！');
                }
            });
        }
        this.intervalTime += 1000;
        if (this.intervalTime >= this.heartbeatInterval) {
            this.intervalTime = 0;
        }
        if (this.delayTime >= this.timeoutMax) {
            //掉线了
            this.readyState = WebSocket.CLOSED;
            this.ws.close();
        }
    };
    /**
     * 处理服务器推送消息
     *
     * @param {Protocol} msgId 协议号
     * @param {any} content 数据明文对象
     * @memberof WSManager
     */
    WSManager.prototype.doPush = function (msgId, content) {
        switch (msgId) {
            case Protocol_1.Protocol.ACCOUNT_NOTIFY_HOT_PROMPT://红点推送消息
                UDManager_1.default.getInstance().hotTip = content;
                break;
            case Protocol_1.Protocol.MESSAGE_NOTICE_NOTIFY: {
                var isAdd = true;
                var noticeData = content;
                for (var i = 0; i < UDManager_1.default.getInstance().noticeList.length; i++) {
                    var notice = UDManager_1.default.getInstance().noticeList[i];
                    if (notice.msgId === noticeData.msgId) {
                        isAdd = false;
                        break;
                    }
                }
                if (isAdd) {
                    UDManager_1.default.getInstance().noticeList.push(noticeData);
                }
                break;
            }
            case Protocol_1.Protocol.ACCOUNT_NOTIFY_KICK_ACCOUNT://推送消息(帐号被踢下线通知)
                this.disconnect(function () {
                    cc.director.loadScene('LoginScene', function () {
                        ModuleManager_1.ui_manager.showAlert('当前账号已在其他设备登录！', '温馨提示', null, null, 1);
                    });
                });
                break;
            case Protocol_1.Protocol.ACCOUNT_NOTIFY_WALLET://玩家房卡数据
                var wallet = content;
                UDManager_1.default.getInstance().mineData.roomCard = wallet.roomCard;
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_GAMESTATE_NOTIFY://推送消息(游戏状态变化)
                cc.systemEvent.emit('MJ_GamePush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_SEAT_NOTIFY://推送消息(座位数据变化)
                cc.systemEvent.emit('MJ_SeatPush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_DINQUE_NOTIFY://推送消息(定缺数据通知)
                cc.systemEvent.emit('MJ_DingQuePush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_SWAPCARD_NOTIFY://推送消息(换牌数据通知)
                cc.systemEvent.emit('MJ_SwapCardPush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_OUTCARD_NOTIFY://推送消息(出牌数据通知)
                cc.systemEvent.emit('MJ_OutCardPush', content);
                break;
            case Protocol_1.Protocol.CHAT_SEND_NOTIFY://推送消息(聊天信息通知)
                cc.systemEvent.emit('MJ_ChatPush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_BREAKCARD_NOTIFY://推送消息(胡杠碰吃过表态通知)
                cc.systemEvent.emit('MJ_BreakCardPush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_DESTORY_NOTIFY:// 推送消息(房间已解散通知)
                cc.systemEvent.emit('MJ_OutPush', content);
                break;
            case Protocol_1.Protocol.MAJIANG_ROOM_DESTORY_BT_NOTIFY:// 推送消息(桌子解散表态通知)
                cc.systemEvent.emit('MJ_DisbandPush', content);
                break;
            case Protocol_1.Protocol.CORPS_ADD_MEMBER_NOTIFY://推送消息(俱乐部成员添加通知)
                ModuleManager_1.ui_manager.showAlert(content.content, '俱乐部', null, null, 1);
                cc.systemEvent.emit('Club_Add_Member_Push', content);
                break;
            case Protocol_1.Protocol.CORPS_KIC_KMEMBER_NOTIFY:// 推送消息(俱乐部成员移除通知)
                ModuleManager_1.ui_manager.showAlert(content.content, '俱乐部', null, null, 1);
                cc.systemEvent.emit('Club_Kik_Member_Push', content);
                break;
            case Protocol_1.Protocol.CORPS_DESTORY_NOTIFY:// 推送消息(俱乐部解散通知)
                ModuleManager_1.ui_manager.showAlert(content.content, '俱乐部', null, null, 1);
                cc.systemEvent.emit('Club_Destory_Push', content);
                break;
            default: break;
        }
    };
    /**
     * 根据协议号查找对象
     *
     * @param {Protocol} msgId 协议号
     * @returns {SendData} 发送数据对象
     * @memberof WSManager
     */
    WSManager.prototype.getSendData = function (msgId) {
        for (var i = 0, len = this.sendDataArray.length; i < len; i++) {
            var item = this.sendDataArray[i];
            if (item.msgId === msgId) {
                return item;
            }
        }
        return null;
    };
    /**
     * 客户端主动断开连接
     *
     * @memberof WSManager
     */
    WSManager.prototype.disconnect = function (callback) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN && this.readyState === WebSocket.OPEN) {
            this.readyState = WebSocket.CLOSING;
            this.cb_close = callback;
            this.ws.close();
        }
    };
    /**
     * 向服务器发送消息
     *
     * @param {Protocol} msgId 协议号
     * @param {string} msgBody 消息明文
     * @param {(flag: number, content?: string) => void} [callback] 回调函数，flag0为成功，负数失败，-1为超时
     * @returns {boolean} 返回发送结果，成功或失败
     * @memberof WSManager
     */
    WSManager.prototype.sendMsg = function (msgId, msgBody, callback) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            if (callback) {
                var sendData = this.getSendData(msgId);
                if (sendData) {
                    cc.js.array.remove(this.sendDataArray, sendData);
                }
                sendData = {
                    msgId: msgId,
                    sendTime: Date.now(),
                    callback: callback
                };
                this.sendDataArray.push(sendData);
            }
            this.ws.send(this.createMessage(msgId, msgBody));
            return true;
        }
        return false;
    };
    /**
     * 解析消息号
     *
     * @param {ArrayBuffer} buf 服务器传送过来的数据
     * @param {number} offset 偏移量
     * @returns {number} 返回协议号
     * @memberof WSManager
     */
    WSManager.prototype.getMessageId = function (buf, offset) {
        var array = Array.apply([], new Uint8Array(buf));
        var msgId = (((array[offset] & 0xFF) << 24) |
            ((array[offset + 1] & 0xFF) << 16) |
            ((array[offset + 2] & 0xFF) << 8) |
            (array[offset + 3] & 0xFF));
        return msgId;
    };
    /**
     * 解析消息内容
     *
     * @param {ArrayBuffer} buf 服务器传送过来的数据
     * @param {number} offset 偏移量
     * @returns {string} 解析后的字符串数据
     * @memberof WSManager
     */
    WSManager.prototype.getMessageBody = function (buf, offset) {
        var bodyBuffer = buf.slice(offset);
        return this.ArrayBufferToString(bodyBuffer);
    };
    /**
     * 创建消息
     *
     * @param {number} msgId 消息号
     * @param {string} msgBody 消息内容
     * @returns {ArrayBuffer} 待发送数据
     * @memberof WSManager
     */
    WSManager.prototype.createMessage = function (msgId, msgBody) {
        var bodyArray = this.getArrayNumberFromString(msgBody);
        var bodyLen = bodyArray.length;
        var msgHeader = {
            hcheck: 0,
            code: 0,
            flag: 0,
            id: 0,
            timestamp: 0,
            bcheck: 0,
            blen: 0,
            alen: 0,
        };
        msgHeader.id = msgId;
        msgHeader.timestamp = Date.now() / 1000;
        msgHeader.blen = bodyLen;
        msgHeader.bcheck = this.checkSum(bodyArray, 0, bodyLen);
        var headArray = this.getHeaderToArrayNumber(msgHeader);
        msgHeader.hcheck = this.checkSum(headArray, 4, 28);
        headArray = this.getHeaderToArrayNumber(msgHeader);
        var totalArray = headArray.concat(bodyArray);
        return new Uint8Array(totalArray).buffer;
    };
    /**
     * 把消息头转换成int32类型的字节数组
     *
     * @param {MessageHeader} msgHeader 字节头对象
     * @returns {Array<number>} 数组
     * @memberof WSManager
     */
    WSManager.prototype.getHeaderToArrayNumber = function (msgHeader) {
        var headArray = this.numberToArrayNumber(msgHeader.hcheck);
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.code));
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.flag));
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.id));
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.timestamp));
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.bcheck));
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.blen));
        headArray = headArray.concat(this.numberToArrayNumber(msgHeader.alen));
        return headArray;
    };
    /**
     * 把数字转换为int32表示的字节数组
     *
     * @param {number} number 需要转换的数字
     * @returns {Array<number>} 数组
     * @memberof WSManager
     */
    WSManager.prototype.numberToArrayNumber = function (number) {
        var array = [];
        array[0] = ((number >> 24) & 0xFF);
        array[1] = ((number >> 16) & 0xFF);
        array[2] = ((number >> 8) & 0xFF);
        array[3] = (number & 0xFF);
        return array;
    };
    /**
     * 把字符串转换为字节数组
     *
     * @param {string} str 待转换的字符串
     * @returns {Array<number>} 数组
     * @memberof WSManager
     */
    WSManager.prototype.getArrayNumberFromString = function (str) {
        var arrayNumber = Array.apply([], this.StringToArrayBuffer(str));
        return arrayNumber;
    };
    /**
     * 消息数据效验
     *
     * @param {Array<number>} arrayNumber 待校验数组
     * @param {number} offset 偏移量
     * @param {number} length 长度
     * @returns {number} 校验后生成的数字
     * @memberof WSManager
     */
    WSManager.prototype.checkSum = function (arrayNumber, offset, length) {
        var hash = 0;
        for (var i = offset; i < offset + length; i++) {
            hash = hash << 7 ^ arrayNumber[i];
        }
        return hash;
    };
    /**
     * ArrayBuffer转为字符串
     *
     * @param {ArrayBuffer} buf ArrayBuffer对象
     * @returns {string} 转换出来的字符串
     * @memberof WSManager
     */
    WSManager.prototype.ArrayBufferToString = function (buf) {
        var str = String.fromCharCode.apply(null, new Uint8Array(buf));
        str = ENCManager_1.default.getInstance().Utf8Decode(str);
        return str;
    };
    /**
     * 字符串转为ArrayBuffer对象，参数为字符串
     *
     * @param {string} str 待转换的字符串
     * @returns {Uint8Array} 转换后的字节码
     * @memberof WSManager
     */
    WSManager.prototype.StringToArrayBuffer = function (str) {
        str = ENCManager_1.default.getInstance().Utf8Encode(str);
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return bufView;
    };
    /**
     * 获取延迟时间
     *
     * @returns {number}
     * @memberof WSManager
     */
    WSManager.prototype.getDelayTime = function () {
        return this.delayTime;
    };
    /**
     * 清理销毁
     *
     * @memberof WSManager
     */
    WSManager.prototype.destroySelf = function () {
        this.stopCheck();
        this.url = null;
        this.readyState = null;
        this.ws = null;
        this.sendDataArray.length = 0;
        this.heartbeatEnd = 0;
        this.heartbeatStart = 0;
        this.intervalTime = 0;
        this.delayTime = 0;
        this.cb_close = null;
        this.isLogin = false;
        WSManager._instance = null;
    };
    WSManager._instance = null;
    return WSManager;
}());
exports.default = WSManager;

cc._RF.pop();