const { ccclass, property } = cc._decorator;
import MJCanvas from './MJCanvas';
import * as MJ_Help from './MJ_Help';
import * as dd from './../../Modules/ModuleManager';
@ccclass
export default class MJ_PlayerUI extends cc.Component {

    /**
     * 头像
     * 
     * @type {cc.Sprite}
     * @memberof MJ_PlayerUI
     */
    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    /**
     * 名称
     * 
     * @type {cc.Label}
     * @memberof MJ_PlayerUI
     */
    @property(cc.Label)
    lblName: cc.Label = null;

    /**
     * 分数
     * 
     * @type {cc.Label}
     * @memberof MJ_PlayerUI
     */
    @property(cc.Label)
    lblScore: cc.Label = null;

    /**
     * 庄节点
     * 
     * @type {cc.Node}
     * @memberof MJ_PlayerUI
     */
    @property(cc.Node)
    node_d: cc.Node = null;

    /**
     * 离线节点
     * 
     * @type {cc.Node}
     * @memberof MJ_PlayerUI
     */
    @property(cc.Node)
    node_offLine: cc.Node = null;

    /**
     * 缺花色(1=万,2=筒,3=条)
     * 
     * @type {cc.Sprite}
     * @memberof MJ_PlayerUI
     */
    @property(cc.Sprite)
    unSuit: cc.Sprite = null;

    /**
     *玩家信息
     * 
     * @type {SeatVo}
     * @memberof MJ_PlayerUI
     */
    _seatInfo: SeatVo = null;

    /**
     * canvas脚本
     * 
     * @type {MJCanvas}
     * @memberof MJ_PlayerUI
     */
    _canvasTarget: MJCanvas = null;
    onLoad() {
        this._canvasTarget = dd.ui_manager.getCanvasNode().getComponent('MJCanvas');
        this.node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
            if (dd.gm_manager.touchTarget) return;
            this._canvasTarget.showRoleInfo(this._seatInfo.accountId);
            event.stopPropagation();
        }, this);
    }

    /**
     * 显示信息
     * 
     * @memberof MJ_PlayerUI
     */
    async showInfo(seatInfo: SeatVo) {
        this._seatInfo = seatInfo;
        if (this._seatInfo.nick.length > 4) {
            this.lblName.horizontalAlign = cc.Label.HorizontalAlign.LEFT;
        } else {
            this.lblName.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        }
        this.lblName.string = this._seatInfo.nick;
        this.lblScore.string = this._seatInfo.score + '';
        let headSF = null;
        try {
            headSF = await dd.img_manager.loadURLImage(this._seatInfo.headImg);
        } catch (error) {
            cc.log('获取头像错误');
        }
        this.headImg.spriteFrame = headSF;
        //如果座位号是庄家座位号
        if (this._seatInfo.seatIndex === dd.gm_manager.mjGameData.tableBaseVo.bankerIndex) {
            this.node_d.active = true;
        } else {
            this.node_d.active = false;
        }
        //如果玩家的在线状态是 离线
        if (this._seatInfo.onLine === 0) {
            this.node_offLine.active = true;
        } else {
            this.node_offLine.active = false;
        }
        //如果存在打缺 缺花色(1=万,2=筒,3=条)
        if (this._seatInfo.unSuit > 0 && dd.gm_manager.mjGameData.tableBaseVo.gameState > MJ_Help.MJ_GameState.STATE_TABLE_DINGQUE) {
            this.unSuit.node.active = true;
            this.unSuit.spriteFrame = this._canvasTarget.unSuit_list[this._seatInfo.unSuit - 1];
        } else {
            this.unSuit.node.active = false;
        }

    }
}
