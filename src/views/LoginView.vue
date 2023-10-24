<template>
  <div>
    <div class="login-page">
      <div id="login">
        <form class="row g-3 needs-validation" novalidate>
          <div class="col-md-12">
            <label for="validationCustomUsername" class="form-label"
              >Username</label
            >
            <div class="input-group has-validation">
              <input
                type="text"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
                autocomplete="off"
                v-model="form.login"
              />
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-md-12">
            <label for="validationCustomUsername" class="form-label"
              >Password</label
            >
            <div class="input-group has-validation">
              <input
                type="password"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
                v-model="form.password"
              />
              <div class="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Submit form</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue';
import api from '@/services/baseHttp.js'
import router from '@/router'

const FORM = {
    login: '',
    password: '',
}



const form = ref({ ...FORM })

async function user() {
 const formData = new FormData()
  formData.append('login', form.value.login)
  formData.append('password', form.value.password)
  api
    .post('auth/login', formData)
    .then((response) => {
      let status = response.status
      localStorage.setItem('token', response.data.token)
      if (status == 200) {
        router.push('/')
      }
    })
    .catch((error) => console.log(error))
}

</script>


