<template>
  <div class="td-warp">
					<div class="index_nav">
						<div class="clickaddnavbox">
							<div class="index_home">
								<img src="../assets/img/u98.png"/> 代理后台
							</div>
							<div class="clickaddnav">
							</div>
							<div class="hellouser">
								<span>hello,{{name}}</span>
							</div>
						</div>
					</div>
   				 <div class="index_nav_choose">
						<ul class="nav_chooseul">
							<li class="clickli" data="PropsGifts" html="道具赠送" @click="jump('propsGifts')" >
								<p class="nav_li_p"><img src="../assets/img/u78.png" class="nav_firstimg nav_img_show">&nbsp;&nbsp;道具赠送</p>
								<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
								<img src="../assets/img/u178.png" class="nav_changeimg">
								<div class="clear"></div>
							</li>
							<li class="clickli" data="GiftRecord" html="赠送记录" @click="jump('giftRecord')">
								<p class="nav_li_p"><img src="../assets/img/u84.png" class="nav_firstimg nav_img_show">&nbsp;&nbsp;赠送记录</p>
								<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
								<img src="../assets/img/u178.png" class="nav_changeimg">
								<div class="clear"></div>
							</li>
							<li class="clicklidaili"　@click="status=!status">
								<p class="nav_li_p" :style="status?'color:#ccc':'color:#000'"><img src="../assets/img/u72.png" class="nav_firstimg nav_img_show">&nbsp;&nbsp;代理管理</p>
								<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;" :style="status?'display:none':''">
								<img src="../assets/img/u178.png" class="nav_changeimg" :style="status?'display:block':''">
								<div class="clear"></div>
								<div class="nav_xialadiv" :style="status?'display:block':''">
									<ul>
										<li class="clickli libottom" data="CreateAgent" html="创建代理" @click="jump('createAgent')">
											<p class="nav_li_p">&nbsp;&nbsp;创建代理</p>
											<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
											<img src="../assets/img/u178.png" class="nav_changeimg">
											<div class="clear"></div>
										</li>
										<li class="clickli" data="AgentList" html="代理列表" @click="jump('agentList')">
											<p class="nav_li_p">&nbsp;&nbsp;代理列表</p>
											<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
											<img src="../assets/img/u178.png" class="nav_changeimg">
											<div class="clear"></div>
										</li>
									</ul>
								</div>
							</li>
							<li class="clickli" data="UserList" html="用户管理" @click="jump('userList')">
								<p class="nav_li_p"><img src="../assets/img/u158.png" class="nav_firstimg nav_img_show">&nbsp;&nbsp;用户管理</p>
								<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
								<img src="../assets/img/u178.png" class="nav_changeimg">
								<div class="clear"></div>
							</li>
							<li class="clickli" data="MyData" html="我的资料" @click="jump('myData')">
								<p class="nav_li_p"><img src="../assets/img/u90.png" class="nav_firstimg nav_img_show">&nbsp;&nbsp;我的资料</p>
								<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
								<img src="../assets/img/u178.png" class="nav_changeimg">
								<div class="clear"></div>
							</li>
							<li class="clickli" data="ChangePsw" html="修改密码" @click="jump('changePsw')">
								<p class="nav_li_p"><img src="../assets/img/u96.png" class="nav_firstimg nav_img_show">&nbsp;&nbsp;修改密码</p>
								<img src="../assets/img/u166.png" class="nav_changeimg nav_img_show" style="margin-top: 0.2rem;">
								<img src="../assets/img/u178.png" class="nav_changeimg">
								<div class="clear"></div>
							</li>
							<div class="exitbtn index_exit_btn" id="eeee" @click="isconfirm=!isconfirm">退出</div>
						</ul>
					</div>
       </td-warp>
			 <td-confirm v-model="isconfirm" title="温馨提示" @on-confirm="logOut">确定要退出吗？</td-confirm>
  </div>
</template>

<script>
import storage from "@/common/localStorage";
export default {
  data() {
    return {
      parm: {
        method: "logOut"
      },
      isconfirm: false,
      status: false,
      name: storage.getItem("agent_account")
    };
  },
  created() {},
  methods: {
    jump(sign) {
      this.$router.push({ path: "/" + sign });
    },
    logOut() {//退出登录
      this.$http({}, this.parm).then(data => {
        if (data.Code == 0) {//退出成功后先清除原先的登录记录，然后再重新登录
          storage.deleteItem("agent_account");
          storage.deleteItem("agent_password");
          this.$router.push("/login");
        }else{
					this.toast('退出失败，请联系后台开发人员');
				}
      });
    }
  }
};
</script>
<style scoped>
.exitbtn {
  width: 94%;
}
.hellouser {
  margin-top: -0.7rem;
}
</style>
