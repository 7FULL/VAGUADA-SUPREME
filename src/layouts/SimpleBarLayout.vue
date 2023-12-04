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
          class="q-ma-sm invisible"
          outlined
          dark
          dense
          placeholder="Buscar ..."
          v-model="busqueda"
          style="padding-right: 33%"
          readonly
        >
          <template v-slot:append>
            <q-icon name="search" class="text-white" />
          </template>
        </q-input>

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
          style="width: 95%; margin-top: 124%"
        >
          <q-tooltip class="bg-red">Cerrar sesión</q-tooltip>
        </q-btn>
      </q-list>
    </q-drawer>

    <q-page-container style="padding-top: 56px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import login from "../components/LoginComponent.vue";
import { computed, ref } from "vue";
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
    title: "Historia",
    caption: "Conoce nuestra historia",
    icon: "history_edu",
    link: "/dms",
  },
  {
    title: "Donde estamos",
    caption: "¿Como llegar a nuestras tiendas?",
    icon: "map",
    link: "/map",
  },
  {
    title: "Ayuda",
    caption: "¿Necesitas ayuda?",
    icon: "help",
    link: "/streamings",
  },
];

const leftDrawerOpen = ref(false);

const rightDrawerOpen = ref(false);

const busqueda = ref("");

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
</script>
