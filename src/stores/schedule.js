import { defineStore } from 'pinia'
import axios from 'axios'
import { getTeachers, createTeacher, deleteTeacher } from '../services/teacher'
import { getRooms, createRooms, deleteRooms } from '../services/room'
import { getRequirements, deleteRequirements, createRequirements } from '../services/requirements'
import { getSchedule, createSchedule, deleteSchedule } from '@/services/schedule'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    teachers: [],
    rooms: [],
    requirements: [],
    schedule: [],
    results: [],
    loading: false,
    toast_message: '',
  }),
  getters: {
    activeSchedule: (state) => {
      return state.schedule.find((s) => s.is_active === true)
    },
  },
  actions: {
    // teacher ekle - sil - fetch
    async fetchTeacher() {
      const response = await getTeachers()
      this.teachers = response.data
    },
    async addTeacher(teacher) {
      await createTeacher(teacher)
      await this.fetchTeacher()
    },
    async removeTeacher(id) {
      await deleteTeacher(id, {
        is_active: false,
      })
      await this.fetchTeacher()
    },

    // Room ekle - sil - fetch

    async fetchRoom() {
      const response = await getRooms()
      this.rooms = response.data
    },

    async addRoom(room) {
      await createRooms(room)
      await this.fetchRoom()
    },
    async removeRoom(id) {
      await deleteRooms(id, {
        is_active: false,
      })
      await this.fetchRoom()
    },

    // Requirement ekle - sil - fetch

    async fetchRequirement() {
      const response = await getRequirements()
      this.requirements = response.data
    },
    async addRequirement(requirement) {
      await createRequirements(requirement)
      await this.fetchRequirement()
    },
    async removeRequirement(id) {
      await deleteRequirements(id, {
        is_active: false,
      })
      await this.fetchRequirement()
    },
    async fetchSchedule() {
      const response = await getSchedule()
      this.schedule = response.data
      const active = response.data.find((s) => s.is_active === true)
      if (active) {
        this.results = active.schedule
      }
    },

    async saveSchedule() {
      const activeSchedule = this.schedule.find((s) => s.is_active === true)
      if (activeSchedule) {
        await deleteSchedule(activeSchedule.id, {
          is_active: false,
        })
      }

      await createSchedule({
        schedule: this.results,
      })
      await this.fetchSchedule()
    },

    // Yeni takvim oluştur
    async generateSchedule() {
      this.loading = true

      try {
        if (
          this.teachers.length === 0 ||
          this.rooms.length === 0 ||
          this.requirements.length === 0
        ) {
          this.loading = false
          this.toast_message = 'Derslik, öğretmen ve gereksinim bilgilerini eksiksiz doldurunuz.'
          return false
        }
        const response = await axios.post('http://127.0.0.1:8000/api/generate-schedule/', {
          teachers: this.teachers,
          rooms: this.rooms,
          requirements: this.requirements,
        })
        this.results = response.data
        await this.saveSchedule()
      } finally {
        this.loading = false
      }
    },
  },
})
