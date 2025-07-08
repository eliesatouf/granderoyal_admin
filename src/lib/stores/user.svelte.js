const userState = $state({
   user: {
      name: '@',
      email:'@',
      roles:[],

      isAuthenticated:false,
      isClient:false,
   }
});

export default userState;
