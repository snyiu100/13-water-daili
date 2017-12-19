<template>
  <transition name="td-indicator">
    <div class="td-indicator" v-show="show" >
      <div class="td-indicator-wrapper" style="padding: 10px;" :style="text?'padding:10px 20px;':'padding:10px;'">
        <div class="loadspan">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <span class="td-indicator-text" v-show="text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script >
  export default {
     props: {
        value: {
            type: Boolean,
            default: false
        },
        text: String,
        type:{
           type:String
        }
    },
    data() {
      return {
        show: false
      }
    },
    created () {
        if (this.value) {
        this.show = true
        }
    },
    watch: {
        show (val) {
            if (val) {
                this.$emit('input', true)
            }
        },
        value (val) {
            this.show = val
        }
    }
  };
</script>

<style scoped>
.td-indicator {
  -webkit-transition: opacity .2s linear;
  transition: opacity .2s linear;
}
.td-indicator-wrapper {
  top: 50%;
  left: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  box-sizing: border-box;
  text-align: center;
}
.td-indicator-wrapper svg{width: 25px; height:25px;}
.td-indicator-text {
  display: block;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: 13px;
}
.td-indicator-spin {
  display: inline-block;
  text-align: center;
}
.td-indicator-mask {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
}
.td-indicator-enter, .td-indicator-leave-active {
  opacity: 0;
}
.loadspan{
	width: 40px;
	height: 40px;
	position: relative;
	margin: 0 auto;
}
.loadspan span{
	display: inline-block;
	width: 10px;
	height: 2px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	background: #fff;
	position: absolute;
   -webkit-animation: load 1.04s ease infinite;
}
@-webkit-keyframes load{
	0%{
		opacity: 1;
	}
	100%{
		opacity: 0.2;
	}
}
.loadspan span:nth-child(1){
	left: 0;
	top: 50%;
	margin-top:-2px;
	-webkit-animation-delay:0.13s;
}
.loadspan span:nth-child(2){
	left: 5px;
    top: 8px;
	-webkit-transform: rotate(45deg);
	-webkit-animation-delay:0.26s;
}
.loadspan span:nth-child(3){
	left: 50%;
	top: 4px;
	margin-left: -5px;
	-webkit-transform: rotate(90deg);
	-webkit-animation-delay:0.39s;
}
.loadspan span:nth-child(4){
	top: 8px;
	right: 5px;
	-webkit-transform: rotate(135deg);
	-webkit-animation-delay:0.52s;
}
.loadspan span:nth-child(5){
	right: 0;
	top: 50%;
	margin-top:-2px;
	-webkit-transform: rotate(180deg);
	-webkit-animation-delay:0.65s;
}
.loadspan span:nth-child(6){
    right: 5px;
    bottom: 10px;
	-webkit-transform: rotate(225deg);
	-webkit-animation-delay:0.78s;
}
.loadspan span:nth-child(7){
	bottom: 5px;
	left: 50%;
	margin-left: -5px;
	-webkit-transform: rotate(270deg);
	-webkit-animation-delay:0.91s;
}
.loadspan span:nth-child(8){
	bottom: 10px;
	left: 5px;
	-webkit-transform: rotate(315deg);
	-webkit-animation-delay:1.04s;
}
</style>