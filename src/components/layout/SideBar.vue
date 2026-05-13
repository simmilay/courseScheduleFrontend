<template>
  <v-navigation-drawer permanent width="250">
    <div class="mt-3 gap-1 flex flex-col">
      <v-list color="transparent">
        <v-list-item title="Anasayfa" @click="router.push('/')">
          <template v-slot:prepend>
            <v-icon color="success">mdi-home</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Derslikler" @click="router.push('/rooms')">
          <template v-slot:prepend>
            <v-icon color="success">mdi-flask-empty-plus-outline</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Dersler" @click="router.push('/courses')">
          <template v-slot:prepend>
            <v-icon color="success">mdi-book-open-variant-outline</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Öğretmenler" @click="router.push('/teachers')">
          <template v-slot:prepend>
            <v-icon color="success">mdi-account-box-plus-outline</v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Sınıflar" @click="router.push('/classrooms')">
          <template v-slot:prepend>
            <v-icon color="success">mdi-google-classroom</v-icon>
          </template>
        </v-list-item>

        <v-list-item title="Gereksinimler" @click="router.push('/requirements')">
          <template v-slot:prepend>
            <v-icon color="success">mdi-bag-personal-plus-outline</v-icon>
          </template>
        </v-list-item>
      </v-list>
    </div>


    <template #append>
      <v-list>
            
        <v-divider />
        <v-list-item to="/settings" title="Ayarlar" @click="goToSettings"
          ><template v-slot:prepend>
            <v-icon color="success">mdi-cog</v-icon>
          </template></v-list-item
        >
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useScheduleStore } from '@/stores/schedule'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useScheduleStore()
const authStore = useAuthStore()




import RoomModal from '../modals/RoomModal.vue'
import TeacherModal from '../modals/TeacherModal.vue'
import RequirementModal from '../modals/RequirementModal.vue'
import CourseModal from '../modals/CourseModal.vue'
import ClassroomModal from '../modals/ClassroomModal.vue'
</script>