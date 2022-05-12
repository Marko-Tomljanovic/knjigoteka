<template>
  <b-container class="mt-3">
    <b-card-group>
      <CardKnjiga
        v-for="(card, idx) in knjige"
        :key="idx.naslov"
        :title="card.naslov"
        :id="card.id" /></b-card-group
  ></b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  data() {
    return { knjige: [], podaci };
  },
  methods: {
    async ucitaj() {
      let userDoc = await this.$fire.firestore
        .collection("kategorije")
        .doc(this.$route.params.kategorijaId)
        .collection("knjige");
      userDoc
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            this.knjige.push({
              id: data.id,
              naslov: data.naslov,
              cijena: data.cijena,
            });
          });
        })
        .catch((error) => {
          console.log(error);
          this.$router.push("errorPage");
        });
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>
