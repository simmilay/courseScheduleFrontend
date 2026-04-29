
<template>
  <v-app >
    <v-main>
      <div class="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 w-full h-full flex flex-col items-center justify-center" >
        <v-card class="w-3/5 ">
          <RouterView />
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-bg {
  position: relative;
  min-height: 100vh;
}

.auth-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('@/assets/auth-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;
  z-index: 0;
}

.auth-bg > :deep(*) {
  position: relative;
  z-index: 1;
}
</style>
<script setup>
import { RouterView } from 'vue-router';

</script>


