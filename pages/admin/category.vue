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

        <NuxtLink :to="{ name: 'category' }" class="nav-item active">
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

        <NuxtLink :to="{ name: 'archive' }" class="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M5 8h14v8H5V8z"/>
            <path d="M12 4l-4 4h8l-4-4z"/>
          </svg>
          Archived
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
        <div class="category-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in categories" :key="category.id">
                <td>#{{ index + 1 }}</td>
                <td>
                  <template v-if="editingId === category.id">
                    <input
                      v-model="editingName"
                      @keyup.enter="saveEdit(category.id)"
                      @blur="cancelEdit"
                      class="edit-input"
                      autofocus
                    />
                  </template>
                  <template v-else>
                    {{ category.name }}
                    <span class="arrow-badge">→</span>
                  </template>
                </td>
                <td>
                  <div class="action-buttons">
                    <button
                      v-if="editingId !== category.id"
                      class="icon-btn edit"
                      @click="startEdit(category)"
                      title="Edit"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>

                    <button
                      v-if="editingId === category.id"
                      class="icon-btn save"
                      @click="saveEdit(category.id)"
                      title="Save"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </button>

                    <button
                      v-if="editingId === category.id"
                      class="icon-btn cancel"
                      @click="cancelEdit"
                      title="Cancel"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>

                    <button
                      v-if="editingId !== category.id"
                      class="icon-btn delete"
                      @click="confirmDelete(category)"
                      title="Delete"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-2.142L9 7M20 7H4m0 0v6m0 0v6m0 0V7"/>
                      </svg>
                    </button>
                  </div>
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
definePageMeta({ name: "category" })
import { ref } from 'vue'
import { navigateTo } from 'nuxt/app'

const categories = ref([
  { id: 1, name: 'Fashion and beauty' },
  { id: 2, name: 'For home' },
  { id: 3, name: 'Food, tobacco and alcohol products' },
  { id: 4, name: 'Computers, telephony, office supplies' },
  { id: 5, name: 'Industry, construction' },
  { id: 6, name: 'Children’s goods, entertainment, hobbies' },
  { id: 7, name: 'Auto parts, equipment' },
  { id: 8, name: 'Medical products' },
  { id: 9, name: 'Other' },
])

const editingId = ref(null)
const editingName = ref('')

const addCategory = () => {
  const newId = Date.now()
  const newCategory = { id: newId, name: 'New Category' }
  categories.value.unshift(newCategory)
  startEdit(newCategory)
}

function startEdit(category) {
  editingId.value = category.id
  editingName.value = category.name
}

function saveEdit(id) {
  const trimmed = editingName.value.trim()

  if (trimmed === '') {
    if (confirm('Category name is empty. Delete it?')) {
      categories.value = categories.value.filter(cat => cat.id !== id)
    }
    editingId.value = null
    editingName.value = ''
    return
  }

  const index = categories.value.findIndex(cat => cat.id === id)
  if (index !== -1) {
    categories.value[index] = { ...categories.value[index], name: trimmed }
  }

  editingId.value = null
  editingName.value = ''
}

function cancelEdit() {
  const wasNew = categories.value.some(cat => cat.id === editingId.value && cat.name === 'New Category')
  if (wasNew) {
    categories.value = categories.value.filter(cat => cat.id !== editingId.value)
  }

  editingId.value = null
  editingName.value = ''
}

function confirmDelete(category) {
  if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
    categories.value = categories.value.filter(cat => cat.id !== category.id)
    if (editingId.value === category.id) {
      editingId.value = null
      editingName.value = ''
    }
  }
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

.nav-item.active,
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

.category-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background: #f9f9f9;
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: #666;
  border-bottom: 1px solid #ddd;
}

tbody tr {
  border-bottom: 1px solid #eee;
}

tbody tr:hover {
  background: #fafafa;
}

tbody td {
  padding: 16px;
  font-size: 14px;
  color: #333;
}

.arrow-badge {
  background: #f5a623;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-left: 8px;
  font-size: 12px;
}

.edit-input {
  padding: 4px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.icon-btn:hover {
  background: #f0f0f0;
}

.icon-btn.edit:hover {
  color: #007bff;
}

.icon-btn.delete:hover {
  color: #dc3545;
}

.icon-btn.save:hover {
  color: #28a745;
}

.icon-btn.cancel:hover {
  color: #6c757d;
}
</style>