
<template>
  <v-app
    ><AppBar />
    <SideBar />
    <v-main>
      <v-tabs v-model="activeTab" color="success">
        <v-tab value="program">Programlar</v-tab>
        <v-tab value="data">Veriler</v-tab>
      </v-tabs>

      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="program">
          <ScheduleView />
        </v-tabs-window-item>
        <v-tabs-window-item value="data">
          <DataView />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScheduleStore } from './stores/schedule'
const store = useScheduleStore()

import AppBar from './components/layout/AppBar.vue'
import SideBar from './components/layout/SideBar.vue'
import DataView from './views/DataView.vue'
import ScheduleView from './views/ScheduleView.vue'

const activeTab = ref('program')

onMounted(() => {
  store.fetchTeacher()
  store.fetchRoom()
  store.fetchRequirement()
  store.fetchClassroom()
  store.fetchCourse()
})
</script>


