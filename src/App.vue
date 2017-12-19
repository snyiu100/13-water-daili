<template>
  <div id="app">
    <router-view></router-view>
    <td-toast v-model="toast.show" :title="toast.title"></td-toast>
    <td-loadding v-model="loadding.show" :text="loadding.text" :type="loadding.type"></td-loadding>
  </div>
</template>
<script>
/**
 * rem
 */
(function (doc, win) {
    var docEl = doc.documentElement,size=750,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=750){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / size) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


import {isLoadding,isToast} from "@/common/state"
export default {
  name: 'app',
  data(){
    return {
      toast:isToast,
      loadding:isLoadding,
    }
  }
}
</script>

<style lang="scss">

@import './assets/css/public.css';
@import './assets/css/style.css';

    .bet-kj{
      height: .38rem; position: relative; font-size:.28rem; padding: .25rem;
      ul{ position: absolute; right:.2rem; top:.25rem;
        li{height:0.4rem; width:0.4rem; float: left; margin-left:0.2rem; font-size:.2rem; border-radius: 50%; background-color:#dd2638; color:#fff; line-height: .4rem; text-align: center;
          &.jia{background-color: transparent; color:#333;margin-left:0px;}
        }
      }
    }

    .bet-tez{
        ul{
          width:100%;
          li{ float: left; width:20%;}
          &.bet-tez-check{
             li{cursor: pointer; background: url('./assets/images/icon/check.png') no-repeat left center; font-size:.24rem; text-indent: .38rem; padding:.20rem 0px; background-size: .35rem;
              &.active{background: url('./assets/images/icon/checked.png') no-repeat left center;  background-size: .35rem;}
            }
          }
        }
    }

    
  .h-tile{ padding:0.17rem 0; border-bottom:1px solid #eee; margin-left:0.2rem;
    span{border-left:3px solid #dd2638; font-size:.28rem; color:#333;padding-left: 5px; font-weight: bold;}
  }
</style>
