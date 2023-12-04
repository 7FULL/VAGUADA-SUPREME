<template>
  <q-page>
     <div class="mg-auto wxl text-center">
         <div class="q-pa-md">
             <q-card class="wsm q-mt-xl q-mb-lg-xl inline-block">
                 <q-card-section>
                     <q-list bordered separator>
                         <q-item>
                             <q-item-section>
                                 <q-item-label lines="1">
                                     <span class="text-weight-bold">Producto</span>
                                 </q-item-label>
                             </q-item-section>
                             <q-item-section>
                                 <q-item-label lines="1">
                                     <span class="text-weight-bold">Cantidad</span>
                                 </q-item-label>
                             </q-item-section>
                         </q-item>
                         <q-item v-for="product in products" :key="product.nombre">
                             <q-item-section class="row">
                                 <q-item>
                                     <q-item-label lines="1">
                                         <q-avatar>
                                             <img :src="'/src/assets/img/productos/' + product.img" />
                                         </q-avatar>
                                     </q-item-label>
                                     <q-item-section>
                                         <q-item-label lines="1">
                                             <span class="text-weight-bold">{{ product.nombre }}</span>
                                         </q-item-label>
                                         <q-item-label caption lines="1">
                                             <span class="text-weight-bold">{{ product.precio }}€</span>
                                         </q-item-label>
                                     </q-item-section>
                                 </q-item>
                             </q-item-section>
                             <q-item-section>
                                 <q-btn-group>
                                      <q-btn
                                              color="white"
                                              icon="remove"
                                              @click="minusProduct(product)"
                                              class="q-ma-sm text-black"
                                      >
                                      </q-btn>
                                     <p class="text-black mg-auto">{{ product.cantidad }}</p>
                                      <q-btn
                                              color="white"
                                              icon="add"
                                              @click="addProduct(product)"
                                              class="q-ma-sm text-black"
                                      >
                                      </q-btn>
                                 </q-btn-group>
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
                     </q-list>
                 </q-card-section>
             </q-card>
          </div>

         <q-card class="wsm q-mt-md inline-block mb-xs">
             <q-card-section class="pb-0">
                 <q-form @submit="submit">
                     <q-input
                             v-model="tarjeta"
                             label="Tarjeta de crédito"
                             lazy-rules
                             :rules="[val => !!val || 'Introduzca su tarjeta de crédito']"
                     />
                     <q-input
                             v-model="caducidad"
                             label="Caducidad"
                             lazy-rules
                             :rules="[val => !!val || 'Introduzca la caducidad de su tarjeta']"
                     />
                     <q-input
                             v-model="cvv"
                             label="CVV"
                             lazy-rules
                             :rules="[val => !!val || 'Introduzca el CVV de su tarjeta']"
                     />
                     <q-input
                             v-model="titular"
                             label="Titular"
                             lazy-rules
                             :rules="[val => !!val || 'Introduzca el titular de la tarjeta']"
                     />
                     <q-item>
                         <q-item-section>
                             <q-btn
                                     color="warning"
                                     label="Finalizar compra"
                                     icon-right="shopping_cart"
                                     class="q-ma-sm text-black"
                                     type="submit"
                             >
                                 <q-tooltip class="bg-warning text-black"
                                 >Finalizar compra</q-tooltip
                                 >
                             </q-btn>
                         </q-item-section>
                     </q-item>
                 </q-form>
             </q-card-section>

              <q-card-section class="pt-0">
                  <P>METODOS DE PAGO</P>
                  <q-img
                          src="../assets/img/paypal.png"
                          class="wsm"
                  />
              </q-card-section>
         </q-card>
     </div>
  </q-page>
</template>

<script setup>
import {computed, ref} from "vue";
import { userDataStore } from "../stores/userData.js";
import {RouterLink, useRouter} from "vue-router";
import {useQuasar} from "quasar";

const router = useRouter();

const userStore = userDataStore();

const email = ref("");
const tarjeta = ref("");
const caducidad = ref("");
const cvv = ref("");
const titular = ref("");

const productos = ref(userStore.shopCar);

const products = computed(() => productos.value);

const texto = computed(() => {
  let total = 0;
  products.value.forEach((product) => {
    total += Number(product.precio);
  });
  return total.toFixed(2) + "€";
});

const deleteProduct = (product) => {
  const index = userStore.shopCar.indexOf(product);
  userStore.shopCar.splice(index, 1);
};

const $q = useQuasar();

function showNotif(msg, color = "gray-4") {
    $q.notify({
        message: msg,
        color: color,
        position: "top",
        timeout: 1500,
        progress: true,
    });
}

const submit = () => {
  router.push("/");
  showNotif("Compra realizada con éxito", "green-4");
};

const addProduct = (product) => {
  userStore.plusProduct(product);
};

const minusProduct = (product) => {
  if (product.cantidad > 1) {
    userStore.minusProduct(product);
  }else{
    deleteProduct(product);
  }
};

</script>

<style scoped></style>
