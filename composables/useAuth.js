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

      const authToken = data?.token || data?.accessToken;

      if (authToken) {
        token.value = authToken;
        const decoded = jwtDecode(authToken);
        user.value = decoded;
        console.log("User logged in:", decoded);

        if (decoded.role === "admin") {
          navigateTo("/admin/dashboard");
        } else {
          navigateTo("/");
        }
      } else {
        console.warn("No token found", data);
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

      const authToken = data?.token || data?.accessToken;

      if (authToken) {
        token.value = authToken;
        const decoded = jwtDecode(authToken);
        user.value = decoded;
        console.log(" User registered:", decoded);
        navigateTo("/");
      } else {
        console.warn(" Not token", data);
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
        console.log(" Restored user from cookie:", user.value);
        if (user.value.role === "admin") {
          navigateTo("/admin/dashboard");
        } else {
          navigateTo("/client");
        }
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
