<template>
  <div class="page">
    <header class="navbar">
      <div class="burger-container">
        <div class="burger-icon" @click="toggleMenu">☰</div>
        <transition name="slide">
          <div v-if="menuOpen" class="menu-overlay" @click.self="toggleMenu">
            <div class="menu-content">
              <div class="close-icon" @click="toggleMenu">✕</div>

              <ul>
                <li>
                  <NuxtLink :to="{ name: 'homePage',}">
                    <i class="fa-solid fa-house"></i> Home
                  </NuxtLink>
                </li>

                <li>
                  <NuxtLink to="/catalog">
                    <i class="fa-solid fa-bag-shopping"></i> Catalog
                  </NuxtLink>
                </li>

                <li>
                  <NuxtLink to="/suppliers">
                    <i class="fa-solid fa-industry"></i> Suppliers
                  </NuxtLink>
                </li>

                <li v-if="isAdmin">
                  <NuxtLink to="/admin">
                    <i class="fa-solid fa-lock"></i> Admin Panel
                  </NuxtLink>
                </li>

                <li v-if="isAuthenticated">
                  <div class="profile-btn" @click="logout">
                    <i class="fa-solid fa-user-circle"></i>
                    {{ user?.email || "Profile" }}
                  </div>
                </li>

                <li v-else>
                  <NuxtLink to="/login">
                    <i class="fa-solid fa-right-to-bracket"></i> Login
                  </NuxtLink>
                  <NuxtLink to="/register">
                    <i class="fa-solid fa-user-plus"></i> Register
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>

      <div
        v-if="isAuthenticated"
        class="user-profile"
        @click="toggleProfileMenu"
      >
        <div class="profile-circle">
          <i class="fa-solid fa-user"></i>
        </div>

        <!-- <transition name="fade">
          <div v-if="showProfileMenu" class="profile-dropdown">
            <div class="dropdown-item" @click="goToProfile">
              <i class="fa-solid fa-user-circle"></i>
              Мой профиль
            </div>
            <div class="dropdown-item" @click="goToProfile">
              <i class="fa-solid fa-user-circle"></i>
              <span class="user-email">{{ user?.email }}</span>
            </div>

            <div class="dropdown-divider"></div>
            <div class="dropdown-item logout-item" @click="logout">
              <i class="fa-solid fa-right-from-bracket"></i>
              Выйти
            </div>
          </div>
        </transition> -->
      </div>

      <div v-else class="auth-buttons border-t-4 border-b-4 border-white">
        <NuxtLink to="/login" class="login-btn">Log in /</NuxtLink>
        <NuxtLink to="/register" class="register-btn"> Sign in</NuxtLink>
      </div>
    </header>

    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <p class="welcome">WELCOME</p>
        <h1>Find trusted suppliers<br />across Kazakhstan<br />easily.</h1>
      </div>
      <button class="scroll-btn">↓</button>
    </section>

    <section class="categories">
      <h2>Выбирайте по категориям</h2>
      <div class="category-list">
        <NuxtLink to="/catalog#fashion" class="category">
          <span>Мода и красота</span>
        </NuxtLink>
        <NuxtLink to="/catalog#home" class="cloth category">
          <span>Для дома</span>
        </NuxtLink>

        <NuxtLink to="/catalog#food" class="furnit category">
          <span>Еда, табачная и алкогольная продукция</span>
        </NuxtLink>

        <div
          v-if="!showMore"
          class="more category"
          @click="showMore = true"
          style="cursor: pointer"
        >
          <span>Ещё...</span>
        </div>

        <template v-if="showMore">
          <NuxtLink
            v-for="(cat, index) in extraCategories"
            :key="index"
            :to="`/catalog#${cat.slug}`"
            class="category extra-category"
            :style="{ backgroundImage: `url(${cat.image})` }"
          >
            <span>{{ cat.name }}</span>
          </NuxtLink>

          <div
            class="category hide-btn"
            @click="showMore = false"
            style="cursor: pointer"
          >
            <span>Скрыть</span>
          </div>
        </template>
      </div>
    </section>

    <div class="new-arrivals">
      <div class="header">
        <h2>НОВИНКИ</h2>
        <button class="shop-btn">
          Перейти к покупкам <i class="fa-solid fa-cart-shopping"></i>
        </button>
      </div>

      <div class="carousel">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${activeIndex * cardWidth}px)` }"
        >
          <div
            v-for="(item, i) in visibleProducts"
            :key="i"
            class="product-card"
            :class="{
              active: i % products.length === activeIndex % products.length,
            }"
          >
            <i class="fa-regular fa-heart fav-icon"></i>
            <img :src="item.image" :alt="item.name" />
            <h3>{{ item.name }}</h3>
            <p>
              price: <span>{{ item.price }}</span>
            </p>
            <button class="cart-btn">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <section class="newly-added-section">
      <div class="section-header">
        <div>
          <h2 class="main-title">НОВЫЕ</h2>
          <h3 class="sub-title">КОМПАНИИ</h3>
        </div>
        <button class="shop-btnn">
          Посмотреть все <i class="fa-solid"></i>
        </button>
      </div>

      <div class="cards-grid">
        <div v-for="i in 3" :key="i" class="company-card">
          <img
            :src="`https://picsum.photos/seed/company${i}/600/400`"
            alt="Company Building"
            class="card-image"
          />
          <div class="card-label">Name</div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <span class="logo">SupplierHub</span>
        </div>
        <div class="footer-center">
          <span class="copyright">© SupplierHub, All rights reserved</span>
        </div>
        <div class="footer-right">
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-vk"></i></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({name:"homePage"})
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useAuth } from "@/composables/useAuth";

