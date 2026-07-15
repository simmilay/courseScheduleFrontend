<template>
  <div class="flex items-center gap-3 pa-3 flex-wrap">
    <v-btn
      :variant="props.modelValue === 'all' ? 'elevated' : 'outlined'"
      color="success"
      size="small"
      rounded="lg"
      @click="selectAll"
    >
      Tümü
    </v-btn>

    <v-select
      v-model="selected.teacher"
      :items="teacherOptions"
      item-title="label"
      item-value="value"
      label="Öğretmen"
      density="compact"
      variant="outlined"
      clearable
      hide-details
      style="min-width: 160px"
      @update:model-value="onSelect('teacher', $event)"
    />

    <v-select
      v-model="selected.classroom"
      :items="classroomOptions"
      item-title="label"
      item-value="value"
      label="Sınıf"
      density="compact"
      variant="outlined"
      clearable
      hide-details
      style="min-width: 160px"
      @update:model-value="onSelect('classroom', $event)"
    />

    <v-select
      v-model="selected.room"
      :items="roomOptions"
      item-title="label"
      item-value="value"
      label="Derslik"
      density="compact"
      variant="outlined"
      clearable
      hide-details
      style="min-width: 160px"
      @update:model-value="onSelect('room', $event)"
    />
    <v-snackbar
      v-model="scheduleSnackbar"
      color="red"
      location="top end"
      :timeout="1500"
      rounded="pill"
    >
      {{ store.toast_message }}
      <template v-slot:actions>
        <v-btn icon="mdi-close" variant="text" @click="scheduleSnackbar = false"></v-btn>
      </template>
    </v-snackbar>
    <v-btn
      color="warning"
      class="mr-2"
      variant="tonal"
      :loading="store.loading"
      @click="generate_schedule"
      style="min-height: 41px"
      
    >
      Program Oluştur
    </v-btn>
  </div>
</template>

<script setup>
import { computed, reactive, watch ,ref} from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const props = defineProps(['options', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const selected = reactive({ teacher: null, classroom: null, room: null })

const teacherOptions = computed(() => props.options.filter((o) => o.type === 'teacher'))
const classroomOptions = computed(() => props.options.filter((o) => o.type === 'classroom'))
const roomOptions = computed(() => props.options.filter((o) => o.type === 'room'))

const store = useScheduleStore()
const scheduleSnackbar = ref(false)

const generate_schedule = async () => {
  const result = await store.generateSchedule()
  if (result === false) {
    scheduleSnackbar.value = true
  }
}
const onSelect = (type, value) => {
  if (value == null) {
    emit('update:modelValue', 'all')
    return
  }
  for (const key of Object.keys(selected)) {
    if (key !== type) selected[key] = null
  }
  emit('update:modelValue', value)
}

const selectAll = () => {
  selected.teacher = null
  selected.classroom = null
  selected.room = null
  emit('update:modelValue', 'all')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val === 'all') {
      selected.teacher = null
      selected.classroom = null
      selected.room = null
    }
  },
)
</script>


 