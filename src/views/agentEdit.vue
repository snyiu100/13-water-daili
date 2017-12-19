
<template>
  <div class="td-warp">
      <div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2" @click="$router.push('/agentList')">
					><span>代理列表</span>
				</div>
				<div class="clickaddnav createlevel2">
					><span>编辑</span>
				</div>
			</div>
		</div>
		<div class="agent_editbac" style="width: 100%;overflow: hidden;">
			<div class="pswnull" style="height:0.2rem;"></div>
			<div class="agent_editid"><p>代理ID</p><input type="text" disabled="disabled" v-model="this.$route.query.id"/></div>
			<div class="pswnull">基本信息</div>
			<div class="agent_edit_base">
				<div class="agent_flo">
					<p><span>*</span>姓名</p>
					<input type="text" v-model="info.agent_name" value="" />
				</div>
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo">
				<p><span>*</span>手机</p>
				<input type="text"  value="" v-model="info.agent_tel"/>
				</div>
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo" style="border: 0;">
				<p><span>*</span>微信</p>
				<input type="text" value="" v-model="info.wx_account"/>
				</div>
			</div>
		</div>
		<div class="nowwaycengbtn" @click="editinfo">
			提交
		</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        method: "editAgentInfo",
        agent_id: this.$route.query.id
      }
    };
  },
  created() {
    this.agentInfo();
  },
  methods: {
    agentInfo() {
      //修改前显示代理信息
      this.$http({}, this.info).then(data => {
        if (data.Code == 0) {
          this.info = {
            method: "editAgentInfo",
            agent_id: this.$route.query.id,
            agent_name: data.Data.agent_name,
            agent_tel: data.Data.agent_tel,
            wx_account: data.Data.wx_account
          };
          console.log(this.info);
        }
      });
    },
    editinfo() {
      //点击提交修改后的信息
      if (!this.info.agent_name) {
        this.toast("代理商姓名不能为空");
      } else if (!this.info.agent_tel) {
        this.toast("手机号不能为空");
      } else if (!this.info.wx_account) {
        this.toast("微信号不能为空");
      } else {
        this.$http({}, this.info).then(res => {
          if (res.Code == 0) {
            this.toast("修改成功");
          } else {
            this.toast(res.data.msg);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.phone-login {
  padding: 0 1rem;
  margin: 1rem auto 0;
}
.phone-login div:nth-child(1),
.phone-login div:nth-child(2) {
  border-bottom: 2px solid #ec504c;
}
.phone-login div input[type="text"],
.phone-login div input[type="password"] {
  background: transparent;
  font-size: 0.28rem;
  text-indent: 0.7rem;
  padding: 0.3rem 0;
  border: none;
  width: 90%;
}
.phone-login div span {
  position: absolute;
  cursor: pointer;
  height: 0.5rem;
  width: 0.5rem;
  position: absolute;
  right: 0px;
  top: 0.4rem;
  background: url("../assets/images/icon/pass.png") no-repeat center;
  background-size: 0.6rem;
}
.phone-login div span.active {
  background: url("../assets/images/icon/pass-active.png") no-repeat center;
  background-size: 0.6rem;
}
.regButton {
  padding: 0.2rem;
  width: 100%;
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
  color: #fff;
}
</style>