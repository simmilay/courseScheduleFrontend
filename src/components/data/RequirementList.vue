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
            @click="store.removeRequirement(req.id)"
          />
        </template>
      </v-list-item>
    </v-list>
    <RequirementModal
      :visible="modalVisible"
      :edit-item="editItem"
      @close="modalVisible = false"
      @save="store.updateRequirement(editItem.id, $event)"
    />
  </div>
</template>    



<script setup>
import { onMounted, ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import RequirementModal from '../modals/RequirementModal.vue'
const store = useScheduleStore()

const modalVisible = ref(false)
const editItem = ref({})

const openEdit = (requirements) => {
  editItem.value = requirements
  modalVisible.value = true
}

onMounted(() => {
  store.fetchRequirement()
})
</script>