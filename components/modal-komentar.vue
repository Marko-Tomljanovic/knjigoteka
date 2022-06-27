<template>
  <span
    v-b-tooltip.hover.v-primary
    :title="lajkanox ? 'Već ste ocijenili korniska' : ''"
  >
    <b-button
      class="naviButton mx-auto mt-1"
      :disabled="lajkanox"
      v-b-modal.modal-prevent-closing
      >Ocijeni prodavača</b-button
    >
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      @show="resetModal"
      @hide="resetModal"
    >
      <template #modal-title>
        <b-icon class="mr-1" icon="plus" scale="1.7"></b-icon>
        Novi komentar
      </template>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          class="text-center"
          label-for="text-input"
          invalid-feedback="Opis je obavezan"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            id="radio-group"
            v-model="oznaceno"
            label="Enter your name"
            :aria-describedby="ariaDescribedby"
            name="radio-sub-component"
            v-b-tooltip.hover
            title="Obavezno polje"
          >
            <b-form-radio value="true">
              <b-icon icon="hand-thumbs-up" scale="2"></b-icon
            ></b-form-radio>
            <b-form-radio value="false">
              <b-icon icon="hand-thumbs-down" scale="2"></b-icon
            ></b-form-radio>
          </b-form-radio-group>
          <b-form-textarea
            id="text-input"
            class="mt-4"
            placeholder="maksimalno 200 znakova"
            v-model="komentar"
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
        <b-button class="naviButton" size="sm" @click="handleOk"
          ><b-spinner v-if="showSpinner" small type="grow"></b-spinner> Pohrani
        </b-button>
      </template>
    </b-modal>
  </span>
</template>

<script>
export default {
  props: ["lajkanox"],
  emits: ["ucitajEmit"],
  data() {
    return {
      komentar: "",
      oznaceno: "",
      imePrezime: "",
      idKorisnika: "",
      showSpinner: false,
    };
  },
  methods: {
    resetModal() {
      this.komentar = "";
      this.nameState = null;
      this.showSpinner = false;
      this.oznaceno = "";
    },

    async userCompare() {
      try {
        await this.$fire.firestore
          .collection("users")
          .where("id", "==", this.$store.state.userData.uid)
          .get()
          .then((query) => {
            query.forEach((doc) => {
              this.imePrezime = doc.data().imePrezime;
              this.idKorisnika = doc.data().id;
            });
          });
      } catch (e) {
        console.log(e);
        // this.$router.replace({ path: "/errorPage" });
      }
    },

    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();

      // Trigger submit handler
      if (!this.oznaceno || this.komentar == "") {
        alert("treba popuniti");
      } else {
        this.showSpinner = true;
        this.handleSubmit();
      }
    },
    handleSubmit() {
      this.userCompare()
        .then(() => {
          this.lajk();
        })
        .catch((e) => {
          console.log(e);
        })
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
    async lajk() {
      if (this.$store.state.userData) {
        const ref = await this.$fire.firestore
          .collection("users")
          .doc(this.$route.params.idProdavaca);
        const marko = this.$fireModule.firestore.FieldValue;
        ref
          .update({
            komentari: marko.arrayUnion({
              lajk: this.oznaceno,
              komentar: this.komentar,
              imePrezime: this.imePrezime,
              idKorisnika: this.idKorisnika,
              vrijeme: Date.now(),
            }),
          })
          .then(() => {
            this.$emit("ucitajEmit");
          })
          .catch((e) => console.log(e));
      } else {
        alert("Prijavi se za lajk!");
      }
    },
  },
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
