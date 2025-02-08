<script>
    import PopupModal from "./PopupModal.svelte";

    export let id;
    export let title;
    export let notes;
    export let onDelete;
    export let onUpdate;
    export let backgroundColor;
    export let textColor;
    let isExpanded = false;

    let updateModalOpen = false;

    const handleDelete = () => {
        onDelete(id);
    };

    const handleUpdate = () => {
        onUpdate({ title, notes }, id);
    };

</script>

<li class="flex flex-col justify-between bg-white p-4 rounded shadow open-notes"
    style="height: {isExpanded ? '200px' : '50px'}; overflow: {isExpanded ? 'visible' : 'hidden'}; background-color: {backgroundColor}">
    <div class="absolute top-0 left-0 px-2 py-0 flex justify-between w-full">
        <button on:click={() => isExpanded = !isExpanded} class="pt-3 pl-1 font-light" style={`color: ${textColor};`}>{title}</button>
        <span class="pt-3">
            <button on:click={() => (updateModalOpen = true)}
                    class="font-montserrat text-green-500 hover:text-green-700 pr-3">&#10000;</button>
            <button on:click={handleDelete} class="font-montserrat text-red-500 hover:text-red-700">&#10006;</button>
        </span>
    </div>

    {#if isExpanded}
        <div class="flex flex-col gap-2">
            <hr class="mt-7"/>
            <p style={`color: ${textColor};`} class="font-montserrat text-xs">{notes}</p>
        </div>
    {/if}
</li>

{#if updateModalOpen}
    <PopupModal bind:title={title} bind:notes={notes} isOpen={updateModalOpen} onClose={() => (updateModalOpen = false)} onSubmit={handleUpdate} />
{/if}

<style>
    .open-notes {
        position: relative;
        transition: height 0.3s ease, overflow 0.3s ease;
    }
</style>
