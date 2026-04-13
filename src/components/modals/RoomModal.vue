<template>
  <v-dialog :model-value="props.visible" width="600">
    <v-card>
      <v-card-title class="mt-3">Derslikler</v-card-title>
      <v-card-text>
        <div class="flex flex-col gap-4 mb-2">
          <v-text-field v-model="name" label="Derslik Adı" variant="outlined"></v-text-field>
          <v-select
            label="Derslik Tipi"
            :items="['Normal Derslik', 'Laboratuvar']"
            v-model="room_type"
            variant="outlined"
          ></v-select>
        </div>
      </v-card-text>
      <v-card-actions class="mb-3 mr-3">
        <div class="flex gap-3 justify-end">
          <v-btn @click="close">İptal</v-btn>
          <v-btn color="success" variant="elevated" @click="save">Kaydet</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['visible', 'editItem'])
const emit = defineEmits(['close', 'save'])

const name = ref('')
const room_type = ref('')

const ROOM_TYPE_LABEL = { normal: 'Normal Derslik', lab: 'Laboratuvar' }

watch(
  () => props.editItem,
  (val) => {
    name.value = val ? val.name : ''
    room_type.value = val ? ROOM_TYPE_LABEL[val.room_type] : ''
  }
)

const save = () => {
  emit('save', {
    name: name.value,
    room_type: room_type.value === 'Laboratuvar' ? 'lab' : 'normal',
  })
  name.value = ''
  room_type.value = ''
  emit('close')
}

const close = () => {
  name.value = ''
  room_type.value = ''
  emit('close')
}
</script>