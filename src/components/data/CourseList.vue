<template>
  <v-alert v-if="store.course.length === 0" type="warning" class="ma-4">
    Henüz sisteme ders eklenmedi.
  </v-alert>

  <div v-else class="pa-4 flex flex-col h-full">
    <div class="flex-1">
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
              @click="deleteCourse(course)"
            />
          </template>
        </v-list-item>
      </v-list>
    </div>
    <v-pagination v-model="currentPage" :length="totalPages" class="p-2 border-t border-gray-200" />

    <CourseModal
      :visible="modalVisible"
      @close="modalVisible = false"
      @save="store.updateCourse(editItem.id, $event)"
      :edit-item="editItem"
    /><DeleteModal
      :visible="deleteModalVis"
      :item-name="deleteItem?.name"
      @confirm="handleDelete"
      @cancel="deleteModalVis = false"
    />

  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import CourseModal from '../modals/CourseModal.vue'
import { useScheduleStore } from '@/stores/schedule'
import DeleteModal from '../modals/DeleteModal.vue'

const store = useScheduleStore()
const modalVisible = ref(false)
const editItem = ref(null)
const deleteModalVis = ref(false)
const deleteItem = ref(null)

const currentPage = ref(1)
const totalPages = ref(1)

const openEdit = (course) => {
  editItem.value = course
  modalVisible.value = true
}

const deleteCourse = (course) => {
  deleteItem.value = course
  deleteModalVis.value = true
}

const handleDelete = async () => {
  await store.removeCourse(deleteItem.value.id)
  deleteModalVis.value = false
  deleteItem.value = null
}

watch(currentPage, async (newPage) => {
  totalPages.value = await store.fetchCourse(newPage)
})

onMounted(async () => {
  totalPages.value = await store.fetchCourse(1)
})
</script>
