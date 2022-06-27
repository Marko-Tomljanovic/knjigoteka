<template>
  <b-card class="shadow mb-2">
    <b-row align-h="between">
      <b-col cols="5"
        ><b>{{ korisnik }}</b></b-col
      >
      <b-col cols="2"
        ><b-icon
          class="float-right mr-2"
          :icon="ocjena === 'true' ? 'hand-thumbs-up' : 'hand-thumbs-down'"
          scale="2"
        ></b-icon
      ></b-col>
    </b-row>
    <hr />
    <b-row class="mb-1 mt-1">
      <b-col>{{ komentar }}</b-col>
    </b-row>
    <b-row align-h="end">
      <b-col cols="7"
        ><span class="float-right">{{
          $moment(vrijeme).format("LLL")
        }}</span></b-col
      >
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: ["korisnik", "ocjena", "komentar", "vrijeme"],
};
</script>
