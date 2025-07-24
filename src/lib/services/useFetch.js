const API_URL = import.meta.env.VITE_API_URL;
//console.log(API_URL)
export default async function useFetch(endpoint,method,data = null, useToken= false,form = false) {
    //console.log(JSON.stringify(data))
    const api = API_URL + endpoint
    try {

        let contentType = 'application/json';
        

        if(method.toUpperCase() == 'PATCH'){
            contentType ='application/merge-patch+json'
        }
        const token = localStorage.getItem('token')
        const headers = {};
        
        if(!form)
        {
            headers['Content-Type'] = contentType;
        }



        if (token && useToken )  headers['Authorization'] = `Bearer ${token}`;

        const options = {
            method,
            headers: headers
        }

        // const options = {
        //     method,
        //     headers: {
        //         'Content-Type': contentType,
        //         'Authorization': 'Bearer ' + localStorage.getItem('token')
        //     }
        // };

        // if (data && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        //     options.body = JSON.stringify(data);
        // }
        if (data && !form ) {
            options.body = JSON.stringify(data);
        }else if(data && form){
            options.body = data;
        }

        //console.log(options)

        const response = await fetch(api, options);
        if(response){
            return await response.json();
        }
        

        if (!response.ok) {

            // Try to get error details from response
            const errorData = await response.json().catch(() => null);
            if(errorData.status===422){
                throw new Error(errorData.description)
            }else if(errorData.status===500){
                throw new Error(errorData.detail)
            }
            else{
                throw new Error(errorData?.message || response.statusText);
            }
            
        }

        // Handle 204 No Content responses
        if (response.status && response.status === 204) {
            return null;
        }
        
        return await response.json();
    } catch (error) {
       // console.error('Fetch error:', error);
        //throw error;
    }
}



	// //let data = null;
	// let error = null;
	// let header = {};
	// let token =null;

	// if(needToken){
	// 	token = localStorage.getItem('token')
  //   header = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
  // }else{
  //   header = { 'Content-Type':'application/json'}
  // }

  // const requestOptions = {
  //   method: request,
  //   headers: header,
  //   body: requestBody ? JSON.stringify(requestBody) : undefined

  // };

  // try {
  //   const response = await fetch(url, requestOptions);
    
  //   // First check if response is OK (status 200-299)
  //   if (!response.ok) {
  //     // Try to parse error JSON, fallback to text if it fails
  //     let errorData;
  //     try {
  //       errorData = await response.json();
  //     } catch {
  //       errorData = await response.text();
  //     }
  //     throw new Error(errorData.message || errorData || `HTTP error! status: ${response.status}`);
  //   }

  //   // Parse successful response
  //   return await response.json();
    
	//   } catch (error) {
	//     console.error('Fetch error:', error);
	//     throw error; // Re-throw for the caller to handle
	//   }
	
