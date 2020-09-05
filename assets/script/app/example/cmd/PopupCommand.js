const X9Command = require('X9Cmd');

var PopupCommand = cc.Class({
    extends: X9Command,

    statics:{
        CLOSE_POPUP: 'close_button',
    },

    clickButton(evt, data){
        cc.log("Click button ------" + evt.currentTarget)
        this.cmd({msg: 'OK'}, PopupCommand.CLOSE_POPUP);
        let node = cc.find(data);
        node.removeFromParent();
        cc.log('---------------------------------');
    }
})