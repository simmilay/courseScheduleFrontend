<template>
  <div>
    <v-alert v-if="store.teachers.length === 0" type="warning" class="ma-4">
      Henüz sisteme öğretmen eklenmedi.
    </v-alert>

    <div v-else class="pa-4">
      <v-list lines="two" density="compact">
        <v-list-item
          v-for="(teacher, index) in store.teachers"
          :key="index"
          rounded="lg"
          class="mb-1"
        >
          <v-list-item-title class="font-weight-medium">{{ teacher.name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ teacher.course_names.join(', ') }} · {{ DAY_LABELS[teacher.off_day] }} izinli
          </v-list-item-subtitle>
          <template v-slot:append>
            <div class="flex gap-5"></div>
            <v-btn icon="mdi-pencil" variant="text" @click="openEdit(teacher)"> </v-btn>
            <v-btn
              icon="mdi-trash-can-outline"
              variant="text"
              size="small"
              color="error"
              @click="deleteTeacher(teacher)"
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

    <TeacherModal
      :visible="modalVisble"
      @close="modalVisble = false"
      @save="store.updateTeacher(editItem.id, $event)"
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
import TeacherModal from '../modals/TeacherModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'

const DAY_LABELS = {
  1: 'Pazartesi',
  2: 'Salı',
  3: 'Çarşamba',
  4: 'Perşembe',
  5: 'Cuma',
}

const store = useScheduleStore()

const editItem = ref(null)
const modalVisble = ref(false)

const currentPage = ref(1)
const totalPages = ref(1)

const deleteModalVis = ref(false)
const deleteItem = ref(null)
const openEdit = (teacher) => {
  editItem.value = teacher
  modalVisble.value = true
}

const deleteTeacher = (teacher) => {
  deleteItem.value = teacher
  deleteModalVis.value = true
}

const handleDelete = async () => {
  await store.removeTeacher(deleteItem.value.id)
  deleteModalVis.value = false
  deleteItem.value = null
}

watch(currentPage, async (newPage) => {
  totalPages.value = await store.fetchTeacher(newPage)
})

onMounted(async () => {
  totalPages.value = await store.fetchTeacher(currentPage.value)
})
</script>