<template>
  <div>
    <b-tab :title="ime" active
      ><b-card-text>{{ poruka }}</b-card-text></b-tab
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
