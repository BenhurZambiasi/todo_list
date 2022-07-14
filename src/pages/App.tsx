import { useState } from "react";
import { FiPlus, FiTrash, FiEdit } from "react-icons/fi";
import Actions from "../components/Actions";
import TaskItem from "../components/TaskItem";
import TodoList from "../components/TodoList";
import styles from "./App.module.scss";

interface IItemTodoList {
  name: string;
  done: boolean;
  id: number;
}

function App() {
  const [todoList, setTodoList] = useState<IItemTodoList[]>([
    { name: "Item 1", done: false, id: 1 },
    { name: "Item 2", done: false, id: 2 },
    { name: "Item 3", done: false, id: 3 },
    { name: "Item 4", done: false, id: 4 },
  ]);
  const [taskSelected, setTaskSelected] = useState<IItemTodoList>({
    name: "",
    done: false,
    id: 0,
  });
  const [name, setName] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);

  const handelnewTask = () => {
    let list = [...todoList];
    let id = todoList[todoList.length - 1]?.id + 1 || 1;
    list.push({ name: name, done: false, id });
    setTodoList(list);
    setName("");
  };

  const checkDone = (task: IItemTodoList, index: number) => {
    let list = [...todoList];
    const findTask = todoList.find(({ id }) => task.id === id);
    let updatedTask;

    if (findTask) {
      updatedTask = { ...findTask, done: !findTask.done };
      list.splice(index, 1, updatedTask);
      setTodoList(list);
    }
  };

  const openEdit = (task: IItemTodoList) => {
    setEdit(true);
    setName(task.name);

    setTaskSelected(task);
  };

  const editTask = () => {
    let list = [...todoList];
    const findTask = list.find(({ id }) => taskSelected.id === id);
    let index = list.findIndex(({ id }) => taskSelected.id === id);

    if (findTask) {
      let updatedTask = { ...findTask, name: name };
      list.splice(index, 1, updatedTask);

      setTodoList(list);
      setEdit(false);
      setName("");
    }
  };

  const removeTask = (index: number) => {
    let list = [...todoList];
    list.splice(index, 1);
    setTodoList(list);
  };

  const handleCacelarEdicao = () => {
    setEdit(false);
    setName("");
  };

  const handleClickAction = () => {
    edit ? editTask() : handelnewTask();
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
        />

        <section>
          <TodoList
            checkDone={checkDone}
            openEdit={openEdit}
            removeTask={removeTask}
            todoList={todoList}
          />
        </section>

        <section>
          <p>total de tarefas: {todoList.length}</p>
          <p>
            total de tarefas finalizadas:
            {todoList.filter((task) => task.done).length}
          </p>
          <p>
            total de tarefas pendentes:
            {todoList.filter((task) => !task.done).length}
          </p>
        </section>
      </div>
    </div>
  );
}

export default App;
