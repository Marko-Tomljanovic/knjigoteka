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
              placeholder="Ime i prezime*"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-user"></i>
            <b-form-input
              type="text"
              class="login__input"
              v-model="form.email"
              placeholder="Email*"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="password"
              class="login__input"
              v-model="form.password"
              placeholder="Lozinka*"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="password"
              class="login__input"
              v-model="form.repeatPasswrod"
              placeholder="Ponovljena lozinka*"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="tel"
              class="login__input"
              v-model="form.mobitel"
              placeholder="Mobitel*"
            ></b-form-input>
          </div>
          <div class="login__field">
            <i class="login__icon fas fa-lock"></i>
            <b-form-input
              type="text"
              class="login__input"
              v-model="form.mjesto"
              placeholder="Mjesto*"
            ></b-form-input>
          </div>
          <croppa
            v-model="form.myCroppa"
            :prevent-white-space="true"
            :width="150"
            :height="150"
            :quality="1"
            image-border-radius="77"
            :placeholder="'Odaberite sliku profila'"
            placeholder-color="#404042"
            :placeholder-font-size="14"
            canvas-color="transparent"
            :show-remove-button="true"
            remove-button-color="black"
            :remove-button-size="30"
            :show-loading="true"
            :loading-size="50"
            loading-color="#606060"
          >
          </croppa>
          <b-button class="button login__submit" type="submit">
            <span class="button__text">Registriraj se sada </span>
            <i class="button__icon fas fa-chevron-right"></i>
            <b-spinner
              v-if="buttonSpinnerUcitavanjeKorisnika"
              small
            ></b-spinner>
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
        myCroppa: {},
      },
      slikaProfilaURL: "",
      buttonSpinnerUcitavanjeKorisnika: false,
    };
  },

  methods: {
    async onSubmit(event) {
      event.preventDefault();
      if (this.praznoPolje) {
        this.buttonSpinnerUcitavanjeKorisnika = true;
        try {
          await this.uploadSlika();
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
                  slikaProfilaURL: this.slikaProfilaURL,
                  createdAt: user.user.multiFactor.user.metadata.createdAt,
                });
              this.$fire.firestore
                .collection("users")
                .doc(user.user._delegate.uid)
                .collection("poruke")
                .doc("sve")
                .set({})
                .then(() => {
                  this.buttonSpinnerUcitavanjeKorisnika = false;
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
    async uploadSlika() {
      this.form.myCroppa.generateBlob((blobData) => {
        let imgName =
          "oglasi/" +
          this.form.imePrezime +
          "/slikaProfila/" +
          Date.now() +
          ".png";
        this.$fire.storage
          .ref(imgName)
          .put(blobData)
          .then((result) => {
            result.ref.getDownloadURL().then((url) => {
              this.slikaProfilaURL = url;
            });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
  },
  computed: {
    praznoPolje() {
      if (
        this.form.imePrezime &&
        this.form.email &&
        this.form.password &&
        this.form.repeatPasswrod &&
        this.form.mobitel &&
        this.form.mjesto &&
        this.form.repeatPasswrod === this.form.password
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import "@/assets/css/formaPrijava";
.croppa-container {
  background-color: rgb(255, 255, 255);
  border: 1px solid grey;
  border-radius: 8px;
  transition: 0.5s ease-in-out;
  border-radius: 5rem;
}

.croppa-container:hover {
  opacity: 1;
  background-color: #d3d3d3;
  border: 1px solid #d3d3d3;
}
</style>
