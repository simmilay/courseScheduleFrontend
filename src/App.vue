
<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col cols="4">
          <v-card class="mb-4">
            <v-card-title>Öğretmenler</v-card-title>
            <v-card-text>
              <v-list-item v-for="(teacher, index) in store.teachers" :key="index">
                <v-list-item-title>{{ teacher.name }}</v-list-item-title>
                <div class="flex gap-2">
                  <v-list-item-subtitle v-for="tchr in teacher.course" :key="tchr"
                    >{{ tchr }}
                  </v-list-item-subtitle>
                </div>
                <v-list-item-subtitle>{{ teacher.off_day }} İzinli</v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="store.removeTeacher(teacher.id)"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-card-text>

            <v-card-actions
              ><v-btn @click="teacherModalVisible = true" variant="tonal"
                >+ Ekle</v-btn
              ></v-card-actions
            >
          </v-card>
          <v-card class="mb-4">
            <v-card-title>Dersliker</v-card-title>
            <v-card-text>
              <v-list-item v-for="(room, index) in store.rooms" :key="index">
                <v-list-item-title>{{ room.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ room.room_type }}</v-list-item-subtitle>

                <template v-slot:append>
                  <v-btn icon="mdi-close" variant="text" @click="store.removeRoom(room.id)"></v-btn>
                </template>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="roomModalVisible = true" variant="tonal">+ Ekle</v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="mb-4">
            <v-card-title>Ders Gereksinimleri</v-card-title>
            <v-card-text>
              <v-list-item v-for="(req, index) in store.requirements" :key="index">
                <v-list-item-title>{{ req.course }}</v-list-item-title>
                <v-list-item-subtitle
                  >{{ req.classroom }}<br />
                  {{ req.weekly_hours }} saat</v-list-item-subtitle
                >
                <template v-slot:append
                  ><v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="store.removeRequirement(req.id)"
                  ></v-btn
                ></template>
              </v-list-item>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="reqModalVisible = true" variant="tonal">+ Ekle</v-btn>
            </v-card-actions>
          </v-card>
          <TeacherModal
            :visible="teacherModalVisible"
            @close="teacherModalVisible = false"
            @save="store.addTeacher($event)"
          />
          <RoomModal
            :visible="roomModalVisible"
            @close="roomModalVisible = false"
            @save="store.addRoom($event)"
          />
          <RequirementModal
            :visible="reqModalVisible"
            @close="reqModalVisible = false"
            @save="store.addRequirement($event)"
          />
          <v-btn color="primary" block :loading="store.loading" @click="store.generateSchedule()"
            >Program Oluştur</v-btn
          >
        </v-col>
        <v-col cols="8"
          ><v-col cols="8">
            <div v-if="store.results.length > 0">
              <v-card v-for="(sol, idx) in store.results" :key="idx">
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      <div class="flex items-center gap-4 w-full">
                        <span>{{ idx === 0 ? 'En İyi Program' : 'Alternatif ' + idx }}</span>
                        <span :class="titleBgColor(sol.fitness)">{{ sol.fitness }}%</span>
                        <v-progress-linear
                          :model-value="sol.fitness"
                          :height="5"
                          rounded
                          class="flex-1"
                        />
                      </div>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>
                      <table style="width: 100%; border-collapse: collapse">
                        <thead>
                          <tr>
                            <th style="border: 1px solid #ddd; padding: 8px">Saat</th>
                            <th
                              v-for="day in ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']"
                              :key="day"
                              style="border: 1px solid #ddd; padding: 8px"
                            >
                              {{ day }}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="hour in 8" :key="hour">
                            <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold">
                              {{ hour }}. Saat
                            </td>
                            <td
                              v-for="day in ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']"
                              :key="day"
                              style="border: 1px solid #ddd; padding: 8px"
                            >
                              <div
                                v-for="(entry, i) in sol.schedule[day][String(hour)]"
                                :key="i"
                                style="
                                  padding: 4px;
                                  margin-bottom: 4px;

                                  border-radius: 4px;
                                "
                              >
                                {{ entry.classroom }} - {{ entry.course }}<br />
                                <small>{{ entry.teacher }} · {{ entry.room }}</small>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <v-alert v-if="!sol.is_complete" type="warning" class="mt-4">
                        <div v-for="(msg, i) in sol.missing_slot" :key="i">{{ msg }}</div>
                      </v-alert>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
            </div>
            <v-alert v-else type="info">Henüz program oluşturulmadı.</v-alert>
          </v-col>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { computed } from 'vue'
import { useScheduleStore } from './stores/schedule'
import TeacherModal from './components/TeacherModal.vue'
import RoomModal from './components/RoomModal.vue'
import RequirementModal from './components/RequirementModal.vue'

const store = useScheduleStore()
const teacherModalVisible = ref(false)
const roomModalVisible = ref(false)
const reqModalVisible = ref(false)
const roundingEnabled = ref(true)


const titleBgColor = (fitness) => {
  if (fitness >= 80) return 'text-green'
  if (fitness >= 50) return 'text-orange'
  return 'text-red'
}
onMounted(() => {
  store.fetchTeacher()
  store.fetchRoom()
  store.fetchRequirement()
})
</script>