
<template>
  <v-app>
    <AppBar />
    <SideBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScheduleStore } from '../stores/schedule'
import AppBar from '../components/layout/AppBar.vue'
import SideBar from '../components/layout/SideBar.vue'

const store = useScheduleStore()

onMounted(() => {
  store.fetchTeacher()
  store.fetchRoom()
  store.fetchRequirement()
  store.fetchClassroom()
  store.fetchCourse()
})
</script>


