<template>
  <div>
    <div class="flex items-center justify-between px-4 py-3">
      <h2>Dersler</h2>
      <v-btn color="warning" variant="elevated" prepend-icon="mdi-plus" size="small" class="rounded-2xl" @click="openAdd">
        Ders Ekle
      </v-btn>
    </div>

    <v-divider />

    <v-data-table
      :headers="headers"
      :items="store.course"
      hide-default-footer
      :no-data-text="'Henüz sisteme ders eklenmedi.'"
      sort-asc-icon="mdi-sort-ascending"
      sort-desc-icon="mdi-sort-descending"

    >
      <template #item.is_lab="{ item }">
        <v-chip
          :color="item.is_lab ? 'purple' : 'blue'"
          variant="tonal"
          size="small"
          label
        >
          {{ item.is_lab ? 'Laboratuvar Dersi' : 'Normal Ders' }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn icon="mdi-pencil-outline" variant="text" size="small" @click="openEdit(item)" />
        <v-btn icon="mdi-trash-can-outline" variant="text" size="small" color="error" @click="deleteCourse(item)" />
      </template>
    </v-data-table>

    <v-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :length="totalPages"
      density="compact"
      :total-visible="5"
      class="py-2 border-t"
    />

    <CourseModal
      :visible="modalVisible"
      @close="closeModal"
      @save="handleSave"
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
import CourseModal from '../modals/CourseModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'

const store = useScheduleStore()
const modalVisible = ref(false)
const deleteModalVis = ref(false)
const editItem = ref(null)
const deleteItem = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const headers = [
  { title: 'Ders Adı', key: 'course_name', sortable: true },
  { title: 'Tip', key: 'is_lab', sortable: false },
  { title: 'İşlemler', key: 'actions', sortable: false, align: 'end' },
]

const openAdd = () => {
  editItem.value = null
  modalVisible.value = true
}

const openEdit = (course) => {
  editItem.value = course
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
  editItem.value = null
}

const handleSave = async (data) => {
  if (data.type === 'edit') {
    await store.updateCourse(editItem.value.id, {
      course: editItem.value.course,
      is_lab: data.is_lab,
      allowed_rooms: data.allowed_rooms,
    })
  } else if (data.type === 'default') {
    for (const courseId of data.courses) {
      await store.addCourse({ course: courseId, is_lab: data.is_lab, allowed_rooms: data.allowed_rooms })
    }
  } else {
    await store.addCustomCourse({ name: data.name, is_lab: data.is_lab, allowed_rooms: data.allowed_rooms })
  }
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
