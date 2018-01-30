"use strict";
cc._RF.push(module, '105d2RoN3NOAZzB5165VoSc', 'MJ_Replay');
// Script/SceneScript/Game/MJ_Replay.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MJ_Help = require("./MJ_Help");
var dd = require("./../../Modules/ModuleManager");
var MJ_Replay = /** @class */ (function (_super) {
    __extends(MJ_Replay, _super);
    function MJ_Replay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_pause = null;
        _this.btn_play = null;
        /**
         * canvas脚本
         *
         * @memberof MJ_Table
         */
        _this._canvasTarget = null;
        /**
         * 帧时间
         *
         * @type {number}
         * @memberof MJ_Replay
         */
        _this._frameTime = 0;
        /**
         * 数据索引
         *
         * @type {number}
         * @memberof MJ_Replay
         */
        _this._replayIndex = 0;
        return _this;
    }
    MJ_Replay.prototype.onLoad = function () {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this.node.on("touchend", function (event) {
            event.stopPropagation();
        }, this);
        //如果是重播，就先暂停所有的刷新
        if (dd.gm_manager.replayMJ === 1) {
            dd.gm_manager.isReplayPause = true;
            this.btn_pause.active = false;
            this.btn_play.active = true;
            this._replayIndex = 0;
            this.showReplayInfo();
        }
        else {
            dd.gm_manager.isReplayPause = false;
        }
    };
    MJ_Replay.prototype.update = function (dt) {
        if (!dd.gm_manager.isReplayPause) {
            if (this._frameTime >= 0) {
                this._frameTime -= dt;
                if (this._frameTime <= 0) {
                    this._replayIndex++;
                    this.showReplayInfo();
                }
            }
        }
    };
    /**
     * 设置播放游戏记录的数据
     *
     * @memberof MJ_Replay
     */
    MJ_Replay.prototype.showReplayInfo = function () {
        var _this = this;
        if (this._replayIndex > dd.gm_manager.replayDataList.length - 1) {
            dd.gm_manager.isReplayPause = true;
            this.btn_pause.active = false;
            this.btn_play.active = true;
            this._replayIndex = dd.gm_manager.replayDataList.length;
            dd.ui_manager.showAlert('游戏记录播放完毕,是否重新播放？', '温馨提示', {
                lbl_name: '确定',
                callback: function () {
                    //移除结算面板
                    if (_this._canvasTarget._game_over && _this._canvasTarget._game_over.isValid) {
                        _this._canvasTarget._game_over.removeFromParent(true);
                        _this._canvasTarget._game_over.destroy();
                    }
                    _this._replayIndex = 0;
                    _this.showReplayInfo();
                }
            }, {
                lbl_name: '退出',
                callback: function () {
                    if (dd.ui_manager.showLoading()) {
                        cc.director.loadScene('HomeScene', function () {
                            var canvasScript = dd.ui_manager.getCanvasNode().getComponent('HomeCanvas');
                            if (canvasScript) {
                                canvasScript.showRecord(dd.gm_manager.mjGameData.tableBaseVo.tableId);
                            }
                            dd.gm_manager.destroySelf();
                        });
                    }
                }
            }, 1);
            return;
        }
        var nowReplay = dd.gm_manager.replayDataList[this._replayIndex];
        dd.gm_manager.mjGameData = nowReplay.frameData;
        if (this._replayIndex + 1 < dd.gm_manager.replayDataList.length) {
            var nextReplay = dd.gm_manager.replayDataList[this._replayIndex + 1];
            var ft = MJ_Help.getDiffTime(nowReplay.startTime, nextReplay.startTime);
            this._frameTime = (Number(nextReplay.startTime) - Number(nowReplay.startTime)) / 1000;
        }
        this._canvasTarget.showMJInfo();
    };
    /**
     * 回放按钮点击事件
     *
     * @param {any} event
     * @param {string} type
     * @memberof MJ_Table
     */
    MJ_Replay.prototype.click_btn_replay = function (event, type) {
        dd.mp_manager.playButton();
        switch (type) {
            case '0'://退出
                dd.ui_manager.showAlert('您确定退出播放战绩吗？', '温馨提示', {
                    lbl_name: '确定',
                    callback: function () {
                        if (dd.ui_manager.showLoading()) {
                            cc.director.loadScene('HomeScene', function () {
                                var canvasScript = dd.ui_manager.getCanvasNode().getComponent('HomeCanvas');
                                if (canvasScript) {
                                    canvasScript.showRecord(dd.gm_manager.mjGameData.tableBaseVo.tableId);
                                }
                                dd.gm_manager.destroySelf();
                            });
                        }
                    }
                }, {
                    lbl_name: '取消',
                    callback: function () {
                    }
                }, 1);
                break;
            case '1'://播放
                dd.gm_manager.isReplayPause = false;
                this.btn_pause.active = true;
                this.btn_play.active = false;
                break;
            case '2'://暂停
                dd.gm_manager.isReplayPause = true;
                this.btn_pause.active = false;
                this.btn_play.active = true;
                break;
            case '3'://进
                this._replayIndex++;
                this.showReplayInfo();
                dd.gm_manager.isReplayPause = true;
                this.btn_pause.active = false;
                this.btn_play.active = true;
                break;
            case '4'://退
                if (this._replayIndex > 0) {
                    this._replayIndex--;
                }
                this.showReplayInfo();
                dd.gm_manager.isReplayPause = true;
                this.btn_pause.active = false;
                this.btn_play.active = true;
                break;
            default:
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], MJ_Replay.prototype, "btn_pause", void 0);
    __decorate([
        property(cc.Node)
    ], MJ_Replay.prototype, "btn_play", void 0);
    MJ_Replay = __decorate([
        ccclass
    ], MJ_Replay);
    return MJ_Replay;
}(cc.Component));
exports.default = MJ_Replay;

cc._RF.pop();