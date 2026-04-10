<template>
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
</template>

<script setup>
import { onMounted } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const store = useScheduleStore()

onMounted(() => {
  store.fetchClassroom()
})
</script>
