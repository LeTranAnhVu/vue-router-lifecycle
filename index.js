
var User = {
  props: ['user'],
  template: `
    <div class="card" style="width: 18rem;">
      <img class="card-img-top" :src="user.url" alt="Card image cap">
      <div class="card-body">
        <p class="card-text">{{user.title}}</p>
      </div>
    </div>
  `,
  mounted: function(){
    console.log('child-user is already mounted');
  }
}
var Home = {template: "<h1>Home page</h1>"}

var Users = {
  data: function() {
    return {
      users: [],
    }
  },
  components: {
    'component-user': User
  },
  template: `
   <section>
    <h1>User page</h1>
    <div class="row">
      <div class="col-md-4" v-for="item in users">
        <component-user :user="item"></component-user>
      </div>
    </div>
  </section>
  `,
  // life cycle hook
  created: function(){
    console.log('users created');
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        console.log('fetched data successfully', res.data);
        this.users = res.data;
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      console.log('parent users is mounted')
    })
  }
}


var routes = [
  {path: '', component: Home},
  {path: '/user', component: Users}
];

var app = new Vue({
  el: '#app',
  components: {
    Users
  },
  router: new VueRouter({
    routes,
  }),
  methods: {
    moveToUser: function(){
      this.$router.push('/user');
    }
  },
  mounted: function(){
    console.log('app is already mounted');
  }
})

