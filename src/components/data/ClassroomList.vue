<template>
  <div>
    <v-alert v-if="store.classrooms.length === 0" type="warning" class="ma-4">
      Henüz sisteme sınıf eklenmedi.
    </v-alert>

    <div v-else class="pa-4">
      <v-list lines="two" density="compact">
        <v-list-item
          v-for="(classroom, index) in store.classrooms"
          :key="index"
          rounded="lg"
          class="mb-1"
        >
          <v-list-item-title class="font-weight-medium">{{ classroom.name }}</v-list-item-title>
          <template v-slot:append>
            <v-btn icon="mdi-pencil" variant="text" @click="openEdit(classroom)"></v-btn>
            <v-btn
              icon="mdi-trash-can-outline"
              variant="text"
              size="small"
              color="error"
              @click="deleteClassroom(classroom)"
            />
          </template>
        </v-list-item>
      </v-list>
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        class="p-2 border-t border-gray-200"
      />
    </div>

    <ClassroomModal
      :visible="modalVisible"
      @close="modalVisible = false"
      @save="store.updateClassroom(editItem.id, $event)"
      :edit-item="editItem"
    />

    <DeleteModal
      :visible="deleteModalVis"
      :item-name="deleteItem?.name"
      @confirm="handleDelete"
      @cancel="deleteModalVis = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import ClassroomModal from '../modals/ClassroomModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'
const store = useScheduleStore()
const modalVisible = ref(false)
const editItem = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const deleteModalVis = ref(false)
const deleteItem = ref(null)

const openEdit = (classroom) => {
  editItem.value = classroom
  modalVisible.value = true
}

const deleteClassroom = (classroom) => {
  deleteItem.value = classroom
  deleteModalVis.value = true
}

const handleDelete = async () => {
  await store.removeClassroom(deleteItem.value.id)
  deleteModalVis.value = false
  deleteItem.value = null
}
watch(currentPage, async (newPage) => {
  totalPages.value = await store.fetchClassroom(newPage)
})
onMounted(async () => {
  totalPages.value = await store.fetchClassroom(1)
})
</script>
