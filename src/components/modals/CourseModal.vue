<template>
  <v-dialog :model-value="props.visible" width="600">
    <v-card>
      <v-card-title class="mt-4">
        {{ props.editItem ? 'Ders Düzenle' : 'Ders Ekle' }}
      </v-card-title>
      <v-card-text>
        <div class="flex flex-col mb-2">
          <v-btn-toggle
            v-if="!props.editItem"
            v-model="mode"
            mandatory
            density="compact"
            class="mb-4 self-start"
          >
            <v-btn value="default">Sistemden Seç</v-btn>
            <v-btn value="custom">Yeni Ders</v-btn>
          </v-btn-toggle>

          <v-select
            v-if="!props.editItem && mode === 'default'"
            v-model="selectedCourses"
            :items="availableDefaultCourses"
            label="Ders Seç"
            variant="outlined"
            multiple
            chips
            closable-chips
            no-data-text="Eklenecek varsayılan ders kalmadı."
          />

          <v-text-field
            v-if="!props.editItem && mode === 'custom'"
            v-model="name"
            label="Ders Adı"
            variant="outlined"
            required
          />

          <v-checkbox label="Laboratuvar dersi mi?" v-model="is_lab" />
          <v-select
            v-show="is_lab"
            :items="lab_name"
            v-model="lab"
            label="Laboratuvar Odası"
            variant="outlined"
            multiple
            chips
            closable-chips
          />
        </div>
      </v-card-text>
      <v-card-actions class="mb-3 mr-3">
        <div class="flex gap-3 justify-end">
          <v-btn @click="close">İptal</v-btn>
          <v-btn @click="save" variant="elevated" color="success">Kaydet</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const store = useScheduleStore()

const props = defineProps(['visible', 'editItem'])
const emit = defineEmits(['close', 'save'])

const mode = ref('default')
const name = ref('')
const selectedCourses = ref([])
const is_lab = ref(false)
const lab = ref([])

const lab_name = computed(() =>
  store.lab_rooms.map((room) => ({ title: room.name, value: room.id }))
)

const availableDefaultCourses = computed(() => {
  const addedCourseIds = new Set(store.course.map((sc) => sc.course))
  return store.default_courses
    .filter((c) => !addedCourseIds.has(c.id))
    .map((c) => ({ title: c.name, value: c.id }))
})

const reset = () => {
  mode.value = 'default'
  name.value = ''
  selectedCourses.value = []
  is_lab.value = false
  lab.value = []
}

const save = () => {
  if (props.editItem) {
    emit('save', { type: 'edit', is_lab: is_lab.value, allowed_rooms: lab.value })
  } else if (mode.value === 'default') {
    emit('save', { type: 'default', courses: selectedCourses.value, is_lab: is_lab.value, allowed_rooms: lab.value })
  } else {
    emit('save', { type: 'custom', name: name.value, is_lab: is_lab.value, allowed_rooms: lab.value })
  }
  reset()
  emit('close')
}

const close = () => {
  reset()
  emit('close')
}

watch(
  () => props.editItem,
  (val) => {
    if (val) {
      is_lab.value = val.is_lab ?? false
      lab.value = val.allowed_rooms ?? []
    } else {
      reset()
    }
  }
)

onMounted(() => {
  store.fetchLabRoom()
  store.fetchDefaultCourses()
})
</script>
