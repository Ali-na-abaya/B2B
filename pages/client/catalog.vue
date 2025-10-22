
<template>
    
  <div class="catalog-page">
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
         <input
         type="text"
         v-model="searchQuery"
         placeholder="Поиск категории..."
         class="search-input"
        @keyup.enter="scrollToCategory"
       />
     </div>

    <section id="fashion" class="category-section">
      <h1 class="category-title">Мода и красота</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in fashionFilters"
          :key="i"
          @click="activeFashion = f"
          class="filter-btn"
          :class="{ active: activeFashion === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredFashion"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="home" class="category-section">
      <h1 class="category-title">Для дома</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in homeFilters"
          :key="i"
          @click="activeHome = f"
          class="filter-btn"
          :class="{ active: activeHome === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredHome"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="food" class="category-section">
      <h1 class="category-title">Еда, табачная и алкогольная продукция</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in foodFilters"
          :key="i"
          @click="activeFood = f"
          class="filter-btn"
          :class="{ active: activeFood === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredFood"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="computers" class="category-section">
      <h1 class="category-title">Компьютеры, телефония, канцтовары</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in compFilters"
          :key="i"
          @click="activeComp = f"
          class="filter-btn"
          :class="{ active: activeComp === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredComp"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="industry" class="category-section">
      <h1 class="category-title">Промышленность, строительство</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in industryFilters"
          :key="i"
          @click="activeIndustry = f"
          class="filter-btn"
          :class="{ active: activeIndustry === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredIndustry"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="kids" class="category-section">
      <h1 class="category-title">Детские товары, развлечения, хобби</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in kidsFilters"
          :key="i"
          @click="activeKids = f"
          class="filter-btn"
          :class="{ active: activeKids === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredKids"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="medical" class="category-section">
      <h1 class="category-title">Медицинские товары</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in medFilters"
          :key="i"
          @click="activeMed = f"
          class="filter-btn"
          :class="{ active: activeMed === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredMed"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="auto" class="category-section">
      <h1 class="category-title">Автозапчасти, техника</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in autoFilters"
          :key="i"
          @click="activeAuto = f"
          class="filter-btn"
          :class="{ active: activeAuto === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredAuto"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


    <section id="other" class="category-section">
      <h1 class="category-title">Прочее</h1>
      <div class="filter-buttons">
        <button
          v-for="(f, i) in otherFilters"
          :key="i"
          @click="activeOther = f"
          class="filter-btn"
          :class="{ active: activeOther === f }"
        >
          {{ f }}
        </button>
      </div>
      <div class="products-grid">
        <div
          v-for="item in filteredOther"
          :key="item.id"
          class="product-card"
        >
          <img :src="item.image" class="product-img" />
          <h3 class="product-name">{{ item.name }}</h3>
          <p class="product-price">price: {{ item.price }}</p>
        </div>
      </div>
    </section>


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
definePageMeta({name:"clientCatalogPage"})
import { ref, computed } from 'vue'
import { onMounted } from 'vue'

onMounted(() => {
  if (window.location.hash) {
    const hash = window.location.hash.substring(1) 
    const element = document.getElementById(hash)
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }
})


const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const searchQuery = ref('')

const scrollToCategory = () => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return

  const sections = document.querySelectorAll('.category-section')
  let found = false

  sections.forEach(sec => {
    const title = sec.querySelector('.category-title').textContent.toLowerCase()
    if (title.includes(query)) {
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' })
      found = true
    }
  })

  if (!found) {
    alert('Категория не найдена ')
  }

  searchQuery.value = ''
}



const fashionFilters = ['Все', 'Аксессуары', 'Головные уборы', 'Косметика и средства по уходу за телом', 'Обувь', 'Одежда', 'Ювелирные украшения и изделия']
const homeFilters = ['Все', 'Бытовая техника', 'Бытовая химия, хозтовары', 'Мебель', 'Посуда, предметы интерьера', 'Сувениры', 'Текстиль']
const foodFilters = ['Все', 'Овощи и фрукты', 'Продукты питания', 'Табачная и алкогольная продукция']
const compFilters = ['Все', 'Канцелярские товары', 'Компьютеры и оргтехника', 'Телефония и средства связи']
const industryFilters = ['Все', 'Мебельная фурнитура', 'Оборудование для бизнеса', 'Окна, двери, витражи', 'Пиломатериалы', 'Плитка, мрамор, гранит', 'Промышленное оборудование, сырьё', 'Сантехника и комплектующие', 'Средства охраны и пожаротушения', 'Стройматериалы и оборудование', 'Ткани и швейная фурнитура', 'Топливо', 'Электрика']
const kidsFilters = ['Все', 'Музыкальные инструменты, оборудование', 'Отдых, туризм, спорт', 'Товары для детей']
const medFilters = ['Все', 'Оптика', 'Товары медицинского назначения']
const autoFilters = ['Все', 'Автозапчасти']
const otherFilters = ['Все', 'Растения', 'Тара и упаковка', 'Товары для животных']

