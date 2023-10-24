import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const addedEl = ref([]);

  function increment(id) {
    // addedEl.value.push(id)
    if(addedEl.value.length) {
      const isAvailable = addedEl.value.includes(id)
      if(!isAvailable) addedEl.value.push(id)
    } else {
      addedEl.value.push(id)
      console.log(id);
    }
  }

return { addedEl, increment }
})

