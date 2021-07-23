<template>
    <div class="row">
        <div class="card" style="width: 30em;margin:0 auto;">
            <div class="card-header text-white" style="background-color: #444CF7;">
                <h3 class="font-weight-bold" style="text-align:left">Register</h3>
            </div>
            <br>
            <!--signup Form -->
            <div class="form-col">
                    <div class="from-group col sm-6">
                        <label class="form-label float-left font-weight-bold">Email </label>
                         <input type="email" class="form-control" placeholder="email" v-model="formData.email">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div class="from-group col sm-6">
                        <label class="form-label float-left font-weight-bold">Password </label>
                         <input type="password" class="form-control" placeholder="password" v-model="formData.password">
                        <br>
                        <!--Signin button -->
                        <button class="btn btn-success btn-block full-width" @click="signUp">Submit</button>
                        &nbsp;&nbsp;
                        <!--Back button -->
                        <router-link to="/signin">
                            <button type="button" class="btn btn-danger btn-block full-width"> Back</button>
                        </router-link>
                    </div>
                    <br><br>
                </div>
        </div>
        </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'SignUp',
  data () {
    return {
      //v-model object
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    //signup function
    signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.formData.email,this.formData.password)
            .then(user => {
                this.$router.replace('/productlist')
            })
            .catch(error =>{
                alert(error.message)
            })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>