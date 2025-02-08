<script>
    export let label = "Example";
    export let handleClick;
    export let textColor;

    const clickAction = (event) => {
        event.preventDefault();
        handleClick(event);
    }
</script>

<button style={`color: ${textColor}; border: 1px solid ${textColor}`} class="font-montserrat ml-1  mt-6 px-3.5 py-2 rounded-md hover:bg-blue-100 hover:border-blue-100 hover:scale-105 transition-all duration-100 ease-in-out" on:click={clickAction}>{label}</button>