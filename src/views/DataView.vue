<template>
  <div class="overflow-y-hidden">
    <v-divider :thickness="2" color="success"></v-divider>
    <v-container fluid>
      <v-tabs v-model="activeTab" color="warning">
        <v-tab value="requirements">Gereksinimler</v-tab>
        <v-tab value="teachers">Öğretmenler</v-tab>
        <v-tab value="courses">Dersler</v-tab>
        <v-tab value="rooms">Derslikler</v-tab>
        <v-tab value="classrooms">Sınıflar</v-tab>
      </v-tabs>

      <v-tabs-window v-model="activeTab">
        <v-tabs-window-item value="requirements">
          <RequirementList />
        </v-tabs-window-item>
        <v-tabs-window-item value="teachers">
          <TeacherList />
        </v-tabs-window-item>

        <v-tabs-window-item value="courses">
          <CourseList />
        </v-tabs-window-item>
        <v-tabs-window-item value="rooms">
          <RoomList />
        </v-tabs-window-item>
        <v-tabs-window-item value="classrooms">
          <ClassroomList />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TeacherList from '../components/data/TeacherList.vue'
import RoomList from '../components/data/RoomList.vue'
import RequirementList from '../components/data/RequirementList.vue'
import CourseList from '../components/data/CourseList.vue'
import ClassroomList from '../components/data/ClassroomList.vue'

const activeTab = ref('teachers')
</script>
