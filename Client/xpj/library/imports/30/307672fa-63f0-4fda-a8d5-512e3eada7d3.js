"use strict";
cc._RF.push(module, '30767L6Y/BP2qjVUS4+rafT', 'Protocol');
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
     * 手机登录
     * phone [String] 手机号
     * code [String] 验证码
     */
    Protocol[Protocol["ACCOUNT_LOGIN_PHONE"] = 108] = "ACCOUNT_LOGIN_PHONE";
    /**
     * 获取手机短信验证码
     * phone [String] 手机号码
     */
    Protocol[Protocol["ACCOUNT_GET_SMS_CODE"] = 109] = "ACCOUNT_GET_SMS_CODE";
    /**
     * 手机号注册
     * phone [String] 手机号
     * code [String] 密码
     */
    Protocol[Protocol["ACCOUNT_REGISTER"] = 110] = "ACCOUNT_REGISTER";
    /**
     * 客户信息
     */
    Protocol[Protocol["ACCOUNT_CUSTOMER_SERVICE"] = 111] = "ACCOUNT_CUSTOMER_SERVICE";
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
     * 获取游戏场列表
     * gameType [int] 游戏类型,1=牛牛,2=金花
     */
    Protocol[Protocol["ZJH_GET_ROOM_LIST"] = 501] = "ZJH_GET_ROOM_LIST";
    /**
     * 获取桌子列表
     * cfgId [int] 游戏场Id
     */
    Protocol[Protocol["ZJH_GET_TABLE_LIST"] = 502] = "ZJH_GET_TABLE_LIST";
    /**
     * 快速加入游戏桌子
     * cfgId [int] 游戏场Id
     */
    Protocol[Protocol["ZJH_QUICK_JOIN"] = 503] = "ZJH_QUICK_JOIN";
    /**
     * 输入桌子号加入桌子
     * tableId [int] 桌子Id
     * type [int] 1=私人桌子
     */
    Protocol[Protocol["ZJH_JION_TABLEID"] = 504] = "ZJH_JION_TABLEID";
    /**
     * 创建桌子
     * cfgId [int] 游戏场Id
     */
    Protocol[Protocol["ZJH_TABLE_CREATE"] = 505] = "ZJH_TABLE_CREATE";
    /**
     * 强制离开桌子
     * tableId [int] 桌子Id
     */
    Protocol[Protocol["ZJH_TABLE_LEAVE"] = 506] = "ZJH_TABLE_LEAVE";
    /**
     * 座位表态
     * tableId [int] 桌子Id
     * seatIndex [int] 座位下标(0-N)
     * bt [int] 表态状态(0=放弃,1=看牌,2=比牌,3=全押,4=跟注,5=加注)
     * btVal [int] 表态结果值
     */
    Protocol[Protocol["ZJH_TABLE_BET"] = 507] = "ZJH_TABLE_BET";
    /**
     * 牛牛游戏叫庄家
     * tableId [int] 桌子Id
     * bt [int] 表态结果(0=不叫,1=叫庄家)
     */
    Protocol[Protocol["ZJH_TABLE_CALL_BANKER"] = 508] = "ZJH_TABLE_CALL_BANKER";
    /**
     * 游戏点准备开始游戏
     * tableId [int] 桌子Id
     */
    Protocol[Protocol["ZJH_TABLE_NN_GAME_READY"] = 509] = "ZJH_TABLE_NN_GAME_READY";
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
     * 获取兑换比例
     */
    Protocol[Protocol["ORDER_GET_EXCHANAGE_PERCENT"] = 901] = "ORDER_GET_EXCHANAGE_PERCENT";
    /**
     * 充值金币
     * rmb [int] 人民币数量
     * payType [int] 支付类型(1=WX,2=支付宝)
     */
    Protocol[Protocol["ORDER_CHARGE_RMB2GOLDMONEY"] = 902] = "ORDER_CHARGE_RMB2GOLDMONEY";
    /**
     * 金币提现人民币
     * goldMoney [int] 金币数量
     */
    Protocol[Protocol["ORDER_CHARGE_GOLDMONEY2RMB"] = 903] = "ORDER_CHARGE_GOLDMONEY2RMB";
    /**
     * 提现订单查询
     */
    Protocol[Protocol["ORDER_CHARGE_GOLDMONEY2RMB_QUERY"] = 904] = "ORDER_CHARGE_GOLDMONEY2RMB_QUERY";
    /**
     * 推送消息(红点提示数据)
     */
    Protocol[Protocol["ACCOUNT_NOTIFY_HOT_PROMPT"] = 10001] = "ACCOUNT_NOTIFY_HOT_PROMPT";
    /**
     * 推送消息(玩家钱包数据)
     */
    Protocol[Protocol["ACCOUNT_NOTIFY_WALLET"] = 10002] = "ACCOUNT_NOTIFY_WALLET";
    /**
     * 公告推送消息
     */
    Protocol[Protocol["MESSAGE_NOTICE_NOTIFY"] = 30001] = "MESSAGE_NOTICE_NOTIFY";
    /**
     * 推送消息(游戏状态变化)
     */
    Protocol[Protocol["ZJH_GAMESTATE_CHANAGE_NOTIFY"] = 50001] = "ZJH_GAMESTATE_CHANAGE_NOTIFY";
    /**
     * 推送消息(座位数据变化)
     */
    Protocol[Protocol["ZJH_SEAT_CHANAGE_NOTIFY"] = 50002] = "ZJH_SEAT_CHANAGE_NOTIFY";
    /**
     * 推送消息(下注数据变化)
     */
    Protocol[Protocol["ZJH_TABLE_BET_NOTIFY"] = 50003] = "ZJH_TABLE_BET_NOTIFY";
    /**
     * 推送消息(玩家被踢出座位)
     */
    Protocol[Protocol["ZJH_TABLE_KICK_PLAYER_NOTIFY"] = 50004] = "ZJH_TABLE_KICK_PLAYER_NOTIFY";
    /**
     * 推送消息(玩家看牌数据)
     */
    Protocol[Protocol["ZJH_TABLE_LOOKCARD_NOTIFY"] = 50005] = "ZJH_TABLE_LOOKCARD_NOTIFY";
    /**
     * 推送消息(牛牛叫庄数据)
     */
    Protocol[Protocol["ZJH_TABLE_NN_CALLBANKER_NOTIFY"] = 50006] = "ZJH_TABLE_NN_CALLBANKER_NOTIFY";
    /**
     * 推送消息(牛牛游戏准备数据)
     */
    Protocol[Protocol["ZJH_TABLE_NN_GAMEREADY_NOTIFY"] = 50007] = "ZJH_TABLE_NN_GAMEREADY_NOTIFY";
    /**
     * 推送消息(充值成功)
     */
    Protocol[Protocol["ORDER_RMB2GOLDMONEY_NOTIFY"] = 90001] = "ORDER_RMB2GOLDMONEY_NOTIFY";
})(Protocol = exports.Protocol || (exports.Protocol = {}));

cc._RF.pop();