<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#14213D] to-[#000000]"
  >
    <div
      class="bg-[#fca311] rounded-3xl shadow-2xl w-96 p-8 relative overflow-hidden"
    >
      <div
        class="absolute -top-16 -left-16 w-40 h-40 bg-[#14213D] rounded-full opacity-30"
      ></div>

      <h1 class="text-3xl font-bold text-center text-[#14213D] mb-8">
        Login to Continue
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-5 relative z-10">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14213D] transition"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14213D] transition"
          required
        />

        <button
          type="submit"
          class="w-full bg-[#14213D] text-white py-3 rounded-xl mt-6 hover:bg-black transition font-semibold"
        >
          Login
        </button>
      </form>

      <p class="text-center text-[#14213D] mt-6 font-medium">
        Don’t have an account?
        <NuxtLink
          to="/register"
          class="text-white decoration-[#14213D] hover:text-black transition"
        >
          Register
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { navigateTo } from '#app'

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    const res = await fetch('https://b2b-f014.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('token', data.token)
      navigateTo('client/profile')
    } else {
      alert(data.message || 'Login failed')
    }
  } catch (err) {
    console.error('Login error:', err)
    alert('Network error')
  }
}
</script>
