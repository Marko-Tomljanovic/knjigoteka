<template>
  <div>
    profil <br />
    {{ profil }}
  </div>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  data() {
    return { profil: "", podaci };
  },
  methods: {
    // async ucitaj() {
    //   let userDoc = await this.$fire.firestore
    //     .collection("kategorije")
    //     .doc("Povijest")
    //     .collection("knjige");
    //   userDoc
    //     .get()
    //     .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         let data = doc.data();
    //         this.knjige.push({
    //           naslov: data.naslov,
    //           cijena: data.cijena,
    //         });
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       // this.$router.push("errorPage");
    //     });
    // },
    async ucitaj() {
      try {
        let userDoc = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.$route.params.kategorija)
          .collection("knjige")
          .doc(this.$route.params.profil)
          .get();
        this.profil = userDoc.data();
        if (!this.profil) {
          this.$router.replace({ path: "/errorPage" });
        }
      } catch (e) {
        console.log(e);
        this.$router.replace({ path: "/errorPage" });
      }
    },
  },
  mounted() {
    this.ucitaj();
  },
};
</script>
