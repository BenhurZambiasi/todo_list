import React from "react";
import TaskItem from "../TaskItem";

import styles from "./styles.module.scss";

interface ITaskItem {
  name: string;
  done: boolean;
  id: number;
}

interface ITodoListProps {
  todoList: ITaskItem[];
  isFinished?: boolean;
  checkDone: (task: ITaskItem, index: number) => void;
  openEdit: (task: ITaskItem) => void;
  removeTask: (index: number) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  todoList,
  openEdit,
  removeTask,
  checkDone,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <label>Tarefas Pendentes</label>
        <ul>
          {todoList.map((task, index) => {
            if (!task.done)
              return (
                <TaskItem
                  task={task}
                  index={index}
                  isDone={false}
                  openEdit={openEdit}
                  removeTask={removeTask}
                  checkDone={checkDone}
                />
              );
          })}
        </ul>
      </div>
      <div className={styles.divider} />

      <div className={styles.content}>
        <label>Tarefas Finalizadas</label>
        <ul>
          {todoList.map((task, index) => {
            if (task.done)
              return (
                <TaskItem
                  task={task}
                  index={index}
                  isDone
                  removeTask={removeTask}
                  checkDone={checkDone}
                />
              );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
