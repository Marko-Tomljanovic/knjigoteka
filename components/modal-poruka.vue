<template>
  <div>
    <!-- <b-button
      class="naviButton mx-auto mt-1"
      :disabled="lajkanox"
      v-b-modal.modal-prevent-closing
      >Ocijeni prodavača</b-button
    > -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      @show="resetModal"
      @hide="resetModal"
    >
      <template #modal-title>
        <b-icon class="mr-2" icon="chat-right-dots" scale="1.5"></b-icon>
        Poruku prima {{ $store.state.oglas.imePrezime }}
      </template>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          class="mt-2"
          label-for="text-input"
          invalid-feedback="Opis je obavezan"
          ><label for="textarea-small">Poruka</label>
          <b-form-textarea
            id="text-input"
            class="mt-1"
            placeholder="maksimalno 200 znakova"
            v-model="poruka"
            rows="3"
            maxlength="210"
            no-resize
          ></b-form-textarea>
        </b-form-group>
      </form>
      <template #modal-footer="{ cancel }">
        <b-button
          class="odustaniBtn"
          size="sm"
          variant="outline-dark"
          @click="cancel()"
        >
          Odustani
        </b-button>
        <b-button class="naviButton" size="sm" @click="handleOk">
          Pohrani<b-spinner
            v-if="showSpinner"
            small
            type="grow"
            class="ml-1"
          ></b-spinner>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poruka: "",
      showSpinner: false,
    };
  },
  methods: {
    resetModal() {
      this.poruka = "";
      this.showSpinner = false;
    },

    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();

      // Trigger submit handler
      if (this.poruka === "") {
        alert("treba popuniti");
      } else {
        this.showSpinner = true;
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.setPoruka()
        .then(() => {
          setTimeout(() => {
            this.$nextTick(() => {
              this.$bvModal.hide("modal-prevent-closing");
            });
          }, "700");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async setPoruka() {
      if (this.$store.state.userData) {
        try {
          const ref = await this.$fire.firestore
            .collection("users")
            .doc(this.$store.state.userData.uid)
            .collection("poruke")
            .doc("sve");
          const refK = await this.$fire.firestore
            .collection("users")
            .doc(this.$store.state.oglas.idKorisnika)
            .collection("poruke")
            .doc("sve");
          const marko = this.$fireModule.firestore.FieldValue;
          ref.update({
            [this.$store.state.oglas.imePrezime]: marko.arrayUnion({
              idKorisnika: this.$store.state.userData.uid,
              idPrimatelj: this.$store.state.oglas.idKorisnika,
              ime: this.$store.state.userDataF.imePrezime,
              imePrimatelja: this.$store.state.oglas.imePrezime,
              poruka: this.poruka,
              vrijeme: Date.now(),
            }),
          });
          refK.update({
            [this.$store.state.userDataF.imePrezime]: marko.arrayUnion({
              idKorisnika: this.$store.state.userData.uid,
              idPrimatelj: this.$store.state.oglas.idKorisnika,
              ime: this.$store.state.userDataF.imePrezime,
              imePrimatelja: this.$store.state.oglas.imePrezime,
              poruka: this.poruka,
              vrijeme: Date.now(),
            }),
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("Prijavi se za lajk!");
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.naviButton {
  height: 25px;
  background: rgb(0, 0, 0);
  border-color: rgb(0, 0, 0);
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.odustaniBtn {
  height: 25px;
  padding-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
