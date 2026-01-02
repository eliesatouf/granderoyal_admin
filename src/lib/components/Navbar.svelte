<div class="navbar bg-base-100 shadow-sm mx-auto">

  <div class="navbar-start">

    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>

      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
        <li>
         <details>
          <summary>Dashboard</summary>
          <ul class="p-2">
            <li><a href="{base}/dashboard" onclick="{()=>{document.activeElement.blur()}}">Dashboard</a></li>
            <li><a href="{base}/order/order_monitor" onclick="{()=>{document.activeElement.blur()}}">Order Monitor</a></li>
            <li><a href="{base}/reports/daily" onclick="{()=>{document.activeElement.blur()}}">Daily report</a></li>
            <li><a href="{base}/reports/weekly" onclick="{()=>{document.activeElement.blur()}}">Weekly report</a></li>
            <li><a href="{base}/reports/monthly" onclick="{()=>{document.activeElement.blur()}}">Monthly report</a></li>
            <li><a href="{base}/reports/custom" onclick="{()=>{document.activeElement.blur()}}">Custom report</a></li>
            <!-- <li class="menu-disabled"><a onclick="{()=>{document.activeElement.blur()}}">Submenu 2</a></li> -->
          </ul>
        </details>
        </li>

        <li>
         <details>
          <summary>Accounts</summary>
          <ul class="p-2">
            <li><a href="{base}/accounts" onclick="{()=>{document.activeElement.blur()}}">Users</a></li>
            <!-- <li class="menu-disabled"><a onclick="{()=>{document.activeElement.blur()}}">Submenu 2</a></li> -->
          </ul>
        </details>
        </li>

        <li>
         <details>
          <summary>Page contents</summary>
          <ul class="p-2">
            <li><a href="{base}/page_contents/landing_page" onclick="{()=>{document.activeElement.blur()}}">Landing Page</a></li>
            <li><a href="{base}/page_contents/offers" onclick="{()=>{document.activeElement.blur()}}">Offers</a></li>
            <!-- <li><a href="{base}/page_contents/events" onclick="{()=>{document.activeElement.blur()}}">Events</a></li> -->
            <!-- <li class="menu-disabled"><a onclick="{()=>{document.activeElement.blur()}}">Submenu 2</a></li> -->
          </ul>
        </details>
        </li>

        <li>
         <details>
          <summary>Menus</summary>
          <ul class="p-2">
            <li><a href="{base}/menu/category" onclick="{()=>{document.activeElement.blur()}}">Category</a></li>
            <!-- <li><a href="{base}/menu/dining" onclick="{()=>{document.activeElement.blur()}}">Dining Menu</a></li> -->
            <li><a href="{base}/menu/dining/dish" onclick="{()=>{document.activeElement.blur()}}">Dining Dishes</a></li>
            <div class="{base}/divider p-0 m-0"></div>
