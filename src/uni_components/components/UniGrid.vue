<template>
    <div class="egg-uni-grid">
        <template v-if="ComponentChildren && ComponentChildren.length != 0">
            <template v-for="(item,index) in ComponentChildren">
                <div class="egg-uni-grid-item"
                     :class="ComponentAnimation + ' ' + (ComponentAttribute.showBorder ? 'egg-uni-grid-item-border' : '')"
                     :style="'width:calc(' + 100/ComponentAttribute.column +'% ' + (ComponentAttribute.showBorder ?  '- 2px' : '') + ');' + ComponentStyle" :key="index">
                    <div class="egg-uni-grid-item-real">
                        <img v-if="item.src" class="egg-uni-grid-item-icon" :src="item.src"/>
                        <div v-if="item.title" class="egg-uni-grid-item-title">{{item.title}}</div>
                    </div>
                </div>
            </template>
        </template>
        <template v-else>
            <template v-for="(item,index) in ComponentAttribute.column">
                <div class="egg-uni-grid-item"
                     :class="ComponentAnimation + ' ' + (ComponentAttribute.showBorder ? 'egg-uni-grid-item-border' : '')"
                     :style="'width:calc(' + 100/ComponentAttribute.column +'% ' + (ComponentAttribute.showBorder ?  '- 2px' : '') + ');' + ComponentStyle" :key="index">
                    <div class="egg-uni-grid-item-real">
                        <img class="egg-uni-grid-item-icon" src="../../assets/images/index.png"/>
                        <div class="egg-uni-grid-item-title">标题</div>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    export default {
        name: "UniGrid",
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return {
                        column: 3,//每列显示个数
                        showBorder: true,//是否显示边框
                        borderColor: "#d0dee5",//边框颜色
                        square: true,//是否方形显示
                        highlight: true,//是否点击高亮
                    }
                }
            },
            ComponentStyle: {//额外的样式
                type: String,
                default: "",
            },
            ComponentAnimation: {//动画效果
                type: String,
                default: "",
            },
            ComponentChildren: {
                type: Array
            }
        },
        mounted() {
            let gridItem = this.$refs.eggGridItem;
            window.console.log(gridItem)
        }
    }
</script>

<style scoped>
    .egg-uni-grid {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        justify-content: flex-start;
    }

    .egg-uni-grid-item {
        height: 0;
        padding-bottom: 20%;
        overflow: hidden;
        position: relative;
    }

    .egg-uni-grid-item-border {
        border: 1px solid #c8c7cc;
    }

    .egg-uni-grid-item-real {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .egg-uni-grid-item-real:hover {
        background-color: #f1f1f1;
    }

    .egg-uni-grid-item-icon {
        height: 2rem;
        width: 2rem;
    }

    .egg-uni-grid-item-title {
        font-size: 0.8rem;
        padding: 0 4px;
        text-align: center;
    }
</style>