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
          <div class="search-box">
            <input type="text" placeholder="Search Suppliers" class="search-input" />
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
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
              <tr v-for="(supplier, index) in paginatedSuppliers" :key="supplier.id">
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
                  <button class="action-btn edit-btn" @click="openEditModal(supplier)">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0L15 5.25l3.75 3.75 1.96-1.96z"/>
                    </svg>
                  </button>

                  <button class="action-btn more-btn" @click="toggleMenu(index, $event)">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>

                  <div v-if="activeMenu === index"
                       class="dropdown-menu"
                       :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }">
                    <div class="menu-item" @click="viewProfile(supplier)">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9 1.6-9 4.8V22h18v-3.2c0-3.2-5.9-4.8-9-4.8z"/>
                      </svg>
                      View Profile
                    </div>
                    <div class="menu-item" @click="archiveSupplier(supplier.id)">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M5 8h14v8H5V8z"/>
                        <path d="M12 4l-4 4h8l-4-4z"/>
                      </svg>
                      Archive
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            Previous
          </button>

          <div class="page-numbers">
            <button
              v-for="page in totalPages"
              :key="page"
              class="page-number"
              :class="{ active: page === currentPage }"
              @click="goToPage(page)"
            >
              {{ String(page).padStart(2, '0') }}
            </button>
          </div>

          <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">
            Next
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>


    <div v-if="editingSupplier" class="modal-overlay" @click="closeEditModal">
      <div class="modal" @click.stop>
        <h3>Edit Supplier</h3>
        <div class="form-group">
          <label>Name</label>
          <input v-model="editingSupplier.name" type="text" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="editingSupplier.email" type="email" />
        </div>
        <div class="form-group">
          <label>Company</label>
          <input v-model="editingSupplier.company" type="text" />
        </div>
        <div class="form-group">
          <label>Product</label>
          <input v-model="editingSupplier.product" type="text" />
        </div>
        <div class="modal-actions">
          <button @click="closeEditModal">Cancel</button>
          <button @click="saveEditedSupplier" class="btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

definePageMeta({ name: "suppliers" })


const initialSuppliers = [
  { id: 1, name: 'Steve Jobs', email: 'mebius@gmail.com', company: 'Mebius', product: 'Furniture' },
  { id: 2, name: 'John Doe', email: 'john@example.com', company: 'Techline', product: 'Electronics' },
  { id: 3, name: 'Alice Brown', email: 'alice@example.com', company: 'SoftPro', product: 'Software' },
  { id: 4, name: 'Bob Smith', email: 'bob@example.com', company: 'GadgetCo', product: 'Accessories' },
  { id: 5, name: 'Eva Green', email: 'eva@example.com', company: 'DesignLab', product: 'Interior' },
  { id: 6, name: 'Mike Lee', email: 'mike@example.com', company: 'Hardware Inc', product: 'Tools' },
  { id: 7, name: 'Sarah Connor', email: 'sarah@example.com', company: 'AI Solutions', product: 'AI Software' },
  { id: 8, name: 'Tom Hardy', email: 'tom@example.com', company: 'MovieProps', product: 'Film Equipment' },
  { id: 9, name: 'Lisa Wong', email: 'lisa@example.com', company: 'FashionHub', product: 'Apparel' },
  { id: 10, name: 'David Kim', email: 'david@example.com', company: 'MobileTech', product: 'Smartphones' },
  { id: 11, name: 'Emma Stone', email: 'emma@example.com', company: 'BeautyBox', product: 'Cosmetics' },
  { id: 12, name: 'Chris Evans', email: 'chris@example.com', company: 'FitnessGear', product: 'Workout Equipment' },
]

const suppliers = ref([...initialSuppliers])
const currentPage = ref(1)
const itemsPerPage = 5
const activeMenu = ref(null)
const menuPosition = ref({ top: 0, left: 0 })
const editingSupplier = ref(null)


const saveToStorage = () => {
  if (process.client) {
    localStorage.setItem('suppliers', JSON.stringify(suppliers.value))
  }
}


const loadFromStorage = () => {
  if (process.client) {
    const saved = localStorage.getItem('suppliers')
    if (saved) {
      suppliers.value = JSON.parse(saved)
    }
  }
}


onMounted(() => {
  loadFromStorage()
})

const activeSuppliers = computed(() => {
  return suppliers.value.filter(s => !s.archived)
})

const totalPages = computed(() => {
  return Math.ceil(activeSuppliers.value.length / itemsPerPage)
})

const paginatedSuppliers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return activeSuppliers.value.slice(start, end)
})


const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}
const goToPage = (page) => {
  currentPage.value = page
}


const toggleMenu = (index, event) => {
  if (activeMenu.value === index) {
    activeMenu.value = null
  } else {
    const rect = event.target.getBoundingClientRect()
    menuPosition.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left - 120,
    }
    activeMenu.value = index
  }
}

const viewProfile = (supplier) => {
  console.log('View profile:', supplier)
}

const archiveSupplier = (id) => {
  const supplier = suppliers.value.find(s => s.id === id)
  if (supplier) {
    supplier.archived = true
    saveToStorage()
    activeMenu.value = null
  }
}

const logout = () => {
  console.log('Logging out...')
}


const openEditModal = (supplier) => {
  editingSupplier.value = { ...supplier }
}

const closeEditModal = () => {
  editingSupplier.value = null
}

const saveEditedSupplier = () => {
  const index = suppliers.value.findIndex(s => s.id === editingSupplier.value.id)
  if (index !== -1) {
    suppliers.value[index] = { ...editingSupplier.value }
    saveToStorage()
  }
  closeEditModal()
}


function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
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
  padding: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 24px;
  padding: 8px 16px;
  width: 500px;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  padding: 4px 8px;
  flex: 1;
  font-size: 14px;
}

.search-input::placeholder {
  color: #888;
}

.table-container {
  overflow: visible !important;
  position: relative;
  margin-top: 20px;
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

.supplier-table tbody tr:hover {
  background: #fafafa;
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
  position: relative;
}

.action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #f5f5f5;
}

.edit-btn svg {
  color: #2d2d3a;
}

.more-btn svg {
  color: #2d2d3a;
}

.dropdown-menu {
  position: fixed;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 9999;
  min-width: 160px;
}

.menu-item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.menu-item:hover {
  background: #f5f5f5;
}

.menu-item svg {
  width: 16px;
  height: 16px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  padding: 12px 0;
  background: #f9f9f9;
  border-top: 1px solid #eee;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: #2d2d3a;
  cursor: pointer;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

.pagination-btn:hover {
  background: #f5f5f5;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: bold;
  min-width: 36px;
  text-align: center;
}

.page-number:hover {
  background: #f5f5f5;
}

.page-number.active {
  background: #f5a623;
  color: #1e2230;
  font-weight: bold;
}

.content-area {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.modal h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 18px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.modal-actions button:first-child {
  background: #f0f0f0;
  color: #333;
}

.modal-actions .btn-primary {
  background: #f5a623;
  color: white;
}

.modal-actions .btn-primary:hover {
  background: #e0951a;
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