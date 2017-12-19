<template>
  <div class="td-warp">
     <div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2">
					><span>代理列表</span>
				</div>
				<div class="hellouser" style="margin: 0;" @click="$router.push('/agentSearch')">
					<span class="agentshuaixuan">筛选</span>
				</div>
			</div>
		</div>
		<div id="wrapper">
		 <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" ref="my_scroller" style=" margin-top:1rem;" >
				<div class="agentlist_box">
					<div class="list_tbody">
						<div class="agent_list_imfo" v-for="(vm,index) in lists" :key="index">
							<div class="agentlist_name">
								<p>{{vm.id}}({{vm.agent_name}})</p>
								<p>{{vm.add_time|time}}</p>
								<div class="clear"></div>
								<p class="lastgold">剩余金豆 {{vm.gold}}</p>
								<p class="lastgold">剩余钻石 {{vm.demond}}</p>
							</div>
							<div class="agentlist_edit" @click="jump('agentEdit',vm)">
								编辑
							</div>
						</div>
					</div>
				</div>
			 </scroller>
		</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      parm: {
        method: "getAgentList",
        page: 0,
        rows: 10
      },
      lists: [],
      hasmore: true
    };
  },
  created() {
    if (this.$route.query.agent_id || this.$route.query.agent_name) {
      this.hasmore = true;
      this.parm.page = 0;
      this.parm.rows = 10;
      this.parm.agent_id = this.$route.query.agent_id;
      this.parm.agent_name = this.$route.query.agent_name;
    }
  },
  methods: {
    searchAgent() {
      this.$http({}, this.parm).then(res => {
        if (res.Code == 0) {
          this.lists = this.lists.concat(res.Data);
          done(); // call done
        } else {
          this.$refs.my_scroller.finishInfinite(2);
        }
      });
    },
    onRefresh(done) {
      this.parm.page = 0;
      done(); // call done
    },
    onInfinite(done) {
      if (!this.hasmore) {
        this.$refs.my_scroller.finishInfinite(2);
        return;
      }
      this.parm.page = this.parm.page + 1;
      this.$http({}, this.parm).then(res => {
        if (res.Code == 0) {
          this.lists = this.lists.concat(res.Data);
          done(); // call done
        } else {
          this.hasmore = false;
          this.$refs.my_scroller.finishInfinite(2);
        }
      });
    },
    jump(html, vm) {
      this.$router.push({ path: "/" + html, query: { id: vm.id } });
    }
  }
};
</script>