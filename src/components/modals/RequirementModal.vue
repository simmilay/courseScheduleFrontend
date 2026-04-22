<template>
  <v-dialog :model-value="props.visible" width="600">
    <v-card>
      <v-card-title class="mt-4">Ders Gereksinimleri</v-card-title>
      <v-card-text>
        <div class="flex flex-col gap-4 mb-2">
          <v-select
            label="Sınıf Seçiniz"
            :items="all_classrooms"
            v-model="classroom"
            variant="outlined"
          ></v-select>
          <v-select
            label="Ders Seçiniz"
            v-model="course"
            variant="outlined"
            :items="all_courses"
          ></v-select>
          <v-text-field
            label="Haftalık Ders Saati"
            v-model="weekly_hour"
            type="number"
            variant="outlined"
          ></v-text-field>
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
import { computed, ref, watch } from 'vue'
import { useScheduleStore } from '@/stores/schedule'

const props = defineProps(['visible', 'editItem'])
const emit = defineEmits(['close', 'save'])
const store = useScheduleStore()

const all_classrooms = computed(() => store.classrooms.map((c) => ({ title: c.name, value: c.id })))
const all_courses = computed(() => store.course.map((c) => ({ title: c.name, value: c.id })))

const classroom = ref('')
const weekly_hour = ref('')
const course = ref('')

const save = () => {
  emit('save', {
    classroom: classroom.value,
    course: course.value,
    weekly_hours: parseInt(weekly_hour.value),
  })
  classroom.value = ''
  weekly_hour.value = ''
  course.value = ''
  emit('close')
}

const close = () => {
  classroom.value = ''
  weekly_hour.value = ''
  course.value = ''
  emit('close')
}

watch(
  () => props.editItem,
  (val) => {
    classroom.value = val ? val.classroom : ''
    weekly_hour.value = val ? val.weekly_hours : ''
    course.value = val ? val.course : ''
  }
)
</script>
