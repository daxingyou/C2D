import * as dd from './../../Modules/ModuleManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Club_Record_Item extends cc.Component {
    @property(cc.Node)
    node_choose: cc.Node = null;
    /**
     *索引
     * 
     * @type {cc.Label}
     * @memberof Club_Record_Item
     */
    @property(cc.Label)
    lblIndex: cc.Label = null;

    /**
     * 对战时间
     * 
     * @type {cc.Label}
     * @memberof Club_Record_Item
     */
    @property(cc.Label)
    lblGameTime: cc.Label = null;

    /**
     * 分数
     * 
     * @type {cc.Label[]}
     * @memberof Club_Record_Item
     */
    @property([cc.Label])
    lblScoreList: cc.Label[] = [];

    _itemData: RecordDetailedItemVo = null;                            //俱乐部信息数据
    _cb = null;             //item点击回调
    _target = null;
    onLoad() {
        this.node.on("touchend", (event: cc.Event.EventTouch) => {
            if (this._cb) {
                this._cb(this._itemData);
            }
            
            event.stopPropagation();
        }, this);
    }

    updateItem(data: RecordDetailedItemVo, cb, target) {
        this._itemData = data;
        this._cb = cb;
        this._target = target;

        this.node_choose.active = data.gameNum % 2 === 0 ? false : true;
        this.lblIndex.string = data.gameNum + '';
        this.lblGameTime.string = dd.utils.getDateStringByTimestamp(data.recordTime, 3);

        let index = 0;
        let maxScore = data.scores[0];
        for (var i = 0; i < this.lblScoreList.length; i++) {
            this.lblScoreList[index].node.color = cc.Color.WHITE;
            this.lblScoreList[i].string = data.scores[i] + '';
            if (data.scores[i] > maxScore) {
                index = i;
                maxScore = data.scores[i];
            }
        }
        //如果是赢家
        if (this.lblScoreList[index]) {
            this.lblScoreList[index].node.color = cc.color(245, 152, 92);
        }
    }

    /**
     * 查看回放
     * 
     * @memberof Club_Record_Item
     */
    click_btn_look() {
        dd.mp_manager.playButton();
        this._target.sendGetVedio(this._itemData.recordFile);
    }
}
