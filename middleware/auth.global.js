export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");

  if (token.value && (to.path === "/login" || to.path === "/register")) {
    return navigateTo("/");
  }
});
