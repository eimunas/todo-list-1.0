<script>
    import {parseJwt} from "../stores/tokenStore.js";
    import tokenStore from "../stores/tokenStore.js";
    import page from 'page';
    import ListContainer from "../modals/ListContainer.svelte";
    import TodoItem from "../modals/TodoItem.svelte";
    import Button from "../modals/Button.svelte";
    import PopupModal from "../modals/PopupModal.svelte";
    import * as API from "../utils/api.js";

    let username;
    let token;
    let todosPromise;
    let isModalOpen = false;
    let todos = [];
    let backgroundConfig = {
        backgroundTheme: "#fff",
        todoListTheme: "#F3F4F6",
        textColor: "black",
        logoColor: "blue",
        todoListTitleColor: "#a0aec0",
    };

    tokenStore.subscribe(value => token = value);
    if (!token) {
        page('/login');
    }

    username = parseJwt(token).username;

    /**
     * Gets list of to-dos.
     */
    const getTodos = async () => {
        try {
            const res = await API.getReq("api/todos", "");
            if (res.ok) {
                const data = await res.json();
                todos = data;
                return data;
            }
        } catch (err) {
            console.log("Error fetching todos data: " + err);
        }
    };


    /**
     * Creates a new to-do.
     * @param todoData
     */
    const addTodo = async (todoData) => {
        const {title, notes} = todoData;
        try {
            const res = await API.postReq("api/todos", {title, notes});
            if (res.ok) {
                const newTodo = await res.json();
                todos = [...todos, newTodo];
                todosPromise = getTodos();
            }
        } catch (err) {
            console.log("Error while adding a new todo: " + err);
        }
    };


    /**
     * Updates to-do by a specified id.
     * @param id
     */
    const deleteTodo = async (id) => {
        try {
            const res = await API.deleteReq(`api/todos/${id}`);
            if (res.ok) {
                const deletedTodo = await res.json();
                todos = todos.filter(todo => todo._id !== deletedTodo._id);
                todosPromise = getTodos();
            }
        } catch (err) {
            console.log("Error while deleting a todo: " + err);
        }
    };


    /**
     * Deletes to-do by a specified id.
     * @param todoData
     * @param id
     */
    const updateTodo = async (todoData, id) => {
        const {title, notes} = todoData;
        try {
            const res = await API.putReq(`api/todos/${id}`, {title, notes});
            if (res.ok) {
                const updatedTodo = await res.json();
                todos = todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo);
                todosPromise = getTodos();
            }
        } catch (err) {
            console.log("Error while updating a todo: " + err);
        }
    };

    const logout = (event) => {
        event.preventDefault();
        tokenStore.set(null);
        localStorage.removeItem("token");
        page('/login');
    };

    todosPromise = getTodos();
</script>


<div style={`background-color: ${backgroundConfig.backgroundTheme};`}
     class="container w-1/2 h-auto mt-10 mx-auto flex flex-col items-center">
    <h1 class="text-4xl mt-2 font-montserrat"><span class="text-gray-500">TO</span>
        <span class="text-amber-600">DO</span></h1>
    <hr class="w-full mt-2">

    <div class="flex w-full justify-between items-center mb-2">
        <p style={`color: ${backgroundConfig.textColor}`} class="font-montserrat pt-5">Welcome, <span style={`color: ${backgroundConfig.logoColor}`}
                                                                                     class="text-blue-600">{username}</span>.
        </p>
        <span>
            <Button label="Add Todo" textColor={backgroundConfig.textColor} handleClick={() => (isModalOpen = true)}/>
            <Button label="Logout" textColor={backgroundConfig.textColor} handleClick={logout}/>
        </span>
    </div>

    <ListContainer bind:backgroundColor={backgroundConfig.todoListTheme} bind:textColor={backgroundConfig.todoListTitleColor}>
        {#await todosPromise}
            <p class="font-montserrat">Loading data...</p>
        {:then todos}
            {#each todos as todo}
                <TodoItem id={todo._id} title={todo.title} notes={todo.notes} onDelete={deleteTodo}
                          onUpdate={updateTodo} backgroundColor={backgroundConfig.backgroundTheme} textColor={backgroundConfig.textColor}/>
            {/each}
        {:catch error}
            <p class="text-red-500">{error.message}</p>
        {/await}
    </ListContainer>

    <PopupModal isOpen={isModalOpen} onClose={() => (isModalOpen = false)} onSubmit={addTodo}/>
</div>

