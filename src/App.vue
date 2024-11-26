<script setup>
import { onBeforeMount, ref } from "vue";
// import TaskList from "./components/TaskList.vue";
const list = ref([]);
const keyword = "list";
onBeforeMount(() => {
  let temp = localStorage.getItem(keyword);
  if (temp) {
    try {
      temp = JSON.parse(temp);
    } catch (error) {
      temp = [];
    }
  } else {
    temp = [];
  }
  list.value.push(...temp);
});

const title = ref("");
const description = ref("");
const cursor = ref(-1);

const ALL = 0;
const COMPLETED = 1;
const INCOMPLETE = -1;
const filter = ref(ALL);

const filterFunc = (flag) => {
  flag = flag ? COMPLETED : INCOMPLETE;
  if (filter.value == ALL) {
    return true;
  } else if (filter.value == COMPLETED) {
    return flag == COMPLETED;
  } else {
    return flag == INCOMPLETE;
  }
};

const addTask = () => {
  list.value.push({ title: title.value, description: description.value });
  localStorage.setItem(keyword, JSON.stringify(list.value));
  title.value = "";
  description.value = "";
};

const removeTask = (index) => {
  list.value.splice(index, 1);
  localStorage.setItem(keyword, JSON.stringify(list.value));
};

const showEditedTask = (index) => {
  let item = list.value[index];
  title.value = item.title;
  description.value = item.description;
  cursor.value = index;
};

const editTask = (index) => {
  list.value.splice(index, 1, {
    title: title.value,
    description: description.value,
  });
  localStorage.setItem(keyword, JSON.stringify(list.value));
  title.value = "";
  description.value = "";
  cursor.value = -1;
};

const complete = (index) => {
  let item = list.value[index];
  if (!item.isComplete) {
    item.isComplete = 1;
  }
  localStorage.setItem(keyword, JSON.stringify(list.value));
};

const submit = () => {
  if (!title.value || !description.value) {
    alert("please fill all input");
    return;
  }
  if (cursor.value >= 0) {
    editTask(cursor.value);
  } else {
    addTask();
  }
};
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-center text-xl">TASKS</div>
    <div class="flex flex-col items-center">
      <input
        class="w-1/2 h-1/2 mt-8 border-2 border-black"
        placeholder="title"
        v-model="title"
      />
      <input
        class="w-1/2 h-72 mt-8 border-2 border-black"
        placeholder="description"
        v-model="description"
      />
    </div>
    <div class="flex justify-center mt-8">
      <button class="w-1/10 rounded border-2 border-blue-500" @click="submit()">
        SUBMIT
      </button>
    </div>
  </div>

  <div class="flex flex-col items-center">
    <select class="mt-8" v-model="filter">
      <option :value="ALL">all</option>
      <option :value="COMPLETED">completed</option>
      <option :value="INCOMPLETE">incomplete</option>
    </select>

    <div
      v-for="(item, index) in list"
      v-show="filterFunc(item.isComplete)"
      :key="item.title"
      :class="[
        'flex',
        'w-1/2',
        'h-auto',
        'mt-8',
        'border-2',
        item.isComplete == 1 ? 'border-black' : 'border-gray',
      ]"
    >
      <div
        class="overflow-hidden whitespace-nowrap overflow-ellipsis mt-8 w-32"
        v-text="item.title"
      ></div>
      <div
        class="overflow-hidden whitespace-nowrap overflow-ellipsis mt-8 w-32"
        v-text="item.description"
      ></div>
      <div class="flex flex-row-reverse w-full">
        <button
          class="w-1/10 mr-8 rounded border-2 border-blue-500"
          @click="complete(index)"
        >
          COMPLETE
        </button>
        <button
          class="w-1/10 mr-8 rounded border-2 border-blue-500"
          @click="showEditedTask(index)"
        >
          EDIT TASK
        </button>
        <button
          class="w-1/10 mr-8 rounded border-2 border-blue-500"
          @click="removeTask(index)"
        >
          REMOVE TASK
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
