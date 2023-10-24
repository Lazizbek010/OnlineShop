<template>
  <div class="container">
    <router-link to="/" class="btn btn-primary my-5">Back To Home</router-link>
    <div class="row cart-products">
      <div class="col-6 cart-product border border-primary" v-for="item in cartProduct" :key="item">
        <img :src="item.images[0]" alt="" />
        <div class="p-3">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <button class="btn btn-primary">Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter.js";
import { ref } from "vue";

const store = useCounterStore();
const cartProduct = ref([]);

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const { products } = await res.json();
  products.forEach((el) => {  
    store.addedEl.forEach((item) => {
      if (el.id === item) {
        cartProduct.value.push(el);
      }
    });
  });
}
getProducts();
</script>

<style lang="scss" scoped>
</style>