<template>
  <b-form @submit="onSubmit" class="container mt-5">
    <b-form-input
      v-model="form.email"
      placeholder="Enter your name"
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

    <b-button class="mt-2" type="submit" variant="danger">Button</b-button>
    <b-button @click="odjava" class="mt-2" type="button" variant="danger"
      >Odjava</b-button
    >
    <b-button to="/" class="mt-2" type="button" variant="danger"
      >Naslovna</b-button
    >
  </b-form>
</template>

<script>
export default {
  name: "registracija",
  data() {
    return {
      form: {
        email: "",
        password: "",
        repeatPasswrod: "",
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.form.repeatPasswrod == this.form.password) {
        try {
          await this.$fire.auth.createUserWithEmailAndPassword(
            this.form.email,
            this.form.password
          );
          alert("ulogiran si care!");
        } catch (e) {
          alert(e);
          console.log(e);
        }
      } else {
        alert("Lozinke nisu iste!");
      }
    },
    odjava() {
      console.log("signOut");
      // this.$fireAuth.signOut()
      this.$fire.auth.signOut();
    },
  },
};
</script>
