<template>
  <div class="profile-container">

    <div class="profile-header">
      <h1 class="page-title">Profile</h1>
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
    </div>

   
    <div class="content-wrapper">

      <div class="card user-info-card">
        <div class="avatar"></div>
        <div class="user-details">
          <h2 class="user-name">Surname Name</h2>
          <p class="user-email">E-mail: something@gmail.com</p>
          <p class="user-phone">Number: +1 222 333 44 55</p>
        </div>
      </div>

      
      <div class="card payment-card">
        <h3 class="card-title">Платежные данные</h3>
        <div class="form-group">
          <label class="form-label">Номер карточки:</label>
          <input
            type="text"
            class="card-number-input"
            value="************"
            readonly
          />
        </div>
        <div class="payment-methods">
          <button class="payment-logo">G Pay</button>
          <button class="payment-logo">Mastercard</button>
          <button class="payment-logo">VISA</button>
          <button class="payment-logo">Apple Pay</button>
        </div>
      </div>

    
    </div>
      <div class="card company-card">
        <h3 class="card-title">About company</h3>
        <p><strong>Company name:</strong> Adilet</p>
        <p><strong>Specification:</strong> Toys</p>
        <p><strong>Product:</strong> Balls, dolls, cars</p>
      </div>
  </div>
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
</template>

<script setup>
import { ref, computed } from 'vue'



const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>

.profile-container {
  background-color: #ffffff;
  padding: 0px 40px;
  max-width: 1800px;
  margin: 0 auto;
}

.profile-header {
  background-color: #0b1730;
  color: white;
  padding: 20px 30px;
  border-radius: 0 0 50px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 2.5rem;
  margin: 0;
}

.content-wrapper {
  display: flex;
justify-content: space-around;
  gap: 30px;
}

.card {
  background-color: #0b1730;
  color: white;
  padding: 30px;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.payment-card {
  background-color: #0b1730;
  color: white;
  padding: 30px;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 350px;
    height: 300px;
}
.payment-card {
  background-color: #0b1730;
  color: white;
  padding: 30px;
  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 350px;
    height: 300px;
}
.user-info-card {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 750px;
  height: 300px;
}

.avatar {
  width: 120px;
  height: 120px;
  background-color: #cccccc;
  border-radius: 50%;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 1.8rem;
  margin: 0 0 10px 0;
}

.user-email,
.user-phone {
  margin: 5px 0;
  font-size: 0.95rem;
}

.card-title {
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  color: #cccccc;
  margin-bottom: 6px;
}

.card-number-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
  box-sizing: border-box;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.payment-logo {
  background-color: white;
  color: #333333;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-logo:hover {
  opacity: 0.9;
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
.company-card{
  background-color: #0b1730;
  color: white;
  padding: 30px;
  justify-content: center;
  border-radius: 40px;
  margin-left: 65px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 750px;
    height: 300px;
    margin-top: 40px;
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


.footer {
  background-color: #0b1730; 
  padding: 2rem 1rem;
  position: relative;
  margin-top: 40px;
}
.footer::before {
  content: '';
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
  .profile-header {
    padding: 15px 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .user-info-card {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .card {
    padding: 20px;
  }

  .payment-methods {
    grid-template-columns: 1fr;
  }

  .burger-container {
    justify-content: space-between;
    padding: 12px 16px;
  }

  .burger-icon {
    font-size: 26px;
  }

  .menu-content {
    width: 180px;
    padding: 30px 16px;
  }

  .menu-content a {
    font-size: 16px;
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
</style>