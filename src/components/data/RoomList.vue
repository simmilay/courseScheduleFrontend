<template>
  <div>
    <div class="flex items-center justify-between px-4 py-3">
      <h2>Derslikler</h2>
      <v-btn color="warning" variant="elevated" prepend-icon="mdi-plus" size="small" class="rounded-2xl" @click="openAdd">
        Derslik Ekle
      </v-btn>
    </div>

    <v-divider />

    <v-data-table
      :headers="headers"
      :items="store.rooms"
      hide-default-footer
      :no-data-text="'Henüz sisteme derslik bilgisi girilmedi.'"
      sort-asc-icon="mdi-sort-ascending"
      sort-desc-icon="mdi-sort-descending"
    >
      <template #item.room_type="{ item }">
        <v-chip
          :color="item.room_type === 'lab' ? 'purple' : 'blue'"
          variant="tonal"
          size="small"
          label
        >
          {{ item.room_type === 'lab' ? 'Laboratuvar' : 'Normal Derslik' }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn icon="mdi-pencil-outline" variant="text" size="small" @click="openEdit(item)" />
        <v-btn icon="mdi-trash-can-outline" variant="text" size="small" color="error" @click="deleteRoom(item)" />
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

    <RoomModal
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
import RoomModal from '../modals/RoomModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'

const store = useScheduleStore()
const modalVisible = ref(false)
const deleteModalVis = ref(false)
const editItem = ref(null)
const deleteItem = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const headers = [
  { title: 'Derslik Adı', key: 'name', sortable: true },
  { title: 'Tip', key: 'room_type', sortable: false },
  { title: 'İşlemler', key: 'actions', sortable: false, align: 'end' },
]

const openAdd = () => {
  editItem.value = null
  modalVisible.value = true
}

const openEdit = (room) => {
  editItem.value = room
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
  editItem.value = null
}

const handleSave = async (data) => {
  if (editItem.value) {
    await store.updateRoom(editItem.value.id, data)
  } else {
    await store.addRoom(data)
  }
}

const deleteRoom = (room) => {
  deleteItem.value = room
  deleteModalVis.value = true
}

const handleDelete = async () => {
  await store.removeRoom(deleteItem.value.id)
  deleteModalVis.value = false
  deleteItem.value = null
}

watch(currentPage, async (newPage) => {
  totalPages.value = await store.fetchRoom(newPage)
})

onMounted(async () => {
  totalPages.value = await store.fetchRoom(1)
})
</script>
