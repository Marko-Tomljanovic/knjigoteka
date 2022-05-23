<template>
  <div>
    <b-container class="text-center">
      <b-row style="margin-top: 6rem">
        <b-col><p class="fontI">Što mi se čita?</p></b-col>
      </b-row>
      <b-row> <Search :ucitaneKnjige="ucitaneKnjige" /></b-row>
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
      ucitaneKnjige: [],
    };
  },
  methods: {
    async ucitaj() {
      try {
        const ref = await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .get();
        this.ucitaneKnjige = ref.data().knjige;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    return this.ucitaj();
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
