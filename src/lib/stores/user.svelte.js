const userState = $state({
   user: {
      name: '@',
      email:'@',
      roles:[],

      isAuthenticated:false,
      isClient:false,
   },

   selectedSubMenu:null
});

export default userState;
