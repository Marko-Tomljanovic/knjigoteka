<template>
  <div>
    <div>
      <nuxt-link
        style="text-decoration: none"
        :to="`/kategorije/${kategorija}/${id}`"
      >
        <b-img
          style="height: 10.2rem; width: 15.5rem; border-radius: 10%"
          class="mb-1 mr-2 ml-2"
          src="https://picsum.photos/600/300/?image=25"
          alt="knjiga"
        />
        <br />
        <p class="text-right kartica mr-2">{{ title }}</p>
      </nuxt-link>
    </div>
    <div
      v-if="$route.params.profilId && !$route.params.omiljeneId"
      class="text-center border mb-4"
    >
      <b-button
        :to="{
          path: `${$route.path}/uredi/${id}`,
          query: { kategorija: `${kategorija}` },
        }"
        class="mr-2"
        v-b-tooltip.hover
        title="uredi"
        variant="outline"
      >
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
  props: ["title", "id", "kategorija", "autor"],
  emits: ["ucitajEmit"],
  data() {
    return {};
  },
  methods: {
    async obrisati() {
      try {
        const ref = await this.$fire.firestore;
        //brisanje knjige iz kategorija
        ref
          .collection("kategorije")
          .doc(this.kategorija)
          .collection("knjige")
          .doc(this.id)
          .delete();
        //brisanje knjige iz kategorija
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
        //brisanje knjige kolekcije podaci
        ref
          .collection("kategorije")
          .doc("podaci")
          .update({
            knjige: this.$fireModule.firestore.FieldValue.arrayRemove({
              idKnjige: this.id,
              autor: this.autor,
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
