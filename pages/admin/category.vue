<template>
  <div class="app-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1>SupplierHub</h1>
      </div>

      <nav class="sidebar-nav">
        <NuxtLink :to="{ name: 'dashboard',}" class="nav-item">
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

      <div class="page-header">
        <h2>Product Categories</h2>
        <button class="btn-add" @click="addCategory">+ Add new category</button>
      </div>

      <div class="content-area">
        <CategoryTable />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({name:"category"})
import { navigateTo } from '#imports'
import CategoryTable from '~/pages/admin/categotable.vue'


const addCategory = () => {
  navigateTo('/admin/add-category') 
}

const addSupplier = () => {
  navigateTo('/admin/add-supplier') 
}

const logout = () => {

  navigateTo('/login', { replace: true })
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
</style>