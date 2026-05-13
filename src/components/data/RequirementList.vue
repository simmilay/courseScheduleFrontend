<template>
  <div>
    <div class="flex items-center justify-between px-4 py-3">
      <h2>Gereksinimler</h2>
      <v-btn color="warning" variant="elevated" prepend-icon="mdi-plus" size="small" class="rounded-2xl" @click="openAdd">
        Gereksinim Ekle
      </v-btn>
    </div>

    <v-divider />

    <v-data-table
      :headers="headers"
      :items="store.requirements"
      hide-default-footer
      :no-data-text="'Henüz sisteme gereksinim bilgisi girilmedi.'"
      sort-asc-icon="mdi-sort-ascending"
      sort-desc-icon="mdi-sort-descending"
    >
      <template #item.weekly_hours="{ item }">
        <v-chip color="orange" variant="tonal" size="small" label>
          {{ item.weekly_hours }} saat
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn icon="mdi-pencil-outline" variant="text" size="small" @click="openEdit(item)" />
        <v-btn icon="mdi-trash-can-outline" variant="text" size="small" color="error" @click="deleteRequirement(item)" />
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

    <RequirementModal
      :visible="modalVisible"
      :edit-item="editItem"
      @close="closeModal"
      @save="handleSave"
    />
    <DeleteModal
      :visible="deleteModalVis"
      :item-name="deleteItem ? `${deleteItem.classroom_name} · ${deleteItem.course_name}` : ''"
      @confirm="handleDelete"
      @cancel="deleteModalVis = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import RequirementModal from '../modals/RequirementModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'

const store = useScheduleStore()
const modalVisible = ref(false)
const deleteModalVis = ref(false)
const editItem = ref(null)
const deleteItem = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const headers = [
  { title: 'Sınıf', key: 'classroom_name', sortable: true },
  { title: 'Ders', key: 'course_name', sortable: true },
  { title: 'Haftalık Saat', key: 'weekly_hours', sortable: true },
  { title: 'İşlemler', key: 'actions', sortable: false, align: 'end' },
]

const openAdd = () => {
  editItem.value = null
  modalVisible.value = true
}

const openEdit = (req) => {
  editItem.value = req
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
  editItem.value = null
}

const handleSave = async (data) => {
  if (editItem.value) {
    await store.updateRequirement(editItem.value.id, data)
  } else {
    await store.addRequirement(data)
  }
}

const deleteRequirement = (req) => {
  deleteItem.value = req
  deleteModalVis.value = true
}

const handleDelete = async () => {
  await store.removeRequirement(deleteItem.value.id)
  deleteModalVis.value = false
  deleteItem.value = null
}

watch(currentPage, async (newPage) => {
  totalPages.value = await store.fetchRequirement(newPage)
})

onMounted(async () => {
  totalPages.value = await store.fetchRequirement(1)
  store.fetchCourse()
  store.fetchClassroom()
})
</script>
