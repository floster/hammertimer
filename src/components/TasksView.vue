<script setup>
import TasksList from './TasksList.vue'
import TasksViewHeader from './TasksViewHeader.vue'

defineEmits(['set-active-task'])
</script>

<template>
  <section class="w-full mt-6 text-sm md:text-base">
    <TasksViewHeader />
    <TasksList @set-active-task="(id) => $emit('set-active-task', id)" />
  </section>
</template>
