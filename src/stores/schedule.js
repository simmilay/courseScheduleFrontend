import { defineStore } from 'pinia'
import axios from 'axios'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    teachers: [],
    rooms: [],
    requirements: [],
    results: [],
    loading: false,
  }),
  actions: {
    addTeacher(teacher) {
      this.teachers.push(teacher)
    },
    removeTeacher(index) {
      this.teachers.splice(index, 1)
    },
    addRoom(room) {
      this.rooms.push(room)
    },
    removeRoom(index) {
      this.rooms.splice(index, 1)
    },
    addRequirement(requirement) {
      this.requirements.push(requirement)
    },
    removeRequirement(index) {
      this.requirements.splice(index, 1)
    },
    async generateSchedule() {
      this.loading = true
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/generate-schedule/', {
          teachers: this.teachers,
          rooms: this.rooms,
          requirements: this.requirements,
        })
        this.results = response.data
      } finally {
        this.loading = false
      }
    },
  },
})
