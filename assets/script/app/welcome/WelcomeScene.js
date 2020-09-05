const HotupdateComponent = require('HotupdateComponent');
const HotupdateCommand = require('HotupdateCommand');
import {SCENE_NAME} from 'setting';

cc.Class({
    extends: HotupdateComponent,

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._super();
        
        this.startLoadingResource();
        this.test();
        // Object.create(null)
    },

    /**
     * 
     * @param {*} newState 
     */
    onUpdateView(done){
        // override
        let type = this.getStateType() ;
        switch(type){
            case HotupdateCommand.HOTUPDATE_SKIPPED:
            case HotupdateCommand.ALREADY_UP_TO_DATE:
                cc.director.loadScene(SCENE_NAME.HOME);
                return false;
                break;
        }
        done();
    },


    // onPrivateCommand(newState){
    //     // override 
    //     cc.log("\n --- private: \n " +JSON.stringify(newState));
    //     return true;
    // },
    

    // update (dt) {
        
    // },
});
