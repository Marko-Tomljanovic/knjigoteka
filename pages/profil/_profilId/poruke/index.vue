<template>
  <b-container>
    <b-row class="mt-4">
      <h3 class="fontC mx-auto">poruke |nepročitano: {{ ukPoruke }}|</h3></b-row
    >
    <div>
      <b-card no-body>
        <b-tabs pills card vertical nav-wrapper-class="w-90">
          <poruka
            v-for="(card, idx) in $store.state.poruke"
            :key="idx.ime"
            :ime="idx"
            :poruka="card"
          />
        </b-tabs>
      </b-card>
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  async asyncData({ store, app }) {
    try {
      const us = await app.$fire.firestore
        .collection("users")
        .doc(store.state.userData.uid)
        .get();
      const poruke = await app.$fire.firestore
        .collection("users")
        .doc(store.state.userData.uid)
        .collection("poruke")
        .doc("sve")
        .get();
      store.commit("setUserDataF", us.data());
      store.commit("setPoruke", poruke.data());
    } catch (e) {
      console.log(e);
    }
  },
  methods: {},
  computed: {
    ukPoruke() {
      return "0";
    },
  },
};
</script>
