<template>
  <div>
    <div class="card mb-4" style="height: 350px" v-if="product">
      <img
        v-if="product?.images.length"
        :src="product.images[0]"
        class="card-img-top border-bottom-1 border"
        alt="..."
        width="236"
        height="150"
      />
      <div
        height="100%"
        class="card-body d-flex justify-content-between flex-column"
      >
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="card-title">{{ product.title }}</h5>
          <h6 class="text-danger text-end">{{ product.brand }}</h6>
        </div>
        <h6>Category: {{ product.category }}</h6>
        <p class="card-text cut-text">
          {{ product.description }}
        </p>
        <div class="d-flex justify-content-between align-items-center">
          <p class="m-0">{{ product.price }}$</p>
          <button @click="store.increment(product.id)" class="btn btn-primary">
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
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useCounterStore } from "@/stores/counter.js";
const store = useCounterStore();
import { defineProps } from "vue";
defineProps({
  product: {}
});
</script>