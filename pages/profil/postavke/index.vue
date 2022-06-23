<template>
  <div>
    <b-form-checkbox
      id="checkbox-1"
      class="ml-2"
      v-model="status"
      name="checkbox-1"
    >
      Želim obavjesti na email + {{ status }}</b-form-checkbox
    ><br /><br />
    <b-button @click="ucitajPostavke">Pohrani</b-button> <br />
    {{ $store.state.userData }}
  </div>
</template>

<script>
export default {
  name: "postavke",
  data() {
    return { status: false };
  },
  methods: {
    async ucitajPostavke() {
      try {
        await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci")
          .update({
            users: this.$fireModule.firestore.FieldValue.arrayUnion({
              id: this.$store.state.userData.uid,
              email: this.$store.state.userData.email,
              emailObavijesti: this.status,
            }),
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
