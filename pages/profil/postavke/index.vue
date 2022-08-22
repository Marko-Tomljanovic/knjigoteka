<template>
  <div>
    <b-form-checkbox
      id="checkbox-1"
      class="ml-2"
      v-model="status"
      name="checkbox-1"
    >
      Želim novosti na email + {{ status }}</b-form-checkbox
    >
    <b-form-checkbox
      id="checkbox-2"
      class="ml-2"
      v-model="status2"
      name="checkbox-2"
    >
      Želim obavjesti na email kada primim poruku +
      {{ status2 }}</b-form-checkbox
    >
    <b-form-checkbox
      id="checkbox-3"
      class="ml-2"
      v-model="status3"
      name="checkbox-3"
    >
      Želim obavjesti na email + {{ status3 }}</b-form-checkbox
    >
    Obrisati profil
    <b-button @click="brisanjeProfil" variant="danger">Obriši profil</b-button
    ><br /><br /><br />
    <b-button @click="ucitajPostavke">Pohrani</b-button> <br /><br />
    {{ $store.state.userData }}
  </div>
</template>

<script>
export default {
  name: "postavke",
  data() {
    return { status: false, status2: false, status3: false };
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
    async brisanjeProfil() {
      // delete user info in the database&auth
      const deleteRef = await this.$fire.firestore
        .collection("users")
        .doc(this.$store.state.userData.uid);
      deleteRef
        .delete()
        .then(() => {
          this.$fire.auth.currentUser.delete();
          deleteRef.collection("poruke").doc("sve").delete();
        })
        .catch((e) => {
          console.log("Neuspiješno brisanje auth(authentication), error:" + e);
        })
        .then(() => {
          this.$fire.auth.signOut().then(() => {
            location.reload();
          });
        })
        .catch((e) => {
          console.log("Odjava neuspješna, error:" + e);
        });
    },
  },
};
</script>