const { user, isAuthenticated, isAdmin, logout } = useAuth();
const showProfileMenu = ref(false);

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const closeProfileMenu = (event) => {
  if (!event.target.closest(".user-profile")) {
    showProfileMenu.value = false;
  }
};

const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);

const goToProfile = () => {
  navigateTo("/profile");
  showProfileMenu.value = false;
};

const goToSettings = () => {
  navigateTo("/settings");
  showProfileMenu.value = false;
};

const showMore = ref(false);
const extraCategories = [
  {
    name: "Компьютеры, телефония, канцтовары",
    image: "/images/good.jpeg",
    slug: "computers",
  },
  {
    name: "Детские товары, развлечения, хобби",
    image: "/images/toys.jpeg",
    slug: "kids",
  },
  { name: "Автозапчасти, техника", image: "/images/teh.jpeg", slug: "auto" },
  { name: "Медицинские товары", image: "/images/medi.jpeg", slug: "medical" },
  {
    name: "Промышленность, строительство",
    image: "/images/str.jpeg",
    slug: "industry",
  },
];

const cardWidth = 285;
const products = [
  {
    name: "Chair",
    price: "$47.50",
    image: "https://i.ibb.co/tQKHLmQ/chair.png",
  },
  {
    name: "Headphone",
    price: "$47.50",
    image: "https://i.ibb.co/3CMK5SK/headphones.png",
  },
  {
    name: "Superstar",
    price: "$80.15",
    image: "https://i.ibb.co/3vJbMLR/shoes.png",
  },
  {
    name: "Perfume",
    price: "$64.75",
    image: "https://i.ibb.co/WfZt6cz/perfume.png",
  },
  {
    name: "Watch",
    price: "$92.00",
    image: "https://i.ibb.co/YX9W7nX/watch.png",
  },
  {
    name: "Sunglasses",
    price: "$35.99",
    image: "https://i.ibb.co/z78NbQJ/sunglasses.png",
  },
];

const visibleProducts = computed(() => [
  ...products.slice(-4),
  ...products,
  ...products.slice(0, 4),
]);

const activeIndex = ref(4);
let interval;
const autoSlide = () => {
  activeIndex.value++;
  if (activeIndex.value >= products.length + 4) {
    setTimeout(() => {
      activeIndex.value = 4;
    }, 700);
  }
};

onMounted(() => {
  interval = setInterval(autoSlide, 3000);
  document.addEventListener("click", closeProfileMenu);
});

onUnmounted(() => {
  clearInterval(interval);
  document.removeEventListener("click", closeProfileMenu);
});
</script>

<style scoped>
.page {
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: rgba(20, 33, 61, 1);
  margin: 0;
  padding: 0;
}
.profile-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  transition: 0.2s;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: rgba(20, 33, 61, 0.8);
}
.auth-buttons {
  margin-right: 50px;
  color: white;
  text-decoration: none;
  font-size: 16px;

  padding: 6px 12px;

  display: inline-block;
}
.auth-buttons:hover {
  margin-right: 50px;
  color: #fca311;
  text-decoration: none;

  padding: 6px 12px;

  display: inline-block;
}

