import {isToast,isLoadding,isHeader,bindphone,regPhone} from "@/common/state"
import httpBet from './http'
import storage from './localStorage'
const service = {
    //开启Toast
    openToast(flag,message){
        isToast.show = flag || true;
        isToast.title = message || '温馨提示';
    },
    //底部下注状态
    openHeader(flag){
        isHeader.show = flag;
    },
    //绑定手机号
    bindPhone(userid,type){
        bindphone.userid = userid || '';
        bindphone.type = type || '';
    },
    regPhone(nickname,phone,codes){
        regPhone.nickname = nickname || '';
        regPhone.phone = phone || '';
        regPhone.codes = codes || '';
    },
    //下注订单生成
   betOrder(params,callback,errorback){
        let paramsUp = JSON.stringify(params.up);
        let paramsDown = JSON.stringify(params.down);
        let paramsBettingLx = JSON.stringify(params.betting_lx);
        let info = {up:paramsUp,down: paramsDown,betting_lx:paramsBettingLx,award_date:storage.getItem('award_date')};
        //params.up = typeof(params.up) ==='string'?params.up:JSON.stringify(params.up);
        //params.down = typeof(params.down) ==='string'?params.down:JSON.stringify(params.down);
        //params.betting_lx = typeof(params.betting_lx) ==='string'?params.betting_lx:JSON.stringify(params.betting_lx);

        return new Promise((resolve, reject) => {
            httpBet("bet/bet_j",info,true).then(res=>{
                console.log(res);
                resolve(res);
            }, err => {
                reject(err);
            }) .catch((error) => {
                reject(error)
            })
        })    
  
    },
    //下注修改金额
    betMoneyOrder(params,money,callback,errorback){
        let paramsUp = JSON.stringify(params.up);
        let paramsDown = JSON.stringify(params.down);
        let paramsBettingLx = JSON.stringify(params.betting_lx);
        let info = {up:paramsUp,down: paramsDown,betting_lx:paramsBettingLx,money:money,out_trade_no:params.out_trade_no};
        return new Promise((resolve, reject) => {
            httpBet("bet/user_fast_bet",info,true).then(res=>{
                console.log(res);
                resolve(res);
            }, err => {
                reject(err);
            }) .catch((error) => {
                reject(error)
            })
        })
  
    }
}

export default service

