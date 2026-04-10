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
              @click="store.removeClassroom(classroom.id)"
            />
          </template>
        </v-list-item>
      </v-list>
    </div>

    <ClassroomModal
      :visible="modalVisible"
      @close="modalVisible = false"
      @save="store.updateClassroom(editItem.id, $event)"
      :edit-item="editItem"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import ClassroomModal from '../modals/ClassroomModal.vue'

const store = useScheduleStore()
const modalVisible = ref(false)
const editItem = ref(null)

const openEdit = (classroom) => {
  editItem.value = classroom
  modalVisible.value = true
}

onMounted(() => {
  store.fetchClassroom()
})
</script>
