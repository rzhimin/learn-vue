<template>
  <div>
    <ul class="todo-main" v-if="todos.length">
      <MyItem
        v-for="todoObj in todos"
        :key="todoObj.id"
        :todo="todoObj"
        :checkTodo="checkTodo"
        :deleteTodo="deleteTodo"
      />
    </ul>
    <div v-else class="todo-empty">
      暂无待办事项，快去添加一条吧！
    </div>
  </div>
</template>

<script>
import MyItem from "./MyItem";

export default {
  name: "MyList",
  components: { MyItem },
  // 声明接收 App 传递过来的数据，其中 todos 是自己用的，checkTodo 和 deleteTodo 是给继续向下传递给子组件 MyItem 用的
  props: ["todos", "checkTodo", "deleteTodo",],
};
</script>

<style scoped>
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 10px;
  margin-top: 10px;
  color: #999;
  background-color: #fafafa;
}
</style>
