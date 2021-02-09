import axios from 'axios'//Axios é um cliente HTTP baseado em Promises para fazer requisições.
import Vue from 'vue'
import Vuex from 'vuex' //Vuex é um padrão de gerenciamento de estado + biblioteca,,Ele serve como um store centralizado para todos os componentes em uma aplicação, com regras garantindo que o estado só possa ser mutado de forma previsível

Vue.use(Vuex)//passando q vuex sera usado

export default new Vuex.Store({//esporta o store
    state: {//estado inicial da aplicação
        isMenuVisible: false, //visibilidade menu
        user: null //usuario inicial nulo
    },
    mutations: {//artenancia do estado do menu se esta visivel mantem se não esta mantem
        toggleMenu(state, isVisible) {//alternancia do menu
            if(!state.user) {//se 
                state.isMenuVisible = false
                return
            }

            if(isVisible === undefined) {//se visibilidade menu é indefinida
                state.isMenuVisible = !state.isMenuVisible //estado menu não visivel
            } else {
                state.isMenuVisible = isVisible //defini como menu visivel
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})