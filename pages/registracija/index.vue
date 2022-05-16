<template>
  <b-form @submit="onSubmit" class="container mt-5">
    <b-form-input
      class="mb-2"
      v-model="form.imePrezime"
      placeholder="ime i prezime"
    ></b-form-input>
    <b-form-input
      v-model="form.email"
      placeholder="Enter your email"
    ></b-form-input>
    <b-form-input
      class="mt-2"
      v-model="form.password"
      placeholder="Enter your password"
    ></b-form-input>
    <b-form-input
      class="mt-2"
      v-model="form.repeatPasswrod"
      placeholder="Repeat your password"
    ></b-form-input>
    <b-form-input
      class="mt-2"
      v-model="form.mobitel"
      placeholder="Mobitel"
    ></b-form-input>
    <b-form-input
      class="mt-2"
      v-model="form.mjesto"
      placeholder="Mjesto"
    ></b-form-input>

    <b-button class="mt-2" type="submit" variant="danger">Registriraj</b-button>
    <b-button @click="odjava" class="mt-2" type="button" variant="danger"
      >Odjava</b-button
    >
    <b-button to="/" class="mt-2" type="button" variant="danger"
      >Naslovna</b-button
    >{{ form.mobitel }}
  </b-form>
</template>

<script>
export default {
  head: {
    title: "Knjigoteka || Registracija",
  },
  name: "registracija",
  data() {
    return {
      form: {
        imePrezime: "",
        email: "",
        password: "",
        repeatPasswrod: "",
        mobitel: "",
        mjesto: "",
      },
    };
  },

  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.form.repeatPasswrod == this.form.password) {
        try {
          await this.$fire.auth
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then((user) => {
              this.$fire.firestore
                .collection("users")
                .doc(user.user._delegate.uid)
                .set({
                  id: user.user._delegate.uid,
                  imePrezime: this.form.imePrezime,
                  mobitel: this.form.mobitel,
                  mjesto: this.form.mjesto,
                });
            })
            .then(() => {
              this.$router.replace("/");
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Lozinke nisu iste!");
      }
    },

    odjava() {
      console.log("signOut");
      this.$fire.auth.signOut();
    },
  },
  mounted() {},
};
</script>
