const fileManagerState = $state({
   store: {
      tmpImagePath:null,
      email:'@',
      roles:[],

      isAuthenticated:false,
      isClient:false,
   }
});

export default fileManagerState;