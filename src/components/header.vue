<template>
  <div class="tb-header-warp clearfix">
    <div class="tb-header" :class="isIOS?'iosTop':''">
      <div class="tb-header-left go-back" v-if="showBack" @click="goBack()"></div>
      <div class="tb-header-left" v-else><slot name="left"></slot></div>
      <div class="tb-header-title" v-if="downShow" @click="onDownShow()" :class="show?'active':''">{{title}}</div>
      <div class="tb-header-title" v-else>{{title}} </div>
      <div class="tb-header-right"><slot name="right"></slot></div>
    </div>
  </div>
</template>
<script>
import service from '@/common/service'
export default {
  props:{
    downShow:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:"六合彩"
    },
    showBack:{
      type:Boolean,
      default:true
    },
    preventGoBack:{
      type:Boolean,
      default:false
    }
  },
  data () {
    return {
      path:'',
      show: false,
    }
  },
  created(){
    this.path = '#'+this.$route.path;
  },
  watch:{
    //监听路由Url地址
    $route (to,from){
      this.path = '#'+to.path;
    }
  },
  methods:{
    _onHide(){
        this.show = false
    },
    //返回上一页
    goBack(){
      if (this.preventGoBack) {
        this.$emit('go-back');
      } else {
        this.$router ? this.$router.back() : window.history.back();
      }
    },
    onDownShow(){
      this.show =! this.show;
    },
     onTouchMove (event) {
      !this.scroll && event.preventDefault()
    },
    //点击跳转方法
    go (url, $router) {    
        this.show = false;
        if (/^javas/.test(url) || !url) return
        const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
        if (useRouter) {          
          $router.push(url)
        } else {
          window.location.href = url
        } 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 20 32-->
<style scoped>
  .tb-header{ line-height: 44px; height: 44px;  background-color: #007acc; display: flex; width:100%; }
  .tb-header-title{ margin: auto; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size:16px; color:#fff;}
  .tb-header-left,.tb-header-right{ position: absolute; display: block; font-size: 0.24rem; color: #fff; }
  .tb-header .tb-header-right {right: 15px; font-size:14px;}
  .tb-header .tb-header-left {left: 15px; min-width:0.6rem; cursor: pointer}
  .tb-header .tb-header-right a{color:#fff; text-decoration: none;}
  .go-back{text-align:center;background:url('../assets/images/icon/left.png') left center no-repeat; height:0.88rem; background-size: .2rem .32rem;}
</style>
