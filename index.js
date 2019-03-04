var User = {
  props: ['user'],
  template: `
    <div v-if="user" class="card" style="width: 18rem;">
      <img class="card-img-top" :src="user.url" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">{{user.title}}</p>
      </div>
    </div>
  `,
  mounted: function () {
    console.log('child-user is already mounted')
  },
}
var Home = {template: '<h1>Home page</h1>'}

var Users = {
  data: function () {
    return {
      users: null,
      isLoading: false,
    }
  },
  components: {
    'component-user': User,
  },
  template: `
   <section id="section-1">
    <h1>User page</h1>
    
    <div class="row" v-if="users">
      <div class="col-md-4" v-for="user in users">
        <component-user :user="user"></component-user>
      </div>
    </div>
    <div class="loading-spinner" v-if="isLoading">
       <i class="fas fa-spinner"></i>
    </div>
  </section>
  `,
  // life cycle hook
  created: function () {
    console.log('created')
    this.isLoading = true
    axios.get('https://jsonplaceholder.typicode.com/photos').then(res => {
      console.log('fetched data successfully', res.data)
      this.users = res.data
    })
  },
  mounted: function () {
    console.log('parent users is mounted')
  },
  updated: function () {
    this.$nextTick(function () {
      console.log('parent - updation complete - n')
      this.isLoading = false
    })
  },
}

var routes = [
  {path: '', component: Home},
  {path: '/user', component: Users},
]

var app = new Vue({
  el: '#app',
  components: {
    Users,
  },
  router: new VueRouter({
    routes,
  }),
  methods: {
    moveToUser: function () {
      this.$router.push('/user')
    },
  },
  mounted: function () {
    console.log('app is already mounted')
  },
  updated: function () {
    this.$nextTick(function () {
      console.log('app - updation complete')
    })
  },
})

