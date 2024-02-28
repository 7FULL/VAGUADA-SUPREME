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

    <div class="flex-left flex mt-xs">
      <div class="q-mb-md q-ma-sm wsm">
        <!--
        <q-select
          v-model="filtro"
          :options="filtros"
          label="Categoria"
          class="mt-xs"
          dense
          filled
        />
        -->
      </div>
      <div class="q-mb-md q-ma-sm wmd q-mt-xl">
        Precio: {{ rangoPrecios.min }}€ - {{ rangoPrecios.max }}€
        <q-range
          v-model="rangoPrecios"
          :min="0"
          :max="2000"
          :step="4"
          label
          color="black"
        />
      </div>
      <div>
        <q-btn
          color="warning"
          label="Filtrar"
          class="text-weight-bold text-black q-ml-xl q-mt-xl"
          @click="filterProducts()"
        />
      </div>
    </div>


    <div class="pt-xs pl-sm pr-sm grid" v-if="auxProducts.length > 0">
      <div v-for="product in auxProducts" :key="product.nombre" class="wlg mg-auto">
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
            <span class="text-weight-bold text-subtitle1 text-red line-trough q-mr-md" v-if="product.oferta">
              {{ product.precioOriginal }}€
            </span>
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
    <h4 v-else class="text-center text-bold">No hay productos que cumplan tus filtros</h4>
  </q-page>
</template>

<script setup>
import {ref, watch} from "vue";
import { userDataStore } from "stores/userData";

const rangoPrecios = ref({
  min: 0,
  max: 2000,
});

const filtros = ref([{ label: "Todos", value: "todos" }
, { label: "Ofertas", value: "ofertas" },]);

const filtro = ref("todos");

const busquedaF = ref("");

const userStore = userDataStore();

//Si cambia la busqueda de la store, cambiamos la busqueda del filtro
watch(() => userStore.search.search, (newValue) => {
  busquedaF.value = newValue;
  filterProducts()
});

const emit = defineEmits(['added', 'removed'])

const slide = ref(1);
const autoplay = ref(true);

