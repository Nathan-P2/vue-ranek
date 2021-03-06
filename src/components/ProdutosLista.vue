<template>
  <section class="produtos-container">
    <transition mode="out-in">
      <div v-if="produtos && produtos.length" class="produtos" key="produtos">
        <div class="produto" v-for="(produto, index) in produtos" :key="index">
          <router-link :to="{ name: 'produto', params: { id: produto.id } }">
            <img
              v-if="produto.fotos"
              :src="produto.fotos[0].src"
              alt="produto.fotos[0].titulo"
            />
            <p class="preco">{{ produto.preco | numeroPreco }}</p>
            <h2 class="titulo">{{ produto.nome }}</h2>
            <p>{{ produto.descricao }}</p>
          </router-link>
        </div>
        <ProdutosPaginar
          :produtosTotal="produtosTotal"
          :produtosPorPagina="produtosPorPagina"
        />
      </div>
      <div v-else-if="produtos && produtos.length === 0" key="sem-resultado">
        <p class="sem-resultado">
          Produto não encontrado!
        </p>
      </div>
      <PaginaCarregando v-else key="pagina-carregando" />
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import ProdutosPaginar from "@/components/ProdutosPaginar.vue";

export default {
  name: "ProdutosLista",
  components: {
    ProdutosPaginar
  },
  data() {
    return {
      produtos: {},
      produtosPorPagina: 9,
      produtosTotal: 0
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
      this.produtos = null;
      window.setTimeout(() => {
        axios.get("http://localhost:3000/" + this.url).then(response => {
          this.produtos = response.data;
          this.produtosTotal = Number(response.headers["x-total-count"]);
        });
      }, 1500);
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

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultado {
  margin-top: 40px;
  text-align: center;
}
</style>
