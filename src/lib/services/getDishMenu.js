import useFetch from './useFetch.js'

const API_URL = import.meta.env.VITE_API_URL;

export default async function getDishMenu(type,menu){

	//-- get all the root menu dishes
	let menu1 = []
	let menu2 = []
	let name1 =[]
	let name2 =[]
	let names=[]
	return getall()

  async function getall(){
  	await getMainMenu()
		await getSubMenu()

		name1 = await menu1.map((item)=>item.name)
		name2 = await menu2.map((item)=>item.name)
		names = await name1.concat(name2)
		//console.log(names)
		return names
  }
	
	async function getMainMenu(){
	  const response = await useFetch('/'+type, 'GET',null, true);
	  menu1 = response
	}

	async function getSubMenu(){
  	const response = await useFetch('/sub_menus?parent='+menu, 'GET',null, true);
  	menu2 = response
	}
	
}