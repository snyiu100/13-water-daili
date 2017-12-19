<template>
    <div class="td-footer">
        <router-link  to="/home"><i class="nav-home"></i><p>首页</p></router-link>
        <router-link  to="/betTeMa/1" :class="routerActive?'router-link-active':''"><i class="nav-gfit"></i><p>下注</p></router-link>
        <router-link  to="/lotteryIndex"><i class="nav-bet"></i><p>开奖</p></router-link>
        <router-link  to="/userIndex"><i class="nav-user"></i><p>我的</p></router-link>
    </div>
</template>

<script>
import {isHeader} from "@/common/state"
import service from '@/common/service'
export default {
    data(){
        return{
            routerActive:isHeader.show,
            routerArr:['/betLianMa','/betLianMa','/betzhengMaSix','/height','/betQuanBuZhong','/betQuanBuXuan','/betHeXiao','/betWeiShuLian','/betBanBo','/betTeMaShengXiao','/betYiXiao','/betWeiShu','/betTeMa/1','/betTeMa/2','/betzhengMaZhengA/3','/betzhengMaZhengA/4','/betZhengMaTe','/betZhengMaSix','/betShengXiaoLian']
        }
    },
    watch:{
        $route(to,from){
            if(this.routerArr.indexOf(to.path) > -1){
                this.routerActive=true;
            }else{
                this.routerActive=false;           
            }   
        }
    },
    created(){
        if(this.routerArr.indexOf(this.$route.path) > -1){
            this.routerActive=true;
        }else{
            this.routerActive=false;           
        }
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.td-footer{
  border-top: 1px solid #dfdfdf; z-index:770; height: 50px; bottom: 0; position: fixed; width: 100%; display: flex;  background: #fff;
  i{height:22px; background-size: contain; margin:0px auto; width:22px; display: block; background-repeat: no-repeat;
    @each $animal in home,gfit,bet,user{
        &.nav-#{$animal}{background-image:url('../assets/images/home/#{$animal}.png')}

    }
  }
  
  a{ -webkit-box-flex: 1; padding-top:5px; -webkit-flex: 1;  flex: 1;text-align: center; color:#000;
    p{font-size: 12px; line-height: 25px; color:#000}
     &.router-link-active{ 
       background-color: #007acc;
       i{
          @each $animal in home,gfit,bet,user{
              &.nav-#{$animal}{background-image:url('../assets/images/home/#{$animal}-active.png')}
          }
       }
        p{color:#fff}
     }
  } 
}
</style>
