import { useCookie, useRuntimeConfig, useRouter } from "#imports";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
  const refresh = useCookie("refresh", { maxAge: 60 * 60 * 24 * 30 });
  const user = ref(null);
  const config = useRuntimeConfig();
  const router = useRouter();

  const login = async (email, password) => {
    const data = await $fetch("/auth/login", {
      baseURL: config.public.apiBase,
      method: "POST",
      body: { email, password },
    });

    console.log("LOGIN RESPONSE:", data);

    token.value = data?.accessToken;
    refresh.value = data?.refreshToken;

    const decoded = jwtDecode(data?.accessToken);
    user.value = decoded;

    if (decoded.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
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
    const decoded = jwtDecode(token.value);
    user.value = decoded;
  };

  const logout = () => {
    token.value = null;
    refresh.value = null;
    user.value = null;
    router.push("/login");
  };

  const isAdmin = computed(() => user.value?.role === "admin");
  const isAuthenticated = computed(() => !!user.value);

  return { user, login, register, logout, fetchUser, isAdmin, isAuthenticated };
};
