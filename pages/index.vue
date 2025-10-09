<template>
  <div class="page">
    <header class="navbar">
      <button class="menu-btn">☰</button>
      <a href="#" class="login-btn">Log in / Sign in</a>
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
        <div class="category" style="background-image: url('')">
          <span>Аксессуары</span>
        </div>
        <div class="category" style="background-image: url('/images/clothes.jpg')">
          <span>Одежда</span>
        </div>
        <div class="category" style="background-image: url('/images/furniture.jpg')">
          <span>Мебель</span>
        </div>
        <div class="category" style="background-image: url('/images/more.jpg')">
          <span>Ещё...</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
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
  position: absolute;
  top: 0;
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}
.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.login-btn {
  color: white;
  text-decoration: none;
  font-size: 14px;
  border: 1px solid white;
  padding: 6px 12px;
  border-radius: 4px;
  margin-left: ;
}


.hero {
  position: relative;
  background-image: url('../images/julie-NyrsRivAW0Q-unsplash.jpg');
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
  padding: 40px;
}
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0,0,0,0.4);
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
  max-width: 700px;
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
