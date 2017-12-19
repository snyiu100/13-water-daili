<template>
  <div class="td-toast" @touchmove="onTouchMove">
     <transition name="vux-mask">
         <div class="weui-mask" @click="_onHide" v-show="show"></div>
     </transition>  
     <transition name="vux-popup-animate-bottom">
        <div class="td-popup-dialog" v-show="show">
            <div v-if="title" class="mt20 pb20 f34 text-center b-b-cf0f">{{title}}</div>
            <slot></slot>
            <div class="w-popup_ft f28">
                <span class="w-popup_btn btn-cancel" @click="_onCancel">{{cancelText}}</span>
                <span class="w-popup_btn" @click="_onConfirm" v-if="isClose">{{confirmText}}</span>
            </div>
          <div></div>
        </div>
    </transition> 
  </div>
</template>
<script>
export default {
  props: {
     value: {
       type: Boolean,
       default: false
     },
     title: String,
     content: String,
     isClose: {
       type: Boolean,
       default: true
     },
     confirmText: {
       type: String,
       default: '确定'
     },
     cancelText:  {
       type: String,
       default: '取消'
     }
  },
  data () {
    return {
      show: false,
      timeout:null
    }
  },
  created () {
    if (this.value) {
      this.show = true
    }
  },
  watch: {
    value (val) {
      this.show = val
    }
  },
  methods: {
    onTouchMove (event) {
      !this.scroll && event.preventDefault()
    },
    _onHide(){
        this.show = false
        this.$emit('input', false)
        this.$emit('on-hide')
    },
    _onConfirm () {
      if (this.isClose) {
        this.show = false
      }
      this.$emit('on-confirm')
      this.$emit('input', false)
    },
    _onCancel () {
      this.show = false
      this.$emit('on-cancel')
      this.$emit('input', false)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.w-popup_ft {
    position: relative;
    line-height: 0.86rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    font-size:.34rem;
}
.w-popup_btn {
    cursor: pointer;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #fff;
    height: .98rem;
    line-height: .98rem;
    background-color: #1b8582;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
    text-align: center;
}
.btn-cancel{ background-color: #fff; color:#333;}
</style>
