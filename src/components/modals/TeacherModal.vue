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
          <v-select
            label="Boş Günü"
            :items="off_day_choices"
            v-model="off_day"
            variant="outlined"
          ></v-select></div
      ></v-card-text>
      <v-card-actions class="mb-3 mr-3">
        <div class="flex gap-3 justify-end">
          <v-btn @click="emit('close')">İptal</v-btn>
          <v-btn color="success" variant="elevated" @click="save">Ekle</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
const store = useScheduleStore()

onMounted(() => {
  store.fetchCourse()
})

const props = defineProps(['visible'])
const emit = defineEmits(['close', 'save'])

const all_courses = computed(() => store.course.map((cr) => ({ title: cr.name, value: cr.id })))

const off_day_choices = [
  { title: 'Pazartesi', value: 'Pazartesi' },
  { title: 'Salı', value: 'Sali' },
  { title: 'Çarşamba', value: 'Carsamba' },
  { title: 'Perşembe', value: 'Persembe' },
  { title: 'Cuma', value: 'Cuma' },
]

const name = ref('')
const course = ref([])
const off_day = ref('')

const save = () => {
  emit('save', { name: name.value, course: course.value, off_day: off_day.value })
  name.value = ''
  course.value = []
  off_day.value = ''
  emit('close')
}
</script>
