<!-- src/lib/components/OrderNotifications.svelte -->
<script>
    import { browser } from '$app/environment';
    
    let notifications = $state([]);
    let es = null;
    
    $effect(() => {
        if (!browser) return;
        
        es = new EventSource('http://localhost:3000/.well-known/mercure?topic=/orders');
        
        es.onmessage = (e) => {
            try {
                const order = JSON.parse(e.data);
                if (order.orderStatus === '1') {
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
                    new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ')
                        .play().catch(() => {});
                }
            } catch {}
        };
        
        es.onerror = () => {
            setTimeout(() => {
                if (es) es.close();
                es = new EventSource('http://localhost:3000/.well-known/mercure?topic=/orders');
            }, 3000);
        };
        
        return () => es?.close();
    });
</script>

<div class="fixed bottom-4 right-4 z-50 space-y-2">
    {#each notifications as notif}
        <div class="p-3 bg-green-100 border border-green-300 rounded shadow">
            <div class="font-bold">🆕 Order #{notif.number}</div>
            <div class="text-sm">${notif.total} • {notif.time}</div>
        </div>
    {/each}
</div>