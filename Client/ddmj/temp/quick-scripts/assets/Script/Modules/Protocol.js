(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Modules/Protocol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30767L6Y/BP2qjVUS4+rafT', 'Protocol', __filename);
// Script/Modules/Protocol.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 通信协议枚举
 *
 * @export
 * @enum {number}
 */
var Protocol;
(function (Protocol) {
    /**
     * 心跳消息
     */
    Protocol[Protocol["ACCOUNT_HEART"] = 101] = "ACCOUNT_HEART";
    /**
     * 游客登录
     * uuid [String] 微信或游客唯一uuid
     */
    Protocol[Protocol["ACCOUNT_LOGIN_TOURIST"] = 102] = "ACCOUNT_LOGIN_TOURIST";
    /**
     * 微信登录
     * uuid [String] 微信或游客唯一uuid
     * headImg [String] 头像
     * nick [String] 呢称
     * sex [int] 性别
     */
    Protocol[Protocol["ACCOUNT_LOGIN_WX"] = 103] = "ACCOUNT_LOGIN_WX";
    /**
     * 登出
     * accountId [String] 帐号Id
     */
    Protocol[Protocol["ACCOUNT_LOGIN_OUT"] = 104] = "ACCOUNT_LOGIN_OUT";
    /**
     * 通过帐号获取角色信息
     * accountId [String] 帐号Id
     */
    Protocol[Protocol["ACCOUNT_ROLE_ACCOUNTID"] = 105] = "ACCOUNT_ROLE_ACCOUNTID";
    /**
     * 通过明星号获取角色信息
     * starNO [String] 明星号
     */
    Protocol[Protocol["ACCOUNT_ROLE_STARNO"] = 106] = "ACCOUNT_ROLE_STARNO";
    /**
     * 客户端上报与服务器ping值
     * ping [int] ping数值
     */
    Protocol[Protocol["ACCOUNT_PING"] = 107] = "ACCOUNT_PING";
    /**
     * 帐号Id登录
     * accountId [String] 数据库唯 一Id
     */
    Protocol[Protocol["ACCOUNT_LOGIN_ACCOUNTID"] = 108] = "ACCOUNT_LOGIN_ACCOUNTID";
    /**
     * 获取所有邮件列表
     */
    Protocol[Protocol["MAIL_MAILLIST"] = 201] = "MAIL_MAILLIST";
    /**
     * 查看邮件
     * mailId [int] 邮件唯一Id
     */
    Protocol[Protocol["MAIL_MAILVIEW"] = 202] = "MAIL_MAILVIEW";
    /**
     * 获取我的帮会列表
     */
    Protocol[Protocol["CORPS_GET_CORPS_LIST"] = 401] = "CORPS_GET_CORPS_LIST";
    /**
     * 创建帮会
     * corpsName [String] 帮会名称(具有唯一性)
     */
    Protocol[Protocol["CORPS_CREATE"] = 402] = "CORPS_CREATE";
    /**
     * 获取帮会所有游戏桌子
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_TABLE_LIST"] = 403] = "CORPS_TABLE_LIST";
    /**
     * 获取帮会所有成员信息
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_MEMBER_LIST"] = 404] = "CORPS_MEMBER_LIST";
    /**
     * 设置房卡使用状态
     * corpsId [String] 帮会Id
     * state [int] 0=关闭,1=打开
     */
    Protocol[Protocol["CORPS_SET_ROOMCARD_STATE"] = 405] = "CORPS_SET_ROOMCARD_STATE";
    /**
     * 解散帮会
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_DESTORY"] = 406] = "CORPS_DESTORY";
    /**
     * 成员退出帮会
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_EXIT"] = 407] = "CORPS_EXIT";
    /**
     * 添加帮会成员
     * corpsId [String] 帮会Id
     * starNO [String] 添加的玩家明星号
     */
    Protocol[Protocol["CORPS_ADD_MEMBER"] = 408] = "CORPS_ADD_MEMBER";
    /**
     * 踢出帮会成员
     * corpsId [String] 帮会Id
     * starNO [String] 踢出的玩家明星号
     */
    Protocol[Protocol["CORPS_KICK_MEMBER"] = 409] = "CORPS_KICK_MEMBER";
    /**
     * 申请加入帮会
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_QUEST_JOIN"] = 410] = "CORPS_QUEST_JOIN";
    /**
     * 帮会同意或拒绝玩家加入帮会
     * corpsId [String] 帮会Id
     * starNO [String] 玩家明星号
     * bt [int] 表态(0=拒绝,1=同意)
     */
    Protocol[Protocol["CORPS_QUEST_JOIN_BT"] = 411] = "CORPS_QUEST_JOIN_BT";
    /**
     * 获取帮会加入申请列表
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_GET_QUESTJOIN_LIST"] = 412] = "CORPS_GET_QUESTJOIN_LIST";
    /**
     * 获取帮会详细信息
     * corpsId [String] 帮会Id
     */
    Protocol[Protocol["CORPS_GET_CORPS_DETAILED"] = 413] = "CORPS_GET_CORPS_DETAILED";
    /**
     * 获取麻将条目配置
     */
    Protocol[Protocol["MAJIANG_GET_RULECFG"] = 501] = "MAJIANG_GET_RULECFG";
    /**
     * 创建桌子
     * corpsId [String] 帮会Id,0=无帮会
     * roomItemId [int] 桌子配置条目Id
     * rules [List] 桌子规则
     */
    Protocol[Protocol["MAJIANG_ROOM_CREATE"] = 502] = "MAJIANG_ROOM_CREATE";
    /**
     * 加入桌子
     * tableId [int] 桌子号
     */
    Protocol[Protocol["MAJIANG_ROOM_JOIN"] = 503] = "MAJIANG_ROOM_JOIN";
    /**
     * 退出桌子
     * tableId [int] 桌子号
     */
    Protocol[Protocol["MAJIANG_ROOM_LEAV"] = 504] = "MAJIANG_ROOM_LEAV";
    /**
     * 获取桌子信息
     * tableId [int] 桌子号
     */
    Protocol[Protocol["MAJIANG_ROOM_GET_ROOMINFO"] = 505] = "MAJIANG_ROOM_GET_ROOMINFO";
    /**
     * 换牌表态
     * tableId [int] 桌子号
     * cardIds [[B] 要换的牌
     */
    Protocol[Protocol["MAJIANG_ROOM_SWAP_CARD"] = 506] = "MAJIANG_ROOM_SWAP_CARD";
    /**
     * 定缺表态
     * tableId [int] 桌子号
     * bt [int] 表态结果(1=万,2=筒,3=条)
     */
    Protocol[Protocol["MAJIANG_ROOM_DINQUE"] = 507] = "MAJIANG_ROOM_DINQUE";
    /**
     * 出牌表态
     * tableId [int] 桌子号
     * cardId [byte] 要出的牌
     */
    Protocol[Protocol["MAJIANG_ROOM_OUT_CARD"] = 508] = "MAJIANG_ROOM_OUT_CARD";
    /**
     * 胡杠碰吃表态
     * tableId [int] 桌子号
     * bt [int] 表态类型(0=胡,1=杠,2=碰,3=吃,4=过)
     * cardId [byte] 表态的牌
     */
    Protocol[Protocol["MAJIANG_ROOM_OTHERBREAK_CARD"] = 509] = "MAJIANG_ROOM_OTHERBREAK_CARD";
    /**
     * 申请解散桌子
     * tableId [int] 桌子号
     */
    Protocol[Protocol["MAJIANG_ROOM_QUEST_DELETE"] = 510] = "MAJIANG_ROOM_QUEST_DELETE";
    /**
     * 解散桌子表态
     * tableId [int] 桌子号
     * bt [int] 表态结果(1=拒绝,2=同意)
     */
    Protocol[Protocol["MAJIANG_ROOM_DELETE_BT"] = 511] = "MAJIANG_ROOM_DELETE_BT";
    /**
     * 点击下一局游戏
     */
    Protocol[Protocol["MAJIANG_ROOM_NEXT_GAME"] = 512] = "MAJIANG_ROOM_NEXT_GAME";
    /**
     * 发送聊天信息
     * tableId [int] 桌子Id
     * type [int] 聊天内容类型
     * content [int] 聊天内容Id
     */
    Protocol[Protocol["CHAT_SEND"] = 601] = "CHAT_SEND";
    /**
     * 查询战绩
     * type [int] 查询类型(1=个人,2=俱乐部)
     * query [String] 查询参数(个人=玩家帐号Id,俱乐部=俱乐部Id)
     */
    Protocol[Protocol["REPLAY_QUERY_RECORD"] = 701] = "REPLAY_QUERY_RECORD";
    /**
     * 查询详细战绩数据
     * tableId [int] 桌子Id
     */
    Protocol[Protocol["REPLAY_QUERY_DETAILED_RECORD"] = 702] = "REPLAY_QUERY_DETAILED_RECORD";
    /**
     * 群主删除战绩数据
     * tableId [int] 桌子Id
     */
    Protocol[Protocol["REPLAY_DELETE_RECORD"] = 703] = "REPLAY_DELETE_RECORD";
    /**
     * 玩家实名认证
     * name [String] 姓名
     * cardId [String] 身份证
     */
    Protocol[Protocol["REPLAY_REALNAME_AUTHENTICATION"] = 704] = "REPLAY_REALNAME_AUTHENTICATION";
    /**
     * 获取手机短信码
     * phone [String] 手机号
     */
    Protocol[Protocol["REPLAY_PHONE_GET_SMSCODE"] = 705] = "REPLAY_PHONE_GET_SMSCODE";
    /**
     * 手机帮定
     * phone [String] 手机号
     * vaildCode [String] 验证码
     */
    Protocol[Protocol["REPLAY_PHONE_BIND"] = 706] = "REPLAY_PHONE_BIND";
    /**
     * 赠送房卡
     * givePlayer [String] 赠送玩家StarNO
     * giveNum [int] 赠送数量
     */
    Protocol[Protocol["WALLET_ROOMCARD_GIVE"] = 801] = "WALLET_ROOMCARD_GIVE";
    /**
     * 获取房卡赠送记录
     */
    Protocol[Protocol["WALLET_ROOMCARD_RECORD"] = 802] = "WALLET_ROOMCARD_RECORD";
    /**
     * 获取所有商品列表
     */
    Protocol[Protocol["MALL_ITEMLIST"] = 901] = "MALL_ITEMLIST";
    /**
     * 购买指定商品
     * itemId [int] 商品Id
     */
    Protocol[Protocol["MALL_ITEM_BUY"] = 902] = "MALL_ITEM_BUY";
    /**
     * 商品购买成功
     * itemId [int] 商品Id
     */
    Protocol[Protocol["MALL_ITEM_BUY_OK"] = 903] = "MALL_ITEM_BUY_OK";
    /**
     * 推送消息(红点提示数据)
     */
    Protocol[Protocol["ACCOUNT_NOTIFY_HOT_PROMPT"] = 10001] = "ACCOUNT_NOTIFY_HOT_PROMPT";
    /**
     * 推送消息(玩家钱包数据)
     */
    Protocol[Protocol["ACCOUNT_NOTIFY_WALLET"] = 10002] = "ACCOUNT_NOTIFY_WALLET";
    /**
     * 推送消息(帐号被踢下线通知)
     */
    Protocol[Protocol["ACCOUNT_NOTIFY_KICK_ACCOUNT"] = 10003] = "ACCOUNT_NOTIFY_KICK_ACCOUNT";
    /**
     * 公告推送消息
     */
    Protocol[Protocol["MESSAGE_NOTICE_NOTIFY"] = 30001] = "MESSAGE_NOTICE_NOTIFY";
    /**
     * 推送消息(俱乐部解散通知)
     */
    Protocol[Protocol["CORPS_DESTORY_NOTIFY"] = 40001] = "CORPS_DESTORY_NOTIFY";
    /**
     * 推送消息(俱乐部成员添加通知)
     */
    Protocol[Protocol["CORPS_ADD_MEMBER_NOTIFY"] = 40002] = "CORPS_ADD_MEMBER_NOTIFY";
    /**
     * 推送消息(俱乐部成员移除通知)
     */
    Protocol[Protocol["CORPS_KIC_KMEMBER_NOTIFY"] = 40003] = "CORPS_KIC_KMEMBER_NOTIFY";
    /**
     * 推送消息(游戏状态变化)
     */
    Protocol[Protocol["MAJIANG_ROOM_GAMESTATE_NOTIFY"] = 50001] = "MAJIANG_ROOM_GAMESTATE_NOTIFY";
    /**
     * 推送消息(座位数据变化)
     */
    Protocol[Protocol["MAJIANG_ROOM_SEAT_NOTIFY"] = 50002] = "MAJIANG_ROOM_SEAT_NOTIFY";
    /**
     * 推送消息(定缺数据通知)
     */
    Protocol[Protocol["MAJIANG_ROOM_DINQUE_NOTIFY"] = 50003] = "MAJIANG_ROOM_DINQUE_NOTIFY";
    /**
     * 推送消息(换牌数据通知)
     */
    Protocol[Protocol["MAJIANG_ROOM_SWAPCARD_NOTIFY"] = 50004] = "MAJIANG_ROOM_SWAPCARD_NOTIFY";
    /**
     * 推送消息(出牌数据通知)
     */
    Protocol[Protocol["MAJIANG_ROOM_OUTCARD_NOTIFY"] = 50005] = "MAJIANG_ROOM_OUTCARD_NOTIFY";
    /**
     * 推送消息(胡杠碰吃过表态通知)
     */
    Protocol[Protocol["MAJIANG_ROOM_BREAKCARD_NOTIFY"] = 50006] = "MAJIANG_ROOM_BREAKCARD_NOTIFY";
    /**
     * 推送消息(桌子已解散通知)
     */
    Protocol[Protocol["MAJIANG_ROOM_DESTORY_NOTIFY"] = 50007] = "MAJIANG_ROOM_DESTORY_NOTIFY";
    /**
     * 推送消息(桌子解散表态通知)
     */
    Protocol[Protocol["MAJIANG_ROOM_DESTORY_BT_NOTIFY"] = 50008] = "MAJIANG_ROOM_DESTORY_BT_NOTIFY";
    /**
     * 推送消息(聊天信息通知)
     */
    Protocol[Protocol["CHAT_SEND_NOTIFY"] = 60001] = "CHAT_SEND_NOTIFY";
})(Protocol = exports.Protocol || (exports.Protocol = {}));

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
        //# sourceMappingURL=Protocol.js.map
        