<template>
  <div class="profile-container">
    <!-- Header -->
    <div class="profile-header">
      <h1 class="page-title">Profile</h1>
      <div class="burger-container">
        <div class="burger-icon" @click="toggleMenu">☰</div>
        <transition name="slide">
          <div v-if="menuOpen" class="menu-overlay" @click.self="toggleMenu">
            <div class="menu-content">
              <div class="close-icon" @click="toggleMenu">✕</div>
              <ul>
                <li>
                  <NuxtLink :to="{ name: 'homePage' }">
                    <i class="fa-solid fa-house"></i> Home
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'clientCatalogPage' }">
                    <i class="fa-solid fa-bag-shopping"></i> Catalog
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'clientSuppliersPage' }">
                    <i class="fa-solid fa-industry"></i> Suppliers
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'clientProfilePage' }">
                    <i class="fa-solid fa-user"></i> Profile
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Profile Info -->
    <div class="content-wrapper">
      <div class="card user-info-card">
        <div class="avatar"></div>
        <div class="user-details">
          <h2 v-if="loading" class="user-name">Loading...</h2>
          <h2 v-else-if="error" class="user-name text-red-500">Error: {{ error }}</h2>
          <h2 v-else class="user-name">{{ userData.fullName || '—' }}</h2>

          <p v-if="!loading && !error" class="user-email">
            E-mail: {{ userData.email || '—' }}
          </p>
          <p v-if="!loading && !error" class="user-phone">
            Number: {{ userData.phoneNumber || '—' }}
          </p>
        </div>
      </div>

      <div class="card payment-card">
        <h3 class="card-title">Добавьте компанию</h3>
        <button class="payment-logo" @click="openModal">Add</button>
      </div>
    </div>

    <!-- Company Card — тек форма сақталған соң шығады -->
    <div
      v-if="savedCompany.name && savedCompany.spec && savedCompany.product"
      class="card company-card"
    >
      <h3 class="card-title">About company</h3>
      <p><strong>Company name:</strong> {{ savedCompany.name }}</p>
      <p><strong>Specification:</strong> {{ savedCompany.spec }}</p>
      <p><strong>Product:</strong> {{ savedCompany.product }}</p>
    </div>

    <!-- Modal Form -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Company Information</h2>

        <form @submit.prevent="handleSubmit">
          <input v-model="companyName" type="text" placeholder="Company name" required />
          <input v-model="specification" type="text" placeholder="Specification" required />
          <input v-model="productName" type="text" placeholder="Product name" required />
          <button type="submit" class="submit-btn">Save</button>
        </form>
      </div>
    </div>

   
  </div>
</template>

<script setup>
definePageMeta({ name: "clientProfilePage" })
import { ref, onMounted } from "vue"

const userData = ref({})
const loading = ref(true)
const error = ref(null)
const menuOpen = ref(false)
const showModal = ref(false)

const companyName = ref("")
const specification = ref("")
const productName = ref("")
const savedCompany = ref({ name: "", spec: "", product: "" })

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const handleSubmit = () => {
  savedCompany.value = {
    name: companyName.value.trim(),
    spec: specification.value.trim(),
    product: productName.value.trim(),
  }
  closeModal()
}

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found")

    const res = await fetch("https://b2b-f014.onrender.com/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) throw new Error("Failed to fetch profile")
    userData.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => setTimeout(fetchProfile, 300))
</script>

<style scoped>

.profile-container {
  background-color: #ffffff;
  padding: 0 40px;
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
  margin-bottom: 10px;
}

.payment-card {
  width: 350px;
  height: 300px;
}

