// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from './vue'
import axios from 'axios'
import qs from 'qs'
import storage from '@/common/localStorage'
import {isLoadding} from "@/common/state"
let timeClose = null;

/* 反向代理配置 解决跨域问题axios配置 */
const instance = axios.create({

  baseURL: 'http://game.php0.jxcraft.net/game/13-water/game/agent.php',  //配置接口地址 打包时要改回
  //  baseURL: 'http://localhost:8080/api',  //配置接口地址 线下测试使用

  timeout: 20000,  //响应时间
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',  //配置请求头
      'Accept': 'application/json'
  }
});


//POST传参序列化(添加请求拦截器)
instance.interceptors.request.use((config) => {

  //在发送请求之前做某件事
    //if(config.method  === 'post'){
    //     config.data = qs.stringify(config.data);
    // }
    return config;
},(error) =>{
     //_.toast("错误的传参", 'fail');
    //return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
instance.interceptors.response.use((res) =>{
    // if(res.code==500){//后台错误
    //     Obj.dialog(data.message);
    // };
	//对响应数据做些事
    if(!res.data.success){
        // _.toast(res.data.msg);
       // return Promise.reject(res);
    }
    return res;
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break;
      case 401:
        err.message = '未授权，请登录'
        break;
      case 403:
        err.message = '拒绝访问'
        break;
      case 404:
        err.message = `请求地址出错`
        break;
      case 408:
        err.message = '请求超时408'
        break;
      case 500:
        err.message = '服务器内部错误500'
        break;
      case 501:
        err.message = '服务未实现501'
        break;   
      case 502:
        err.message = '网关错误502'
       break; 
      case 503:
        err.message = '服务不可用503'
        break;
      case 504:
        err.message = '网关超时504'
        break;
      case 505:
        err.message = 'HTTP版本不受支持505'
      default:
        break;
    }
    onLoadding(true,err.message,'error');
  }
});



function onLoadding(show,text,type){
  
    isLoadding.show = show;
    isLoadding.text = text;
    isLoadding.type = type; 
    timeClose = setTimeout(() => {
      onLoadding(false,'加载中','loadding');
      window.clearTimeout(timeClose);
    }, 3000);
}


//返回一个Promise(发送post请求)
/**
 * option.method  类型  post
 * option.url   地址
 * option.auth  登录用户唯一标识  false
 * option.load  loadding  false
 * **/
export default function http(option, params) {

    let state = false;
    if(typeof option == 'undefined'){
       option = {};
    }

    option.auth = option.auth || false;
    option.load = option.load || false;
    option.method = option.method || 'post';
    if(option.load){
       onLoadding(true,'加载中','loadding');
    }
    if(option.auth){
        //params.customerUserId = storage.getItem('userId') || '';   //用户id
        params.userLevel= storage.getItem('user_level') || params.level;    //等级
        params.userId = storage.getItem('user_id') || '';   
        params.id = storage.getItem('user_id') || '';    
    }

    return new Promise((resolve, reject) => {
      // axios.post(option.url, params)
      instance({method:option.method,data:qs.stringify(params)}).then(response => {
               if(option.load){  
                 setTimeout(function (){
                    onLoadding(false,'加载中','loadding');
                 }, 500);
               }
               resolve(response.data);
           }, err => {
             onLoadding(true,'请求超时','error');
               reject(err);
           })
           .catch((error) => {
             reject(error)
           })
     })

}

