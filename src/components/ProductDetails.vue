<template>
<div class="blob"></div>
<div class="container">
    <h2 style="font-weight: bold;">Product's Detail</h2>
    <div class="container-1">
  <div class="row">
    <div class="col">
      <div class="centered">
        <!--Image Product -->
    <img v-bind:src="productdetail.imageUrl" alt="Avatar woman">
    <p>Category: {{productdetail.categories}}</p>
  </div>
    </div>
    <div class="col">
        <div class="detail">
          <!--Product Details -->
            <h2 style="font-weight: bold;">{{name}}</h2>
            <p>Category: {{productdetail.categories}}</p>
            <p style="font-weight: bold;">Price/Week: {{productdetail.priceperweek}} $</p>
            <p>Description: {{productdetail.discription}}</p>
            <router-link :to="{path: 'rentproduct' , name: 'RentProduct', params:{itemname: productdetail.productID}}">
            <button class="btn btn-success">Rent this item</button>
            </router-link>
            &nbsp;&nbsp;
            <router-link to="/productlist">
            <button class="btn btn-danger">Go Back</button>
            </router-link>
        </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'ProductDetails',
        data() {
            return {
                msg: '',
                productdetail: [],
            }
        },
        created() {
            //route param form product list
            this.name = this.$route.params.itemname
            console.log(this.name)
            //get product data form database query from productname
            firebase.database().ref("product").orderByChild("productName").equalTo(this.name).on("child_added",
                (snapshot) => {
                    this.productdetail = snapshot.val()
                    console.log(this.productdetail)
                })

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
        /* display: inline-block; */
        margin: 0 10px;
    }

    a {
        color: #ffffff;
    }

    p.citydetail {
        text-align: justify;
    }

    .split {
  height: 100%;
  width: 50%;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

/* Control the left side */
.left {
  left: 0;
  background-color: white;
    background-color: #ffffff;
background-image:  linear-gradient(#ebebeb 1px, transparent 1px), linear-gradient(to right, #ebebeb 1px, #ffffff 1px);
background-size: 20px 20px;
}

/* Control the right side */
.right {
  right: 0;
  background-color: white;
    background-color: #ffffff;
background-image:  linear-gradient(#ebebeb 1px, transparent 1px), linear-gradient(to right, #ebebeb 1px, #ffffff 1px);
background-size: 20px 20px;
}

/* If you want the content centered horizontally and vertically */
.centered {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.detail{
    position: relative;
    top:20%;
    left: 0%;
    text-align: left;
    padding-right: 20%;
}

/* Style the image inside the centered container, if needed */
.centered img {
  width: 400px;
  border-radius: 50%;
}

.blob { 
  width: 500px;
  height: 500px;
  padding-left: 30px;
  margin-top: 300px;
  position: absolute;
  z-index: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml;utf8, %3Csvg width='100%25' height='100%25' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg' %3E %3Cdefs%3E %3Cfilter id='grain' x='-50vw' y='-50vh' width='100vw' height='100vh'%3E %3CfeFlood flood-color='%23ffffff' result='neutral-gray' /%3E %3CfeTurbulence in='neutral-gray' type='fractalNoise' baseFrequency='2.5' numOctaves='100' stitchTiles='stitch' result='noise' /%3E %3CfeColorMatrix in='noise' type='saturate' values='0' result='destaturatedNoise' %3E%3C/feColorMatrix%3E %3CfeComponentTransfer in='desaturatedNoise' result='theNoise'%3E %3CfeFuncA type='table' tableValues='0 0 0.35 0'%3E%3C/feFuncA%3E %3C/feComponentTransfer%3E %3CfeBlend in='SourceGraphic' in2='theNoise' mode='soft-light' result='noisy-image' /%3E %3C/filter%3E %3CclipPath id='shape'%3E %3Cpath fill='currentColor' d='M757.5,644Q788,788,644,745Q500,702,410,691Q320,680,267.5,590Q215,500,225,367.5Q235,235,367.5,119Q500,3,603,148.5Q706,294,716.5,397Q727,500,757.5,644Z'%3E%3C/path%3E %3C/clipPath%3E %3C/defs%3E %3Cg filter='url(%23grain)' clip-path='url(%23shape)'%3E %3Cpath fill='%23444cf7' d='M757.5,644Q788,788,644,745Q500,702,410,691Q320,680,267.5,590Q215,500,225,367.5Q235,235,367.5,119Q500,3,603,148.5Q706,294,716.5,397Q727,500,757.5,644Z' /%3E %3C/g%3E %3C/svg%3E");
}


.btn-success{
    padding-left: 10%;
    padding-right: 10%;
}

.container{
    background-color: white;
    margin-top: 7%;
    padding-top: 60px;
    padding-bottom: 60px;
    z-index: 1;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>