<script>
import { createEventDispatcher, onMount } from 'svelte';
import Icon from '$lib/components/Icon.svelte';
import userState from '$lib/stores/user.svelte.js';
import TableModal from '$lib/components/TableModal.svelte';
import useFetch from '$lib/services/useFetch';
import { Toaster, toast } from 'svelte-sonner';
import { fade, fly,slide } from 'svelte/transition';
import { goto } from '$app/navigation';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import { DateInput } from 'date-picker-svelte'
import TimePicker from '$lib/components/TimePicker.svelte';

const API_URL = import.meta.env.VITE_API_URL || '';
const BASE_URL = import.meta.env.VITE_BASE_URL || '';


let showModal = $state(false);
let order = $derived(userState.user.order);
let bundleDetails = $state([]);
let processingOrder = $state(false);
let dishAddon= $state();
let selectedDish =$state();
let catFlag = $state();
let menu = $state();
let dishRef = $state();

let selectedDate=$state('A');
let selectedDuration= $state('A');
let selectedGuest= $state('A');
let selectedPeriod = $state('A');
let selectedTime=$state()

let requestedPeriod = $state()
let requestedDuration = $state()
let requestedGuest = $state()
let requestedDate = $state()


let username = $state();
let phone = $state();
let email = $state();

let datePick = new Date();

let startHour = $state()
let endHour = $state()
let customerFound = $state()


let dates=[{'text':'A', 'value':new Date()},
           {'text':'B', 'value':''},
           {'text':'C', 'value': ''}] 

let period=[{'text':'A', 'value':'BREAKFAST'},
           {'text':'B', 'value':'LUNCH' },
           {'text':'C', 'value':'BRUNCH'},
           {'text':'D', 'value':'DINNER'}]

let duration=[{'text':'A', 'value':30},
           {'text':'B', 'value':60 },
           {'text':'C', 'value':90},
           {'text':'D', 'value':120}]

let guests=[{'text':'A', 'value':2},
           {'text':'B', 'value':6 },
           {'text':'C', 'value':10},
         ]

let timeRange = $derived.by(()=>{
  let startHour
  let endHour
  if(selectedPeriod == 'A'){
    startHour = 9
    endHour= 11
  }
  if(selectedPeriod == 'B'){
    startHour = 11
    endHour= 14
  }
  if(selectedPeriod == 'C'){
    startHour = 14
    endHour= 17
  }
  if(selectedPeriod == 'D'){
    startHour = 17
    endHour= 19
  }
  return {'startHour':startHour,'endHour':endHour}
}) 


function getSelectedDate(){
  console.log('selectedGuest', selectedGuest)

  const date = new Date();
  if(selectedDate == 'C'){
     requestedDate = datePick
  }else if(selectedDate == 'B'){
    requestedDate = dayjs(date).add(1, 'day').$d
  }else{
     requestedDate = dates.find(el => el.text == selectedDate).value
  }
  requestedPeriod = period.find(el => el.text == selectedPeriod)

  requestedDuration = duration.find(el => el.text == selectedDuration)

  requestedGuest = guests.find(el => el.text == selectedGuest)


  if(!selectedTime){
    toast.error('Please Pick A Time')
    return 0
  }
  if(!selectedTime){
    toast.error('Please Pick A Time')
    return 0
  }
  if(!username){
    toast.error('Please Enter A Name')
    return 0
  }
  if(!phone){
    toast.error('Please Enter A Valid Phone Number')
    return 0
  }

  createReservation()
}



onMount(() => {

  const date = new Date();
 // console.log('date', date)
  //date.setMinutes(date.getMinutes() + 30); 
  //console.log('date + 30', date)
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
  let day = date.getDate().toString().padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  //console.log('currentDate', currentDate)
  //checkAvailability(currentDate, "19:30", 4, 90)
  //getWeeklyAvailability(currentDate,"19:30", 4, 90)
})

const formatDate = (date) => {
  // If date is a Date object
  if (date instanceof Date) {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }
  // If date is already string in YYYY-MM-DD
  return date;
};

// Helper function to format time to HH:MM
const formatTime = (time) => {
  if (time instanceof Date) {
    return time.toTimeString().slice(0, 5); // HH:MM
  }
  // Ensure 2-digit hour and minute
  const [hours, minutes] = time.split(':');
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};


