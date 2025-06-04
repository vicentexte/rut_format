<template>
    <label for=""> RUT:</label>
    <input v-model="rut" type="text">
    <button @click="validate" type="button">Actualizar</button>
    <p>{{ result }}</p>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
    const result = ref('Resultado')
    const rut = ref('')

    let validate = function(){
        axios.get(`http://localhost:3000/validate?rut=${rut.value}`)
        .then(response => {
            result.value = response.data.data;
        }).catch(error => {
  if (error.response) {
    console.error("Respuesta del servidor con error:", error.response.data);
  } else if (error.request) {
    console.error("No hubo respuesta del servidor:", error.request);
  } else {
    console.error("Error configurando la solicitud:", error.message);
  }
});
    }
</script>