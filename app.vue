<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuth } from "~/composables/useAuth";

const { token, fetchUser } = useAuth();

// onMounted(() => {
//   if (token.value) {
//     fetchUser().catch((err) => {
//       console.warn("Не удалось подтянуть пользователя:", err);
//     });
//   }
// });
</script>
