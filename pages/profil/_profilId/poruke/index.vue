<template>
  <b-container>
    <b-row class="mt-4">
      <h3 class="fontC mx-auto">poruke |nepročitano: {{ ukPoruke }}|</h3></b-row
    >
    <div>
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-90">
          <poruka
            v-for="(card, idx) in $store.state.userDataF.poruke.Luka"
            :key="idx.ime"
            :ime="card.ime"
            :poruka="card.poruka"
          />
        </b-tabs>
        <b-button @click="put">ucitaj</b-button>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      obj: [
        { ime: "markoss", poruka: "poruka jedan" },
        { ime: "filp", poruka: "poruka dva" },
        { ime: "martina", poruka: "poruka tri" },
      ],
    };
  },
  async asyncData({ store, app }) {
    try {
      const us = await app.$fire.firestore
        .collection("users")
        .doc(store.state.userData.uid)
        .get();
      store.commit("setUserDataF", us.data());
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async put() {
      try {
        await this.$fire.firestore
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .update({
            poruke: {
              Luka: this.$fireModule.firestore.FieldValue.arrayUnion({
                idKorisnika: "naci",
                ime: "markoss",
                poruka: "poruka jedan",
              }),
            },
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ukPoruke() {
      return "0";
    },
  },
};
</script>
