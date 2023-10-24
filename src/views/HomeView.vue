<template>
  <header class="fixed-top">
    <nav class="navbar navbar-light bg-primary">
      <div class="container py-2">
        <router-link to="/" class="navbar-brand text-light fw-bolder fs-1"
          ><div id="logo">OnlineShop</div></router-link
        >
        <div class="d-flex gap-4">
          <router-link
          to="/login"
          class="d-flex border border-light p-2 rounded-1 cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#fff"
            class="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
            />
          </svg>
          <span class="text-light ms-2">Kirish</span>
        </router-link>
        <router-link
          to="/cart"
          class="d-flex border border-light p-2 rounded-1 cart"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="slightly transparent"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 6.5C9 4.88779 10.2402 3.5 12 3.5C13.7598 3.5 15 4.88779 15 6.5V7.5H9V6.5ZM7.5 9V11.5H9V9H15V11.5H16.5V9H18.5V19.75C18.5 20.1642 18.1642 20.5 17.75 20.5H6.25C5.83579 20.5 5.5 20.1642 5.5 19.75V9H7.5ZM7.5 7.5V6.5C7.5 4.11221 9.35984 2 12 2C14.6402 2 16.5 4.11221 16.5 6.5V7.5H19.25H20V8.25V19.75C20 20.9926 18.9926 22 17.75 22H6.25C5.00736 22 4 20.9926 4 19.75V8.25V7.5H4.75H7.5Z"
              fill="#fff"
            ></path>
          </svg>
          <span class="text-light ms-2">Savat</span>
          <div v-if="store.addedEl.length" class="count text-light bg-danger">
            {{ store.addedEl.length }}
          </div>
        </router-link>
        </div>
      </div>
    </nav>
  </header>
  <!-- MAIN PRoducts -->
  <main class="py-4" id="main">
    <div class="container">
      <div class="row">
        <div class="col-2">
          <h1>Category:</h1>
          <h6>
            <ul class="ps-0 mt-4">
              <li @click="getProducts()" class="pb-1 pointer">All</li>
              <li @click="getCategory('smartphones')" class="pb-1 pointer">
                smartphones
              </li>
              <li @click="getCategory('laptops')" class="pb-1 pointer">
                laptops
              </li>
              <li @click="getCategory('fragrances')" class="pb-1 pointer">
                fragrances
              </li>
              <li @click="getCategory('skincare')" class="pb-1 pointer">
                skincare
              </li>
            </ul>
          </h6>
        </div>
        <div class="col-10">
          <div class="row align-items-stretch" v-if="items">
            <div
              height="100%"
              class="col-3 d-flex justify-content-between flex-column"
              v-for="(product, i) in items"
              :key="`product-${i}`"
            >
              <CardLoader :loading="loading">
                <ProductCard :product="product" />
              </CardLoader>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center mt-5">
              <li class="page-item">
                <button class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>

              <li
                class="page-item"
                :class="{ active: page === params.page }"
                v-for="page in params.pageCount"
                :key="page"
              >
                <button class="page-link" @click="changePage(page)">
                  {{ page }}
                </button>
              </li>
              <li class="page-item">
                <button class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter.js";
import ProductCard from "@/components/ProductCard.vue";
import CardLoader from "@/components/ui/CardLoader.vue";

const store = useCounterStore();
const items = ref([]);
const loading = ref(false);
const params = ref({
  page: 1,
  pageCount: 0,
  limit: 20,
});

async function getProducts() {
  loading.value = true;
  try {
    const skip = (params.value.page - 1) * params.value.limit;

    const res = await fetch(
      `https://dummyjson.com/products?limit=${params.value.limit}&skip=${skip}`
    );
    const { products, total } = await res.json();
    params.value.pageCount = total / params.value.limit;

    items.value = products;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}
getProducts();

async function getCategory(category) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}?limit=20`
  );
  const { products } = await res.json();
  console.log(products);
  items.value = products;
}

const changePage = (page) => {
  params.value.page = page;
  getProducts();
};
</script>