<template>
  <div class="container mt-4">
    <div class="screen">
      <div class="screen__content">
        <b-form @submit="onSubmit" class="login">
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <b-form-input
              type="text"
              class="login__input"
              v-model="form.imePrezime"
              placeholder="Ime i prezime"
            ></b-form-input>
          </div>
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
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="password"
              class="login__input"
              v-model="form.repeatPasswrod"
              placeholder="Ponovljena lozinka"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="tel"
              class="login__input"
              v-model="form.mobitel"
              placeholder="Mobitel"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="text"
              class="login__input"
              v-model="form.mjesto"
              placeholder="Mjesto"
            ></b-form-input>
          </div>
          <b-button class="button login__submit" type="submit">
            <span class="button__text">Registriraj se sada</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </b-button>
        </b-form>
        <div class="social-login">
          <h3>registracija</h3>
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
    title: "Knjigoteka | Registracija",
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
                  createdAt: user.user.multiFactor.user.metadata.createdAt,
                });
              this.$fire.firestore
                .collection("users")
                .doc(user.user._delegate.uid)
                .collection("poruke")
                .doc("sve")
                .set({})
                .then(() => {
                  location.reload();
                })
                .catch((e) => {
                  console.log(e);
                });
            })
            .catch((e) => {
              console.log(e);
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Lozinke nisu iste!");
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import "@/assets/css/formaPrijava";
</style>
