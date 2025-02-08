<script>
    export let isOpen = false;
    export let onClose;
    export let onSubmit;

    export let title = "";
    export let notes = "";

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({title, notes});
        onClose();
    };
</script>

{#if isOpen}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
        <div class="bg-white p-6 w-80">
            <h2 class="font-montserrat text-lg font-bold mb-4">Add Todo</h2>
            <div class="mb-4">
                <label for="title" class="font-montserrat block text-sm mb-1">Title</label>
                <input id="title" type="text" bind:value={title} class="font-montserrat w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Enter title"/>
            </div>
            <div class="mb-4">
                <label for="notes" class="font-montserrat block text-sm mb-1">Notes</label>
                <textarea id="notes" bind:value={notes} class="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Write your notes"></textarea>
            </div>
            <div class="flex justify-end space-x-2">
                <button on:click={onClose} class="font-montserrat bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">Cancel</button>
                <button on:click={(e) => handleSubmit(e)} class="font-montserrat bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition">Save</button>
            </div>
        </div>
    </div>
{/if}
