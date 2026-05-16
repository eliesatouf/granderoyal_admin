<div in:fade class="mx-auto lg:grid lg:grid-col flexflex-wrap justify-center bg-base-200 h-full">
    <div class="flex justify-center items-center gap-2">
    <!-- Sound enable button -->
        <div role="alert" class="alert alert-soft {mercureStatus.value != 2 ? 'alert-error' : 'alert-success'}">
            {mercureStatus.text}
        </div>
        <div class="flex justify-end px-4 pt-1">
            <button 
                class="btn btn-sm btn-soft {soundsEnabled ? 'btn-success' : 'btn-primary'}"
                onclick="{() => {enableSounds(), playNotificationSound()}}"
            >
                {soundsEnabled ? '🔔 Sounds ON' : '🔕 Click to Enable Sounds'}
            </button>
        </div>
    </div>

    <div class="grid mt-12">
        <h2 class="text-stone-500 text-center">ORDERS</h2>
        <div class="grid grid-cols-3 md:grid-cols-4 gap-4 p-2 max-w-4xl mx-auto">
            <button class="btn ring ring-primary/10 h-full p-3" onclick="{() => {selectedStatus = 'new'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-primary">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">NEW</div>
                        <div class="stat-value">{newOrders.length}</div>
                    </div>
                    <div>
                        <Icon name="order_approve" class="h-8 w-8"/>
                    </div>
                </div>
            </button>

            <button class="btn ring ring-amber-700/10 h-full p-3" onclick="{() => {selectedStatus = 'confirmed'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-amber-700">
                    <div class="grid">
                        <div class="text-xs lg:text-lg font-bold">CONFIRMED</div>
                        <div class="stat-value">{confirmedOrders.length} <Icon name="outgoing_mail" class="h-8 w-8"/> <div>
                    </div>
                </div>
            </button>

            <button class="btn ring ring-info/10 h-full p-3" onclick="{() => {selectedStatus = 'ready'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-info">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">READY</div>
                        <div class="stat-value">{readyOrders.length}</div>
                    </div>
                    <div>
                        <Icon name="room_service" class="h-8 w-8"/>
                    </div>
                </div>
            </button>

            <button class="btn ring ring-warning/10 h-full p-3" onclick="{() => {selectedStatus = 'served'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-warning">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">SERVED</div>
                        <div class="stat-value">{servedOrders.length}</div>
                    </div>
                    <div>
                        <Icon name="hand_meal" class="h-8 w-8" />
                    </div>
                </div>
            </button>

            <button class="btn ring ring-success/10 h-full p-3" onclick="{() => {selectedStatus = 'closed'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-success">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">CLOSED</div>
                        <div class="stat-value">{closedOrders.length}</div>
                    </div>
                    <div>
                        <Icon name="done_all" class="h-8 w-8" />
                    </div>
                </div>
            </button>

            <button class="btn ring ring-stone-400/10 h-full p-3" onclick="{() => {selectedStatus = 'canceled'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-stone-400">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">CANCELED</div>
                        <div class="stat-value">{canceledOrders.length} <Icon name="cancel" class="h-8 w-8" /></div>
                    </div>
                </div>
            </button>

            <button class="btn ring ring-error/10 h-full p-3" onclick="{() => {selectedStatus = 'error'; showOrders()}}">
                <div class="flex justify-between w-full items-center mx-2 text-error">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">ERROR</div>
                        <div class="stat-value">{erroredOrders.length}</div>
                    </div>
                    <div>
                        <Icon name="dangerous" class="h-8 w-8" />
                    </div>
                </div>
            </button>
        </div>
    </div>

    <div class="grid mt-10">
        <div class="flex justify-center items-center gap-2">
            <h2 class="text-stone-500 text-center">TABLE RESERVATIONS</h2>
            <TableReservation />
        </div>
       

        <div class="grid grid-cols-3 gap-4 p-2 max-w-4xl mx-auto">
            <button class="btn bg-secondary/10 ring ring-secondary/10 h-full p-3" onclick="{() => {selectedStatus = 'pending'; showReservations()}}">
                <div class="flex justify-between w-full items-center mx-2 text-secondary">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">Pending</div>
                        <div class="stat-value">{pendingReservations?.length}</div>
                    </div>
                </div>
            </button>

            <button class="btn bg-success/10 ring ring-success/10 h-full p-3" onclick="{() => {selectedStatus = 'confirmed'; showReservations()}}">
                <div class="flex justify-between w-full items-center mx-2 text-success">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">Confirmed</div>
                        <div class="stat-value">{confirmedReservations?.length}</div>
                    </div>
                </div>
            </button>

            <button class="btn bg-warning/10 ring ring-warning/10 h-full p-3" onclick="{() => {selectedStatus = 'canceled'; showReservations()}}">
                <div class="flex justify-between w-full items-center mx-2 text-warning">
                    <div class="grid">
                        <div class="lg:text-lg font-bold">Canceled</div>
                        <div class="stat-value">{canceledReservations?.length}</div>
                    </div>
                </div>
            </button>
        </div>
    </div>
