<template>
 <div class="td-warp">
		 <div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2" @click="$router.push('/userList')">
					><span>用户列表</span>
				</div>
				<div class="clickaddnav createlevel2">
					><span>搜索</span>
				</div>
			</div>
		</div>
			<div class="agent_editbac" style="width: 100%;">
			<div class="agent_edit_base agent_search" style="margin-top: 0.7rem;">
				<div class="agent_flo">
					<p>用户ID</p>
					<input type="text" value="" placeholder="请输入用户id" v-model="info.user_id" style="margin-left:1.3rem;"/>
				</div>
			</div>
			<div class="agent_edit_base agent_search">
				<div class="agent_flo">
					<p>用户姓名</p>
					<input type="text" value="" placeholder="请输入用户姓名" v-model="info.nick_name"/>
				</div>
			</div>
		</div>
		<div class="nowwaycengbtn" @click="getsearch">
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
      this.$router.push({ path: "/userList", query: this.info });
    }
  }
};
</script>