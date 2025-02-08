<script>
    import router from 'page';
    import Register from "./pages/Register.svelte";
    import Main from "./pages/Main.svelte";
    import Login from "./pages/Login.svelte";

    let page;
    let params = {};

    router('/login', () => {
        page = Login;
    });

    router('/register', () => {
        page = Register;
    });

    router('/', (e) => {
        params = e.params;
        page = Main;
    });

    router.start();
</script>

<main class="h-screen">
    <svelte:component this={page} {...params}/>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
