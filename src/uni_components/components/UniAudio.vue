<template>
    <!--    音频-->
    <div :style="ComponentStyle" :class="ComponentAnimation">
        <a-player :repeat="ComponentAttribute.loop ? 'repeat-one' : 'no-repeat'"  :music="audioInfo"></a-player>
    </div>
</template>

<script>
    import AudioPlayer  from 'vue-aplayer'
    export default {
        name: "UniAudio",
        components: {
            "a-player":AudioPlayer
        },
        props: {
            ComponentAttribute: {//组件属性
                type: Object,
                default() {
                    return null;
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
        },
        watch:{
            ComponentAttribute(newVal){
                if(newVal){
                    this.audioInfo = {
                        title: newVal.name,
                        artist: newVal.author,
                        src: newVal.src,
                        pic:newVal.poster
                    }
                }
            }
        },
        created() {
            if(this.ComponentAttribute){
                this.audioInfo = {
                    title: this.ComponentAttribute.name,
                    artist: this.ComponentAttribute.author,
                    src: this.ComponentAttribute.src,
                    pic:this.ComponentAttribute.poster
                }
            }
        },
        data() {
            return {
                audioInfo: {
                    title: '',
                    artist: '',
                    src: '',
                    pic:''
                },
            }
        }
    }
</script>

<style scoped>

</style>