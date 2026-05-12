// src/lib/mercure.js
import { browser } from '$app/environment';  // ← ADD THIS

export class MercureService {
    constructor() {
        this.eventSource = null;
        this.newOrderCallbacks = [];  // ← Simple array
    }

    connect() {
        if (this.eventSource || !browser) return;
        
        this.eventSource = new EventSource(
            'http://localhost:3000/.well-known/mercure?topic=/granderoyale_orders'
        );
        
        this.eventSource.onmessage = (event) => {
            try {
                const order = JSON.parse(event.data);
                
                // Call all registered callbacks
                this.newOrderCallbacks.forEach(callback => callback(order));
                
                // Play sound for NEW orders
                if (order.orderStatus === '1') {
                    this.playNotificationSound();
                }
                
            } catch (e) {
                console.log('Mercure update:', event.data);
            }
        };
    }
    
    // CORRECT method name
    subscribe(callback) {  // ← NOT onNewOrder
        this.newOrderCallbacks.push(callback);
    }
    
    playNotificationSound() {
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ');
            audio.volume = 0.1;
            audio.play();
        } catch (e) {}
    }
    
    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }
}

export const mercure = new MercureService();