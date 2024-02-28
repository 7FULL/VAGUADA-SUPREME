<template>
  <q-page>
    <h1 class="h1">VISITANOS</h1>
    <section>
      <div class="principal">
        <div class="imgTienda"><img class="imgP" src="../assets/img/tiendas.jpg" alt=""></div>
        <div class="cajaLocalidad">
          <h1 class="titulo1">¿DÓNDE ESTAMOS?</h1>
          <iframe class="mapa" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1727.9958937988895!2d-3.706909097227659!3d40.47976497949518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42299c3bb3ce99%3A0xcfe0b25e9d5a94d0!2sLEGO%C2%AE%20Certified%20Store%20Vaguada!5e0!3m2!1ses!2ses!4v1666860872731!5m2!1ses!2ses" width="400" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

          <div class="mg-auto wmd q-pt-md">
            <p>Estaciones mas cercanas:</p>
            <ul>
              <li>Estación de metro: Barrio del Pilar</li>
              <li>Estación de metro: Peñagrande</li>
              <li>Estación de metro: Herrera Oria</li>
            </ul>
          </div>
        </div>
        <div class="cjaRedes">
          <div>
            <h1 class="titulo1">NUESTRAS REDES</h1>
            <div class="twitter"><a href="https://twitter.com/LEGO_Group" target="_blank"><img class="icono" src="../assets/img/twitter.png" alt=""></a></div>
            <div class="insta"><a href="https://www.instagram.com/lego/?hl=es" target="_blank"><img class="icono" src="../assets/img/instagram.png" alt=""></a></div>
            <div class="youtube"><a href="https://www.youtube.com/c/LEGO" target="_blank"><img class="icono" src="../assets/img/youtube.png" alt=""></a></div>
          </div>

          <div class="cj">
            <h1 class="titulo5">NUESTRA TIENDA</h1>
            <div>
              <p>LEGO® Certified Store Vaguada</p>
              <p>Teléfono: 91 730 00 00</p>
              <p>Horario: 10:00 - 22:00</p>
            </div>
            <a href="mailto:lego@gmail.com">
              <span>
                <q-icon name="mail" size="2rem" />
              </span>
              <span>
                lego@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>

</script>


<style scoped>

.cj{
  background-color: #ffcf00;
  width: 100%;
  height: 100%;
  margin: 5% auto auto;
  margin-top: 30%;
  border-radius: 25px;
}

.h1{
  position: absolute;
  top: 5%;
  left: 35%;
  color: red;


  font-family: 'Pt Sans', serif;
}

.logo1{
  display: inline-block;
  margin-left: auto;
  width: 70px;
}
.menu{
  border: 1px solid rgba(255,207,0,255);

  background-color: rgba(255,207,0,255);
}
.nombre{
  display: block;
  width: 110px;
  margin-left: 130%;


}


/*
.logo2{
    display: inline-block;
    margin-right: 0%;
    width: 60px;
    text-align: right;
}
*/
.principal{
  margin: auto;
  width: 85%;
  height: 100%;
  margin-top: 5%;
  overflow: hidden;
  padding-bottom: 1px;
  padding-left: 5px;

}
.imgP{
  display: block;
  margin: auto;
  width: 100%;
  height: 60%;
}

.titulo5{
  margin-bottom: 0;
  padding-bottom: 0;
  height: 75px;
}

.titulo1, .titulo5{
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 200%;
}
.mapa{
  border: 1px solid black;
  display: block;
  margin: auto;
}
h2{
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
.cajaLocalidad{
  display: block;
  background-color: #ffcf00;
  width: 40%;
  margin-left: 5%;
  float: left;
  margin-top: 5%;
  margin-bottom: 5%;
  border-radius: 25px;
}
.icono{
  width: 60px;
}
.redes{
  list-style: none;
  text-align: justify;
  text-decoration: none;
}
.cjaRedes{
  display: block;
  background: rgba(255,207,0,255);
  width: 40%;
  float: right;
  margin-top: 5%;
  margin-right: 4%;
  text-align: center;
  height: 235px;
  padding-bottom: 1px;
  padding-left: 5px;
  border-radius: 25px;
}
.sidebar{
  font-family: Arial, Helvetica, sans-serif;
}
a{
  text-decoration: none;
  color: black;}
.insta{
  float: left;
  width: 30%;

}
.twitter{
  float: right;
  width: 30%;

}
.youtube{
  float: right;
  width: 30%;
  margin-right: 5%;
}

.insta img:hover{
  width: 50%;
  padding-bottom: 1px;
  padding-left: 5px;
  transition: widht padding-bottom padding-left 0.6s;
  transform: scale(1.1);
}
.twitter img:hover{
  width: 50%;
  transition: widht padding-bottom padding-left 0.6s;
  padding-bottom: 1px;
  padding-left: 5px;
  transform: scale(1.1);
}
.youtube img:hover{
  width: 50%;
  transition: widht padding-bottom padding-left 0.6s;
  padding-bottom: 1px;
  padding-left: 5px;
  transform: scale(1.1);
}
.youtube img{
  transition: 0.6s;
}
.twitter img{
  transition: 0.6s;
}
.insta img {
  transition: 0.6s;
}
</style>
