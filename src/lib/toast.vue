<template>
  <div class="td-toast" @touchmove="onTouchMove">
     <transition name="vux-dialog">
         <div class="w-dialog toast" style="border-radius:5px;" v-show="show">
            <div class="w-toast-hd pb5" v-if="!!title">{{title}}</div>
            <slot></slot>
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
     time: {
        type: Number,
        default: 2000
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
    show (val) {
      if (val) {
        this.$emit('input', true)
        this.$emit('on-show')
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.show = false
          this.$emit('input', false)
          this.$emit('on-hide')
        }, this.time)
      }
    },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-dialog {
    position: fixed;
    z-index: 5000;
    bottom: 10%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.7);
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
    color:#fff;
    font-size:0.28rem;
}
.td-toast .w-dialog{
  padding:.25rem .2rem;
}
.td-toast .w-toast-hd {
   font-size:0.28rem;
   line-height: .4rem;
   padding:0 .1rem;
}
.w-dialog__title {
    font-weight: normal;
    font-size: 0.28rem;;
}


</style>
