export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, fetchUser } = useAuth();

  if (!isAuthenticated.value) {
    fetchUser();
  }

  if (
    !isAuthenticated.value &&
    to.path !== "/login" &&
    to.path !== "/register"
  ) {
    return navigateTo("/login");
  }
});
