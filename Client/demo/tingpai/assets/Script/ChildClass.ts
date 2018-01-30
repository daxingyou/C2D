import MJCard from "./MJCard";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ChildClass extends cc.Component {
    @property(cc.Label)
    lbl: cc.Label = null;
    wans: MJCard[] = [];
    tongs: MJCard[] = [];
    tiaos: MJCard[] = [];
    onLoad() {
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 10; j++) {
                let card = new MJCard(j, i);
                switch (i) {
                    case 1: this.wans.push(card); break;
                    case 2: this.tongs.push(card); break;
                    case 3: this.tiaos.push(card); break;
                    default: break;
                }
            }
        }
        // init logic
        let card1 = new MJCard(1, 1);
        let card2 = new MJCard(1, 1);
        let card3 = new MJCard(2, 1);
        let card4 = new MJCard(2, 1);
        let card5 = new MJCard(3, 1);
        let card6 = new MJCard(3, 1);
        let card7 = new MJCard(3, 1);
        let card8 = new MJCard(4, 1);
        let card9 = new MJCard(6, 2);
        let card10 = new MJCard(7, 2);
        let card11 = new MJCard(8, 2);
        let card12 = new MJCard(9, 2);
        let card13 = new MJCard(9, 2);
        let arr = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10, card11, card12, card13];
        let start = Date.now();
        let list = this.getTingPai(arr);
        let diff = Date.now() - start;
        let points = list.map((item) => {
            return item.point + item.suit * 10;
        }, this);
        this.lbl.string = diff + '|' + points.join(',');
        cc.log(list);
    }

    /**
     * 判断是否可以胡牌
     * 
     * @param {MJCard[]} cards 
     * @returns {boolean} 
     * @memberof ChildClass
     */
    canHuPai(cards: MJCard[]): boolean {
        if (cards.length % 3 !== 2) return false;
        if (this.getSuits(cards).length > 2) return false;
        if (cards.length === 2) {
            if (cards[0].point === cards[1].point && cards[0].suit === cards[1].suit) return true;
            else return false;
        } else {//5,8,11,14
            let nums = cards.map((card) => {
                return card.suit * 10 + card.point;
            }, this);
            nums.sort();
            if (this.checkQiDui(nums)) return true;
            let dups = this.getDuplicate(nums);
            for (let i = 0; i < dups.length; i++) {
                let num = dups[i];
                let temps = nums.slice(0);
                for (let i = 0; i < 2; i++) {
                    let index = temps.indexOf(num);
                    temps.splice(index, 1);
                }
                if (this.checkRemaining(temps)) return true;
            }
            return false;
        }
    }

    /**
     * 检查花色
     * 
     * @param {MJCard[]} cards 
     * @returns {number} 
     * @memberof ChildClass
     */
    getSuits(cards: MJCard[]): number[] {
        let suits: number[] = [];
        cards.forEach((card) => {
            if (suits.indexOf(card.suit) === -1) {
                suits.push(card.suit);
            }
        }, this);
        return suits;
    }

    /**
     * 判断移除将牌后剩余的牌是否满足顺子和克子，通过递归移除法验证，当剩余牌为0是返回能胡牌，反之则不能胡牌
     * 余牌数量不为0是必定是3的倍数，余牌是排序过的从小到大
     * 
     * @param {number[]} nums 
     * @returns {boolean} 
     * @memberof ChildClass
     */
    checkRemaining(nums: number[]): boolean {
        if (nums.length === 0) return true;
        if (nums[0] === nums[1] && nums[1] === nums[2]) {
            let temps = nums.slice(3);
            return this.checkRemaining(temps);
        } else {
            if (nums.indexOf(nums[0] + 1) !== -1 && nums.indexOf(nums[0] + 2) !== -1) {
                let temps = nums.slice(0);
                let remove = 0, index = 0;
                for (let i = 0; i < 3; i++) {
                    remove = temps.splice(index, 1)[0];
                    index = temps.indexOf(remove + 1);
                }
                return this.checkRemaining(temps);
            }
            return false;
        }
    }

    /**
     * 找出可以当将牌的重复项
     * 
     * @param {number[]} nums 
     * @returns {number[]} 
     * @memberof ChildClass
     */
    getDuplicate(nums: number[]): number[] {
        var result: number[] = [];
        nums.forEach((num) => {
            if (nums.indexOf(num) !== nums.lastIndexOf(num) && result.indexOf(num) === -1)
                result.push(num);
        })
        return result;
    }

    /**
     * 判断7对
     * 
     * @param {number[]} nums 
     * @returns {boolean} 
     * @memberof ChildClass
     */
    checkQiDui(nums: number[]): boolean {
        if (nums.length !== 14) return false;
        for (let i = 0; i < 12; i += 2) {
            if (nums[i] !== nums[i + 1]) {
                return false;
            }
        }
        return true;
    }

    /**
     * 获取可以胡的牌，即听牌
     * 
     * @param {MJCard[]} cards 
     * @returns {MJCard[]} 
     * @memberof ChildClass
     */
    getTingPai(cards: MJCard[]): MJCard[] {
        let results: MJCard[] = [];
        let checkList: MJCard[] = [];
        let suits = this.getSuits(cards);
        if (suits.length > 2) return [];
        suits.forEach((suit) => {
            switch (suit) {
                case 1: checkList = checkList.concat(this.wans); break;
                case 2: checkList = checkList.concat(this.tongs); break;
                case 3: checkList = checkList.concat(this.tiaos); break;
                default: break;
            }
        }, this);
        checkList.forEach((card) => {
            let temps = cards.slice(0);
            temps.push(card);
            if (this.canHuPai(temps)) {
                results.push(card);
            }
        }, this);
        return results;
    }
}


