<template>
    <input type="button" :disabled="disabled || time > 0" v-model="text" />
</template>
<script>
export default {
     props: {
            second: {
                type: Number,
                default: 60
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                time: 0
            }
        },
        methods: {
            timeInit:function(){
                this.time = 0;
                this.disabled = false;
            },
            run: function () {
                this.time = this.second
                this.timer()
            },
            timer: function () {
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }
            }
        },
        computed: {
            text: function () {
                return this.time > 0 ? this.time + 's' : '获取验证码';
            }
        }
}
</script>

