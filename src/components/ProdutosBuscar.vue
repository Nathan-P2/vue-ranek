<template>
  <div>
    <form>
      <input type="text" id="busca" name="busca" v-model="busca" />
      <input
        type="submit"
        id="lupa"
        value="Buscar"
        @click.prevent="buscarProdutos"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "ProdutosBuscar",
  data() {
    return {
      busca: ""
    };
  },
  methods: {
    buscarProdutos() {
      this.$router.push({ query: { q: this.busca } });
    }
  }
};
</script>

<style scoped></style>
