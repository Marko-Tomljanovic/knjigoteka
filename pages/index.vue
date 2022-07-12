<template>
  <div>
    <b-container class="text-center">
      <b-row style="margin-top: 6rem">
        <b-col><p class="fontI">Što mi se čita?</p></b-col>
      </b-row>
      <b-row> <Search :ucitaneKnjige="$store.state.podKategorija" /></b-row>
    </b-container>
  </div>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  layout: "naslovna",
  data() {
    return {
      podaci,
    };
  },
  async asyncData({ app, store }) {
    if (store.state.podKategorija.length === 0) {
      console.log("ucitano");
      try {
        let userDoc = await app.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .get();
        store.commit("setPodKategorija", userDoc.data().knjige);
      } catch (e) {
        console.log(e);
      }
    }
  },
};
</script>

<style scoped>
.fontI {
  font-family: "Inconsolata, sans-serif";
  font-size: 4rem;
  font-weight: 900;
  color: white;
}
</style>