async function checkAvailability(date, time, guestCount = 4, durationMinutes = 90){
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);
  
  const response = await fetch(`${BASE_URL}/table_reservations/check_availability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      reservationDate: formattedDate,  // "2024-12-25"
      startTime: formattedTime,        // "19:00"
      durationMinutes: durationMinutes,
      guestCount: guestCount
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to check availability');
  }
  const res = await response.json();
  console.log('res', res)
  return res
};


async function getDailyAvailability (date, time){
  const response = await fetch(`${BASE_URL}/table_reservations/daily_availability/`);
  const res = await response.json();
  console.log('res', res)
  return res;
};

async function getWeeklyAvailability (startDate,time){
  const availabilities = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + i);
    
    try {
      const data = await checkAvailability(date, time);
      availabilities.push(data);
    } catch (error) {
      console.error(`Failed for ${date}:`, error);
    }
  }
  console.log('availabilities', availabilities)
  return availabilities;
};

async function createReservation (){
  let data = {
    'customerName':username,
    'customerEmail':email,
    'customerPhone':phone,
    'reservationDate':requestedDate ,
    'guestCount':Number(requestedGuest.value),
    'startTime':selectedTime,
    'sittingPeriod':requestedPeriod.value.toLowerCase(),
    'durationMinutes':requestedDuration.value,
    'status':'pending'

  }
  console.log('data', data)
  //return 0

  const response = await fetch(`${API_URL}/table_reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const res = await response.json();
  console.log('res', res)
};

 let reservationTime = $state('14:30');
  
function handleTimeChange(time) {
  console.log('Time changed to:', time);
  // Use this time in your API call
}

