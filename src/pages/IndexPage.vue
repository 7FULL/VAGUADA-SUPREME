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

    <div class="pt-xs pl-sm pr-sm grid">
      <div v-for="product in products" :key="product.nombre" class="wlg">
        <q-card class="q-ma-sm">
          <q-card-section>
            <img
              :src="'/src/assets/img/productos/' + product.img"
              style="max-width: 225px"
              class="block mg-auto q-pa-sm"
            />
          </q-card-section>
        </q-card>
        <div class="q-pa-md">
          <div class="q-pb-sm">
            <span class="text-weight-bold">{{ product.nombre }}</span>
          </div>
          <div class="q-pb-sm">
            <q-rating
              v-model="product.estrellas"
              color="orange"
              icon="star"
              icon-half="star_half"
              icon-selected="star"
              size="1.5em"
              readonly
            />
          </div>
          <span class="text-center">
            <span class="text-weight-bold text-subtitle1"
              >{{ product.precio }}€</span
            >
          </span>
          <div class="text-center q-pt-sm">
            <q-btn
              color="warning"
              label="Añadir a carrito"
              class="text-weight-bold text-black q-pa-md wxl"
              @click="addProduct(product)"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { userDataStore } from "../stores/userData.js";

const emit = defineEmits(['added', 'removed'])

const slide = ref(1);
const autoplay = ref(true);

const products = [
  {
    nombre: "Futbolin",
    precio: 50.99,
    estrellas: 5,
    img: "futbolin.png",
    oferta: true,
  },
  {
    nombre: "Kai",
    precio: 31.99,
    estrellas: 5,
    img: "kay.png",
    oferta: true,
  },
  {
    nombre: "Hedwig",
    precio: 29.99,
    estrellas: 5,
    img: "hedwigh.png",
    oferta: true,
  },
  {
    nombre: "Ajedrez",
    precio: 35.99,
    estrellas: 3,
    img: "ajedrez.png",
    oferta: true,
  },
  {
    nombre: "Papá Noel",
    precio: 32.99,
    estrellas: 4,
    img: "noel.png",
    oferta: true,
  },
  {
    nombre: "Bugatti",
    precio: 349.99,
    estrellas: 5,
    img: "chiron.png",
    oferta: true,
  },
  {
    nombre: "Mustang",
    precio: 140.99,
    estrellas: 4,
    img: "mustang.png",
    oferta: true,
  },
  {
    nombre: "Piano",
    precio: 399.99,
    estrellas: 2,
    img: "piano.png",
    oferta: true,
  },
  {
    nombre: "Gatos",
    precio: 14.99,
    estrellas: 5,
    img: "gatos.png",
    oferta: true,
  },
  {
    nombre: "Spice Girls",
    precio: 9.99,
    estrellas: 4,
    img: "spicegirls.png",
    oferta: true,
  },
  {
    nombre: "Sunbird",
    precio: 12.99,
    estrellas: 4,
    img: "sunbird.png",
    oferta: true,
  },
  {
    nombre: "Lloyd",
    precio: 31.99,
    estrellas: 4,
    img: "lloid.png",
    oferta: true,
  },
  {
    nombre: "1001 Stickers",
    precio: 8.99,
    estrellas: 4,
    img: "stickers.png",
    oferta: true,
  },
  {
    nombre: "Coliseo",
    precio: 54.99,
    estrellas: 3,
    img: "coliseo.png",
    oferta: true,
  },
  {
    nombre: "Robot Inventor",
    precio: 359.99,
    estrellas: 3,
    img: "inventor.png",
    oferta: true,
  },
  {
    nombre: "Faro",
    precio: 159.99,
    estrellas: 3,
    img: "faro.png",
    oferta: true,
  },
  {
    nombre: "Tarta",
    precio: 15.99,
    estrellas: 3,
    img: "tarta.png",
    oferta: true,
  },
  {
    nombre: "Tuc-Tuc",
    precio: 15.99,
    estrellas: 3,
    img: "tuctuc.png",
    oferta: true,
  },
];

const addProduct = (product) => {
  emit('added', product)
};
</script>

<style scoped></style>
