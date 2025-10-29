export default defineNuxtRouteMiddleware((to) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    return navigateTo("/login");
  }

  if (user.value?.role !== "admin") {
    return navigateTo("/");
  }
});
