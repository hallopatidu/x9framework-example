const X9Component = require('X9Com');
const HomeCommand = require('HomeCommand');

cc.Class({
    extends: X9Component,

    properties:{
        content: cc.Label,
    },

    start(){
        // dung start hoac dung onLoad, start() sẽ gọi sau onLoad
        // Khai báo các thứ khởi tạo vao đây
    },

    onLoad () {
        this._super();
        this.content.string = 'AAAAAAAAAAAAAa'
        // Thích dùng onLoad thì phải có this._super()
        // Khai báo các thứ khởi tạo vao đây
    },    

    allowCommandTypes(){
        // Liệt kê các thể loại command vào đây
        // Mảng các string này chính là 'type' của command gửi đi khi gọi this.cmd(dataObject, type)
        return [HomeCommand.CLICK_BUTTON, HomeCommand.SHOW_POPUP];
    },

    onUpdateState(){        
        cc.log( '[Update State Data] ' + this.constructor.name + '::' + this.getState().msg);
        
    },

    onUpdateView(done){
        cc.log( '<Update View> ' + this.constructor.name + '::' + this.getState().msg);
        this.content.string = this.getState().msg;
        if(done){
            done();
        }
    }
    // update (dt) {        
    // },
});
