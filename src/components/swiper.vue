<template>
    <swiper :options="swiperOption"  ref="mySwiper"> 
        <!-- 这部分放你要渲染的那些内容 -->  
        <swiper-slide  v-for="(str,index) in lists.banner" :key="index" >
                <img :src="str.banner" />  
        </swiper-slide>  
        <!-- 这是轮播的小圆点 -->  
        <div class="swiper-pagination" slot="pagination"></div>  
    </swiper>  
</template>

<script>
    export default {
        props:{
            lists:{
                type:Array,
            },
            swiperOption:{
                type:Object,
                default:function(){
                    return {
                        notNextTick: true,  
                        roundLengths:true,
                        pagination: '.swiper-pagination',  
                        autoplayDisableOnInteraction:false,
                        onSlideChangeEnd: swiper => {  
                            //这个位置放swiper的回调方法  
                            this.page = swiper.realIndex+1;  
                            this.index = swiper.realIndex;  
                        } 
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    .swiper-container {
        width: 100%;
        height: 10rem;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet {
            width:0.833rem;
            height: 0.833rem;
            display: inline-block;
            background: #7c5e53;
        }
    }
</style>