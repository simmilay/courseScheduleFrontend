<template>
  <v-dialog :model-value="props.visible" width="600">
    <v-card>
      <v-card-title class="mt-3">Sınıf Ekle</v-card-title>
      <v-card-text>
        <div class="flex flex-col gap-4 mb-2">
          <v-text-field v-model="name" label="Sınıf Adı" variant="outlined"></v-text-field>
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

watch(() =>
props.editItem , (val) => {
  name.value = val ? val.name : ''
})

const save = () => {
  
  emit('save', { name: name.value })
  name.value = ''
  emit('close')
}

const close = () => {
  name.value = ''
  emit('close')
}
</script>