</div>

<Modal bind:showModal>
    <div class="card rounded-xs h-dvh  lg:w-120 bg-base-300 shadow-sm ">
        <div class="card-body overflow-auto">

            <input type="checkbox" id="order_processing_modal" class="modal-toggle" />
            <div class="modal" role="dialog">
            <div class="modal-box bg-orange-100">
              <div class="">
                <div class="flex justify-center 8/10">
                  <div>
                    <span class="loading loading-dots w-[100px] text-amber-500 z-1000 "></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div class="flex flex-row justify-between">

                {#if showRecords == 'orders'}
                    <h2 class="card-title">Orders <span class="text-info">{selectedStatus?.toUpperCase()}</span></h2>
                {/if}

                {#if showRecords == 'reservations'}
                    <h2 class="card-title">Table {selectedStatus?.toUpperCase()}</h2>
                {/if}

                <button onclick="{() => showModal = false}" class="btn btn-ghost btn-square">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div>

                {#if showRecords == 'orders'}
                    <ul class="list">
                        {#each selectedRecords as record}
                            <li class="list-row p-1">
                                <div class="">
                                    <div class="uppercase font-semibold ">{record.orderNumber}</div>
                                    <div class="">
                                        
                                        ₱{Math.trunc(record.subtotal)} - {record.orderItem.length} 
                                        <span><Icon name="schedule"/>{getTimeFromDate(record.orderDate)}</span>

                                        {#if record.orderType == 'pickup'}
                                            <Icon name="takeout_dining_2" class="text-error"/>
                                        {:else if record.orderType == 'delivery'}
                                            <Icon name="moped" class="text-error" />
                                        {:else if record.orderType == 'advanced'}
                                        <Icon name="event_upcoming" class="text-error" />
                                        {/if}

                                    </div>

                                <div class="text-sm uppercase font-semibold opacity-80">{customerList.find(el => el.id == record.customer.split('/')[3]).name}
                                    <div class="badge badge-sm badge-info">{record.orderType}</div>
                                </div>
                                <div class="text-sm  font-semibold opacity-80">{customerList.find(el => el.id == record.customer.split('/')[3]).email}</div>
                                
                                </div>
                                <div class="grid grid-cols-2 gap-2">
                                    <button class="lg:hidden btn btn-primary" onclick="{()=>{callCustomer(record)}}">
                                        <Icon name="call"/>
                                    </button>
                                    <div class="hidden lg:block badge badge-info badge-outline h-full p-2">
                                        <Icon name="call"/>{customerList.find(el => el.id == record.customer.split('/')[3]).telephone}
                                    </div>

                                    <div class="dropdown dropdown-end">
                                        <div tabindex="0" role="button" class="btn btn-secondary"><Icon name="view_object_track"/></div>
                                        <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                            {#each statusList as status}
                                                {#if record.orderStatus != status.id}
                                                    <li><button class="btn btn-primary btn-soft {record.orderStatus > status.id ? 'btn-success':''}" popovertarget='popover-1'
                                                        onclick="{()=>{updateOrder(record,status.id)  }}">{status.name}</button></li>
                                                {/if}
                                            {/each}
                                        </ul>
                                    </div>

                                    <div class="col-span-1">
                                        <a class="btn btn-primary btn-soft" href="{base}/orderEdit/{record.id}">edit</a>
                                    </div>

                                    <div class="col-span-1">
                                        <EditProfile customerId = {record.customer.split('/')[3]} />
                                    </div>
                                </div>

                                
                            </li>
                        {/each}
                    </ul>
                {/if}

                {#if showRecords == 'reservations'}
                    <ul class="list">
                        {#each selectedRecords as record}
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-col p-1">
                                    <div class="text-xs text-center font-semibold opacity-60">{Math.trunc(record.guestCount)}</div>
                                    <div class="text-xs uppercase font-semibold opacity-60">{record.customerName}</div>
                                </div>

                                <div class="flex items-center gap-1">
                                    <button class="btn btn-success btn-square btn-xs" onclick="{() => confirmReservation(record)}">
                                        <Icon name="ios-check"  />
                                    </button>
                                    <button class="btn btn-error btn-square btn-xs" onclick="{() => cancelReservation(record)}">
                                        X
                                    </button>
                                    <button class="btn btn-info btn-square btn-xs" onclick="{() => {selectedReservation = record; my_modal_1.showModal()}}">
                                        <Icon name="read_more" size="15" />
                                    </button>
                                </div>

                                <a href="tel:{record.customerPhone}" class="btn btn-link p-0 m-0 px-1">{record.customerPhone}</a>

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
                <li>Time: {dayjs(selectedReservation.startTime).format('h:mm A')}</li>
                <li>Period: {selectedReservation.sittingPeriod}</li>
                <li>Duration: {selectedReservation.durationMinutes}</li>
                <li>Status: {selectedReservation.status}</li>
                <li>Created At: {dayjs(selectedReservation.createdAt).format('MM/DD/YYYY')} - {dayjs(selectedReservation.createdAt).format('h:mm A')}</li>
            </ul>
        {/if}
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>

<!-- <dialog id="new_reservation" class="modal">
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
            <input type="date" class="input" value="{gettodaydate()}" />

            <label class="label">Time</label>
            <TimePicker 
                value={selectedTime}
                onChange="{(time) => selectedTime = time}"
                interval={30}
                startHour={timeRange.startHour}
                endHour={timeRange.endHour}
                label="Pick a time"
            />

            <h2 class="text-lg mt-5 text-center">Sitting Period</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-1 lg:max-w-4xl mx-auto">
                <button class="btn btn-sm text-xs {selectedPeriod == 'A' ? 'btn-success' : 'btn-soft'}" onclick="{() => {selectedTime = ''; selectedPeriod = 'A'}}">
                    {#if selectedPeriod == 'A'} <Icon name="ios-check" />{/if}
                    BREAKFAST
                </button>
                <button class="btn btn-sm text-xs {selectedPeriod == 'B' ? 'btn-success' : 'btn-soft'}" onclick="{() => {selectedTime = ''; selectedPeriod = 'B'}}">
                    {#if selectedPeriod == 'B'} <Icon name="ios-check" />{/if}
                    LUNCH
                </button>
                <button class="btn btn-sm text-xs {selectedPeriod == 'C' ? 'btn-success' : 'btn-soft'}" onclick="{() => {selectedTime = ''; selectedPeriod = 'C'}}">
                    {#if selectedPeriod == 'C'} <Icon name="ios-check" />{/if}
                    BRUNCH
                </button>
                <button class="btn btn-sm text-xs {selectedPeriod == 'D' ? 'btn-success' : 'btn-soft'}" onclick="{() => {selectedTime = ''; selectedPeriod = 'D'}}">
                    {#if selectedPeriod == 'D'} <Icon name="ios-check" />{/if}
                    DINNER
                </button>
            </div>

            <label class="label">Duration</label>
            <input type="text" class="input" placeholder="Name" />
        </fieldset>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog> -->

<Toaster richColors position="top-center" closeButton duration={10000} />

<style>
    :root {
        --date-picker-background: #f7f7f7;
        --date-picker-foreground: #0E390E;
    }
</style>

<script>
    import { browser } from '$app/environment';
    import { fade } from 'svelte/transition';
    import useFetch from '$lib/services/useFetch.js';
    import Icon from '$lib/components/Icon.svelte';
    import Modal from '$lib/components/Modal.svelte';
    import dayjs from 'dayjs';
    import { DateInput } from 'date-picker-svelte';
    import TimePicker from '$lib/components/TimePicker.svelte';
    import TableReservation from '$lib/components/TableReservation.svelte';
    import { Toaster, toast } from 'svelte-sonner';
    import { base } from '$app/paths';
    import { onMount } from 'svelte';
    import EditProfile from '$lib/components/EditProfile.svelte';

    // State
    let soundsEnabled = $state(false);
    let audioContext = null;
    let es = null;
    
    let notifications = $state([]);
    let orders = $state([]);
    let newOrders = $state([]);
    let confirmedOrders = $state([]);
    let readyOrders = $state([]);
    let servedOrders = $state([]);
    let closedOrders = $state([]);
    let canceledOrders = $state([]);
    let erroredOrders = $state([]);
    let showModal = $state(false);
    let selectedRecords = $state([]);
    let selectedStatus = $state('');
    let reservations = $state([]);
    let pendingReservations = $state([]);
    let confirmedReservations = $state([]);
    let canceledReservations = $state([]);
    let showRecords = $state();
    let selectedReservation = $state(null);
    let selectedPeriod = $state('A');
    let selectedTime = $state('');
    let mercureStatus = $state({ text: '', value: 0 });
    let statusList = $state()
    let preLoad = $state()
    let orderProcessing= $state()

    
    let customerList = $state()

    onMount(() => {
        orderProcessing = document.querySelector('#order_processing_modal');
        console.log('orderProcessing', orderProcessing)

        let list = localStorage.getItem('preLoad')
        preLoad = JSON.parse(list)
        //console.log('preLoad', preLoad)

        customerList = preLoad.customerList
        console.log('customerList', customerList)
        statusList = preLoad.statusList
    })
    // Sound functions
    function enableSounds() {
        if (!audioContext && (window.AudioContext || window.webkitAudioContext)) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Play silent sound to unlock audio
            const oscillator = audioContext.createOscillator();
            oscillator.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.001);
            
            soundsEnabled = true;
            localStorage.setItem('soundsEnabled', 'true');
            console.log('✅ Sounds enabled');
        }
    }

    function playNotificationSound() {
        if (!soundsEnabled) {
            console.log('Sounds not enabled yet');
            return;
        }
        
        if (!audioContext) {
            console.log('No audio context');
            return;
        }
        
        // Resume if suspended
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        try {
            const oscillator = audioContext.createOscillator();
            oscillator.connect(audioContext.destination);
            
            // Simple beep
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            
            console.log('🔔 Sound played');
        } catch (error) {
            console.log('Sound error:', error);
        }
    }

    // Mercure connection
    function connectMercure() {
        if (es) {
            es.close();
        }
        
        const VITE_MERCURE = import.meta.env.VITE_MERCURE;
        if (!VITE_MERCURE) {
            console.log('No Mercure URL configured');
            return;
        }
        
        es = new EventSource(`${VITE_MERCURE}/.well-known/mercure?topic=/granderoyale_orders`);

        
        es.onopen = () => {
            console.log('✅ Mercure order connected');
            mercureStatus.text = '✅ Mercure order connected';
            mercureStatus.value = 2;
        };
        
        es.onmessage = (e) => {
            console.log('Mercure message received');
            getTodayOrders();
            getTableReservation();
            
            try {
                const order = JSON.parse(e.data);
                console.log('New order:', order);

                localStorage.setItem('GrandeRoyaleNotifications', JSON.stringify(order));
            
                notifications = [
                    {
                        id: order.id || order.id,
                        number: order.orderNumber || order.customerName,
                        total: order.grandTotal || order.reservationDate,
                        time: order.createdOn || order.createdAt,
                        status: order.status
                    },
                    ...notifications.slice(0, 4)
                ];

                if(order.orderNumber){
                    toast.info('Order - ' + order.orderNumber+ ' ' + order.subtotal)
                }else{
                    toast.warning('Table - ' + order.customerName+ ' ' + order.status)
                }

                
                // Play sound notification
                playNotificationSound();
                
            } catch (error) {
                console.log('Parse error:', error);
                mercureStatus.text = error;
                mercureStatus.value = 3;
            }
        };
        
        es.onerror = (error) => {
            console.log('Mercure error, reconnecting...');
            mercureStatus.text = 'Mercure error, reconnecting...';
            mercureStatus.value = 4;
            
            if (es) {
                es.close();
                es = null;
            }
            
            setTimeout(connectMercure, 3000);
        };
    }

    function gettodaydate() {
        return new Date().toISOString().split('T')[0];
    }

    $effect(() => {
        getTodayOrders();
        getTableReservation();
        
        if (!browser) return;
        
        console.log('Setting up Mercure connection...');
        mercureStatus.text = 'Setting up Mercure connection...';
        mercureStatus.value = 1;
        
        // Load sound preference
        if (localStorage.getItem('soundsEnabled') === 'true') {
            soundsEnabled = true;
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Connect to Mercure
        connectMercure();
        
        // Cleanup
        return () => {
            console.log('Cleaning up Mercure connection...');
            if (es) {
                es.close();
                es = null;
            }
        };
    });

    async function getTodayOrders() {
        const today = new Date().toISOString().split('T')[0];
        const response = await useFetch(`/orders/?createdOn[after]=${today}`, 'GET', null, true);
        orders = response || [];
        
        if (orders) {
            newOrders = orders.filter(el => el.orderStatus == 1);
            confirmedOrders = orders.filter(el => el.orderStatus == 2);
            readyOrders = orders.filter(el => el.orderStatus == 3);
            servedOrders = orders.filter(el => el.orderStatus == 4);
            closedOrders = orders.filter(el => el.orderStatus == 5);
            canceledOrders = orders.filter(el => el.orderStatus == 6);
            erroredOrders = orders.filter(el => el.orderStatus > 6);
        }
    }

    function showOrders() {
        showRecords = 'orders';
        switch (selectedStatus) {
            case 'new':
                selectedRecords = newOrders;
                break;
            case 'confirmed':
                selectedRecords = confirmedOrders;
                break;
            case 'ready':
                selectedRecords = readyOrders;
                break;
            case 'served':
                selectedRecords = servedOrders;
                break;
            case 'closed':
                selectedRecords = closedOrders;
                break;
            case 'canceled':
                selectedRecords = canceledOrders;
                break;
            case 'error':
                selectedRecords = erroredOrders;
                break;
        }
        console.log('selectedRecords',selectedRecords)
        showModal = true;
    }

    function showReservations() {
        console.log('selectedStatus',selectedStatus)
        showRecords = 'reservations';
        switch (selectedStatus) {
            case 'pending':
                selectedRecords = pendingReservations;
                break;
            case 'confirmed':
                selectedRecords = confirmedReservations;
                break;
            case 'canceled':
                selectedRecords = canceledReservations;
                break;
        }

        selectedRecords.length > 0 ? showModal = true : '';
    }

    function getTimeFromDate(orderdate) {
        const date = new Date(orderdate);
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    async function getTableReservation() {
        const today = new Date().toISOString().split('T')[0];
        const response = await useFetch(`/table_reservations/?createdAt[after]=${today}`, 'GET', null, true);
        reservations = response || [];

        //console.log('reservations',reservations)
        if (reservations) {
            pendingReservations = reservations.filter(el => el.status == 'pending');
            confirmedReservations = reservations.filter(el => el.status == 'confirmed');
            canceledReservations = reservations.filter(el => el.status == 'canceled');
            //showReservations()
        }
        
    }

    async function confirmReservation(record) {
        record.status = 'confirmed';
        await useFetch(`/table_reservations/${record.id}`, 'PATCH', record, true);
        showModal=false

    }

    async function cancelReservation(record) {
        record.status = 'canceled';
        await useFetch(`/table_reservations/${record.id}`, 'PATCH', record, true);
        getTableReservation();
        showModal=false
    }

    async function updateOrder(order,statusId){
        orderProcessing.checked= true
        let orderClone = {...order}
        delete orderClone.orderItem
        orderClone.orderStatus = String(statusId)
        const res = await useFetch(`/orders/${orderClone.id}`, 'PATCH', orderClone, true);
        console.log('res', res)
        getTodayOrders()
        showModal=false
        orderProcessing.checked= false
    }

    async function callCustomer(record){
        const customerIri = record.customer.split('/')[3]
        const response = await useFetch(`/customers/${customerIri}`, 'GET', null, true);
        if(response.telephone){
            const link = document.createElement('a');
            link.href = `tel:${response.telephone}`;
            link.click();
        }else{
            alert("Phone Not Found")
        }
    }

    // Time range derived
    let timeRange = $derived.by(() => {
        let startHour, endHour;
        if (selectedPeriod == 'A') {
            startHour = 9;
            endHour = 11;
        }
        if (selectedPeriod == 'B') {
            startHour = 11;
            endHour = 14;
        }
        if (selectedPeriod == 'C') {
            startHour = 14;
            endHour = 17;
        }
        if (selectedPeriod == 'D') {
            startHour = 17;
            endHour = 19;
        }
        return { startHour, endHour };
    });
</script>