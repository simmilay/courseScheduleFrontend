<template>
  <table class="w-full text-xs border-collapse">
    <thead>
      <tr class="bg-gray-50">
        <th
          class="border-b border-gray-200 px-2 py-2 text-left text-gray-500 font-bold uppercase tracking-wider"
        >
          Saat
        </th>
        <th
          v-for="day in ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']"
          :key="day"
          class="border-b border-gray-200 px-2 py-2 text-left text-orange-600 font-bold uppercase tracking-wider"
        >
          {{ day }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="hour in 8" :key="hour" class="hover:bg-gray-50 transition-colors">
        <td
          class="border-b border-r border-gray-100 px-2 py-3 font-bold text-gray-600 bg-gray-50/50"
        >
          {{ hour }}. Saat
        </td>
        <td
          v-for="day in ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']"
          :key="day"
          class="border-b border-gray-100 px-2 py-1 min-w-28 vertical-align-top"
        >
          <div
            v-for="(entry, i) in props.schedule?.[day]?.[String(hour)] || []"
            :key="i"
            class="px-2 py-1.5 mb-1 bg-orange-50 border-l-2 border-orange-400 rounded text-xs shadow-sm"
          >
            <div class="font-bold text-orange-900">{{ entry.classroom }} - {{ entry.course }}</div>
            <!-- <div class="text-gray-700">{{ entry.course }}</div> -->
            <div class="text-[10px] text-gray-600 mt-1">{{ entry.teacher }} - {{ entry.room }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps(['schedule'])
</script>