<template>
  <div class="text-center mt-4">
    <h5 class="fontC">
      Trenutno nema dodanih oglasa u kategoriji |{{
        $route.params.kategorijaId
      }}|
    </h5>
    <b-button to="/kategorije">Natrag na kategorije</b-button>
  </div>
</template>

<script>
export default {
  name: "errorKnjige",
};
</script>
