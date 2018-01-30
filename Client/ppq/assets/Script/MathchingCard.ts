
const { ccclass, property } = cc._decorator;

export interface MathchCardData {
    /**
     * 牌节点
     * 
     * @type {cc.Node}
     * @memberof MathchCardData
     */
    cardNode: cc.Node,
    /**
     * 点击次数
     * 
     * @type {number}
     * @memberof MathchCardData
     */
    clickCount: number
}
@ccclass
export default class MathchingCard extends cc.Component {

    /**
     * 配牌地址
     * 
     * @type {string}
     * @memberof MathchingCard
     */
    @property(cc.String)
    url: string = '';

    /**
     * 输入框
     * 
     * @type {cc.EditBox}
     * @memberof MathchingCard
     */
    @property(cc.EditBox)
    edit_input: cc.EditBox = null;
    /**
     * 剩余牌数量
     * 
     * @type {cc.Label}
     * @memberof MathchingCard
     */
    @property(cc.Label)
    lblCardNum: cc.Label = null;

    /**
     * 错误
     * 
     * @type {cc.Label}
     * @memberof MathchingCard
     */
    @property(cc.Label)
    lblError: cc.Label = null;
    /**
     * 牌类型的父节点
     * 
     * @type {cc.Node}
     * @memberof MathchingCard
     */
    @property(cc.Node)
    node_card: cc.Node = null;

    /**
     * 玩家手牌节点
     * 
     * @type {cc.Node[]}
     * @memberof MathchingCard
     */
    @property([cc.Node])
    node_hand_list: cc.Node[] = [];
    /**
     * 玩家选中节点的列表
     * 
     * @type {cc.Node[]}
     * @memberof MathchingCard
     */
    @property([cc.Node])
    node_light_list: cc.Node[] = [];

    /**
     * 当前选中的玩家
     * 
     * @type {number}
     * @memberof MathchingCard
     */
    _select: number = -1;

    /**
     * 牌总数
     * 
     * @type {number}
     * @memberof MathchingCard
     */
    _cardCount: number = 108;

    /**
     * 牌对象列表
     * 
     * @type {MathchCardData[]}
     * @memberof MathchingCard
     */
    _node_card_list: MathchCardData[] = [];

    /**
     * 每个玩家的手牌列表
     * 
     * @type {cc.Node[]}
     * @memberof MathchingCard
     */
    _node_handCard_list: [cc.Node[]] = [[], [], [], [], []];

    /**
     * 点击开始
     * 
     * @memberof MathchingCard
     */
    Click_Mathch_Card_Start = (event: cc.Event.EventCustom) => {
        let cardNode = event.currentTarget;
        cardNode.color = cc.Color.GRAY;
    };

    /**
     * 点击取消
     * 
     * @memberof MathchingCard
     */
    Click_Mathch_Card_Cancel = (event: cc.Event.EventCustom) => {
        let cardNode = event.currentTarget;
        cardNode.color = cc.Color.WHITE;
    };
    /**
     * 点击结束
     * 
     * @memberof MathchingCard
     */
    Click_Mathch_Card_End = (event: cc.Event.EventCustom) => {
        let cardNode = event.currentTarget;
        cardNode.color = cc.Color.WHITE;
        if (this._select >= 0 && this._select < this.node_hand_list.length) {
            let node_hand = this.node_hand_list[this._select];
            if (this._select !== this.node_hand_list.length - 1) {
                if (node_hand.childrenCount < 13) {
                    let handCard: cc.Node = cc.instantiate(cardNode);
                    handCard.name = 'handCard' + node_hand.childrenCount;
                    handCard.setPosition(cc.p(0, 0));
                    handCard.parent = node_hand;
                    this._node_handCard_list[this._select].push(handCard);
                    this._cardCount -= 1;
                    this.setCardClickCount(1, cardNode);
                } else {
                    this.showError('这个位置最多设置13张手牌');
                }
            } else {
                let handCard: cc.Node = cc.instantiate(cardNode);
                handCard.setPosition(cc.p(0, 0));
                handCard.parent = node_hand;
                this._node_handCard_list[this._select].push(handCard);
                this._cardCount -= 1;
                this.setCardClickCount(1, cardNode);
            }
            this.lblCardNum.string = '剩余牌' + this._cardCount + '张';
        } else {
            this.showError('请选中一个位置进行配牌');
        }
        cc.log('---tag---' + cardNode.tag);
    };
    onLoad() {
        this.initData();
        this.bindEvent();
    }

    initData() {
        this.edit_input.string = this.url;
        this._cardCount = 108;
        for (var i = 0; i < this.node_hand_list.length; i++) {
            this.node_hand_list[i].removeAllChildren();
        }
        this._select = -1;
        for (var i = 0; i < this.node_light_list.length; i++) {
            this.node_light_list[i].active = false;
        }
        this.setCardClickCount(0);
    }

