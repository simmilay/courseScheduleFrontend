<template>
 <v-alert v-if="store.rooms.length === 0" type="warning" class="ma-4">
  Henüz sisteme derslik bilgisi girilmedi.
 </v-alert>

  <div v-else class="pa-4">
    <v-list lines="two" density="compact">
      <v-list-item v-for="(room, index) in store.rooms" :key="index" rounded="lg" class="mb-1">
        <v-list-item-title class="font-weight-medium"
          >{{ room.name }} · {{ room.room_type }}</v-list-item-title
        >

        <template v-slot:append>
          <v-btn
            icon="mdi-trash-can-outline"
            variant="text"
            size="small"
            color="error"
            @click="store.removeRoom(room.id)"
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
  store.fetchRoom()
})
</script>