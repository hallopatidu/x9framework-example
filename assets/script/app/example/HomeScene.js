const X9Component = require('X9Com');
const HomeCommand = require('HomeCommand');

cc.Class({
    extends: X9Component,

    properties:{
        popup:{
            type: cc.Prefab,
            default: null,
        }
    },

    start(){
        // dung start hoac dung onLoad
        cc.log("----------start ")
    },

    onLoad () {
        this._super();
        // khai bao cac thuoc tinh
        // this.applyStateDeepComparing(true) // Set true khi muôn chặn toàn bộ các data giống nhau gửi đến component. ví dụ: click nút gửi liên tục
        
        // Sử dụng hàm use để tham chiếu các component cùng node. Đồng thời sắp xếp thứ tự cập nhật state data
        // Theo thứ tự bên dưới, hàm onUpdateState của từng x9 component sẽ được gọi theo thứ tự:
        // Comp3 -> Comp1 -> Comp2 -> HomeScene
        this.use('Comp3');
        this.use('Comp1');
        this.comp2 = this.use('Comp2');  // Có thể đặt tham chiếu, xong nhớ set 'this.comp2 = null' khi destroy hoặc onDestroy
        // 
        // Sap xep thu tu update view. Luu y: data luon cap nhat xong het moi den view.
        // Trong trường hợp này onUpdateView của HomeScene sẽ gọi trước sau đó đến onUpdateView của Comp2 -> Comp1 -> Comp3
        this.sequence(HomeCommand.CLICK_BUTTON, 'Comp2', 'Comp1', 'Comp3');
        
        // Sử dụng hàm use(...) để tham chiếu sang component từ prefab node. 
        this.popupNode = cc.instantiate(this.popup);
        this.popupComp = this.use('PopupComp', this.popupNode);
        this.sequence(HomeCommand.SHOW_POPUP, 'PopupComp');
        // CHÚ Ý: Nói chung không nhất thiết sử dụng hàm use(...) để tham chiếu. bản thân mỗi X9 component khi được kéo thả
        // vào editor đã tự động kết nối với nhau theo nhau. Khuyên nghị chỉ nên giao tiếp theo gửi nhận cmd(...).
    },    

    allowCommandTypes(){
        return [HomeCommand.CLICK_BUTTON, HomeCommand.SHOW_POPUP];
    },

    /**
     * State Data sẽ cập nhật trước sau đó mới đến view (hàm onUpdateView gọi sau)
     */
    onUpdateState(){
        switch(this.getStateType()){
            case HomeCommand.CLICK_BUTTON:
                // thay đổi thứ tự cập nhật view tương ứng từng StateType
                // Comp2 sẽ onUpdateView trước sau đó tới Comp1 và Comp3
                // this.sequence(HomeCommand.CLICK_BUTTON, 'Comp2', 'Comp1', 'Comp3');
                
                break;
            case HomeCommand.SHOW_POPUP:
                // 
                cc.director.getScene().addChild(this.popupNode);
                break;
        }
    },


    /**
     * 
     * @param {*} done  dạng Promise nên cần gọi done. 
     */
    onUpdateView(done){        
        switch(this.getStateType()){
            case HomeCommand.CLICK_BUTTON:
                cc.log( '<Update View> ' + this.constructor.name + '::' + this.getState().msg);

                
                break;
            // case HomeCommand.SHOW_POPUP:
            //     cc.director.getScene().addChild(this.popupNode);
            //     break;
            default:
                // luôn gọi done để tiếp tục các task khác trong trường hợp sử dụng squence
                done();
                break;
        }
        
        // done();
    },

    // update (dt) {        
    // },
});
