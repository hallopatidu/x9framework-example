const X9Component = require('X9Com');
const HomeCommand = require('HomeCommand');

cc.Class({
    extends: X9Component,

    start(){
        // dung start hoac dung onLoad, start() sẽ gọi sau onLoad
        // Khai báo các thứ khởi tạo vao đây
    },

    onLoad () {
        this._super();
        // Thích dùng onLoad thì phải có this._super()
        // Khai báo các thứ khởi tạo vao đây
    },    

    allowCommandTypes(){
        // Liệt kê các thể loại command vào đây
        // Mảng các string này chính là 'type' của command gửi đi khi gọi this.cmd(dataObject, type)
        return [HomeCommand.CLICK_BUTTON];
    },


    onUpdateState(){        
        cc.log( '[Update State Data] ' + this.constructor.name + '::' + this.getState().msg);
        
    },

    onUpdateView(done){
        switch(this.getStateType()){
            case HomeCommand.CLICK_BUTTON:
                cc.log( '<Update View> ' + this.constructor.name + '::' + this.getState().msg);
                if(done){
                    cc.log('wait 2 seconds...')
                    this.scheduleOnce(done,2);
                }
                break;
        
            default:
                // luôn gọi done để tiếp tục các task khác trong trường hợp sử dụng squence
                if(done){
                    done();
                }
                break;
        }
        
    }
    // update (dt) {        
    // },
});
