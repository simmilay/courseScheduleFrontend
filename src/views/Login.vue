<template>
  <v-main>
    <form @submit.prevent="submit">
      <v-row class="px-6 pt-4 pb-2">
        <v-col cols="12" class="flex items-center gap-4">
          <div class="relative shrink-0">
            <v-avatar size="64" class="border-2 border-orange-300 bg-orange-50 shadow-md">
              <v-icon size="36" color="warning">mdi-domain</v-icon>
            </v-avatar>
            <div
              class="absolute -bottom-1 -right-1 bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center shadow"
            >
              <v-icon size="12" color="white">mdi-check</v-icon>
            </div>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-orange-500 tracking-wide">Giriş Yap</h1>
            <p class="text-sm text-gray-400">Hesabınıza giriş yapın</p>
          </div>
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-divider color="warning" opacity="0.3"></v-divider>
        </v-col>
      </v-row>

      <v-row class="px-6 pt-3">
        <v-col cols="12">
          <div class="flex flex-col gap-3">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              label="Kullanıcı Adı"
              color="warning"
              variant="outlined"
              prepend-inner-icon="mdi-account-outline"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required]"
              :type="show_password ? 'text' : 'password'"
              label="Parola"
              color="warning"
              variant="outlined"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="show_password = !show_password"
            ></v-text-field>
          </div>

          <div class="flex flex-col justify-center items-center mb-3 mt-2">
            <v-btn
              class="mt-2"
              type="submit"
              color="warning"
              variant="tonal"
              block
              :loading="is_loading"
            >
              Giriş Yap
            </v-btn>
            <p class="text-sm text-gray-500 mt-3">
              Hesabınız yok mu?
              <router-link to="/register" class="text-orange-500">kayıt olun</router-link>
            </p>
          </div>
        </v-col>
      </v-row>
    </form>

    <v-snackbar v-model="snackbar" color="red" location="top end" :timeout="2500" rounded="pill">
      {{ text }}
      <template #actions>
        <v-btn icon @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const text = ref('')
const snackbar = ref(false)
const show_password = ref(false)
const is_loading = ref(false)

const rules = {
  required: (value) => !!value || 'Bu alan gerekli.',
}

const submit = async () => {
  is_loading.value = true
  try {
    await authStore.loginSuccess({ username: username.value, password: password.value })
    if (authStore.isAuthenticated) {
      router.push({ name: 'Schedule' })
    }
  } catch (error) {
    console.error(error)
    text.value = 'Kullanıcı adı veya şifre hatalı'
    snackbar.value = true
  } finally {
    is_loading.value = false
  }
}
</script>
