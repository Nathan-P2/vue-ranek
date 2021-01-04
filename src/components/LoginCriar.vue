<template>
  <section>
    <h2>Cadastre-se!</h2>
    <transition mode="out-in">
      <button v-if="!criar" @click="criar = true" class="btn criar">
        Criar Conta
      </button>
      <UsuarioForm v-else>
        <button class="btn" @click.prevent="criarUsuario">
          Cadastro
        </button>
      </UsuarioForm>
    </transition>
  </section>
</template>

<script>
import UsuarioForm from "@/components/UsuarioForm.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "LoginCriar",
  components: {
    UsuarioForm,
  },
  computed: {
    ...mapState(["usuario"]),
  },
  data() {
    return {
      criar: false,
    };
  },
  methods: {
    ...mapActions(["postUsuario"]),
    ...mapActions(["getUsuario"]),
    async criarUsuario() {
      await this.postUsuario(this.usuario).then(() => {
        this.getUsuario(this.usuario.email);
        this.$router.push({ name: "usuario" });
      });
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
