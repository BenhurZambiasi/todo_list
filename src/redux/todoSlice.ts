import { createSlice } from "@reduxjs/toolkit";

interface IItemTodoList {
  name: string;
  done: boolean;
  id: number;
}

//Faz a busca no localStorage da lista salva
const local = localStorage.getItem("todoList");

//faz uma validação, verificando se existe algo no localStorage
const todoListParsed: IItemTodoList[] = local ? JSON.parse(local) : [];

const initialState = {
  todo: <IItemTodoList[]>todoListParsed,
};

const saveLocalState = (todoList: IItemTodoList[]) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

const slice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    //adicionar uma nova tarefa
    addTask(state, { payload }) {
      const id = state.todo[state.todo.length - 1]?.id + 1 || 1;
      state.todo.push({
        name: payload.name,
        done: false,
        id: id,
      });
      saveLocalState(state.todo);
    },
    //deleta uma tarefa passando a tarefa por parâmetro
    deleteTask(state, { payload }) {
      state.todo.splice(payload, 1);
      saveLocalState(state.todo);
    },
    //Edita uma tarefa passando a tarefa por parâmetro
    editTask(state, { payload }) {
      let updatedTask = { ...payload.task, name: payload.name };
      const index = state.todo.findIndex((task) => task.id == payload.task.id);
      state.todo.splice(index, 1, updatedTask);
      saveLocalState(state.todo);
    },
    //Altera o estado do atributo done para true ou false
    toggleDone(state, { payload }) {
      let updatedTask = { ...payload, done: !payload.done };
      const index = state.todo.findIndex((task) => task.id == payload.id);
      state.todo.splice(index, 1, updatedTask);
      saveLocalState(state.todo);
    },
  },
});

export const { addTask, deleteTask, editTask, toggleDone } = slice.actions;

export const selectTodo = (state: any) => state.todo;

export default slice.reducer;
