import { defineStore } from 'pinia'
import axios from 'axios'
import { getTeachers, createTeacher, deleteTeacher } from '../services/teacher'
import { getRooms, createRooms, deleteRooms } from '../services/room'
import { getRequirements, deleteRequirements, createRequirements } from '../services/requirements'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    teachers: [],
    rooms: [],
    requirements: [],
    results: [],
    loading: false,
  }),
  actions: {
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

    async fetchRoom() {
      const response = await getRooms()
      this.rooms = response.data
    },

    async addRoom(room) {
      await createRooms(room)
      await this.fetchRoom()
    },
    async removeRoom(id) {
      await deleteTeacher(id, {
        is_active: false,
      })
      await this.fetchRoom()
    },
    async fetchRequirement() {
      const response = await getRequirements()
      this.requirements = response.data
    },
    async addRequirement(requirement) {
      await createRequirements(requirement)
      await this.fetchRequirement()
    },
    async removeRequirement(id) {
      await deleteTeacher(id, {
        is_active: false,
      })
      await this.fetchRequirement()
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
