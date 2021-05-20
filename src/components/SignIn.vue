<template>
    <div class="row">
        <div class="card" style="width: 30em;margin:0 auto;">
            <div class="card-header text-white" style="background-color: #444CF7;">
                <h3 class="font-weight-bold" style="text-align:left">Login</h3>
            </div>
            <br>
            <!--Login Form -->
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
                        <!--Login button -->
                        <button class="btn btn-success btn-block full-width" @click="signIn">Login</button>
                        &nbsp;&nbsp;
                        <!--Register button -->
                        <router-link to="/signup">
                            <button type="button" class="btn btn-primary btn-block full-width"> Register</button>
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
        name: 'SignIn',
        data() {
            return {
                //v-model object
                formData: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            //signin function
            signIn() {
                console.log('Signin')
                firebase.auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
                    .then(user => {
                        if (this.formData.email == "admin@mail.com" && this.formData.password == "admin123") {
                            this.$router.replace('/productlistadmin')
                        } else {
                            this.$router.replace('/productlist')
                        }
                        console.log('Signin Completed')
                    })
                    .catch(error => {
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