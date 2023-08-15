<template>
    <div class="school">
        <h2>学校名称：{{ name }}</h2>
        <h2>学校地址：{{ address }}</h2>
        <button @click="test">测试混入优先级</button>
        <h2>{{ x }}</h2>
        <button @click="sendSchoolName">把学校名给App</button>
    </div>
</template>

<script>
import {hunhe, hunhe2} from '../mixins/01';
export default {
    name: 'TheSchool',
    props: ['getSchoolName'],
    data() {
        return {
            name: '尚硅谷',
            address: '北京昌平',
            x: 666
        };
    },
    methods: {
        test() {
            alert(this.name+'我比mixins里的优先级高');
        },
        sendSchoolName () {
          this.getSchoolName(this.name);
        }
    },
    mounted () {
        console.log('mixin里的周期比我先调用，我后调用')
    },  
    // 局部混入
    mixins: [hunhe, hunhe2]
};
</script>

<!-- scoped：让样式在局部生效，防止冲突 -->
<style scoped>
.school {
    background-color: skyblue;
}
</style>