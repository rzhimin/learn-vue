<template>
    <div class="category">
        <h3>{{ title }}分类</h3>
        <!-- 默认插槽 -->
        <!-- <slot></slot> 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
        <slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
        <!-- 具名插槽 -->
        <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
        <!-- 具名插槽：在组件中指定 slot 的 name -->
        <!-- 一个不带 name 的 <slot> 出口会带有隐含的名字“default” -->
        <slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot>
        <slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot>
        <!-- 作用域插槽：在组件中给 <slot></slot> 绑定值（双向绑定、直接指定），该值就能传输到调用该组件的使用者处 -->
        <!-- 可以传递多个内容，这里传递了 games 和 msg -->
        <slot :games="games" msg="hello">我是默认的一些内容</slot>
    </div>
</template>

<script>
export default {
    name: 'Category',
    props: ['title'],
    data () {
        return {
            games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽']
        };
    }
};
</script>

<style scoped>
.category {
    background-color: skyblue;
    width: 200px;
    height: 300px;
}

h3 {
    text-align: center;
    background-color: orange;
}

video {
    width: 100%;
}

img {
    width: 100%;
}
</style>