async function searchCustomer(type){
  let term = username
  let ltype = 'name'
  
  if(type == 'phone'){
    ltype= 'telephone'
    term = phone
  }

  const response = await fetch(`${API_URL}/customers/?${ltype}=${term}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify(data)
  });
  const res = await response.json();
  customerFound = res
  console.log('res', res)
}

function assignCustomer(person){
  username = person.name
  phone = person.telephone
  email = person.email
}

</script>

<button class="btn btn-success btn-sm btn-soft btn-square rounded-sm" onclick="{()=>{showModal=true}}">
  <Icon name="add" class="w-8 h-8"/>
</button> 

<div class="relative ">
  
<TableModal  bind:showModal>
  <Toaster richColors position="top-center"/>
  <div class="modal-box card shadow-sm rounded-xl lg:w-2xl">
    <div class="card-body m-0 p-0 ">
      <div class="flex justify-between ">
      <h2 class="card-title lg:tracking-wider ">Reserve your table</h2>
      <button  class="btn btn-ghost btn-square" onclick="{()=>{showModal=false}}">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
      </button>
    </div>
    <div class="grid h-full overflow-auto w-full">
        <fieldset class="fieldset">
          <!-- <legend class="fieldset-legend">Please select</legend> -->

   <!--        <input type="text" class="input" placeholder="My awesome page" />
          <p class="label">You can edit page title later on from settings</p> -->
          <h2 class="text-lg mt-5 text-center">Date</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-1  mx-auto">
          <button class="btn {selectedDate== 'A' ? 'btn-success':' btn-soft' }"
            onclick="{()=>{selectedDate = 'A'}}" >
            {#if selectedDate== 'A'} <Icon name="check"/>{/if}
            today
          </button>
           <button class="btn {selectedDate== 'B' ? 'btn-success':'btn-soft' }"
           onclick="{()=>{selectedDate = 'B'}}">
           {#if selectedDate== 'B'} <Icon name="check"/>{/if}
            Tomorrow
          </button>
          <button class="btn {selectedDate== 'C' ? 'btn-success':'btn-soft' }"
          onclick="{()=>{selectedDate = 'C'}}">
          {#if selectedDate== 'C'} <Icon name="check"/>{/if}
            Other date
          </button>
        </div>
        {#if selectedDate== 'C'}
            <DateInput bind:value={datePick} format="yyyy-MM-dd"/>
            {/if}

         
         <h2 class="text-lg mt-5 text-center">Sitting Period</h2>
         <div class="grid grid-cols-2 md:grid-cols-4 gap-1 lg:max-w-4xl mx-auto">
          <button class="btn btn-sm text-xs {selectedPeriod== 'A' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{ selectedTime='', selectedPeriod = 'A'}}" >
          {#if selectedPeriod== 'A'} <Icon name="check"/>{/if}
            BREAKFAST
          </button>
          <button class="btn btn-sm text-xs {selectedPeriod== 'B' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedTime='', selectedPeriod = 'B' }}" >
          {#if selectedPeriod== 'B'} <Icon name="check"/>{/if}
            LAUNCH
          </button>
          <button class="btn btn-sm text-xs {selectedPeriod== 'C' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedTime='', selectedPeriod = 'C'}}" >
          {#if selectedPeriod== 'C'} <Icon name="check"/>{/if}
            BRUNCH
          </button>
          <button class="btn btn-sm text-xs {selectedPeriod== 'D' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedTime='', selectedPeriod = 'D'}}" >
          {#if selectedPeriod== 'D'} <Icon name="check"/>{/if}
           DINNER
          </button>
         </div>


        
         <h2 class="text-lg mt-5 text-center">Duration</h2>
         <div class="grid grid-cols-2 md:grid-cols-4 gap-1 lg:max-w-4xl mx-auto">
          <button class="btn  text-xs {selectedDuration== 'A' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedDuration = 'A'}}" >
          {#if selectedDuration== 'A'} <Icon name="check"/>{/if}
            30 minutes
          </button>
          <button class="btn  text-xs {selectedDuration== 'B' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedDuration = 'B'}}" >
          {#if selectedDuration== 'B'} <Icon name="check"/>{/if}
            1 Hour
          </button>
          <button class="btn  text-xs {selectedDuration== 'C' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedDuration = 'C'}}" >
          {#if selectedDuration== 'C'} <Icon name="check"/>{/if}
            90 Minutes
          </button>
          <button class="btn  text-xs {selectedDuration== 'D' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedDuration = 'D'}}" >
          {#if selectedDuration== 'D'} <Icon name="check"/>{/if}
           2 Hours
          </button>
         </div>

          <TimePicker 
            value={selectedTime}
            onChange={(time) => selectedTime = time}
            interval={30}
            startHour={timeRange.startHour}
            endHour={timeRange.endHour}
            label="Pick a time"
          />
        
          <h2 class="text-lg mt-5 text-center">Guests</h2>
         <div class="flex flex-wrap gap-1 mx-auto">
          <button class="btn text-xs {selectedGuest== 'A' ? 'btn-success':' btn-soft' }"
            onclick="{()=>{selectedGuest = 'A'}}">
            {#if selectedGuest== 'A'} <Icon name="check"/>{/if}
            2
          </button>
           <button class="btn text-xs {selectedGuest== 'B' ? 'btn-success':' btn-soft' }"
            onclick="{()=>{selectedGuest = 'B'}}">
            {#if selectedGuest== 'B'} <Icon name="check"/>{/if}
            4 to 6
          </button>
          <button class="btn text-xs {selectedGuest== 'C' ? 'btn-success':' btn-soft' }"
            onclick="{()=>{selectedGuest = 'C'}}">
            {#if selectedGuest== 'C'} <Icon name="check"/>{/if}
            6 to 10
          </button>
         </div>
          
        <div class="grid gap-2 mx-auto">
            <div class="join">
              <div>
                <div>
                  <input class="input join-item" placeholder="Name" bind:value={username}/>
                </div>
              </div>
              <button class="btn join-item" onclick="{()=>{searchCustomer('name'),  search_customer.showModal()}}">
                <Icon name="person"/>Search</button>
            </div>

            <div class="join">
              <div>
                <div>
                  <input class="input join-item" placeholder="Name" bind:value={phone}/>
                </div>
              </div>
              <button class="btn join-item" onclick="{()=>{searchCustomer('phone'),  search_customer.showModal()}}">
                <Icon name="call"/>Search</button>
            </div>
          <button class="btn btn-primary" onclick="{()=>{getSelectedDate()}}">
            Reserve
          </button>
        </div>
      </fieldset>
    </div>
  </div>
</div>
</TableModal>
</div>


<dialog id="search_customer" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Customer Search</h3>
  
    <ul>
      {#each customerFound as record}
        <li>
          <button class="btn btn-primary btn-sm btn-soft" onclick="{()=>{assignCustomer(record)}}">select</button> 
            {record.name} - {record.telephone} -  {record.email}
        </li>
      {/each}
    </ul>

    <div class="modal-action">
      
      <form method="dialog">
        
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
