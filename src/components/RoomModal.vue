<template>
  <v-dialog :model-value="props.visible">
    <v-card>
      <v-card-title>Derslikler</v-card-title>
      <v-card-text>
        <div class="flex flex-col gap-4 mb-2">
          <v-text-field v-model="name" label="Derslik Adı" variant="outlined"></v-text-field>
          <v-select
            label="Derslik Tipi"
            :items="['Normal Derslik','Laboratuvar']"
            v-model="room_type"
            variant="outlined"
          ></v-select>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="flex gap-3 justify-end">
          <v-btn @click="emit('close')">İptal</v-btn>
          <v-btn color="primary" @click="save">Save</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['visible'])
const emit = defineEmits(['close', 'save'])

const name = ref('')
const room_type = ref('')

const save = () => {
  emit('save', { name: name.value, room_type: room_type.value ==='Laboratuvar' ? 'lab' : 'normal' })
  name.value = ''
  room_type.value = ''
  emit('close')
}
</script>