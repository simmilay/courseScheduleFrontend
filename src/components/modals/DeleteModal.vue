<template>
  <v-dialog :model-value="props.visible" width="500" lass="rounded-lg">
    <v-card class="rounded-lg border-red-500 border-t-4 p-3">
      <v-card-title class="text-xl font-bold text-red-500 mt-2">Emin misiniz ? </v-card-title>
      <v-card-text
        ><b>{{ props.itemName }} </b> ögesini silmek istediğinize emin misiniz?
      </v-card-text>
      <v-card-actions>
        <v-btn variant="tonal" color="red" class="rounded-lg" @click="emit('cancel')">İptal</v-btn>
        <v-btn variant="flat" class="rounded-lg" color="red" @click="emit('confirm')">Sil</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
import { ref } from 'vue'

const props = defineProps(['visible', 'itemName'])
const emit = defineEmits(['cancel', 'confirm'])
</script>