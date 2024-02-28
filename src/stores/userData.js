import { defineStore } from "pinia";

export const userDataStore = defineStore("userDataStore", () => {
  let logged = false;

  const userData = {
    profile: "src/assets/img/logoUserDefault.png",
    name: "",
    email: "",
    phone: "",
    emailVerified: "",
    description: "",
    streamKey: "",
  };

  const shopCar = [];

  const plusProduct = (product) => {
    let precio = product.precio / product.cantidad;

    product.cantidad++;

    product.precio += Number(precio);

    //Redondeamos el precio
    product.precio = Number(product.precio.toFixed(2));
  }

  const minusProduct = (product) => {
    //Calculamos el precio del producto
    let precio = product.precio / product.cantidad;

    product.cantidad--;

    product.precio -= precio;

    //Redondeamos el precio
    product.precio = product.precio.toFixed(2);
  }

  //Esto se utiliza para poder acceder a lo que el usuario esta buscando
  //en el buscador

  const search = {
    search: "",
  }

  const resetData = () => {
    userData.value.profile = "src/assets/img/logoUserDefault.png";
    userData.value.name = "";
    userData.value.email = "";
    userData.value.phone = "";
    userData.value.emailVerified = "";
    userData.value.description = "";
    userData.value.streamKey = "";
    logged = false;
  };

  return {
    logged,
    userData,
    resetData,
    shopCar,
    plusProduct,
    minusProduct,
    search,
  };
});
