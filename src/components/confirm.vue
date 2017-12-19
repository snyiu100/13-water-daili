<template>
  <div class="m-confirm" @touchmove="onTouchMove">
     <transition name="vux-mask">
         <div class="weui-mask" v-show="showValue"></div>
     </transition>  
     <transition name="vux-dialog">
         <div class="w-dialog" v-show="showValue">
            <div class="w-dialog__hd" v-if="!!title"><strong class="w-dialog__title">{{title}}</strong></div>
            <div class="w-dialog__bd" v-if="!showInput"><slot><div v-html="content"></div></slot></div>
            <div v-else class="w-prompt">
                <input v-model="msg" :placeholder="placeholder" ref="input" />
            </div>
            <div class="w-dialog__ft f28">
                <span class="w-dialog__btn" @click="_onCancel">{{cancelText}}</span>
                <span class="w-dialog__btn c007" @click="_onConfirm" v-if="closeOnConfirm">{{confirmText}}</span>
            </div>
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
     confirmText: {
       type: String,
       default: '确定'
     },
     cancelText:  {
       type: String,
       default: '取消'
     },
     closeOnConfirm: {
       type: Boolean,
       default: true
     },
     content: String,
     placeholder: {
       type: String,
       default: ''
     },
     showInput: {
       type: Boolean,
       default: false
    }
  },
  created () {
    this.showValue = false;
    if (this.value) {
      this.showValue = this.value
    }
  },
  watch: {
    show (val) {
      this.$emit('update:show', val)
      this.$emit(val ? 'on-show' : 'on-hide')
    },
    value (val) {
      this.showValue = val
    },
    showValue (val) {
      this.$emit('input', val)
      if (val) {
        if (this.showInput) {
          this.msg = ''
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus()
            }
          }, 300)
        }
        this.$emit('on-show') // emit just after msg is cleared
      }
    }

  },
  data () {
    return {
      msg: '',
      showValue: false
    }
  },
  methods: {
    setInputValue (val) {
      this.msg = val
    },
    _onConfirm () {
      if (this.closeOnConfirm) {
        this.showValue = false
      }
      this.$emit('on-confirm', this.msg)
    },
    _onCancel () {
      this.showValue = false
      this.$emit('on-cancel')
    },
    onTouchMove (event) {
      !this.scroll && event.preventDefault()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.w-dialog {
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
}
.w-dialog__hd {
    height: 0.9rem;
    line-height: 0.9rem;
    /**border-bottom: 1px solid #dfdfdf;**/
}
.w-dialog__title {
    font-weight: 400;
    font-size: .28rem;
}
.w-prompt {
    padding: 1em 0;
}
.w-prompt input{
    width: 80%;
    border: 1px solid #dedede;
    border-radius: 5px;
    padding: 4px 5px;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    font-size: 16px;
}
.w-dialog__bd {
    padding:0.5rem .2rem;
    font-size:.34rem;
    word-wrap: break-word;
    word-break: break-all;
    color: #333333;
}
.w-dialog__ft {
    border-top:1px solid #c3c3c3;
    position: relative;
    line-height: 0.86rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}
.w-dialog__ft .w-dialog__btn:nth-child(1){color:#c3c3c3}
.w-dialog__ft .w-dialog__btn:nth-child(2){border-left:1px solid #c3c3c3;}
.w-dialog__btn {
    font-size:.36rem;
    cursor: pointer;
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #999999;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    position: relative;
}
</style>
