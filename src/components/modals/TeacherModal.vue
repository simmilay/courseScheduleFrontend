<template>
  <v-dialog :model-value="props.visible" width="600">
    <v-card>
      <v-card-title class="mt-3">Öğretmen Ekle</v-card-title>
      <v-card-text
        ><div class="flex flex-col gap-4 mb-2">
          <v-text-field v-model="name" label="Öğretmen Adı" variant="outlined"></v-text-field>
          <v-select
            v-model="course"
            label="Verebileceği Dersler"
            variant="outlined"
            multiple
            :items="all_courses"
          ></v-select>
          <v-checkbox v-model="is_off_day" label="Boş Günü Var Mı ?"></v-checkbox>
          <v-select
          v-show="is_off_day"
            label="Boş Günü"
            :items="store.off_days"
            v-model="off_day"
            variant="outlined"
            item-title="title"
            item-value="value"
          ></v-select></div
      ></v-card-text>
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
import { onMounted, ref, computed, watch } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
const store = useScheduleStore()

const props = defineProps(['visible', 'editItem'])
const emit = defineEmits(['close', 'save'])
const is_off_day = ref(false)
const all_courses = computed(() => store.course.map((cr) => ({ title: cr.name, value: cr.id })))

const name = ref('')
const course = ref([])
const off_day = ref(null)

const save = () => {
  emit('save', { name: name.value, course: course.value, off_day: off_day.value })
  name.value = ''
  course.value = []
  off_day.value = null
  is_off_day.value = false
  emit('close')
}

const close = () => {
  name.value = ''
  course.value = []
  off_day.value = null
  is_off_day.value = false
  emit('close')
}

watch(
  () => props.editItem,
  (val) => {
    name.value = val ? val.name : ''
    course.value = val ? val.course : []
    off_day.value = val ? val.off_day : null
  }
)

onMounted(async () => {
  store.fetchCourse()
  await store.fetchOffDay()
})
</script>
