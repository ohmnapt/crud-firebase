<template>
    <div class="container">
        <h2>Order History</h2> <br>
        <div class="row">
            <div class="col-lg-12">
                <!--Text Header -->
                <h2 class="float-left font-weight-bold">Orders History </h2>
                <div class="input-group">
                    <!--Search form and Button -->
                    <input type="text" class="form-control" placeholder="Search by Product ID" v-model="Temp">
                    <span class="input-group-btn">
                        &nbsp;&nbsp;<button class="btn btn-primary" type="button" @click="search">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            Search
                        </button>&nbsp;&nbsp;
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <!--Order Search List Output on Cards -->
            <div class="col-sm 6" v-for="(orders, key) in searchUsers" :key='key'>
                <div class="card" style="width: 18rem">
                    <img class="card-img-top" v-bind:src="orders.slipUrl" alt="Card image cap" width=200 />
                    <div class="card-body">
                        <h4 class="card-title font-weight-bold">Item ID: {{ orders.productID }}</h4>
                        <p class="card-text">First Name: {{orders.firstName}} </p>
                        <p class="card-text">Last Name: {{orders.lastName}} </p>
                        <p class="card-text">Duration: {{orders.duration}} </p>
                        <p class="card-text">Mobile No: {{orders.mobileNo}} </p>
                        <p class="card-text">Address: {{orders.address}} </p>
                    </div>
                </div>
            </div>
        </div>
        <!--close button -->
        <router-link to="/productlistadmin">
            <button class="btn btn-danger"><span class="fas fa-times"></span> Close</button>
        </router-link>
        &nbsp;&nbsp;
        <!--Logout button -->
        <button class="btn btn-default" @click="logout"><span class="fas fa-sign-out-alt"></span>
            Logout</button>
        <br>
    </div>


</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "OrderHistory",
        data() {
            //order object from database
            return {
                orders: null,
                order: {},
                Search: "",
                Temp: ""
            };
        },
        computed: {
            //search function
            searchUsers: function () {
                console.log("Searching " + this.Search)
                return Object.values(this.order).filter((user) => {
                    return user.productID.match(this.Search);
                });

            },

        },

        created() {
            //get order data from database
            console.log('Order List')
            firebase.database().ref("order").on("value", (snapshot) => {
                this.order = snapshot.val()
                console.log(snapshot.val())

            })

        },
        methods: {
            //logout function
            logout() {
                console.log('logout')
                firebase.auth().signOut()
                    .then(() => {
                        console.log("Logout")
                        this.$router.replace('/signin')
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            },
            //search function parse to SearchUsers
            search() {
                this.Search = this.Temp
                console.log("enter search " + this.Search);
            }
        },
    };
</script>


<style>
    .card {
        margin: 20px;
    }

    .col-lg-12 {
        margin-bottom: 80px;
    }
</style>