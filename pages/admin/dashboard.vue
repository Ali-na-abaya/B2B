<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>SupplierHub</h1>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink :to="{ name: 'dashboard' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/>
            <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"/>
            <path d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"/>
            <path d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink :to="{ name: 'category' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
          </svg>
          Categories
        </NuxtLink>

        <NuxtLink :to="{ name: 'suppliers' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17 20h-2c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h2v10zM19 12h2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-2v-10zM9 12H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h2v10zM7 20H5c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h2v10z"/>
          </svg>
          Suppliers
        </NuxtLink>

        <NuxtLink :to="{ name: 'reports' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9M9 9M9 9l6 6m6-6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2h2z"/>
          </svg>
          Reports
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button class="footer-btn" @click="addSupplier">+ Add supplier</button>
        <button class="footer-btn" @click="logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 6v.01M6 6v.01" />
          </svg>
          Log out
        </button>
      </div>
    </aside>

    <div class="main-content">
      <header class="header">
        <div class="header-right">
          <div class="avatar"></div>
        </div>
      </header>

      <main class="main-content2">

        <div class="stats">
          <div class="stat-card">
            <h3>Total Categories</h3>
            <p>{{ totalCategories }}</p>
          </div>
          <div class="stat-card">
            <h3>Total Suppliers</h3>
            <p>{{ totalSuppliers }}</p>
          </div>
          <div class="stat-card">
            <h3>Total Products</h3>
            <p>{{ totalProducts }}</p>
          </div>
        </div>


        <div class="new-section">
          <div class="new-box">
            <h3>New companies on the site</h3>
            <ul>
              <li v-for="(company, i) in newCompanies.slice(0, visibleCompanyCount)" :key="i" class="company-item">
                <div class="circle"></div>
                <div>
                  <span class="company-name">{{ company.name }}</span><br />
                  <small>{{ company.city }}</small>
                </div>
              </li>
            </ul>
            <button class="show-more" @click="toggleCompanies">
              {{ showAllCompanies ? "Hide" : "Show more" }}
            </button>
          </div>

          <div class="new-box">
            <h3>New products on the site</h3>
            <ul>
              <li v-for="(product, i) in newProducts.slice(0, visibleProductCount)" :key="i" class="company-item">
                <div class="circle"></div>
                <div>
                  <span class="company-name">{{ product.name }}</span><br />
                  <small>{{ product.supplier }}</small>
                </div>
              </li>
            </ul>
            <button class="show-more" @click="toggleProducts">
              {{ showAllProducts ? "Hide" : "Show more" }}
            </button>
          </div>
        </div>


        <div class="recent-activity">
          <h3>Recent Activity</h3>
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Supplier</th>
                <th>Added Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in recentActivity.slice(0, visibleActivityCount)" :key="i">
                <td>{{ item.product }}</td>
                <td>{{ item.supplier }}</td>
                <td>{{ item.date }}</td>
              </tr>
            </tbody>
          </table>
          <button class="show-more" @click="toggleActivity">
            {{ showAllActivity ? "Hide" : "Show more" }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ name: "dashboard" })
import { navigateTo } from "#imports"
import { ref } from "vue"

const addSupplier = () => navigateTo("/admin/add-supplier")
const logout = () => navigateTo("/login", { replace: true })


const totalCategories = 39
const totalSuppliers = 12
const totalProducts = 300

const originalNewCompanies = [
  { name: "ТОО Flario KZ", city: "Казахстан, Алматы" },
  { name: "ИП NovaTrade", city: "Казахстан, Астана" },
  { name: "ТОО Orion Ltd", city: "Казахстан, Шымкент" },
  { name: "ТОО QazPro", city: "Казахстан, Караганда" },
]

const originalNewProducts = [
  { name: "Accessories", supplier: "ИП Овация" },
  { name: "Perfume", supplier: "BeautyStore" },
  { name: "Shoes", supplier: "Comfort Trade" },
  { name: "Watch", supplier: "TimeLine" },
]

const originalRecentActivity = [
  { product: "Accessories", supplier: "ИП Овация", date: "03.10.2025" },
  { product: "Perfume", supplier: "BeautyStore", date: "05.10.2025" },
  { product: "Shoes", supplier: "Comfort Trade", date: "06.10.2025" },
  { product: "Watch", supplier: "TimeLine", date: "08.10.2025" },
  { product: "Glasses", supplier: "VisionPro", date: "10.10.2025" },
]


const newCompanies = [...originalNewCompanies, ...originalNewCompanies]
const newProducts = [...originalNewProducts, ...originalNewProducts]
const recentActivity = [...originalRecentActivity, ...originalRecentActivity]


const visibleCompanyCount = ref(4)
const visibleProductCount = ref(4)
const visibleActivityCount = ref(5)


const showAllCompanies = ref(false)
const showAllProducts = ref(false)
const showAllActivity = ref(false)


const toggleCompanies = () => {
  showAllCompanies.value = !showAllCompanies.value
  visibleCompanyCount.value = showAllCompanies.value ? newCompanies.length : 4
}

const toggleProducts = () => {
  showAllProducts.value = !showAllProducts.value
  visibleProductCount.value = showAllProducts.value ? newProducts.length : 4
}

const toggleActivity = () => {
  showAllActivity.value = !showAllActivity.value
  visibleActivityCount.value = showAllActivity.value ? recentActivity.length : 5
}
</script>


<style scoped>
.sidebar {
  width: 256px;
  background: #1e2230;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.sidebar-header {
  padding: 21px;
  border-bottom: 1px solid #2d2d3a;
  background-color:#f5a623;
}

.sidebar-header h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.sidebar-nav {
  padding: 16px;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: background 0.2s;
  margin-bottom: 8px;
}

/* .nav-item:hover {
  background: #2d2d3a;
} */

.nav-item:hover {
  background: #f5a623;
  color: #1e2230;
  font-weight: bold;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #2d2d3a;
}

.footer-btn {
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.footer-btn:hover {
  background: #2d2d3a;
}

.app-container {
  display: flex;
  height: 100vh;
  background: #fff;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  background: #f5a623;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: end;
  align-items: center;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.lang-selector {
  background: transparent;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 50%;
}

.page-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
}

.page-header h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.btn-add {
  background: #2d2d3a;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add:hover {
  background: #22222e;
}

.content-area {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}






.main-content2 {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}


.stats {
  display: flex;
  gap: 20px;
}
.stat-card {
  background: white;
  flex: 1;
  padding: 18px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.stat-card h3 {
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
}

.new-section {
  display: flex;
  gap: 20px;
  margin-top: 25px;
}
.new-box {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.new-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.company-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}
.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #f4a100;
}
.company-name {
  font-weight: 500;
}


.recent-activity {
  margin-top: 35px;
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.recent-activity h3 {
  margin-bottom: 15px;
  font-size: 32px;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}
th, td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #eee;
}
th {
  background: #f9fafb;
  font-weight: 600;
}

/* Show more button */
.show-more {
  background: transparent;
  border: none;
  color: #666;
  font-size: 14px;
  text-align: right;
  width: 100%;
  padding: 8px 0;
  cursor: pointer;
  margin-top: 10px;
}

.show-more:hover {
  color: #333;
  text-decoration: underline;
}
</style>