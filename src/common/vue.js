import Vue from 'vue'
import {isToast,isLoadding} from "@/common/state"
import VueScroller from 'vue-scroller'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import TdHeader from '@/components/header'
import TdFooter from '@/components/footer'
import TdToast from '@/lib/toast'
import TdWarp from '@/lib/warp'
import TdLoadding from '@/components/loadding'
import TdConfirm from '@/components/confirm'



Vue.use(VueAwesomeSwiper)
Vue.use(VueScroller)

//全局注册组件
Vue.component('td-header', TdHeader);     //注册header
Vue.component('td-footer', TdFooter);    //注册footer
Vue.component('td-toast', TdToast);        //注册toast组件
Vue.component('td-loadding', TdLoadding); //注册loadding
Vue.component('td-confirm', TdConfirm);  //注册confirm
Vue.component('td-warp', TdWarp);

//判断是否是安卓
Vue.prototype.isAndroid =  navigator.userAgent.match(/Android/i) ? true : false;
//判断是否是iOS
Vue.prototype.isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
//判断是否是微信
Vue.prototype.isWx =  navigator.userAgent.match(/micromessenger/i) ? true : false;

//提示toast
Vue.prototype.toast = function(message){
   isToast.show = true;
   isToast.title = message || '温馨提示';
}

//提示loading
Vue.prototype.loadding = function(option){
    console.log(option);
    if (typeof option == "undefined") {
        option = {};
    }
    isLoadding.type = option.type || '';
    isLoadding.show = option.show;
    isLoadding.text = option.text;
    console.log(isLoadding);
}

export default Vue