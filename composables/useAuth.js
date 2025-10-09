import { useCookie, useRuntimeConfig } from "#imports";

export const useAuth = () => {
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
  const user = ref(null);
  const config = useRuntimeConfig();

  const login = async (email, password) => {
    const data = await $fetch("/auth/login", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: { email, password },
    });
    token.value = data?.token;
    await fetchUser();
  };

  const register = async (email, password, phoneNumber) => {
    const data = await $fetch("/auth/register", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: { email, password, phoneNumber },
    });
    return data;
  };

  const fetchUser = async () => {
    if (!token.value) return;
    const data = await $fetch("/users/me", {
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${token.value}` },
    });
    user.value = data;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  const isAdmin = computed(() => user.value?.role === "admin");
  const isAuthenticated = computed(() => !!user.value);

  return { user, login, register, logout, fetchUser, isAdmin, isAuthenticated };
};
