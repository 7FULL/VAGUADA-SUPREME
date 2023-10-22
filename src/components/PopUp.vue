<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" :persistent="persistent">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ msg }}
        </q-card-section>

        <q-card-section v-if="input">
          <q-input
            dense
            v-model="userInput"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-if="cancel"
            :label="cancelText ? cancelText : 'Ya lo hare mas tarde'"
            color="negative"
            outline
            v-close-popup
            @click="close"
          />
          <q-btn
            outline
            label="OK"
            color="primary"
            v-close-popup
            @click="close"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const emit = defineEmits(["closed"]);

// Los parametros son los siguientes:
// open: Boolean, // Si el dialogo esta abierto o no
// msg: String, // El mensaje que se muestra en el dialogo
// title: String, // El titulo del dialogo
// persistent: Boolean, // Si el dialogo se cierra al hacer click fuera de el
// cancel: Boolean, // Si el dialogo tiene un boton de cancelar
// cancelText: String, // El texto del boton de cancelar
// input: Boolean, // Si el dialogo tiene un input

// Los eventos son los siguientes:
// closed: String // El texto del input si es que tiene uno
// closed: undefined // Si no tiene input

const props = defineProps([
  "open",
  "msg",
  "title",
  "persistent",
  "cancel",
  "cancelText",
  "input",
]);

const userInput = ref("");

const isOpen = ref(false);

const close = () => {
  if (userInput.value) {
    emit("closed", userInput.value);
  } else {
    emit("closed");
  }

  isOpen.value = false;
  //Limpiamos el input
  userInput.value = "";
};

watch(
  () => props.open,
  (val) => {
    isOpen.value = val;
  }
);
</script>
