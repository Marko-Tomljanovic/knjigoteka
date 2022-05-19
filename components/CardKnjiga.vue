<template>
  <div>
    <nuxt-link :to="`/kategorije/${kategorija}/${id}`">
      <b-card
        :title="title"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 12rem"
        class="mb-2"
      >
      </b-card
    ></nuxt-link>
    <div
      v-if="
        $store.state.userData.uid == $route.params.profilId &&
        !$route.params.omiljeneId
      "
      class="text-center mt-3"
    >
      <b-button class="mr-2" v-b-tooltip.hover title="uredi" variant="outline">
        <b-icon icon="pencil" variant="secondary" scale="1.6"></b-icon>
      </b-button>
      <b-button
        @click="obrisati"
        v-b-tooltip.hover.v-danger
        title="izbriši"
        variant="outline"
      >
        <b-icon icon="x-circle" variant="danger" scale="1.6"></b-icon>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "id", "kategorija"],
  emits: ["ucitajEmit"],
  data() {
    return {};
  },
  methods: {
    async obrisati() {
      try {
        const ref = await this.$fire.firestore;
        ref
          .collection("kategorije")
          .doc(this.kategorija)
          .collection("knjige")
          .doc(this.id)
          .delete();
        ref
          .collection("users")
          .doc(this.$store.state.userData.uid)
          .update({
            dodaneKnjige: this.$fireModule.firestore.FieldValue.arrayRemove({
              idKnjige: this.id,
              naslov: this.title,
              kategorija: this.kategorija,
            }),
          });
        ref
          .collection("kategorije")
          .doc("podaci")
          .update({
            knjige: this.$fireModule.firestore.FieldValue.arrayRemove({
              idKnjige: this.id,
              naslov: this.title,
              kategorija: this.kategorija,
            }),
          })
          .then(() => {
            this.$emit("ucitajEmit");
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
