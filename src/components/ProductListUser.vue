<template>
    <div class="container">
         <div class="headine">
             <!--Text Header -->
            <h1> <span class="badge badge-warning" style="font-size:70px"> Rent Store<br></span></h1>
             <br><br>
        </div>
        <div class="row">
            <!--Search Panel -->
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search by Product's Name" v-model="Temp">
                    <span class="input-group-btn">
                        &nbsp;&nbsp;<button class="btn btn-success" type="button" @click="search">
                            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            Search
                        </button>&nbsp;&nbsp;
                        <!--find order button -->
                        <router-link to="/userorder">
                            <button type="button" class="btn btn-warning">Find Orders</button>
                        </router-link>&nbsp;&nbsp;
                    </span>
                </div>

        </div>
        <div class="Topic">
            <h1> <br><span class="badge badge-info" >  Item For Rent</span><br></h1>
        </div>
        <div class="blob"></div>
        <div class="blob-2"></div>
        <div class="row">
            <!--Productlist present on cards -->
            <div class="col-sm 6" v-for="(products, key) in searchUsers" :key='key'>
                <div class="card" style="width: 18rem">
                    <img class="card-img-top" v-bind:src="products.imageUrl" alt="Card image cap" width="240" height="280"/>
                    <div class="card-body">
                        <h4 class="card-title font-weight-bold">{{ products.productName }} </h4>
                        <p class="card-text">Price/Week: {{products.priceperweek}} $</p>
                        <router-link
                            :to="{path: 'productdetails' , name: 'ProductDetails', params:{itemname: products.productName}}">
                            <button class="btn btn-primary">Details</button>
                        </router-link>
                        &nbsp;&nbsp;
                    </div>
                </div>
            </div>
        </div>
        <!--Logout button -->
        <button class="btn btn-default" @click="logout"><span class="fas fa-sign-out-alt"></span>
            Logout</button>
        <br>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "ProductListUser",
        data() {
            //product object
            return {
                products: null,
                product: {},
                Search: "",
                Temp: "",
                
            };
        },
        computed: {
            //serach query from keyword productname
            searchUsers: function () {
                console.log("Searching " + this.Search)
                return Object.values(this.product).filter((user) => {
                    return user.productName.match(this.Search);
                });

            },

        },

        created() {
            //get product database
            console.log('Product List')
            firebase.database().ref("product").on("value", (snapshot) => {
                this.product = snapshot.val()
                //this.keyid = Object.keys(snapshot.val())[0];
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
            //search function parse to searchUsers
            search() {
                this.Search = this.Temp
                console.log("enter search " + this.Search);
            }

        },
    };
</script>


<style>
    .card {
        margin-top: 10%;
    }

    .col-lg-12 {
        margin-bottom: 80px;
    }

    .Topic{
        margin: 0px;
        text-align: left;
    }

    .card:hover {

  transform: scale(1.025);
  transition: all 250ms ease-out;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.col-lg-12{
    margin-top: 20%;
}

.blob { 
  width: 400px;
  height: 400px;
  z-index: 0;
  margin-left: -315px;
  margin-top: -200px;
  position:absolute;
  background-size: cover;
  transition: all 2s ease-in-out;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8, %3Csvg width='100%25' height='100%25' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' %3E %3Cdefs%3E %3Cfilter id='grain' x='-50vw' y='-50vh' width='100vw' height='100vh'%3E %3CfeFlood flood-color='%23ffffff' result='neutral-gray' /%3E %3CfeTurbulence in='neutral-gray' type='fractalNoise' baseFrequency='2.5' numOctaves='100' stitchTiles='stitch' result='noise' /%3E %3CfeColorMatrix in='noise' type='saturate' values='0' result='destaturatedNoise' %3E%3C/feColorMatrix%3E %3CfeComponentTransfer in='desaturatedNoise' result='theNoise'%3E %3CfeFuncA type='table' tableValues='0 0 0.2 0'%3E%3C/feFuncA%3E %3C/feComponentTransfer%3E %3CfeBlend in='SourceGraphic' in2='theNoise' mode='soft-light' result='noisy-image' /%3E %3C/filter%3E %3CclipPath id='shape'%3E %3Cpath fill='currentColor' d='M850,635Q715,770,569.5,801.5Q424,833,272,758Q120,683,89.5,485.5Q59,288,242,229Q425,170,570,200.5Q715,231,850,365.5Q985,500,850,635Z'%3E%3C/path%3E %3C/clipPath%3E %3C/defs%3E %3Cg filter='url(%23grain)' clip-path='url(%23shape)'%3E %3Cpath fill='%23444CF7' d='M850,635Q715,770,569.5,801.5Q424,833,272,758Q120,683,89.5,485.5Q59,288,242,229Q425,170,570,200.5Q715,231,850,365.5Q985,500,850,635Z' /%3E %3C/g%3E %3C/svg%3E");
}

.blob-2 { 
  width: 100px;
  height: 100px;
  transition: all 250ms ease-out;
  margin-left: 1150px;
  margin-top: 500px;
  position:absolute;
  z-index: 0;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8, %3Csvg width='100%25' height='100%25' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' %3E %3Cdefs%3E %3Cfilter id='grain' x='-50vw' y='-50vh' width='100vw' height='100vh'%3E %3CfeFlood flood-color='%23ffffff' result='neutral-gray' /%3E %3CfeTurbulence in='neutral-gray' type='fractalNoise' baseFrequency='2.5' numOctaves='100' stitchTiles='stitch' result='noise' /%3E %3CfeColorMatrix in='noise' type='saturate' values='0' result='destaturatedNoise' %3E%3C/feColorMatrix%3E %3CfeComponentTransfer in='desaturatedNoise' result='theNoise'%3E %3CfeFuncA type='table' tableValues='0 0 0.2 0'%3E%3C/feFuncA%3E %3C/feComponentTransfer%3E %3CfeBlend in='SourceGraphic' in2='theNoise' mode='soft-light' result='noisy-image' /%3E %3C/filter%3E %3CclipPath id='shape'%3E %3Cpath fill='currentColor' d='M810.5,673.5Q847,847,673.5,783Q500,719,355,754.5Q210,790,110,645Q10,500,178,423Q346,346,423,203Q500,60,577.5,202.5Q655,345,714.5,422.5Q774,500,810.5,673.5Z'%3E%3C/path%3E %3C/clipPath%3E %3C/defs%3E %3Cg filter='url(%23grain)' clip-path='url(%23shape)'%3E %3Cpath fill='%23444cf7' d='M810.5,673.5Q847,847,673.5,783Q500,719,355,754.5Q210,790,110,645Q10,500,178,423Q346,346,423,203Q500,60,577.5,202.5Q655,345,714.5,422.5Q774,500,810.5,673.5Z' /%3E %3C/g%3E %3C/svg%3E");
}

.blob-2:hover{
    transform: rotate(45deg);
}


.blob:hover{
    transform: rotate(45deg);
}

.Topic{
    z-index: 2;
    position:relative;
    color: #011440;
}

.headine{
    margin-block-start : 12%;
}

</style>