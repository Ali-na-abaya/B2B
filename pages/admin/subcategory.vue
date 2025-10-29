<template>
  <div class="fashion-container">
    <h1>Fashion and Beauty</h1>

    <div class="category-buttons">
      <button v-for="cat in categories" :key="cat">{{ cat }}</button>
    </div>

    <div class="products-grid">
      <div class="product-card" v-for="(item, index) in visibleItems" :key="index">
        <img :src="item.image" alt="Product" />
        <div class="product-info">
          <span class="price">{{ item.price }}</span>
          <span class="title">{{ item.title }}</span>
        </div>
        <div class="icon">🛒</div>
      </div>
    </div>

    <button v-if="visibleItems.length < products.length" class="show-more" @click="showMore">
      Show more
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const categories = ["Accessories", "Hats", "Cosmetics", "Shoes", "Clothes", "Jewelry"];

const products = ref([
  { title: "Jewelry", price: "20,000", image: "/images/item1.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item2.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item3.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item4.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item5.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item6.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item7.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item8.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item9.png" },
  { title: "Jewelry", price: "20,000", image: "/images/item10.png" },
]);

const itemsToShow = ref(20);

const visibleItems = computed(() => products.value.slice(0, itemsToShow.value));

const showMore = () => {
  itemsToShow.value += 10;
};
</script>

<style>
.fashion-container {
  background: #f6f6f6;
  padding: 30px;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
}

.fashion-container h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.category-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.category-buttons button {
  background: #f3f3f3;
  border: 1px solid #dcdcdc;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.category-buttons button:hover {
  background: #e0e0e0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.product-card {
  background: #e6e6e6;
  border-radius: 10px;
  position: relative;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: scale(1.03);
}

.product-card img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
}

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  font-size: 14px;
}

.price {
  background: #fca311;
  color: #fff;
  border-radius: 4px;
  padding: 2px 5px;
  font-weight: 600;
}

.icon {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #fca311;
  color: #000;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show-more {
  display: block;
  margin: 30px auto 0;
  background: none;
  border: none;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.show-more:hover {
  text-decoration: underline;
}
</style>
