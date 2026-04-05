<template>
  <div class="align-center gap-3 pa-3">
    <!-- Kategori seçici -->
    <v-btn-toggle
      v-model="activeCategory"
      density="compact"
      variant="outlined"
      color="warning"
      rounded="lg"
    >
      <v-btn value="teachers" size="small">Öğretmen</v-btn>
      <v-btn value="classrooms" size="small">Sınıf</v-btn>
      <v-btn value="rooms" size="small">Derslik</v-btn>
    </v-btn-toggle>

    <!-- Seçilen kategorinin chipleri -->
    <div class="flex-wrap mt-2 ml-1">
      <v-chip-group
        :model-value="props.modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        class="flex-wrap"
        selected-class="text-primary"
        ><v-chip value="all" size="small" filter variant="flat" color="success" class="text-white">
          Tümü
        </v-chip>
        <v-chip
          v-for="option in activeOptions"
          :key="option.value"
          :value="option.value"
          size="small"
          filter
          color="success"
        >
          {{ option.label }}
        </v-chip>
      </v-chip-group>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
const props = defineProps(['options', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
const activeCategory = ref('teachers')

const teacherOptions = computed(() => props.options.filter((o) => o.type === 'teacher'))
const classroomOptions = computed(() => props.options.filter((o) => o.type === 'classroom'))
const roomOptions = computed(() => props.options.filter((o) => o.type === 'room'))

const activeOptions = computed(() => {
  if (activeCategory.value === 'teachers') return teacherOptions.value
  if (activeCategory.value === 'classrooms') return classroomOptions.value
  return roomOptions.value
})


</script>