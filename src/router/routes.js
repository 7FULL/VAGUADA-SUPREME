const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        name: "viewProfile",
        path: "/viewProfile",
        component: () => import("pages/ViewProfile.vue"),
      },
      {
        name: "passwordRecovery",
        path: "/recoveryPassword/:token",
        component: () => import("pages/PasswordRecovery.vue"),
      },
      {
        name: "donde",
        path: "/donde",
        component: () => import("pages/DondeEstamos.vue"),
      },
      //Para los 404
      {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
      },
    ],
  },
  {
    path: "/payment",
    component: () => import("layouts/SimpleBarLayout.vue"),
    children:[
      //Formulario de compra
      {
        name: "form",
        path: "",
        component: () => import("pages/FinalizarCompra.vue"),
      },
    ]
  }
];

export default routes;
