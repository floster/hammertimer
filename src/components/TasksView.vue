<script setup>
import TasksList from '@/components/TasksList.vue'
import TasksViewHeader from '@/components/TasksViewHeader.vue'

defineEmits(['set-active-task'])
</script>

<template>
  <section class="w-full mt-6 text-sm md:text-base">
    <TasksViewHeader />
    <TasksList />
  </section>
</template>
