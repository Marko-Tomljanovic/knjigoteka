<template>
  <b-container fluid="sm" class="mt-3" style="border-style: dotted">
    <b-row
      ><b-col md="6" class="mt-3 mx-auto"><h2>Prijava</h2></b-col></b-row
    >
    <b-row>
      <b-col md="6" class="mx-auto"
        ><b-form @submit="onSubmit" class="mt-2">
          <b-form-input v-model="form.email" placeholder="email"></b-form-input>
          <b-form-input
            class="mt-2"
            v-model="form.password"
            placeholder="lozinka"
          ></b-form-input>

          <b-button class="mt-2" type="submit" variant="danger"
            >Prijava</b-button
          >
        </b-form></b-col
      ></b-row
    >
  </b-container>
</template>

<script>
export default {
  name: "prijava",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();

      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.form.email,
          this.form.password
        );
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
