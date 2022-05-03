<template>
  <b-container class="mt-3">
    <b-form-input
      size="sm"
      class="mr-sm-2 mb-3"
      placeholder="Search"
      v-model="trazi"
      autocomplete="off"
    ></b-form-input
    ><b-card-group>
      <CardKategorija
        v-for="(card, idx) in filter"
        :key="idx.naslov"
        :title="card.naslov" /></b-card-group
  ></b-container>
</template>

<script>
import podaci from "@/store/podaci";
export default {
  data() {
    return { kategorijeApi: [], podaci, trazi: "" };
  },
  methods: {
    fire() {
      try {
        this.$fire.firestore.collection("marko").doc().set({
          ime: "novi",
          prezime: "doc",
        });
      } catch (e) {
        console.log(e);
      }
    },
    async ucitaj() {
      let userDoc = this.$fire.firestore.collection(`marko`);
      userDoc.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          this.kategorijeApi.push({
            ime: data.ime,
            prezime: data.prezime,
          });
        });
      });
    },
  },
  computed: {
    filter() {
      return this.podaci.kategorije.filter((card) =>
        card.naslov.toLowerCase().includes(this.trazi.toLowerCase())
      );
    },
  },

  // asyncData: {
  //   async ucitaj({ commit, state, rootState }, userId) {
  //     const ref = this.$fire.firestore.collection("marko").doc(userId);
  //     try {
  //       await ref.update({
  //         [`randomFoo.FooFoo`]: this.$fireModule.firestore.FieldValue.delete(),
  //       });
  //     } catch (e) {
  //       return Promise.reject(e);
  //     }
  //   },
  // },

  mounted() {
    this.ucitaj();
  },
};
</script>
