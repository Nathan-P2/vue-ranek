<template>
  <section class="produtos-container">
    <div v-for="produto in produtos" :key="produto.id">
      <img
        v-if="produto.fotos"
        :src="produto.fotos[0].src"
        alt="produto.fotos[0].titulo"
      />
      <p class="preco">{{ produto.preco }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <p>{{ produto.descricao }}</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "ProdutosLista",
  data() {
    return {
      produtos: {},
      produtosPorPagina: 9
    };
  },
  computed: {
    url() {
      let key = null;
      let queryString = "";
      for (key in this.$route.query) {
        queryString += `&${key}=${this.$route.query[key]}`;
      }
      return `produto?_limit=${this.produtosPorPagina}${queryString}`;
    }
  },
  methods: {
    fetchProdutos() {
      axios.get("http://localhost:3000/" + this.url).then(response => {
        this.produtos = response.data;
      });
    }
  },
  watch: {
    url() {
      this.fetchProdutos();
    }
  },
  created() {
    this.fetchProdutos();
  }
};
</script>

<style lang="scss" scoped></style>