.hero {
  position: relative;
  background-image: url("/images/julie-NyrsRivAW0Q-unsplash.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
  padding: 40px;
  padding-top: 100px;
}
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 600px;
}
.hero-content .welcome {
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.hero-content h1 {
  font-size: 36px;
  line-height: 1.3;
  font-weight: 500;
}
.scroll-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border: 1px solid white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
.categories {
  background-color: #0b1730;
  text-align: start;
  padding: 40px 20px;
}
.categories h2 {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
  margin-left: 120px;
}
.category-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
}
.category {
  width: 90%;
  background-image: url("/images/accessories.jpg");
  max-width: 1200px;
  height: 60px;
  border-radius: 30px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  overflow: hidden;
}
.cloth {
  background-image: url("/images/for-hme.jpeg");
}
.furnit {
  background-image: url("/images/food.jpeg");
}
.more {
  background-image: url("/public/images/furniture.jpg");
}
.hide-btn {
  background-image: url("/images/more.jpg");
}
.category::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(11, 23, 48, 0.55);
}
.category span {
  position: relative;
  z-index: 1;
  font-size: 16px;
  margin-left: 50px;
  background-color: #0b1730;
  padding: 5px 15px;
  border-radius: 20px;
}
.category:hover {
  transform: scale(1.03);
  transition: 0.3s ease;
}
.category-section {
  padding: 100px 20px;
  min-height: 80vh;
}

.close-icon {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 13px;
  color: white;
  cursor: pointer;
  padding: 4px 10px;
  border: 1px solid white;
  transition: transform 0.2s ease, color 0.2s ease;
}
.close-icon:hover {
  transform: scale(1.2);
  color: #fca311;
}

.burger-container {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px;
  cursor: pointer;
}

.burger-icon {
  margin-left: 35px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  font-size: 35px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease;
}

.burger-icon:hover {
  transform: scale(1.1);
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 30, 30, 0.5);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: flex-start;
  z-index: 200;
}

.menu-content {
  background-color: #0b1730;
  width: 300px;
  height: 100%;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 40px 20px;
  position: relative;
  animation: slideIn 0.3s ease forwards;
}

.menu-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 130px;
}

.menu-content li {
  margin-bottom: 20px;
}

.menu-content a {
  text-decoration: none;
  font-size: 16px;
  color: white;
  transition: color 0.3s ease;
}
.menu-content a {
  text-decoration: none;
  font-size: 16px;
  color: white;
  transition: all 0.3s ease;
  position: relative;
}

.menu-content a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0%;
  height: 2px;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

.menu-content a:hover::after {
  width: 100%;
}

.menu-content a:hover {
  color: #fca311;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.new-arrivals {
  background: #e89d3e;
  padding: 40px;
  max-width: 1680px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header h2 {
  color: #fff;
  font-size: 30px;
  font-weight: 800;
  margin-left: 100px;
}

.shop-btn {
  background: #0a1a3b;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.shop-btnn {
  background: #0a1a3b;
  color: #fff;
  border: none;
  border-radius: 30px;
  text-align: center;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 19px;
  gap: 8px;
}

.carousel {
  position: relative;
  width: 1180px;
  overflow: hidden;
  margin: 10px 95px;
}

.carousel-track {
  display: flex;
  transition: transform 0.7s ease-in-out;
}

.product-card {
  background: #fff;
  border-radius: 20px;
  width: 260px;
  margin-right: 30px;
  text-align: left;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transform: scale(0.9);
  opacity: 0.8;
  transition: all 0.5s ease;
  position: relative;
  flex-shrink: 0;
}

.product-card.active {
  transform: scale(1.15);
  opacity: 1;
  z-index: 2;
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: contain;
}

.product-card h3 {
  margin: 15px 0 5px;
  font-size: 20px;
  color: #000;
}

.product-card p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.product-card span {
  font-weight: bold;
  color: #000;
}

.cart-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #0a1a3b;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.fav-icon {
  position: absolute;
  top: 18px;
  left: 18px;
  font-size: 20px;
  color: #000;
  cursor: pointer;
  transition: 0.3s;
}

.fav-icon:hover {
  color: red;
}
@media (max-width: 1024px) {
  .carousel {
    width: 100%;
    margin: 0 auto;
  }

  .header h2 {
    margin-left: 0;
    text-align: center;
    font-size: 26px;
    flex: 1 1 100%;
  }
}

