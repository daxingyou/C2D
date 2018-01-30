module.exports = {
    /////////////////-----------------------------属性-----------------------------/////////////////
    //小图片的宽度
    S_WIDTH: 41,
    //小图片的高度  
    S_HEIGHT: 42,
    //横向排放个数   
    XCOUNT: 6,
    //纵向排放个数       
    YCOUNT: 2,
    //小图存放的相对路径
    INPUT_PATH: './img',
    //合成图片的名字
    OUT_PATH: './out/',
    //文件名称
    FileName: 'number_41_42',
    //需要拼接的字符串
    IN_STR: '0123456789番胡',
    /////////////////+++++++++++++++++++++++++++++属性+++++++++++++++++++++++++++++/////////////////
    /////////////////-----------------------------方法-----------------------------/////////////////

    getHeadInfo() {
        let headInfo = 'info face="微软雅黑" size=' + this.S_WIDTH + ' bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=0,0 outline=0\n';
        headInfo += 'common lineHeight=' + this.S_HEIGHT + ' base=' + this.S_WIDTH + ' scaleW=' + this.S_WIDTH * this.XCOUNT + ' scaleH=' + this.S_HEIGHT * this.YCOUNT + ' pages=1 packed=0 alphaChnl=1 redChnl=0 greenChnl=0 blueChnl=0\n';
        headInfo += 'page id=0 file="' + this.FileName + '.png"\n';
        headInfo += 'chars count=' + this.IN_STR.length + '\n';
        return headInfo;
    },

    getCharInfo() {
        let charInfo = '';
        this.getItems().forEach((item, index) => {
            charInfo += 'char id=' + item.code + ' x=' + (index % this.XCOUNT) * this.S_WIDTH + ' y=' + Math.floor(index / this.XCOUNT) * this.S_HEIGHT + ' width=' + this.S_WIDTH + ' height=' + this.S_HEIGHT + ' xoffset=0 yoffset=0 xadvance=' + this.S_WIDTH + ' page=0 chnl=15\n';
        }, this);
        return charInfo;
    },

    saveFnt() {
        let fs = require('fs');
        let info = this.getHeadInfo() + this.getCharInfo();
        fs.writeFile(this.OUT_PATH + this.FileName + '.fnt', info, (err) => {
            if (err) console.log(err);
            else console.log(this.OUT_PATH + this.FileName + '.fnt saved');
        });
    },
    /**
     * 获取文件路径数组
     * @returns 
     */
    getFilePaths() {
        return this.getItems().map(function (value, index, array) {
            return value.filePath;
        });
    },

    getItems() {
        let items = [];
        for (let i = 0; i < this.IN_STR.length; i++) {
            let item = {};
            item.code = this.IN_STR.charCodeAt(i);
            item.filePath = require('path').join(this.INPUT_PATH, this.IN_STR.charAt(i) + '.png');
            items.push(item);
        }
        items.sort(function (a, b) {
            return a.code - b.code;
        });
        return items;
    },
    /////////////////+++++++++++++++++++++++++++++方法+++++++++++++++++++++++++++++/////////////////
};