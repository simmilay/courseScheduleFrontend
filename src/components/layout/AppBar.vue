<template>
  <v-app-bar elevation="1">
    <v-app-bar-title>Ders Planlama</v-app-bar-title>

    <v-tabs v-model="activeTab" color="success">
      <v-tab value="/home" :to="{ name: 'Home' }">Programlar</v-tab>
      <v-tab value="/data" :to="{ name: 'Data' }">Veriler</v-tab>
    </v-tabs>

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
      color="success"
      class="mr-2"
      variant="tonal"
      :loading="store.loading"
      @click="generate_schedule"
    >
      Program Oluştur
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useScheduleStore } from '@/stores/schedule'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const store = useScheduleStore()
const scheduleSnackbar = ref(false)
const route = useRoute()

const activeTab = computed(() => route.path)

const generate_schedule = async () => {
  const result = await store.generateSchedule()
  if (result === false) {
    scheduleSnackbar.value = true
  }
}
</script>