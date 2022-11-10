<template>
  <div class="container mt-5">
    <div class="screen">
      <div class="screen__content">
        <b-form @submit="onSubmit" class="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <b-form-input
              type="text"
              class="login__input"
              v-model="form.email"
              placeholder="Email"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="password"
              class="login__input"
              v-model="form.password"
              placeholder="Lozinka"
            ></b-form-input>
          </div>

          <b-button class="button login__submit" type="submit">
            <span class="button__text">Prijavi se sada</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </b-button>
        </b-form>
        <div class="social-login">
          <h3>prijava</h3>
          <div class="social-icons">
            <a href="#" class="social-login__icon fab fa-instagram"></a>
            <a href="#" class="social-login__icon fab fa-facebook"></a>
            <a href="#" class="social-login__icon fab fa-twitter"></a>
          </div>
        </div>
      </div>
      <div class="screen__background">
        <span
          class="screen__background__shape screen__background__shape4"
        ></span>
        <span
          class="screen__background__shape screen__background__shape3"
        ></span>
        <span
          class="screen__background__shape screen__background__shape2"
        ></span>
        <span
          class="screen__background__shape screen__background__shape1"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: "Knjigoteka | Prijava",
  },
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
        location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/css/formaPrijava";

.screen {
  height: 600px;
}
.screen__background__shape1 {
  height: 620px;
}
.login {
  padding-top: 150px;
}
</style>
