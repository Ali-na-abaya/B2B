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
            <path d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0-2-2V6z"/>
            <path d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0-2-2v-2z"/>
            <path d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0-2-2v-2z"/>
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
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9M9 9l6 6m6-6a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2h2z"/>
          </svg>
          Reports
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <button class="footer-btn" @click="addSupplier">+ Add supplier</button>
        <button class="footer-btn" @click="logout">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
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

      <div class="content-area">
        <div class="page-header">
          <div class="search-box">
            <input type="text" placeholder="Search Suppliers" class="search-input" />
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <button class="btn-add">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 6v6m0 0v6m0-6h6m-6 0h-6" />
            </svg>
            Add new category
          </button>
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
              <tr v-for="(supplier, index) in suppliers" :key="index">
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
                  <!-- Edit icon -->
                  <button class="action-btn edit-btn">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0L15 5.25l3.75 3.75 1.96-1.96z"/>
                    </svg>
                  </button>

                  <!-- Three dots button -->
                  <button class="action-btn more-btn" @click="toggleMenu(index, $event)">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <div  v-if="activeMenu === index"
  class="dropdown-menu"
  :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px' }">
                    <div class="menu-item" @click="viewProfile(supplier)">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2c-3.1 0-9 1.6-9 4.8V22h18v-3.2c0-3.2-5.9-4.8-9-4.8z"/>
                      </svg>
                      View Profile
                    </div>
                    <div class="menu-item" @click="deleteSupplier(supplier.id)">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-2.142L5 7m5 4v6m4-6v6M9 4h6l1 1h4v2H4V5h4l1-1z" />
                      </svg>
                      Delete
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
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ name: "suppliers" })

const suppliers = [
  { id: 1, name: 'Steve Jobs', email: 'mebius@gmail.com', company: 'Mebius', product: 'Furniture' },
  { id: 2, name: 'John Doe', email: 'john@example.com', company: 'Techline', product: 'Electronics' },
  { id: 3, name: 'Alice Brown', email: 'alice@example.com', company: 'SoftPro', product: 'Software' },
]

const activeMenu = ref(null)
const menuPosition = ref({ top: 0, left: 0 })

const toggleMenu = (index, event) => {
  if (activeMenu.value === index) {
    activeMenu.value = null
  } else {
    const rect = event.target.getBoundingClientRect()
    menuPosition.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left - 120, // оң-сол позициясын қажет болса реттей аласың
    }
    activeMenu.value = index
  }
}



const viewProfile = (supplier) => {
  console.log('View profile:', supplier)
}

const deleteSupplier = (id) => {
  console.log('Delete supplier:', id)
}

const archiveSupplier = (id) => {
  console.log('Archive supplier:', id)
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

.search-box {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 24px;
  padding: 8px 16px;
  width: 300px;
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

.supplier-table tbody tr.highlight {
  background: #e3f2fd;
  border-top: 2px solid #2196f3;
  border-bottom: 2px solid #2196f3;
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

.dropdown-menu button {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background: #f5a623;
  color: white;
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

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
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
</style>