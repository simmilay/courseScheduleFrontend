<template>
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
          {{ teacher.course.join(', ') }} · {{ teacher.off_day }} izinli
        </v-list-item-subtitle>
        <template v-slot:append>
          <v-btn
            icon="mdi-trash-can-outline"
            variant="text"
            size="small"
            color="error"
            @click="store.removeTeacher(teacher.id)"
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
  store.fetchTeacher()
})
</script>