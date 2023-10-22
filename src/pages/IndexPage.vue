<template>
  <q-page>
    <img
      src="../assets/img/fondoPrincipal.png"
      class="dp-block ml-3 absolute"
    />
    <div class="q-pt-xl">
      <q-carousel
        class="ml-xs wmds"
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="../assets/img/legoCarrusel1.png" />
        <q-carousel-slide :name="2" img-src="../assets/img/legoCarrusel2.png" />
        <q-carousel-slide :name="3" img-src="../assets/img/legoCarrusel3.png" />
        <q-carousel-slide :name="4" img-src="../assets/img/legoCarrusel4.png" />
      </q-carousel>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(1);
const autoplay = ref(true);
</script>

<style scoped></style>
