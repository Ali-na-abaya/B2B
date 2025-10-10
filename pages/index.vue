<template>
  <div class="page">
    <header class="navbar">
      <button class="menu-btn">☰</button>
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
        <div class="category">
          <span>Мода и красота</span>
        </div>
        <div class="cloth category">
          <span>Для дома</span>
        </div>
        <div class="furnit category">
          <span>Еда, табачная и алкогольная продукция</span>
        </div>

        <div
          v-if="!showMore"
          class="more category"
          @click="showMore = true"
          style="cursor: pointer"
        >
          <span>Ещё...</span>
        </div>

     <template v-if="showMore">
  <div
    v-for="(cat, index) in extraCategories"
    :key="index"
    class="category extra-category"
    :style="{ backgroundImage: `url(${cat.image})` }"
  >
    <span>{{ cat.name }}</span>
  </div>
  <div class="category hide-btn" @click="showMore = false" style="cursor: pointer">
    <span>Скрыть</span>
  </div>
</template>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showMore = ref(false)

const extraCategories = [
  {
    name: 'Компьютеры, телефония, канцтовары',
    image: '/images/good.jpeg'
  },
  {
    name: 'Детские товары, развлечения, хобби',
    image: '/images/toys.jpeg'
  },
  {
    name: 'Автозапчасти, техника',
    image: '/images/teh.jpeg'
  },
  {
    name: 'Медицинские товары',
    image: '/images/medi.jpeg'
  },
  {
    name: 'Промышленность, строительство',
    image: '/images/str.jpeg'
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
.menu-btn {
  margin-left: 60px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.login-btn {
  margin-right: 60px;
  color: white;
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
  text-align: center;
  padding: 40px 20px;
}
.categories h2 {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
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
  color: white;
  font-weight: 500;
  font-size: 16px;
}
.category:hover {
  transform: scale(1.03);
  transition: 0.3s ease;
}
</style>