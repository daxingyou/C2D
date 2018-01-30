(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SceneScript/Home/Mail.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '17f7eR0+e9Nh4vPw87BdQvo', 'Mail', __filename);
// Script/SceneScript/Home/Mail.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var dd = require("./../../Modules/ModuleManager");
var Email = /** @class */ (function (_super) {
    __extends(Email, _super);
    function Email() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 列表容器
         *
         * @type {cc.ScrollView}
         * @memberof Email
         */
        _this.svNode = null;
        /**
         * 没有邮件时显示的节点
         *
         * @type {cc.Node}
         * @memberof Email
         */
        _this.lblNoMail = null;
        /**
         * 邮件的item预设
         *
         * @type {cc.Prefab}
         * @memberof Email
         */
        _this.mail_item_prefab = null;
        /**
         * 邮件列表数据
         *
         * @type {MailVo[]}
         * @memberof Email
         */
        _this._mailList = [];
        return _this;
    }
    Email.prototype.onLoad = function () {
        var _this = this;
        this.node.on("touchend", function (event) {
            dd.ui_manager.isShowPopup = true;
            _this.node.removeFromParent(true);
            _this.node.destroy();
            event.stopPropagation();
        }, this);
        // let obj = {};
        // let msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAIL_MAILLIST, '', function (flag, content) {
            if (flag === 0) {
                _this._mailList = content;
                _this.showMailInfo();
            }
            else if (flag === -1) {
            }
            else {
                cc.log(content);
            }
        });
    };
    /**
     * 读取邮件
     *
     * @param {number} mailId
     * @memberof Email
     */
    Email.prototype.readMail = function (mailId) {
        var _this = this;
        var obj = { mailId: mailId };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.MAIL_MAILVIEW, msg, function (flag, content) {
            if (flag === 0) {
                _this._mailList = content;
            }
            else if (flag === -1) {
            }
            else {
                cc.log(content);
            }
        });
    };
    /**
     * 显示邮件列表信息
     *
     * @memberof Email
     */
    Email.prototype.showMailInfo = function () {
        if (this._mailList) {
            this.svNode.node.active = true;
            this.lblNoMail.active = false;
            this.svNode.content.removeAllChildren();
            for (var i = 0; i < this._mailList.length; i++) {
                this.createMailItem(i, this._mailList[i]);
            }
        }
        else {
            this.svNode.node.active = false;
            this.lblNoMail.active = true;
        }
    };
    /**
     * 创建邮件item
     *
     * @memberof Email
     */
    Email.prototype.createMailItem = function (index, data) {
        var _this = this;
        var mail_item = cc.instantiate(this.mail_item_prefab);
        var mail_item_script = mail_item.getComponent('Mail_Item');
        mail_item_script.updateItem(index, data, function (itemData) {
            _this.readMail(itemData.mailId);
            var str = '   ' + itemData.content + '<br/>    ' + dd.utils.getDateStringByTimestamp(itemData.recvTime, 3);
            dd.ui_manager.showAlert(str, itemData.title, {
                lbl_name: '确定',
                callback: function () {
                    _this.showMailInfo();
                }
            }, null, 0);
        });
        mail_item.parent = this.svNode.content;
    };
    /**
     * 退出
     *
     * @memberof Email
     */
    Email.prototype.click_btn_out = function () {
        dd.mp_manager.playButton();
        dd.ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    };
    __decorate([
        property(cc.ScrollView)
    ], Email.prototype, "svNode", void 0);
    __decorate([
        property(cc.Node)
    ], Email.prototype, "lblNoMail", void 0);
    __decorate([
        property(cc.Prefab)
    ], Email.prototype, "mail_item_prefab", void 0);
    Email = __decorate([
        ccclass
    ], Email);
    return Email;
}(cc.Component));
exports.default = Email;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Mail.js.map
        