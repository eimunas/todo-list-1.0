<script>
    import tokenStore from "../stores/tokenStore.js";
    import page from "page";
    import AuthenticationForm from "../modals/AuthenticationForm.svelte";

    let username = "";
    let password = "";
    let message = "";

    const submitLogin = async () => {
        if (!username || !password) {
            message = "Fields cannot be empty";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/tokens", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });

            const data = await response.json();
            if (response.ok) {
                tokenStore.set(data.token);
                localStorage.setItem("token", data.token);
                page("/");
            } else {
                message = data.message;
            }

        } catch (err) {
            message = `Error: ${err.message}`;
        }
    };
</script>

<AuthenticationForm handleAction={submitLogin}
                    bind:username={username}
                    bind:password={password}
                    errorMessage={message}
                    changePage="/register"
                    formLabel="Login"
                    buttonLabel="Login"
                    redirectLabel="New account?"
                    color="text-green-500" />


