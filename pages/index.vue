<template>
  <b-container fluid class="mt-3">
    stavitit search i sliku pozadine, dizajn <br /><b-button to="kategorije"
      >kategorije</b-button
    ></b-container
  >
</template>

<script>
import podaci from "@/store/podaci";
export default {
  data() {
    return { podaci };
  },
  methods: {},
  computed: {
    filter() {
      return this.podaci.kategorije.filter((card) =>
        card.naslov.toLowerCase().includes(this.podaci.trazi.toLowerCase())
      );
    },
  },
};
</script>
