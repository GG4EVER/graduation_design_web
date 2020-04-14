<template>
    <el-form :model="ComponentAttribute" status-icon>
        <el-col :span="24" class="design-setting-title egg-not-copy"><i class="el-icon-minus el-icon--left"></i>视频属性<i
                class="el-icon-minus el-icon--right"></i></el-col>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">视频地址</div>
            <el-input type="textarea" clearable resize="none" :autosize="{minRows: 2, maxRows:5}"
                      v-model="ComponentAttribute.src" @change="changeAttribute"></el-input>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">是否自动播放</div>
            <el-switch v-model="ComponentAttribute.selectable" @change="changeAttribute"></el-switch>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">是否循环播放</div>
            <el-switch v-model="ComponentAttribute.loop" @change="changeAttribute"></el-switch>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">是否显示播放控件</div>
            <el-switch v-model="ComponentAttribute.controls" @change="changeAttribute"></el-switch>
        </el-form-item>
        <el-form-item v-if="ComponentAttribute.controls">
            <div slot="label" class="design-setting-label egg-not-copy">视频封面图链接</div>
            <el-input type="textarea" clearable resize="none" :autosize="{minRows: 2, maxRows:5}"
                      v-model="ComponentAttribute.poster" placeholder="如果不填则不显示封面"  @change="changeAttribute"></el-input>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">是否显示全屏按钮</div>
            <el-switch v-model="ComponentAttribute['show-fullscreen-btn']" @change="changeAttribute"></el-switch>
        </el-form-item>
        <el-form-item>
            <div slot="label" class="design-setting-label egg-not-copy">是否在底部显示播放按钮</div>
            <el-switch v-model="ComponentAttribute['show-play-btn']" @change="changeAttribute"></el-switch>
        </el-form-item>
    </el-form>
</template>

<script>
    import {Form, FormItem, Input, Switch} from "element-ui"

    export default {
        name: "UniVideoAttribute",
        props: {
            ComponentAttribute: {
                type: Object
            },
        },
        components: {
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Switch.name]: Switch
        },
        methods: {
            changeAttribute() {
                this.$emit("listenSaveAttribute");
            }
        }
    }
</script>

<style scoped>

</style>