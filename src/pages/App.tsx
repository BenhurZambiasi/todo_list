import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../components/Actions";
import TodoList from "../components/TodoList";
import { addTask, deleteTask, editTask, toggleDone } from "../redux/todoSlice";
import styles from "./App.module.scss";

interface IItemTodoList {
  name: string;
  done: boolean;
  id: number;
}

function App() {
  const dispatch = useDispatch();
  const state = useSelector(({ todo }: any) => todo.todo);

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [taskSelected, setTaskSelected] = useState<IItemTodoList>({
    name: "",
    done: false,
    id: 0,
  });

  

  //cria uma nota tarefa
  const handelnewTask = () => {
    if (name) {
      dispatch(addTask({ name: name }));
      setName("");
    } else {
      setError("Digite uma descrição");
    }
  };

  //ativa o modo edição
  const openEdit = (task: IItemTodoList) => {
    setEdit(true);
    setName(task.name);
    setTaskSelected(task);
  };

  //função para edição da tarefa
  const handleEditTask = () => {
    dispatch(
      editTask({
        name: name,
        task: taskSelected,
      })
    );
    setEdit(false);
    setName("");
  };

  //cancela o mode edição
  const handleCacelarEdicao = () => {
    setEdit(false);
    setName("");
  };

  //Faz uma validação para quando executar a função para adicionar ou editar tarefa
  const handleClickAction = () => {
    edit ? handleEditTask() : handelnewTask();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Todo List</h1>
        <Actions
          edit={edit}
          onChangeName={setName}
          handleCacelarEdicao={handleCacelarEdicao}
          handleClickAction={handleClickAction}
          inputValue={name}
          error={error}
          handleFocus={() => setError("")}
        />
        <TodoList openEdit={openEdit} todoList={state} isEditing={edit} />
        <section className={styles.legenda}>
          <p>Total de tarefas: {state.length}</p>
          <p>
            Total de tarefas pendentes:&nbsp;
            {state.filter((task: IItemTodoList) => !task.done).length}
          </p>
          <p>
            Tarefas concluídas:&nbsp;
            {state.filter((task: IItemTodoList) => task.done).length}
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;