@media (max-width: 768px) {
  .new-arrivals {
    padding: 30px 20px;
  }
  .category span {
    position: relative;
    z-index: 1;
    font-size: 13px;
    margin-left: 20px;
    background-color: #0b1730;
    padding: 5px 15px;
    border-radius: 20px;
  }
  .categories h2 {
    font-size: 24px;

    margin-bottom: 30px;
    margin-left: 40px;
  }
  .header {
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 30px;
  }

  .header h2 {
    font-size: 24px;
    margin-left: -60px;
  }

  .carousel {
    width: 100%;
    margin: auto;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }

  .carousel-track {
    display: flex;
    gap: 10px;
    transition: none;
    padding: 10px 20px;
  }

  .product-card {
    flex: 0 0 75%;
    width: 75%;
    min-width: 180px;
    margin-right: 0;
    scroll-snap-align: center;
    transform: scale(1);
    opacity: 1;
  }

  .product-card.active {
    transform: none;
  }

  .product-card img {
    height: 160px;
  }

  .cart-btn {
    bottom: 15px;
    right: 15px;
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header h2 {
    font-size: 22px;
  }

  .shop-btn {
    font-size: 10px;
    padding: 3px 13px;
    margin-right: -0px;
  }
  .shop-btnn {
    font-size: 10px;
    padding: 3px 10px;
    margin-right: -0px;
    text-align: center;
  }

  .product-card {
    flex: 0 0 85%;
    width: 100%;
    min-width: 200px;
  }

  .product-card img {
    height: 80px;
  }

  .cart-btn {
    width: 32px;
    height: 32px;
  }
}
.newly-added-section {
  padding: 48px 24px;
  background-color: white;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.main-title {
  font-size: 30px;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
  margin-left: 100px;
}

.sub-title {
  font-size: 30px;
  margin-left: 100px;
  font-weight: bold;
  color: #f59e0b;
}

.view-all-btn {
  padding: 8px 16px;
  background-color: #1f2937;
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.view-all-btn:hover {
  background-color: #374151;
}

.cards-grid {
  display: flex;
  justify-content: center;
  gap: 35px;
}

.company-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 385px;
}

.card-image {
  width: 100%;
  height: 256px;
  object-fit: cover;
  display: block;
}

.card-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f59e0b;
  color: white;
  text-align: center;
  padding: 8px 0;
  font-weight: bold;
}

.company-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

@media (min-width: 640px) and (max-width: 1023px) {
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}

.company-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 385px;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.company-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.card-image {
  width: 100%;
  height: 256px;
  object-fit: cover;
  display: block;
}

.card-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f59e0b;
  color: white;
  text-align: center;
  padding: 8px 0;
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0.5px;
}

@media (max-width: 768px) {
  .newly-added-section {
    padding: 32px 16px;
  }

  .section-header {
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 24px;
    margin-left: 33px;
  }

  .main-title,
  .sub-title {
    font-size: 24px;
    margin: 0;
  }

  .view-all-btn {
    margin-top: 10px;
    font-size: 13px;
    padding: 8px 16px;
  }
  .cards-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 35px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .company-card {
    flex: 0 0 80%;
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .card-image {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .main-title,
  .sub-title {
    font-size: 22px;
  }

  .view-all-btn {
    font-size: 12px;
    padding: 6px 14px;
  }

  .cards-grid {
    gap: 16px;
  }

  .company-card {
    flex: 0 0 100%;
    margin: 0;

    width: 100%;
    min-width: 280px;
  }

  .card-image {
    height: 200px;
  }

  .card-label {
    font-size: 14px;
    padding: 6px 0;
  }
}
.footer {
  background-color: #0b1730;
  padding: 2rem 1rem;
  position: relative;
}

.footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-left .logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f8f8f8;
  letter-spacing: 0.5px;
}

.footer-center .copyright {
  font-size: 0.9rem;
  color: #f8f8f8;
  text-align: center;
}

.footer-right {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(248, 248, 248, 0.1);
  color: #f8f8f8;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: rgba(248, 248, 248, 0.2);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 0 1rem;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    width: 100%;
    justify-content: center;
  }

  .footer-left .logo {
    font-size: 1.2rem;
  }

  .footer-center .copyright {
    font-size: 0.8rem;
  }

  .social-icon {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .burger-container {
    justify-content: space-between;
    padding: 12px 16px;
  }

  .burger-icon {
    font-size: 26px;
    margin-left: 15px;
  }
  .menu-content {
    width: 180px;
    padding: 30px 16px;
  }

  .menu-content a {
    font-size: 16px;
  }
  .login-btn {
    color: white;
    text-decoration: none;
    font-size: 16px;

    display: inline-block;
  }
  .login-btn:hover {
    margin-right: 50px;
    color: #fca311;
    text-decoration: none;
    font-size: 14px;
    border: 1px solid white;
    padding: 6px 12px;
    border-radius: 4px;
    display: inline-block;
  }
}
</style>
