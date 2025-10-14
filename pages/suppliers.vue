<template> 
  <div class="supplier-page">
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



    <footer>
      <div class="footer">
        © 2025 Suppliers. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.supplier-page {
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: rgba(20, 33, 61, 1);
  margin: 0;
  padding: 0;
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
  background: none;
  border: none;
  color: rgb(255, 255, 255);
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

.footer{
  background-color: rgba(20, 33, 61, 1);
  width: 100%;
  color: #ffffff;
  text-align: center;
  padding: 30px;
}

</style>
