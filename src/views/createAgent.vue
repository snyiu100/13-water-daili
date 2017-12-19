<template>
  <div class="td-warp">
     <div class="index_nav">
			<div class="clickaddnavbox clearfix">
				<div class="index_home" @click="jump('home')">
					<img src="../assets/img/u98.png" style="width: 0.5rem;" /> 代理后台
				</div>
				<div class="clickaddnav createlevel2">
					><span>创建代理</span>
				</div>
			</div>
		</div>
		<div class="createagent">
			<div class="mustwrite">必填信息</div>
			<div class="agentimformation clearfix" style="height: 1rem;">
				<!-- <div class="creat_agentid">
					<p>代理ID</p>
					<input type="text" value="" placeholder="请输入ID号" style="padding-left: 0.44rem;"/>
				</div> -->
				<div class="creat_agentid " style="border: 0;">
					<span class="c-red">*</span>
					<p>账号</p>
					<input type="text" value="" v-model="info.agent_account" placeholder="请输入账号" @focus="show=false" @blur="modify"/>
					<img src="../assets/img/u56.png" class="show" :style="show?'display:block;':''"/>
				</div>
			</div>
			<div class="mustwrite">必填信息</div>
			<div class="agentimformation" style="height: 3rem;">
				<div class="creat_agentid">
					<span class="c-red">*</span>
					<p>姓名</p>
					<input type="text" value="" v-model="info.agent_name" placeholder="请输入姓名"/>
				</div>
				<div class="creat_agentid" >
					<span class="c-red">*</span>
					<p>手机</p>
					<input type="text" name="" id="" v-model="info.agent_tel" value="" placeholder="请输入手机号"/>
				</div>
				<div class="creat_agentid" style="border: 0;">
					<span class="c-red">*</span>
					<p>微信</p>
					<input type="text" name="" id="" v-model="info.wx_account" value="" placeholder="请输入微信号"/>
				</div>
			</div>
		</div>
		<div class="nowwaycengbtn" @click="tijiao">
			立即创建
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        method: "addAgent"
      },
      show:false
    };
  },
  created() {},
  methods: {
    jump(sign) {
      this.$router.push({ path: "/" + sign });
    },
    modify(){//判断账号是否重复code==0不重复可以创建code!=0账号已经存在不能创建
      if(this.info.agent_account!=''){
          this.$http({},{method:'checkAgentAccount',agent_account:this.info.agent_account}).then(data=>{
          if(data.Code!=0){
            this.show=true;
            this.toast(data.Data.msg);
          }
        })
      }       
    },
    tijiao() {
      if (
        !this.info.agent_account ||
        !this.info.agent_name ||
        !this.info.agent_tel ||
        !this.info.wx_account
      ) {
        this.toast("请完善信息");
      } else {
        this.$http({}, this.info).then(data => {
          if (data.Code == 0) {
            this.toast("创建成功");
            setTimeout(() => {
              this.$router.push("/home");
            }, 1000);
          } else {
            this.toast("创建失败");
          }
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.ru-tile {
  padding: 0.17rem 0;
  border-bottom: 1px solid #ccc;
  margin-left: 0.2rem;
  span {
    border-left: 3px solid #dd2638;
    font-size: 0.28rem;
    color: #333;
    padding-left: 5px;
    font-weight: bold;
  }
}
.ru-ul {
  margin: 0 0.2rem;
  li {
    border-bottom: 1px solid #ccc;
    font-size: 0.24rem;
    line-height: 0.35rem;
    padding: 0.15rem 0;
    span {
      color: #dd2638;
    }
  }
}
.show{
  display: none;
}
</style>
