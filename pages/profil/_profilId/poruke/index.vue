<template>
  <b-container>
    <b-row class="mt-4">
      <h3 class="fontC mx-auto">poruke |nepročitano: {{ ukPoruke }}|</h3></b-row
    >
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
      store.commit("setUserDataF", us.data());
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    ukPoruke() {
      return "0";
    },
  },
};
</script>
