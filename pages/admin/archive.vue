<template>
  <div class="app-container">
         <aside class="sidebar">
      <div class="sidebar-header">
        <h1>SupplierHub</h1>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink :to="{ name: 'dashboard' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
            <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            <path d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
            <path d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Dashboard
        </NuxtLink>

        <NuxtLink :to="{ name: 'category' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Categories
        </NuxtLink>

        <NuxtLink :to="{ name: 'suppliers' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path
              d="M17 20h-2c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h2v10zM19 12h2c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-2v-10zM9 12H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h2v10zM7 20H5c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2h2v10z"
            />
          </svg>
          Suppliers
        </NuxtLink>

        <NuxtLink :to="{ name: 'archive' }" class="nav-item active">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M5 8h14v8H5V8z" />
            <path d="M12 4l-4 4h8l-4-4z" />
          </svg>
          Archived
        </NuxtLink>

        <NuxtLink :to="{ name: 'reports' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9M9 9M9 9l6 6m6-6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2h2z"
            />
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

    <div class="overlay" @click="toggleSidebar"></div>

    <div class="main-content">
        <header class="header">
          <button class="burger" @click="toggleSidebar">☰</button>
        <div class="header-right">
          <div class="avatar"></div>
        </div>
      </header>


      <div class="content-area">
        <div class="page-header">
          <h2>Archived Suppliers</h2>
        </div>

        <div class="table-container">
          <table class="supplier-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Product</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supplier in archivedSuppliers" :key="supplier.id">
                <td>
                  <div class="supplier-name">
                    <div class="avatar-circle"></div>
                    {{ supplier.name }}
                  </div>
                </td>
                <td>{{ supplier.email }}</td>
                <td>{{ supplier.company }}</td>
                <td>{{ supplier.product }}</td>
                <td class="actions">
                  <button class="action-btn restore-btn" @click="restoreSupplier(supplier.id)">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 4l-4 4h8l-4-4zm0 2v12M6 10l-2 2 2 2M18 10l2 2-2 2" />
                    </svg>
                    Restore
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ name: "archive" })

import { ref, computed, onMounted } from 'vue'

const suppliers = ref([])

const loadFromStorage = () => {
  if (process.client) {
    const saved = localStorage.getItem('suppliers')
    if (saved) {
      suppliers.value = JSON.parse(saved)
    }
  }
}

const saveToStorage = () => {
  if (process.client) {
    localStorage.setItem('suppliers', JSON.stringify(suppliers.value))
  }
}

onMounted(() => {
  loadFromStorage()
})

const archivedSuppliers = computed(() => {
  return suppliers.value.filter(s => s.archived)
})

const restoreSupplier = (id) => {
  const supplier = suppliers.value.find(s => s.id === id)
  if (supplier) {
    supplier.archived = false
    saveToStorage()
    // Тізімді жаңарту
    loadFromStorage()
  }
}

const logout = () => {
  console.log('Logging out...')
}



function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  background: #fff;
}

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
  background-color: #f5a623;
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

.nav-item:hover,
.nav-item.active {
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

.avatar {
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 50%;
}

.content-area {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 20px;
  color: #1e2230;
}

.table-container {
  overflow-x: auto;
}

.supplier-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.supplier-table th,
.supplier-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
}

.supplier-table th {
  background: #1e2230;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.supplier-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-circle {
  width: 24px;
  height: 24px;
  background: #333;
  border-radius: 50%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
}

.restore-btn {
  color: #2d2d3a;
  background: #f5f5f5;
}

.restore-btn:hover {
  background: #e0e0e0;
}

.restore-btn svg {
  width: 16px;
  height: 16px;
}


.overlay {
  display:none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 900;
}
.overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 🔸 Header */
.header {
  background: #f5a623;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: end;
  align-items: center;
}
.burger {
  display: none;
  background: transparent;
  color: white;
  border: none;
  font-size: 28px;
  cursor: pointer;
}



  
@media (max-width: 768px) {
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 240px;
      transform: translateX(-100%);
      z-index: 1000;
    }
    .sidebar.active {
      transform: translateX(0);
    }
    .burger {
      display: block;
    }
    .overlay{
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

    .header {
      background: #f5a623;
      color: white;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .supplier-table tbody {
      display: grid;
      grid-template-columns: repeat(2, 1fr); 
      gap: 16px;
      border-collapse: separate;
      border-spacing: 0;
      width: 100%;
    }


    .supplier-table tr {
      display: block;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 12px 14px;
      margin: 0;
      position: relative;
      overflow: hidden;
    }

    /* 🔹 Карточкалар арасына линия */
    .supplier-table tr::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 10%;
      width: 80%;
      height: 1px;
      background: #e0e0e0;
    }

    .supplier-table tr:last-child::after {
      display: none;
    }


    .supplier-table thead {
      display: none;
    }


    .supplier-table td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
      border: none;
      font-size: 15px;
      border-bottom: 1px solid #f1f1f1; 
    }

    .supplier-table td:last-child {
      border-bottom: none; 
    }


    .supplier-table td .supplier-name {
      display: flex;
      align-items: center;
      gap: 8px;
    }


    .supplier-table td.actions {
      justify-content: flex-end;
      gap: 8px;
    }
}


@media (max-width: 480px) {
  .supplier-table tbody {
    display: grid;
    grid-template-columns: 1fr; 
    gap: 16px;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
  }

  .supplier-table tr {
    padding: 10px 12px;
  }

  .search-box {
    width: auto;
  }

  .page-number {
    min-width: 32px;
    padding: 6px 8px;
  }
}


@media (max-width: 360px) {
  .supplier-table {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .supplier-table tr {
    padding: 8px 10px;
  }

  .supplier-table td {
    font-size: 13px;
  }

  .avatar-circle {
    width: 20px;
    height: 20px;
  }

  .search-box {
    padding: 6px 10px;
  }
}
</style>