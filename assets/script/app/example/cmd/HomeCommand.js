const X9Command = require('X9Cmd');

var HomeCommand  = cc.Class({
    extends: X9Command,

    statics:{
        CLICK_BUTTON: 'click_button',
        SHOW_POPUP: 'show_popup'
    },

    clickButton(evt){
        cc.log("Click button ------" + evt.target.name)
        this.cmd({msg: 'OK'}, HomeCommand.CLICK_BUTTON);
        cc.log('---------------------------------');
    },

    showPopup(){       
        this.cmd({msg: 'Hệ thống popup'}, HomeCommand.SHOW_POPUP);       
    },

})