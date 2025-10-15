import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  if (isAdmin.value === false && useRoute().path.startsWith("/admin")) {
    return navigateTo("/");
  }
});
