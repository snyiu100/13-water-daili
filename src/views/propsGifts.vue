<template>
 <div class="indexbox" style="width: 100%;">
			<div class="indexbox">
				<div class="indexbox200">
					<div class="index_nav">
						<div class="clickaddnavbox">
							<div class="index_home" @click="$router.push('/home')">
								<img src="../assets/img/u98.png" /> 代理后台
							</div>
							<div class="clickaddnav">
								><span>道具赠送</span>
							</div>
						</div>
					</div>
					<div class="gift_form_box">
						<div class="gift_type">
							<span class="must">*</span>
							<span class="gift_type_title">道具类型</span>
							<input type="radio" name="golddemond" id="demond" value="demond" v-model="info.goods_type" @click="showNum"/><label for="demond">钻石</label>
							<input type="radio" name="golddemond" id="gold" value="gold" v-model="info.goods_type" @click="showNum"/><label for="gold">金豆</label>
							<div class="clear"></div>
						</div>
						<div class="gift_type use_type">
							<span class="must">*</span>
							<span class="gift_type_title">操作类型</span>
							<input type="radio" name="people_type" id="gamer" value="toPlayer" v-model="info.action_type"/><label for="gamer">赠送给玩家</label>
							<input type="radio" name="people_type" id="agent" value="toAgent" v-model="info.action_type"/><label for="agent">赠送给代理</label>
							<div class="clear"></div>
						</div>
						<div class="gift_type game_id" style="position: relative;">
							<span class="must">*</span>
							<span class="gift_type_title" style="height: 1rem;">游戏ID</span>
							<input type="text" name="" id="clickchoosegameid" value="" placeholder="请输入游戏ID" @focus="onfocus()" v-model="user_id" />
							<!-- <img src="../assets/img/u56.png" class="positionimg" /> -->
							<div class="clear"></div>
						</div>
						<div class="nowdaysidbox">
							<div class="nowdaysid" :style="status?'display:block':''">
								<p>最常使用</p>
								<img src="../assets/img/u309.png" @click="onfocus()"/>
								<ul class="nowdaysidul" v-for="(vm,index) in lists" :key="index">
									<li @click="onReceiver(vm)">{{vm.receiver_id}}</li>
								</ul>
								<div class="clear"></div>
							</div>
						</div>
						<div class="gift_type game_id ganernamer" style="border: 0;">
							<span class="gift_type_title" style="color: #333333 !important;font-size: 0.3rem;">玩家昵称</span>
							<input type="text" name="" id="idgamername" value="" readonly="readonly" v-model="nick_name"/>
							<div class="clear"></div>
						</div>
						<div class="" style="border-top: 4px solid #e4e4e4;">
							<div class="gift_type game_id ganernamer">
								<span class="gift_type_title nowroomcard">当前道具数量</span>
								<span style="margin-left: 0.5rem;">{{dj_number}}</span>
								<div class="clear"></div>
							</div>
							<div class="gift_type game_id" style="position: relative;">
								<span class="must">*</span>
								<span class="gift_type_title" style="height: 1rem;">赠送数量</span>
								<input type="text" name="" id="sendmathnum" placeholder="请输入赠送数量" v-model="info.goods_num"/>
								<!-- <img src="../assets/img/u56.png" class="positionimg" /> -->
								<div class="clear"></div>
							</div>
							<div class="gift_type game_id" style="border: 0;">
								<span class="gift_type_title" style="height: 1rem;margin-left: 0.15rem;">快捷赠送</span>
								<ul class="fastgift">
									<li @click="quickgive(5)">
										<div class="xiahuaxian">5</div>
									</li>
									<li @click="quickgive(10)">
										<div class="xiahuaxian">10</div>
									</li>
									<li @click="quickgive(20)">
										<div class="xiahuaxian">20</div>
									</li>
									<li @click="quickgive(50)">
										<div class="xiahuaxian">50</div>
									</li>
								</ul>
								<div class="clear"></div>
							</div>
						</div>
					</div>
					<div class="nowwaycengbtn" @click="give">
						立即赠送
					</div>
				</div>
			</div>
		</div>
</template>
<script>
export default {
  data() {
    return {
      info: {
        method: "giveGoods",
        action_type: "", //操作方式(toPlayer(给玩家)/toAgent(给代理商))
        goods_type: "", //道具类型(gold(金豆)/demond(钻石))
        goods_num: "" //赠送数量
      },
      status: false,
      nick_name: "", //玩家昵称
      dj_number: "", //道具数量
      lists: [],
      user_id: "" //用户输入id
    };
  },
  watch: {
    user_id: function(val) {
      if (!this.info.action_type) {
        this.toast("请设置操作类型");
      } else {
        if (val) this.verification();
      }
    }
  },
  created() {
    this.initUsual(); //加载最近常用的id
  },
  methods: {
    initUsual() {
      //点击请输入游戏ID弹窗显示最近赠送的玩家ID
      this.$http({}, { method: "getRecentlyUserInfo" }).then(data => {
        this.lists = data.Data;
      });
    },
    showNum() {
      //显示当前道具数量  选钻石道具显示钻石数量，选金豆道具显示金豆数量
      this.$http({}, { method: "giveGoods" }).then(data => {
        if (data.Code == 0) {
          if (this.info.goods_type == "demond") {
            this.dj_number = data.Data.demond;
          }
          if (this.info.goods_type == "gold") {
            this.dj_number = data.Data.gold;
          }
        }
      });
    },
    verification() {
      //失去焦点时校验用户ID是否存在 若存在则显示对应玩家的昵称，若不存在则提示玩家不存在
      if (this.user_id) {
        this.$http(
          {},
          {
            method: "checkUserId",
            user_id: this.user_id,
            action_type: this.info.action_type
          }
        ).then(data => {
          if (data.Code == 0) {
            this.nick_name = this.info.action_type == "toAgent"? data.Data.agent_name: data.Data.nick_name;
            this.status=false;
          } else {
            this.nick_name = "";
            this.toast(data.Data.msg);
          }
        });
      }
    },
    onReceiver(vm) {
      this.user_id = vm.receiver_id;
    },
    give() {
			this.info.user_id = this.user_id;
      // this.verification();
      //立即赠送
      if (!this.info.goods_type) {
        this.toast("请选择道具类型");
      } else if (!this.info.action_type) {
        this.toast("请选择操作类型");
      } else if (!this.info.user_id) {
        this.toast("请输入用户id");
      } else if (!this.info.goods_num) {
        this.toast("请输入赠送数量");
      } else if (this.info.goods_num > this.dj_number) {
        this.toast("道具数量不足，请充值");
      } else {
        this.$http({}, this.info).then(data => {
          if (data.Code == 0) {
            this.toast("赠送成功");
            this.sign = false;
          } else {
            this.toast(data.Data.msg);
          }
        });
      }
    },
    onfocus() {
      this.status = !this.status;
    },
    quickgive(num) {
      this.info.goods_num = num;
    }
  }
};
</script>

