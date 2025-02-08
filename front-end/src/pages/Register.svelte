<script>
    import page from "page";
    import AuthenticationForm from "../modals/AuthenticationForm.svelte";

    let username = "";
    let password = "";
    let message = "";

    const submitRegistration = async () => {
        if (!username || !password) {
            message = "Fields cannot be empty";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });

            const data = await response.json();
            if (response.ok) {
                page("/login");
            } else {
                message = data.message;
            }

        } catch (err) {
            message = `Error: ${err.message}`;
        }
    };
</script>

<AuthenticationForm handleAction={submitRegistration}
                    bind:username={username}
                    bind:password={password}
                    errorMessage={message}
                    changePage="/login"
                    formLabel="Register a new account"
                    buttonLabel="Register"
                    redirectLabel="Already logged in?"
                    color="text-blue-500" />


