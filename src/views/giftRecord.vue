<template>
  <div class="td-warp" style="overflow:hidden;">
     <div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2">
					><span>赠送记录</span>
				</div>
			</div>
		</div>

    <div class="giftreord_btn">
      <div class="giftreord_btn_all" :class="parm.info_type=='all'?'checked':''" @click="searchinfo('all')">全部</div>
      <div class="giftreord_btn_all" :class="parm.info_type=='out'?'checked':''"@click="searchinfo('out')">转出</div>
      <div class="giftreord_btn_all" :class="parm.info_type=='in'?'checked':''"@click="searchinfo('in')">转入</div>
      <p class="Giftsend_search" @click="$router.push('/giftRecordsearch')">筛选</p>
    </div>
    <div class="clear"></div>
   <div id="wrapper" style=" position: relative; height:100%; overflow:hidden;">
	 <scroller :on-refresh="onRefresh" :on-infinite="onInfinite" ref="my_scroller">
			<div class="giftrecord_tboday">
				<div class="giftrecord_tboday_box" v-for="(vm,index) in lists" :key="index">
					<div class="giftrecord_logo">
						<div class="peopleid">{{vm.level=='user'?'玩家':'代理'}}</div>
							<p class="" v-if="vm.type=='out'">转出<em>{{vm.give_type=='gold'?'金豆':'钻石'}}</em>-{{vm.id}}<span>（{{vm.name}}）</span></p>
							<p class="" v-else>{{vm.id}}（<span>{{vm.name}}</span>）-{{vm.type=='out'?'转出':'转入'}}<em>{{vm.give_type=='gold'?'金豆':'钻石'}}</em></p>
							<p>{{vm.give_time|time}}</p>
					</div>
					<div class="zhuanruzhuanchu">
						<div class="zhuanru_type">{{vm.give_type=='gold'?'金豆':'钻石'}}</div>
						<p :style="vm.type=='in'?'color:red':''">{{vm.type=='in'?'+':'-'}}{{vm.give_num}}</p>
					</div>
					<div class="clear"></div>
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
        method: "giveRecords",
        page: 0,
        rows: 10,
        info_type: "all"
      },
      lists: [],
      hasmore: true
    };
  },
  created() {
    if (
      this.$route.query.goods_type ||
      this.$route.query.receiver_id ||
      this.$route.query.end ||
      this.$route.query.start ||
      this.$route.query.receiver_name ||
      this.$route.query.receiver_level
    ) {
      this.hasmore = true;
      this.parm.page = 0;
      this.parm.rows = 10;
      this.parm.receiver_id = this.$route.query.receiver_id;
      this.parm.goods_type = this.$route.query.goods_type;
      this.parm.receiver_name = this.$route.query.receiver_name;
      this.parm.start = this.$route.query.start;
      this.parm.end = this.$route.query.end;
      this.parm.receiver_level = this.$route.query.receiver_level;
    }
  },
  methods: {
    searchinfo(info_type) {
      this.parm.info_type = info_type;
      this.parm.page = 1;
      this.parm.rows = 10;
      this.hasmore = true;
      this.lists = [];
      this.$http({}, this.parm).then(res => {
        if (res.Code == 0) {
          this.lists = res.Data;
        }
      });
    },
    onRefresh(done) {
      //上拉加载
      this.searchinfo(this.parm.info_type);
      done(); // call done
    },
    onInfinite(done) {
      //下拉刷新
      if (!this.hasmore) {
        this.$refs.my_scroller.finishInfinite(2);
        return;
      }
      this.parm.page = this.parm.page + 1;
      this.$http({}, this.parm).then(res => {
        if (res.Code == 0) {
          if (this.parm.page <= res.pages) {
            this.lists = this.lists.concat(res.Data);
            done(); // call done
          } else {
            this.hasmore = false;
            this.$refs.my_scroller.finishInfinite(2);
          }
        } else {
          this.hasmore = false;
          this.$refs.my_scroller.finishInfinite(2);
        }
      });
    }
  }
};
</script>
<style scoped>
.giftrecord_tboday{padding-bottom: 40px;}
</style>

