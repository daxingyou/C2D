declare module cc {
    export var RenderTexture: any;
    export interface Node {
        _sgNode: any;
    }
}

declare let gl: any;

declare interface checkData {
    msg: string;
    type: number;
    apkUrl: string;
    ipaUrl: string;
}

/**
 * 按钮对象
 * 
 * @export
 * @interface btn_obj
 */
declare interface btn_obj {
    /**
     * 按钮名字
     * 
     * @type {string}
     * @memberof btn_obj
     */
    lbl_name: string;
    /**
     * 按钮响应的回调
     * 
     * @memberof btn_obj
     */
    callback: (event?: cc.Event.EventTouch) => void;
}

/**
 * 音频配置对象
 * 
 * @interface audioSetting
 */
declare interface audioSetting {
    /**
     * 报牌语言,0是关闭不报牌,1是四川话,2是普通话(默认四川话)
     */
    language: number;

    /**
     * 是否开启背景音乐(默认开启)
     */
    isMusic: boolean;

    /**
     * 是否开启音效(默认开启)
     */
    isEffect: boolean;

    /**
     * 是否开启语音(默认开启)
     */
    isSound: boolean;
}