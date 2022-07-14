<template>
  <div>
    <b-tab :title="ime" active
      ><b-card-text
        ><p v-for="(card, idx) in poruka" :key="idx">
          <span class="text-muted" style="font-size: 13px"
            >{{ card.ime }} - {{ $moment(card.vrijeme).format("LLL") }}</span
          >
          <br />{{ card.poruka }}
        </p></b-card-text
      ></b-tab
    >
  </div>
</template>

<script>
export default {
  name: "poruka",
  props: ["ime", "poruka"],
  data() {
    return {};
  },
};
</script>
