export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token");

  const publicRoutes = ["/login", "/register"];
  if (!token.value && !publicRoutes.includes(to.path)) {
    return navigateTo("/login");
  }
});
