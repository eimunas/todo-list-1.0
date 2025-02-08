<script>
    export let backgroundColor;
    export let textColor;
</script>

<div style={`background-color: ${backgroundColor};`} class="w-full mt-4 p-4 rounded-lg shadow">
    <h2 style={`color: ${textColor};`} class="text-xl font-semibold mb-3 font-montserrat">To-Do List</h2>
    <ul class="space-y-2">
        <slot></slot>
    </ul>
</div>