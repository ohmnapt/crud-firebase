import { createRouter, createWebHistory } from 'vue-router'
import AddProduct from '../components/AddProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import UserOrder from '../components/UserOrder.vue'
import OrderHistory from '../components/OrderHistory.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ProductListAdmin from '../components/ProductListAdmin.vue'
import ProductListUser from '../components/ProductListUser.vue'
import RentProduct from '../components/RentProduct.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import firebase from 'firebase'

const routerHistory = createWebHistory()

//vue routes
const routes = [
    {
        path: '/',
        redirect: '/signin'
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/signin'
    },
    {
        path: '/addproduct',
        name: 'AddProduct',
        component: AddProduct,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/editproduct/:itemid',
        name: 'EditProduct',
        component: EditProduct,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/userorder',
        name: 'UserOrder',
        component: UserOrder,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/orderhistory',
        name: 'OrderHistory',
        component: OrderHistory,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/productdetails/:itemname',
        name: 'ProductDetails',
        component: ProductDetails,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/productlistadmin',
        name: 'ProductListAdmin',
        component: ProductListAdmin,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/productlist',
        name: 'ProductListUser',
        component: ProductListUser,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/rentproduct/:itemname',
        name: 'RentProduct',
        component: RentProduct,
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    }
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

//firebase auth
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      console.log("You are not authorized to access this area.");
      next('signin')
    } else if (!requiresAuth && currentUser) {
      console.log("You are authorized to access this area.");
      next('productlist')
    } else {
      next()
    }
  })

export default router