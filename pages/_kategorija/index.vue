<template>
  <div>
    marko -- {{ kategorijeApi }}
    <div></div>
  </div>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  data() {
    return { kategorijeApi: [], podaci };
  },
  methods: {
    async ucitaj() {
      let userDoc = this.$fire.firestore.collection(
        this.$route.params.kategorija
      );
      userDoc
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            this.kategorijeApi.push({
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
    console.log(this.$route.params.kategorija);
  },
};
</script>
