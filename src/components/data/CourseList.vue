<template>
  <v-alert v-if="store.course.length === 0" type="warning" class="ma-4">
    Henüz sisteme ders eklenmedi.
  </v-alert>

  <div v-else class="pa-4">
    <v-list lines="two" density="compact">
      <v-list-item v-for="(course, index) in store.course" :key="index" rounded="lg" class="mb-1">
        <v-list-item-title class="font-weight-medium">{{ course.name }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ course.is_lab ? 'Laboratuvar Dersi' : 'Normal Ders' }}
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn icon="mdi-pencil" variant="text" @click="openEdit(course)"></v-btn>
          <v-btn
            icon="mdi-trash-can-outline"
            variant="text"
            size="small"
            color="error"
            @click="store.removeCourse(course.id)"
          />
        </template>
      </v-list-item>
    </v-list>
    <CourseModal
      :visible="modalVisible"
      @close="modalVisible = false"
      @save="store.updateCourse(editItem.id, $event)"
      :edit-item="editItem"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CourseModal from '../modals/CourseModal.vue'
import { useScheduleStore } from '@/stores/schedule'

const store = useScheduleStore()
const modalVisible = ref(false)
const editItem = ref(null)

const openEdit = (course) => {
  editItem.value = course
  modalVisible.value = true
}

onMounted(() => {
  store.fetchCourse()
})
</script>
