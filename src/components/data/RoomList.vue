<template>
  <div>
    <v-alert v-if="store.rooms.length === 0" type="warning" class="ma-4">
      Henüz sisteme derslik bilgisi girilmedi.
    </v-alert>

    <div v-else class="pa-4">
      <v-list lines="two" density="compact">
        <v-list-item v-for="(room, index) in store.rooms" :key="index" rounded="lg" class="mb-1">
          <v-list-item-title class="font-weight-medium">
            {{ room.name }} · {{ room.room_type }}
          </v-list-item-title>
          <template v-slot:append>
            <v-btn icon="mdi-pencil" variant="text" @click="openEdit(room)"></v-btn>
            <v-btn
              icon="mdi-trash-can-outline"
              variant="text"
              size="small"
              color="error"
              @click="deleteRoom(room)"
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

    <RoomModal
      :visible="modalVisible"
      @close="modalVisible = false"
      @save="store.updateRoom(editItem.id, $event)"
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

const openEdit = (room) => {
  editItem.value = room
  modalVisible.value = true
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
