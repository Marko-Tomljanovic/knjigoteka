<template>
  <b-container class="mt-3">
    <b-form @submit="onClick">
      <b-form-input
        id="naslov"
        v-model="naslov"
        type="text"
        placeholder="Unesi naslov"
        required
      ></b-form-input>

      <b-form-input
        id="cijena"
        type="number"
        v-model="cijena"
        placeholder="Unesi cijenu"
        required
      ></b-form-input>
      <b-form-select
        v-model="odabrano"
        :options="podaci.options"
      ></b-form-select>

      <b-button @click="onClick" type="submit" variant="primary"
        >Submit</b-button
      >
    </b-form></b-container
  >
</template>

<script>
import podaci from "@/store/podaci";
export default {
  name: "novaknjiga",
  data() {
    return { naslov: "", cijena: "", odabrano: "", obj: {}, podaci };
  },
  methods: {
    async onClick(e) {
      e.preventDefault();
      if (!this.naslov) {
        alert("potrebno upisati podatke");
      } else {
        const increment = this.$fireModule.firestore.FieldValue.increment(1);
        const ref = await this.$fire.firestore
          .collection("kategorije")
          .doc("podaci");
        const refKnjiga = await this.$fire.firestore
          .collection("kategorije")
          .doc(this.odabrano)
          .collection("knjige");
        ref.update({ ukKnjiga: increment });
        const { id } = await refKnjiga.add(this.obj);
        refKnjiga.doc(id).set({
          id: id,
          naslov: this.naslov,
          cijena: this.cijena,
        });
      }
    },
  },
  mounted() {},
};
</script>
