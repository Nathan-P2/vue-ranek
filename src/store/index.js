import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
  },
  actions: {
    getUsuario(context, payload) {
      return axios
        .get(`http://localhost:3000/usuario/${payload}`)
        .then((response) => {
          context.commit("UPDATE_USUARIO", response.data);
          context.commit("UPDATE_LOGIN", true);
        });
    },
    postUsuario(context, payload) {
      context.commit("UPDATE_USUARIO", { id: payload.email });
      return axios.post("http://localhost:3000/usuario", payload);
    },
  },
  modules: {},
});
