<template>
  <v-dialog :model-value="props.visible">
    <v-card>
      <v-card-title>Öğretmen Ekle</v-card-title>
      <v-card-text
        ><div class="flex flex-col gap-4 mb-2">
          <v-text-field v-model="name" label="Öğretmen Adı" variant="outlined"></v-text-field>
          <!-- <v-text-field
            v-model="course"
            label="Verebileceği Dersler"
            variant="outlined"
          ></v-text-field> -->
          <v-select
            v-model="course"
            label="Verebileceği Dersler"
            variant="outlined"
            multiple
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
          <v-select
            label="Boş Günü"
            :items="['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']"
            v-model="off_day"
            variant="outlined"
          ></v-select></div
      ></v-card-text>
      <v-card-actions>
        <div class="flex gap-3 justify-end">
          <v-btn @click="emit('close')">İptal</v-btn>
          <v-btn color="primary" @click="save">Ekle</v-btn>
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
const course = ref([])
const off_day = ref('')

const save = () => {
  emit('save', { name: name.value, course: course.value, off_day: off_day.value })
  name.value = ''
  course.value = []
  off_day.value = ''
  // vue emit içerisindeki objeyi $event olarak alır
  emit('close')
}
</script>
