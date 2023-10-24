<template>
    <div class="card-loader">
        <div class="card-loader__spiner" v-if="loading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div class="card-loader__content" :class="{'card-loader__content--loading': loading}">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
    loading: Boolean
})
</script>

<style scoped lang="scss">
.card-loader {
    position: relative;

    &__spiner {
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        z-index: 10;
    }
    &__content {
        position: relative;
        &--loading {
            &::after {
                position: absolute;
                content: '';
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.7);
            }
        }
    }
}
</style>