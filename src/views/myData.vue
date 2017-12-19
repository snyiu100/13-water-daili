<template>
  <div class="td-warp">
	  	<div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2">
					><span>我的资料</span>
				</div>
			</div>
		</div>
     <div class="mymsg">
			<div class="myzhanghao">
				账号信息
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>代理ID</p>
					<input type="text" disabled="disabled" v-model="info.id"/>
				</div>
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>代理账号</p>
					<input type="text" disabled="disabled" v-model="info.agent_account"/>
				</div>
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>所属代理</p>
					<input type="text" disabled="disabled" v-model="info.belong_agent_name"/>
				</div>
			</div>	
			<div class="myzhanghao">
				道具详情
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>剩余钻石数</p>
					<input type="text" disabled="disabled" v-model="info.demond"/>
				</div>
			</div>	
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p>剩余金豆数</p>
					<input type="text" disabled="disabled" v-model="info.gold"/>
				</div>
			</div>	
			<div class="myzhanghao">
				基本信息（可修改）
			</div>
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p><span>*</span>姓名</p>
					<input type="text"  value="" v-model="info.agent_name" />
				</div>
			</div>	
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p><span>*</span>手机</p>
					<input type="tel"  value="" v-model="info.agent_tel"/>
				</div>
			</div>	
			<div class="agent_edit_base">
				<div class="agent_flo agent_flop">
					<p><span>*</span>微信</p>
					<input type="text"  value="" v-model="info.wx_account"/>
				</div>
			</div>	
		</div>
		<div class="nowwaycengbtn" @click="submitdata">
			提交
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.initdata();
  },
  methods: {
    initdata() {
      this.$http({}, { method: "getSelfInfo" }).then(data => {
        if (data.Code == 0) {
          this.info = data.Data;
          this.method = "getSelfInfo";
					if(this.info.belong_agent_name==""){
						this.info.belong_agent_name='无';
					}
        }
      });
    },
    submitdata() {
      if (
        !this.info.agent_name ||
        !this.info.agent_tel ||
        !this.info.wx_account
      ) {
        this.toast("请完善信息");
      } else {
        this.$http(
          {},
          {
            method: "getSelfInfo",
            agent_name: this.info.agent_name,
            agent_tel: this.info.agent_tel,
            wx_account: this.info.wx_account
          }
        ).then(data => {
          if (data.Code == 0) {
            this.toast("修改成功");
          } else {
            this.toast("修改失败，请联系后台开发人员");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.agent_edit_base input {
  margin-left: 0;
}
</style>

