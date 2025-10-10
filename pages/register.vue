<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
      <form @submit.prevent="handleRegister" class="space-y-4">
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
        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="+77777777777"
          class="w-full border p-3 rounded"
          required
        />
        <button
          type="submit"
          class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </form>
      <p class="text-center mt-4">
        Already have an account?
        <NuxtLink to="/login" class="text-blue-600 font-medium">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
const { register } = useAuth();

const email = ref("");
const password = ref("");
const phoneNumber = ref("");

const handleRegister = async () => {
  try {
    await register(email.value, password.value, phoneNumber.value);
    alert("Registration successful!");
    navigateTo("/login");
  } catch (err) {
    console.error(err);
    alert(" Registration failed!");
  }
};
</script>
