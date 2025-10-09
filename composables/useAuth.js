import { useCookie, useRuntimeConfig } from "#imports";

export const useAuth = () => {
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
  const user = ref(null);
  const config = useRuntimeConfig();

  const login = async (email, password) => {
    const { data, error } = await useFetch("/auth/login", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: { email, password },
    });
    if (error.value) throw error.value;
    token.value = data.value?.token;
    await fetchUser();
  };

  const register = async (email, password) => {
    const { data, error } = await useFetch("/auth/register", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: { email, password },
    });
    if (error.value) throw error.value;
  };

  const fetchUser = async () => {
    if (!token.value) return;
    const { data } = await useFetch("/users/me", {
      baseURL: config.public.apiBase,
      headers: { Authorization: `Bearer ${token.value}` },
    });
    user.value = data.value;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
  };

  const isAdmin = computed(() => user.value?.role === "admin");
  const isAuthenticated = computed(() => !!user.value);

  return { user, login, register, logout, fetchUser, isAdmin, isAuthenticated };
};
