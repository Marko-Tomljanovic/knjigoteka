<template>
  <div>
    <b-tab :title="ime" active
      ><b-card-text
        ><p
          v-for="(card, idx) in poruka"
          :key="idx"
          :class="
            card.ime === $store.state.userDataF.imePrezime
              ? 'colorPorukaJ'
              : 'colorPoruka'
          "
        >
          <span class="text-muted" style="font-size: 13px"
            >{{ card.ime }} - {{ $moment(card.vrijeme).format("LLL") }}</span
          >
          <br />{{ card.poruka }}
        </p>
      </b-card-text></b-tab
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

<style scoped>
.colorPoruka {
  background-color: rgb(243, 241, 241);
  border-radius: 5rem;
  margin-left: 1rem;
  padding: 0.8rem;
}
.colorPorukaJ {
  background-color: rgb(181, 219, 255);
  border-radius: 5rem;
  padding: 0.8rem;
}
</style>
