<template>
  <v-container  fluid>
    <v-tabs v-model="activeTab" color="warning" align-tabs="end">
      <v-tab value="teachers">Öğretmenler</v-tab>
      <v-tab value="rooms">Derslikler</v-tab>
      <v-tab value="requirements">Gereksinimler</v-tab>
    </v-tabs>

    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item value="teachers">
        <TeacherList />
      </v-tabs-window-item>
      <v-tabs-window-item value="rooms">
        <RoomList />
      </v-tabs-window-item>
      <v-tabs-window-item value="requirements">
        <RequirementList />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import TeacherList from '../components/data/TeacherList.vue'
import RoomList from '../components/data/RoomList.vue'
import RequirementList from '../components/data/RequirementList.vue'

const activeTab = ref('teachers')
</script>