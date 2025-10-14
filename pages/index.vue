<template>
  <div class="page">
    <header class="navbar">
     <div class="burger-container">
      <div class="burger-icon" @click="toggleMenu">
        ☰
      </div>
      <transition name="slide">
        <div v-if="menuOpen" class="menu-overlay" @click.self="toggleMenu">
          <div class="menu-content">
            
            <div class="close-icon" @click="toggleMenu">✕</div>

          <ul>
  <li>
    <NuxtLink to="/">
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
  <li>
    <NuxtLink to="/profile">
      <i class="fa-solid fa-user"></i> Profile
    </NuxtLink>
  </li>
</ul>

          </div>
        </div>
      </transition>
    </div>
      <NuxtLink to="/login" class="login-btn">Log in / Sign in</NuxtLink>
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

  <div class="category hide-btn" @click="showMore = false" style="cursor: pointer">
    <span>Скрыть</span>
  </div>
</template>
      </div>
    </section>


    <section class="arrivals">

    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showMore = ref(false)


const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const extraCategories = [
  {
    name: 'Компьютеры, телефония, канцтовары',
    image: '/images/good.jpeg',
     slug: 'computers' 
  },
  {
    name: 'Детские товары, развлечения, хобби',
    image: '/images/toys.jpeg',
    slug: 'kids' 
  },
  {
    name: 'Автозапчасти, техника',
    image: '/images/teh.jpeg',
    slug: 'auto' 
  },
  {
    name: 'Медицинские товары',
    image: '/images/medi.jpeg',
    slug: 'medical' 
  },
  {
    name: 'Промышленность, строительство',
    image: '/images/str.jpeg',
    slug: 'industry' 
  }
]
</script>

<style scoped>
.page {
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: #0b1730;
  margin: 0;
  padding: 0;
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
  background-color: rgba(11, 23, 48, 0.8);
}
.login-btn {
  margin-right: 50px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  display: inline-block;
}
.login-btn:hover {
  margin-right: 50px;
  color: #FCA311;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
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
  background-image: url('/images/accessories.jpg');
  max-width: 1200px;
  height: 60px;
  border-radius: 30px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.cloth {
  background-image: url('/images/for-hme.jpeg');
}
.furnit {
  background-image: url('/images/food.jpeg');
}
.more {
  background-image: url('/public/images/furniture.jpg');
}
.hide-btn {
  background-image: url('/images/more.jpg');
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
  font-weight: 500;
  font-size: 16px;

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
  color: #FCA311;
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
  font-size: 28px;
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
  box-shadow: 2px 0 8px rgba(0,0,0,0.2);
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
  color: #FCA311;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
}
</style>