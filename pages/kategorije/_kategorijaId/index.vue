<template>
  <b-container class="mt-3">
    <b-row class="mt-4 mb-4">
      <b-col></b-col>
      <b-col class="text-center" cols="6"
        ><h4 class="fontC">
          kategorija |{{ $route.params.kategorijaId }}|
        </h4></b-col
      >
      <b-col align-self="center" class="text-right"
        ><b-button to="/kategorije" class="buttonPovratak"
          ><b-icon icon="arrow90deg-left"></b-icon>&nbsp; POVRATAK
        </b-button></b-col
      >
    </b-row>
    <b-card-group>
      <CardKnjiga
        v-for="(card, idx) in $store.state.podKategorija"
        :key="idx.naslov"
        :title="card.naslov"
        :id="card.idKnjige"
        :autor="card.autor"
        :kategorija="card.kategorija"
        :imgURL="card.imgURL"
      /> </b-card-group
  ></b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  head() {
    return { title: "Kategorije | " + this.$route.params.kategorijaId };
  },
  data() {
    return { podaci };
  },
  async asyncData({ app, store, params, redirect, route }) {
    try {
      let userDoc = await app.$fire.firestore
        .collection("kategorije")
        .doc("podaci")
        .get();
      store.commit(
        "setPodKategorija",
        userDoc
          .data()
          .knjige.filter((item) => item.kategorija === params.kategorijaId)
      );
      if (store.state.podKategorija.length === 0) {
        redirect({ path: `${route.path}/errorKnjiga` });
      }
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style>
.buttonPovratak {
  height: 25px;
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  padding-bottom: 5px;
  display: inline-flex;
  align-items: center;
  font-family: "Inika", sans-serif;
}
</style>
