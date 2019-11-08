<template>
    <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-menu-item index="1">主页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">目录</template>
            <el-menu-item index="2-1">目录1</el-menu-item>
            <el-menu-item index="2-2">目录2</el-menu-item>
            <el-menu-item index="2-3">目录3</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    import {Menu,MenuItem,Submenu} from 'element-ui'
    export default {
        name: "EggDesignHeader",
        components:{
            [Menu.name]:Menu,
            [MenuItem.name]:MenuItem,
            [Submenu.name]:Submenu
        },
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                // eslint-disable-next-line no-console
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>