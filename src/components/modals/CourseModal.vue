<template>
  <v-dialog :model-value="props.visible" width="600">
    <v-card>
      <v-card-title class="mt-4"> Ders Ekle </v-card-title>
      <v-card-text>
        <div class="flex flex-col mb-2">
          <v-text-field v-model="name" label="Ders Adı" variant="outlined" required></v-text-field>
          <v-checkbox label="Laboratuvar dersi mi ? " v-model="is_lab"></v-checkbox>
          <v-select
            v-show="is_lab"
            :items="lab_name"
            v-model="lab"
            label="Laboratuvar Adı"
            variant="outlined"
            multiple
          ></v-select>
        </div>
      </v-card-text>
      <v-card-actions class="mb-3 mr-3">
        <div class="flex gap-3 justify-end">
          <v-btn @click="close">İptal</v-btn>
          <v-btn @click="save" variant="elevated" color="success">Kaydet</v-btn>
        </div>
      </v-card-actions></v-card
    >
  </v-dialog>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const store = useScheduleStore()

const props = defineProps(['visible', 'editItem'])
const emit = defineEmits(['close', 'save'])

const name = ref('')
const is_lab = ref(false)
const lab = ref([])

const lab_name = computed(() => store.lab_rooms.map((room) => room.name))

const save = () => {
  emit('save', {
    name: name.value,
    is_lab: is_lab.value,
    lab: lab.value,
  })
  name.value = ''
  is_lab.value = false
  lab.value = ''
  emit('close')
}

const close = () => {
  name.value = ''
  is_lab.value = false
  lab.value = ''
  emit('close')
}
watch(
  () => props.editItem,
  (val) => {
    name.value = val ? val.name : ''
    is_lab.value = val ? val.is_lab : false
    lab.value = val ? val.lab : []
  }
)
onMounted(() => {
  store.fetchLabRoom()
})
</script>