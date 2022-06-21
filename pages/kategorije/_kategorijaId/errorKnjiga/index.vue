<template>
  <div class="text-center mt-4">
    <h3 class="fontC mx-auto">
      Trenutno nema dodanih oglasa u kategoriji |{{
        $route.params.kategorijaId
      }}|
    </h3>

    <b-button to="/kategorije">Natrag na kategorije</b-button>
  </div>
</template>

<script>
export default {
  name: "errorKnjige",
};
</script>