const activeFashion = ref('Все')
const activeHome = ref('Все')
const activeFood = ref('Все')
const activeComp = ref('Все')
const activeIndustry = ref('Все')
const activeKids = ref('Все')
const activeMed = ref('Все')
const activeAuto = ref('Все')
const activeOther = ref('Все')

const sample = (category) => [
  { id: 1, name: `${category} 1`, price: '$50', image: '/images/accessories.jpg', category },
  { id: 2, name: `${category} 2`, price: '$70', image: '/images/clothes.jpg', category },
  { id: 3, name: `${category} 3`, price: '$90', image: '/images/furniture.jpg', category },
  { id: 4, name: `${category} 3`, price: '$90', image: '/images/more.jpg', category }
]

const makeProducts = (filters) => filters.filter(f => f !== 'Все').flatMap(sample)
const fashionProducts = makeProducts(fashionFilters)
const homeProducts = makeProducts(homeFilters)
const foodProducts = makeProducts(foodFilters)
const compProducts = makeProducts(compFilters)
const industryProducts = makeProducts(industryFilters)
const kidsProducts = makeProducts(kidsFilters)
const medProducts = makeProducts(medFilters)
const autoProducts = makeProducts(autoFilters)
const otherProducts = makeProducts(otherFilters)

const filteredFashion = computed(() => activeFashion.value === 'Все' ? fashionProducts : fashionProducts.filter(p => p.category === activeFashion.value))
const filteredHome = computed(() => activeHome.value === 'Все' ? homeProducts : homeProducts.filter(p => p.category === activeHome.value))
const filteredFood = computed(() => activeFood.value === 'Все' ? foodProducts : foodProducts.filter(p => p.category === activeFood.value))
const filteredComp = computed(() => activeComp.value === 'Все' ? compProducts : compProducts.filter(p => p.category === activeComp.value))
const filteredIndustry = computed(() => activeIndustry.value === 'Все' ? industryProducts : industryProducts.filter(p => p.category === activeIndustry.value))
const filteredKids = computed(() => activeKids.value === 'Все' ? kidsProducts : kidsProducts.filter(p => p.category === activeKids.value))
const filteredMed = computed(() => activeMed.value === 'Все' ? medProducts : medProducts.filter(p => p.category === activeMed.value))
const filteredAuto = computed(() => activeAuto.value === 'Все' ? autoProducts : autoProducts.filter(p => p.category === activeAuto.value))
const filteredOther = computed(() => activeOther.value === 'Все' ? otherProducts : otherProducts.filter(p => p.category === activeOther.value))
</script>

<style scoped>
.category-section {
  padding: 100px 20px;
  min-height: 80vh;
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

.catalog-page {
  min-height: 100vh;
  background:rgba(19, 33, 60, 1);
  font-family: Arial, sans-serif;
}

.category-section {
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.category-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #ffffff;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.filter-btn {
  padding: 10px 20px;
  border-radius: 9999px;
  border: none;
  font-weight: 500;
  background: #e5e7eb;
  color: #111;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: rgb(192, 191, 191);
}

.filter-btn.active {
  background: rgba(252, 163, 17, 1);
  color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(252, 163, 17, 1);
}

.product-img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin: 0 auto;
}

.product-name {
  margin-top: 8px;
  font-weight: 600;
  color: #111827;
}

.product-price {
  font-size: 14px;
  color: #6b7280;
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
}

.search-input:focus {
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.2);
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

  .burger-container {
    justify-content: space-between;
    padding: 12px 16px;
  }

  .burger-icon {
    font-size: 26px;
  }


  .search-input {
    margin-left: 0;
    width: 160px;
    font-size: 14px;
    padding: 6px 10px;
  }


  .menu-content {
    width: 180px;
    padding: 30px 16px;
  }

  .menu-content a {
    font-size: 16px;
  }


  .category-section {
    padding: 16px;
  }

  .category-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .filter-buttons {
    gap: 6px;
    margin-bottom: 20px;
  }

  .filter-btn {
    padding: 6px 14px;
    font-size: 13px;
  }


  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .product-card {
    padding: 12px;
    border-radius: 12px;
  }

  .product-img {
    height: 140px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-price {
    font-size: 12px;
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
  .burger-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .search-input {
    width: 100%;
    margin: 0;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .product-img {
    height: 120px;
  }

  .category-title {
    font-size: 18px;
  }
}
</style>
