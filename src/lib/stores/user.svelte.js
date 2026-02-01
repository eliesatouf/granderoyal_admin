export const userState = $state({
   name: '',
   token:'',
   email:'',
   phone:'',
   userId:'',
   avatar:'',
   customerId:'',
   visitCount:0,
   
   user: {
      name:null,
      email:null,
      roles:[],
      isAuthenticated:false,
      isClient:false,
      orderPreview:[],
      order:{
         customer: "",
         addres:["kalibo"],
         orderStatus: "pending",
         orderChannel:"web",
         dishes:[],
         orderItem:[],
         itemCount:0,
         orderChannel:"1",
         orderStatus:"1",
         paymentMethod:"",
         bundle:""

      }
   },
   selectedSubMenu:null,
   requestedmenu:null,
   selectedDish:null,
   orderType:null,
});

export default userState;
