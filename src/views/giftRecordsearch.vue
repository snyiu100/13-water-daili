<template>
  <div class="td-warp">
      <div class="index_nav">
			<div class="clickaddnavbox">
				<div class="index_home" @click="$router.push('/home')">
					<img src="../assets/img/u98.png" /> 代理后台
				</div>
				<div class="clickaddnav" style="width: 26%;" @click="$router.push('/giftRecord')">
					><span>赠送记录</span>
				</div>
				<div class="clickaddnav" style="width: 20%;">
					><span>筛选</span>
				</div>
			</div>
		</div>
		<div class="gift_form_box">
			<div class="gift_type">
				<span class="gift_type_title">道具类型</span>
				<input type="radio" name="radio1" id="alltype" v-model="info.goods_type" value=""/><label for="alltype">全部</label>
				<input type="radio" name="radio1" id="demond" style="margin-left:0 ;" v-model="info.goods_type" value="demond"/><label for="demond">钻石</label>
				<input type="radio" name="radio1" id="gold" style="margin-left:0 ;" v-model="info.goods_type" value="gold" /><label for="gold">金豆</label>
				<div class="clear"></div>
			</div>
			<div class="gift_type">
				<span class="gift_type_title">赠送对象</span>
				<input type="radio" name="radio2" id="caozuoall" v-model="info.receiver_level" value="" /><label for="caozuoall">全部</label>
				<input type="radio" name="radio2" id="gamer" v-model="info.receiver_level" value="user" style="margin-left:0 !important;" /><label for="gamer">玩家</label>
				<input type="radio" name="radio2" id="agent" v-model="info.receiver_level" value="agent" style="margin-left:0 ;" /><label for="agent">代理</label>
				<div class="clear"></div>
			</div>
			<div class="gift_type game_id" style="position: relative;">
				<span class="gift_type_title" style="height: 1rem;">赠送对象ID</span>
				<input type="text" value="" placeholder="请输入赠送对象ID搜素" style="width: 60% !important;padding-left:0.3rem;" v-model="info.receiver_id"/>
				<!-- <img src="../assets/img/u56.png" class="positionimg" /> -->
				<div class="clear"></div>
			</div>
			<div class="gift_type game_id" style="position: relative;border: 0;">
				<span class="gift_type_title" style="height: 1rem;">赠送对象名称</span>
				<input type="text" value="" placeholder="请输入赠送对象名称搜素" style="width: 60% !important;padding-left:0;" v-model="info.receiver_name"/>
				<!--<img src="img/u56.png" class="positionimg" />-->
				<div class="clear"></div>
			</div>

		</div>
		<div class="gift_search_bbox">
			<div class="gift_type game_id" style="position: relative;">
				<span class="gift_type_title" style="height: 1rem;">开始时间</span>
				<input type="date" name="" id="date" value="" placeholder="请选择时间" style="width: 60% !important;" v-model="info.start"/>
				<!--<img src="img/u56.png" class="positionimg" />-->
				<div class="clear"></div>
			</div>
			<div class="gift_type game_id" style="position: relative;">
				<span class="gift_type_title" style="height: 1rem;">结束时间</span>
				<input type="date" name="" id="dade1" value="" placeholder="请选择时间" style="width: 60% !important;" v-model="info.end"/>
				<!--<img src="img/u56.png" class="positionimg" />-->
				<div class="clear"></div>
			</div>
			<div class="nowwaycengbtn" @click="searchRecord">
				查询
			</div>
		</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {

      }
    };
  },
  created() {},
  methods: {
    searchRecord() {
      this.$router.push({ path: "/giftRecord", query: this.info });
    }
  }
};
</script>

<style scoped>
.clickaddnav {
  padding: 0;
}
</style>
