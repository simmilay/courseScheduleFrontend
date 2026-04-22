import { defineStore } from 'pinia'
import axios from 'axios'
import {
  getTeachers,
  createTeacher,
  deleteTeacher,
  updateTeacher,
  getOffDay,
} from '../services/teacher'
import { getRooms, createRooms, deleteRooms, getLabRooms, updateRoom } from '../services/room'
import {
  getRequirements,
  deleteRequirements,
  createRequirements,
  updateRequirements,
} from '../services/requirements'
import { getSchedule, createSchedule, deleteSchedule } from '@/services/schedule'
import {
  getCourse,
  createCourse,
  deleteCourse,
  getTeacherCourses,
  updateCourse,
} from '../services/course'
import {
  getClassroom,
  createClassroom,
  deleteClassroom,
  updateClassroom,
} from '../services/classroom'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    teachers: [],
    rooms: [],
    lab_rooms: [],
    requirements: [],
    course: [],
    teacher_courses: [],
    classrooms: [],
    schedule: [],
    results: [],
    loading: false,
    toast_message: '',
    off_days: [],
  }),
  getters: {
    activeSchedule: (state) => {
      return state.schedule.find((s) => s.is_active === true)
    },
  },
  actions: {
    // teacher ekle - sil - fetch
    async fetchTeacher(currentPage = 1) {
      const response = await getTeachers(currentPage)
      this.teachers = response.data.results
      return Math.ceil(response.data.count / 7)
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
    async updateTeacher(id, teacher) {
      await updateTeacher(id, teacher)
      await this.fetchTeacher()
    },

    async fetchOffDay() {
      const response = await getOffDay()
      this.off_days = response.data.off_days
    },

    // Room ekle - sil - fetch
    async fetchRoom(currentPage = 1) {
      const response = await getRooms(currentPage)
      this.rooms = response.data.results
      return Math.ceil(response.data.count / 7)
    },

    async fetchLabRoom() {
      const response = await getLabRooms()
      this.lab_rooms = response.data.results
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
    async updateRoom(id, room) {
      await updateRoom(id, room)
      await this.fetchRoom()
    },

    // ders ekle - sil - fetch
    async fetchCourse(currentPage = 1) {
      const response = await getCourse(currentPage)
      this.course = response.data.results
      return Math.ceil(response.data.count / 7)
    },

    async addCourse(course) {
      await createCourse(course)
      await this.fetchCourse()
    },
    async removeCourse(id) {
      await deleteCourse(id, {
        is_active: false,
      })
      await this.fetchCourse()
    },

    async updateCourse(id, course) {
      await updateCourse(id, course)
      await this.fetchCourse()
    },

    async fetchTeacherCourse(id) {
      const response = await getTeacherCourses(id)
      this.teacher_courses = response.data
    },

    // classroom ekle sil fetch
    async fetchClassroom(currentPage = 1) {
      const response = await getClassroom(currentPage)
      this.classrooms = response.data.results
      return Math.ceil(response.data.count / 7)
    },

    async addClassroom(classroom) {
      await createClassroom(classroom)
      await this.fetchClassroom()
    },
    async removeClassroom(id) {
      await deleteClassroom(id, {
        is_active: false,
      })
      await this.fetchClassroom()
    },

    async updateClassroom(id, classroom) {
      await updateClassroom(id, classroom)
      await this.fetchClassroom()
    },

    // Requirement ekle - sil - fetch
    async fetchRequirement(currentPage = 1) {
      const response = await getRequirements(currentPage)
      this.requirements = response.data.results
      return Math.ceil(response.data.count / 7)
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
    async updateRequirement(id, requirement) {
      await updateRequirements(id, requirement)
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
        const response = await axios.post('http://127.0.0.1:8000/api/generate-schedule/')
        this.results = response.data
        await this.saveSchedule()
      } finally {
        this.loading = false
      }
    },
  },
})