const products = [
  {
    nombre: "Futbolin",
    precio: 50.99,
    precioOriginal: 59.99,
    estrellas: 5,
    img: "futbolin.png",
    oferta: true,
  },
  {
    nombre: "Kai",
    precio: 31.99,
    precioOriginal: 39.99,
    estrellas: 5,
    img: "kay.png",
    oferta: true,
  },
  {
    nombre: "Hedwig",
    precio: 29.99,
    precioOriginal: 39.99,
    estrellas: 5,
    img: "hedwigh.png",
    oferta: true,
  },
  {
    nombre: "Ajedrez",
    precio: 35.99,
    precioOriginal: 39.99,
    estrellas: 3,
    img: "ajedrez.png",
    oferta: true,
  },
  {
    nombre: "Papá Noel",
    precio: 32.99,
    precioOriginal: 49.99,
    estrellas: 4,
    img: "noel.png",
    oferta: true,
  },
  {
    nombre: "Bugatti",
    precio: 349.99,
    precioOriginal: 399.99,
    estrellas: 5,
    img: "chiron.png",
    oferta: true,
  },
  {
    nombre: "Piano",
    precio: 399.99,
    precioOriginal: 499.99,
    estrellas: 2,
    img: "piano.png",
    oferta: true,
  },
  {
    nombre: "Gatos",
    precio: 14.99,
    precioOriginal: 19.99,
    estrellas: 5,
    img: "gatos.png",
    oferta: true,
  },
  {
    nombre: "Sunbird",
    precio: 12.99,
    precioOriginal: 19.99,
    estrellas: 4,
    img: "sunbird.png",
    oferta: true,
  },
  {
    nombre: "Lloyd",
    precio: 31.99,
    precioOriginal: 39.99,
    estrellas: 4,
    img: "lloid.png",
    oferta: true,
  },
  {
    nombre: "1001 Stickers",
    precio: 8.99,
    precioOriginal: 12.99,
    estrellas: 4,
    img: "stickers.png",
    oferta: true,
  },
  {
    nombre: "Coliseo",
    precio: 54.99,
    precioOriginal: 69.99,
    estrellas: 3,
    img: "coliseo.png",
    oferta: true,
  },
  {
    nombre: "Robot Inventor",
    precio: 359.99,
    precioOriginal: 399.99,
    estrellas: 3,
    img: "inventor.png",
    oferta: true,
  },
  {
    nombre: "Faro",
    precio: 159.99,
    precioOriginal: 199.99,
    estrellas: 3,
    img: "faro.png",
    oferta: true,
  },
  {
    nombre: "Tarta",
    precio: 15.99,
    precioOriginal: 19.99,
    estrellas: 3,
    img: "tarta.png",
    oferta: true,
  },
  {
    nombre: "Tuc-Tuc",
    precio: 15.99,
    precioOriginal: 19.99,
    estrellas: 3,
    img: "tuctuc.png",
    oferta: true,
  },
  {
    "nombre": "Chyp y Chop",
    "precio": 19.99,
    "estrellas": 5,
    "img": "ChipYChop.png",
    "oferta": false
  },
  {
    "nombre": "Correcaminos y Coyote",
    "precio": 19.99,
    "estrellas": 4,
    "img": "Coyote.png",
    "oferta": false
  },
  {
    "nombre": "Gru y Minions",
    "precio": 19.99,
    "estrellas": 5,
    "img": "Gruyminions.png",
    "oferta": false
  },
  {
    "nombre": "Pandas",
    "precio": 19.99,
    "estrellas": 3,
    "img": "Pandas.png",
    "oferta": false
  },
  {
    "nombre": "Bulldog Frances",
    "precio": 14.99,
    "estrellas": 5,
    "img": "Bulldog.png",
    "oferta": false
  },
  {
    "nombre": "Carpa Dorada",
    "precio": 14.99,
    "estrellas": 4,
    "img": "CarpaDorada.png",
    "oferta": false
  },
  {
    "nombre": "Goofy y Pluto",
    "precio": 14.99,
    "estrellas": 5,
    "img": "Goofy.png",
    "oferta": false
  },
  {
    "nombre": "Caniche",
    "precio": 14.99,
    "estrellas": 4,
    "img": "Caniche.png",
    "oferta": false
  },
  {
    "nombre": "Periquito",
    "precio": 14.99,
    "estrellas": 3,
    "img": "periquito.png",
    "oferta": false
  },
  {
    "nombre": "Buzz Lightyear",
    "precio": 9.99,
    "estrellas": 5,
    "img": "buzz.png",
    "oferta": false
  },
  {
    "nombre": "Trofeo",
    "precio": 12.99,
    "estrellas": 3,
    "img": "trofeo.png",
    "oferta": false
  },
  {
    "nombre": "Buggy",
    "precio": 9.99,
    "estrellas": 4,
    "img": "buggy.png",
    "oferta": false
  },
  {
    "nombre": "Belle, Kevin y Bob",
    "precio": 19.99,
    "estrellas": 4,
    "img": "BelleBottomKevinyBob.png",
    "oferta": false
  },
  {
    "nombre": "Establo y caballos",
    "precio": 14.99,
    "estrellas": 5,
    "img": "establo.png",
    "oferta": false
  },
  {
    "nombre": "Lanzadera espacial",
    "precio": 19.99,
    "estrellas": 5,
    "img": "lanzadera.png",
    "oferta": false
  },
  {
    "nombre": "Zorro",
    "precio": 19.99,
    "estrellas": 4,
    "img": "zorro.png",
    "oferta": false
  },
  {
    "nombre": "Jesko",
    "precio": 14.99,
    "estrellas": 5,
    "img": "jesko.png",
    "oferta": false
  },
  {
    "nombre": "Monster Track",
    "precio": 19.99,
    "estrellas": 5,
    "img": "monstertrack.png",
    "oferta": false
  },
  {
    "nombre": "Porta lápices",
    "precio": 14.99,
    "estrellas": 4,
    "img": "portalapices.png",
    "oferta": false
  },
  {
    "nombre": "Supermoto",
    "precio": 9.99,
    "estrellas": 5,
    "img": "supermoto.png",
    "oferta": false
  },
  {
    "nombre": "Acuario",
    "precio": 25.99,
    "estrellas": 5,
    "img": "acuario.png",
    "oferta": false
  },
  {
    "nombre": "Ataque",
    "precio": 33.99,
    "estrellas": 4,
    "img": "ataque.png",
    "oferta": false
  },
  {
    "nombre": "Barco",
    "precio": 21.99,
    "estrellas": 3,
    "img": "barco.png",
    "oferta": false
  },
  {
    "nombre": "Batmovil",
    "precio": 46.99,
    "estrellas": 4,
    "img": "batmovil.png",
    "oferta": false
  },
  {
    "nombre": "Bonsai",
    "precio": 38.99,
    "estrellas": 4,
    "img": "bonsai.png",
    "oferta": false
  },
  {
    "nombre": "Caza",
    "precio": 48.99,
    "estrellas": 5,
    "img": "caza.png",
    "oferta": false
  },
  {
    "nombre": "Ciudad",
    "precio": 25.99,
    "estrellas": 4,
    "img": "ciudad.png",
    "oferta": false
  },
  {
    "nombre": "Formulae",
    "precio": 26.99,
    "estrellas": 4,
    "img": "formulae.png",
    "oferta": false
  },
  {
    "nombre": "Frozen",
    "precio": 35.99,
    "estrellas": 4,
    "img": "frozen.png",
    "oferta": false
  },
  {
    "nombre": "Granja",
    "precio": 27.99,
    "estrellas": 4,
    "img": "granja.png",
    "oferta": false
  },
  {
    "nombre": "Grua",
    "precio": 34.99,
    "estrellas": 4,
    "img": "grua.png",
    "oferta": false
  },
  {
    "nombre": "Jeep",
    "precio": 43.99,
    "estrellas": 3,
    "img": "jeep.png",
    "oferta": false
  },
  {
    "nombre": "Londres",
    "precio": 21.99,
    "estrellas": 2,
    "img": "londres.png",
    "oferta": false
  },
  {
    "nombre": "Nave",
    "precio": 24.99,
    "estrellas": 3,
    "img": "nave.png",
    "oferta": false
  },
  {
    "nombre": "Paris",
    "precio": 27.99,
    "estrellas": 4,
    "img": "paris.png",
    "oferta": false
  },
  {
    "nombre": "Playa",
    "precio": 33.99,
    "estrellas": 3,
    "img": "playa.png",
    "oferta": false
  },
  {
    "nombre": "Tanque",
    "precio": 40.99,
    "estrellas": 1,
    "img": "tanque.png",
    "oferta": false
  },
  {
    "nombre": "Templo",
    "precio": 35.99,
    "estrellas": 4,
    "img": "templo.png",
    "oferta": false
  },
  {
    "nombre": "Tigre",
    "precio": 29.99,
    "estrellas": 5,
    "img": "tigre.png",
    "oferta": false
  },
  {
    "nombre": "ATARI 2600",
    "precio": 239.99,
    "estrellas": 5,
    "img": "atari2600.png",
    "oferta": false
  },
  {
    "nombre": "La Noche Estrellada",
    "precio": 169.99,
    "estrellas": 4,
    "img": "vanGoghLaNocheEstrellada.png",
    "oferta": false
  },
  {
    "nombre": "Transbordador",
    "precio": 199.99,
    "estrellas": 5,
    "img": "trasbordadorNASA.png",
    "oferta": false
  },
  {
    "nombre": "Montaña Rusa",
    "precio": 399.99,
    "estrellas": 3,
    "img": "montanaRusaconRizos.png",
    "oferta": false
  },
  {
    "nombre": "Torre Eiffel",
    "precio": 629.99,
    "estrellas": 4,
    "img": "torreEiffel.png",
    "oferta": false
  },
  {
    "nombre": "Titanic",
    "precio": 679.99,
    "estrellas": 4,
    "img": "titanic.png",
    "oferta": false
  },
  {
    "nombre": "Old Trafford MUD",
    "precio": 279.99,
    "estrellas": 5,
    "img": "oldTrafford.png",
    "oferta": false
  },
  {
    "nombre": "Piramide de Guiza",
    "precio": 139.99,
    "estrellas": 5,
    "img": "piramideGuiza.png",
    "oferta": false
  },
  {
    "nombre": "Expreso a Howarts",
    "precio": 499.99,
    "estrellas": 3,
    "img": "expresoDeHowarts.png",
    "oferta": false
  },
  {
    "nombre": "Delorian RAF",
    "precio": 199.99,
    "estrellas": 5,
    "img": "delorianRegresoAlFuturo.png",
    "oferta": false
  },
  {
    "nombre": "Coliseo Romano",
    "precio": 549.99,
    "estrellas": 3,
    "img": "coliseo.png",
    "oferta": false
  },
  {
    "nombre": "Castillo Howarts",
    "precio": 469.99,
    "estrellas": 5,
    "img": "castilloDeHowarts.png",
    "oferta": false
  },
  {
    "nombre": "Casa en el Árbol MC",
    "precio": 119.99,
    "estrellas": 5,
    "img": "casaDeArbolModerna.png",
    "oferta": false
  },
  {
    "nombre": "Castillo del León",
    "precio": 399.99,
    "estrellas": 4,
    "img": "castilloCaballerosLeon.png",
    "oferta": false
  },
  {
    "nombre": "Camaro Z28",
    "precio": 1699.99,
    "estrellas": 5,
    "img": "camaro.png",
    "oferta": false
  },
  {
    "nombre": "Bowser ",
    "precio": 269.99,
    "estrellas": 5,
    "img": "bowser.png",
    "oferta": false
  },
  {
    "nombre": "Batwing 1989",
    "precio": 199.99,
    "estrellas": 5,
    "img": "batwing1989.png",
    "oferta": false
  },
  {
    "nombre": "Barco Pirata",
    "precio": 129.99,
    "estrellas": 5,
    "img": "barcoPirata.png",
    "oferta": false
  },
  {
    "nombre": "Futbolin",
    "precio": 249.99,
    "estrellas": 5,
    "img": "futbolin.png",
    "oferta": false
  },
  {
    "nombre": "Faro Motorizado",
    "precio": 1499.99,
    "estrellas": 5,
    "img": "faroMotorizado.png",
    "oferta": false
  }
];

const auxProducts = ref(products);

const addProduct = (product) => {
  emit('added', product)
};

const filterProducts = () => {
  /*
  if (filtro.value === "todos") {
    auxProducts.value = products.filter(
      (product) =>
        product.precio >= rangoPrecios.value.min &&
        product.precio <= rangoPrecios.value.max
    );
  } else if (filtro.value === "ofertas") {
    auxProducts.value = products.filter(
      (product) =>
        product.precio >= rangoPrecios.value.min &&
        product.precio <= rangoPrecios.value.max &&
        product.oferta != null && product.oferta === true
    );
  }
  */

  //Vaciamos el array auxiliar
  auxProducts.value = [];

  auxProducts.value = products.filter(
    (product) =>
      product.precio >= rangoPrecios.value.min &&
      product.precio <= rangoPrecios.value.max
  );

  //Si el texto no está vacío, filtramos por el texto
  if (busquedaF.value !== "") {
    auxProducts.value = auxProducts.value.filter(
      (product) =>
        product.nombre.toLowerCase().includes(busquedaF.value.toLowerCase())
    );
  }
};
</script>

<style scoped></style>
