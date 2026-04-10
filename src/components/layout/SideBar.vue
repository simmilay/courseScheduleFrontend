<template>
  <v-navigation-drawer permanent width="250">
    <div class="mt-3 gap-1 flex flex-col">
      <v-list-item title="Derslik Ekle" @click="roomModalVisible = true">
        <template v-slot:prepend>
          <v-icon color="success">mdi-flask-empty-plus-outline</v-icon>
        </template>
      </v-list-item>
      <v-list-item title="Ders Ekle" @click="courseModalVisible = true">
        <template v-slot:prepend>
          <v-icon color="success">mdi-book-open-variant-outline</v-icon>
        </template>
      </v-list-item>
      <v-list-item title="Öğretmen Ekle" @click="teacherModalVisible = true">
        <template v-slot:prepend>
          <v-icon color="success">mdi-account-box-plus-outline</v-icon>
        </template>
      </v-list-item>
      <v-list-item title="Sınıf Ekle" @click="classroomModalVisible = true">
        <template v-slot:prepend>
          <v-icon color="success">mdi-google-classroom</v-icon>
        </template>
      </v-list-item>

      <v-list-item title="Gereksinim Ekle" @click="reqModalVisible = true">
        <template v-slot:prepend>
          <v-icon color="success">mdi-bag-personal-plus-outline</v-icon>
        </template>
      </v-list-item>
    </div>
    <TeacherModal
      :visible="teacherModalVisible"
      @close="teacherModalVisible = false"
      @save="store.addTeacher($event)"
    />
    <RoomModal
      :visible="roomModalVisible"
      @close="roomModalVisible = false"
      @save="store.addRoom($event)"
    />
    <RequirementModal
      :visible="reqModalVisible"
      @close="reqModalVisible = false"
      @save="store.addRequirement($event)"
    />
    <CourseModal
      :visible="courseModalVisible"
      @close="courseModalVisible = false"
      @save="store.addCourse($event)"
    />
    <ClassroomModal
      :visible="classroomModalVisible"
      @close="classroomModalVisible = false"
      @save="store.addClassroom($event)"
    />
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const store = useScheduleStore()
const teacherModalVisible = ref(false)
const roomModalVisible = ref(false)
const reqModalVisible = ref(false)
const courseModalVisible = ref(false)
const classroomModalVisible = ref(false)

import RoomModal from '../modals/RoomModal.vue'
import TeacherModal from '../modals/TeacherModal.vue'
import RequirementModal from '../modals/RequirementModal.vue'
import CourseModal from '../modals/CourseModal.vue'
import ClassroomModal from '../modals/ClassroomModal.vue'
</script>