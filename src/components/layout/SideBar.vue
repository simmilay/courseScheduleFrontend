<template>
  <v-navigation-drawer permanent width="250">
    <v-list-item title="Öğretmen Ekle" @click="teacherModalVisible = true">
      <template v-slot:prepend>
        <v-icon class="text-lime-700">mdi-account-box-plus-outline</v-icon>
      </template>
    </v-list-item>

    <v-list-item title="Derslik Ekle" @click="roomModalVisible = true">
      <template v-slot:prepend>
        <v-icon class="text-lime-700">mdi-flask-empty-plus-outline</v-icon>
      </template>
    </v-list-item>

    <v-list-item title="Sınıf - Ders Ekle" @click="reqModalVisible = true">
      <template v-slot:prepend>
        <v-icon class="text-lime-700">mdi-bag-personal-plus-outline</v-icon>
      </template>
    </v-list-item>
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
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const store = useScheduleStore()
const teacherModalVisible = ref(false)
const roomModalVisible = ref(false)
const reqModalVisible = ref(false)

import RoomModal from '../modals/RoomModal.vue'
import TeacherModal from '../modals/TeacherModal.vue'
import RequirementModal from '../modals/RequirementModal.vue'

RoomModal
</script>