.company-card {
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

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 400px;
  color: black;
  position: relative;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.submit-btn {
  background-color: #0b1730;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
}

.submit-btn:hover {
  background-color: #142b50;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 22px;
  cursor: pointer;
  color: #000;
}


.footer {
  background-color: #0b1730;
  padding: 2rem 1rem;
  position: relative;
  margin-top: 40px;
}
.profile-container { background-color: #ffffff; padding: 0 40px; max-width: 1800px; margin: 0 auto; } .profile-header { background-color: #0b1730; color: white; padding: 20px 30px; border-radius: 0 0 50px 50px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; } .page-title { font-size: 2.5rem; margin: 0; } .content-wrapper { display: flex; justify-content: space-around; gap: 30px; } .card { background-color: #0b1730; color: white; padding: 30px; border-radius: 40px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); } .user-info-card { display: flex; align-items: center; gap: 20px; width: 750px; height: 300px; } .avatar { width: 120px; height: 120px; background-color: #cccccc; border-radius: 50%; } .user-details { display: flex; flex-direction: column; } .user-name { font-size: 1.8rem; margin: 0 0 10px 0; } .user-email, .user-phone { margin: 5px 0; font-size: 0.95rem; } .card-title { font-size: 1.6rem; margin-top: 0; margin-bottom: 20px; } .form-group { margin-bottom: 20px; } .form-label { display: block; font-size: 0.85rem; color: #cccccc; margin-bottom: 6px; } .card-number-input { width: 100%; padding: 10px; border: none; border-radius: 8px; background-color: #ffffff; color: #333333; font-size: 1rem; box-sizing: border-box; } .payment-methods { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; } .payment-logo { background-color: white; color: #333333; border: none; border-radius: 20px; padding: 10px; font-weight: bold; font-size: 0.95rem; cursor: pointer; text-align: center; display: flex; align-items: center; justify-content: center; } .payment-logo:hover { opacity: 0.9; } .close-icon { position: absolute; top: 18px; right: 18px; font-size: 13px; color: white; cursor: pointer; padding: 4px 10px; border: 1px solid white; transition: transform 0.2s ease, color 0.2s ease; } .close-icon:hover { transform: scale(1.2); color: #FCA311; } .burger-container { position: relative; z-index: 100; display: flex; align-items: center; justify-content: flex-start; padding: 16px 20px; cursor: pointer; } .burger-icon { background: none; border: none; color: rgb(255, 255, 255); font-size: 35px; cursor: pointer; user-select: none; transition: transform 0.3s ease; } .burger-icon:hover { transform: scale(1.1); } .payment-card { width: 350px; height: 300px; } .company-card { background-color: #0b1730; color: white; padding: 30px; justify-content: center; border-radius: 40px; margin-left: 65px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); width: 750px; height: 300px; margin-top: 40px; } .menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(30, 30, 30, 0.5); backdrop-filter: blur(2px); display: flex; justify-content: flex-start; z-index: 200; } .menu-content { background-color: #0b1730; width: 300px; height: 100%; box-shadow: 2px 0 8px rgba(0,0,0,0.2); padding: 40px 20px; position: relative; animation: slideIn 0.3s ease forwards; } .menu-content ul { list-style: none; padding: 0; margin: 0; margin-top: 130px; } .menu-content li { margin-bottom: 20px; } .menu-content a { text-decoration: none; font-size: 16px; color: white; transition: all 0.3s ease; position: relative; } .menu-content a::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 0%; height: 2px; background-color: #ffffff; transition: width 0.3s ease; } .menu-content a:hover::after { width: 100%; } .menu-content a:hover { color: #FCA311; } @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } .slide-enter-active, .slide-leave-active { transition: opacity 0.3s ease; } .slide-enter-from, .slide-leave-to { opacity: 0; } .footer { background-color: #0b1730; padding: 2rem 1rem; position: relative; margin-top: 40px; } .footer-content { display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 2rem; } .footer-left .logo { font-size: 1.5rem; font-weight: bold; color: #f8f8f8; letter-spacing: 0.5px; } .footer-center .copyright { font-size: 0.9rem; color: #f8f8f8; text-align: center; } .footer-right { display: flex; gap: 1rem; } .social-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background-color: rgba(248, 248, 248, 0.1); color: #f8f8f8; font-size: 1.2rem; transition: all 0.3s ease; } .social-icon:hover { background-color: rgba(248, 248, 248, 0.2); transform: scale(1.1); } /* ——— Responsive ——— */ @media (max-width: 768px) { .profile-header { padding: 15px 20px; } .page-title { font-size: 2rem; } .user-info-card { flex-direction: column; text-align: center; width: 100%; height: auto; padding: 20px; } .avatar { width: 100px; height: 100px; } .content-wrapper { flex-direction: column; align-items: center; } .payment-card { width: 100%; height: auto; } .company-card { margin-left: 0; width: 100%; } .burger-container { justify-content: space-between; padding: 12px 16px; } .burger-icon { font-size: 26px; } .menu-content { width: 180px; padding: 30px 16px; } .menu-content a { font-size: 16px; } .footer-content { flex-direction: column; gap: 1.5rem; text-align: center; padding: 0 1rem; } .footer-left, .footer-center, .footer-right { width: 100%; justify-content: center; } } @media (max-width: 480px) { .user-info-card { align-items: center; text-align: center; gap: 15px; } .avatar { width: 80px; height: 80px; } .user-name { font-size: 1.2rem; } .user-email, .user-phone { font-size: 0.85rem; } .payment-methods { grid-template-columns: 1fr; } .card-title { font-size: 1.3rem; } .payment-logo { font-size: 0.9rem; padding: 8px; } }

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .user-info-card,
  .payment-card,
  .company-card {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
