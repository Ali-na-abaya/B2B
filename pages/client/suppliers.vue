<template>
  <div class="supplier-page">
    <div class="burger-container">
      <div class="burger-icon" @click="toggleMenu">☰</div>
      <transition name="slide">
        <div v-if="menuOpen" class="menu-overlay" @click.self="toggleMenu">
          <div class="menu-content">
            <div class="close-icon" @click="toggleMenu">✕</div>
             <ul>
                  <li>
                    <NuxtLink :to="{ name: 'homePage',}">
                      <i class="fa-solid fa-house"></i> Home
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="{ name: 'clientCatalogPage',}">
                      <i class="fa-solid fa-bag-shopping"></i> Catalog
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="{ name: 'clientSuppliersPage',}">
                      <i class="fa-solid fa-industry"></i> Suppliers
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink :to="{ name: 'clientProfilePage',}">
                      <i class="fa-solid fa-user"></i> Profile
                    </NuxtLink>
                  </li>
             </ul>
          </div>
        </div>
      </transition>

      <p class="text_p">Suppliers</p>

      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск поставщикии..."
        class="search-input"
        
      />
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Company</th>
            <th>Product</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="supplier in filteredSuppliers" :key="supplier.email">
  <td data-label="Name"><span class="dot"></span> {{ supplier.name }}</td>
  <td data-label="Phone">{{ supplier.phone }}</td>
  <td data-label="Email">{{ supplier.email }}</td>
  <td data-label="Company">{{ supplier.company }}</td>
  <td data-label="Product">{{ supplier.product }}</td>
</tr>
        </tbody>
      </table>
      <p v-if="filteredSuppliers.length === 0" class="no-results">
        No suppliers found.
      </p>
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
definePageMeta({name:"clientSuppliersPage"})

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const suppliers = ref([
  { name: 'Steve Jobs', phone: '+7 776 624 8255', email: 'mebius@gmail.com', company: 'Mebius', product: 'Furniture' },
  { name: 'Elon Musk',  phone: '+7 701 222 3344', email: 'elon@tesla.com', company: 'Tesla', product: 'Cars' },
  { name: 'Bill Gates', phone: '+7 702 555 8899', email: 'bill@microsoft.com', company: 'Microsoft', product: 'Software' },
  { name: 'Jeff Bezos', phone: '+7 705 777 1234', email: 'jeff@amazon.com', company: 'Amazon', product: 'E-commerce' },
  { name: 'Mark Zuckerberg', phone: '+7 708 333 4567', email: 'mark@meta.com', company: 'Meta', product: 'Social Media' },
])

const searchQuery = ref('')

const filteredSuppliers = computed(() => {
  return suppliers.value.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    supplier.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    supplier.product.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
.supplier-page {
  font-family: "Poppins", sans-serif;
  color: white;
  background-color: rgba(20, 33, 61, 1);
  margin: 0;
  padding: 0;
  min-height: 100vh;
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
  font-size: 32px;
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


.text_p {
  font-size: 32px;
  margin-left: 30px;
}


.search-input {
  margin-left: auto;
  width: 300px;
  padding: 8px 14px;
  border-radius: 9999px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  background-color: white !important; 
  color: black !important; 
}
.search-input:focus {
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.2);
}
.search-input::placeholder {
  color: gray;
}


.table-container {
  background: white;
  margin: 30px auto;
  width: 97%;
  border-radius: 10px;
  overflow: hidden;
  color: black;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 15px;
  text-align: left;
}
th {
  background-color:rgba(217, 217, 217, 1);
  color: #333;
}
tr:nth-child(even) {
  background-color:rgba(217, 217, 217, 1);
}
.dot {
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: black;
  border-radius: 50%;
  margin-right: 10px;
}


.no-results {
  text-align: center;
  color: #333;
  padding: 20px;
}



.footer {
  background-color: #0b1730; 
  padding: 2rem 1rem;
  position: relative;
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
  .text_p {
    font-size: 26px;
    margin-left: 15px;
  }

  .search-input {
    width: 250px;
    font-size: 14px;
    padding: 6px 12px;
  }

  .burger-icon {
    font-size: 30px;
  }

  th, td {
    padding: 10px;
    font-size: 15px;
  }

  .table-container {
    width: 95%;
  }

  .menu-content {
    width: 260px;
  }

   .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 0 1rem;
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


@media (max-width: 480px) {
  .dot{
    display: none;
  }
  .burger-container {
    padding: 12px 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }


  .burger-icon {
    font-size: 28px;
    margin-right: 10px;
  }

  .text_p {
    font-size: 26px;
    margin: 0;
    color: white;

  }


  .search-input {
    width: 100%;
    margin-top: 10px;
    padding: 8px 14px;
    border-radius: 9999px;
    border: 1px solid #ccc;
    font-size: 14px;
    background-color: white !important;
    color: black !important;
  }


  table, thead, tbody, th, td, tr {
    display: block;
    width: 100%;
  }

  thead {
    display: none;
  }

  tr {
    background: white;
    color: black;
    margin: 15px 0;
    border-radius: 12px;
    padding: 15px 14px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }

  td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #333;
  }

  td:last-child {
    border-bottom: none;
  }

  .table-container {
    width: 95%;
    margin: 20px auto;
  }

  .menu-content {
    width: 240px;
    padding: 30px 16px;
  }
}


@media (max-width: 360px) {
  .dot{
    display: none;
  }
  .burger-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .burger-icon {
    font-size: 26px;
    margin-bottom: 6px;
  }

  .text_p {
    font-size: 22px;
    margin-bottom: 6px;
  }

  .search-input {
    width: 100%;
    font-size: 13px;
    padding: 6px 10px;
  }

  td {
    font-size: 13px;
  }

  tr {
    margin: 10px 0;
    padding: 10px 10px;
  }

  .menu-content {
    width: 220px;
  }
}

</style>
