<template>
  <v-dialog :model-value="props.visible">
    <v-card>
      <v-card-title>Ders Gereksinimleri</v-card-title>
      <v-card-text>
        <div class="flex flex-col gap-4 mb-2">
          <v-text-field label="Sınıf" v-model="classroom" variant="outlined"></v-text-field>
          <!-- <v-text-field label="Ders Adı" v-model="course" variant="outlined"></v-text-field> -->
          <v-select
            label="Ders Adı"
            v-model="course"
            variant="outlined"
            :items="[
              'Matematik',
              'Fizik',
              'Kimya',
              'Biyoloji',
              'Edebiyat',
              'Tarih',
              'Coğrafya',
              'İngilizce',
              'Programlama',
              'Geometri',
            ]"
          ></v-select>
          <v-text-field
            label="Haftalık Ders Saati"
            v-model="weekly_hour"
            type="number"
            variant="outlined"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <div class="flex gap-3 justify-end">
          <v-btn @click="emit('close')">İptal</v-btn>
          <v-btn @click="save" color="primary">Ekle</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['visible'])
const emit = defineEmits(['close', 'save'])

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
</script>