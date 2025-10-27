import { ref, computed, onMounted, watchEffect } from "vue";
import { useCookie, useRuntimeConfig } from "#imports";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = useCookie("token");
  const user = ref(null);
  const config = useRuntimeConfig();

  const login = async (email, password) => {
    try {
      const data = await $fetch("/auth/login", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: { email, password },
      });
      if (data?.token) {
        const decoded = jwtDecode(data.token);
        token.value = data.token;
        user.value = decoded;
      }
      return data;
    } catch (err) {
      console.error("login error:", err);
      throw err;
    }
  };

  const register = async (email, fullName, password, phoneNumber) => {
    try {
      const data = await $fetch("/auth/register", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: { email, fullName, password, phoneNumber },
      });

      if (data?.accessToken) {
        token.value = data.accessToken;
        const decoded = jwtDecode(data.accessToken);
        user.value = decoded;
        navigateTo("/");
      }

      return data;
    } catch (err) {
      console.error("register error:", err);
      throw err;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo("/login");
  };

  const isAdmin = computed(() => user.value?.role === "admin");
  const isAuthenticated = computed(() => !!user.value);

  onMounted(() => {
    if (token.value) {
      try {
        user.value = jwtDecode(token.value);
      } catch {
        token.value = null;
      }
    }
  });

  watchEffect(() => {
    if (token.value) {
      try {
        user.value = jwtDecode(token.value);
      } catch {
        user.value = null;
      }
    } else {
      user.value = null;
    }
  });

  return {
    token,
    user,
    login,
    register,
    logout,
    isAdmin,
    isAuthenticated,
  };
};
