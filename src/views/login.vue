<template>
<div class="login_body">
		<h1>代理后台登录</h1>
		<div class="login_usermasg">
			<div class="login_haoma login_userbottom">
				<p>账号</p>
				<input type="text" name="" id="username" value="" v-model="info.agent_account" placeholder="请输入账号" @focus="show=false"/>
				<img src="../assets/img/u56.png" class="usernameimg" :style="show?'display:block;':''"/>
			</div>
			<div class="login_haoma">
				<p>密码</p>
				<input type="password" name="" id="userpassword" value="" v-model="info.agent_password" placeholder="请输入密码" @focus="show=false"/>
				<img src="../assets/img/u56.png" class="userpaseimg" :style="show?'display:block;':''"/>
			</div>
		</div>
		<div class="login_tishi">
			<p class="hidetishi" :style="show?'display:block;':''">密码和账户名不匹配！</p>
		</div>
		<div class="login_login" @click="login">登录</div>
	</div>
</template>
<script>
import storage from '@/common/localStorage'
export default {
  data() {
    return {
      info: {
        method: "login"
      },
      show:false
    };
  },
  methods: {
    login() {
      if (!this.info.agent_account) {
        this.toast("用户名不能为空");
      } else if (!this.info.agent_password) {
        this.toast("密码不能为空");
      } else {
        this.$http({}, this.info).then(res => {
          if (res.Code == 0) {
            storage.setItem("agent_account", this.info.agent_account);
            storage.setItem("agent_password", this.info.agent_password);
            this.$router.push({ path: "/home" });
          } else {
            // this.toast(res.Data.msg);
            this.show=true;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.frame {
  border: 2px solid #ec504c;
  border-radius: 5px;
}
.btn {
  text-align: center;
  padding: 0.2rem;
  border-radius: 5px;
  background: -webkit-linear-gradient(
    left,
    #de2839,
    #fe8263
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    right,
    #de2839,
    #fe8263
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    right,
    #de2839,
    #fe8263
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #de2839, #fe8263); /* 标准的语法（必须放在最后） */
}
.logo {
  width: 60%;
  margin: 0 auto;
}
.logo img {
  width: 100%;
}
.login_register {
  width: 70%;
  margin: 0 auto;
}
.login_register a {
  display: block;
  color: #ffffff;
}
.login_logina {
  width: 70%;
  margin: 0.2rem auto 0;
}
.login_logina a {
  padding: 0.15rem 0.1rem 0.15rem 0.6rem;
  color: #666666;
  font-size: 0.28rem;
}
.so_login {
  width: 35%;
  float: left;
  background: url(../assets/images/login/social.png) no-repeat scroll 2px center;
  background-size: 0.5rem;
}
.po_login {
  width: 30%;
  float: right;
  background: url(../assets/images/login/po.png) no-repeat scroll 2px center;
  background-size: 0.5rem;
}
.login_popup {
  width: 100%;
  padding: 0.1rem 0;
  box-shadow: 0 0 10px 3px #eaeaea;
  background: #ffffff;
  position: absolute;
  top: 44%;
  left: 0;
  margin-top: -0.5rem;
}
.login_popup p {
  text-align: center;
  color: #666666;
  font-size: 0.3rem;
}
.login_popup_content {
  position: relative;
}
.login_popup_content a.X {
  position: absolute;
  top: 0px;
  right: 0;
  width: 8%;
  height: 8%;
}
.login_popup_content a.X img {
  width: 100%;
}
.qq,
.weix {
  width: 30%;
  display: inline-block;
}
.qq img,
.weix img {
  width: 100%;
}
.weix {
  margin-left: 1rem;
}
.login_popup_img {
  width: 50%;
  margin: 0 auto;
}
.so_iocn {
  width: 1.5%;
  height: 1.5%;
  background: url(../assets/images/login/social.png) no-repeat scroll;
  background-size: 100%;
  display: inline-block;
}
.po_iocn {
  width: 1.5%;
  height: 1.5%;
  background: url(../assets/images/login/po.png) no-repeat scroll;
  background-size: 100%;
  display: inline-block;
}
</style>