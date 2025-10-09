<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <button
      @click="logoutAndGo"
      class="mt-6 bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
const { logout } = useAuth();

const logoutAndGo = () => {
  logout();
  navigateTo("/login");
};
</script>