<!--             <li><a href="{base}/menu/catering" onclick="{()=>{document.activeElement.blur()}}">Catering Menu</a></li>
            <li><a href="{base}/menu/catering/dish" onclick="{()=>{document.activeElement.blur()}}">Catering Dishes</a></li> -->
            <div class="{base}/divider p-0 m-0"></div>
            <li><a href="{base}/menu/discount" onclick="{()=>{document.activeElement.blur()}}">Discount</a></li>
            <li><a href="{base}/menu/discount-type" onclick="{()=>{document.activeElement.blur()}}">Discount Types</a></li>
            <div class="{base}/divider p-0 m-0"></div>
            <li><a href="{base}/page_contents/offers" onclick="{()=>{document.activeElement.blur()}}">Offer</a></li>
            <li><a href="{base}/menu/offer-type" onclick="{()=>{document.activeElement.blur()}}">Offer Types</a></li>
            <div class="{base}/divider p-0 m-0"></div>
            <li><a href="{base}/menu/bundle" onclick="{()=>{document.activeElement.blur()}}">Bundles</a></li>
          </ul>
        </details>
        </li>

        <li>
         <details>
          <summary>Order</summary>
          <ul class="p-2">
            <li><a href="{base}/orders" onclick="{()=>{document.activeElement.blur()}}">All Orders</a></li>
            <li><a href="{base}/menu/oorderChannel" onclick="{()=>{document.activeElement.blur()}}">Order Type</a></li>
          </ul>
        </details>
        </li>
      </ul>
    </div>

    <a href="/" class="flex items-center gap-3 no-underline group" onclick="{closeMobileMenu}">
          <div class="h-16  flex items-center justify-center  ">
          <img 
            src="/logo_100.png" 
            alt="Sandys FUSION KITCHEN" 
            class="h-full w-full object-contain" 
          />
        </div>
        </a>
  </div>

  <div class="navbar-center hidden lg:flex">

    <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-ghost rounded-field">Dashboard</div>
      <ul tabindex="0"
          class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
        <li><a href="{base}/dashboard" onclick="{()=>{document.activeElement.blur()}}">Dashboard</a></li>
        <li><a href="{base}/order/order_monitor" onclick="{()=>{document.activeElement.blur()}}">Order Monitor</a></li>
        <li><a href="{base}/reports/daily" onclick="{()=>{document.activeElement.blur()}}">Daily report</a></li>
        <li><a href="{base}/reports/weekly" onclick="{()=>{document.activeElement.blur()}}">Weekly Report</a></li>
        <li><a href="{base}/reports/monthly" onclick="{()=>{document.activeElement.blur()}}">Monthly report</a></li>
        <li><a href="{base}/reports/custom" onclick="{()=>{document.activeElement.blur()}}">Custom report</a></li>
      </ul>
    </div>

    <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-ghost rounded-field">Accounts</div>
      <ul tabindex="0"
          class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
        <li><a href="{base}/accounts" onclick="{()=>{document.activeElement.blur()}}">Users</a></li>
      </ul>
    </div>


    <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-ghost rounded-field">Page contents</div>
      <ul tabindex="0"
          class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
        <li><a href="{base}/page_contents/landing_page" onclick="{()=>{document.activeElement.blur()}}">landing Page</a></li>
        <li><a href="{base}/page_contents/offers" onclick="{()=>{document.activeElement.blur()}}">Offers</a></li>
        <!-- <li><a href="{base}/page_contents/events" onclick="{()=>{document.activeElement.blur()}}">Events</a></li> -->
      </ul>
    </div>

    <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-ghost rounded-field">Menus</div>
      <ul tabindex="0"
          class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
        <li><a href="{base}/menu/category" onclick="{()=>{document.activeElement.blur()}}">Category</a></li>
        <!-- <li><a href="{base}/menu/dining" onclick="{()=>{document.activeElement.blur()}}">Dining Menu</a></li> -->
        <li><a href="{base}/menu/dining/dish" onclick="{()=>{document.activeElement.blur()}}">Dining Dishes</a></li>
        <div class="divider p-0 m-0"></div>
<!--         <li><a href="{base}/menu/catering" onclick="{()=>{document.activeElement.blur()}}">Catering Menu</a></li>
        <li><a href="{base}/menu/catering/dish" onclick="{()=>{document.activeElement.blur()}}">Catering Dishes</a></li> 
        <div class="divider p-0 m-0"></div>-->
        <li><a href="{base}/menu/discount" onclick="{()=>{document.activeElement.blur()}}">Discount</a></li>
        <li><a href="{base}/menu/discount-type" onclick="{()=>{document.activeElement.blur()}}">Discount Types</a></li>
        <div class="divider p-0 m-0"></div>
        <li><a href="{base}/page_contents/offers" onclick="{()=>{document.activeElement.blur()}}">Offer</a></li>
        <li><a href="{base}/menu/offer-type" onclick="{()=>{document.activeElement.blur()}}">Offer Types</a></li>
        <div class="divider p-0 m-0"></div>
        <li><a href="{base}/menu/bundle" onclick="{()=>{document.activeElement.blur()}}">Bundles</a></li>

      </ul>
    </div>

     <div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-ghost rounded-field">Order</div>
      <ul tabindex="0"
          class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
          <li><a href="{base}/order" onclick="{()=>{document.activeElement.blur()}}">All Orders</a></li>
          <li><a href="{base}/menu/orderChannel" onclick="{()=>{document.activeElement.blur()}}">Order Channel</a></li>
      </ul>
    </div>



<!--     <div class="dropdown">
      <div tabindex="0" role="button" class="btn m-1">Click</div>
      <div
        tabindex="0"
        class="dropdown-content card card-sm bg-base-100 z-1 w-64 shadow-md">
        <div class="card-body">
          <p>This is a card. You can use any element as a dropdown.</p>
        </div>
      </div>
    </div> -->

  </div>

  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          {#if userState.user.name }
          <button class="btn btn-circle btn-primary">
            {userState.user.name[0].toUpperCase()}
        </button>
        {/if}
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li class="menu-disabled">
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li class="menu-disabled"><a>Settings</a></li>
        <li><a href="{base}/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<script>
  import Icon from '$lib/components/Icon.svelte'
  import userState from '$lib/stores/user.svelte.js';
  import { getContext } from 'svelte';
  const base = getContext('base');
</script>