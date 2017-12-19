
<template>
  <div class="td-warp">
    <div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2">
					><span>修改密码</span>
				</div>
			</div>
		</div>
       <div class="mymsg">
			<div class="myzhanghao">
				登录密码(为空表示不修改)
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>原密码</p>
					<input type="password" placeholder="请输入原密码" value="" v-model="info.old_password"/>
				</div>
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>新密码</p>
					<input type="password" placeholder="请输入新密码" value="" v-model="info.new_password"/>
				</div>
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>确认密码</p>
					<input type="password" placeholder="确认新密码" value="" v-model="asure_password"/>
				</div>
			</div>	
		</div>
		<div class="nowwaycengbtn" style="margin-top: 5rem;" @click="passChange">
			提交
		</div>
  </div>
</template>

<script>
import storage from "@/common/localStorage";
export default {
  data() {
    return {
      info: {
        method: "editPassword",
        old_password: "", //旧密码初始时为空
        new_password: "" //新密码  初始时为空
      },
      asure_password: "" //确认密码
    };
  },
  methods: {
    passChange() {//修改密码
      if (this.info.old_password && this.info.new_password && this.asure_password) {//所有输入都存在的情况
          if (this.info.old_password != storage.getItem("agent_password")) {//判断原密码是否输入正确
            this.toast("原密码不正确");
          } else if (this.info.new_password != this.asure_password) {//判断二次确认密码是否与新密码一致
            this.toast("两次新密码不一致");
          } else {//确认提交修改
            this.$http({}, this.info).then(data => {
              if (data.Code == 0) {//修改成功后先清除原先的登录记录，然后再跳首页重新登录
                storage.deleteItem("agent_account");
                storage.deleteItem("agent_password");
                this.toast("修改成功，请重新登录");
                this.$router.push("/login");
              } else {
                this.toast('修改失败');
              }
            });
          }
      }else if(!this.info.old_password && !this.info.new_password && !this.asure_password){//所有输入都不存在的情况下
           this.toast('不输入表示不修改当前登录密码');
      }else{//所有输入有的为空，有的不为空
         this.toast('所有的输入要么全都不为空要么全都为空');
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.agent_edit_base input {
  margin-left: 0;
}
</style>
