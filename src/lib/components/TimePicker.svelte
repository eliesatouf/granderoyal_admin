<!-- src/lib/components/TimePicker.svelte -->
<script lang="ts">
  type Props = {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    interval?: number;
    startHour?: number;
    endHour?: number;
  };

  let {
    value = '',
    onChange,
    label = 'Time',
    interval = 30,
    startHour = 9,
    endHour = 22
  }: Props = $props();

  let showDropdown = $state(false);
  let timeSlots = $state<string[]>([]);

  // Generate time slots
  $effect(() => {
    const slots: string[] = [];
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    
    timeSlots = slots;
  });

  function formatTime(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
  }

  function selectTime(time: string) {
    // Update the prop value directly (this triggers the binding)
    value = time;
    showDropdown = false;
    
    // Call onChange callback if provided
    onChange?.(time);
  }
</script>

<div class="time-picker relative">
  {#if label}
    <label class="text-center block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
  {/if}
  <div class="flex justify-center">
  <button
    type="button"
    class="px-4 py-2.5 text-center border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:ring-2 focus:ring-lime-900 focus:border-lime-800 
    {value ? '':'ring ring-red-500 ring-2'}"
    onclick={() => showDropdown = !showDropdown}
    onkeydown={(e) => e.key === 'Escape' && (showDropdown = false)}
  >
    <div class="flex justify-between items-center">
      <span class={value ? 'text-gray-900' : 'text-gray-400'}>
        {value ? formatTime(value) : 'Select time...'}
      </span>
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </button>
</div>

  {#if showDropdown}
    <div class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
      <div class="p-2 grid grid-cols-3 gap-2">
        {#each timeSlots as time}
          <button
            type="button"
            class="btn text-sm btn-lg font-normal border  {value === time ? 'btn-success  ' : ''}"
            onclick={() => selectTime(time)}
          >
            {formatTime(time)}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>