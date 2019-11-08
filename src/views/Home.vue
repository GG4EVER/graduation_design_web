<template>
    <el-main class="home-main">
<!--        <uni-badge text="1"></uni-badge>-->
<!--        <uni-badge text="3" type="primary" :inverted="true"></uni-badge>-->
    </el-main>
</template>

<script>
    //import uniBadge from '@dcloudio/uni-ui/lib/uniBadge/';
    export default {
        name: "Home",
        components:{
            //[uniBadge.name]:uniBadge,
        }
    }
</script>

<style scoped>
    .home-main{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        z-index: -1;
    }
</style>