<template>
    <div style="background-color: rgba(0, 128, 0, 0.226)">
        <v-layout>
            <v-flex sm12 md12>
                <h1 style="color: red;">Pintura (componente específico)</h1>
            </v-flex>
        </v-layout>
        <!--AUTOR-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Autor</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.author"
                label="Autor"
                required
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--DATAÇÃO-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Datação</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.year"
                label="Ano"
                required
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--MATÉRIA-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Matéria</h2>
            </v-flex>
            <v-flex sm10 md6>
                <v-text-field
                v-model="auxMateria"
                label="Matéria"
                required
                solo
                v-on:keyup.enter="pinturas.materia.push(auxMateria); updateMaterias++"
                ></v-text-field>
            </v-flex>
            <v-flex md2><v-btn color="success" @click="pinturas.materia.push(auxMateria); updateMaterias++">+</v-btn></v-flex>
        </v-layout>
        <v-layout wrap :key="updateMaterias">
            <v-flex v-for="(materia, index) in pinturas.materia" v-bind:key="index">
                <v-btn color="info" @click="pinturas.materia.splice(index, 1)">{{materia}} X</v-btn>
            </v-flex>
        </v-layout>
        <!--SUPORTE-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Suporte</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.suporte"
                label="Suporte"
                required
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>
        <!--TECNICA-->
        <v-layout wrap>
            <v-flex md12>
                <h2>Técnica</h2>
            </v-flex>
            <v-flex sm12 md6>
                <v-text-field
                v-model="pinturas.tecnica"
                label="Técnica"
                required
                solo
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex>
                <v-btn color="info" @click="submit()">Editar</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Api
import api from '@/api/api'
// Stores
import Credentials from '@/assets/scripts/login.js'

export default {
    name: 'pinturasEdit',
    props: ['asset'],
    data() {
        return {
            pinturas: {
                author: null,
                year: null,
                materia: [],
                suporte: null,
                tecnica: null
            },
            auxMateria: null,
            updateMaterias: 0
        }
    },
    methods: {
        async submit() {
            await api().put('/assets/' + this.$route.params.id + '/pinturas/edit/' + Credentials.getToken(), {
                pinturas: this.pinturas
            })
        }
    },
    created() {
        this.pinturas = this.asset.pinturas
    }
}
</script>

<style scoped>
    
</style>

