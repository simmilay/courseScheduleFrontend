<template>
  <div>
    <v-divider :thickness="2" color="success"></v-divider>

    <v-alert v-if="store.results.length === 0" type="warning" class="ma-4">
      Henüz program oluşturulmadı.
    </v-alert>

    <div v-else class="pa-4">
      <FilterChips v-model="selectedFilter" :options="filterOptions" />

      <v-card v-for="(sol, idx) in filteredResult" :key="idx" class="mb-4">
        <ResultCard :sol="sol" :idx="idx" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import FilterChips from '../components/schedule/FilterChips.vue'
import ResultCard from '@/components/schedule/ResultCard.vue'

const store = useScheduleStore()
const selectedFilter = ref('all')

const filterOptions = computed(() => {
  if (!store.results?.length) return []

  const teachers = new Set()
  const classrooms = new Set()
  const rooms = new Set()

  store.results.forEach((sol) => {
    Object.values(sol.schedule).forEach((hours) => {
      Object.values(hours).forEach((entries) => {
        entries.forEach((e) => {
          teachers.add(e.teacher), classrooms.add(e.classroom), rooms.add(e.room)
        })
      })
    })
  })

  return [
    ...[...teachers].map((t) => ({ label: t, value: t, type: 'teacher' })),
    ...[...classrooms].map((c) => ({ label: c, value: c, type: 'classroom' })),
    ...[...rooms].map((r) => ({ label: r, value: r, type: 'room' })),
  ]
})

const filteredResult = computed(() => {
  if (selectedFilter.value === 'all') {
    return store.results
  } else {
    return store.results.map((sol) => {
      const total = 5*7
      let count = 0

      const filteredSchedule = Object.fromEntries(
        Object.entries(sol.schedule).map(([day, hours]) => [
          day,
          Object.fromEntries(
            Object.entries(hours).map(([hour, entries]) => {
              const filteredEntries = entries.filter(
                (e) =>
                  e.teacher === selectedFilter.value ||
                  e.classroom === selectedFilter.value ||
                  e.room === selectedFilter.value
              )
              if (filteredEntries.length > 0) count++
              return [hour, filteredEntries]
            })
          ),
        ])
      )
      return {
        ...sol,
        schedule: filteredSchedule,
        accupancy: {
          accupied: count,
          total: total,
          rate: Math.round((count / total) * 100),
        },
      }
    })
  }
})

onMounted(() => {
  store.fetchSchedule()
})
</script>