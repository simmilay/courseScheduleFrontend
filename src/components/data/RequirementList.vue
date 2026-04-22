<template>
  <v-alert v-if="store.requirements.length === 0" type="warning" class="ma-4">
    Henüz sisteme sınıf bilgisi girilmedi.
  </v-alert>

  <div v-else class="pa-4">
    <v-list lines="two" density="compact">
      <v-list-item
        v-for="(req, index) in store.requirements"
        :key="index"
        rounded="lg"
        class="mb-1"
      >
        <v-list-item-title class="font-weight-medium"
          >{{ req.classroom_name }} · {{ req.course_name }}</v-list-item-title
        >
        <v-list-item-subtitle> {{ req.weekly_hours }} saat </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-pencil" @click="openEdit(req)"></v-btn>
          <v-btn
            icon="mdi-trash-can-outline"
            variant="text"
            size="small"
            color="error"
            @click="deleteRequirement(req)"
          />
        </template>
      </v-list-item>
    </v-list>
    <v-pagination v-model="currentPage" :length="totalPages" class="p-2 border-t border-gray-200" />
    
    <RequirementModal
      :visible="modalVisible"
      :edit-item="editItem"
      @close="modalVisible = false"
      @save="store.updateRequirement(editItem.id, $event)"
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
import RequirementModal from '../modals/RequirementModal.vue'
import DeleteModal from '../modals/DeleteModal.vue'
const store = useScheduleStore()

const modalVisible = ref(false)
const editItem = ref({})
const currentPage = ref(1)
const totalPages = ref(1)
const deleteModalVis = ref(false)
const deleteItem = ref(null)

const openEdit = (requirements) => {
  editItem.value = requirements
  modalVisible.value = true
}

const deleteRequirement = (requirements) => {
  deleteItem.value = requirements
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