import { mp_manager, ui_manager } from './../../Modules/ModuleManager';
const { ccclass, property } = cc._decorator;

@ccclass
export default class Help extends cc.Component {

    /**
     * 显示列表
     * 
     * @type {cc.ScrollView}
     * @memberof Help
     */
    @property(cc.ScrollView)
    svNode: cc.ScrollView = null;
    /**
     * 血战麻将的规则图片列表
     * 
     * @type {cc.SpriteFrame[]}
     * @memberof Help
     */
    @property([cc.SpriteFrame])
    xzmj_list: cc.SpriteFrame[] = [];

    onLoad() {
        this.node.on('touchend', (event) => {
            ui_manager.isShowPopup = true;
            this.node.removeFromParent(true);
            this.node.destroy();
            event.stopPropagation();
        }, this);
        this.showHelpInfo();
    }
    /**
     * 显示帮助信息
     * 
     * @memberof Help
     */
    showHelpInfo() {
        this.svNode.content.removeAllChildren();
        for (var i = 0; i < this.xzmj_list.length; i++) {
            let itemNode = new cc.Node();
            let sp = itemNode.addComponent(cc.Sprite);
            sp.spriteFrame = this.xzmj_list[i];
            sp.sizeMode = cc.Sprite.SizeMode.RAW;
            sp.trim = false;
            let lw = itemNode.addComponent(cc.Widget);
            lw.isAlignLeft = true;
            // lw.isAlignRight = true;
            lw.left = 0;
            // lw.right = 0;
            this.svNode.content.addChild(itemNode);
        }
    }

    /**
     * 退出
     * 
     * @memberof Help
     */
    click_btn_out() {
        mp_manager.playButton();
        ui_manager.isShowPopup = true;
        this.node.removeFromParent(true);
        this.node.destroy();
    }
}
