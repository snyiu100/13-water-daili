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
					><span>筛选</span>
				</div>
			</div>
		</div>
		<div class="agent_editbac" style="width: 100%;">
			<div class="agent_edit_base agent_search" style="margin-top: 0.7rem;">
				<div class="agent_flo">
					<p style="width: 1.1rem;">代理ID</p>
					<input type="text" placeholder="请输入代理id" value="" v-model="info.agent_id"/>
				</div>
			</div>
			<div class="agent_edit_base agent_search">
				<div class="agent_flo" style="border: 0;">
					<p style="width: 1.1rem;">姓名</p>
					<input type="text" placeholder="请输入代理姓名" value="" v-model="info.agent_name"/>
				</div>
			</div>
		</div>
		<div class="nowwaycengbtn" style="margin-top:5rem;" @click="getsearch">
			查询
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
  created() {},
  methods: {
    getsearch() {
      // if (!this.info.agent_id || !this.info.agent_name) {
      //   this.toast("ID或名称为空");
      //   return;
      // }
      this.$router.push({ path: "/agentList", query: this.info });
    }
  }
};
</script>