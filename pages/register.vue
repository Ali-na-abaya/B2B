<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#14213D] to-[#000000]"
  >
    <div
      class="bg-[#fca311] rounded-3xl shadow-2xl w-96 p-8 relative overflow-hidden"
    >
      <div
        class="absolute -top-16 -right-16 w-40 h-40 bg-[#14213D] rounded-full opacity-20"
      ></div>

      <h1 class="text-3xl font-bold text-center text-[#14213D] mb-8">
        Create Account
      </h1>

      <form @submit.prevent="handleRegister" class="space-y-4 relative z-10">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14213D] transition"
          required
        />
        <input
          v-model="fullName"
          type="text"
          placeholder="Enter your full name"
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

        <input
          v-model="phoneNumber"
          type="tel"
          placeholder="+77777777777"
          class="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14213D] transition"
          required
        />

        <button
          type="submit"
          class="w-full bg-[#14213D] text-white py-3 rounded-xl mt-6 hover:bg-black transition font-semibold"
        >
          Register
        </button>
      </form>

      <p class="text-center text-[#14213D] mt-6 font-medium">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-white decoration-[#14213D] hover:text-black transition"
        >
          Login
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";
import { navigateTo } from "#app";

const { register, login, fetchUser } = useAuth();

const email = ref("");
const password = ref("");
const phoneNumber = ref("");
const fullName = ref("");

const handleRegister = async () => {
  try {
    const result = await register(
      email.value,
      fullName.value,
      password.value,
      phoneNumber.value
    );

    if (result?.token) {
      const { token } = result;
      const auth = useAuth();
      auth.token.value = token;

      return;
    }
  } catch (err) {
    console.error("Registration failed:", err);
    alert("Registration failed!");
  }
};
</script>
