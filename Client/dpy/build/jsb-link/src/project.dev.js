require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BetBTLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae7d3JXbY1Awor8zsXGO47+", "BetBTLayer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var BetBTLayer = function(_super) {
      __extends(BetBTLayer, _super);
      function BetBTLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nodeAddBet = null;
        _this.nodeBigBlind = null;
        _this.nodeBetPool = null;
        _this.addBetPro = null;
        _this.handle = null;
        _this.lblAddBet = null;
        _this.bt_node_list = [];
        _this.btn_bigBlind_list = [];
        _this.btn_betPool_list = [];
        _this._maxAddBet = 0;
        _this._minAddBet = 0;
        _this._curAddBet = 0;
        _this._bigBlind = 0;
        _this._firstPos = cc.v2(0, 0);
        _this._endPos = cc.v2(0, 0);
        return _this;
      }
      BetBTLayer.prototype.onLoad = function() {
        var _this = this;
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_START, function(event) {
          var touches = event.getTouches();
          _this._firstPos = touches[0].getLocation();
          _this.bt_node_list[3].opacity = 0;
          _this.nodeBetPool.active = false;
          _this.nodeBigBlind.active = false;
          _this.showAddBet();
        }, this);
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          var touches = event.getTouches();
          _this._endPos = touches[0].getLocation();
          var d = cc.pDistance(_this._firstPos, _this._endPos);
          if (d <= 2) return;
          var delta = touches[0].getDelta();
          var maxLen = _this.handle.parent.height;
          _this.handle.y += delta.y;
          _this.handle.y < -maxLen / 2 ? _this.handle.y = -maxLen / 2 : _this.handle.y > maxLen / 2 && (_this.handle.y = maxLen / 2);
          var pro = (_this.handle.y + maxLen / 2) / maxLen;
          _this.addBetPro.progress = pro;
          var curAddBet = Math.floor(_this._maxAddBet * pro);
          if (curAddBet === _this._maxAddBet) _this.lblAddBet.string = "ALLIN"; else if (curAddBet < _this._minAddBet) _this.lblAddBet.string = curAddBet.toString(); else {
            curAddBet = Math.ceil((curAddBet - _this._minAddBet) / _this._bigBlind) * _this._bigBlind + _this._minAddBet;
            _this.lblAddBet.string = curAddBet.toString();
          }
          _this._curAddBet = curAddBet;
        }, this);
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_END, this.touchAddBetEnd, this);
        this.bt_node_list[3].on(cc.Node.EventType.TOUCH_CANCEL, this.touchAddBetEnd, this);
      };
      BetBTLayer.prototype.touchAddBetEnd = function() {
        this.nodeAddBet.active = false;
        this.bt_node_list[3].opacity = 255;
        this._curAddBet >= this._minAddBet && this.sendBetBT(4, this._curAddBet);
        var tableData = dd.gm_manager.getTableData();
        if (tableData) if (Number(tableData.poolMoneys) > 4 * tableData.bigBlind) {
          this.nodeBetPool.active = true;
          this.nodeBigBlind.active = false;
        } else {
          this.nodeBetPool.active = false;
          this.nodeBigBlind.active = true;
        }
      };
      BetBTLayer.prototype.init = function() {
        this.nodeAddBet.active = false;
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
          this.node.active = true;
          var shouldBet = Number(tableData.maxBetMoney) - Number(mineSeat.betMoney);
          if (Number(mineSeat.currMoney) > shouldBet) {
            this.bt_node_list[1].active = shouldBet > 0;
            this.bt_node_list[2].active = !(shouldBet > 0);
            if (Number(mineSeat.currMoney) > 2 * dd.gm_manager.poolMoneys) {
              this.bt_node_list[0].active = false;
              this.bt_node_list[3].active = true;
              this.bt_node_list[3].opacity = 255;
            } else {
              this.bt_node_list[0].active = true;
              this.bt_node_list[3].active = false;
            }
          } else {
            this.bt_node_list[0].active = true;
            this.bt_node_list[1].active = false;
            this.bt_node_list[2].active = false;
            this.bt_node_list[3].active = false;
          }
        } else this.node.active = false;
        this.showSpecialAddBet();
      };
      BetBTLayer.prototype.showSpecialAddBet = function() {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
          var shouldBet = Number(tableData.maxBetMoney) - Number(mineSeat.betMoney);
          var dMoney = Number(mineSeat.currMoney) - shouldBet;
          var minAddBet = 2 * dd.gm_manager.poolMoneys;
          if (Number(tableData.poolMoneys) > 4 * tableData.bigBlind) {
            this.nodeBetPool.active = true;
            this.nodeBigBlind.active = false;
            var pm = Number(tableData.poolMoneys);
            var pm1 = Math.ceil(Math.ceil(.5 * pm) / tableData.bigBlind) * tableData.bigBlind;
            this.btn_betPool_list[0].interactable = dMoney >= pm1 && pm1 >= minAddBet;
            var pm2 = Math.ceil(Math.ceil(2 * pm / 3) / tableData.bigBlind) * tableData.bigBlind;
            this.btn_betPool_list[1].interactable = dMoney >= pm2 && pm2 >= minAddBet;
            var pm3 = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
            this.btn_betPool_list[2].interactable = dMoney >= pm3 && pm3 >= minAddBet;
          } else {
            this.nodeBetPool.active = false;
            this.nodeBigBlind.active = true;
            var b1 = 3 * tableData.bigBlind;
            this.btn_bigBlind_list[0].interactable = dMoney >= b1 && b1 >= minAddBet;
            var b2 = 4 * tableData.bigBlind;
            this.btn_bigBlind_list[1].interactable = dMoney >= b2 && b2 >= minAddBet;
            var pm = Number(tableData.poolMoneys);
            var pm3 = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
            this.btn_bigBlind_list[2].interactable = dMoney >= pm3 && pm3 >= minAddBet;
          }
        }
      };
      BetBTLayer.prototype.showAddBet = function() {
        this.nodeAddBet.active = true;
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
          var r_max = Math.ceil(dd.gm_manager.poolMoneys / tableData.bigBlind) * tableData.bigBlind;
          0 === r_max && (r_max = tableData.bigBlind);
          this._minAddBet = 2 * r_max - Number(mineSeat.betMoney);
          this._maxAddBet = Number(mineSeat.currMoney);
          this._bigBlind = tableData.bigBlind;
          this._curAddBet = this._minAddBet;
          this.lblAddBet.string = this._minAddBet.toString();
          var pro = this._minAddBet / this._maxAddBet;
          var maxLen = this.handle.parent.height;
          var curY = maxLen * pro - maxLen / 2;
          this.handle.y = curY;
          this.addBetPro.progress = pro;
        }
      };
      BetBTLayer.prototype.click_btn_state = function(event, type) {
        switch (type) {
         case "1":
          this.sendBetBT(1, 0);
          break;

         case "2":
          this.sendBetBT(2, 0);
          break;

         case "3":
          var mineSeat_1 = dd.gm_manager.getMineSeat();
          var tableData = dd.gm_manager.getTableData();
          if (mineSeat_1 && tableData) {
            var shouldBet = Number(tableData.maxBetMoney) - Number(mineSeat_1.betMoney);
            this.sendBetBT(3, shouldBet);
          }
          break;

         case "4":
          this.showAddBet();
          break;

         case "5":
          var mineSeat = dd.gm_manager.getMineSeat();
          this.sendBetBT(5, Number(mineSeat.currMoney));
        }
      };
      BetBTLayer.prototype.sendBetBT = function(bt, btVal) {
        var _this = this;
        var mineSeat = dd.gm_manager.getMineSeat();
        if (mineSeat) {
          btVal >= Number(mineSeat.currMoney) && (btVal = Number(mineSeat.currMoney));
          this.node.active = false;
          var obj = {
            tableId: dd.gm_manager.getTableData().tableId,
            bt: bt,
            btVal: btVal
          };
          var msg = JSON.stringify(obj);
          dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_BT, msg, function(flag, content) {
            if (0 === flag) ; else if (-1 === flag) {
              _this.node.active = true;
              dd.ui_manager.showTip("表态消息发送超时");
            } else {
              _this.node.active = true;
              dd.ui_manager.showTip(content);
            }
          });
        }
      };
      BetBTLayer.prototype.click_btn_bigBlind = function(event, type) {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) switch (type) {
         case "1":
          this.sendBetBT(4, 3 * tableData.bigBlind);
          break;

         case "2":
          this.sendBetBT(4, 4 * tableData.bigBlind);
          break;

         case "3":
          var pm = Number(tableData.poolMoneys);
          pm = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
          this.sendBetBT(4, pm);
        }
      };
      BetBTLayer.prototype.click_btn_betPool = function(event, type) {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) {
          var pm = Number(tableData.poolMoneys);
          switch (type) {
           case "1":
            pm = Math.ceil(Math.ceil(.5 * pm) / tableData.bigBlind) * tableData.bigBlind;
            this.sendBetBT(4, pm);
            break;

           case "2":
            pm = Math.ceil(Math.ceil(2 * pm / 3) / tableData.bigBlind) * tableData.bigBlind;
            this.sendBetBT(4, pm);
            break;

           case "3":
            pm = Math.ceil(pm / tableData.bigBlind) * tableData.bigBlind;
            this.sendBetBT(4, pm);
          }
        }
      };
      __decorate([ property(cc.Node) ], BetBTLayer.prototype, "nodeAddBet", void 0);
      __decorate([ property(cc.Node) ], BetBTLayer.prototype, "nodeBigBlind", void 0);
      __decorate([ property(cc.Node) ], BetBTLayer.prototype, "nodeBetPool", void 0);
      __decorate([ property(cc.ProgressBar) ], BetBTLayer.prototype, "addBetPro", void 0);
      __decorate([ property(cc.Node) ], BetBTLayer.prototype, "handle", void 0);
      __decorate([ property(cc.Label) ], BetBTLayer.prototype, "lblAddBet", void 0);
      __decorate([ property([ cc.Node ]) ], BetBTLayer.prototype, "bt_node_list", void 0);
      __decorate([ property([ cc.Button ]) ], BetBTLayer.prototype, "btn_bigBlind_list", void 0);
      __decorate([ property([ cc.Button ]) ], BetBTLayer.prototype, "btn_betPool_list", void 0);
      BetBTLayer = __decorate([ ccclass ], BetBTLayer);
      return BetBTLayer;
    }(cc.Component);
    exports.default = BetBTLayer;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  ButtonLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be2447zq/dBz6b7SeH2ez8V", "ButtonLayer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var ButtonLayer = function(_super) {
      __extends(ButtonLayer, _super);
      function ButtonLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nodeBetBT = null;
        _this.leave = null;
        _this.stand = null;
        _this.share = null;
        _this.arrow = null;
        _this.history = null;
        _this.win = null;
        _this.player = null;
        _this.expression = null;
        _this.buyBet = null;
        _this.dotNode = null;
        _this.lab_dot = null;
        _this.bq_board = null;
        _this.reviewLayer = null;
        _this.settlementLayer = null;
        _this.playersLayer = null;
        _this.emailLayer = null;
        _this.left_board = null;
        _this.bq_close = null;
        _this.startNode = null;
        _this.waitNode = null;
        _this.emailItem = null;
        _this.reviewItem = null;
        _this.settlementItem = null;
        _this.playerItem = null;
        _this.pre_buy = null;
        _this.isOpen = false;
        _this.bq_isShow = false;
        _this.left_isShow = false;
        return _this;
      }
      ButtonLayer.prototype.onLoad = function() {
        cc.systemEvent.on("betBT", this.showBetBTLayer, this);
        this.isOpen = false;
        this.change();
        this.initBQ();
        if (dd.gm_manager.isMineCreater()) {
          this.dotNode.active = true;
          this.updateOrderCount();
        } else this.dotNode.active = false;
        this.showBetBTLayer();
        dd.gm_manager.btnScript = this;
      };
      ButtonLayer.prototype.onDestroy = function() {
        cc.systemEvent.off("betBT", this.showBetBTLayer, this);
      };
      ButtonLayer.prototype.showBetBTLayer = function() {
        var mineSeat = dd.gm_manager.getMineSeat();
        var tableData = dd.gm_manager.getTableData();
        if (mineSeat && tableData) if (tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_1 || tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_2 || tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_3 || tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_4) if (tableData.btIndex === mineSeat.seatIndex && 0 === mineSeat.btState) {
          this.nodeBetBT.active = true;
          var betBT = this.nodeBetBT.getComponent("BetBTLayer");
          betBT.init();
          this.closeAll();
          dd.mp_manager.playBet();
        } else this.nodeBetBT.active = false; else this.nodeBetBT.active = false; else this.nodeBetBT.active = false;
      };
      ButtonLayer.prototype.updateOrderCount = function() {
        var _this = this;
        var obj = {
          accountId: dd.ud_manager.account_mine.accountId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.HOTPROMPT_GET_HOTDATA, msg, function(flag, content) {
          if (0 === flag) {
            var hots = content;
            hots.forEach(function(hot) {
              if (hot.hotKey === dd.hot_key.HOT_KEY_ORDER) {
                dd.gm_manager.orderCount > -1 && dd.gm_manager.orderCount < hot.hotVal && dd.mp_manager.playMsg();
                dd.gm_manager.orderCount = hot.hotVal;
              }
            }, _this);
          }
        });
      };
      ButtonLayer.prototype.initBQ = function() {
        var _this = this;
        dd.img_manager.bqSpriteFrames.forEach(function(spriteFrame) {
          var node = new cc.Node();
          node.width = 80;
          node.height = 80;
          node.tag = Number(spriteFrame.name);
          node.on(cc.Node.EventType.TOUCH_END, function(event) {
            cc.log("发送表情");
            cc.log(event.getCurrentTarget());
            var obj = {
              tableId: dd.gm_manager.getTableData().tableId,
              type: 1,
              content: event.getCurrentTarget().tag
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.CHAT_SEND, msg, function(flag, content) {
              0 !== flag && dd.ui_manager.showTip(content);
            });
            _this.closeAll();
          }, _this);
          var spriteNode = new cc.Node();
          spriteNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
          spriteNode.parent = node;
          node.parent = _this.bq_board;
        });
        var closeNode = new cc.Node();
        closeNode.width = 80;
        closeNode.height = 80;
        closeNode.on(cc.Node.EventType.TOUCH_END, function(event) {
          _this.hideBQBoard();
        }, this);
        var sprite = new cc.Node();
        sprite.addComponent(cc.Sprite).spriteFrame = this.bq_close;
        sprite.parent = closeNode;
        closeNode.parent = this.bq_board;
      };
      ButtonLayer.prototype.showBQBoard = function() {
        if (this.bq_isShow) return;
        this.bq_isShow = true;
        this.bq_board.stopAllActions();
        var endY = -this.node.height / 2 + this.bq_board.height / 2;
        var len = endY - this.bq_board.y;
        var rate = len / this.bq_board.height;
        this.runMoveAction(this.bq_board, rate, cc.p(0, endY));
      };
      ButtonLayer.prototype.hideBQBoard = function() {
        if (!this.bq_isShow) return;
        this.bq_isShow = false;
        this.bq_board.stopAllActions();
        var endY = -this.node.height / 2 - this.bq_board.height / 2;
        var len = this.bq_board.y - endY;
        var rate = len / this.bq_board.height;
        this.runMoveAction(this.bq_board, rate, cc.p(0, endY));
      };
      ButtonLayer.prototype.showLFBoard = function() {
        if (this.left_isShow) return;
        this.left_isShow = true;
        this.left_board.stopAllActions();
        var endX = -this.node.width / 2 + this.left_board.width / 2;
        var len = endX - this.left_board.x;
        var rate = len / this.left_board.width;
        this.runMoveAction(this.left_board, rate, cc.p(endX, 0));
      };
      ButtonLayer.prototype.hideLFBoard = function() {
        var _this = this;
        if (!this.left_isShow) return;
        this.left_isShow = false;
        this.left_board.stopAllActions();
        var endX = -this.node.width / 2 - this.left_board.width / 2;
        var len = this.left_board.x - endX;
        var rate = len / this.left_board.width;
        this.runMoveAction(this.left_board, rate, cc.p(endX, 0), function() {
          _this.showNode();
        });
      };
      ButtonLayer.prototype.runMoveAction = function(node, rate, point, endAction) {
        var moveAction = cc.moveTo(.3 * rate, point);
        var callback = cc.callFunc(function() {
          node.setPosition(point);
          endAction && endAction();
        }, this);
        node.runAction(cc.sequence(moveAction, callback));
      };
      ButtonLayer.prototype.click_arrow = function(event, data) {
        dd.mp_manager.playButton();
        this.isOpen = !this.isOpen;
        this.change();
        this.hideBQBoard();
        this.hideLFBoard();
      };
      ButtonLayer.prototype.closeAll = function() {
        dd.mp_manager.playButton();
        this.isOpen = false;
        this.change();
        this.hideBQBoard();
        this.hideLFBoard();
      };
      ButtonLayer.prototype.change = function() {
        this.arrow.rotation = this.isOpen ? 180 : 0;
        this.history.active = this.isOpen;
        this.win.active = this.isOpen;
        this.player.active = this.isOpen;
        this.leave.active = this.isOpen;
        this.stand.active = !(!this.isOpen || !dd.gm_manager.getMineSeat());
        this.share.active = this.isOpen;
        this.expression.active = !(!this.isOpen || !dd.gm_manager.getMineSeat());
        this.buyBet.active = this.isOpen;
      };
      ButtonLayer.prototype.showNode = function(node) {
        this.reviewLayer.active = this.reviewLayer === node;
        this.settlementLayer.active = this.settlementLayer === node;
        this.playersLayer.active = this.playersLayer === node;
        this.emailLayer.active = this.emailLayer === node;
      };
      ButtonLayer.prototype.click_history = function() {
        var _this = this;
        this.closeAll();
        this.showNode(this.reviewLayer);
        var sv = cc.find("sv", this.reviewLayer).getComponent(cc.ScrollView);
        sv.scrollToTop();
        sv.content.destroyAllChildren();
        var cardLayout = cc.find("top/cardLayout", this.reviewLayer);
        cardLayout.destroyAllChildren();
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_PREV_FIGHT, msg, function(flag, content) {
          if (0 === flag) {
            var data = content;
            if (data.items && data.items.length > 0) {
              for (var i = 0; i < 5; i++) {
                var cardId = 0;
                data.tableCards && data.tableCards.length > i && (cardId = data.tableCards[i]);
                var cardNode = new cc.Node();
                var sprite = cardNode.addComponent(cc.Sprite);
                sprite.spriteFrame = dd.img_manager.getPokerSpriteFrameById(cardId);
                sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                cardNode.width = 50;
                cardNode.height = 70;
                cardNode.parent = cardLayout;
              }
              data.items.forEach(function(item) {
                var itemNode = cc.instantiate(_this.reviewItem);
                itemNode.getComponent("ReviewItem").init(item);
                itemNode.parent = sv.content;
              }, _this);
            }
            _this.showLFBoard();
          } else -1 === flag ? dd.ui_manager.showTip("上局回顾消息发送超时!") : dd.ui_manager.showTip(content);
        });
      };
      ButtonLayer.prototype.click_win = function() {
        var _this = this;
        this.closeAll();
        this.showNode(this.settlementLayer);
        var sv = cc.find("sv", this.settlementLayer).getComponent(cc.ScrollView);
        sv.scrollToTop();
        sv.content.destroyAllChildren();
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_PLAYER_ONCE_WINSCORE, msg, function(flag, content) {
          return __awaiter(_this, void 0, void 0, function() {
            var _this = this;
            var data, infoNode, _a;
            return __generator(this, function(_b) {
              switch (_b.label) {
               case 0:
                if (!(0 === flag)) return [ 3, 2 ];
                data = content;
                infoNode = cc.find("info", this.settlementLayer);
                _a = cc.find("head/mask/img", infoNode).getComponent(cc.Sprite);
                return [ 4, dd.img_manager.loadURLImage(dd.ud_manager.account_mine.roleAttribVo.headImg) ];

               case 1:
                _a.spriteFrame = _b.sent();
                cc.find("nick", infoNode).getComponent(cc.Label).string = dd.utils.getStringBySize(dd.ud_manager.account_mine.roleAttribVo.nick, 12);
                cc.find("gold", infoNode).getComponent(cc.Label).string = data.currMoney;
                cc.find("bet", infoNode).getComponent(cc.Label).string = data.buyTotalMoney;
                data.items && data.items.length > 0 && data.items.forEach(function(item) {
                  var itemNode = cc.instantiate(_this.settlementItem);
                  cc.find("index", itemNode).getComponent(cc.Label).string = "第" + item.gameNum + "局";
                  cc.find("gold", itemNode).getComponent(cc.Label).string = item.winScore;
                  itemNode.parent = sv.content;
                }, this);
                this.showLFBoard();
                return [ 3, 3 ];

               case 2:
                -1 === flag ? dd.ui_manager.showTip("个人盈亏消息发送超时!") : dd.ui_manager.showTip(content);
                _b.label = 3;

               case 3:
                return [ 2 ];
              }
            });
          });
        });
      };
      ButtonLayer.prototype.click_player = function() {
        var _this = this;
        this.closeAll();
        this.showNode(this.playersLayer);
        var sv = cc.find("sv", this.playersLayer).getComponent(cc.ScrollView);
        sv.scrollToTop();
        sv.content.destroyAllChildren();
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_PLAYER_LIST, msg, function(flag, content) {
          return __awaiter(_this, void 0, void 0, function() {
            var _this = this;
            var data, str;
            return __generator(this, function(_a) {
              if (0 === flag) {
                data = content;
                str = Number(data.insuranceScore) > 0 ? "+" + data.insuranceScore : data.insuranceScore;
                cc.find("top/gold", this.playersLayer).getComponent(cc.Label).string = str;
                data.items && data.items.length > 0 && data.items.forEach(function(item) {
                  var playerNode = cc.instantiate(_this.playerItem);
                  playerNode.getComponent("PlayerItem").init(item);
                  playerNode.parent = sv.content;
                }, this);
                this.showLFBoard();
              } else -1 === flag ? dd.ui_manager.showTip("房内用户消息发送超时!") : dd.ui_manager.showTip(content);
              return [ 2 ];
            });
          });
        });
      };
      ButtonLayer.prototype.click_expression = function() {
        this.closeAll();
        this.showBQBoard();
      };
      ButtonLayer.prototype.click_leave = function() {
        this.closeAll();
        if (dd.ui_manager.showLoading("正在离开桌子,请稍后")) {
          var obj = {
            tableId: dd.gm_manager.getTableData().tableId
          };
          var msg = JSON.stringify(obj);
          dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_LEAVE, msg, function(flag, content) {
            0 === flag ? cc.director.loadScene("HomeScene") : -1 === flag ? dd.ui_manager.showTip("退出桌子消息发送超时!") : dd.ui_manager.showTip(content);
          });
        } else dd.ui_manager.showTip("游戏中不能离开桌子!");
      };
      ButtonLayer.prototype.click_stand = function() {
        this.closeAll();
        var mineSeat = dd.gm_manager.getMineSeat();
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId,
          seatIndex: mineSeat.seatIndex
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_SEAT_UP, msg, function(flag, content) {
          0 === flag ? dd.ui_manager.showTip("离开座位") : -1 === flag ? dd.ui_manager.showTip("站起消息发送超时!") : dd.ui_manager.showTip(content);
        });
      };
      ButtonLayer.prototype.click_share = function() {
        this.closeAll();
        dd.js_call_native.wxShare(dd.config.cd.ipaUrl, "德扑约", "我在德扑约房间:" + dd.gm_manager.getTableData().tableId + "中,约吗?");
      };
      ButtonLayer.prototype.click_dot = function() {
        var _this = this;
        this.closeAll();
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_QUERY_BUYCHIP_LIST, "", function(flag, content) {
          if (0 === flag) {
            var datas = content.items;
            if (datas && datas.length > 0) {
              _this.showNode(_this.emailLayer);
              var sv_1 = _this.emailLayer.getComponent(cc.ScrollView);
              sv_1.content.destroyAllChildren();
              datas.forEach(function(order) {
                var itemNode = cc.instantiate(_this.emailItem);
                itemNode.getComponent("EmailItem").init(order, _this.doDot);
                itemNode.parent = sv_1.content;
              }, _this);
              sv_1.scrollToTop();
              _this.showLFBoard();
            } else dd.ui_manager.showTip("当前没有申购记录!");
          } else -1 === flag ? dd.ui_manager.showTip("获取申购数据超时!") : dd.ui_manager.showTip(content);
        });
      };
      ButtonLayer.prototype.doDot = function(bt, id, node) {
        var obj = {
          itemId: id,
          bt: bt
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TRANS_BUYCHIP_ITEM, msg, function(flag, content) {
          if (0 === flag) {
            1 === bt ? dd.ui_manager.showTip("已同意该申请!") : dd.ui_manager.showTip("已忽略该申请!");
            node.destroy();
          } else -1 === flag ? dd.ui_manager.showTip("处理申购记录超时!") : dd.ui_manager.showTip(content);
        });
      };
      ButtonLayer.prototype.click_buy = function() {
        this.closeAll();
        cc.instantiate(this.pre_buy).parent = this.node;
      };
      ButtonLayer.prototype.click_start = function() {
        dd.ui_manager.showLoading("正在准备开始游戏");
        this.closeAll();
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_START_RUN, JSON.stringify({
          tableId: dd.gm_manager.getTableData().tableId
        }), function(flag, content) {
          0 === flag ? dd.ui_manager.showTip("游戏开始") : dd.ui_manager.showTip("游戏启动失败!");
        });
      };
      ButtonLayer.prototype.update = function(dt) {
        if (dd && dd.gm_manager && dd.gm_manager.getTableData()) {
          if (this.dotNode.active) {
            if (dd.gm_manager.orderCount > 0) {
              this.lab_dot.node.parent.active = true;
              this.lab_dot.string = dd.gm_manager.orderCount.toString();
            } else {
              this.lab_dot.string = "";
              this.lab_dot.node.parent.active = false;
            }
            this.left_isShow && this.emailLayer.active && this.emailLayer.getComponent(cc.ScrollView).content.childrenCount <= 0 && this.closeAll();
          }
          if (1 !== dd.gm_manager.getTableData().start) if (dd.gm_manager.isMineCreater()) {
            this.startNode.active = true;
            dd.gm_manager.getSeatDownCount() > 1 ? this.startNode.getComponent(cc.Button).interactable = true : this.startNode.getComponent(cc.Button).interactable = false;
          } else this.waitNode.active = true; else {
            this.startNode.active = false;
            this.waitNode.active = false;
          }
        }
      };
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "nodeBetBT", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "leave", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "stand", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "share", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "arrow", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "history", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "win", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "player", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "expression", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "buyBet", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "dotNode", void 0);
      __decorate([ property(cc.Label) ], ButtonLayer.prototype, "lab_dot", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "bq_board", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "reviewLayer", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "settlementLayer", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "playersLayer", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "emailLayer", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "left_board", void 0);
      __decorate([ property(cc.SpriteFrame) ], ButtonLayer.prototype, "bq_close", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "startNode", void 0);
      __decorate([ property(cc.Node) ], ButtonLayer.prototype, "waitNode", void 0);
      __decorate([ property(cc.Prefab) ], ButtonLayer.prototype, "emailItem", void 0);
      __decorate([ property(cc.Prefab) ], ButtonLayer.prototype, "reviewItem", void 0);
      __decorate([ property(cc.Prefab) ], ButtonLayer.prototype, "settlementItem", void 0);
      __decorate([ property(cc.Prefab) ], ButtonLayer.prototype, "playerItem", void 0);
      __decorate([ property(cc.Prefab) ], ButtonLayer.prototype, "pre_buy", void 0);
      ButtonLayer = __decorate([ ccclass ], ButtonLayer);
      return ButtonLayer;
    }(cc.Component);
    exports.default = ButtonLayer;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  BuyLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33b46No0d5L7r2VtpXcTTq5", "BuyLayer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var BuyLayer = function(_super) {
      __extends(BuyLayer, _super);
      function BuyLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lab_min = null;
        _this.lab_max = null;
        _this.lab_buy = null;
        _this.maxIndex = 0;
        _this.min = 0;
        return _this;
      }
      BuyLayer.prototype.onLoad = function() {
        var tableData = dd.gm_manager.getTableData();
        this.min = tableData.joinChip;
        this.maxIndex = Math.floor(tableData.buyMaxChip / tableData.joinChip);
        this.lab_min.string = tableData.joinChip.toString();
        this.lab_max.string = tableData.buyMaxChip.toString();
        this.lab_buy.string = this.lab_min.string;
        this.lab_buy.node.tag = 0;
      };
      BuyLayer.prototype.click_board = function() {
        dd.mp_manager.playButton();
        this.node.destroy();
      };
      BuyLayer.prototype.click_add = function() {
        dd.mp_manager.playButton();
        var index = this.lab_buy.node.tag;
        if (index < this.maxIndex - 1) {
          index++;
          this.lab_buy.string = (this.min * (index + 1)).toString();
          this.lab_buy.node.tag = index;
        }
      };
      BuyLayer.prototype.click_reduce = function() {
        dd.mp_manager.playButton();
        var index = this.lab_buy.node.tag;
        if (index > 0) {
          index--;
          this.lab_buy.string = (this.min * (index + 1)).toString();
          this.lab_buy.node.tag = index;
        }
      };
      BuyLayer.prototype.click_send = function() {
        var _this = this;
        dd.ui_manager.showLoading("正在发送购买申请");
        dd.mp_manager.playButton();
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId,
          chipNum: Number(this.lab_buy.string)
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_BUY_CHIP, msg, function(flag, content) {
          0 === flag ? dd.gm_manager.getTableData().createPlayer === dd.ud_manager.account_mine.accountId ? dd.ui_manager.hideLoading() : dd.ui_manager.showTip("申购消息已经发送给房主,请等候房主处理!") : -1 === flag ? dd.ui_manager.showTip("申购消息发送超时!") : dd.ui_manager.showTip(content);
          _this.node.destroy();
        });
      };
      __decorate([ property(cc.Label) ], BuyLayer.prototype, "lab_min", void 0);
      __decorate([ property(cc.Label) ], BuyLayer.prototype, "lab_max", void 0);
      __decorate([ property(cc.Label) ], BuyLayer.prototype, "lab_buy", void 0);
      BuyLayer = __decorate([ ccclass ], BuyLayer);
      return BuyLayer;
    }(cc.Component);
    exports.default = BuyLayer;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  Career: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65705Qvlo1FOoy61cTG3GjP", "Career");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Career = function(_super) {
      __extends(Career, _super);
      function Career() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.proList = [];
        _this.pointList = [];
        _this.perList = [];
        _this.layer1 = null;
        _this.layer2 = null;
        _this.detailLayer = null;
        _this.svNode_detail = null;
        _this.data = null;
        return _this;
      }
      Career.prototype.init = function(data) {
        this.data = data;
      };
      Career.prototype.onLoad = function() {
        var _this = this;
        this.layer1.active = true;
        this.layer2.active = false;
        this.detailLayer.active = false;
        var nums = [ Number(this.data.winRate), Number(this.data.seatDown), Number(this.data.showCard), Number(this.data.addChip), Number(this.data.dropCards), Number(this.data.fullBet) ];
        nums.forEach(function(num, index) {
          _this.proList[index].fillRange = -num / 2;
          _this.pointList[index].rotation = 148 * num - 74;
          _this.perList[index].string = Math.round(100 * num) + "%";
        }, this);
        dd.ui_manager.hideLoading();
      };
      Career.prototype.click_out = function() {
        dd.mp_manager.playButton();
        this.node.destroy();
      };
      Career.prototype.click_toggle = function(event, data) {
        var _this = this;
        dd.mp_manager.playButton();
        if (1 === Number(data)) {
          var sv = this.layer2.getComponent(cc.ScrollView);
          sv.scrollToTop();
          sv.content.destroyAllChildren();
          this.layer2.active = false;
          this.layer1.active = true;
          this.detailLayer.active = false;
        } else {
          this.layer1.active = false;
          this.layer2.active = true;
          this.detailLayer.active = false;
          this.data.historyList && this.data.historyList.length > 0 ? this.layer2.getComponent("SVScript").init(this.data.historyList, function(data) {
            _this.getRoomDetailInfo(data.recordId);
          }) : dd.ui_manager.showTip("您当前没有历史记录!");
        }
      };
      Career.prototype.getRoomDetailInfo = function(recordId) {
        var _this = this;
        var obj = {
          recordId: recordId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_ALL_WIN_SCORE_INFO, msg, function(flag, content) {
          if (0 === flag) {
            var data = content;
            if (data.items && data.items.length > 0) {
              _this.detailLayer.active = true;
              var detailList_1 = [];
              data.items.forEach(function(item, index) {
                var obj = {
                  index: index,
                  item: item
                };
                detailList_1.push(obj);
              }, _this);
              _this.svNode_detail.getComponent("SVScript").init(detailList_1);
            }
          } else -1 === flag ? dd.ui_manager.showTip("获取房间明细消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      Career.prototype.click_btn_outDetail = function() {
        dd.mp_manager.playButton();
        this.detailLayer.active = false;
      };
      __decorate([ property([ cc.Sprite ]) ], Career.prototype, "proList", void 0);
      __decorate([ property([ cc.Node ]) ], Career.prototype, "pointList", void 0);
      __decorate([ property([ cc.Label ]) ], Career.prototype, "perList", void 0);
      __decorate([ property(cc.Node) ], Career.prototype, "layer1", void 0);
      __decorate([ property(cc.Node) ], Career.prototype, "layer2", void 0);
      __decorate([ property(cc.Node) ], Career.prototype, "detailLayer", void 0);
      __decorate([ property(cc.Node) ], Career.prototype, "svNode_detail", void 0);
      Career = __decorate([ ccclass ], Career);
      return Career;
    }(cc.Component);
    exports.default = Career;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54ad3SofyNO7b64ujzlGWLN", "Config");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.checkUrl = "http://27.50.49.181:8080/checkVer?ver=";
    exports.wsUrl = "ws://27.50.49.181:30000";
    exports.app_id = "wx19e1237d774e5763";
    exports.secret = "57ff16852f286c0e571f375b425269d0";
    exports.wxState = -1;
    exports.version = "1.1.1";
    exports.cd = null;
    cc._RF.pop();
  }, {} ],
  Create: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b5d05oHishEMbHMDcBuT83I", "Create");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Create = function(_super) {
      __extends(Create, _super);
      function Create() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lab_name = null;
        _this.lab_blind = null;
        _this.lab_bet = null;
        _this.spr_bar = null;
        _this.nod_btn = null;
        _this.nod_time = null;
        _this.pre_toggle = null;
        _this.tog_safe = null;
        _this.tog_straddie = null;
        _this.lab_limit = null;
        _this.cfgData = null;
        _this.selectTime = null;
        _this.selectChip = null;
        return _this;
      }
      Create.prototype.init = function(cfg) {
        this.cfgData = cfg;
      };
      Create.prototype.onLoad = function() {
        var _this = this;
        this.lab_name.string = dd.utils.getStringBySize(dd.ud_manager.account_mine.roleAttribVo.nick, 12) + "的房间";
        this.updateBet(0);
        this.updatTime();
        this.updateLimit(0);
        this.spr_bar.node.parent.on(cc.Node.EventType.TOUCH_END, function(event) {
          dd.mp_manager.playButton();
          var pos = _this.spr_bar.node.convertToNodeSpaceAR(event.touch.getLocation());
          if (_this.cfgData.chips.length < 2) {
            _this.spr_bar.fillRange = 1;
            _this.nod_btn.x = _this.spr_bar.node.width;
            _this.updateBet(0);
            return;
          }
          var index = dd.utils.getClosestIndex(_this.spr_bar.node.width, _this.cfgData.chips.length - 1, pos.x);
          pos.x = dd.utils.getClosestNumber(_this.spr_bar.node.width, _this.cfgData.chips.length - 1, pos.x);
          _this.spr_bar.fillRange = pos.x / _this.spr_bar.node.width;
          _this.nod_btn.x = pos.x;
          _this.updateBet(index);
        }, this);
        this.nod_btn.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          var target = event.getCurrentTarget();
          var pos = target.parent.convertToNodeSpaceAR(event.touch.getLocation());
          pos.x < 0 && (pos.x = 0);
          pos.x > target.parent.width && (pos.x = target.parent.width);
          target.x = pos.x;
          _this.spr_bar.fillRange = pos.x / target.parent.width;
          var index = dd.utils.getClosestIndex(target.parent.width, _this.cfgData.chips.length - 1, pos.x);
          _this.updateBet(index);
          event.stopPropagation();
        }, this);
        this.nod_btn.on(cc.Node.EventType.TOUCH_END, this.touch_fun, this);
        this.nod_btn.on(cc.Node.EventType.TOUCH_CANCEL, this.touch_fun, this);
        dd.ui_manager.hideLoading();
      };
      Create.prototype.touch_fun = function(event) {
        dd.mp_manager.playButton();
        var target = event.getCurrentTarget();
        var pos = target.parent.convertToNodeSpaceAR(event.touch.getLocation());
        if (this.cfgData.chips.length < 2) {
          this.spr_bar.fillRange = 1;
          this.nod_btn.x = target.parent.width;
          this.updateBet(0);
          return;
        }
        var index = dd.utils.getClosestIndex(target.parent.width, this.cfgData.chips.length - 1, pos.x);
        pos.x = dd.utils.getClosestNumber(target.parent.width, this.cfgData.chips.length - 1, pos.x);
        this.spr_bar.fillRange = pos.x / target.parent.width;
        target.x = pos.x;
        this.updateBet(index);
        event.stopPropagation();
      };
      Create.prototype.updateBet = function(index) {
        if (index < 0 || index > this.cfgData.chips.length - 1) return;
        var chip = this.cfgData.chips[index];
        if (chip) {
          this.lab_blind.string = chip.small + "/" + chip.big;
          this.lab_bet.string = chip.join.toString();
          this.selectChip = chip;
          this.lab_limit.string = this.lab_bet.string;
          this.lab_limit.node.tag = 0;
        } else {
          cc.log(index);
          cc.log(this.cfgData);
          cc.error("updateBet:Error");
        }
      };
      Create.prototype.updatTime = function() {
        var _this = this;
        this.cfgData.vaildTimes.forEach(function(time, index) {
          var node = cc.instantiate(_this.pre_toggle);
          node.tag = time;
          if (0 === index) {
            node.getComponent(cc.Toggle).check();
            _this.selectTime = time;
          }
          var lab_time = cc.find("time", node).getComponent(cc.Label);
          lab_time.string = time < 60 ? time + "M" : Math.floor(time / 60) + "H";
          node.on("toggle", function(event) {
            dd.mp_manager.playButton();
            var toggle = event.detail;
            _this.selectTime = toggle.node.tag;
          }, _this);
          node.parent = _this.nod_time;
        }, this);
      };
      Create.prototype.updateLimit = function(index) {
        index < 0 && (index = 0);
        index > 9 && (index = 9);
        this.lab_limit.string = (Number(this.lab_bet.string) * (index + 1)).toString();
        this.lab_limit.node.tag = index;
      };
      Create.prototype.click_toggle = function() {
        dd.mp_manager.playButton();
      };
      Create.prototype.upLimit = function() {
        dd.mp_manager.playButton();
        var index = this.lab_limit.node.tag;
        if (index < 9) {
          index++;
          this.updateLimit(index);
        }
      };
      Create.prototype.downLimit = function() {
        dd.mp_manager.playButton();
        var index = this.lab_limit.node.tag;
        if (index > 0) {
          index--;
          this.updateLimit(index);
        }
      };
      Create.prototype.click_out = function() {
        dd.mp_manager.playButton();
        this.node.destroy();
      };
      Create.prototype.click_create = function() {
        if (!dd.ui_manager.showLoading("正在创建房间,请稍后")) return;
        dd.mp_manager.playButton();
        var obj = {
          tableName: this.lab_name.string,
          small: this.selectChip.small,
          big: this.selectChip.big,
          minJoin: this.selectChip.join,
          vaildTime: this.selectTime,
          insurance: this.tog_safe.isChecked ? 1 : 0,
          straddle: this.tog_straddie.isChecked ? 1 : 0,
          buyMax: Number(this.lab_limit.string)
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_CREATE, msg, function(flag, content) {
          if (0 === flag) {
            dd.gm_manager.setTableData(content, 1);
            cc.director.loadScene("GameScene", function() {
              dd.ui_manager.showTip("创建房间成功");
            });
          } else -1 === flag ? dd.ui_manager.showTip("创建房间消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      __decorate([ property(cc.Label) ], Create.prototype, "lab_name", void 0);
      __decorate([ property(cc.Label) ], Create.prototype, "lab_blind", void 0);
      __decorate([ property(cc.Label) ], Create.prototype, "lab_bet", void 0);
      __decorate([ property(cc.Sprite) ], Create.prototype, "spr_bar", void 0);
      __decorate([ property(cc.Node) ], Create.prototype, "nod_btn", void 0);
      __decorate([ property(cc.Node) ], Create.prototype, "nod_time", void 0);
      __decorate([ property(cc.Prefab) ], Create.prototype, "pre_toggle", void 0);
      __decorate([ property(cc.Toggle) ], Create.prototype, "tog_safe", void 0);
      __decorate([ property(cc.Toggle) ], Create.prototype, "tog_straddie", void 0);
      __decorate([ property(cc.Label) ], Create.prototype, "lab_limit", void 0);
      Create = __decorate([ ccclass ], Create);
      return Create;
    }(cc.Component);
    exports.default = Create;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  DetailItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "237cd91IyVFcZCsUGrYbyuQ", "DetailItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var DetailItem = function(_super) {
      __extends(DetailItem, _super);
      function DetailItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.head = null;
        _this.index = null;
        _this.nick = null;
        _this.gold = null;
        _this.num = null;
        return _this;
      }
      DetailItem.prototype.updateItem = function(data, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var item, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!data) return [ 3, 2 ];
              item = data.item;
              this.index.string = data.index + 1;
              this.nick.string = dd.utils.getStringBySize(item.nick, 12);
              this.gold.string = item.winMoney;
              this.num.string = item.gameNum;
              _a = this.head;
              return [ 4, dd.img_manager.loadURLImage(item.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Sprite) ], DetailItem.prototype, "head", void 0);
      __decorate([ property(cc.Label) ], DetailItem.prototype, "index", void 0);
      __decorate([ property(cc.Label) ], DetailItem.prototype, "nick", void 0);
      __decorate([ property(cc.Label) ], DetailItem.prototype, "gold", void 0);
      __decorate([ property(cc.Label) ], DetailItem.prototype, "num", void 0);
      DetailItem = __decorate([ ccclass ], DetailItem);
      return DetailItem;
    }(cc.Component);
    exports.default = DetailItem;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  ENCManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a15eoViJxPRK1BPwz+8MrH", "ENCManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ENCManager = function() {
      function ENCManager() {}
      ENCManager.getInstance = function() {
        null === ENCManager._instance && (ENCManager._instance = new ENCManager());
        return ENCManager._instance;
      };
      ENCManager.prototype.RotateLeft = function(lValue, iShiftBits) {
        return lValue << iShiftBits | lValue >>> 32 - iShiftBits;
      };
      ENCManager.prototype.AddUnsigned = function(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = 2147483648 & lX;
        lY8 = 2147483648 & lY;
        lX4 = 1073741824 & lX;
        lY4 = 1073741824 & lY;
        lResult = (1073741823 & lX) + (1073741823 & lY);
        if (lX4 & lY4) return 2147483648 ^ lResult ^ lX8 ^ lY8;
        return lX4 | lY4 ? 1073741824 & lResult ? 3221225472 ^ lResult ^ lX8 ^ lY8 : 1073741824 ^ lResult ^ lX8 ^ lY8 : lResult ^ lX8 ^ lY8;
      };
      ENCManager.prototype.F = function(x, y, z) {
        return x & y | ~x & z;
      };
      ENCManager.prototype.G = function(x, y, z) {
        return x & z | y & ~z;
      };
      ENCManager.prototype.H = function(x, y, z) {
        return x ^ y ^ z;
      };
      ENCManager.prototype.I = function(x, y, z) {
        return y ^ (x | ~z);
      };
      ENCManager.prototype.FF = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      ENCManager.prototype.GG = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      ENCManager.prototype.HH = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      ENCManager.prototype.II = function(a, b, c, d, x, s, ac) {
        a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
        return this.AddUnsigned(this.RotateLeft(a, s), b);
      };
      ENCManager.prototype.ConvertToWordArray = function(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - lNumberOfWords_temp1 % 64) / 64;
        var lNumberOfWords = 16 * (lNumberOfWords_temp2 + 1);
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
          lWordCount = (lByteCount - lByteCount % 4) / 4;
          lBytePosition = lByteCount % 4 * 8;
          lWordArray[lWordCount] = lWordArray[lWordCount] | string.charCodeAt(lByteCount) << lBytePosition;
          lByteCount++;
        }
        lWordCount = (lByteCount - lByteCount % 4) / 4;
        lBytePosition = lByteCount % 4 * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | 128 << lBytePosition;
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
      };
      ENCManager.prototype.WordToHex = function(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
          lByte = lValue >>> 8 * lCount & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue += WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
      };
      ENCManager.prototype.Utf8Encode = function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) utftext += String.fromCharCode(c); else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(63 & c | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(63 & c | 128);
          }
        }
        return utftext;
      };
      ENCManager.prototype.Utf8Decode = function(utftext) {
        var string = "";
        var i = 0;
        var c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
          c1 = utftext.charCodeAt(i);
          if (c1 < 128) {
            string += String.fromCharCode(c1);
            i++;
          } else if (c1 > 191 && c1 < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((31 & c1) << 6 | 63 & c2);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((15 & c1) << 12 | (63 & c2) << 6 | 63 & c3);
            i += 3;
          }
        }
        return string;
      };
      ENCManager.prototype.base64Encode = function(input) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.Utf8Encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (3 & chr1) << 4 | chr2 >> 4;
          enc3 = (15 & chr2) << 2 | chr3 >> 6;
          enc4 = 63 & chr3;
          isNaN(chr2) ? enc3 = enc4 = 64 : isNaN(chr3) && (enc4 = 64);
          output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
      };
      ENCManager.prototype.base64Decode = function(input) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (15 & enc2) << 4 | enc3 >> 2;
          chr3 = (3 & enc3) << 6 | enc4;
          output += String.fromCharCode(chr1);
          64 != enc3 && (output += String.fromCharCode(chr2));
          64 != enc4 && (output += String.fromCharCode(chr3));
        }
        output = this.Utf8Decode(output);
        return output;
      };
      ENCManager.prototype.MD5 = function(input) {
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
        input = this.Utf8Encode(input);
        x = this.ConvertToWordArray(input);
        a = 1732584193;
        b = 4023233417;
        c = 2562383102;
        d = 271733878;
        for (k = 0; k < x.length; k += 16) {
          AA = a;
          BB = b;
          CC = c;
          DD = d;
          a = this.FF(a, b, c, d, x[k + 0], S11, 3614090360);
          d = this.FF(d, a, b, c, x[k + 1], S12, 3905402710);
          c = this.FF(c, d, a, b, x[k + 2], S13, 606105819);
          b = this.FF(b, c, d, a, x[k + 3], S14, 3250441966);
          a = this.FF(a, b, c, d, x[k + 4], S11, 4118548399);
          d = this.FF(d, a, b, c, x[k + 5], S12, 1200080426);
          c = this.FF(c, d, a, b, x[k + 6], S13, 2821735955);
          b = this.FF(b, c, d, a, x[k + 7], S14, 4249261313);
          a = this.FF(a, b, c, d, x[k + 8], S11, 1770035416);
          d = this.FF(d, a, b, c, x[k + 9], S12, 2336552879);
          c = this.FF(c, d, a, b, x[k + 10], S13, 4294925233);
          b = this.FF(b, c, d, a, x[k + 11], S14, 2304563134);
          a = this.FF(a, b, c, d, x[k + 12], S11, 1804603682);
          d = this.FF(d, a, b, c, x[k + 13], S12, 4254626195);
          c = this.FF(c, d, a, b, x[k + 14], S13, 2792965006);
          b = this.FF(b, c, d, a, x[k + 15], S14, 1236535329);
          a = this.GG(a, b, c, d, x[k + 1], S21, 4129170786);
          d = this.GG(d, a, b, c, x[k + 6], S22, 3225465664);
          c = this.GG(c, d, a, b, x[k + 11], S23, 643717713);
          b = this.GG(b, c, d, a, x[k + 0], S24, 3921069994);
          a = this.GG(a, b, c, d, x[k + 5], S21, 3593408605);
          d = this.GG(d, a, b, c, x[k + 10], S22, 38016083);
          c = this.GG(c, d, a, b, x[k + 15], S23, 3634488961);
          b = this.GG(b, c, d, a, x[k + 4], S24, 3889429448);
          a = this.GG(a, b, c, d, x[k + 9], S21, 568446438);
          d = this.GG(d, a, b, c, x[k + 14], S22, 3275163606);
          c = this.GG(c, d, a, b, x[k + 3], S23, 4107603335);
          b = this.GG(b, c, d, a, x[k + 8], S24, 1163531501);
          a = this.GG(a, b, c, d, x[k + 13], S21, 2850285829);
          d = this.GG(d, a, b, c, x[k + 2], S22, 4243563512);
          c = this.GG(c, d, a, b, x[k + 7], S23, 1735328473);
          b = this.GG(b, c, d, a, x[k + 12], S24, 2368359562);
          a = this.HH(a, b, c, d, x[k + 5], S31, 4294588738);
          d = this.HH(d, a, b, c, x[k + 8], S32, 2272392833);
          c = this.HH(c, d, a, b, x[k + 11], S33, 1839030562);
          b = this.HH(b, c, d, a, x[k + 14], S34, 4259657740);
          a = this.HH(a, b, c, d, x[k + 1], S31, 2763975236);
          d = this.HH(d, a, b, c, x[k + 4], S32, 1272893353);
          c = this.HH(c, d, a, b, x[k + 7], S33, 4139469664);
          b = this.HH(b, c, d, a, x[k + 10], S34, 3200236656);
          a = this.HH(a, b, c, d, x[k + 13], S31, 681279174);
          d = this.HH(d, a, b, c, x[k + 0], S32, 3936430074);
          c = this.HH(c, d, a, b, x[k + 3], S33, 3572445317);
          b = this.HH(b, c, d, a, x[k + 6], S34, 76029189);
          a = this.HH(a, b, c, d, x[k + 9], S31, 3654602809);
          d = this.HH(d, a, b, c, x[k + 12], S32, 3873151461);
          c = this.HH(c, d, a, b, x[k + 15], S33, 530742520);
          b = this.HH(b, c, d, a, x[k + 2], S34, 3299628645);
          a = this.II(a, b, c, d, x[k + 0], S41, 4096336452);
          d = this.II(d, a, b, c, x[k + 7], S42, 1126891415);
          c = this.II(c, d, a, b, x[k + 14], S43, 2878612391);
          b = this.II(b, c, d, a, x[k + 5], S44, 4237533241);
          a = this.II(a, b, c, d, x[k + 12], S41, 1700485571);
          d = this.II(d, a, b, c, x[k + 3], S42, 2399980690);
          c = this.II(c, d, a, b, x[k + 10], S43, 4293915773);
          b = this.II(b, c, d, a, x[k + 1], S44, 2240044497);
          a = this.II(a, b, c, d, x[k + 8], S41, 1873313359);
          d = this.II(d, a, b, c, x[k + 15], S42, 4264355552);
          c = this.II(c, d, a, b, x[k + 6], S43, 2734768916);
          b = this.II(b, c, d, a, x[k + 13], S44, 1309151649);
          a = this.II(a, b, c, d, x[k + 4], S41, 4149444226);
          d = this.II(d, a, b, c, x[k + 11], S42, 3174756917);
          c = this.II(c, d, a, b, x[k + 2], S43, 718787259);
          b = this.II(b, c, d, a, x[k + 9], S44, 3951481745);
          a = this.AddUnsigned(a, AA);
          b = this.AddUnsigned(b, BB);
          c = this.AddUnsigned(c, CC);
          d = this.AddUnsigned(d, DD);
        }
        var md5 = this.WordToHex(a) + this.WordToHex(b) + this.WordToHex(c) + this.WordToHex(d);
        return md5.toLowerCase();
      };
      ENCManager.prototype.destroySelf = function() {
        ENCManager._instance = null;
      };
      ENCManager._instance = null;
      return ENCManager;
    }();
    exports.default = ENCManager;
    cc._RF.pop();
  }, {} ],
  EmailItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1b4dDEoWlBxogBDKmtAvc9", "EmailItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var EmailItem = function(_super) {
      __extends(EmailItem, _super);
      function EmailItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.headImg = null;
        _this.msg = null;
        _this.modelMsg = "玩家:<color=#D3AE6C><b><玩家昵称></b></c>,<br/>申购:<color=#D3AE6C><b><积分数量></b></c>积分,<br/>您是否同意?";
        _this.data = null;
        _this.callback = null;
        return _this;
      }
      EmailItem.prototype.init = function(data, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.data = data;
              this.callback = callback;
              _a = this.headImg;
              return [ 4, dd.img_manager.loadURLImage(data.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              this.msg.string = this.modelMsg.replace("<玩家昵称>", dd.utils.getStringBySize(data.nick, 12)).replace("<积分数量>", data.chipNum);
              return [ 2 ];
            }
          });
        });
      };
      EmailItem.prototype.click_yes = function() {
        this.callback(1, this.data.itemId, this.node);
      };
      EmailItem.prototype.click_no = function() {
        this.callback(2, this.data.itemId, this.node);
      };
      __decorate([ property(cc.Sprite) ], EmailItem.prototype, "headImg", void 0);
      __decorate([ property(cc.RichText) ], EmailItem.prototype, "msg", void 0);
      EmailItem = __decorate([ ccclass ], EmailItem);
      return EmailItem;
    }(cc.Component);
    exports.default = EmailItem;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  Fetch: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13473J3/vBG56tPR56bEVFn", "Fetch");
    "use strict";
    (function(self) {
      if (self.fetch) return;
      var support = {
        searchParams: "URLSearchParams" in self,
        iterable: "Symbol" in self && "iterator" in Symbol,
        blob: "FileReader" in self && "Blob" in self && function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        }(),
        formData: "FormData" in self,
        arrayBuffer: "ArrayBuffer" in self
      };
      if (support.arrayBuffer) {
        var viewClasses = [ "[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]" ];
        var isDataView = function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        };
        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      function normalizeName(name) {
        "string" !== typeof name && (name = String(name));
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
        return name.toLowerCase();
      }
      function normalizeValue(value) {
        "string" !== typeof value && (value = String(value));
        return value;
      }
      function iteratorFor(items) {
        var iterator = {
          next: function next() {
            var value = items.shift();
            return {
              done: void 0 === value,
              value: value
            };
          }
        };
        support.iterable && (iterator[Symbol.iterator] = function() {
          return iterator;
        });
        return iterator;
      }
      function Headers(headers) {
        this.map = {};
        headers instanceof Headers ? headers.forEach(function(value, name) {
          this.append(name, value);
        }, this) : Array.isArray(headers) ? headers.forEach(function(header) {
          this.append(header[0], header[1]);
        }, this) : headers && Object.getOwnPropertyNames(headers).forEach(function(name) {
          this.append(name, headers[name]);
        }, this);
      }
      Headers.prototype.append = function(name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + "," + value : value;
      };
      Headers.prototype["delete"] = function(name) {
        delete this.map[normalizeName(name)];
      };
      Headers.prototype.get = function(name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null;
      };
      Headers.prototype.has = function(name) {
        return this.map.hasOwnProperty(normalizeName(name));
      };
      Headers.prototype.set = function(name, value) {
        this.map[normalizeName(name)] = normalizeValue(value);
      };
      Headers.prototype.forEach = function(callback, thisArg) {
        for (var name in this.map) this.map.hasOwnProperty(name) && callback.call(thisArg, this.map[name], name, this);
      };
      Headers.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push(name);
        });
        return iteratorFor(items);
      };
      Headers.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name) {
          items.push([ name, value ]);
        });
        return iteratorFor(items);
      };
      support.iterable && (Headers.prototype[Symbol.iterator] = Headers.prototype.entries);
      function consumed(body) {
        if (body.bodyUsed) return Promise.reject(new TypeError("Already read"));
        body.bodyUsed = true;
      }
      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
      }
      function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise;
      }
      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);
        for (var i = 0; i < view.length; i++) chars[i] = String.fromCharCode(view[i]);
        return chars.join("");
      }
      function bufferClone(buf) {
        if (buf.slice) return buf.slice(0);
        var view = new Uint8Array(buf.byteLength);
        view.set(new Uint8Array(buf));
        return view.buffer;
      }
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this._bodyInit = body;
          if (body) if ("string" === typeof body) this._bodyText = body; else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) this._bodyText = body.toString(); else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            this._bodyInit = new Blob([ this._bodyArrayBuffer ]);
          } else {
            if (!support.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(body) && !isArrayBufferView(body)) throw new Error("unsupported BodyInit type");
            this._bodyArrayBuffer = bufferClone(body);
          } else this._bodyText = "";
          this.headers.get("content-type") || ("string" === typeof body ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : support.searchParams && URLSearchParams.prototype.isPrototypeOf(body) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) return rejected;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer) return Promise.resolve(new Blob([ this._bodyArrayBuffer ]));
            if (this._bodyFormData) throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([ this._bodyText ]));
          };
          this.arrayBuffer = function() {
            return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(readBlobAsArrayBuffer);
          };
        }
        this.text = function() {
          var rejected = consumed(this);
          if (rejected) return rejected;
          if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
          if (this._bodyArrayBuffer) return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
          if (this._bodyFormData) throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        };
        support.formData && (this.formData = function() {
          return this.text().then(decode);
        });
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      var methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      }
      function Request(input, options) {
        options = options || {};
        var body = options.body;
        if (input instanceof Request) {
          if (input.bodyUsed) throw new TypeError("Already read");
          this.url = input.url;
          this.credentials = input.credentials;
          options.headers || (this.headers = new Headers(input.headers));
          this.method = input.method;
          this.mode = input.mode;
          if (!body && null != input._bodyInit) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else this.url = String(input);
        this.credentials = options.credentials || this.credentials || "omit";
        !options.headers && this.headers || (this.headers = new Headers(options.headers));
        this.method = normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.referrer = null;
        if (("GET" === this.method || "HEAD" === this.method) && body) throw new TypeError("Body not allowed for GET or HEAD requests");
        this._initBody(body);
      }
      Request.prototype.clone = function() {
        return new Request(this, {
          body: this._bodyInit
        });
      };
      function decode(body) {
        var form = new FormData();
        body.trim().split("&").forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split("=");
            var name = split.shift().replace(/\+/g, " ");
            var value = split.join("=").replace(/\+/g, " ");
            form.append(decodeURIComponent(name), decodeURIComponent(value));
          }
        });
        return form;
      }
      function parseHeaders(rawHeaders) {
        var headers = new Headers();
        rawHeaders.split(/\r?\n/).forEach(function(line) {
          var parts = line.split(":");
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(":").trim();
            headers.append(key, value);
          }
        });
        return headers;
      }
      Body.call(Request.prototype);
      function Response(bodyInit, options) {
        options || (options = {});
        this.type = "default";
        this.status = "status" in options ? options.status : 200;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = "statusText" in options ? options.statusText : "OK";
        this.headers = new Headers(options.headers);
        this.url = options.url || "";
        this._initBody(bodyInit);
      }
      Body.call(Response.prototype);
      Response.prototype.clone = function() {
        return new Response(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers(this.headers),
          url: this.url
        });
      };
      Response.error = function() {
        var response = new Response(null, {
          status: 0,
          statusText: ""
        });
        response.type = "error";
        return response;
      };
      var redirectStatuses = [ 301, 302, 303, 307, 308 ];
      Response.redirect = function(url, status) {
        if (-1 === redirectStatuses.indexOf(status)) throw new RangeError("Invalid status code");
        return new Response(null, {
          status: status,
          headers: {
            location: url
          }
        });
      };
      self.Headers = Headers;
      self.Request = Request;
      self.Response = Response;
      self.fetch = function(input, init) {
        return new Promise(function(resolve, reject) {
          var request = new Request(input, init);
          var xhr = new XMLHttpRequest();
          xhr.onload = function() {
            var options = {
              status: xhr.status,
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || "")
            };
            options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
            var body = "response" in xhr ? xhr.response : xhr.responseText;
            resolve(new Response(body, options));
          };
          xhr.onerror = function() {
            reject(new TypeError("Network request failed"));
          };
          xhr.ontimeout = function() {
            reject(new TypeError("Network request failed"));
          };
          xhr.open(request.method, request.url, true);
          "include" === request.credentials && (xhr.withCredentials = true);
          "responseType" in xhr && support.blob && (xhr.responseType = "blob");
          request.headers.forEach(function(value, name) {
            xhr.setRequestHeader(name, value);
          });
          xhr.send("undefined" === typeof request._bodyInit ? null : request._bodyInit);
        });
      };
      self.fetch.polyfill = true;
    })(window);
    cc._RF.pop();
  }, {} ],
  GMManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bdcb9ku/dJF5qeEBjkJyvaY", "GMManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Protocol_1 = require("./Protocol");
    var UDManager_1 = require("./UDManager");
    var MPManager_1 = require("./MPManager");
    var GMManager = function() {
      function GMManager() {
        this.tableData = null;
        this.safeData = null;
        this.startIndex = 0;
        this.countDownTime = 0;
        this.orderCount = -1;
        this.publicCardNum = 0;
        this.isCreateMineCard = false;
        this.isShowGameOver = false;
        this.btnScript = null;
        this.playerScript = null;
        this.poolMoneys = 0;
      }
      GMManager.getInstance = function() {
        null === GMManager._instance && (GMManager._instance = new GMManager());
        return GMManager._instance;
      };
      GMManager.prototype.getTableData = function() {
        return this.tableData;
      };
      GMManager.prototype.setTableData = function(tableData, type) {
        var oldCount = -1;
        this.tableData && (oldCount = this.getSeatDownCount());
        this.tableData = tableData;
        var r_max = Math.ceil(Number(tableData.maxBetMoney) / tableData.bigBlind) * tableData.bigBlind;
        0 === r_max && (r_max = tableData.bigBlind);
        this.poolMoneys = r_max;
        var newCount = this.getSeatDownCount();
        oldCount > -1 && newCount > oldCount && MPManager_1.default.getInstance().playJoin();
        cc.log("游戏数据++++++++gameState==" + tableData.gameState);
        cc.log(tableData);
        this.countDownTime = Number(tableData.vaildTime) - Number(tableData.svrTime);
        cc.systemEvent.emit("betBT");
        cc.systemEvent.emit("updateGame");
        switch (type) {
         case 1:
          cc.systemEvent.emit("updatePlayerUI");
          switch (tableData.gameState) {
           case Protocol_1.GameState.STATE_TABLE_IDLE:
            this.publicCardNum = 0;
            break;

           case Protocol_1.GameState.STATE_TABLE_READY:
            this.publicCardNum = 0;
            MPManager_1.default.getInstance().playStart();
            break;

           case Protocol_1.GameState.STATE_TABLE_OUTCARD_1:
            cc.systemEvent.emit("doFPAction");
            break;

           case Protocol_1.GameState.STATE_TABLE_BUY_INSURANCE:
            cc.systemEvent.emit("safe");
          }
          break;

         case 2:
          cc.systemEvent.emit("updatePlayer");
          break;

         case 3:
          cc.systemEvent.emit("updatePlayerUI");
          cc.systemEvent.emit("btResult");
        }
        tableData.gameState < Protocol_1.GameState.STATE_TABLE_OVER_ONCE && (this.isShowGameOver = false);
      };
      GMManager.prototype.getMineSeat = function() {
        var account = UDManager_1.default.getInstance().account_mine;
        return this.getSeatDataByAccount(account.accountId);
      };
      GMManager.prototype.isMineSeat = function(seatData) {
        if (seatData.accountId === UDManager_1.default.getInstance().account_mine.accountId) return true;
        return false;
      };
      GMManager.prototype.isMineCreater = function() {
        return this.tableData.createPlayer === UDManager_1.default.getInstance().account_mine.accountId;
      };
      GMManager.prototype.canStandOrLeave = function() {
        var mineSeat = this.getMineSeat();
        return !mineSeat || (!(this.tableData.gameState > Protocol_1.GameState.STATE_TABLE_READY && this.tableData.gameState < Protocol_1.GameState.STATE_TABLE_OVER_ONCE) || (1 === mineSeat.btResult || 1 !== mineSeat.bGamed));
      };
      GMManager.prototype.getSeatDataByAccount = function(acountId) {
        var seatData = null;
        this.tableData && this.tableData.seats && this.tableData.seats.forEach(function(seat) {
          seat.accountId === acountId && (seatData = seat);
        }, this);
        return seatData;
      };
      GMManager.prototype.getSeatDataByIndex = function(index) {
        if (index < 0 || index > 8) return null;
        for (var i = 0; i < this.tableData.seats.length; i++) {
          var seat = this.tableData.seats[i];
          if (index === seat.seatIndex) return seat;
        }
      };
      GMManager.prototype.getSeatDownCount = function() {
        var count = 0;
        this.tableData && this.tableData.seats && this.tableData.seats.forEach(function(seat) {
          "0" !== seat.accountId && count++;
        }, this);
        return count;
      };
      GMManager.prototype.getCardType = function(cType) {
        var str = "";
        switch (cType) {
         case Protocol_1.CardType.TYPE_CARD_NONE:
          str = "单   牌";
          break;

         case Protocol_1.CardType.TYPE_CARD_ONE_DOUBLE:
          str = "一   对";
          break;

         case Protocol_1.CardType.TYPE_CARD_TWO_DOUBLE:
          str = "两   对";
          break;

         case Protocol_1.CardType.TYPE_CARD_SAME_THREE:
          str = "三   条";
          break;

         case Protocol_1.CardType.TYPE_CARD_SHUN:
          str = "顺   子";
          break;

         case Protocol_1.CardType.TYPE_CARD_SAME_SUIT:
          str = "同   花";
          break;

         case Protocol_1.CardType.TYPE_CARD_GOURD:
          str = "葫   芦";
          break;

         case Protocol_1.CardType.TYPE_CARD_SAME_FOUR:
          str = "四   条";
          break;

         case Protocol_1.CardType.TYPE_CARD_SAME_SUIT_SHUN:
          str = "同 花 顺";
          break;

         case Protocol_1.CardType.TYPE_CARD_GOLD_SAME_SUIT_SHUN:
          str = "皇家同花顺";
        }
        return str;
      };
      GMManager.prototype.destroySelf = function() {
        this.clean();
        GMManager._instance = null;
      };
      GMManager.prototype.clean = function() {
        this.tableData = null;
        this.safeData = null;
        this.startIndex = 0;
        this.countDownTime = 0;
        this.orderCount = -1;
        this.publicCardNum = 0;
        this.isCreateMineCard = false;
        this.isShowGameOver = false;
        this.btnScript = null;
        this.playerScript = null;
      };
      GMManager._instance = null;
      return GMManager;
    }();
    exports.default = GMManager;
    cc._RF.pop();
  }, {
    "./MPManager": "MPManager",
    "./Protocol": "Protocol",
    "./UDManager": "UDManager"
  } ],
  GameCanvas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e30d7OQjdA34HlcWZqyS4T", "GameCanvas");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var GameCanvans = function(_super) {
      __extends(GameCanvans, _super);
      function GameCanvans() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.info = null;
        _this.pool_prefab = null;
        _this.pool = null;
        _this.sidePoolList = [];
        _this.lba_time = null;
        _this.lbl_poolMoneys = null;
        _this.safe_prefab = null;
        _this._safe = null;
        return _this;
      }
      GameCanvans.prototype.onLoad = function() {
        cc.systemEvent.on("updateGame", this.showGameInfo, this);
        this.showInfo();
      };
      GameCanvans.prototype.onDestroy = function() {
        dd.gm_manager.clean();
        cc.systemEvent.off("updateGame", this.showPool, this);
      };
      GameCanvans.prototype.showInfo = function() {
        if (dd.gm_manager && dd.gm_manager.getTableData()) {
          var tableData = dd.gm_manager.getTableData();
          cc.find("layout2/name", this.info).getComponent(cc.Label).string = tableData.tableName;
          cc.find("layout2/id", this.info).getComponent(cc.Label).string = tableData.tableId.toString();
          cc.find("layout2/small", this.info).getComponent(cc.Label).string = tableData.smallBlind.toString();
          cc.find("layout2/big", this.info).getComponent(cc.Label).string = tableData.bigBlind.toString();
          this.showGameInfo();
        }
      };
      GameCanvans.prototype.showGameInfo = function() {
        var _this = this;
        this.showSafe();
        if (dd.gm_manager && dd.gm_manager.getTableData()) {
          var tableData_1 = dd.gm_manager.getTableData();
          if (tableData_1.gameState === dd.game_state.STATE_TABLE_NEW_ROUND_BET) {
            var seats = tableData_1.seats;
            var index_1 = 0;
            for (var i = 0; i < seats.length; i++) {
              var seat = seats[i];
              1 === seat.bGamed && Number(seat.betMoney) > 0 && dd.gm_manager.playerScript && dd.gm_manager.playerScript.showFlyBetAction(seat, function() {
                0 === index_1 && _this.showPool(tableData_1.pools);
              });
            }
          } else tableData_1.gameState > dd.game_state.STATE_TABLE_BETBLIND && tableData_1.gameState < dd.game_state.STATE_TABLE_OVER_ONCE ? tableData_1.gameState !== dd.game_state.STATE_TABLE_BET_BT_1 && tableData_1.gameState !== dd.game_state.STATE_TABLE_BET_BT_2 && tableData_1.gameState !== dd.game_state.STATE_TABLE_BET_BT_3 && tableData_1.gameState !== dd.game_state.STATE_TABLE_BET_BT_4 && this.showPool(tableData_1.pools) : this.sidePoolList.forEach(function(sidePool) {
            sidePool.removeAllChildren();
            sidePool.active = false;
          });
        }
      };
      GameCanvans.prototype.showPool = function(pools) {
        var _this = this;
        if (!pools || !pools[0]) return;
        this.sidePoolList.forEach(function(sidePool) {
          sidePool.removeAllChildren();
        });
        pools.forEach(function(bet, index) {
          if (index < 4) {
            _this.sidePoolList[0].active = true;
            _this.creatSidePool(bet, _this.sidePoolList[0]);
          } else if (index >= 4 && index < 8) {
            _this.sidePoolList[1].active = true;
            _this.creatSidePool(bet, _this.sidePoolList[1]);
          } else {
            _this.sidePoolList[2].active = true;
            _this.creatSidePool(bet, _this.sidePoolList[2]);
          }
        });
      };
      GameCanvans.prototype.creatSidePool = function(bet, parentNode) {
        var sPool = cc.instantiate(this.pool_prefab);
        cc.find("lblBet", sPool).getComponent(cc.Label).string = bet;
        sPool.parent = parentNode;
      };
      GameCanvans.prototype.showSafe = function() {
        var tableData = dd.gm_manager.getTableData();
        if (tableData.gameState === dd.game_state.STATE_TABLE_BUY_INSURANCE) {
          if (!this._safe || !this._safe.isValid) {
            this._safe = cc.instantiate(this.safe_prefab);
            this._safe.parent = this.node;
          }
        } else if (this._safe && this._safe.isValid) {
          this._safe.removeFromParent();
          this._safe.destroy();
        }
      };
      GameCanvans.prototype.update = function(dt) {
        if (dd && dd.gm_manager) {
          dd.gm_manager.countDownTime > 0 && (dd.gm_manager.countDownTime -= 1e3 * dt);
          if (dd.gm_manager.countDownTime < 0) {
            cc.log("房间时间到了,系统回收房间");
            dd.gm_manager.countDownTime = 0;
          }
          this.lba_time.string = dd.utils.getCountDownString(dd.gm_manager.countDownTime);
          if (dd.gm_manager.getTableData()) if (Number(dd.gm_manager.getTableData().poolMoneys) > 0) {
            this.lbl_poolMoneys.node.parent.active = true;
            this.lbl_poolMoneys.string = dd.gm_manager.getTableData().poolMoneys;
          } else this.lbl_poolMoneys.node.parent.active = false;
        }
      };
      __decorate([ property(cc.Node) ], GameCanvans.prototype, "info", void 0);
      __decorate([ property(cc.Prefab) ], GameCanvans.prototype, "pool_prefab", void 0);
      __decorate([ property(cc.Node) ], GameCanvans.prototype, "pool", void 0);
      __decorate([ property([ cc.Node ]) ], GameCanvans.prototype, "sidePoolList", void 0);
      __decorate([ property(cc.Label) ], GameCanvans.prototype, "lba_time", void 0);
      __decorate([ property(cc.Label) ], GameCanvans.prototype, "lbl_poolMoneys", void 0);
      __decorate([ property(cc.Prefab) ], GameCanvans.prototype, "safe_prefab", void 0);
      GameCanvans = __decorate([ ccclass ], GameCanvans);
      return GameCanvans;
    }(cc.Component);
    exports.default = GameCanvans;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  GameResult: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4aa833VOuZLW4JuTW8lYHyO", "GameResult");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lbl_join = null;
        _this.lbl_winRate = null;
        _this.lbl_maxBet = null;
        _this.lbl_profit = null;
        _this.lbl_applyMoney = null;
        _this.lbl_settlement = null;
        return _this;
      }
      NewClass.prototype.onLoad = function() {
        this.lbl_join.string = "";
        this.lbl_maxBet.string = "";
        this.lbl_winRate.string = "";
        this.lbl_applyMoney.string = "";
        this.lbl_profit.string = "";
        this.lbl_settlement.string = "";
      };
      NewClass.prototype.updateData = function(data) {
        this.lbl_join.string = data.gameNum;
        this.lbl_maxBet.string = data.maxBetMoney;
        this.lbl_winRate.string = 100 * Number(data.winRate) + "%";
        this.lbl_applyMoney.string = data.buyTotalMoney;
        this.lbl_profit.string = data.maxWinMoney;
        this.lbl_settlement.string = data.winMoney;
      };
      NewClass.prototype.click_btn_out = function() {
        dd.mp_manager.playButton();
        dd.ui_manager.showLoading() && cc.director.loadScene("HomeScene");
      };
      __decorate([ property(cc.Label) ], NewClass.prototype, "lbl_join", void 0);
      __decorate([ property(cc.Label) ], NewClass.prototype, "lbl_winRate", void 0);
      __decorate([ property(cc.Label) ], NewClass.prototype, "lbl_maxBet", void 0);
      __decorate([ property(cc.Label) ], NewClass.prototype, "lbl_profit", void 0);
      __decorate([ property(cc.Label) ], NewClass.prototype, "lbl_applyMoney", void 0);
      __decorate([ property(cc.Label) ], NewClass.prototype, "lbl_settlement", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  HomeCanvas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f0faPnyzRIkZKF3vOVP7Iq", "HomeCanvas");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var HomeCanvas = function(_super) {
      __extends(HomeCanvas, _super);
      function HomeCanvas() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spr_head = null;
        _this.lab_name = null;
        _this.lab_id = null;
        _this.pre_setting = null;
        _this.pre_create = null;
        _this.pre_join = null;
        _this.pre_mine = null;
        _this.pre_notice = null;
        _this.pre_career = null;
        return _this;
      }
      HomeCanvas.prototype.onLoad = function() {
        cc.log(dd.ud_manager.account_mine);
      };
      HomeCanvas.prototype.update = function(dt) {
        return __awaiter(this, void 0, void 0, function() {
          var _a, error_1;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!(dd.ud_manager && dd.ud_manager.account_mine)) return [ 3, 4 ];
              if (!dd.ud_manager.account_mine.roleAttribVo) return [ 3, 4 ];
              this.lab_name.string = dd.utils.getStringBySize(dd.ud_manager.account_mine.roleAttribVo.nick, 12);
              this.lab_id.string = dd.ud_manager.account_mine.roleAttribVo.starNO;
              _b.label = 1;

             case 1:
              _b.trys.push([ 1, 3, , 4 ]);
              _a = this.spr_head;
              return [ 4, dd.img_manager.loadURLImage(dd.ud_manager.account_mine.roleAttribVo.headImg) ];

             case 2:
              _a.spriteFrame = _b.sent();
              return [ 3, 4 ];

             case 3:
              error_1 = _b.sent();
              cc.log("获取头像错误");
              return [ 3, 4 ];

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      HomeCanvas.prototype.click_setting = function() {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var setNode = cc.instantiate(this.pre_setting);
        setNode.parent = dd.ui_manager.getRootNode();
      };
      HomeCanvas.prototype.click_notice = function() {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var noticeNode = cc.instantiate(this.pre_notice);
        dd.ws_manager.sendMsg(dd.protocol.ACTIVITY_GET_ACTIVITY_LIST, "", function(flag, content) {
          if (0 === flag) {
            var datas = content.items;
            noticeNode.getComponent("Notice").init(datas);
            noticeNode.parent = dd.ui_manager.getRootNode();
          } else -1 === flag ? dd.ui_manager.showTip("获取房间配置消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      HomeCanvas.prototype.click_career = function() {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var careerNode = cc.instantiate(this.pre_career);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_CAREE_INFO, "", function(flag, content) {
          if (0 === flag) {
            var data = content;
            careerNode.getComponent("Career").init(data);
            careerNode.parent = dd.ui_manager.getRootNode();
          } else -1 === flag ? dd.ui_manager.showTip("获取房间配置消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      HomeCanvas.prototype.click_store = function() {};
      HomeCanvas.prototype.click_create = function() {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var createNode = cc.instantiate(this.pre_create);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_CFG, "", function(flag, content) {
          if (0 === flag) {
            var cfg = content;
            createNode.getComponent("Create").init(cfg);
            createNode.parent = dd.ui_manager.getRootNode();
          } else -1 === flag ? dd.ui_manager.showTip("获取房间配置消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      HomeCanvas.prototype.click_join = function() {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var joinNode = cc.instantiate(this.pre_join);
        joinNode.parent = dd.ui_manager.getRootNode();
      };
      HomeCanvas.prototype.click_mine = function() {
        dd.ui_manager.showLoading();
        dd.mp_manager.playButton();
        var mineNode = cc.instantiate(this.pre_mine);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_GET_FIGHTED_TABLE_LIST, "", function(flag, content) {
          if (0 === flag) {
            var datas = content.items;
            mineNode.getComponent("Mine").init(datas);
            mineNode.parent = dd.ui_manager.getRootNode();
          } else -1 === flag ? dd.ui_manager.showTip("获取我的牌局消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      __decorate([ property(cc.Sprite) ], HomeCanvas.prototype, "spr_head", void 0);
      __decorate([ property(cc.Label) ], HomeCanvas.prototype, "lab_name", void 0);
      __decorate([ property(cc.Label) ], HomeCanvas.prototype, "lab_id", void 0);
      __decorate([ property(cc.Prefab) ], HomeCanvas.prototype, "pre_setting", void 0);
      __decorate([ property(cc.Prefab) ], HomeCanvas.prototype, "pre_create", void 0);
      __decorate([ property(cc.Prefab) ], HomeCanvas.prototype, "pre_join", void 0);
      __decorate([ property(cc.Prefab) ], HomeCanvas.prototype, "pre_mine", void 0);
      __decorate([ property(cc.Prefab) ], HomeCanvas.prototype, "pre_notice", void 0);
      __decorate([ property(cc.Prefab) ], HomeCanvas.prototype, "pre_career", void 0);
      HomeCanvas = __decorate([ ccclass ], HomeCanvas);
      return HomeCanvas;
    }(cc.Component);
    exports.default = HomeCanvas;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  IMGManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5ad63Y2yTFP55mvkxc+KvoT", "IMGManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ENCManager_1 = require("./ENCManager");
    var IMGManager = function() {
      function IMGManager() {
        this.headSpriteFrame = null;
        this.bqSpriteFrames = [];
        this.pokerSpriteFrames = [];
        this.spriteFrames = [];
      }
      IMGManager.getInstance = function() {
        null === IMGManager._instance && (IMGManager._instance = new IMGManager());
        return IMGManager._instance;
      };
      IMGManager.prototype.addSpriteFrame = function(spriteFrame) {
        var bool = this.spriteFrames.some(function(sf) {
          return sf === spriteFrame;
        });
        bool || this.spriteFrames.push(spriteFrame);
      };
      IMGManager.prototype.initIMG = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, _b, _c;
          return __generator(this, function(_d) {
            switch (_d.label) {
             case 0:
              _a = this;
              return [ 4, this.initSystemHead() ];

             case 1:
              _a.headSpriteFrame = _d.sent();
              this.bqSpriteFrames.length = 0;
              _b = this;
              return [ 4, this.initAtlas("Atlas/bq") ];

             case 2:
              _b.bqSpriteFrames = _d.sent();
              this.pokerSpriteFrames.length = 0;
              _c = this;
              return [ 4, this.initAtlas("Atlas/poker") ];

             case 3:
              _c.pokerSpriteFrames = _d.sent();
              return [ 2 ];
            }
          });
        });
      };
      IMGManager.prototype.sortByName = function(spriteFrames) {
        spriteFrames && spriteFrames.length > 1 && spriteFrames.sort(function(a, b) {
          return Number(a.name) - Number(b.name);
        });
      };
      IMGManager.prototype.getPokerSpriteFrameById = function(id) {
        var res = null;
        if (this.pokerSpriteFrames && this.pokerSpriteFrames.length > 0) for (var i = 0; i < this.pokerSpriteFrames.length; i++) {
          var spriteFrame = this.pokerSpriteFrames[i];
          if (Number(spriteFrame.name) === id) {
            res = spriteFrame;
            break;
          }
        }
        return res;
      };
      IMGManager.prototype.initSystemHead = function() {
        return new Promise(function(resolve, reject) {
          cc.loader.loadRes("Texture/systemHead", cc.SpriteFrame, function(err, spriteFrame) {
            err ? reject(err.message) : resolve(spriteFrame);
          });
        });
      };
      IMGManager.prototype.initAtlas = function(path) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          cc.loader.loadRes(path, cc.SpriteAtlas, function(err, spriteAtlas) {
            if (err) reject(err.message); else {
              var spriteFrames = spriteAtlas.getSpriteFrames();
              _this.sortByName(spriteFrames);
              cc.loader.release(spriteAtlas);
              resolve(spriteFrames);
            }
          });
        });
      };
      IMGManager.prototype.getDirPath = function() {
        var dirpath = jsb.fileUtils.getWritablePath() + "img/";
        jsb.fileUtils.isDirectoryExist(dirpath) || jsb.fileUtils.createDirectory(dirpath);
        return dirpath;
      };
      IMGManager.prototype.getFilePath = function(url) {
        return this.getDirPath() + ENCManager_1.default.getInstance().MD5(url) + ".jpg";
      };
      IMGManager.prototype.loadLocalImg = function(filePath) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          cc.loader.load(filePath, function(err, tex) {
            if (err) reject(err); else {
              var spriteFrame = new cc.SpriteFrame(tex);
              _this.addSpriteFrame(spriteFrame);
              resolve(spriteFrame);
            }
          });
        });
      };
      IMGManager.prototype.loadURLImage = function(url) {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          var filePath, buffer;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              if (!(url.length > 0)) return [ 3, 6 ];
              if (!cc.sys.isNative) return [ 3, 4 ];
              filePath = this.getFilePath(url);
              if (!jsb.fileUtils.isFileExist(filePath)) return [ 3, 1 ];
              return [ 2, this.loadLocalImg(filePath) ];

             case 1:
              return [ 4, new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = "arraybuffer";
                xhr.timeout = 1e4;
                xhr.onload = function() {
                  200 === xhr.status ? resolve(xhr.response) : reject(new TypeError("Network response failed"));
                };
                xhr.onerror = function() {
                  reject(new TypeError("Network request error"));
                };
                xhr.ontimeout = function() {
                  reject(new TypeError("Network request timeout"));
                };
                xhr.open("GET", url, true);
                xhr.send();
              }) ];

             case 2:
              buffer = _a.sent();
              jsb.fileUtils.writeDataToFile(new Uint8Array(buffer), filePath);
              return [ 2, this.loadLocalImg(filePath) ];

             case 3:
              return [ 3, 5 ];

             case 4:
              return [ 2, new Promise(function(resolve, reject) {
                cc.loader.load({
                  url: url,
                  type: "jpg"
                }, function(err, tex) {
                  if (err) reject(err); else {
                    var spriteFrame = new cc.SpriteFrame(tex);
                    _this.addSpriteFrame(spriteFrame);
                    resolve(spriteFrame);
                  }
                });
              }) ];

             case 5:
              return [ 3, 7 ];

             case 6:
              return [ 2, this.headSpriteFrame ];

             case 7:
              return [ 2 ];
            }
          });
        });
      };
      IMGManager.prototype.destroySelf = function() {
        this.destrySpriteFrames(this.spriteFrames);
        this.destrySpriteFrames(this.bqSpriteFrames);
        this.destrySpriteFrames(this.pokerSpriteFrames);
        this.release(this.headSpriteFrame);
        this.headSpriteFrame = null;
        IMGManager._instance = null;
      };
      IMGManager.prototype.destrySpriteFrames = function(spriteFrames) {
        var _this = this;
        spriteFrames.forEach(function(spriteFrame) {
          _this.release(spriteFrame);
        }, this);
        spriteFrames.length = 0;
      };
      IMGManager.prototype.release = function(owner) {
        var deps = cc.loader.getDependsRecursively(owner);
        cc.loader.release(deps);
      };
      IMGManager._instance = null;
      return IMGManager;
    }();
    exports.default = IMGManager;
    cc._RF.pop();
  }, {
    "./ENCManager": "ENCManager"
  } ],
  JSCallNative: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b138cEkpDNJQ4e7cU8w0Um2", "JSCallNative");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ModuleManager_1 = require("./ModuleManager");
    function initWX(app_id, app_key) {
      var res = -1;
      if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) ; else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) res = jsb.reflection.callStaticMethod("IOSHelper", "initWX:key:", app_id, app_key); else {
        cc.log("该方法只支持原生平台");
        res = -1;
      }
      return res;
    }
    exports.initWX = initWX;
    function initVoice(openId, app_id, app_key) {
      var result = -1;
      if (cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID) result = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "initVoice", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)I", openId, app_id, app_key); else if (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS) result = jsb.reflection.callStaticMethod("IOSHelper", "initVoice:app_id:app_key:", openId, app_id, app_key); else {
        cc.log("该方法只支持原生平台");
        result = 0;
      }
      return result;
    }
    exports.initVoice = initVoice;
    function getAppVersion() {
      var ver = "";
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? ver = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "getAppVersion", "()Ljava/lang/String;") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? ver = jsb.reflection.callStaticMethod("IOSHelper", "getAppVersion") : cc.log("该方法只支持原生平台");
      return ver;
    }
    exports.getAppVersion = getAppVersion;
    function openBrowser(url) {
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "openBrowser", "(Ljava/lang/String;)V", url) : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "openBrowser:", url) : cc.log("该方法只支持原生平台");
    }
    exports.openBrowser = openBrowser;
    function getBatteryLevel() {
      var level = 0;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID ? level = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AndroidHelper", "getBatteryLevel", "()I") : cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? level = jsb.reflection.callStaticMethod("IOSHelper", "getBatteryLevel") : cc.log("该方法只支持原生平台");
      return level;
    }
    exports.getBatteryLevel = getBatteryLevel;
    function wxLogin() {
      if (0 !== ModuleManager_1.config.wxState) return;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "wxLogin") : cc.log("该方法只支持原生平台"));
    }
    exports.wxLogin = wxLogin;
    function wxShare(url, title, des) {
      if (0 !== ModuleManager_1.config.wxState) return;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "wxShare:title:des:", url, title, des) : cc.log("该方法只支持原生平台"));
    }
    exports.wxShare = wxShare;
    function wxShareRecord(filePath) {
      if (0 !== ModuleManager_1.config.wxState) return;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "wxShareRecord:", filePath) : cc.log("该方法只支持原生平台"));
    }
    exports.wxShareRecord = wxShareRecord;
    function copyToClipboard(text) {
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "copyToClipboard:", text) : cc.log("该方法只支持原生平台"));
    }
    exports.copyToClipboard = copyToClipboard;
    function phoneVibration() {
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "phoneVibration") : cc.log("该方法只支持原生平台"));
    }
    exports.phoneVibration = phoneVibration;
    function joinTeamRoom(roomId) {
      var result = -1;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? result = jsb.reflection.callStaticMethod("IOSHelper", "joinTeamRoom:", roomId) : cc.log("该方法只支持原生平台"));
      return result;
    }
    exports.joinTeamRoom = joinTeamRoom;
    function quitRoom() {
      var result = -1;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? result = jsb.reflection.callStaticMethod("IOSHelper", "quitRoom") : cc.log("该方法只支持原生平台"));
      return result;
    }
    exports.quitRoom = quitRoom;
    function setState(isOpen) {
      var result = -1;
      cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID || (cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? result = jsb.reflection.callStaticMethod("IOSHelper", "setState:", isOpen) : cc.log("该方法只支持原生平台"));
      return result;
    }
    exports.setState = setState;
    function getProducts(ids) {
      cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS || cc.log("该方法只支持IOS原生平台");
    }
    exports.getProducts = getProducts;
    function buyProduct(pid, bid) {
      cc.sys.isNative && cc.sys.os === cc.sys.OS_IOS ? jsb.reflection.callStaticMethod("IOSHelper", "buyProduct:bid:", pid, bid) : cc.log("该方法只支持IOS原生平台");
    }
    exports.buyProduct = buyProduct;
    cc._RF.pop();
  }, {
    "./ModuleManager": "ModuleManager"
  } ],
  Join: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0675wcy/NNNZT2/5xhcwfq", "Join");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Join = function(_super) {
      __extends(Join, _super);
      function Join() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nums = [];
        _this.currentIndex = 0;
        return _this;
      }
      Join.prototype.onLoad = function() {
        var _this = this;
        this.nums.length = 0;
        this.currentIndex = 0;
        cc.find("layout", this.node).children.forEach(function(node) {
          var num = cc.find("num", node).getComponent(cc.Label);
          _this.nums.push(num);
        }, this);
        this.nums.sort(function(a, b) {
          return Number(a.node.parent.name) - Number(b.node.parent.name);
        });
        dd.ui_manager.hideLoading();
      };
      Join.prototype.click_out = function() {
        dd.mp_manager.playButton();
        this.node.destroy();
      };
      Join.prototype.click_btn = function(event, data) {
        dd.mp_manager.playButton();
        var index = Number(data);
        if (10 === index) if (this.currentIndex > 0) {
          this.currentIndex--;
          this.nums[this.currentIndex].string = "";
        } else this.nums[0].string = ""; else if (11 === index) {
          this.nums.forEach(function(label) {
            label.string = "";
          }, this);
          this.currentIndex = 0;
        } else if (this.currentIndex < this.nums.length) {
          this.nums[this.currentIndex].string = data;
          this.currentIndex++;
          if (this.currentIndex === this.nums.length) {
            if (!dd.ui_manager.showLoading("正在加入房间,请稍后")) return;
            var obj = {
              tableId: this.getNumber()
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_JOIN, msg, function(flag, content) {
              if (0 === flag) {
                dd.gm_manager.setTableData(content, 1);
                cc.director.loadScene("GameScene", function() {
                  dd.ui_manager.showTip("加入房间成功");
                });
              } else -1 === flag ? dd.ui_manager.showTip("加入房间消息发送超时") : dd.ui_manager.showTip(content);
            });
          }
        }
      };
      Join.prototype.getNumber = function() {
        var numStr = "";
        for (var i = 0; i < this.nums.length; i++) numStr += this.nums[i].string;
        return Number(numStr);
      };
      Join = __decorate([ ccclass ], Join);
      return Join;
    }(cc.Component);
    exports.default = Join;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  LoadCanvas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6a7fxzO4lItLsODsSoWCHi", "LoadCanvas");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var LoadCanvas = function(_super) {
      __extends(LoadCanvas, _super);
      function LoadCanvas() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.manifestUrl = null;
        _this.lbl_err = null;
        _this._needUpdate = false;
        _this._am = null;
        _this._checkListener = null;
        _this._updateListener = null;
        _this._failCount = 0;
        _this.download = function(json) {
          switch (cc.sys.os) {
           case cc.sys.OS_ANDROID:
            dd.js_call_native.openBrowser(json.apkUrl);
            break;

           case cc.sys.OS_IOS:
            dd.js_call_native.openBrowser(json.ipaUrl);
            break;

           default:
            dd.js_call_native.openBrowser(json.apkUrl);
          }
        };
        _this.error = function(msg) {
          dd.ui_manager.hideLoading();
          _this.lbl_err.string = msg;
        };
        return _this;
      }
      LoadCanvas.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var errMsg_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              window.dd = dd;
              dd.config.wxState = dd.js_call_native.initWX(dd.config.app_id, dd.config.secret);
              dd.init();
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 5, , 6 ]);
              return [ 4, dd.ui_manager.initUI() ];

             case 2:
              _a.sent();
              dd.ui_manager.showLoading("正在初始化游戏资源,请稍后");
              return [ 4, dd.img_manager.initIMG() ];

             case 3:
              _a.sent();
              return [ 4, dd.mp_manager.initMP() ];

             case 4:
              _a.sent();
              return [ 3, 6 ];

             case 5:
              errMsg_1 = _a.sent();
              this.error(errMsg_1 + ",请重启或卸载重装!");
              return [ 2 ];

             case 6:
              return [ 4, this.checkAppVersion() ];

             case 7:
              _a.sent();
              return [ 2 ];
            }
          });
        });
      };
      LoadCanvas.prototype.checkAppVersion = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          var ver, response, json_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              ver = dd.js_call_native.getAppVersion();
              if (!(ver.length > 0)) return [ 3, 5 ];
              return [ 4, fetch(dd.config.checkUrl + ver) ];

             case 1:
              response = _a.sent();
              if (!response.ok) return [ 3, 3 ];
              return [ 4, response.json() ];

             case 2:
              json_1 = _a.sent();
              dd.config.cd = json_1;
              json_1.type < 0 ? dd.ui_manager.showAlert(2, "当前版本过低,请更新至最新版本再继续游戏!", function() {
                _this.download(json_1);
              }) : 1 === json_1.type ? dd.ui_manager.showAlert(1, "发现新版本,是否前往下载?", function() {
                _this.download(json_1);
              }, function() {
                _this.checkResVersion();
              }) : this.checkResVersion();
              return [ 3, 4 ];

             case 3:
              this.error("检测APP版本信息服务器响应失败，请确认您的网络通畅后，重启游戏!");
              _a.label = 4;

             case 4:
              return [ 3, 6 ];

             case 5:
              this.jumpScene();
              _a.label = 6;

             case 6:
              return [ 2 ];
            }
          });
        });
      };
      LoadCanvas.prototype.checkResVersion = function() {
        var storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "platform-remote-asset";
        this._am = new jsb.AssetsManager(this.manifestUrl, storagePath);
        this._am.retain();
        if (this._am.getLocalManifest().isLoaded()) {
          this._checkListener = new jsb.EventListenerAssetsManager(this._am, this.checkCb.bind(this));
          cc.eventManager.addListener(this._checkListener, 1);
          this._am.checkUpdate();
        } else this.error("获取本地资源配置失败，请卸载重装!");
      };
      LoadCanvas.prototype.checkCb = function(event) {
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          this.error("没有发现本地的资源配置文件，热更新失败！");
          cc.eventManager.removeListener(this._checkListener);
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          dd.ui_manager.showAlert(2, "下载服务端资源配置文件失败，请检查网络！", function() {
            cc.game.end();
          });
          cc.eventManager.removeListener(this._checkListener);
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          cc.log("当前已经是最新版本，跳过热更新！");
          cc.eventManager.removeListener(this._checkListener);
          this.jumpScene();
          break;

         case jsb.EventAssetsManager.NEW_VERSION_FOUND:
          dd.ui_manager.showLoading("发现新版本资源，开始准备更新！");
          this._needUpdate = true;
          cc.eventManager.removeListener(this._checkListener);
        }
      };
      LoadCanvas.prototype.update = function(dt) {
        if (this._am && this._needUpdate) {
          this._needUpdate = false;
          this._updateListener = new jsb.EventListenerAssetsManager(this._am, this.updateCb.bind(this));
          cc.eventManager.addListener(this._updateListener, 1);
          this._failCount = 0;
          this._am.update();
        }
      };
      LoadCanvas.prototype.updateCb = function(event) {
        var needRestart = false;
        var failed = false;
        switch (event.getEventCode()) {
         case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
          cc.log("没有发现本地的资源配置文件，热更新失败！");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_PROGRESSION:
          dd.ui_manager.showLoading("正在更新，下载进度：(" + (100 * event.getPercentByFile()).toFixed(2) + "%)");
          break;

         case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
         case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
          cc.log("下载服务端资源配置文件失败，热更新失败！");
          failed = true;
          break;

         case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
          cc.log("当前已经是最新版本，跳过热更新！");
          failed = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FINISHED:
          cc.log("热更新完毕：" + event.getMessage());
          needRestart = true;
          break;

         case jsb.EventAssetsManager.UPDATE_FAILED:
          cc.log("文件下载失败：" + event.getMessage());
          this._failCount++;
          if (this._failCount < 5) this._am.downloadFailedAssets(); else {
            cc.log("太多文件下载失败，退出热更新！");
            this._failCount = 0;
            failed = true;
          }
          break;

         case jsb.EventAssetsManager.ERROR_UPDATING:
          cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
          break;

         case jsb.EventAssetsManager.ERROR_DECOMPRESS:
          cc.log(event.getMessage());
        }
        if (failed) {
          cc.eventManager.removeListener(this._updateListener);
          dd.ui_manager.showAlert(2, "更新资源失败，请确认您的网络通畅后，重启游戏！", function() {
            cc.game.end();
          });
        }
        if (needRestart) {
          cc.eventManager.removeListener(this._updateListener);
          var searchPaths = jsb.fileUtils.getSearchPaths();
          var newPaths = this._am.getLocalManifest().getSearchPaths();
          Array.prototype.unshift(searchPaths, newPaths);
          cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(searchPaths));
          jsb.fileUtils.setSearchPaths(searchPaths);
          dd.ui_manager.showLoading("资源更新完毕，正在重启游戏！");
          setTimeout(function() {
            dd.destroy();
            cc.sys.garbageCollect();
            cc.game.restart();
          }, 1e3);
        }
      };
      LoadCanvas.prototype.jumpScene = function() {
        setTimeout(function() {
          cc.director.loadScene("LoginScene");
        }, 1e3);
      };
      LoadCanvas.prototype.onDestroy = function() {
        this._am && this._am.release();
      };
      __decorate([ property({
        url: cc.RawAsset
      }) ], LoadCanvas.prototype, "manifestUrl", void 0);
      __decorate([ property(cc.Label) ], LoadCanvas.prototype, "lbl_err", void 0);
      LoadCanvas = __decorate([ ccclass ], LoadCanvas);
      return LoadCanvas;
    }(cc.Component);
    exports.default = LoadCanvas;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  LoginCanvas: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e008YDPPZHhq89FtAO4ztd", "LoginCanvas");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var LoginCanvas = function(_super) {
      __extends(LoginCanvas, _super);
      function LoginCanvas() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.btn_wechat = null;
        _this.btn_quick = null;
        _this.cb_login = function(event) {
          var detail = event.detail;
          if (1 === detail.flag) {
            var userInfo = detail.data;
            userInfo.headimgurl = dd.utils.getHeadImgUrl(userInfo.headimgurl);
            _this.wsLogin(dd.protocol.ACCOUNT_LOGIN_WX, userInfo);
          } else dd.ui_manager.showTip(detail.data);
        };
        return _this;
      }
      LoginCanvas.prototype.onDestroy = function() {
        0 === dd.config.wxState && cc.systemEvent.off("cb_login", this.cb_login, this);
      };
      LoginCanvas.prototype.onLoad = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          var errMsg_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              dd.ui_manager.showLoading();
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 6, , 7 ]);
              return [ 4, dd.ws_manager.connect(dd.config.wsUrl) ];

             case 2:
              _a.sent();
              if (!(0 === dd.config.wxState)) return [ 3, 4 ];
              cc.systemEvent.on("cb_login", this.cb_login, this);
              return [ 4, this.aotuLogin() ];

             case 3:
              _a.sent();
              this.btn_quick.node.active = false;
              this.btn_wechat.node.active = true;
              return [ 3, 5 ];

             case 4:
              dd.ui_manager.hideLoading();
              this.btn_quick.node.active = true;
              this.btn_wechat.node.active = false;
              _a.label = 5;

             case 5:
              return [ 3, 7 ];

             case 6:
              errMsg_1 = _a.sent();
              dd.ui_manager.showAlert(2, errMsg_1, function() {
                _this.onLoad();
              });
              return [ 3, 7 ];

             case 7:
              return [ 2 ];
            }
          });
        });
      };
      LoginCanvas.prototype.aotuLogin = function() {
        return __awaiter(this, void 0, void 0, function() {
          var db, data, url_refresh, response_refresh, newToken, url_userInfo, response_userInfo, userInfo, err_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              db = cc.sys.localStorage;
              if (!db.getItem("TokenInfo")) return [ 3, 12 ];
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 10, , 11 ]);
              data = JSON.parse(db.getItem("TokenInfo"));
              url_refresh = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=" + dd.config.app_id + "&grant_type=refresh_token&refresh_token=" + data.refresh_token;
              return [ 4, fetch(url_refresh) ];

             case 2:
              response_refresh = _a.sent();
              if (!response_refresh.ok) return [ 3, 8 ];
              return [ 4, response_refresh.json() ];

             case 3:
              newToken = _a.sent();
              db.setItem("TokenInfo", JSON.stringify(newToken));
              url_userInfo = "https://api.weixin.qq.com/sns/userinfo?access_token=" + newToken.access_token + "&openid=" + newToken.openid;
              return [ 4, fetch(url_userInfo) ];

             case 4:
              response_userInfo = _a.sent();
              if (!response_userInfo.ok) return [ 3, 6 ];
              return [ 4, response_userInfo.json() ];

             case 5:
              userInfo = _a.sent();
              userInfo.headimgurl = dd.utils.getHeadImgUrl(userInfo.headimgurl);
              this.wsLogin(dd.protocol.ACCOUNT_LOGIN_WX, userInfo);
              return [ 3, 7 ];

             case 6:
              dd.ui_manager.showTip("微信用户信息获取失败，请重新授权登录");
              _a.label = 7;

             case 7:
              return [ 3, 9 ];

             case 8:
              dd.ui_manager.showTip("微信授权过期，请重新授权登录");
              _a.label = 9;

             case 9:
              return [ 3, 11 ];

             case 10:
              err_1 = _a.sent();
              dd.ui_manager.showTip(err_1 + "微信请求异常，请重新授权登录");
              return [ 3, 11 ];

             case 11:
              return [ 3, 13 ];

             case 12:
              dd.ui_manager.hideLoading();
              _a.label = 13;

             case 13:
              return [ 2 ];
            }
          });
        });
      };
      LoginCanvas.prototype.click_wx = function() {
        if (!dd.ui_manager.showLoading("准备跳往微信授权登录")) return;
        setTimeout(function() {
          dd.js_call_native.wxLogin();
        }, 1e3);
      };
      LoginCanvas.prototype.wsLogin = function(msgId, info) {
        var _this = this;
        dd.mp_manager.playButton();
        var obj = {};
        if (info) {
          obj.uuid = info.unionid;
          obj.headImg = info.headimgurl;
          obj.nick = info.nickname;
          obj.sex = info.sex;
        } else obj.uuid = this.getGuestAccount();
        dd.ws_manager.sendMsg(msgId, JSON.stringify(obj), function(flag, content) {
          if (0 === flag) {
            dd.ud_manager.account_mine = content;
            dd.ws_manager.setLoginState(true);
            0 !== dd.ud_manager.account_mine.gameDataAttribVo.tableId ? _this.getTableData(0) : setTimeout(function() {
              cc.director.loadScene("HomeScene");
            }, 1e3);
          } else -1 === flag ? dd.ui_manager.showTip("登录消息超时") : dd.ui_manager.showTip(content);
        });
      };
      LoginCanvas.prototype.click_quick = function() {
        if (!dd.ui_manager.showLoading("正在登录中,请稍后")) return;
        this.wsLogin(dd.protocol.ACCOUNT_LOGIN_TOURIST);
      };
      LoginCanvas.prototype.getTableData = function(count) {
        var _this = this;
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_GET_TABLE_INFO, JSON.stringify({
          tableId: dd.ud_manager.account_mine.gameDataAttribVo.tableId
        }), function(flag, content) {
          if (0 === flag) {
            dd.gm_manager.setTableData(content, 1);
            cc.director.loadScene("GameScene", function() {
              dd.ui_manager.showTip("返回牌局成功!");
            });
          } else {
            count++;
            count > 3 ? dd.ui_manager.showAlert(2, "连接服务器失败,请确认网络后重新启动游戏!", function() {
              cc.game.end();
            }) : _this.getTableData(count);
          }
        });
      };
      LoginCanvas.prototype.getGuestAccount = function() {
        var db = cc.sys.localStorage;
        var uuid = db.getItem("uuid");
        if (uuid && 32 === uuid.length) return uuid;
        uuid = dd.utils.createUUID(32, 16);
        db.setItem("uuid", uuid);
        return uuid;
      };
      __decorate([ property(cc.Button) ], LoginCanvas.prototype, "btn_wechat", void 0);
      __decorate([ property(cc.Button) ], LoginCanvas.prototype, "btn_quick", void 0);
      LoginCanvas = __decorate([ ccclass ], LoginCanvas);
      return LoginCanvas;
    }(cc.Component);
    exports.default = LoginCanvas;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  MPManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88720t34tpIbpYlM/Qx2Ev0", "MPManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MPManager = function() {
      function MPManager() {
        this.url_allin = null;
        this.url_bet = null;
        this.url_call = null;
        this.url_check = null;
        this.url_deal = null;
        this.url_flop = null;
        this.url_fold = null;
        this.url_join = null;
        this.url_msg = null;
        this.url_over = null;
        this.url_raise = null;
        this.url_start = null;
        this.url_straddle = null;
        this.url_time = null;
        this.url_button = null;
        this.sw = true;
      }
      MPManager.getInstance = function() {
        null === MPManager._instance && (MPManager._instance = new MPManager());
        return MPManager._instance;
      };
      MPManager.prototype.initMP = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
          return __generator(this, function(_r) {
            switch (_r.label) {
             case 0:
              this.initSetting();
              _a = this;
              return [ 4, this.loadFile("allin") ];

             case 1:
              _a.url_allin = _r.sent();
              _b = this;
              return [ 4, this.loadFile("bet") ];

             case 2:
              _b.url_bet = _r.sent();
              _c = this;
              return [ 4, this.loadFile("call") ];

             case 3:
              _c.url_call = _r.sent();
              _d = this;
              return [ 4, this.loadFile("check") ];

             case 4:
              _d.url_check = _r.sent();
              _e = this;
              return [ 4, this.loadFile("deal") ];

             case 5:
              _e.url_deal = _r.sent();
              _f = this;
              return [ 4, this.loadFile("flop") ];

             case 6:
              _f.url_flop = _r.sent();
              _g = this;
              return [ 4, this.loadFile("fold") ];

             case 7:
              _g.url_fold = _r.sent();
              _h = this;
              return [ 4, this.loadFile("join") ];

             case 8:
              _h.url_join = _r.sent();
              _j = this;
              return [ 4, this.loadFile("msg") ];

             case 9:
              _j.url_msg = _r.sent();
              _k = this;
              return [ 4, this.loadFile("over") ];

             case 10:
              _k.url_over = _r.sent();
              _l = this;
              return [ 4, this.loadFile("raise") ];

             case 11:
              _l.url_raise = _r.sent();
              _m = this;
              return [ 4, this.loadFile("start") ];

             case 12:
              _m.url_start = _r.sent();
              _o = this;
              return [ 4, this.loadFile("straddle") ];

             case 13:
              _o.url_straddle = _r.sent();
              _p = this;
              return [ 4, this.loadFile("time") ];

             case 14:
              _p.url_time = _r.sent();
              _q = this;
              return [ 4, this.loadFile("button") ];

             case 15:
              _q.url_button = _r.sent();
              return [ 2 ];
            }
          });
        });
      };
      MPManager.prototype.loadFile = function(name) {
        return new Promise(function(resolve, reject) {
          var path = "Audio/" + name;
          cc.loader.loadRes(path, function(error, resource) {
            if (error) {
              cc.error(error.message || error);
              reject(error.message || error);
            }
            cc.loader.setAutoRelease(resource, false);
            resolve(resource);
          });
        });
      };
      MPManager.prototype.initSetting = function() {
        var db = cc.sys.localStorage;
        var sw = db.getItem("sw");
        sw ? this.sw = JSON.parse(sw).sw : db.setItem("sw", JSON.stringify({
          sw: this.sw
        }));
      };
      MPManager.prototype.playAllin = function() {
        this.sw && this.url_allin && cc.audioEngine.play(this.url_allin, false, 1);
      };
      MPManager.prototype.playBet = function() {
        this.sw && this.url_bet && cc.audioEngine.play(this.url_bet, false, 1);
      };
      MPManager.prototype.playCall = function() {
        this.sw && this.url_call && cc.audioEngine.play(this.url_call, false, 1);
      };
      MPManager.prototype.playCheck = function() {
        this.sw && this.url_check && cc.audioEngine.play(this.url_check, false, 1);
      };
      MPManager.prototype.playDeal = function() {
        this.sw && this.url_deal && cc.audioEngine.play(this.url_deal, false, 1);
      };
      MPManager.prototype.playFlop = function() {
        this.sw && this.url_flop && cc.audioEngine.play(this.url_flop, false, 1);
      };
      MPManager.prototype.playFold = function() {
        this.sw && this.url_fold && cc.audioEngine.play(this.url_fold, false, 1);
      };
      MPManager.prototype.playJoin = function() {
        this.sw && this.url_join && cc.audioEngine.play(this.url_join, false, 1);
      };
      MPManager.prototype.playMsg = function() {
        this.sw && this.url_msg && cc.audioEngine.play(this.url_msg, false, 1);
      };
      MPManager.prototype.playOver = function() {
        this.sw && this.url_over && cc.audioEngine.play(this.url_over, false, 1);
      };
      MPManager.prototype.playRaise = function() {
        this.sw && this.url_raise && cc.audioEngine.play(this.url_raise, false, 1);
      };
      MPManager.prototype.playStart = function() {
        this.sw && this.url_start && cc.audioEngine.play(this.url_start, false, 1);
      };
      MPManager.prototype.playStraddle = function() {
        this.sw && this.url_straddle && cc.audioEngine.play(this.url_straddle, false, 1);
      };
      MPManager.prototype.playTime = function() {
        this.sw && this.url_time && cc.audioEngine.play(this.url_time, false, 1);
      };
      MPManager.prototype.playButton = function() {
        this.sw && this.url_button && cc.audioEngine.play(this.url_button, false, 1);
      };
      MPManager.prototype.destroySelf = function() {
        cc.loader.release(this.url_allin);
        cc.loader.release(this.url_bet);
        cc.loader.release(this.url_call);
        cc.loader.release(this.url_check);
        cc.loader.release(this.url_deal);
        cc.loader.release(this.url_flop);
        cc.loader.release(this.url_fold);
        cc.loader.release(this.url_join);
        cc.loader.release(this.url_msg);
        cc.loader.release(this.url_over);
        cc.loader.release(this.url_raise);
        cc.loader.release(this.url_start);
        cc.loader.release(this.url_straddle);
        cc.loader.release(this.url_time);
        cc.loader.release(this.url_button);
        cc.audioEngine.uncacheAll();
        this.url_allin = null;
        this.url_bet = null;
        this.url_call = null;
        this.url_check = null;
        this.url_deal = null;
        this.url_flop = null;
        this.url_fold = null;
        this.url_join = null;
        this.url_msg = null;
        this.url_over = null;
        this.url_raise = null;
        this.url_start = null;
        this.url_straddle = null;
        this.url_time = null;
        this.url_button = null;
      };
      MPManager._instance = null;
      return MPManager;
    }();
    exports.default = MPManager;
    cc._RF.pop();
  }, {} ],
  MineItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c49434OQu1NBbZM9l00wtEt", "MineItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var MineItem = function(_super) {
      __extends(MineItem, _super);
      function MineItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.head = null;
        _this.nick = null;
        _this.blind = null;
        _this.min = null;
        _this.time = null;
        _this.count = null;
        _this.data = null;
        _this.callback = null;
        return _this;
      }
      MineItem.prototype.updateItem = function(data, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.data = data;
              this.callback = callback;
              if (!this.data) return [ 3, 2 ];
              this.nick.string = dd.utils.getStringBySize(data.nick, 12);
              this.blind.string = data.small + "/" + data.big;
              this.min.string = data.minJoin.toString();
              this.count.string = data.currPlayer + "/" + data.seatNum;
              _a = this.head;
              return [ 4, dd.img_manager.loadURLImage(data.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      MineItem.prototype.update = function(dt) {
        if (this.data) {
          var endTime = Number(this.data.vaildTime);
          if (endTime > 0) {
            endTime -= 1e3 * dt;
            endTime < 0 && (endTime = 0);
            this.data.vaildTime = endTime.toString();
            this.time.string = dd.utils.getCountDownString(Number(this.data.vaildTime));
          } else {
            this.data = null;
            this.node.destroy();
          }
        }
      };
      MineItem.prototype.click_item = function() {
        this.callback && this.callback(this.data);
      };
      __decorate([ property(cc.Sprite) ], MineItem.prototype, "head", void 0);
      __decorate([ property(cc.Label) ], MineItem.prototype, "nick", void 0);
      __decorate([ property(cc.Label) ], MineItem.prototype, "blind", void 0);
      __decorate([ property(cc.Label) ], MineItem.prototype, "min", void 0);
      __decorate([ property(cc.Label) ], MineItem.prototype, "time", void 0);
      __decorate([ property(cc.Label) ], MineItem.prototype, "count", void 0);
      MineItem = __decorate([ ccclass ], MineItem);
      return MineItem;
    }(cc.Component);
    exports.default = MineItem;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  Mine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42ef93CXq5H+r5M9ptyDEsm", "Mine");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Mine = function(_super) {
      __extends(Mine, _super);
      function Mine() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.svNode = null;
        _this.dataList = [];
        return _this;
      }
      Mine.prototype.init = function(datas) {
        this.dataList = datas;
      };
      Mine.prototype.onLoad = function() {
        if (this.dataList && this.dataList.length > 0) {
          this.svNode.getComponent("SVScript").init(this.dataList, function(data) {
            dd.ui_manager.showLoading("正在进入房间");
            dd.mp_manager.playButton();
            var obj = {
              tableId: data.tableId
            };
            var msg = JSON.stringify(obj);
            dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_JOIN, msg, function(flag, content) {
              if (0 === flag) {
                dd.gm_manager.setTableData(content, 1);
                cc.director.loadScene("GameScene", function() {
                  dd.ui_manager.showTip("加入房间成功");
                });
              } else -1 === flag ? dd.ui_manager.showTip("加入房间消息发送超时") : dd.ui_manager.showTip(content);
            });
          });
          dd.ui_manager.hideLoading();
        } else dd.ui_manager.showTip("当前没有您可以继续的牌局!");
      };
      Mine.prototype.click_out = function() {
        dd.mp_manager.playButton();
        this.node.destroy();
      };
      __decorate([ property(cc.Node) ], Mine.prototype, "svNode", void 0);
      Mine = __decorate([ ccclass ], Mine);
      return Mine;
    }(cc.Component);
    exports.default = Mine;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  ModuleManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f6b0RoQ+hAJbOANBw4zD9r", "ModuleManager");
    var _this = this;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var JSCallNative = require("./JSCallNative");
    var NativeCallJS = require("./NativeCallJS");
    var Utils = require("./Utils");
    var Config = require("./Config");
    var WSManager_1 = require("./WSManager");
    var IMGManager_1 = require("./IMGManager");
    var UDManager_1 = require("./UDManager");
    var GMManager_1 = require("./GMManager");
    var UIManager_1 = require("./UIManager");
    var ENCManager_1 = require("./ENCManager");
    var MPManager_1 = require("./MPManager");
    var Enum = require("./Protocol");
    var NodeManager_1 = require("./NodeManager");
    exports.js_call_native = JSCallNative;
    exports.native_call_js = NativeCallJS;
    exports.utils = Utils;
    exports.config = Config;
    exports.protocol = Enum.Protocol;
    exports.hot_key = Enum.HotKey;
    exports.card_type = Enum.CardType;
    exports.game_state = Enum.GameState;
    exports.suit = Enum.Suit;
    exports.ws_manager = null;
    exports.img_manager = null;
    exports.ud_manager = null;
    exports.gm_manager = null;
    exports.ui_manager = null;
    exports.enc_manager = null;
    exports.mp_manager = null;
    exports.node_manager = null;
    function errAlert() {
      exports.ui_manager.showAlert(2, "连接服务器失败，请重新启动游戏！", function() {
        cc.game.end();
      });
      exports.gm_manager.destroySelf();
      exports.ud_manager.destroySelf();
      exports.ws_manager.destroySelf();
      exports.gm_manager = null;
      exports.ud_manager = null;
      exports.ws_manager = null;
    }
    exports.errAlert = errAlert;
    exports.cb_diconnect = function(event) {
      var accountId = null;
      exports.ud_manager && exports.ud_manager.account_mine && (accountId = exports.ud_manager && exports.ud_manager.account_mine.accountId);
      exports.gm_manager.destroySelf();
      exports.ud_manager.destroySelf();
      exports.gm_manager = null;
      exports.ud_manager = null;
      exports.ui_manager.hideLoading();
      exports.ui_manager.showLoading("正在重连,请稍后");
      setTimeout(function() {
        return __awaiter(_this, void 0, void 0, function() {
          var sceneName_1, err_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              exports.ws_manager = WSManager_1.default.getInstance();
              exports.gm_manager = GMManager_1.default.getInstance();
              exports.ud_manager = UDManager_1.default.getInstance();
              _a.label = 1;

             case 1:
              _a.trys.push([ 1, 3, , 4 ]);
              sceneName_1 = cc.director.getScene().name;
              return [ 4, exports.ws_manager.connect(exports.config.wsUrl) ];

             case 2:
              _a.sent();
              "LoginScene" !== sceneName_1 && accountId ? exports.ws_manager.sendMsg(exports.protocol.ACCOUNT_LOGIN_ACCOUNTID, JSON.stringify({
                accountId: accountId
              }), function(flag, content) {
                if (0 === flag) {
                  exports.ud_manager.account_mine = content;
                  exports.ws_manager.setLoginState(true);
                  exports.ud_manager.account_mine && exports.ud_manager.account_mine.gameDataAttribVo && 0 !== exports.ud_manager.account_mine.gameDataAttribVo.tableId ? exports.ws_manager.sendMsg(exports.protocol.DZPKER_TABLE_GET_TABLE_INFO, JSON.stringify({
                    tableId: exports.ud_manager.account_mine.gameDataAttribVo.tableId
                  }), function(flag, content) {
                    if (0 === flag) {
                      exports.gm_manager.setTableData(content);
                      "GameScene" !== sceneName_1 ? cc.director.loadScene("GameScene", function() {
                        exports.ui_manager.showTip("重连成功!");
                      }) : exports.ui_manager.showTip("重连成功!");
                    } else errAlert();
                  }) : "GameScene" === sceneName_1 ? cc.director.loadScene("HomeScene", function() {
                    exports.ui_manager.showTip("重连成功!");
                  }) : exports.ui_manager.showTip("重连成功!");
                } else errAlert();
              }) : exports.ui_manager.hideLoading();
              return [ 3, 4 ];

             case 3:
              err_1 = _a.sent();
              errAlert();
              return [ 3, 4 ];

             case 4:
              return [ 2 ];
            }
          });
        });
      }, 100);
    };
    function init() {
      exports.ws_manager = WSManager_1.default.getInstance();
      exports.img_manager = IMGManager_1.default.getInstance();
      exports.ud_manager = UDManager_1.default.getInstance();
      exports.ui_manager = UIManager_1.default.getInstance();
      exports.enc_manager = ENCManager_1.default.getInstance();
      exports.gm_manager = GMManager_1.default.getInstance();
      exports.mp_manager = MPManager_1.default.getInstance();
      exports.node_manager = NodeManager_1.default.getInstance();
      cc.systemEvent.on("cb_diconnect", exports.cb_diconnect, this);
    }
    exports.init = init;
    function destroy() {
      exports.img_manager.destroySelf();
      exports.ws_manager.destroySelf();
      exports.ui_manager.destroySelf();
      exports.ud_manager.destroySelf();
      exports.gm_manager.destroySelf();
      exports.mp_manager.destroySelf();
      exports.node_manager.destroySelf();
      exports.img_manager = null;
      exports.ws_manager = null;
      exports.ui_manager = null;
      exports.ud_manager = null;
      exports.gm_manager = null;
      exports.mp_manager = null;
      exports.node_manager = null;
      cc.systemEvent.off("cb_diconnect", exports.cb_diconnect, this);
    }
    exports.destroy = destroy;
    cc._RF.pop();
  }, {
    "./Config": "Config",
    "./ENCManager": "ENCManager",
    "./GMManager": "GMManager",
    "./IMGManager": "IMGManager",
    "./JSCallNative": "JSCallNative",
    "./MPManager": "MPManager",
    "./NativeCallJS": "NativeCallJS",
    "./NodeManager": "NodeManager",
    "./Protocol": "Protocol",
    "./UDManager": "UDManager",
    "./UIManager": "UIManager",
    "./Utils": "Utils",
    "./WSManager": "WSManager"
  } ],
  NativeCallJS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d0f79HLLThNZYwr8VFvo8ym", "NativeCallJS");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Config = require("./Config");
    function getAccessToken(code) {
      return __awaiter(this, void 0, void 0, function() {
        var url, response, data, db, url_userInfo, response_userInfo, userInfo, err_1;
        return __generator(this, function(_a) {
          switch (_a.label) {
           case 0:
            _a.trys.push([ 0, 11, , 12 ]);
            url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + Config.app_id + "&secret=" + Config.secret + "&code=" + code + "&grant_type=authorization_code";
            return [ 4, fetch(url) ];

           case 1:
            response = _a.sent();
            if (!response.ok) return [ 3, 9 ];
            return [ 4, response.json() ];

           case 2:
            data = _a.sent();
            if (!data.access_token) return [ 3, 7 ];
            db = cc.sys.localStorage;
            db.setItem("TokenInfo", JSON.stringify(data));
            url_userInfo = "https://api.weixin.qq.com/sns/userinfo?access_token=" + data.access_token + "&openid=" + data.openid;
            return [ 4, fetch(url_userInfo) ];

           case 3:
            response_userInfo = _a.sent();
            if (!response_userInfo.ok) return [ 3, 5 ];
            return [ 4, response_userInfo.json() ];

           case 4:
            userInfo = _a.sent();
            cc.systemEvent.emit("cb_login", {
              flag: 1,
              data: userInfo
            });
            return [ 3, 6 ];

           case 5:
            cc.systemEvent.emit("cb_login", {
              flag: 0,
              data: "获取用户信息失败"
            });
            _a.label = 6;

           case 6:
            return [ 3, 8 ];

           case 7:
            cc.systemEvent.emit("cb_login", {
              flag: 0,
              data: "获取token失败"
            });
            _a.label = 8;

           case 8:
            return [ 3, 10 ];

           case 9:
            cc.systemEvent.emit("cb_login", {
              flag: 0,
              data: "请求token失败"
            });
            _a.label = 10;

           case 10:
            return [ 3, 12 ];

           case 11:
            err_1 = _a.sent();
            cc.systemEvent.emit("cb_login", {
              flag: 0,
              data: "http请求异常"
            });
            return [ 3, 12 ];

           case 12:
            return [ 2 ];
          }
        });
      });
    }
    exports.getAccessToken = getAccessToken;
    function loginError() {
      cc.systemEvent.emit("cb_login", {
        flag: 0,
        data: "授权失败"
      });
    }
    exports.loginError = loginError;
    function shareCallback(result) {
      cc.systemEvent.emit("cb_share", result);
    }
    exports.shareCallback = shareCallback;
    cc._RF.pop();
  }, {
    "./Config": "Config"
  } ],
  NodeManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "859b3izbDlPmbhqfmMpAYn1", "NodeManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var NodeManager = function() {
      function NodeManager() {
        this.canTouch = true;
        this.maxTouchNum = 1;
        this.touchNum = 0;
        this.__dispatchEvent__ = null;
      }
      NodeManager.getInstance = function() {
        if (null === NodeManager._instance) {
          NodeManager._instance = new NodeManager();
          NodeManager._instance.__dispatchEvent__ = cc.Node.prototype.dispatchEvent;
          cc.Node.prototype.dispatchEvent = NodeManager._instance.dispatchEvent;
        }
        return NodeManager._instance;
      };
      NodeManager.prototype.dispatchEvent = function(event) {
        switch (event.type) {
         case "touchstart":
          if (NodeManager._instance.touchNum < NodeManager._instance.maxTouchNum) {
            NodeManager._instance.touchNum++;
            NodeManager._instance.canTouch = true;
            NodeManager._instance.__dispatchEvent__.call(this, event);
          }
          break;

         case "touchmove":
          if (!NodeManager._instance.canTouch && NodeManager._instance.touchNum < NodeManager._instance.maxTouchNum) {
            NodeManager._instance.canTouch = true;
            NodeManager._instance.touchNum++;
          }
          NodeManager._instance.canTouch && NodeManager._instance.__dispatchEvent__.call(this, event);
          break;

         case "touchend":
         case "touchcancel":
          if (NodeManager._instance.canTouch) {
            NodeManager._instance.canTouch = false;
            NodeManager._instance.touchNum--;
            NodeManager._instance.__dispatchEvent__.call(this, event);
          }
          break;

         default:
          NodeManager._instance.__dispatchEvent__.call(this, event);
        }
      };
      NodeManager.prototype.destroySelf = function() {
        this.canTouch = true;
        this.maxTouchNum = 1;
        this.touchNum = 0;
        cc.Node.prototype.dispatchEvent = this.__dispatchEvent__;
        this.__dispatchEvent__ = null;
        NodeManager._instance = null;
      };
      NodeManager._instance = null;
      return NodeManager;
    }();
    exports.default = NodeManager;
    cc._RF.pop();
  }, {} ],
  Notice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e5a51bqSKBHZZQBx8mrF+N3", "Notice");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Notice = function(_super) {
      __extends(Notice, _super);
      function Notice() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sv1 = null;
        _this.sv2 = null;
        _this.dataList = null;
        return _this;
      }
      Notice.prototype.init = function(datas) {
        this.dataList = datas;
      };
      Notice.prototype.onLoad = function() {
        var _this = this;
        this.sv1.node.active = true;
        this.sv2.node.active = false;
        if (this.dataList && this.dataList.length > 0) {
          this.dataList.forEach(function(data, index) {
            return __awaiter(_this, void 0, void 0, function() {
              var _this = this;
              var sf1, node_out;
              return __generator(this, function(_a) {
                switch (_a.label) {
                 case 0:
                  return [ 4, dd.img_manager.loadURLImage(data.currUrl) ];

                 case 1:
                  sf1 = _a.sent();
                  node_out = new cc.Node();
                  node_out.tag = index;
                  node_out.addComponent(cc.Sprite).spriteFrame = sf1;
                  node_out.on(cc.Node.EventType.TOUCH_END, function(event) {
                    return __awaiter(_this, void 0, void 0, function() {
                      var traget, item, sf2, node_in;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                         case 0:
                          traget = event.getCurrentTarget();
                          item = this.dataList[traget.tag];
                          return [ 4, dd.img_manager.loadURLImage(item.openUrl) ];

                         case 1:
                          sf2 = _a.sent();
                          node_in = new cc.Node();
                          node_in.addComponent(cc.Sprite).spriteFrame = sf2;
                          this.sv1.node.active = false;
                          this.sv2.node.active = true;
                          this.sv2.content.addChild(node_in);
                          return [ 2 ];
                        }
                      });
                    });
                  }, this);
                  this.sv1.content.addChild(node_out);
                  return [ 2 ];
                }
              });
            });
          }, this);
          dd.ui_manager.hideLoading();
        } else dd.ui_manager.showTip("当前没有公告消息");
      };
      Notice.prototype.click_out = function() {
        dd.mp_manager.playButton();
        if (this.sv2.node.active) {
          this.sv2.scrollToTop();
          this.sv2.content.removeAllChildren();
          this.sv2.node.active = false;
          this.sv1.node.active = true;
        } else this.node.destroy();
      };
      __decorate([ property(cc.ScrollView) ], Notice.prototype, "sv1", void 0);
      __decorate([ property(cc.ScrollView) ], Notice.prototype, "sv2", void 0);
      Notice = __decorate([ ccclass ], Notice);
      return Notice;
    }(cc.Component);
    exports.default = Notice;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  PlayerItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "412be3wOR5POL4lrvyl64N9", "PlayerItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var PlayerItem = function(_super) {
      __extends(PlayerItem, _super);
      function PlayerItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.headImg = null;
        _this.nick = null;
        _this.gold = null;
        _this.count = null;
        _this.win = null;
        return _this;
      }
      PlayerItem.prototype.init = function(data) {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              _a = this.headImg;
              return [ 4, dd.img_manager.loadURLImage(data.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              this.nick.string = dd.utils.getStringBySize(data.nick, 12);
              this.gold.string = data.currMoney;
              this.count.string = data.gameNum;
              this.win.string = data.winMoney;
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Sprite) ], PlayerItem.prototype, "headImg", void 0);
      __decorate([ property(cc.Label) ], PlayerItem.prototype, "nick", void 0);
      __decorate([ property(cc.Label) ], PlayerItem.prototype, "gold", void 0);
      __decorate([ property(cc.Label) ], PlayerItem.prototype, "count", void 0);
      __decorate([ property(cc.Label) ], PlayerItem.prototype, "win", void 0);
      PlayerItem = __decorate([ ccclass ], PlayerItem);
      return PlayerItem;
    }(cc.Component);
    exports.default = PlayerItem;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  PlayerLayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7ad3y5yEFB44lZyiF3iCra", "PlayerLayer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var PlayerLayer = function(_super) {
      __extends(PlayerLayer, _super);
      function PlayerLayer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pre_player = null;
        _this.seatNodes = [];
        _this.pCardNodes = [];
        _this.pre_card = null;
        _this.chip_prefab = null;
        return _this;
      }
      PlayerLayer.prototype.onLoad = function() {
        var _this = this;
        cc.systemEvent.on("updatePlayer", this.updatePlayer, this);
        cc.systemEvent.on("doFPAction", this.doFPAction, this);
        cc.systemEvent.on("btResult", this.showBTResult, this);
        cc.systemEvent.on("lookCard", this.showLookCard, this);
        cc.systemEvent.on("chatPush", this.showChat, this);
        this.seatNodes.forEach(function(seatNode) {
          seatNode.getChildByName("empty").on(cc.Node.EventType.TOUCH_END, _this.click_empty, _this);
        }, this);
        this.updatePlayer();
        dd.gm_manager.playerScript = this;
      };
      PlayerLayer.prototype.onDestroy = function() {
        cc.systemEvent.off("updatePlayer", this.updatePlayer, this);
        cc.systemEvent.off("doFPAction", this.doFPAction, this);
        cc.systemEvent.off("btResult", this.showBTResult, this);
        cc.systemEvent.off("lookCard", this.showLookCard, this);
        cc.systemEvent.off("chatPush", this.showChat, this);
      };
      PlayerLayer.prototype.update = function() {
        var _this = this;
        if (dd.gm_manager && dd.gm_manager.getTableData()) {
          var tabelData = dd.gm_manager.getTableData();
          if (tabelData.gameState === dd.game_state.STATE_TABLE_OUTCARD_2) {
            if (3 !== dd.gm_manager.publicCardNum) {
              dd.gm_manager.publicCardNum = 3;
              this.showPublicCardAction(0, 3);
            }
          } else if (tabelData.gameState === dd.game_state.STATE_TABLE_OUTCARD_3) {
            if (4 !== dd.gm_manager.publicCardNum) {
              dd.gm_manager.publicCardNum = 4;
              this.showPublicCardAction(3, 4);
              this.updatePublicCard(3);
            }
          } else if (tabelData.gameState === dd.game_state.STATE_TABLE_OUTCARD_4) {
            if (5 !== dd.gm_manager.publicCardNum) {
              dd.gm_manager.publicCardNum = 5;
              this.showPublicCardAction(4, 5);
              this.updatePublicCard(4);
            }
          } else {
            this.updatePublicCard(tabelData.tableHandCards.length);
            if (tabelData.gameState === dd.game_state.STATE_TABLE_OVER_ONCE && !dd.gm_manager.isShowGameOver) {
              dd.gm_manager.isShowGameOver = true;
              this.showOthersCard();
              setTimeout(function() {
                _this.showGameOver();
              }, 1e3);
            }
          }
        }
      };
      PlayerLayer.prototype.showChat = function(content) {
        var data = content.detail;
        var seatInfo = dd.gm_manager.getSeatDataByAccount(data.accountId);
        if (seatInfo) {
          var playerNode = this.getNodeBySeatId(seatInfo.seatIndex);
          if (playerNode) {
            var node = new cc.Node();
            node.width = 80;
            node.height = 80;
            var spriteNode = new cc.Node();
            spriteNode.addComponent(cc.Sprite).spriteFrame = dd.img_manager.bqSpriteFrames[data.content - 1];
            spriteNode.parent = node;
            node.parent = playerNode;
            node.scale = 0;
            var action = cc.scaleTo(.5, 1);
            action.easing(cc.easeElasticOut(.4));
            var seq = cc.sequence(action, cc.delayTime(1), cc.callFunc(function(target, data) {
              target.removeFromParent(true);
              target.destroy();
            }, this));
            node.runAction(seq);
          }
        }
      };
      PlayerLayer.prototype.updatePlayer = function() {
        var mineSeat = dd.gm_manager.getMineSeat();
        mineSeat && (dd.gm_manager.startIndex = mineSeat.seatIndex);
        var tempIndex = dd.gm_manager.startIndex;
        for (var i = 0; i < this.seatNodes.length; i++) {
          var seatData = dd.gm_manager.getSeatDataByIndex(tempIndex);
          var seatNode = this.seatNodes[i];
          var emptyNode = seatNode.getChildByName("empty");
          var playerNode = seatNode.getChildByName("Player");
          if ("0" === seatData.accountId) {
            emptyNode.active = true;
            playerNode && playerNode.destroy();
          } else {
            emptyNode.active = false;
            playerNode || (playerNode = cc.instantiate(this.pre_player));
            playerNode.getComponent("PlayerUI").updateData(seatData, i);
            playerNode.parent = seatNode;
            playerNode.x = 0 === i && mineSeat ? -150 : 0;
          }
          tempIndex++;
          tempIndex > 8 && (tempIndex = 0);
        }
      };
      PlayerLayer.prototype.doFPAction = function() {
        var _this = this;
        var nodeList = [];
        var dataList = [];
        var tabelData = dd.gm_manager.getTableData();
        var dealIndex = tabelData.bankerIndex;
        for (var i = 0; i < tabelData.seats.length; i++) {
          var seatData = tabelData.seats[dealIndex];
          if (1 === seatData.bGamed) {
            var nodeIndex = seatData.seatIndex - dd.gm_manager.startIndex;
            nodeIndex < 0 && (nodeIndex = 9 + nodeIndex);
            var playerNode = this.seatNodes[nodeIndex].getChildByName("Player");
            if (playerNode) {
              nodeList.push(playerNode);
              dataList.push(seatData);
            }
          }
          dealIndex++;
          dealIndex > 8 && (dealIndex = 0);
        }
        var dTime = (Number(tabelData.actTime) - Number(tabelData.svrTime)) / 1e3;
        var eTime = dTime / nodeList.length / 2;
        eTime < .1 && (eTime = .1);
        cc.log("发每张手牌的时间" + eTime);
        var index = 0;
        var _loop_1 = function(i) {
          var _loop_2 = function(j) {
            var playerNode = nodeList[j];
            if (playerNode) {
              var data_1 = dataList[j];
              var endPos = playerNode.parent.getPosition().add(playerNode.getPosition());
              var isMine_1 = 0 !== playerNode.x;
              var actionNode = new cc.Node();
              actionNode.addComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
              actionNode.scale = .5;
              actionNode.setPosition(0, 0);
              actionNode.parent = this_1.node;
              var delayAction = cc.delayTime(eTime * index);
              var audioCallBack = cc.callFunc(function(target) {
                dd.mp_manager.playDeal();
              }, this_1);
              var moveAction = cc.moveTo(eTime, endPos);
              var scaleAction = cc.scaleTo(eTime, 1);
              var rotateAction = cc.rotateBy(eTime, 720);
              var spawnAction = cc.spawn(moveAction, scaleAction, rotateAction);
              var callback = cc.callFunc(function(target) {
                target.destroy();
                if (isMine_1 && playerNode && playerNode.isValid) {
                  dd.gm_manager.isCreateMineCard = true;
                  var fpNode = cc.instantiate(_this.pre_card);
                  fpNode.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(data_1.handCards[i]);
                  fpNode.parent = playerNode.getChildByName("card" + (i + 1));
                  fpNode.getComponent(cc.Animation).play();
                  dd.mp_manager.playFlop();
                }
              }, this_1);
              actionNode.runAction(cc.sequence(delayAction, audioCallBack, spawnAction, callback));
              index++;
            }
          };
          for (var j = 0; j < nodeList.length; j++) _loop_2(j);
        };
        var this_1 = this;
        for (var i = 0; i < 2; i++) _loop_1(i);
      };
      PlayerLayer.prototype.showLookCard = function() {
        var tabelData = dd.gm_manager.getTableData();
        if (tabelData && -1 !== tabelData.showCardSeatIndex) {
          var seatInfo = dd.gm_manager.getSeatDataByIndex(tabelData.showCardSeatIndex);
          if (!dd.gm_manager.isMineSeat(seatInfo)) {
            var playerNode = this.getNodeBySeatId(tabelData.showCardSeatIndex);
            if (playerNode) for (var i = 0; i < 2; i++) {
              var fpNode = cc.instantiate(this.pre_card);
              fpNode.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(seatInfo.handCards[i]);
              fpNode.parent = playerNode.getChildByName("card" + (i + 3));
              fpNode.getComponent(cc.Animation).play();
              dd.mp_manager.playFlop();
            }
          }
        }
      };
      PlayerLayer.prototype.showPublicCardAction = function(sIndex, eIndex) {
        var _this = this;
        cc.log("显示公共牌的发牌动作");
        var tabelData = dd.gm_manager.getTableData();
        var index = 0;
        var dTime = (Number(tabelData.actTime) - Number(tabelData.svrTime)) / 1e3;
        var eTime = dTime / (eIndex - sIndex);
        eTime < .1 && (eTime = .1);
        cc.log("发每张公共牌的时间" + eTime);
        var _loop_3 = function(i) {
          var pCardNode = this_2.pCardNodes[i];
          var oldCardNode = pCardNode.getChildByName("FPCard");
          oldCardNode && oldCardNode.destroy();
          var endPos = pCardNode.parent.getPosition().add(pCardNode.getPosition());
          var actionNode = new cc.Node();
          actionNode.addComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
          actionNode.scale = .5;
          actionNode.setPosition(0, 0);
          actionNode.parent = this_2.node;
          var delayAction = cc.delayTime(eTime * index);
          var moveAction = cc.moveTo(eTime, endPos);
          var scaleAction = cc.scaleTo(eTime, 1);
          var rotateAction = cc.rotateBy(eTime, 720);
          var spawnAction = cc.spawn(moveAction, scaleAction, rotateAction);
          var callback = cc.callFunc(function(target) {
            target.destroy();
            var fpNode = cc.instantiate(_this.pre_card);
            fpNode.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(tabelData.tableHandCards[i]);
            fpNode.parent = pCardNode;
            fpNode.getComponent(cc.Animation).play();
            dd.mp_manager.playFlop();
          }, this_2);
          actionNode.runAction(cc.sequence(delayAction, spawnAction, callback));
          dd.mp_manager.playDeal();
          index++;
        };
        var this_2 = this;
        for (var i = sIndex; i < eIndex; i++) _loop_3(i);
      };
      PlayerLayer.prototype.updatePublicCard = function(pIndex) {
        var _this = this;
        var tabelData = dd.gm_manager.getTableData();
        if (tabelData.gameState < dd.game_state.STATE_TABLE_OUTCARD_2) for (var i = 0; i < this.pCardNodes.length; i++) this.pCardNodes[i].removeAllChildren(); else tabelData.tableHandCards.forEach(function(id, index) {
          if (index < pIndex) {
            var pNode = _this.pCardNodes[index];
            var cardNode = pNode.getChildByName("FPCard");
            if (cardNode) {
              var isPlayAnim = cardNode.getComponent(cc.Animation).getAnimationState("fpAction").isPlaying;
              if (!isPlayAnim) {
                cardNode.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(id);
                cardNode.getChildByName("back").active = false;
              }
            } else {
              cardNode = cc.instantiate(_this.pre_card);
              cardNode.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(id);
              cardNode.getChildByName("back").active = false;
              cardNode.parent = pNode;
            }
          }
        }, this);
      };
      PlayerLayer.prototype.showBTResult = function() {
        var tabelData = dd.gm_manager.getTableData();
        if (tabelData) {
          var prevBtIndex = tabelData.prevBtIndex;
          var prevSeat = dd.gm_manager.getSeatDataByIndex(prevBtIndex);
          if (prevSeat) switch (prevSeat.btResult) {
           case 1:
            dd.mp_manager.playFold();
            this.showDiscardAction(prevSeat);
            break;

           case 2:
            dd.mp_manager.playCheck();
            break;

           case 3:
            dd.mp_manager.playCall();
            break;

           case 4:
            dd.mp_manager.playRaise();
            break;

           case 5:
            dd.mp_manager.playAllin();
          }
        }
      };
      PlayerLayer.prototype.showDiscardAction = function(seatData) {
        var playerNode = this.getNodeBySeatId(seatData.seatIndex);
        if (playerNode) {
          var sPos = playerNode.parent.getPosition().add(playerNode.getPosition());
          var actionNode = new cc.Node();
          actionNode.addComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
          actionNode.setPosition(sPos);
          actionNode.parent = this.node;
          var moveAction = cc.moveTo(.5, cc.p(0, 0));
          var scaleAction = cc.scaleTo(.5, .5);
          var rotateAction = cc.rotateBy(.5, 720);
          var spawnAction = cc.spawn(moveAction, scaleAction, rotateAction);
          var callback = cc.callFunc(function(target) {
            target.destroy();
          }, this);
          actionNode.runAction(cc.sequence(spawnAction, callback));
          dd.mp_manager.playFold();
        }
      };
      PlayerLayer.prototype.showFlyBetAction = function(seatData, cb) {
        void 0 === cb && (cb = null);
        var seats = dd.gm_manager.getTableData().seats;
        var canvasTarget = dd.ui_manager.getCanvasNode().getComponent("GameCanvas");
        var ePos = canvasTarget.pool.parent.getPosition().add(canvasTarget.pool.getPosition());
        var playerNode = this.getNodeBySeatId(seatData.seatIndex);
        if (playerNode) {
          var pos = playerNode.parent.getPosition().add(playerNode.getPosition());
          this.flyBetAction(pos, ePos, "", this.node, cb);
        }
      };
      PlayerLayer.prototype.flyBetAction = function(sPos, ePos, money, parentNode, cb) {
        void 0 === cb && (cb = null);
        var chipNode = cc.instantiate(this.chip_prefab);
        chipNode.getChildByName("lblBet").getComponent(cc.Label).string = money;
        chipNode.setPosition(sPos);
        chipNode.parent = this.node;
        var moveAction = cc.moveTo(cc.pDistance(ePos, sPos) / 2500, ePos);
        var callback = cc.callFunc(function(target) {
          target.destroy();
          cb && cb();
        }, this);
        chipNode.runAction(cc.sequence(moveAction, callback));
      };
      PlayerLayer.prototype.getNodeBySeatId = function(seatIndex) {
        var nodeIndex = seatIndex - dd.gm_manager.startIndex;
        nodeIndex < 0 && (nodeIndex = 9 + nodeIndex);
        var playerNode = this.seatNodes[nodeIndex].getChildByName("Player");
        return playerNode;
      };
      PlayerLayer.prototype.showGameOver = function() {
        var canvasTarget = dd.ui_manager.getCanvasNode().getComponent("GameCanvas");
        var ePos = canvasTarget.pool.parent.getPosition().add(canvasTarget.pool.getPosition());
        var tabelData = dd.gm_manager.getTableData();
        if (tabelData) {
          dd.mp_manager.playOver();
          for (var i = 0; i < tabelData.settlementOnceList.length; i++) {
            var data = tabelData.settlementOnceList[i];
            var playerNode = this.getNodeBySeatId(data.seatIndex);
            if (playerNode) {
              if (Number(data.winMoney) > 0) {
                var pos = playerNode.parent.getPosition().add(playerNode.getPosition());
                this.flyBetAction(ePos, pos, data.winMoney, this.node);
              }
              this.showWinOrLostAction(data.winMoney, playerNode);
            }
          }
        }
      };
      PlayerLayer.prototype.showOthersCard = function() {
        var tabelData = dd.gm_manager.getTableData();
        if (tabelData) {
          var players = [];
          for (var i = 0; i < tabelData.seats.length; i++) {
            var seat = tabelData.seats[i];
            1 === seat.bGamed && 1 !== seat.btResult && players.push(seat);
          }
          if (players.length > 1) for (var i = 0; i < players.length; i++) {
            var seat = players[i];
            if (!dd.gm_manager.isMineSeat(seat)) {
              var playerNode = this.getNodeBySeatId(seat.seatIndex);
              if (playerNode) for (var j = 0; j < seat.handCards.length; j++) {
                var fpNode = cc.instantiate(this.pre_card);
                fpNode.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(seat.handCards[j]);
                fpNode.parent = playerNode.getChildByName("card" + (j + 3));
                fpNode.getComponent(cc.Animation).play();
              }
            }
          }
        }
      };
      PlayerLayer.prototype.showWinOrLost = function() {
        var tabelData = dd.gm_manager.getTableData();
        if (tabelData) for (var i = 0; i < tabelData.settlementOnceList.length; i++) {
          var data = tabelData.settlementOnceList[i];
          var playerNode = this.getNodeBySeatId(data.seatIndex);
          playerNode && this.showWinOrLostAction(data.winMoney, playerNode);
        }
      };
      PlayerLayer.prototype.showWinOrLostAction = function(money, parent) {
        var actionNode = new cc.Node();
        var lbl = actionNode.addComponent(cc.Label);
        lbl.fontSize = 40;
        lbl.string = Number(money) > 0 ? "+" + money : money;
        actionNode.parent = parent;
        actionNode.setPosition(cc.p(0, 0));
        actionNode.color = Number(money) > 0 ? cc.Color.RED : cc.Color.GREEN;
        var move = cc.moveBy(1, cc.p(0, 100));
        var callback = cc.callFunc(function(target) {
          target.destroy();
        }, this);
        actionNode.runAction(cc.sequence(move, callback));
      };
      PlayerLayer.prototype.click_empty = function(event) {
        if (dd.gm_manager.getMineSeat()) return;
        dd.ui_manager.showLoading("正在申请坐下");
        dd.mp_manager.playButton();
        var seatIndex = Number(event.getCurrentTarget().parent.name) + dd.gm_manager.startIndex;
        seatIndex > 8 && (seatIndex -= 9);
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId,
          seatIndex: seatIndex
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_SEAT_DOWN, msg, function(flag, content) {
          if (0 === flag) dd.ui_manager.showTip("入座成功!"); else if (-1 === flag) dd.ui_manager.showTip("坐下消息发送超时"); else {
            dd.gm_manager.btnScript.click_buy();
            dd.ui_manager.hideLoading();
          }
        });
      };
      __decorate([ property(cc.Prefab) ], PlayerLayer.prototype, "pre_player", void 0);
      __decorate([ property([ cc.Node ]) ], PlayerLayer.prototype, "seatNodes", void 0);
      __decorate([ property([ cc.Node ]) ], PlayerLayer.prototype, "pCardNodes", void 0);
      __decorate([ property(cc.Prefab) ], PlayerLayer.prototype, "pre_card", void 0);
      __decorate([ property(cc.Prefab) ], PlayerLayer.prototype, "chip_prefab", void 0);
      PlayerLayer = __decorate([ ccclass ], PlayerLayer);
      return PlayerLayer;
    }(cc.Component);
    exports.default = PlayerLayer;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  PlayerUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7225d3+Uv1LLotYPhHPTmpu", "PlayerUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var PlayerUI = function(_super) {
      __extends(PlayerUI, _super);
      function PlayerUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.headImg = null;
        _this.lab_nick = null;
        _this.lab_gold = null;
        _this.lab_bet = null;
        _this.lab_cardType = null;
        _this.timer = null;
        _this.deal = null;
        _this.straddle = null;
        _this.board = null;
        _this.minCard = null;
        _this.handCards = [];
        _this.btn_straddle = null;
        _this.btn_lookCard = null;
        _this.seatData = null;
        _this.timeCount = -1;
        _this.isCreateCard = false;
        return _this;
      }
      PlayerUI.prototype.onLoad = function() {
        cc.systemEvent.on("updatePlayerUI", this.updatePlayerUI, this);
      };
      PlayerUI.prototype.updatePlayerUI = function() {
        if (!this.seatData) return;
        this.seatData = dd.gm_manager.getSeatDataByAccount(this.seatData.accountId);
        var tableData = dd.gm_manager.getTableData();
        if (this.seatData && tableData) if (-1 !== tableData.showCardSeatIndex && tableData.showCardSeatIndex === this.seatData.seatIndex && tableData.gameState === dd.game_state.STATE_TABLE_OVER_ONCE) {
          this.btn_lookCard.active = true;
          var seq = cc.sequence(cc.scaleTo(.4, .8), cc.scaleTo(.4, .9).easing(cc.easeElasticOut(.4)));
          var action = cc.repeatForever(seq);
          this.btn_lookCard.runAction(action);
        } else {
          this.btn_lookCard.stopAllActions();
          this.btn_lookCard.active = false;
        } else {
          this.btn_lookCard.stopAllActions();
          this.btn_lookCard.active = false;
        }
      };
      PlayerUI.prototype.updateData = function(data, index) {
        this.seatData = data;
        this.setLeftOrRight(this.straddle, 100, index);
        this.setLeftOrRight(this.deal, 100, index);
        this.setLeftOrRight(this.board, 100, index);
        this.setCenter(this.minCard, -50, index);
        this.setCenter(this.lab_bet.node, 55, index);
      };
      PlayerUI.prototype.setLeftOrRight = function(node, len, index) {
        var widget = node.getComponent(cc.Widget);
        if (index > 4) {
          widget.isAlignRight = true;
          widget.isAbsoluteRight = true;
          widget.isAlignLeft = false;
          widget.right = 100;
        } else {
          widget.isAlignLeft = true;
          widget.isAbsoluteLeft = true;
          widget.isAlignRight = false;
          widget.left = len;
        }
      };
      PlayerUI.prototype.setCenter = function(node, len, index) {
        var widget = node.getComponent(cc.Widget);
        widget.isAlignHorizontalCenter = true;
        widget.isAbsoluteHorizontalCenter = true;
        widget.horizontalCenter = index > 4 ? -len : len;
      };
      PlayerUI.prototype.update = function(dt) {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          var tableData, _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!(dd && dd.gm_manager)) return [ 3, 2 ];
              tableData = dd.gm_manager.getTableData();
              if (!(this.seatData && tableData)) return [ 3, 2 ];
              this.deal.active = tableData.bankerIndex === this.seatData.seatIndex;
              if (1 === this.seatData.bGamed) switch (this.seatData.btResult) {
               case 1:
                this.lab_nick.string = "弃  牌";
                break;

               case 2:
                this.lab_nick.string = "过  牌";
                break;

               case 3:
                this.lab_nick.string = "跟  注";
                break;

               case 4:
                this.lab_nick.string = "加  注";
                break;

               case 5:
                this.lab_nick.string = "ALL IN";
                break;

               default:
                0 === this.seatData.btState && this.seatData.seatIndex === tableData.btIndex && tableData.gameState < dd.game_state.STATE_TABLE_OVER_ONCE ? this.lab_nick.string = "思考中..." : this.lab_nick.string = dd.utils.getStringBySize(this.seatData.nick, 12);
              } else this.lab_nick.string = "等待下局";
              tableData.gameState === dd.game_state.STATE_TABLE_BETBLIND && (1 === this.seatData.straddleFlag ? this.lab_nick.string = "straddle" : this.lab_nick.string = dd.utils.getStringBySize(this.seatData.nick, 12));
              this.lab_gold.string = this.seatData.currMoney;
              this.board.active = Number(this.seatData.betMoney) > 0;
              this.board.active && (this.lab_bet.string = this.seatData.betMoney);
              this.straddle.active = 1 === this.seatData.straddleFlag;
              tableData.gameState === dd.game_state.STATE_TABLE_BETBLIND ? this.btn_straddle.active = !(1 !== this.seatData.straddle || !dd.gm_manager.isMineSeat(this.seatData)) : this.btn_straddle.active = false;
              if (1 === this.seatData.btResult || dd.gm_manager.isMineSeat(this.seatData) || tableData.gameState < dd.game_state.STATE_TABLE_OUTCARD_1) {
                this.minCard.active = false;
                tableData.gameState < dd.game_state.STATE_TABLE_OUTCARD_1 && this.handCards.forEach(function(card) {
                  card.childrenCount > 0 && card.destroyAllChildren();
                }, this);
              } else this.minCard.active = true;
              if (0 === this.seatData.btState && tableData.btIndex === this.seatData.seatIndex) if (tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_1 || tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_2 || tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_3 || tableData.gameState === dd.game_state.STATE_TABLE_BET_BT_4) {
                if (-1 === this.timeCount) {
                  this.timeCount = Number(tableData.actTotalTime) - (Number(tableData.actTime) - Number(tableData.svrTime));
                  this.timeCount < 0 && (this.timeCount = 0);
                  this.timeCount > Number(tableData.actTotalTime) && (this.timeCount = Number(tableData.actTotalTime));
                }
                this.timeCount += 1e3 * dt;
                this.timeCount > Number(tableData.actTotalTime) && (this.timeCount = Number(tableData.actTotalTime));
                this.timer.fillRange = -this.timeCount / Number(tableData.actTotalTime);
                -.8 === this.timer.fillRange && dd.mp_manager.playTime();
              } else {
                this.timeCount = -1;
                this.timer.fillRange = 0;
              } else {
                this.timeCount = -1;
                this.timer.fillRange = 0;
              }
              if (dd.gm_manager.isMineSeat(this.seatData)) {
                tableData.gameState > dd.game_state.STATE_TABLE_OUTCARD_1 && 1 !== this.seatData.btResult ? this.lab_cardType.string = dd.gm_manager.getCardType(this.seatData.cardType) : this.lab_cardType.string = "";
                if (tableData.gameState > dd.game_state.STATE_TABLE_OUTCARD_1 && !dd.gm_manager.isCreateMineCard && 1 !== this.seatData.btResult) {
                  dd.gm_manager.isCreateMineCard = true;
                  this.seatData.handCards.forEach(function(id, index) {
                    var card = _this.handCards[index];
                    if (card.childrenCount < 1) {
                      var cardNode = new cc.Node();
                      cardNode.addComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(id);
                      cardNode.parent = card;
                    }
                  }, this);
                }
                if ((tableData.gameState < dd.game_state.STATE_TABLE_OUTCARD_1 || 1 === this.seatData.btResult) && dd.gm_manager.isCreateMineCard) {
                  dd.gm_manager.isCreateMineCard = false;
                  this.handCards.forEach(function(card) {
                    card.childrenCount > 0 && card.destroyAllChildren();
                  }, this);
                }
                if (tableData.gameState !== dd.game_state.STATE_TABLE_OVER_ONCE) {
                  this.btn_lookCard.stopAllActions();
                  this.btn_lookCard.active = false;
                }
              } else {
                this.lab_cardType.string = "";
                this.btn_lookCard.active = false;
              }
              _a = this.headImg;
              return [ 4, dd.img_manager.loadURLImage(this.seatData.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      PlayerUI.prototype.click_btn_lookCard = function() {
        dd.mp_manager.playButton();
        this.btn_lookCard.active = false;
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_SHOW_CARD_BT, msg);
      };
      PlayerUI.prototype.click_btn_straddle = function() {
        dd.mp_manager.playButton();
        this.btn_lookCard.active = false;
        var obj = {
          tableId: dd.gm_manager.getTableData().tableId,
          seatIndex: this.seatData.seatIndex
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.DZPKER_STRADDLE_BT, msg);
      };
      __decorate([ property(cc.Sprite) ], PlayerUI.prototype, "headImg", void 0);
      __decorate([ property(cc.Label) ], PlayerUI.prototype, "lab_nick", void 0);
      __decorate([ property(cc.Label) ], PlayerUI.prototype, "lab_gold", void 0);
      __decorate([ property(cc.Label) ], PlayerUI.prototype, "lab_bet", void 0);
      __decorate([ property(cc.Label) ], PlayerUI.prototype, "lab_cardType", void 0);
      __decorate([ property(cc.Sprite) ], PlayerUI.prototype, "timer", void 0);
      __decorate([ property(cc.Node) ], PlayerUI.prototype, "deal", void 0);
      __decorate([ property(cc.Node) ], PlayerUI.prototype, "straddle", void 0);
      __decorate([ property(cc.Node) ], PlayerUI.prototype, "board", void 0);
      __decorate([ property(cc.Node) ], PlayerUI.prototype, "minCard", void 0);
      __decorate([ property([ cc.Node ]) ], PlayerUI.prototype, "handCards", void 0);
      __decorate([ property(cc.Node) ], PlayerUI.prototype, "btn_straddle", void 0);
      __decorate([ property(cc.Node) ], PlayerUI.prototype, "btn_lookCard", void 0);
      PlayerUI = __decorate([ ccclass ], PlayerUI);
      return PlayerUI;
    }(cc.Component);
    exports.default = PlayerUI;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  Promise: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "926d9KDLOFAa4X03Gc37Kq2", "Promise");
    "use strict";
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    (function(root) {
      var setTimeoutFunc = setTimeout;
      function noop() {}
      function bind(fn, thisArg) {
        return function() {
          fn.apply(thisArg, arguments);
        };
      }
      function Promise(fn) {
        if ("object" !== _typeof(this)) throw new TypeError("Promises must be constructed via new");
        if ("function" !== typeof fn) throw new TypeError("not a function");
        this._state = 0;
        this._handled = false;
        this._value = void 0;
        this._deferreds = [];
        doResolve(fn, this);
      }
      function handle(self, deferred) {
        while (3 === self._state) self = self._value;
        if (0 === self._state) {
          self._deferreds.push(deferred);
          return;
        }
        self._handled = true;
        Promise._immediateFn(function() {
          var cb = 1 === self._state ? deferred.onFulfilled : deferred.onRejected;
          if (null === cb) {
            (1 === self._state ? resolve : reject)(deferred.promise, self._value);
            return;
          }
          var ret;
          try {
            ret = cb(self._value);
          } catch (e) {
            reject(deferred.promise, e);
            return;
          }
          resolve(deferred.promise, ret);
        });
      }
      function resolve(self, newValue) {
        try {
          if (newValue === self) throw new TypeError("A promise cannot be resolved with itself.");
          if (newValue && ("object" === ("undefined" === typeof newValue ? "undefined" : _typeof(newValue)) || "function" === typeof newValue)) {
            var then = newValue.then;
            if (newValue instanceof Promise) {
              self._state = 3;
              self._value = newValue;
              finale(self);
              return;
            }
            if ("function" === typeof then) {
              doResolve(bind(then, newValue), self);
              return;
            }
          }
          self._state = 1;
          self._value = newValue;
          finale(self);
        } catch (e) {
          reject(self, e);
        }
      }
      function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
      }
      function finale(self) {
        2 === self._state && 0 === self._deferreds.length && Promise._immediateFn(function() {
          self._handled || Promise._unhandledRejectionFn(self._value);
        });
        for (var i = 0, len = self._deferreds.length; i < len; i++) handle(self, self._deferreds[i]);
        self._deferreds = null;
      }
      function Handler(onFulfilled, onRejected, promise) {
        this.onFulfilled = "function" === typeof onFulfilled ? onFulfilled : null;
        this.onRejected = "function" === typeof onRejected ? onRejected : null;
        this.promise = promise;
      }
      function doResolve(fn, self) {
        var done = false;
        try {
          fn(function(value) {
            if (done) return;
            done = true;
            resolve(self, value);
          }, function(reason) {
            if (done) return;
            done = true;
            reject(self, reason);
          });
        } catch (ex) {
          if (done) return;
          done = true;
          reject(self, ex);
        }
      }
      Promise.prototype["catch"] = function(onRejected) {
        return this.then(null, onRejected);
      };
      Promise.prototype.then = function(onFulfilled, onRejected) {
        var prom = new this.constructor(noop);
        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
      };
      Promise.all = function(arr) {
        var args = Array.prototype.slice.call(arr);
        return new Promise(function(resolve, reject) {
          if (0 === args.length) return resolve([]);
          var remaining = args.length;
          function res(i, val) {
            try {
              if (val && ("object" === ("undefined" === typeof val ? "undefined" : _typeof(val)) || "function" === typeof val)) {
                var then = val.then;
                if ("function" === typeof then) {
                  then.call(val, function(val) {
                    res(i, val);
                  }, reject);
                  return;
                }
              }
              args[i] = val;
              0 === --remaining && resolve(args);
            } catch (ex) {
              reject(ex);
            }
          }
          for (var i = 0; i < args.length; i++) res(i, args[i]);
        });
      };
      Promise.resolve = function(value) {
        if (value && "object" === ("undefined" === typeof value ? "undefined" : _typeof(value)) && value.constructor === Promise) return value;
        return new Promise(function(resolve) {
          resolve(value);
        });
      };
      Promise.reject = function(value) {
        return new Promise(function(resolve, reject) {
          reject(value);
        });
      };
      Promise.race = function(values) {
        return new Promise(function(resolve, reject) {
          for (var i = 0, len = values.length; i < len; i++) values[i].then(resolve, reject);
        });
      };
      Promise._immediateFn = "function" === typeof setImmediate && function(fn) {
        setImmediate(fn);
      } || function(fn) {
        setTimeoutFunc(fn, 0);
      };
      Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", err);
      };
      Promise._setImmediateFn = function _setImmediateFn(fn) {
        Promise._immediateFn = fn;
      };
      Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
        Promise._unhandledRejectionFn = fn;
      };
      "undefined" !== typeof module && module.exports ? module.exports = Promise : root.Promise || (root.Promise = Promise);
    })(window);
    cc._RF.pop();
  }, {} ],
  Protocol: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "81ed0yKPRRFHILs695byFI8", "Protocol");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Protocol;
    (function(Protocol) {
      Protocol[Protocol["ACCOUNT_HEART"] = 101] = "ACCOUNT_HEART";
      Protocol[Protocol["ACCOUNT_REGISTER"] = 102] = "ACCOUNT_REGISTER";
      Protocol[Protocol["ACCOUNT_LOGIN_PASSWORD"] = 103] = "ACCOUNT_LOGIN_PASSWORD";
      Protocol[Protocol["ACCOUNT_LOGIN_TOURIST"] = 104] = "ACCOUNT_LOGIN_TOURIST";
      Protocol[Protocol["ACCOUNT_LOGIN_WX"] = 105] = "ACCOUNT_LOGIN_WX";
      Protocol[Protocol["ACCOUNT_LOGIN_ACCOUNTID"] = 106] = "ACCOUNT_LOGIN_ACCOUNTID";
      Protocol[Protocol["ACCOUNT_LOGIN_OUT"] = 107] = "ACCOUNT_LOGIN_OUT";
      Protocol[Protocol["ACCOUNT_ROLE_ACCOUNTID"] = 108] = "ACCOUNT_ROLE_ACCOUNTID";
      Protocol[Protocol["ACCOUNT_ROLE_STARNO"] = 109] = "ACCOUNT_ROLE_STARNO";
      Protocol[Protocol["ACCOUNT_PING"] = 110] = "ACCOUNT_PING";
      Protocol[Protocol["ACCOUNT_AUTHENTICATION"] = 111] = "ACCOUNT_AUTHENTICATION";
      Protocol[Protocol["ACCOUNT_PHONE_BIND"] = 112] = "ACCOUNT_PHONE_BIND";
      Protocol[Protocol["ACCOUNT_PHONE_GET_SMSCODE"] = 113] = "ACCOUNT_PHONE_GET_SMSCODE";
      Protocol[Protocol["WALLET_ROOMCARD_GIVE"] = 201] = "WALLET_ROOMCARD_GIVE";
      Protocol[Protocol["WALLET_ROOMCARD_RECORD"] = 202] = "WALLET_ROOMCARD_RECORD";
      Protocol[Protocol["MAIL_GET_MAIL_LIST"] = 301] = "MAIL_GET_MAIL_LIST";
      Protocol[Protocol["MAIL_VIEW_MAIL_ITEM"] = 302] = "MAIL_VIEW_MAIL_ITEM";
      Protocol[Protocol["CHAT_SEND"] = 501] = "CHAT_SEND";
      Protocol[Protocol["ACTIVITY_GET_ACTIVITY_LIST"] = 601] = "ACTIVITY_GET_ACTIVITY_LIST";
      Protocol[Protocol["HOTPROMPT_GET_HOTDATA"] = 701] = "HOTPROMPT_GET_HOTDATA";
      Protocol[Protocol["MALL_GET_MALL_LIST"] = 801] = "MALL_GET_MALL_LIST";
      Protocol[Protocol["MALL_BUY_ITEM"] = 802] = "MALL_BUY_ITEM";
      Protocol[Protocol["MALL_CHARGE_GOLDMONEY"] = 803] = "MALL_CHARGE_GOLDMONEY";
      Protocol[Protocol["MALL_CHARGE_DIAMOND"] = 804] = "MALL_CHARGE_DIAMOND";
      Protocol[Protocol["REPLAY_QUERY_RECORD"] = 1001] = "REPLAY_QUERY_RECORD";
      Protocol[Protocol["REPLAY_QUERY_DETAILED_RECORD"] = 1002] = "REPLAY_QUERY_DETAILED_RECORD";
      Protocol[Protocol["DZPKER_TABLE_GET_CFG"] = 1201] = "DZPKER_TABLE_GET_CFG";
      Protocol[Protocol["DZPKER_TABLE_CREATE"] = 1202] = "DZPKER_TABLE_CREATE";
      Protocol[Protocol["DZPKER_TABLE_START_RUN"] = 1203] = "DZPKER_TABLE_START_RUN";
      Protocol[Protocol["DZPKER_TABLE_JOIN"] = 1204] = "DZPKER_TABLE_JOIN";
      Protocol[Protocol["DZPKER_TABLE_LEAVE"] = 1205] = "DZPKER_TABLE_LEAVE";
      Protocol[Protocol["DZPKER_SEAT_DOWN"] = 1206] = "DZPKER_SEAT_DOWN";
      Protocol[Protocol["DZPKER_SEAT_UP"] = 1207] = "DZPKER_SEAT_UP";
      Protocol[Protocol["DZPKER_BUY_CHIP"] = 1208] = "DZPKER_BUY_CHIP";
      Protocol[Protocol["DZPKER_TABLE_BT"] = 1209] = "DZPKER_TABLE_BT";
      Protocol[Protocol["DZPKER_QUERY_BUYCHIP_LIST"] = 1210] = "DZPKER_QUERY_BUYCHIP_LIST";
      Protocol[Protocol["DZPKER_TRANS_BUYCHIP_ITEM"] = 1211] = "DZPKER_TRANS_BUYCHIP_ITEM";
      Protocol[Protocol["DZPKER_STRADDLE_BT"] = 1212] = "DZPKER_STRADDLE_BT";
      Protocol[Protocol["DZPKER_GET_FIGHTED_TABLE_LIST"] = 1213] = "DZPKER_GET_FIGHTED_TABLE_LIST";
      Protocol[Protocol["DZPKER_TABLE_PREV_FIGHT"] = 1214] = "DZPKER_TABLE_PREV_FIGHT";
      Protocol[Protocol["DZPKER_TABLE_PLAYER_LIST"] = 1215] = "DZPKER_TABLE_PLAYER_LIST";
      Protocol[Protocol["DZPKER_TABLE_PLAYER_ONCE_WINSCORE"] = 1216] = "DZPKER_TABLE_PLAYER_ONCE_WINSCORE";
      Protocol[Protocol["DZPKER_TABLE_BUY_INSURANCE"] = 1217] = "DZPKER_TABLE_BUY_INSURANCE";
      Protocol[Protocol["DZPKER_TABLE_GET_CAREE_INFO"] = 1218] = "DZPKER_TABLE_GET_CAREE_INFO";
      Protocol[Protocol["DZPKER_TABLE_SHOW_CARD_BT"] = 1219] = "DZPKER_TABLE_SHOW_CARD_BT";
      Protocol[Protocol["DZPKER_TABLE_GET_TABLE_INFO"] = 1220] = "DZPKER_TABLE_GET_TABLE_INFO";
      Protocol[Protocol["DZPKER_TABLE_GET_ALL_WIN_SCORE_INFO"] = 1221] = "DZPKER_TABLE_GET_ALL_WIN_SCORE_INFO";
      Protocol[Protocol["ACCOUNT_KICK_OFFLINE_NOTIFY"] = 10001] = "ACCOUNT_KICK_OFFLINE_NOTIFY";
      Protocol[Protocol["WALLET_WALLET_NOTIFY"] = 20001] = "WALLET_WALLET_NOTIFY";
      Protocol[Protocol["MESSAGE_NOTICE_NOTIFY"] = 40001] = "MESSAGE_NOTICE_NOTIFY";
      Protocol[Protocol["CHAT_SEND_NOTIFY"] = 50001] = "CHAT_SEND_NOTIFY";
      Protocol[Protocol["HOTPROMPT_HOTDATA_NOTIFY"] = 70001] = "HOTPROMPT_HOTDATA_NOTIFY";
      Protocol[Protocol["MALL_CHARGE_NOTIFY"] = 80001] = "MALL_CHARGE_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_STATE_NOTIFY"] = 120001] = "DZPKER_TABLE_STATE_NOTIFY";
      Protocol[Protocol["DZPKER_SEAT_STATE_NOTIFY"] = 120002] = "DZPKER_SEAT_STATE_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_BT_NOTIFY"] = 120003] = "DZPKER_TABLE_BT_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_SETTLEMENT_NOTIFY"] = 120004] = "DZPKER_TABLE_SETTLEMENT_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_SETTLEMENT_INSURANCE_NOTIFY"] = 120005] = "DZPKER_TABLE_SETTLEMENT_INSURANCE_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_BUY_CHIP_SUCESS_NOTIFY"] = 120006] = "DZPKER_TABLE_BUY_CHIP_SUCESS_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_SHOW_CARD_NOTIFY"] = 120007] = "DZPKER_TABLE_SHOW_CARD_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_STRADDL_BT_NOTIFY"] = 120008] = "DZPKER_TABLE_STRADDL_BT_NOTIFY";
      Protocol[Protocol["DZPKER_TABLE_SEAT_KICK_NOTIFY"] = 120009] = "DZPKER_TABLE_SEAT_KICK_NOTIFY";
    })(Protocol = exports.Protocol || (exports.Protocol = {}));
    var GameState;
    (function(GameState) {
      GameState[GameState["STATE_TABLE_IDLE"] = 0] = "STATE_TABLE_IDLE";
      GameState[GameState["STATE_TABLE_READY"] = 1] = "STATE_TABLE_READY";
      GameState[GameState["STATE_TABLE_BETBLIND"] = 2] = "STATE_TABLE_BETBLIND";
      GameState[GameState["STATE_TABLE_OUTCARD_1"] = 3] = "STATE_TABLE_OUTCARD_1";
      GameState[GameState["STATE_TABLE_BET_BT_1"] = 4] = "STATE_TABLE_BET_BT_1";
      GameState[GameState["STATE_TABLE_OUTCARD_2"] = 5] = "STATE_TABLE_OUTCARD_2";
      GameState[GameState["STATE_TABLE_BET_BT_2"] = 6] = "STATE_TABLE_BET_BT_2";
      GameState[GameState["STATE_TABLE_OUTCARD_3"] = 7] = "STATE_TABLE_OUTCARD_3";
      GameState[GameState["STATE_TABLE_BET_BT_3"] = 8] = "STATE_TABLE_BET_BT_3";
      GameState[GameState["STATE_TABLE_OUTCARD_4"] = 9] = "STATE_TABLE_OUTCARD_4";
      GameState[GameState["STATE_TABLE_BET_BT_4"] = 10] = "STATE_TABLE_BET_BT_4";
      GameState[GameState["STATE_TABLE_BUY_INSURANCE"] = 11] = "STATE_TABLE_BUY_INSURANCE";
      GameState[GameState["STATE_TABLE_OVER_ONCE"] = 12] = "STATE_TABLE_OVER_ONCE";
      GameState[GameState["STATE_TABLE_OVER_ALL"] = 13] = "STATE_TABLE_OVER_ALL";
      GameState[GameState["STATE_TABLE_NEW_ROUND_BET"] = 14] = "STATE_TABLE_NEW_ROUND_BET";
    })(GameState = exports.GameState || (exports.GameState = {}));
    var CardType;
    (function(CardType) {
      CardType[CardType["TYPE_CARD_NONE"] = 0] = "TYPE_CARD_NONE";
      CardType[CardType["TYPE_CARD_ONE_DOUBLE"] = 1] = "TYPE_CARD_ONE_DOUBLE";
      CardType[CardType["TYPE_CARD_TWO_DOUBLE"] = 2] = "TYPE_CARD_TWO_DOUBLE";
      CardType[CardType["TYPE_CARD_SAME_THREE"] = 3] = "TYPE_CARD_SAME_THREE";
      CardType[CardType["TYPE_CARD_SHUN"] = 4] = "TYPE_CARD_SHUN";
      CardType[CardType["TYPE_CARD_SAME_SUIT"] = 5] = "TYPE_CARD_SAME_SUIT";
      CardType[CardType["TYPE_CARD_GOURD"] = 6] = "TYPE_CARD_GOURD";
      CardType[CardType["TYPE_CARD_SAME_FOUR"] = 7] = "TYPE_CARD_SAME_FOUR";
      CardType[CardType["TYPE_CARD_SAME_SUIT_SHUN"] = 8] = "TYPE_CARD_SAME_SUIT_SHUN";
      CardType[CardType["TYPE_CARD_GOLD_SAME_SUIT_SHUN"] = 9] = "TYPE_CARD_GOLD_SAME_SUIT_SHUN";
    })(CardType = exports.CardType || (exports.CardType = {}));
    var Suit;
    (function(Suit) {
      Suit[Suit["TYPE_SUIT_BACK"] = 0] = "TYPE_SUIT_BACK";
      Suit[Suit["TYPE_SUIT_RED"] = 1] = "TYPE_SUIT_RED";
      Suit[Suit["TYPE_SUIT_CLUB"] = 2] = "TYPE_SUIT_CLUB";
      Suit[Suit["TYPE_SUIT_BLOCK"] = 3] = "TYPE_SUIT_BLOCK";
    })(Suit = exports.Suit || (exports.Suit = {}));
    var HotKey;
    (function(HotKey) {
      HotKey[HotKey["HOT_KEY_MAIL"] = 1] = "HOT_KEY_MAIL";
      HotKey[HotKey["HOT_KEY_ORDER"] = 2] = "HOT_KEY_ORDER";
    })(HotKey = exports.HotKey || (exports.HotKey = {}));
    cc._RF.pop();
  }, {} ],
  Record: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b38fDL9tdFJ7GZeKZ7jRQg", "Record");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Record = function(_super) {
      __extends(Record, _super);
      function Record() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.head = null;
        _this.room = null;
        _this.nick = null;
        _this.gold = null;
        _this.time = null;
        _this._data = null;
        _this._cb = null;
        return _this;
      }
      Record.prototype.onLoad = function() {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
          _this._cb && _this._cb(_this._data);
        }, this);
      };
      Record.prototype.updateItem = function(data, callback) {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              if (!data) return [ 3, 2 ];
              this._data = data;
              this._cb = callback;
              this.nick.string = dd.utils.getStringBySize(data.nick, 12);
              this.time.string = dd.utils.getDateStringByTimestamp(data.recordTime);
              this.gold.string = data.winMoney;
              this.room.string = data.tableName;
              _a = this.head;
              return [ 4, dd.img_manager.loadURLImage(data.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              _b.label = 2;

             case 2:
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Sprite) ], Record.prototype, "head", void 0);
      __decorate([ property(cc.Label) ], Record.prototype, "room", void 0);
      __decorate([ property(cc.Label) ], Record.prototype, "nick", void 0);
      __decorate([ property(cc.Label) ], Record.prototype, "gold", void 0);
      __decorate([ property(cc.Label) ], Record.prototype, "time", void 0);
      Record = __decorate([ ccclass ], Record);
      return Record;
    }(cc.Component);
    exports.default = Record;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  ReviewItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52505E8zDZC2LR6ZZxGnL3n", "ReviewItem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var ReviewItem = function(_super) {
      __extends(ReviewItem, _super);
      function ReviewItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.headImg = null;
        _this.card1 = null;
        _this.card2 = null;
        _this.nick = null;
        _this.gold = null;
        return _this;
      }
      ReviewItem.prototype.init = function(data) {
        return __awaiter(this, void 0, void 0, function() {
          var _a;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.nick.string = dd.utils.getStringBySize(data.nick, 12);
              this.gold.string = data.score;
              if (data.starNO === dd.ud_manager.account_mine.roleAttribVo.starNO) if (data.handCards && data.handCards.length > 0) {
                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[0]);
                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[1]);
              } else {
                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
              } else if (data.handCards && data.handCards.length > 0 && 1 === data.showCardState) {
                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[0]);
                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(data.handCards[1]);
              } else {
                this.card1.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
                this.card2.spriteFrame = dd.img_manager.getPokerSpriteFrameById(0);
              }
              _a = this.headImg;
              return [ 4, dd.img_manager.loadURLImage(data.headImg) ];

             case 1:
              _a.spriteFrame = _b.sent();
              return [ 2 ];
            }
          });
        });
      };
      __decorate([ property(cc.Sprite) ], ReviewItem.prototype, "headImg", void 0);
      __decorate([ property(cc.Sprite) ], ReviewItem.prototype, "card1", void 0);
      __decorate([ property(cc.Sprite) ], ReviewItem.prototype, "card2", void 0);
      __decorate([ property(cc.Label) ], ReviewItem.prototype, "nick", void 0);
      __decorate([ property(cc.Label) ], ReviewItem.prototype, "gold", void 0);
      ReviewItem = __decorate([ ccclass ], ReviewItem);
      return ReviewItem;
    }(cc.Component);
    exports.default = ReviewItem;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  SVScript: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cde51MUppdEZ7yMolSpuLXX", "SVScript");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SVScript = function(_super) {
      __extends(SVScript, _super);
      function SVScript() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.itemPrefab = null;
        _this.spacing = 0;
        _this.updateInterval = .2;
        _this.itemNodes = [];
        _this.datas = null;
        _this.itemSize = cc.size(0, 0);
        _this.callback = null;
        _this.updateTimer = 0;
        _this.lastContentPosY = 0;
        _this.sv = null;
        return _this;
      }
      SVScript.prototype.init = function(dataList, cb) {
        if (!dataList || dataList.length < 1) return;
        if (!this.itemPrefab) return;
        this.sv = this.node.getComponent(cc.ScrollView);
        this.itemNodes.length = 0;
        this.updateInterval < 0 && (this.updateInterval = .2);
        this.datas = dataList;
        this.callback = cb;
        var tempItem = cc.instantiate(this.itemPrefab);
        this.itemSize = tempItem.getContentSize();
        tempItem.destroy();
        this.sv.content.height = this.datas.length * (this.itemSize.height + this.spacing);
        var count = 2 * Math.ceil(this.node.height / (this.itemSize.height + this.spacing));
        for (var i = 0; i < count; i++) {
          if (!(i < this.datas.length)) break;
          var itemNode = cc.instantiate(this.itemPrefab);
          itemNode.tag = i;
          itemNode.setPosition(0, -itemNode.height * (.5 + i) - this.spacing * (i + 1));
          itemNode.getComponent(this.itemPrefab.name).updateItem(this.datas[i], this.callback);
          this.sv.content.addChild(itemNode);
          this.itemNodes.push(itemNode);
        }
      };
      SVScript.prototype.getPositionInView = function(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.sv.content.parent.convertToNodeSpaceAR(worldPos);
        return viewPos;
      };
      SVScript.prototype.update = function(dt) {
        var _this = this;
        if (!this.datas || this.datas.length < 1) return;
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return;
        this.updateTimer = 0;
        var diff = this.sv.content.y - this.lastContentPosY;
        if (0 === diff) return;
        var offset = (this.itemSize.height + this.spacing) * this.itemNodes.length;
        this.itemNodes.forEach(function(item) {
          var viewPos = _this.getPositionInView(item);
          var script = item.getComponent(_this.itemPrefab.name);
          if (diff < 0) {
            if (viewPos.y < -offset / 2 && item.y + offset < 0) {
              item.setPositionY(item.y + offset);
              item.tag = item.tag - _this.itemNodes.length;
              script.updateItem(_this.datas[item.tag], _this.callback);
            }
          } else if (viewPos.y > offset / 2 && item.y - offset > -_this.sv.content.height) {
            item.setPositionY(item.y - offset);
            item.tag = item.tag + _this.itemNodes.length;
            script.updateItem(_this.datas[item.tag], _this.callback);
          }
        }, this);
        this.lastContentPosY = this.sv.content.y;
      };
      __decorate([ property(cc.Prefab) ], SVScript.prototype, "itemPrefab", void 0);
      __decorate([ property(cc.Integer) ], SVScript.prototype, "spacing", void 0);
      __decorate([ property(cc.Integer) ], SVScript.prototype, "updateInterval", void 0);
      SVScript = __decorate([ ccclass ], SVScript);
      return SVScript;
    }(cc.Component);
    exports.default = SVScript;
    cc._RF.pop();
  }, {} ],
  Safe: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46bbbYQKwJJ0ZnNKE/UTkWn", "Safe");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var dd = require("./../../Modules/ModuleManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Safe = function(_super) {
      __extends(Safe, _super);
      function Safe() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lbl_time = null;
        _this.allin_node_list = [];
        _this.pCard_node_list = [];
        _this.allin_color_list = [];
        _this.lbl_choose = null;
        _this.lbl_odds = null;
        _this.lbl_pool = null;
        _this.lbl_tbe = null;
        _this.lbl_bet = null;
        _this.lbl_pfe = null;
        _this.safe_pro = null;
        _this.toggle_choose_all = null;
        _this.fcp_svNode = null;
        _this.lbl_other = null;
        _this.mineNode = null;
        _this.fcp_mineNode = null;
        _this.imgLight = null;
        _this.safe_card_prefab = null;
        _this.safe_allin_prefab = null;
        _this._chooseCard = 0;
        _this._rate = 0;
        _this._timeDown = 0;
        return _this;
      }
      Safe.prototype.onLoad = function() {
        this.updateData();
      };
      Safe.prototype.update = function(dt) {
        if (this._timeDown > 0) {
          this._timeDown -= dt;
          this.lbl_time.string = Math.floor(this._timeDown) + "s";
        } else {
          this.lbl_time.string = "0s";
          this._timeDown = 0;
        }
      };
      Safe.prototype.updateData = function() {
        var _this = this;
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
          this._timeDown = (Number(tableData.actTime) - Number(tableData.svrTime)) / 1e3;
          this.lbl_time.string = this._timeDown + "s";
          var allin_list = tableData.insuranceStateAttrib.insuranceSeatList;
          var safeSeat = null;
          for (var i = 0; i < allin_list.length; i++) {
            this.showAllInSeat(allin_list[i], tableData.insuranceStateAttrib, this.allin_node_list[i]);
            tableData.insuranceStateAttrib.accountId === allin_list[i].accountId && (safeSeat = allin_list[i]);
          }
          var pCards = tableData.insuranceStateAttrib.tableHandCards;
          for (var i = 0; i < this.pCard_node_list.length; i++) if (i < pCards.length) this.showSafeCard(pCards[i], this.pCard_node_list[i]); else {
            i === pCards.length && this.showLight(this.pCard_node_list[i]);
            this.showSafeCard(0, this.pCard_node_list[i]);
          }
          this.fcp_svNode.content.removeAllChildren();
          var winCardList = tableData.insuranceStateAttrib.winCardList;
          var _loop_1 = function(i) {
            this_1.showSafeCard(winCardList[i], this_1.fcp_svNode.content, false, function(cardNode) {
              if (tableData.insuranceStateAttrib.accountId === dd.ud_manager.account_mine.accountId) {
                cardNode.tag = i;
                cardNode.on(cc.Node.EventType.TOUCH_END, _this.touch_fcp_end, _this);
              }
            });
          };
          var this_1 = this;
          for (var i = 0; i < winCardList.length; i++) _loop_1(i);
          if (tableData.insuranceStateAttrib.accountId === dd.ud_manager.account_mine.accountId) {
            this.mineNode.active = true;
            this.fcp_mineNode.active = true;
            this.lbl_other.node.active = false;
          } else {
            this.mineNode.active = false;
            this.fcp_mineNode.active = false;
            if (safeSeat) {
              this.lbl_other.node.active = true;
              this.lbl_other.string = "请稍等,玩家[ <color=#FFC103>" + safeSeat.nick + "</c> ]正在购买保险";
            } else this.lbl_other.node.active = false;
          }
          this.lbl_bet.string = tableData.insuranceStateAttrib.betMoney;
          var pm = Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum);
          this.lbl_pool.string = pm.toString();
          this.lbl_pfe.string = "0";
          this.lbl_tbe.string = "0";
          this.lbl_choose.string = "0";
          this.lbl_odds.string = "0";
          this.toggle_choose_all.isChecked = false;
          this._chooseCard = 0;
          this._rate = 0;
          this.safe_pro.progress = 0;
          this.safe_pro.node.getComponent(cc.Slider).progress = 0;
        }
      };
      Safe.prototype.touch_fcp_end = function(event) {
        var cardNode = event.getCurrentTarget();
        cardNode.getChildByName("choose").active = !cardNode.getChildByName("choose").active;
        cardNode.getChildByName("choose").active ? this._chooseCard++ : this._chooseCard--;
        this.showFCPInfo();
      };
      Safe.prototype.showLight = function(parentNode) {
        var light = new cc.Node();
        var sp = light.addComponent(cc.Sprite);
        sp.spriteFrame = this.imgLight;
        light.parent = parentNode;
      };
      Safe.prototype.showFCPInfo = function() {
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
          this.lbl_choose.string = this._chooseCard + "";
          var rateList = tableData.insuranceStateAttrib.insuranceRateList;
          if (this._chooseCard >= rateList.length) {
            this._rate = Number(rateList[rateList.length - 1].rate);
            this.lbl_odds.string = rateList[rateList.length - 1].rate;
          } else if (this._chooseCard <= 0) {
            this._rate = 0;
            this.lbl_odds.string = "0";
          } else for (var i = 0; i < rateList.length; i++) if (rateList[i].cardNum === this._chooseCard) {
            this.lbl_odds.string = rateList[i].rate;
            this._rate = Number(rateList[i].rate);
            break;
          }
        }
        this.showTBInfo(0);
      };
      Safe.prototype.showAllInSeat = function(seat, safeData, parentNode) {
        var allinNode = cc.instantiate(this.safe_allin_prefab);
        for (var i = 0; i < seat.handCards.length; i++) {
          var card = allinNode.getChildByName("card" + (i + 1));
          this.showSafeCard(seat.handCards[i], card);
        }
        var des = allinNode.getChildByName("des").getComponent(cc.Label);
        if (seat.accountId === safeData.accountId) {
          des.node.color = this.allin_color_list[0];
          des.string = "购买保险";
        } else {
          des.node.color = this.allin_color_list[1];
          des.string = seat.cardNum + "个outs";
        }
        allinNode.getChildByName("name").getComponent(cc.Label).string = dd.utils.getStringBySize(seat.nick, 12);
        allinNode.parent = parentNode;
      };
      Safe.prototype.showSafeCard = function(cardId, parentNode, isShowChoose, initCB) {
        void 0 === isShowChoose && (isShowChoose = false);
        void 0 === initCB && (initCB = null);
        var safe_card = cc.instantiate(this.safe_card_prefab);
        safe_card.getChildByName("img").getComponent(cc.Sprite).spriteFrame = dd.img_manager.getPokerSpriteFrameById(cardId);
        safe_card.getChildByName("choose").active = isShowChoose;
        safe_card.parent = parentNode;
        initCB && initCB(safe_card);
      };
      Safe.prototype.click_toggle_chooseAll = function() {
        var _this = this;
        dd.mp_manager.playButton();
        this.fcp_svNode.content.children.forEach(function(cardNode, index) {
          cardNode.getChildByName("choose").active = _this.toggle_choose_all.isChecked;
        });
        this._chooseCard = this.toggle_choose_all.isChecked ? this.fcp_svNode.content.childrenCount : 0;
        this.showFCPInfo();
      };
      Safe.prototype.click_pro_bar = function() {
        var pro = this.safe_pro.node.getComponent(cc.Slider).progress;
        this.showTBInfo(pro);
      };
      Safe.prototype.showTBInfo = function(pro) {
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
          if (0 !== this._rate) {
            var maxSafe = (Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum)) / this._rate;
            var curSafe = maxSafe * pro;
            curSafe <= 0 && (curSafe = 1);
            var tbe = Math.ceil(Math.ceil(curSafe) / tableData.smallBlind) * tableData.smallBlind;
            this.lbl_tbe.string = tbe.toString();
            var pfe = Math.floor(Math.floor(tbe * this._rate) / tableData.smallBlind) * tableData.smallBlind;
            pfe > Number(tableData.insuranceStateAttrib.poolMoney) && (pfe = Number(tableData.insuranceStateAttrib.poolMoney));
            this.lbl_pfe.string = pfe.toString();
          } else {
            this.lbl_pfe.string = "0";
            this.lbl_tbe.string = "0";
          }
          this.safe_pro.progress = pro;
          this.safe_pro.node.getComponent(cc.Slider).progress = pro;
        }
      };
      Safe.prototype.click_btn_buy = function() {
        dd.mp_manager.playButton();
        if (0 !== this._rate) {
          this.sendBuySafe(1);
          this.node.removeFromParent();
          this.node.destroy();
        } else dd.ui_manager.showTip("请先选择反超牌", 200, .3, .5, .2);
      };
      Safe.prototype.click_btn_nobuy = function() {
        dd.mp_manager.playButton();
        this.sendBuySafe(0);
        this.node.removeFromParent();
        this.node.destroy();
      };
      Safe.prototype.sendBuySafe = function(bt) {
        var tableData = dd.gm_manager.getTableData();
        if (tableData && tableData.insuranceStateAttrib) {
          var winCardList_1 = tableData.insuranceStateAttrib.winCardList;
          var buyCards_1 = [];
          this.fcp_svNode.content.children.forEach(function(cardNode, index) {
            var cardId = winCardList_1[cardNode.tag];
            cardNode.getChildByName("choose").active && buyCards_1.push(cardId);
          });
          var obj = {
            tableId: tableData.tableId,
            bt: bt,
            buyCards: buyCards_1,
            buyMoney: Number(this.lbl_tbe.string),
            payMoney: Number(this.lbl_pfe.string)
          };
          var msg = JSON.stringify(obj);
          dd.ws_manager.sendMsg(dd.protocol.DZPKER_TABLE_BUY_INSURANCE, msg, function(flag, content) {
            0 !== flag && dd.ui_manager.showTip(content);
          });
        }
      };
      Safe.prototype.click_btn_baoben = function() {
        dd.mp_manager.playButton();
        if (0 !== this._rate) {
          var tableData = dd.gm_manager.getTableData();
          if (tableData && tableData.insuranceStateAttrib) {
            var maxSafe = (Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum)) / this._rate;
            var tbe = Math.ceil(Number(tableData.insuranceStateAttrib.betMoney) / this._rate);
            if (tbe > maxSafe) {
              dd.ui_manager.showTip("可投保额不足以保本");
              return;
            }
            tbe = Math.ceil(tbe / tableData.smallBlind) * tableData.smallBlind;
            this.lbl_tbe.string = tbe.toString();
            var pfe = Math.floor(Math.floor(tbe * this._rate) / tableData.smallBlind) * tableData.smallBlind;
            pfe > Number(tableData.insuranceStateAttrib.poolMoney) && (pfe = Number(tableData.insuranceStateAttrib.poolMoney));
            this.lbl_pfe.string = pfe.toString();
            var pro = tbe / (maxSafe - 1);
            this.safe_pro.progress = pro;
            this.safe_pro.node.getComponent(cc.Slider).progress = pro;
          }
        } else {
          this.lbl_pfe.string = "0";
          this.lbl_tbe.string = "0";
          this.safe_pro.progress = 0;
          this.safe_pro.node.getComponent(cc.Slider).progress = 0;
          dd.ui_manager.showTip("请先选择反超牌", 200, .3, .5, .2);
        }
      };
      Safe.prototype.click_btn_dengli = function() {
        dd.mp_manager.playButton();
        if (0 !== this._rate) {
          var tableData = dd.gm_manager.getTableData();
          if (tableData && tableData.insuranceStateAttrib) {
            var dm = Number(tableData.insuranceStateAttrib.poolMoney) - Number(tableData.insuranceStateAttrib.buyedNum);
            var maxSafe = dm / this._rate;
            var tbe = Math.ceil(Math.ceil(maxSafe) / tableData.smallBlind) * tableData.smallBlind;
            this.lbl_tbe.string = tbe.toString();
            var pfe = Math.floor(Math.floor(tbe * this._rate) / tableData.smallBlind) * tableData.smallBlind;
            pfe > Number(tableData.insuranceStateAttrib.poolMoney) && (pfe = Number(tableData.insuranceStateAttrib.poolMoney));
            this.lbl_pfe.string = pfe.toString();
            this.safe_pro.progress = 1;
            this.safe_pro.node.getComponent(cc.Slider).progress = 1;
          }
        } else {
          this.lbl_pfe.string = "0";
          this.lbl_tbe.string = "0";
          this.safe_pro.progress = 0;
          this.safe_pro.node.getComponent(cc.Slider).progress = 0;
          dd.ui_manager.showTip("请先选择反超牌", 200, .3, .5, .2);
        }
      };
      Safe.prototype.click_btn_out = function() {
        dd.mp_manager.playButton();
        this.node.removeFromParent();
        this.node.destroy();
      };
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_time", void 0);
      __decorate([ property([ cc.Node ]) ], Safe.prototype, "allin_node_list", void 0);
      __decorate([ property([ cc.Node ]) ], Safe.prototype, "pCard_node_list", void 0);
      __decorate([ property([ cc.Color ]) ], Safe.prototype, "allin_color_list", void 0);
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_choose", void 0);
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_odds", void 0);
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_pool", void 0);
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_tbe", void 0);
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_bet", void 0);
      __decorate([ property(cc.Label) ], Safe.prototype, "lbl_pfe", void 0);
      __decorate([ property(cc.ProgressBar) ], Safe.prototype, "safe_pro", void 0);
      __decorate([ property(cc.Toggle) ], Safe.prototype, "toggle_choose_all", void 0);
      __decorate([ property(cc.ScrollView) ], Safe.prototype, "fcp_svNode", void 0);
      __decorate([ property(cc.RichText) ], Safe.prototype, "lbl_other", void 0);
      __decorate([ property(cc.Node) ], Safe.prototype, "mineNode", void 0);
      __decorate([ property(cc.Node) ], Safe.prototype, "fcp_mineNode", void 0);
      __decorate([ property(cc.SpriteFrame) ], Safe.prototype, "imgLight", void 0);
      __decorate([ property(cc.Prefab) ], Safe.prototype, "safe_card_prefab", void 0);
      __decorate([ property(cc.Prefab) ], Safe.prototype, "safe_allin_prefab", void 0);
      Safe = __decorate([ ccclass ], Safe);
      return Safe;
    }(cc.Component);
    exports.default = Safe;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  Setting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "480e9n9QFpCYbV1K6aSg7Jo", "Setting");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var dd = require("./../../Modules/ModuleManager");
    var Setting = function(_super) {
      __extends(Setting, _super);
      function Setting() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.toggle = null;
        _this.lab_ver = null;
        _this.isInit = false;
        return _this;
      }
      Setting.prototype.onLoad = function() {
        dd.mp_manager.sw ? this.toggle.check() : this.toggle.uncheck();
        this.lab_ver.string = dd.config.version;
        dd.ui_manager.hideLoading();
        this.isInit = true;
      };
      Setting.prototype.click_toggle = function() {
        this.isInit && dd.mp_manager.playButton();
        dd.mp_manager.sw = this.toggle.isChecked;
        cc.sys.localStorage.setItem("sw", JSON.stringify({
          sw: this.toggle.isChecked
        }));
      };
      Setting.prototype.click_back = function() {
        dd.mp_manager.playButton();
        this.node.destroy();
      };
      Setting.prototype.click_out = function() {
        dd.ui_manager.showLoading("正在注销,请稍后");
        dd.mp_manager.playButton();
        var obj = {
          accountId: dd.ud_manager.account_mine.accountId
        };
        var msg = JSON.stringify(obj);
        dd.ws_manager.sendMsg(dd.protocol.ACCOUNT_LOGIN_OUT, msg, function(flag, content) {
          0 === flag ? dd.ws_manager.disconnect(function() {
            var db = cc.sys.localStorage;
            db.getItem("TokenInfo") && db.removeItem("TokenInfo");
            dd.destroy();
            cc.sys.garbageCollect();
            cc.game.restart();
          }) : -1 === flag ? dd.ui_manager.showTip("注销消息发送超时") : dd.ui_manager.showTip(content);
        });
      };
      __decorate([ property(cc.Toggle) ], Setting.prototype, "toggle", void 0);
      __decorate([ property(cc.Label) ], Setting.prototype, "lab_ver", void 0);
      Setting = __decorate([ ccclass ], Setting);
      return Setting;
    }(cc.Component);
    exports.default = Setting;
    cc._RF.pop();
  }, {
    "./../../Modules/ModuleManager": "ModuleManager"
  } ],
  UDManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e67a8tTvhMOoVdd3cezWTV", "UDManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UDManager = function() {
      function UDManager() {
        this.account_mine = null;
      }
      UDManager.getInstance = function() {
        null === UDManager._instance && (UDManager._instance = new UDManager());
        return UDManager._instance;
      };
      UDManager.prototype.destroySelf = function() {
        this.account_mine = null;
        UDManager._instance = null;
      };
      UDManager._instance = null;
      return UDManager;
    }();
    exports.default = UDManager;
    cc._RF.pop();
  }, {} ],
  UIManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbba0kC7dhEUobrKq4JhRCi", "UIManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIManager = function() {
      function UIManager() {
        var _this = this;
        this.isLoadingScence = false;
        this.loadingNode = null;
        this.tipNode = null;
        this.alertNode = null;
        this.cb_yes = null;
        this.cb_no = null;
        this.cb_before_scene_loading = function(event) {
          _this.isLoadingScence = true;
          _this.hideLoading();
        };
        this.cb_after_scene_loading = function(event) {
          _this.isLoadingScence = false;
        };
        this.cb_befor_update = function(event) {};
        this.cb_app_hide = function(event) {
          cc.game.isPaused() || cc.game.pause();
        };
        this.cb_app_show = function(event) {
          cc.game.isPaused() && cc.game.resume();
        };
      }
      UIManager.getInstance = function() {
        null === UIManager._instance && (UIManager._instance = new UIManager());
        return UIManager._instance;
      };
      UIManager.prototype.initUI = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _a, _b, _c;
          return __generator(this, function(_d) {
            switch (_d.label) {
             case 0:
              cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading, this);
              cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.cb_after_scene_loading, this);
              cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update, this);
              cc.game.on(cc.game.EVENT_HIDE, this.cb_app_hide, this);
              cc.game.on(cc.game.EVENT_SHOW, this.cb_app_show, this);
              _a = this;
              return [ 4, this.loadPrefabToNode("Loading") ];

             case 1:
              _a.loadingNode = _d.sent();
              _b = this;
              return [ 4, this.loadPrefabToNode("Tip") ];

             case 2:
              _b.tipNode = _d.sent();
              _c = this;
              return [ 4, this.loadPrefabToNode("Alert") ];

             case 3:
              _c.alertNode = _d.sent();
              return [ 2 ];
            }
          });
        });
      };
      UIManager.prototype.loadPrefabToNode = function(name) {
        var path = "Prefab/" + name;
        return new Promise(function(resolve, reject) {
          cc.loader.loadRes(path, cc.Prefab, function(err, prefab) {
            if (err) reject(err.message); else {
              var node = cc.instantiate(prefab);
              cc.loader.release(prefab);
              resolve(node);
            }
          });
        });
      };
      UIManager.prototype.showLoading = function(msg) {
        void 0 === msg && (msg = "正在加载,请稍后");
        if (this.isLoadingScence) return false;
        if (this.loadingNode && this.loadingNode.isValid) {
          this.loadingNode.parent = this.getCanvasNode();
          this.loadingNode.setLocalZOrder(this.loadingNode.parent.childrenCount - 1);
          this.loadingNode.getComponent(cc.Animation).setCurrentTime(0);
          cc.find("layout/lbl_msg", this.loadingNode).getComponent(cc.Label).string = msg;
        } else cc.error("loadingNode不存在");
        return true;
      };
      UIManager.prototype.hideLoading = function() {
        this.loadingNode && this.loadingNode.parent && this.loadingNode.removeFromParent();
      };
      UIManager.prototype.showTip = function(msg, distance, time1, time2, time3) {
        void 0 === distance && (distance = 400);
        void 0 === time1 && (time1 = .5);
        void 0 === time2 && (time2 = 1);
        void 0 === time3 && (time3 = .5);
        this.hideLoading();
        if (this.tipNode) {
          var tip_1 = cc.instantiate(this.tipNode);
          tip_1.parent = this.getCanvasNode();
          tip_1.setLocalZOrder(tip_1.parent.childrenCount - 1);
          cc.find("layout/lbl_msg", tip_1).getComponent(cc.Label).string = msg;
          var layout = cc.find("layout", tip_1);
          layout.setPosition(0, .5 * -distance);
          var action1 = cc.spawn(cc.moveTo(time1, cc.p(0, 0)), cc.fadeIn(time1));
          var action3 = cc.spawn(cc.moveTo(time3, cc.p(0, distance)), cc.fadeOut(time3));
          var endAction = cc.callFunc(function() {
            tip_1.removeFromParent();
            tip_1.destroy();
          }, this);
          layout.runAction(cc.sequence(action1, cc.delayTime(1), action3, endAction));
        } else cc.error("tipNode不存在");
      };
      UIManager.prototype.showAlert = function(type, msg, yes, no) {
        this.hideLoading();
        this.hideAlert();
        if (this.alertNode) {
          if (1 === type) {
            cc.find("box/wxts", this.alertNode).active = true;
            cc.find("box/cwts", this.alertNode).active = false;
          } else {
            cc.find("box/wxts", this.alertNode).active = false;
            cc.find("box/cwts", this.alertNode).active = true;
          }
          cc.find("box/board_msg/rt_msg", this.alertNode).getComponent(cc.RichText).string = msg;
          var btn_yes = cc.find("box/layout/btn_yes", this.alertNode);
          btn_yes.active = true;
          btn_yes.on(cc.Node.EventType.TOUCH_END, this.cb_click, this);
          yes && (this.cb_yes = yes);
          var btn_no = cc.find("box/layout/btn_no", this.alertNode);
          if (no) {
            this.cb_no = no;
            btn_no.active = true;
            btn_no.on(cc.Node.EventType.TOUCH_END, this.cb_click, this);
          } else btn_no.active = false;
          this.alertNode.parent = this.getCanvasNode();
          this.alertNode.setLocalZOrder(this.alertNode.parent.childrenCount - 1);
        } else cc.error("alertNode不存在");
      };
      UIManager.prototype.cb_click = function(event) {
        var btn_yes = cc.find("box/layout/btn_yes", this.alertNode);
        var btn_no = cc.find("box/layout/btn_no", this.alertNode);
        btn_yes === event.currentTarget && this.cb_yes && this.cb_yes();
        btn_no === event.currentTarget && this.cb_no && this.cb_no();
        this.hideAlert();
      };
      UIManager.prototype.hideAlert = function() {
        this.alertNode && this.alertNode.parent && this.alertNode.removeFromParent();
        cc.find("box/wxts", this.alertNode).active = false;
        cc.find("box/cwts", this.alertNode).active = false;
        cc.find("box/board_msg/rt_msg", this.alertNode).getComponent(cc.RichText).string = "";
        var btn_yes = cc.find("box/layout/btn_yes", this.alertNode);
        btn_yes.off(cc.Node.EventType.TOUCH_END, this.cb_click, this);
        this.cb_yes = null;
        btn_yes.active = false;
        var btn_no = cc.find("box/layout/btn_no", this.alertNode);
        btn_no.off(cc.Node.EventType.TOUCH_END, this.cb_click, this);
        btn_no.active = false;
        this.cb_no = null;
      };
      UIManager.prototype.getCanvasNode = function() {
        return cc.director.getScene().getChildByName("Canvas");
      };
      UIManager.prototype.getRootNode = function() {
        return cc.find("RootNode", this.getCanvasNode());
      };
      UIManager.prototype.destroySelf = function() {
        cc.director.off(cc.Director.EVENT_BEFORE_SCENE_LOADING, this.cb_before_scene_loading, this);
        cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, this.cb_befor_update, this);
        cc.game.off(cc.game.EVENT_HIDE, this.cb_app_hide, this);
        cc.game.off(cc.game.EVENT_SHOW, this.cb_app_show, this);
        if (this.loadingNode) {
          this.hideLoading();
          this.loadingNode.destroy();
          this.loadingNode = null;
        }
        if (this.tipNode) {
          this.tipNode.destroy();
          this.tipNode = null;
        }
        if (this.alertNode) {
          this.hideAlert();
          this.alertNode.destroy();
          this.alertNode = null;
        }
        UIManager._instance = null;
      };
      UIManager._instance = null;
      return UIManager;
    }();
    exports.default = UIManager;
    cc._RF.pop();
  }, {} ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4819cix6s1DCpLtqwUYzk74", "Utils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function createUUID(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
      var uuid = [], i;
      radix = radix || chars.length;
      if (len) for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]; else {
        var r = void 0;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        for (i = 0; i < 36; i++) if (!uuid[i]) {
          r = 0 | 16 * Math.random();
          uuid[i] = chars[19 == i ? 3 & r | 8 : r];
        }
      }
      return uuid.join("");
    }
    exports.createUUID = createUUID;
    function getHeadImgUrl(url) {
      if ("" === url || "/0" === url) return "";
      var arrayList = url.split("/");
      arrayList.pop();
      return arrayList.join("/") + "/96";
    }
    exports.getHeadImgUrl = getHeadImgUrl;
    function captureScreen(node, saveName, callback) {
      if (cc.sys.isNative && cc.sys.isMobile) {
        var renderTexture_1 = cc.RenderTexture.create(node.width, node.height, cc.Texture2D.PixelFormat.RGBA8888, gl.DEPTH24_STENCIL8_OES);
        node.parent._sgNode.addChild(renderTexture_1);
        renderTexture_1.setVisible(false);
        renderTexture_1.begin();
        node._sgNode.visit();
        renderTexture_1.end();
        renderTexture_1.saveToFile(saveName, cc.ImageFormat.PNG, true, function(rt, path) {
          renderTexture_1.removeFromParent();
          var interval = 0;
          var timeId = setInterval(function() {
            if (interval > 1e4) {
              interval = null;
              clearInterval(timeId);
              callback();
            }
            if (jsb.fileUtils.isFileExist(path)) {
              interval = null;
              clearInterval(timeId);
              callback(path);
            }
            interval += 100;
          }, 100);
        });
      } else callback();
    }
    exports.captureScreen = captureScreen;
    function getThousandString(num) {
      isNaN(num) && (num = 0);
      var numString = num.toString();
      var result = "";
      while (numString.length > 3) {
        result = "," + numString.slice(-3) + result;
        numString = numString.slice(0, numString.length - 3);
      }
      numString && (result = numString + result);
      return result;
    }
    exports.getThousandString = getThousandString;
    function getBackNumString(str) {
      var list = str.split(",");
      str = "";
      for (var i = 0; i < list.length; i++) str += list[i];
      return str;
    }
    exports.getBackNumString = getBackNumString;
    function getPointNumString(str) {
      var list = str.split(".");
      var numList = [];
      for (var i = 0; i < list.length; i++) numList.push(Number(list[i]));
      return numList;
    }
    exports.getPointNumString = getPointNumString;
    function getNumberList(num) {
      var numList = num.toString().split("").map(function(i) {
        return Number(i);
      });
      return numList;
    }
    exports.getNumberList = getNumberList;
    function getDateStringByTimestamp(timestamp, type) {
      void 0 === type && (type = 0);
      var num = Number(timestamp);
      if (isNaN(num)) return "";
      var timeDate = new Date();
      timeDate.setTime(num);
      var timeDateString = this.getDateStringByDate(timeDate);
      var timeString = this.getTimeStringByDate(timeDate);
      return 1 === type ? timeDateString : 2 === type ? timeString : timeDateString + " " + timeString;
    }
    exports.getDateStringByTimestamp = getDateStringByTimestamp;
    function getDateStringByDate(nowDate, connector) {
      if (nowDate instanceof Date) {
        connector || (connector = "-");
        var year = nowDate.getFullYear() + "";
        var month = nowDate.getMonth() + 1;
        var monthStr = month + "";
        month < 10 && (monthStr = "0" + month);
        var day = nowDate.getDate();
        var dayStr = day + "";
        day < 10 && (dayStr = "0" + day);
        return year + connector + monthStr + connector + dayStr;
      }
      return "";
    }
    exports.getDateStringByDate = getDateStringByDate;
    function getTimeStringByDate(nowDate, connector) {
      if (nowDate instanceof Date) {
        connector || (connector = ":");
        var hour = nowDate.getHours();
        var hourStr = hour + "";
        hour < 10 && (hourStr = "0" + hour);
        var minute = nowDate.getMinutes();
        var minuteStr = minute + "";
        minute < 10 && (minuteStr = "0" + minute);
        return hourStr + connector + minuteStr;
      }
      return "";
    }
    exports.getTimeStringByDate = getTimeStringByDate;
    function getCountDownString(time) {
      if (time < 0) return "00:00:00";
      var s = Math.floor(time / 1e3);
      var hour = Math.floor(s / 3600);
      var minute = Math.floor((s - 3600 * hour) / 60);
      var second = s - 3600 * hour - 60 * minute;
      var str = "";
      str += hour > 9 ? hour + ":" : "0" + hour + ":";
      str += minute > 9 ? minute + ":" : "0" + minute + ":";
      str += second > 9 ? second : "0" + second;
      return str;
    }
    exports.getCountDownString = getCountDownString;
    function getStringBySize(str, size) {
      if (str.length > size) {
        var len = 0;
        var vaule = "";
        for (var i = 0; i < str.length; i++) {
          str.charCodeAt(i) > 255 ? len += 2 : len += 1;
          if (len > size) break;
          vaule += str.charAt(i);
        }
        return vaule;
      }
      return str;
    }
    exports.getStringBySize = getStringBySize;
    function getClosestNumber(maxLen, sections, point) {
      if (point < 0) return 0;
      if (point > maxLen) return maxLen;
      if (sections < 2) return maxLen;
      var secLen = maxLen / sections;
      var residue = point % secLen;
      var count = Math.floor(point / secLen);
      return residue < secLen / 2 ? count * secLen : (count + 1) * secLen;
    }
    exports.getClosestNumber = getClosestNumber;
    function getClosestIndex(maxLen, sections, point) {
      if (point < 0) return 0;
      if (point > maxLen) return sections;
      if (sections < 2) return maxLen;
      var secLen = maxLen / sections;
      var residue = point % secLen;
      var count = Math.floor(point / secLen);
      return residue < secLen / 2 ? count : count + 1;
    }
    exports.getClosestIndex = getClosestIndex;
    cc._RF.pop();
  }, {} ],
  WSManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3d0evZO25D1YO8UoL0aEhT", "WSManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Protocol_1 = require("./Protocol");
    var ENCManager_1 = require("./ENCManager");
    var GMManager_1 = require("./GMManager");
    var UIManager_1 = require("./UIManager");
    var UDManager_1 = require("./UDManager");
    var MPManager_1 = require("./MPManager");
    var WSManager = function() {
      function WSManager() {
        this.heartbeatInterval = 5e3;
        this.intervalTime = 0;
        this.timeoutTime = 1e4;
        this.timeoutMax = 3e4;
        this.heartbeatStart = 0;
        this.heartbeatEnd = 0;
        this.timeID = null;
        this.url = null;
        this.ws = null;
        this.readyState = null;
        this.delayTime = 0;
        this.sendDataArray = [];
        this.cb_close = null;
        this.isLogin = false;
      }
      WSManager.getInstance = function() {
        null === WSManager._instance && (WSManager._instance = new WSManager());
        return WSManager._instance;
      };
      WSManager.prototype.setLoginState = function(state) {
        this.isLogin = state;
      };
      WSManager.prototype.connect = function(url) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          if (_this.ws || url.length < 1 || _this.readyState) {
            _this.destroySelf();
            reject("连接服务器失败,参数错误");
          }
          _this.readyState = WebSocket.CONNECTING;
          _this.ws = new WebSocket(url);
          _this.ws.binaryType = "arraybuffer";
          _this.ws.onopen = function(ev) {
            _this.readyState = WebSocket.OPEN;
            _this.url = url;
            _this.checkTimeOut();
            resolve();
          };
          _this.ws.onclose = function(ev) {
            switch (_this.readyState) {
             case WebSocket.CONNECTING:
              reject("连接服务器失败,请检查网络状态");
              break;

             case WebSocket.OPEN:
              cc.log("意外断开连接");
              cc.systemEvent.emit("cb_diconnect");
              break;

             case WebSocket.CLOSING:
              cc.log("客户端主动断开连接");
              _this.cb_close && _this.cb_close();
              break;

             case WebSocket.CLOSED:
              cc.log("心跳超时");
              cc.systemEvent.emit("cb_diconnect");
              break;

             default:
              cc.log("onclose：未知状态！");
              cc.systemEvent.emit("cb_diconnect");
            }
            _this.destroySelf();
          };
          _this.ws.onmessage = function(ev) {
            var msgId = _this.getMessageId(ev.data, 12);
            var msgBody = _this.getMessageBody(ev.data, 32);
            var s_data = JSON.parse(msgBody);
            if (msgId > 1e4) 0 === s_data.code ? _this.doPush(msgId, s_data.content) : cc.log("推送了错误消息过来"); else {
              var sendData = _this.getSendData(msgId);
              if (sendData) {
                _this.delayTime = Date.now() - sendData.sendTime;
                sendData.callback(s_data.code, s_data.content);
                cc.js.array.remove(_this.sendDataArray, sendData);
              } else msgId !== Protocol_1.Protocol.ACCOUNT_PING && cc.log("onmessage:协议号" + msgId + "超时或未知");
            }
          };
        });
      };
      WSManager.prototype.checkTimeOut = function() {
        var _this = this;
        var dateTime = Date.now();
        this.heartbeatStart = dateTime;
        this.heartbeatEnd = dateTime;
        this.intervalTime = 0;
        this.sendDataArray.length = 0;
        this.timeID = setInterval(function() {
          if (_this.readyState !== WebSocket.OPEN) return;
          _this.checkHeartbeat();
          var tempRemove = [];
          _this.sendDataArray.forEach(function(item) {
            if (Date.now() - item.sendTime >= _this.timeoutTime) {
              item.callback(-1);
              tempRemove.push(item);
            }
          });
          cc.js.array.removeArray(_this.sendDataArray, tempRemove);
        }, 1e3);
      };
      WSManager.prototype.stopCheck = function() {
        if (this.timeID) {
          clearInterval(this.timeID);
          this.timeID = null;
        }
      };
      WSManager.prototype.checkHeartbeat = function() {
        var _this = this;
        if (0 === this.intervalTime) {
          this.heartbeatStart = Date.now();
          this.sendMsg(Protocol_1.Protocol.ACCOUNT_HEART, "", function(flag, content) {
            if (0 === flag) {
              _this.heartbeatEnd = Date.now();
              _this.delayTime = _this.heartbeatEnd - _this.heartbeatStart;
              if (_this.isLogin) {
                var obj = {
                  ping: _this.delayTime
                };
                _this.sendMsg(Protocol_1.Protocol.ACCOUNT_PING, JSON.stringify(obj), null);
              }
            } else cc.log("心跳返回错误了！");
          });
        }
        this.intervalTime += 1e3;
        this.intervalTime >= this.heartbeatInterval && (this.intervalTime = 0);
        if (this.delayTime >= this.timeoutMax) {
          this.readyState = WebSocket.CLOSED;
          this.ws.close();
        }
      };
      WSManager.prototype.doPush = function(msgId, content) {
        switch (msgId) {
         case Protocol_1.Protocol.ACCOUNT_KICK_OFFLINE_NOTIFY:
          break;

         case Protocol_1.Protocol.WALLET_WALLET_NOTIFY:
          UDManager_1.default.getInstance().account_mine.walletVo = content;
          break;

         case Protocol_1.Protocol.MESSAGE_NOTICE_NOTIFY:
          break;

         case Protocol_1.Protocol.CHAT_SEND_NOTIFY:
          cc.systemEvent.emit("chatPush", content);
          break;

         case Protocol_1.Protocol.HOTPROMPT_HOTDATA_NOTIFY:
          var hots = content;
          hots.forEach(function(hot) {
            if (hot.hotKey === Protocol_1.HotKey.HOT_KEY_ORDER) {
              GMManager_1.default.getInstance().orderCount > -1 && GMManager_1.default.getInstance().orderCount < hot.hotVal && MPManager_1.default.getInstance().playMsg();
              GMManager_1.default.getInstance().orderCount = hot.hotVal;
            }
          }, this);
          break;

         case Protocol_1.Protocol.MALL_CHARGE_NOTIFY:
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_STATE_NOTIFY:
          GMManager_1.default.getInstance().setTableData(content, 1);
          break;

         case Protocol_1.Protocol.DZPKER_SEAT_STATE_NOTIFY:
          GMManager_1.default.getInstance().setTableData(content, 2);
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_BT_NOTIFY:
          GMManager_1.default.getInstance().setTableData(content, 3);
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_SETTLEMENT_NOTIFY:
          cc.director.loadScene("GameResult", function() {
            UIManager_1.default.getInstance().getCanvasNode().getComponent("GameResult").updateData(content);
          });
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_SETTLEMENT_INSURANCE_NOTIFY:
          0 === content.result ? UIManager_1.default.getInstance().showTip("未买中保险！本次保险不做赔偿") : UIManager_1.default.getInstance().showTip("买中保险！需要赔付" + content.payMoney + "积分");
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_BUY_CHIP_SUCESS_NOTIFY:
          UIManager_1.default.getInstance().showTip(content);
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_SHOW_CARD_NOTIFY:
          cc.systemEvent.emit("lookCard");
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_STRADDL_BT_NOTIFY:
          MPManager_1.default.getInstance().playStraddle();
          GMManager_1.default.getInstance().setTableData(content, 2);
          break;

         case Protocol_1.Protocol.DZPKER_TABLE_SEAT_KICK_NOTIFY:
          UIManager_1.default.getInstance().showTip(content);
          GMManager_1.default.getInstance().btnScript && GMManager_1.default.getInstance().btnScript.click_buy();
        }
      };
      WSManager.prototype.getSendData = function(msgId) {
        for (var i = 0, len = this.sendDataArray.length; i < len; i++) {
          var item = this.sendDataArray[i];
          if (item.msgId === msgId) return item;
        }
        return null;
      };
      WSManager.prototype.disconnect = function(callback) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN && this.readyState === WebSocket.OPEN) {
          this.readyState = WebSocket.CLOSING;
          this.cb_close = callback;
          this.ws.close();
        }
      };
      WSManager.prototype.sendMsg = function(msgId, msgBody, callback) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          if (callback) {
            var sendData = this.getSendData(msgId);
            sendData && cc.js.array.remove(this.sendDataArray, sendData);
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
      WSManager.prototype.getMessageId = function(buf, offset) {
        var array = Array.apply([], new Uint8Array(buf));
        var msgId = (255 & array[offset]) << 24 | (255 & array[offset + 1]) << 16 | (255 & array[offset + 2]) << 8 | 255 & array[offset + 3];
        return msgId;
      };
      WSManager.prototype.getMessageBody = function(buf, offset) {
        var bodyBuffer = buf.slice(offset);
        return this.ArrayBufferToString(bodyBuffer);
      };
      WSManager.prototype.createMessage = function(msgId, msgBody) {
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
          alen: 0
        };
        msgHeader.id = msgId;
        msgHeader.timestamp = Date.now() / 1e3;
        msgHeader.blen = bodyLen;
        msgHeader.bcheck = this.checkSum(bodyArray, 0, bodyLen);
        var headArray = this.getHeaderToArrayNumber(msgHeader);
        msgHeader.hcheck = this.checkSum(headArray, 4, 28);
        headArray = this.getHeaderToArrayNumber(msgHeader);
        var totalArray = headArray.concat(bodyArray);
        return new Uint8Array(totalArray).buffer;
      };
      WSManager.prototype.getHeaderToArrayNumber = function(msgHeader) {
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
      WSManager.prototype.numberToArrayNumber = function(number) {
        var array = [];
        array[0] = number >> 24 & 255;
        array[1] = number >> 16 & 255;
        array[2] = number >> 8 & 255;
        array[3] = 255 & number;
        return array;
      };
      WSManager.prototype.getArrayNumberFromString = function(str) {
        var arrayNumber = Array.apply([], this.StringToArrayBuffer(str));
        return arrayNumber;
      };
      WSManager.prototype.checkSum = function(arrayNumber, offset, length) {
        var hash = 0;
        for (var i = offset; i < offset + length; i++) hash = hash << 7 ^ arrayNumber[i];
        return hash;
      };
      WSManager.prototype.ArrayBufferToString = function(buf) {
        var str = String.fromCharCode.apply(null, new Uint8Array(buf));
        str = ENCManager_1.default.getInstance().Utf8Decode(str);
        return str;
      };
      WSManager.prototype.StringToArrayBuffer = function(str) {
        str = ENCManager_1.default.getInstance().Utf8Encode(str);
        var buf = new ArrayBuffer(str.length);
        var bufView = new Uint8Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) bufView[i] = str.charCodeAt(i);
        return bufView;
      };
      WSManager.prototype.getDelayTime = function() {
        return this.delayTime;
      };
      WSManager.prototype.destroySelf = function() {
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
    }();
    exports.default = WSManager;
    cc._RF.pop();
  }, {
    "./ENCManager": "ENCManager",
    "./GMManager": "GMManager",
    "./MPManager": "MPManager",
    "./Protocol": "Protocol",
    "./UDManager": "UDManager",
    "./UIManager": "UIManager"
  } ]
}, {}, [ "Fetch", "Promise", "Config", "ENCManager", "GMManager", "IMGManager", "JSCallNative", "MPManager", "ModuleManager", "NativeCallJS", "NodeManager", "Protocol", "UDManager", "UIManager", "Utils", "WSManager", "SVScript", "BetBTLayer", "ButtonLayer", "BuyLayer", "EmailItem", "GameCanvas", "GameResult", "PlayerItem", "PlayerLayer", "PlayerUI", "ReviewItem", "Safe", "Career", "Create", "DetailItem", "HomeCanvas", "Join", "Mine", "MineItem", "Notice", "Record", "Setting", "LoadCanvas", "LoginCanvas" ]);
//# sourceMappingURL=project.dev.js.map