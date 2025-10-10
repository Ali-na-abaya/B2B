<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full border p-3 rounded"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border p-3 rounded"
          required
        />
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p class="text-center mt-4">
        Don’t have an account?
        <NuxtLink to="/register" class="text-blue-600 font-medium"
          >Register</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
const { login } = useAuth();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    navigateTo("/index");
  } catch (err) {
    console.error(err);
  }
};
</script>
