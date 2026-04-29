<template>
  <v-main>
    <v-form ref="formRef" @submit.prevent="submit">
      <v-row class="px-6 pt-4 pb-2">
        <v-col cols="12">
          <h1 class="text-2xl font-bold text-orange-500 tracking-wide">Kayıt Ol</h1>
          <p class="text-sm text-gray-400 mt-1">Yeni bir okul hesabı oluşturun</p>
          <v-divider class="mt-3" color="warning" opacity="0.3"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <div class="flex justify-center items-center h-full">
            <div class="flex flex-col items-center mb-6">
              <div class="relative mb-4">
                <v-avatar size="120" class="border-2 border-dashed border-orange-300 bg-orange-50">
                  <v-img v-if="imagePreview" :src="imagePreview" alt="Avatar" cover></v-img>
                  <v-icon v-else size="50" color="warning">mdi-domain</v-icon>
                </v-avatar>

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/png, image/jpeg, image/bmp"
                  class="hidden"
                  @change="handleFileSelect"
                />

                <v-btn
                  icon
                  size="small"
                  color="warning"
                  class="absolute bottom-0 right-0"
                  @click="$refs.fileInput.click()"
                >
                  <v-icon size="18">mdi-camera</v-icon>
                </v-btn>
              </div>
            </div>
          </div></v-col
        >
        <v-col cols="9"
          ><div class="flex gap-3 p-5">
            <v-text-field
              v-model="name.value"
              :error-messages="name.errorMessage.value"
              label="Okul Adı"
              :rules="[(v) => !!v || 'Okul adı gerekli.']"
              color="warning"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="username.value"
              :counter="10"
              :error-messages="username.errorMessage.value"
              label="Kullanıcı Adı"
              :rules="[(v) => !!v || 'Kullanıcı adı gerekli.']"
              color="warning"
              variant="outlined"
            ></v-text-field>
          </div>
          <div class="flex px-5 gap-3">
            <v-text-field
              v-model="password"
              :append-inner-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show_password ? 'text' : 'password'"
              hint="En az 8 karakter"
              label="Parola"
              name="input-10-1"
              color="warning"
              variant="outlined"
              counter
              @click:append-inner="show_password = !show_password"
            ></v-text-field>
            <v-text-field
              v-model="password_confirmation"
              :append-inner-icon="show_password_confirmation ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password_confirmation ? 'text' : 'password'"
              hint="En az 8 karakter"
              label="Parola Onayı"
              name="input-10-2"
              counter
              color="warning"
              variant="outlined"
              :rules="[
                rules.required,
                rules.min,
                (v) => v === password.value || 'Parolalar eşleşmiyor.',
              ]"
              @click:append-inner="show_password_confirmation = !show_password_confirmation"
            ></v-text-field>
          </div>
          <div class="flex flex-col justify-center items-center mx-5 mb-5">
            <v-btn
              class="p-5 mt-5"
              type="submit"
              color="warning"
              variant="tonal"
              block
              :loading="is_loading"
            >
              Kayıt Ol
            </v-btn>
            <p class="text-sm text-gray-500">
              Zaten hesabınız varsa,
              <router-link to="/login" class="text-orange-500">giriş yapın</router-link>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-form></v-main
  >
</template>
<script setup>
import { ref } from 'vue'
import { register } from '../services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const formRef = ref()
const selectedFile = ref(null)
const imagePreview = ref(null)
const is_loading = ref(false)
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  } else {
    selectedFile.value = null
    imagePreview.value = null
  }
}

const show_password = ref(false)
const show_password_confirmation = ref(false)

const name = ref({ value: '', errorMessage: '' })
const username = ref({ value: '', errorMessage: '' })
const password = ref('')
const password_confirmation = ref('')

const rules = {
  required: (value) => !!value || 'Parola gerekli.',
  min: (v) => v.length >= 8 || 'En az 8 karakter gerekli.',
}

const submit = async () => {
  is_loading.value = true
  const { valid } = await formRef.value.validate()
  if (!valid){
    is_loading.value = false
    return
  }
  if (password.value !== password_confirmation.value) {
    is_loading.value = false
    return
  }
  const fornmData = new FormData()

  fornmData.append('school_name', name.value.value)
  fornmData.append('username', username.value.value)
  fornmData.append('password', password.value)

  if (selectedFile.value) {
    fornmData.append('profile_pic', selectedFile.value)
  }

  try {
    await register(fornmData)
    router.push('/auth/login')
    is_loading.value = false
  } catch (error) {
    console.error(error)
    is_loading.value = false
  }
}
</script>
