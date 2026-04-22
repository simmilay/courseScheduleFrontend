<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <div class="d-flex align-center gap-4 w-100">
          <span class="font-weight-medium">
            {{ idx === 0 ? 'En İyi Program' : 'Alternatif ' + idx }}
          </span>
          <v-chip
            size="small"
            :color="
              props.sol.fitness >= 80 ? 'success' : props.sol.fitness >= 50 ? 'warning' : 'error'
            "
          >
            {{ props.sol.fitness }}%
          </v-chip>
          <v-progress-linear
            :model-value="props.sol.fitness"
            :color="
              props.sol.fitness >= 80 ? 'success' : props.sol.fitness >= 50 ? 'warning' : 'error'
            "
            rounded
            height="6"
            class="flex-1"
          />
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-if="props.sol.accupancy" class="flex gap-2">
          <v-chip size="small" color="success">Yoğunluk: %{{ props.sol.accupancy?.rate }}</v-chip>
        <v-progress-linear
          :model-value="props.sol.accupancy?.rate"
          :color="
            props.sol.accupancy?.rate >= 80
              ? 'error'
              : props.sol.accupancy?.rate >= 50
              ? 'warning'
              : 'success'
          "
          rounded
          height="6"
          class="flex-1"
        /></div>
        <ScheduleTable :schedule="props.sol.schedule" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

     <script setup>
import ScheduleTable from './ScheduleTable.vue'


const props = defineProps(['sol', 'idx'])
</script>