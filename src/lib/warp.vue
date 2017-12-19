<template>
    <div class="wrap-centent" ref="wrap">
         <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        height: {
            type: Number,
            default: 0,
        }
    },
    watch:{
        height(val){
            this.handleResize();
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.handleResize();
        })
    },
    methods: {
        handleResize () {
            let h = document.body.clientHeight;
            if(this.height > 0){
                h = h - this.height;
            }
            if(this.isIOS){
                h = h - 20;
            }
            this.$refs.wrap.style.height = h.toFixed(2)+'px';
        }
    }
}
</script>
<style lang="scss" scoped>
    .wrap-centent{
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
    }
</style>