    editEnd() {
        let url = this.edit_input.string.trim();
        if (url === '' || url.length === 0) {
            this.edit_input.string = this.url;
        }
    }
    /**
     * 绑定事件
     * 
     * @memberof MathchingCard
     */
    bindEvent() {
        for (var i = 0; i < 9; i++) {
            let wanStr = 'Match_Card_Wan' + (i + 1);
            let wan = cc.find(wanStr, this.node_card);
            wan.tag = i + 1;
            wan.on('touchstart', this.Click_Mathch_Card_Start);
            wan.on('touchcancel', this.Click_Mathch_Card_Cancel);
            wan.on('touchend', this.Click_Mathch_Card_End)
            let mcd1: MathchCardData = {
                cardNode: wan,
                clickCount: 0
            };
            this._node_card_list.push(mcd1);

            let tongStr = 'Match_Card_Tong' + (i + 1);
            let tong = cc.find(tongStr, this.node_card);
            tong.tag = i + 11;
            tong.on('touchstart', this.Click_Mathch_Card_Start);
            tong.on('touchcancel', this.Click_Mathch_Card_Cancel);
            tong.on('touchend', this.Click_Mathch_Card_End)
            let mcd2: MathchCardData = {
                cardNode: tong,
                clickCount: 0
            };
            this._node_card_list.push(mcd2);

            let tiaoStr = 'Match_Card_Tiao' + (i + 1);
            let tiao = cc.find(tiaoStr, this.node_card);
            tiao.tag = i + 21;
            tiao.on('touchstart', this.Click_Mathch_Card_Start);
            tiao.on('touchcancel', this.Click_Mathch_Card_Cancel);
            tiao.on('touchend', this.Click_Mathch_Card_End)
            let mcd3: MathchCardData = {
                cardNode: tiao,
                clickCount: 0
            };
            this._node_card_list.push(mcd3);
        }
    }

    /**
     * 设置牌的点击次数
     * 
     * @param {cc.Node} cardNode 牌节点
     * @param {number} oper  运算 +1 or -1 or 0(等于0的时候是重置)
     * @memberof MathchingCard
     */
    setCardClickCount(oper: number, cardNode: cc.Node = null) {
        for (var i = 0; i < this._node_card_list.length; i++) {
            let mcd = this._node_card_list[i];
            let mask = cc.find('mask', mcd.cardNode);
            if (oper !== 0) {
                if (mcd.cardNode.tag === cardNode.tag) {
                    mcd.clickCount += oper;
                    if (mcd.clickCount >= 4) {
                        mask.active = true;
                    } else {
                        mask.active = false;
                    }
                }
            } else {
                mcd.clickCount = 0;
                mask.active = false;
            }
        }
    }

    /**
     * 显示错误
     * 
     * @param {string} [txt=''] 
     * @memberof MathchingCard
     */
    showError(txt: string = '') {
        this.lblError.node.stopAllActions();
        this.lblError.node.opacity = 255;
        this.lblError.string = txt;
        if (txt.length > 0) {
            this.lblError.node.runAction(cc.sequence(cc.delayTime(1), cc.fadeOut(2), cc.callFunc(() => {
                this.lblError.string = '';
            })));
        }
    }
    /**
     * 删除事件
     * 
     * @memberof MathchingCard
     */
    click_btn_delete() {
        if (this._select >= 0 && this._select < this.node_hand_list.length) {
            let cardNode: cc.Node = this._node_handCard_list[this._select].pop();
            if (cardNode && cardNode.isValid) {
                this.setCardClickCount(-1, cardNode);
                cardNode.removeFromParent(true);
                cardNode.destroy();
            }
        } else {
            this.showError('请选中一个位置');
        }
    }

    /**
     * 确定
     * 
     * @memberof MathchingCard
     */
    click_btn_ok() {
        let sendData = [];
        for (var i = 0; i < this.node_hand_list.length; i++) {
            let arr = [];
            for (var j = 0; j < this.node_hand_list[i].children.length; j++) {
                let cardNode = this.node_hand_list[i].children[j];
                if (cardNode) {
                    arr.push(cardNode.tag);
                }
            }
            sendData[i] = arr;
        }
        cc.log(sendData);
        let url = this.edit_input.string.trim() + JSON.stringify(sendData);
        cc.log(url);
        fetch(url).then((response) => {
            if (response.ok) {
                response.json().then((json: checkData) => {
                    cc.log(json);
                });
                this.showError('恭喜你,配牌成功,请创建房间,进入游戏!');
            } else {
                this.showError('服务器响应失败，请确认您的网络通畅后，重试！');
            }
        }).catch((errMsg) => {
            cc.log(errMsg);
            this.showError('服务器响应失败，请确认您的网络通畅后，重试！');
        });
    }

    /**
     * 重置
     * 
     * @memberof MathchingCard
     */
    click_btn_reset() {
        this.initData();
    }
    /**
     * 玩家点击事件
     * 
     * @param {any} event 
     * @param {string} type 
     * @memberof MathchingCard
     */
    click_node_player(event, type: string) {
        if (Number(type) === this._select) {
            this._select = -1;
        } else {
            this._select = Number(type);
        }
        for (var i = 0; i < this.node_light_list.length; i++) {
            if (i === this._select) {
                this.node_light_list[i].active = true;
            } else {
                this.node_light_list[i].active = false;
            }
        }
    }

    /**
     * 退出
     * 
     * @memberof MathchingCard
     */
    click_btn_out() {
        this.node.removeFromParent(true);
        this.node.destroy();
    }
}
