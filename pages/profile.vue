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

    <!-- Content -->
    <div class="content-wrapper">
      <!-- Profile Card -->
      <div class="card user-info-card">
        <div class="avatar"></div>
        <div class="user-details">
          <h2 v-if="loading" class="user-name">Loading...</h2>
          <h2 v-else-if="error" class="user-name text-red-500">
            Error: {{ error }}
          </h2>
          <h2 v-else class="user-name">{{ userData.fullName || "—" }}</h2>

          <p v-if="!loading && !error" class="user-email">
            E-mail: {{ userData.email || "—" }}
          </p>
          <p v-if="!loading && !error" class="user-phone">
            Number: {{ userData.phoneNumber || "—" }}
          </p>
        </div>
      </div>

      <!-- Add Company Card -->
      <div class="card payment-card">
        <h3 class="card-title">Добавьте компанию</h3>
        <button class="payment-logo" @click="openModal">Add</button>
      </div>
    </div>

    <!-- Company Info -->
    <div class="card company-card">
      <h3 class="card-title">About company</h3>
      <p><strong>Company name:</strong> {{ savedCompany.name || "Adilet" }}</p>
      <p><strong>Specification:</strong> {{ savedCompany.spec || "Toys" }}</p>
      <p>
        <strong>Product:</strong>
        {{ savedCompany.product || "Balls, dolls, cars" }}
      </p>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal" @click.self="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Company Information</h2>

        <form @submit.prevent="handleSubmit">
          <input
            v-model="companyName"
            type="text"
            placeholder="Company name"
            required
          />
          <input
            v-model="specification"
            type="text"
            placeholder="Specification"
            required
          />
          <input
            v-model="productName"
            type="text"
            placeholder="Product name"
            required
          />
          <button type="submit" class="submit-btn">Save</button>
        </form>
      </div>
    </div>

    <!-- Footer -->
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
definePageMeta({ name: "clientProfilePage" });
import { ref, onMounted } from "vue";
import { useCookie, useRuntimeConfig } from "#app";

const userData = ref({});
const loading = ref(true);
const error = ref(null);
const menuOpen = ref(false);
const showModal = ref(false);

const companyName = ref("");
const specification = ref("");
const productName = ref("");
const savedCompany = ref({ name: "", spec: "", product: "" });

const toggleMenu = () => (menuOpen.value = !menuOpen.value);
const openModal = () => (showModal.value = true);
const closeModal = () => (showModal.value = false);

const handleSubmit = () => {
  savedCompany.value = {
    name: companyName.value,
    spec: specification.value,
    product: productName.value,
  };
  closeModal();
};

const fetchProfile = async () => {
  try {
    const config = useRuntimeConfig();
    const token = useCookie("token").value;

    if (!token) throw new Error("No token found in cookies");

    const res = await fetch(`${config.public.apiBase}profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Profile request failed (${res.status}): ${text}`);
    }

    userData.value = await res.json();
  } catch (err) {
    error.value = err.message;
    console.error("fetchProfile error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProfile);
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
