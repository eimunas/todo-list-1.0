<script>
    import Button from "./Button.svelte";

    export let username;
    export let password;
    export let handleAction;
    export let errorMessage;
    export let changePage;
    export let buttonLabel;
    export let redirectLabel;
    export let formLabel;
    export let color;
</script>

<div class="grid h-screen place-items-center rounded">
    <form class="w-1/4 flex flex-col text-center justify-center items-center border border-grey shadow-lg h-1/2">
        <h1 class="font-montserrat font-medium text-2xl">{formLabel}</h1>
        <label class="mt-5 font-montserrat" for="username">Username</label>
        <input bind:value={username} class="mt-2 border border-grey px-2 py-1 text-base font-montserrat font-light" type="text" name="username" placeholder="Username">
        <label class="mt-5 font-montserrat" for="password">Password</label>
        <input bind:value={password} class="mt-2 border border-grey px-2 py-1 text-base font-montserrat font-light" type="password" name="password"
               placeholder="Password">
        <Button textColor="black" label={buttonLabel} handleClick={handleAction}/>
        <p class="mt-3 font-montserrat">{redirectLabel} <a class={color} href={changePage}>Here</a></p>
        <p class="text-red-500 font-montserrat">{errorMessage}</p>
    </form>
</div>
