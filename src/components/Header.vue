<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Renek" />
      </router-link>
      <router-link v-if="login" to="/usuario" class="btn">
        {{ nome }}
      </router-link>
      <router-link v-else to="/login" class="btn">
        Vender / Login
      </router-link>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["login", "usuario"]),
    nome() {
      return this.usuario.nome.replace(/ .*/, "");
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.2);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
