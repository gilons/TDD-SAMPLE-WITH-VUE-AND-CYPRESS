<template>
  <div id="app">
    <div class="todo-title">My Todo App</div>
    <div class="todo-header">
      <div class="todo-input-container">
    <input class="todo-input" id="add-todo" @keyup.enter="addTask" v-model="newTodo" />
      </div>
      <div class="todo-button-container">
    <button class="todo-button" id="add-todo-button" @click="addTodo">{{updating?"Edit Todo":"Add Todo"}}</button>
      </div>
    </div>
    <div class="todo-list">
      <div class="todo-list-item" @click="markAsDone" :key="task.id" v-for="task in tasks">
       <div class="todo"> {{ task.text }}</div>
         <div class="todo-actions">
        <select
          @change="changeState($event, task.id)"
          name="task-status"
          v-model="task.current_state"
          class="state-select button"
        >
          <option v-for="option in options" :key="option.value">{{
            option.text
          }}</option>
        </select>
        <button class="button edit-todo" @click="editTodo(task.id)">Edit</button>
        <button class="button delete-todo" @click="removeTodo(task.id)">Delete</button>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  props: {},
  data() {
    return {
      todo: "",
      currentTodoID: null,
      updating: false,
      options: [
        { text: "DOING", value: 1 },
        { text: "DONE", value: 2 },
        { text: "TODO", vaue: 3 },
      ],
      tasks: [],
    };
  },
  computed: {
    newTodo: {
      set(newVal) {
        this.todo = newVal;
      },
      get() {
        return this.todo;
      },
    },
  },
  watch: {
    tasks: (val) => {
      window.sessionStorage.setItem("tasks", JSON.stringify(val));
    },
  },
  created() {
    let task = window.sessionStorage.getItem("tasks");
    task !== "null" && task ? (this.tasks = JSON.parse(task)) : null;
  },
  methods: {
    editTodo(id) {
      this.currentTodoID = id;
      this.todo = this.tasks.find((ele) => ele.id == id).text;
      this.updating = true;
    },
    changeState(event, id) {
      this.tasks = this.tasks.map((ele) => {
        return ele.id == id
          ? { ...ele, current_state: event.target.value }
          : ele;
      });
    },
    addTodo() {
      this.updating
        ? (this.tasks = this.tasks.map((ele) => {
            return ele.id == this.currentTodoID
              ? { ...ele, text: this.todo }
              : ele;
          }))
        : this.tasks.push({ id: Math.random().toString(), text: this.todo,current_state:'TODO' });
      this.todo = "";
      this.currentTodoID = null 
      this.updating = false
    },
    removeTodo(id) {
      this.tasks = this.tasks.filter((ele) => ele.id !== id);
    },
    markAsDone() {},
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 80vw;
  margin: auto;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .hello-image {
    border: 5px solid orangered;
  }
  .todo-header{
    width: 90%;
    height: 100px;
    display: flex;
    justify-content: space-between;
  }
  .button{
    height: 30px;
    margin: auto;
    font-weight: 600;
    min-width: 70px;
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  .edit-todo{
    background: green;
  }
  .delete-todo{
    background-color: red;
  }
  .state-select{
    background: orange;
  }
  .todo-input-container{
    width: 80%;
    height: 30px;
  }
  .todo-title{
    font-weight: 600;
    font-size: 20px;
    height: 60px;
    margin-top: 10px;
  }
  .todo-actions{
    width: 40%;
    display: flex;
    justify-content: space-between;
  }
  .todo-input{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding-left: 10px;
    border-width: 1px;
    border-color:skyblue;
    border-style: solid;
  }
  .todo-button{
    height: 100%;
    width: 100%;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background: greenyellow;
    font-weight: 600;
    color: #fff;
  }
  .todo-button-container{
    height: 30px;
    width: 100px;
  }
  .todo-list-item{
    cursor: pointer;
    background: ivory;
    height: 50px;
    padding: 10px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  .todo{
    align-self: flex-start;
    margin: auto;
    width:60%
  }
  .todo-list{
    margin: 10px;
    display: flex;
    flex-direction: column;
    min-height: 100px;
    justify-content: space-between;
    width: 90%;
    overflow: scroll;
    max-height: 60vh;
  }
}
</style>
