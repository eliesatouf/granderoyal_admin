<div in:fade class="mx-auto lg:grid  lg:grid-col flexflex-wrap justify-center bg-base-200 h-full">
    <div role="alert" class="alert alert-soft {mercureStatus.value !=2 ? ' alert-error':'alert-info' }">
        {mercureStatus.text}
    </div>
<!--     <div class="w-full justify-cnenter mx-auto">
        {#if notifications.length > 0}
            {#each notifications as notification}
                <div role="alert" class="alert alert-info alert-soft">
                    <Icon name="notifications" />
                    {#if notification.number}
                     {notification.number} - {dayjs(notification.total).format('MM/DD/YYYY')}
                     {:else if notification.guestCount}
                     Table #{notification.id} - { notification.customerName}
                     {/if}
                </div>
            {/each}
        {:else}
            <div class="alert">No notifications yet</div>
        {/if}
    </div> -->
    <div class="grid  mt-12">
    <h2 class="text-stone-500 text-center ">ORDERS</h2>
    <div class="grid grid-cols-3 md:grid-cols-4 gap-4 p-2 max-w-4xl mx-auto">

        <button class="btn ring ring-primary/10 h-full p-3" onclick="{()=>{selectedStatus= 'new',showOrders() }}">
            <div class="flex justify-between w-full items-center mx-2 text-primary">
                <div class="grid">
                   <div class="lg:text-lg font-bold ">NEW</div>
                   <div class="stat-value"> {newOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="electric_bolt" size="20" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-amber-700/10 h-full p-3" onclick="{()=>{selectedStatus= 'confirmed',showOrders() }}">
            <div class="flex justify-between w-full items-center mx-2 text-amber-700">
                <div class="grid">
                   <div class="text-xs lg:text-lg font-bold ">CONFIRMED</div>
                   <div class="stat-value"> {confirmedOrders.length} 
                    <Icon name="info" size="20" class=""/></div>
                </div>
            </div>
        </button>

        <button class="btn ring ring-info/10 h-full p-3" onclick="{()=>{selectedStatus='ready',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-info">
                <div class="grid">
                   <div class="lg:text-lg font-bold ">READY</div>
                   <div class="stat-value"> {readyOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="notification_important" size="20" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-warning/10 h-full p-3" onclick="{()=>{selectedStatus='served',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-warning">
                <div class="grid">
                   <div class="lg:text-lg font-bold ">SERVED</div>
                   <div class="stat-value"> {servedOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="room_service" size="20" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-success/10 h-full p-3" onclick="{()=>{selectedStatus='closed',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-success">
                <div class="grid">
                   <div class="lg:text-lg font-bold ">CLOSED</div>
                   <div class="stat-value"> {closedOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="done_all" size="20" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-stone-400/10 h-full p-3" onclick="{()=>{selectedStatus='canceled',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-stone-400">
                <div class="grid">
                   <div class="lg:text-lg font-bold ">CANCELED</div>
                   <div class="stat-value"> {canceledOrders.length} <Icon name="cancel" size="20" class=""/>
                </div></div>
                </div>
        </button>

        <button class="btn ring ring-error/10 h-full p-3" onclick="{()=>{selectedStatus='error',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-error">
                <div class="grid">
                   <div class="lg:text-lg font-bold ">ERROR</div>
                   <div class="stat-value"> {erroredOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="dangerous" size="20" class=""/>
                </div>
            </div>
        </button>
    </div>
    </div>

    <div class="grid mt-10">
    <h2 class="text-stone-500 text-center ">TABLE RESERVATIONS
        <TableReservation/>

        <div class="grid grid-cols-3 gap-4 p-2 max-w-4xl mx-auto">
            <button class="btn bg-secondary/10 ring ring-secondary/10 h-full p-3" onclick="{()=>{selectedStatus= 'pending',showReservations() }}">
                <div class="flex justify-between w-full items-center mx-2 text-secondary">
                    <div class="grid">
                       <div class="lg:text-lg font-bold ">Pending</div>
                       <div class="stat-value"> {pendingReservations?.length}</div>
                    </div>
                </div>
            </button>

             <button class="btn bg-success/10 ring ring-success/10 h-full p-3" onclick="{()=>{selectedStatus= 'confirmed',showReservations() }}">
                <div class="flex justify-between w-full items-center mx-2 text-success">
                    <div class="grid">
                       <div class="lg:text-lg font-bold ">Confirmed</div>
                       <div class="stat-value"> {confirmedReservations?.length}</div>
                    </div>
                </div>
            </button>

             <button class="btn bg-warning/10 ring ring-warning/10 h-full p-3" onclick="{()=>{selectedStatus= 'canceled',showReservations() }}">
                <div class="flex justify-between w-full items-center mx-2 text-warning">
                    <div class="grid">
                       <div class="lg:text-lg font-bold ">Canceled</div>
                       <div class="stat-value"> {canceledReservations?.length}</div>
                    </div>

                </div>
            </button>
        </div>
    </div>
</div>

<Modal bind:showModal>
  <div class="card rounded-xs absolute top-0 h-dvh  lg:w-120 bg-base-300 shadow-sm ">
    <div class="card-body  overflow-auto">
        <div class="flex flex-row justify-between">
        {#if showRecords == 'orders'}
            <h2 class="card-title">Orders {selectedStatus?.toUpperCase()}</h2> 
        {/if}
        {#if showRecords == 'reservations'}
            <h2 class="card-title">Table {selectedStatus?.toUpperCase()}</h2> 
            {/if}
      <button onclick={()=>showModal=false} class="btn btn-ghost btn-square">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </div>  
      <div>
        {#if showRecords == 'orders'}
        <ul class="list p-3">
            {#each selectedRecords as record}
                <li class="list-row">
                    <div class="text-4xl font-thin opacity-30 tabular-nums">{Math.trunc(record.subtotal)}</div>
                    <div class="list-col-grow">
                        <div>{getTimeFromDate(record.orderDate)}</div>
                        <div class="text-xs uppercase font-semibold opacity-60">{record.orderNumber}</div>
                    </div>  

                    <div class="">{record.orderItem.length}</div>
                </li>   

            {/each}
        </ul>
        {/if}

        {#if showRecords == 'reservations'}
        <ul class="list">
            {#each selectedRecords as record}
                <div class="flex flex-row justify-between">

                    <div class="flex flex-col  p-1">
                        <div class="text-xs text-center font-semibold opacity-60">{Math.trunc(record.guestCount)}</div>
                        <div class="text-xs uppercase font-semibold opacity-60">{record.customerName}</div>
                    </div>

                    <div class="flex  items-center gap-1"> 
                        <button class="btn btn-success btn-square btn-xs" onclick="{()=>{confirmReservation(record)}}">
                            <Icon name="check" size="15" />
                        </button>
                        <button class="btn btn-error btn-square btn-xs" onclick="{()=>{cancelReservation(record)}}">
                            X
                        </button>
                        <button class="btn btn-info btn-square btn-xs" onclick="{()=>{selectedReservation = record, my_modal_1.showModal()}}">
                         <Icon name="read_more" size="15"/>
                     </button>
                    </div>

                    <a href="tel:{record.customerPhone}" class="btn btn-link p-0 m-0 px-1 ">{record.customerPhone}</a> 
            
                    <div class="flex flex-col">
                        <div class="text-center">{record.sittingPeriod}</div>
                        <div class="p-0 m-0">{getTimeFromDate(record.createdAt)}</div>
                    </div>
                    
                </div>  
                <div class="divider"></div> 
            {/each}
        </ul>
        {/if}
      </div>  
    </div>
  </div>
</Modal>

<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
        <h3 class="text-lg font-bold">Table Reservation</h3>
        <p class="py-4">{selectedStatus?.toUpperCase()}</p>
        {#if selectedReservation}
        <ul>
            <li>Name: {selectedReservation.customerName}</li>
            <li>Phone: {selectedReservation.customerPhone}</li>
            <li>Email: {selectedReservation.customerEmail}</li>
            <li>Guests: {selectedReservation.guestCount}</li>
            <li>Date: {dayjs(selectedReservation.reservationDate).format('MM/DD/YYYY')}</li>
            <li>Time: {dayjs(selectedReservation.startTime  ).format('h:mm A')}</li>
            <li>Period: {selectedReservation.sittingPeriod}</li>
            <li>Duration: {selectedReservation.durationMinutes}</li>
            <li>Status: {selectedReservation.status}</li>   
            <li>Created At: {dayjs(selectedReservation.createdAt).format('MM/DD/YYYY')} - {dayjs(selectedReservation.createdAt).format('h:mm A')}</li>   
        </ul>
        {/if}
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
</dialog>

<dialog id="new_reservation" class="modal">
  <div class="modal-box">
        <h3 class="text-lg font-bold">Table Reservation</h3>
        <fieldset class="fieldset bg-lime-950/10 border-base-300 rounded-box border p-4">
          <legend class="fieldset-legend">New</legend>

          <label class="label">Name</label>
          <input type="text" class="input" placeholder="" />

          <label class="label">Phone</label>
          <input type="text" class="input" placeholder="" />

          <label class="label">Email</label>
          <input type="email" class="input" placeholder="" />

          <label class="label">Guest Count</label>
          <input type="number" class="input" placeholder="2" />

          <label class="label">Date</label>
           <!-- <DateInput bind:value={datePick} format="yyyy-MM-dd"/> -->
           <input type="date" class="input" value="{gettodaydate()}" />

          <label class="label">Time</label>
         <TimePicker 
            value={selectedTime}
            onChange={(time) => selectedTime = time}
            interval={30}
            startHour={timeRange.startHour}
            endHour={timeRange.endHour}
            label="Pick a time"
          />

          <h2 class="text-lg mt-5 text-center">Sitting Period</h2>
         <div class="grid grid-cols-2 md:grid-cols-4 gap-1 lg:max-w-4xl mx-auto">
          <button class="btn btn-sm text-xs {selectedPeriod== 'A' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{ selectedTime='', selectedPeriod = 'A'}}" >
          {#if selectedPeriod== 'A'} <Icon name="ios-check"/>{/if}
            BREAKFAST
          </button>
          <button class="btn btn-sm text-xs {selectedPeriod== 'B' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedTime='', selectedPeriod = 'B' }}" >
          {#if selectedPeriod== 'B'} <Icon name="ios-check"/>{/if}
            LAUNCH
          </button>
          <button class="btn btn-sm text-xs {selectedPeriod== 'C' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedTime='', selectedPeriod = 'C'}}" >
          {#if selectedPeriod== 'C'} <Icon name="ios-check"/>{/if}
            BRUNCH
          </button>
          <button class="btn btn-sm text-xs {selectedPeriod== 'D' ? 'btn-success':' btn-soft' }"
          onclick="{()=>{selectedTime='', selectedPeriod = 'D'}}" >
          {#if selectedPeriod== 'D'} <Icon name="ios-check"/>{/if}
           DINNER
          </button>
         </div>

          <label class="label">Duration</label>
          <input type="text" class="input" placeholder="Name" />
        </fieldset>

<!--         <p class="py-4">{selectedStatus?.toUpperCase()}</p>
        {#if selectedReservation}
        <ul>
            <li>Name: {selectedReservation.customerName}</li>
            <li>Phone: {selectedReservation.customerPhone}</li>
            <li>Email: {selectedReservation.customerEmail}</li>
            <li>Guests: {selectedReservation.guestCount}</li>
            <li>Date: {dayjs(selectedReservation.reservationDate).format('MM/DD/YYYY')}</li>
            <li>Time: {dayjs(selectedReservation.startTime  ).format('h:mm A')}</li>
            <li>Period: {selectedReservation.sittingPeriod}</li>
            <li>Duration: {selectedReservation.durationMinutes}</li>
            <li>Status: {selectedReservation.status}</li>   
            <li>Created At: {dayjs(selectedReservation.createdAt).format('MM/DD/YYYY')} - {dayjs(selectedReservation.createdAt).format('h:mm A')}</li>   
        </ul>
        {/if} -->
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </form>
        </div>
    </div>
</dialog>

<style>
:root {
    --date-picker-background: #f7f7f7;
    --date-picker-foreground: #0E390E;
}
</style>

<script>
    import { browser } from '$app/environment';
    import { fade } from 'svelte/transition';
    import useFetch from '$lib/services/useFetch.js'
    import Icon from '$lib/components/Icon.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import dayjs from 'dayjs';
    import { DateInput } from 'date-picker-svelte'
    import TimePicker from '$lib/components/TimePicker.svelte';
    import TableReservation from '$lib/components/TableReservation.svelte';

    
    let es = null;
    let notifications = $state([]);
    let orders = $state();
    let newOrders = $state([]);
    let confirmedOrders = $state([]);
    let readyOrders = $state([]);
    let servedOrders = $state([]);
    let closedOrders = $state([]);
    let canceledOrders = $state([]);
    let erroredOrders = $state([]);
    let showModal = $state(false)
    let selectedRecords = $state();
    let selectedStatus=$state();
    let reservations = $state([])
    let pendingReservations =$state()
    let confirmedReservations= $state()
    let canceledReservations = $state()
    let selectedReservations = $state();
    let selectedReStatus = $state()
    let showRecords = $state()
    let showDetails = $state(false)
    let selectedReservation = $state()
    let startHour = $state()
    let endHour = $state()
    let datePick = new Date();

    let selectedDate=$state('A');
    let selectedDuration= $state('A');
    let selectedGuest= $state('A');
    let selectedPeriod = $state('A');
    let selectedTime=$state()
    let mercureStatus = $state({
        text:'', value:0
    })


    let orderStatuses = [
        {'status':'new','class':'text-primary'},
        {'status':'confirmed','class':'text-success'},
        {'status':'ready','class':'text-warning'},
        {'status':'served','class':'text-info'},
        {'status':'closed','class':'text-secondary'},
        {'status':'canceled','class':'text-danger'},
        {'status':'error','class':'text-danger'}
    ];

    let period=[{'text':'A', 'value':'BREAKFAST'},
           {'text':'B', 'value':'LUNCH' },
           {'text':'C', 'value':'BRUNCH'},
           {'text':'D', 'value':'DINNER'}]

    let duration=[{'text':'A', 'value':30},
           {'text':'B', 'value':60 },
           {'text':'C', 'value':90},
           {'text':'D', 'value':120}]


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




    // const classnew = "text-primary"
    // const classconfirmed = "text-seconday"
    // const classready = "text-green-700"
    // const classserved= "text-info"
    // const classclosed= "text-success"
    // const classcanceled= "text-stone-400"
    // const classerror= "text-error"


    function getColor(stat){
        console.log('status', stat)
        const textclass = orderStatuses.find(el => el.status.toLowerCase() == stat.toLowerCase())
        console.log('textclass,', textclass.class)
    }

    function gettodaydate()
    {
        return  new Date().toISOString().split('T')[0];
    }

    
    $effect(() => {
        getTodayOrders()
        getTableReservation()
        if (!browser) return;
        
        console.log('Setting up Mercure connection...');
        mercureStatus.text = 'Setting up Mercure connection...'
        mercureStatus.value= 1
        
        // 1. Initial delay before connecting (optional)
        const initialDelay = setTimeout(() => {
            connectMercure();
        }, 1000); // Wait 1 second before first connection
        
        // 2. Cleanup function
        return () => {
            console.log('Cleaning up...');
            clearTimeout(initialDelay);
            if (es) {
                es.close();
                es = null;
            }
        };
    });

    
    function connectMercure() {
        if (es) {
            es.close();
        }
        const VITE_MERCURE = import.meta.env.VITE_MERCURE;
        if(!VITE_MERCURE){
            return 0
        }
        es = new EventSource(`${VITE_MERCURE}/.well-known/mercure?topic=/orders`);
        
        es.onopen = () => {
            console.log('✅ Mercure order connected');
            mercureStatus.text = '✅ Mercure order connected'
            mercureStatus.value= 2
        };
        
        es.onmessage = (e) => {
            console.log('message')
            getTodayOrders()
            try {
                const order = JSON.parse(e.data);
                console.log('order', order)

                localStorage.setItem('DayonNotifications', JSON.stringify(order));
            
                        notifications = [
                            {
                                id: order.id || order.id,
                                number: order.orderNumber || order.customerName,
                                total: order.grandTotal || order.reservationDate,
                                time: order.createdOn || order.createdAt
                            },
                            ...notifications.slice(0, 4)
                        ]
                    
                    console.log('notifications', notifications)
                    
                    // Play sound
                    console.log('\x07'); // ASCII bell character
    
                    // Or create a short beep with Web Audio
                    if (window.AudioContext) {
                        const ctx = new AudioContext();
                        const osc = ctx.createOscillator();
                        osc.connect(ctx.destination);
                        osc.start();
                        osc.stop(ctx.currentTime + 0.1);
                    }
                
            } catch (error) {
                console.log('Parse error:', error);
                mercureStatus.text = error
                mercureStatus.value= 3
            }
        };
        
        es.onerror = (error) => {
            console.log('Mercure error, reconnecting...');
            mercureStatus.text = 'Mercure error, reconnecting...'
            mercureStatus.value= 4

            
            // Close and reconnect after 2 seconds
            if (es) {
                es.close();
                es = null;
            }
            
            setTimeout(connectMercure, 2000);
        };
    }

    async function getTodayOrders(){
        const today = new Date().toISOString().split('T')[0];
        const response = await useFetch(`/orders/?createdOn[after]=${today}`, 'GET',null, true);
        orders = response
        if(orders){
            newOrders = orders.filter(el => el.orderStatus == 1)
            confirmedOrders = orders.filter(el => el.orderStatus == 2)
            readyOrders = orders.filter(el => el.orderStatus == 3)
            servedOrders = orders.filter(el => el.orderStatus == 4)
            closedOrders = orders.filter(el => el.orderStatus == 5)
            canceledOrders = orders.filter(el => el.orderStatus == 6)
            erroredOrders = orders.filter(el => el.orderStatus > 6)
           // console.log('newOrders', newOrders)
        }

        
    }

    function showOrders(){
        showRecords = 'orders'
        //console.log('selectedStatus', selectedStatus)
        switch (selectedStatus) {
            case 'new':
                selectedRecords = newOrders
                break;

            case 'confirmed':
                selectedRecords = confirmedOrders
                break;

            case 'ready':
                selectedRecords = readyOrders
                break;
            case 'served':
                selectedRecords = servedOrders
                break;
            case 'closed':
                selectedRecords = closedOrders
                break;
            case 'canceled':
                selectedRecords = canceledOrders
                break
            case 'error':
                selectedRecords = erroredOrders
                break
        }
        showModal =true
        //console.log(selectedRecords)
    }

    function showReservations(){
        showRecords = 'reservations'
        console.log('selectedStatus', selectedStatus)
        switch (selectedStatus) {
            case 'pending':
                selectedRecords = pendingReservations
                break;

            case 'confirmed':
                selectedRecords = confirmedReservations
                break;

            case 'canceled':
                selectedRecords = canceledReservations
                break;
        }
        showModal =true
       // console.log(selectedRecords)
    }

    function getTimeFromDate(orderdate){
        //console.log('orderdate', orderdate)
        const date = new Date(orderdate);
        const timeOnly = date.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          //second: '2-digit'
        });
        return timeOnly;
    }

    async function getTableReservation(){
       // console.log('getTableReservation')
        const today = new Date().toISOString().split('T')[0];
        const response = await useFetch(`/table_reservations/?createdAt[after]=${today}`, 'GET',null, true);
        reservations = response
        //console.log('reservations', reservations)
        if(reservations){
            pendingReservations = reservations.filter(el => el.status == 'pending')
            confirmedReservations = reservations.filter(el => el.status == 'confirmed')
            canceledReservations = reservations.filter(el => el.status == 'canceled')
        }

    }

    async function confirmReservation(record){
        record.status = 'confirmed'
        const response = await useFetch(`/table_reservations/${record.id}`, 'PATCH',record, true);
       // console.log('response', response)
        getTableReservation() 
    }

    async function cancelReservation(record){
        record.status = 'canceled'
        const response = await useFetch(`/table_reservations/${record.id}`, 'PATCH',record, true);
        getTableReservation() 
    }
</script>