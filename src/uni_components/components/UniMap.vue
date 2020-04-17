<template>
    <div>
        <el-amap
                :center="ComponentAttribute.longitude && ComponentAttribute.latitude ? [ComponentAttribute.longitude,ComponentAttribute.latitude] : [116.397470,39.908823]"
                :zoom="ComponentAttribute.scale"
                class="egg-uni-map">
            <el-amap-marker vid="center" :position="ComponentAttribute.longitude && ComponentAttribute.latitude ? [ComponentAttribute.longitude,ComponentAttribute.latitude] : [116.397470,39.908823]"></el-amap-marker>
        </el-amap>
    </div>
</template>

<script>
    export default {
        name: "UniMap",
        props:{
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        longitude:"",//中心经度
                        latitude:"",//中心纬度
                        scale:16,//缩放级别，取值范围为5-18
                        markers:[],//标记点
                        polyline:[],//路线
                        circles:[],//圆
                        controls:[]//控件
                    }
                }
            },
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            },
            ComponentAnimation:{//动画效果
                type: String,
                default: "",
            },
        },
    }
</script>

<style scoped>
    .egg-uni-map {
        height: 248px;
    }
</style>