<template>
  <span>
    <b-button
      v-b-modal.modal-prevent-closing
      variant="outline-dark"
      v-b-tooltip.hover.v-primary
      title="uredi"
      ><b-icon icon="file-text" font-scale="1.3"></b-icon
    ></b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Napiši nešto o sebi"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label-for="text-input"
          invalid-feedback="Opis je obavezan"
        >
          <b-form-textarea
            id="text-input"
            placeholder="maksimalno 200 znakova"
            v-model="text"
            rows="3"
            maxlength="210"
            no-resize
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </span>
</template>

<script>
export default {
  emits: ["ucitajEmit"],
  data() {
    return {
      text: "",
    };
  },
  methods: {
    resetModal() {
      this.text = "";
      this.nameState = null;
    },

    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Push the name to submitted names
      const ref = this.$fire.firestore
        .collection("users")
        .doc(this.$store.state.userData.uid);
      ref
        .update({
          oMeni: this.text,
        })
        .then(() => {
          this.$emit("ucitajEmit");
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
