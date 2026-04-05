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
          >{{ req.classroom }} · {{ req.course }}</v-list-item-title
        >
        <v-list-item-subtitle> {{ req.weekly_hours }} saat </v-list-item-subtitle>
        <template v-slot:append>
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
  </div>
</template>    



<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
const store = useScheduleStore()

onMounted(() => {
  store.fetchRequirement()
})
</script>