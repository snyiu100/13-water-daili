<template>
  <div class="td-toast" @touchmove="onTouchMove">
     <transition name="vux-mask">
         <div class="weui-mask" @click="_onHide" v-show="show"></div>
     </transition>  
     <transition name="vux-popup-animate-bottom">
        <div class="td-popup-dialog" v-show="show">
            <div class="bdshare-title">分享到</div>
            <div class="bdshare">
                <a href="javascropt:void(0)" class="gbRes_2" data-cmd="weixin" title="微信朋友圈" @click="wxSharePyq()"><p>微信朋友圈</p></a>
                <a href="javascropt:void(0)" class="gbRes_2" data-cmd="weixin" @click="wxShare()" title="微信好友"><p>微信好友</p></a>
                <a href="javascropt:void(0)" class="gbRes_3" data-cmd="sqq" @click="qqhy()"  title="QQ"><p>QQ</p></a>
                <a href="javascropt:void(0)" class="gbRes_4" data-cmd="tqq" @click="qqZone()" title="QQ空间"><p>QQ空间</p></a>
          </div>

        </div>
    </transition> 
  </div>
</template>
<script>
import Sdk from '@/common/sdk'
export default {
  props: {
     value: {
       type: Boolean,
       default: false
     },
     info:{
         type:Object
     }
  },
  data () {
    return {
      show: false,
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  watch: {
    value (val) {
      this.show = val
    }
  },
  methods: {
    onTouchMove (event) {
      !this.scroll && event.preventDefault()
    },
    _onHide(){
        this.show = false
        this.$emit('input', false)
        this.$emit('on-hide')
    },
    //微信朋友圈
    wxSharePyq(){
       let  params = {
             message: {
                title: this.info.title,
                description: this.info.content,
                mediaTagName: '',
                thumb: this.info.img,
                media: {
                    type: Sdk.Wechat.Type.WEBPAGE,   // webpage
                     webpageUrl: this.info.url ,   // webpage
                }
             },
             scene: Sdk.Wechat.Scene.TIMELINE   // share to Timeline
       }
        document.addEventListener("deviceready",Sdk.Wechat.share(params,function(data){
            alert(data);
        },function(err){
            alert(err);
        }))
    },
    //微信朋友
    wxShare(){
       let  params = {
             message: {
                title: this.info.title,
                description: this.info.content,
                mediaTagName: '',
                thumb: this.info.img,
                media: {
                    type: Sdk.Wechat.Type.WEBPAGE,   // webpage
                    webpageUrl: this.info.url,    // webpage
                }
             },
             scene: Sdk.Wechat.Scene.SESSION   // share to Timeline
       }
        document.addEventListener("deviceready",Sdk.Wechat.share(params,function(data){
            alert(data);
        },function(err){
            alert(err);
        }))
    },
    //QQ好友
    qqhy(){
        let args = {};
            args.client = Sdk.Qq.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            args.scene = Sdk.Qq.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            args.url = this.info.url;
            args.title = this.info.title;
            args.description = this.info.content;
            args.image = this.info.img;

        document.addEventListener("deviceready",Sdk.Qq.shareNews(function () {
              alert('shareAudio success');
        }, function (failReason) {
              alert(failReason);
        }, args));
    },
    //qq空间
    qqZone(){
        let args = {};
            args.client = Sdk.Qq.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
            args.scene = Sdk.Qq.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            args.url = this.info.url;
            args.title = this.info.title;
            args.description = this.info.content;
            args.image = this.info.img;
        document.addEventListener("deviceready",Sdk.Qq.shareNews(function () {
             alert('shareAudio success');
        }, function (failReason) {
             alert(failReason);
        }, args));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bdshare a{
    width:33.3%;
    float: left;
    text-align: center;
    font-size: 12px;
    padding: 35px 0 0 0;
    line-height: normal;
    height: auto;
    cursor: pointer;
    margin: 10px 0;
    position: relative;
    color:#656565;
}
.bdshare a{line-height: 0.25rem;}
.bdshare a:after{
    content: " ";
    width:30px;
    height:30px;
    position: absolute;
    left: 50%;
    top: 0px;
    -webkit-transform: translate(-50%,0);
    transform: translate(-50%,0);
}
.bdshare-title{ padding: .2rem 0; font-size:.28rem; text-align: center; border-bottom:1px solid #efefef;}
.bdshare a.gbRes_2:after{
    background: url("../assets/images/share/gbRes_2.png") no-repeat; background-size: 100%;
}
.bdshare a.gbRes_3:after{
    background: url("../assets/images/share/gbRes_3.png") no-repeat; background-size: 100%;
}
.bdshare a.gbRes_4:after{
    background: url("../assets/images/share/gbRes_4.png") no-repeat; background-size: 100%;
}


</style>
