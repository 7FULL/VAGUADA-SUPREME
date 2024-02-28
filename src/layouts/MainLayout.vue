<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <RouterLink to="/">
            <img src="../assets/img/nombreLego.png" class="dp-block w12" />
          </RouterLink>
        </q-toolbar-title>

        <q-input
          class="q-ma-sm"
          outlined
          dark
          dense
          placeholder="Buscar ..."
          v-model="busqueda"
          style="padding-right: 33%"
          @keyup.enter="busquedaDone"
        >
          <template v-slot:append>
            <q-icon name="search" class="text-white" />
          </template>
        </q-input>

        <q-btn
          v-if="isLogged"
          dense
          flat
          round
          icon="fa-solid fa-basket-shopping"
          @click="toggleRightDrawer"
        >
          <transition
            v-if="transicion"
            appear
            enter-active-class="animated bounceIn"
          >
            <q-avatar
              v-if="productos.length > 0"
              class="absolute all-pointer-events"
              size="20px"
              name="info"
              color="red"
              style="top: 4%; left: 45%"
              >{{ productos.length }}
            </q-avatar>
          </transition>
          <transition
            v-if="!transicion"
            appear
            enter-active-class="animated bounceIn"
          >
            <q-avatar
              v-if="productos.length > 0"
              class="absolute all-pointer-events"
              size="20px"
              name="info"
              color="red"
              style="top: 4%; left: 45%"
              >{{ productos.length }}
            </q-avatar>
          </transition>
          <q-tooltip class="bg-green">Carrito de la compra</q-tooltip>
        </q-btn>

        <div class="avatar-container q-ml-lg">
          <div v-if="isLogged">
            <q-btn
              v-if="userStore.userData.profile != null"
              round
              @click="viewProfile"
            >
              <q-avatar>
                <img :src="userStore.userData.profile" alt="User Avatar 4" />
              </q-avatar>
              <q-tooltip class="bg-green">Ver perfil</q-tooltip>
            </q-btn>
            <q-btn v-else round @click="viewProfile">
              <q-avatar>
                <img
                  src="../assets/img/logoUserDefault.png"
                  alt="User Avatar2"
                />
              </q-avatar>
              <q-tooltip class="bg-green">Ver perfil</q-tooltip>
            </q-btn>
          </div>
          <div v-else>
            <q-btn
              color="primary"
              icon-right="login"
              label="Iniciar sesion"
              @click="openModal"
            />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer persistent v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header />
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-btn
          v-if="isLogged"
          color="primary"
          label="Cerrar sesión"
          icon-right="logout"
          @click="closeSession"
          class="q-ml-sm"
          style="width: 95%; margin-top: 162%"
        >
          <q-tooltip class="bg-red">Cerrar sesión</q-tooltip>
        </q-btn>
      </q-list>
    </q-drawer>

    <q-drawer persistent v-model="rightDrawerOpen" side="right" bordered>
      <p
        v-if="userStore.shopCar.length === 0"
        class="text-grey text-center q-pt-lg"
      >
        No hay nada en el carrito
      </p>

      <q-list v-else>
        <q-item-label header />
        <q-item
          v-for="product in products"
          :key="product.nombre"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="'/src/assets/img/productos/' + product.img" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bold">{{ product.nombre }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-bold">{{ product.precio }}€</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              color="red"
              icon="delete"
              @click="deleteProduct(product)"
              class="q-ma-sm"
            >
              <q-tooltip class="bg-red">Eliminar</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-bold">Total</span>
            </q-item-label>
            <q-item-label caption lines="1">
              <span class="text-weight-bold">{{ texto }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
        <RouterLink to="/payment">
          <q-item>
            <q-item-section>
              <q-btn
                color="warning"
                label="Finalizar compra"
                icon-right="shopping_cart"
                @click="finishPurchase"
                class="q-ma-sm text-black"
              >
                <q-tooltip class="bg-warning text-black"
                >Finalizar compra</q-tooltip
                >
              </q-btn>
            </q-item-section>
          </q-item>
        </RouterLink>
      </q-list>
    </q-drawer>

    <login
      :isOpen="modalOpen"
      @closeModal="closeModal"
      @logged="logged"
    ></login>

    <q-page-container style="padding-top: 14px">
      <router-view @added="added"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import login from "../components/LoginComponent.vue";
import {computed, ref, watch} from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { RouterLink, useRouter } from "vue-router";
import { userDataStore } from "stores/userData";


const userStore = userDataStore();

const router = useRouter();

const userData = userStore.userData;

const isLogged = ref(false);

const modalOpen = ref(false);

const dropdown = ref(false);

const dropdownLogin = ref(false);

const linksList = [
  {
    title: "Perfil",
    caption: "Configura tu perfil",
    icon: "person",
    link: "/viewProfile",
  },
  {
    title: "Productos",
    caption: "Página principal",
    icon: "storefront",
    link: "/",
  },
  {
    title: "Donde estamos",
    caption: "¿Como llegar a nuestras tiendas?",
    icon: "map",
    link: "/donde",
  },
];

const leftDrawerOpen = ref(false);

const rightDrawerOpen = ref(false);

const productos = ref(userStore.shopCar);

const products = computed(() => productos.value);

const busqueda = ref("");

const texto = ref("");

const transicion = ref(true);

//Para que se actualice el carrito de la compra
productos.value = userStore.shopCar;

const calcularTotal = () => {
  let aux = 0;

  // Calculamos el total del precio de los productos del carrito
  for (let i = 0; i < userStore.shopCar.length; i++) {
    aux += userStore.shopCar[i].precio;
  }

  texto.value = aux.toFixed(2) + "€";

  transicion.value = !transicion.value;
};

function added(product) {

    //Añadimos un atributo cantidad al producto
    product.cantidad = 1;

    //Parseamos el precio a number
    product.precio = Number(product.precio);

    //Añadimos el producto al carrito
    //Si el producto ya está en el carrito, añadimos 1 a la cantidad
    if (userStore.shopCar.includes(product)) {
      userStore.plusProduct(product);
    } else {
      userStore.shopCar.push(product);
    }

  calcularTotal();
}

const finishPurchase = () => {
  router.push({ name: "home" });
};

const deleteProduct = (product) => {
  const index = userStore.shopCar.indexOf(product);
  userStore.shopCar.splice(index, 1);

  calcularTotal();
};

const toggleRightDrawer = () => {
  if (leftDrawerOpen.value) {
    leftDrawerOpen.value = false;
  }

  calcularTotal();

  rightDrawerOpen.value = !rightDrawerOpen.value;
};

const toggleLeftDrawer = () => {
  if (rightDrawerOpen.value) {
    rightDrawerOpen.value = false;
  }
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

if (userStore.logged) {
  isLogged.value = true;
}

const emit = defineEmits("closeSession", "logged");

const openModal = () => {
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const closeSession = () => {
  userStore.logged = false;

  userStore.userData = {
    profile: "src/assets/img/logoUserDefault.png",
    name: "",
    email: "",
    phone: "",
    emailVerified: "",
    description: "",
  };

  isLogged.value = false;
  dropdownLogin.value = false;
  dropdown.value = false;

  if (localStorage.getItem("username") != null) {
    localStorage.removeItem("username");
  }

  router.push({ name: "home" });
  //emit('closeSession');
};

const logged = () => {
  isLogged.value = true;
  userData.value = userStore.userData;
  modalOpen.value = false;
};

const viewProfile = () => {
  router.push({ name: "viewProfile" });
  //emit("profile");
};



//Si cambia el valor de la busqueda se actualiza la store
watch(busqueda, () => {
  userStore.search.search = busqueda.value;
});


const busquedaDone = () => {
  //Editamos la busqueda en  la store
  //userStore.search.search = busqueda.value;
};
</script>
