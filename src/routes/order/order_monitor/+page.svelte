<div in:fade class="grid grid-col lg:flex lg:flex-wrap justify-center ">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 p-2 max-w-4xl mx-auto">

        <button class="btn ring ring-primary/10 h-full p-3" onclick="{()=>{selectedStatus= 'new',showOrders() }}">
            <div class="flex justify-between w-full items-center mx-2 text-primary">
                <div class="grid">
                   <div class="text-lg font-bold ">NEW</div>
                   <div class="stat-value"> {newOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="electric_bolt" size="30" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-amber-700/10 h-full p-3" onclick="{()=>{selectedStatus= 'confirmed',showOrders() }}">
            <div class="flex justify-between w-full items-center mx-2 text-amber-700">
                <div class="grid">
                   <div class="text-lg font-bold ">CONFIRMED</div>
                   <div class="stat-value"> {confirmedOrders.length} 
                    <Icon name="info" size="30" class=""/></div>
                </div>
            </div>
        </button>

        <button class="btn ring ring-info/10 h-full p-3" onclick="{()=>{selectedStatus='ready',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-info">
                <div class="grid">
                   <div class="text-lg font-bold ">READY</div>
                   <div class="stat-value"> {readyOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="notification_important" size="30" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-warning/10 h-full p-3" onclick="{()=>{selectedStatus='served',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-warning">
                <div class="grid">
                   <div class="text-lg font-bold ">SERVED</div>
                   <div class="stat-value"> {servedOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="room_service" size="30" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-success/10 h-full p-3" onclick="{()=>{selectedStatus='closed',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-success">
                <div class="grid">
                   <div class="text-lg font-bold ">CLOSED</div>
                   <div class="stat-value"> {closedOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="done_all" size="30" class=""/>
                </div>
            </div>
        </button>

        <button class="btn ring ring-stone-400/10 h-full p-3" onclick="{()=>{selectedStatus='canceled',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-stone-400">
                <div class="grid">
                   <div class="text-lg font-bold ">CANCELED</div>
                   <div class="stat-value"> {canceledOrders.length} <Icon name="cancel" size="30" class=""/>
                </div></div>
                </div>
        </button>

        <button class="btn ring ring-error/10 h-full p-3" onclick="{()=>{selectedStatus='error',showOrders()}}">
            <div class="flex justify-between w-full items-center mx-2 text-error">
                <div class="grid">
                   <div class="text-lg font-bold ">ERROR</div>
                   <div class="stat-value"> {erroredOrders.length}</div>
                </div>
                <div class="">
                    <Icon name="dangerous" size="30" class=""/>
                </div>
            </div>
        </button>

</div>

    {#if notifications.length > 0}
        {#each notifications as notification}
            <div class="notification">
                Order #{notification.number} - ${notification.total}
            </div>
        {/each}
    {:else}
        <div>No notifications yet</div>
    {/if}

</div>

<Modal bind:showModal>
  <div class="card rounded-xs absolute top-0 h-dvh  lg:w-120 bg-base-300 shadow-sm ">
    <div class="card-body  overflow-auto">
      <div class="flex flex-row justify-between">
      <h2 class="card-title">Orders {selectedStatus?.toUpperCase()}</h2> 
      <button onclick={()=>showModal=false} class="btn btn-ghost btn-square">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
    </div>  
      <div>
        <ul class="list bg-base-100 p-3">
            {#each selectedRecords as record}
                <li>{record.orderNumber}</li>   
                <li>{record.subtotal}</li>
                <li>item count: {record.orderItem.length}</li>
            {/each}
        </ul>
      </div>  
    </div>
  </div>
</Modal>
<script>
    import { browser } from '$app/environment';
    import { fade } from 'svelte/transition';
    import useFetch from '$lib/services/useFetch'
    import Icon from '$lib/components/Icon.svelte';
    import Modal from '$lib/components/Modal.svelte';
    
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

    let orderStatuses = [
    {'status':'new','class':'text-primary'},
    {'status':'confirmed','class':'text-success'},
    {'status':'ready','class':'text-warning'},
    {'status':'served','class':'text-info'},
    {'status':'closed','class':'text-secondary'},
    {'status':'canceled','class':'text-danger'},
    {'status':'error','class':'text-danger'}
];

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

    
    $effect(() => {
        getTodayOrders()
        if (!browser) return;
        
        console.log('Setting up Mercure connection...');
        
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
        
        es = new EventSource('http://localhost:3000/.well-known/mercure?topic=/orders');
        
        es.onopen = () => {
            console.log('✅ Mercure connected');
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
                            id: order.id,
                            number: order.orderNumber,
                            total: order.grandTotal,
                            time: new Date().toLocaleTimeString()
                        },
                        ...notifications.slice(0, 4)
                    ];
                    
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
            }
        };
        
        es.onerror = (error) => {
            console.log('Mercure error, reconnecting...');
            
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

        newOrders = orders.filter(el => el.orderStatus == 1)
        confirmedOrders = orders.filter(el => el.orderStatus == 2)
        readyOrders = orders.filter(el => el.orderStatus == 3)
        servedOrders = orders.filter(el => el.orderStatus == 4)
        closedOrders = orders.filter(el => el.orderStatus == 5)
        canceledOrders = orders.filter(el => el.orderStatus == 6)
        erroredOrders = orders.filter(el => el.orderStatus > 6)
        console.log('newOrders', newOrders)
    }

    function showOrders(){
        console.log('selectedStatus', selectedStatus)
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
        console.log(selectedRecords)
        
    }
</script>