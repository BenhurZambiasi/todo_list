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
  isEditing: boolean;
  openEdit: (task: ITaskItem) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  isEditing,
  todoList,
  openEdit,
}) => {
  return (
    <div className={styles.container}>
      {todoList.length == 0 ? (
        <h3> Nenhuma tarefa adicionada</h3>
      ) : (
        <>
          <div className={styles.content}>
            <label>Tarefas Pendentes</label>
            <ul>
              {todoList.map((task, index) => {
                if (!task.done)
                  return (
                    <TaskItem
                      key={task.id}
                      task={task}
                      index={index}
                      isDone={false}
                      openEdit={openEdit}
                      isEditing={isEditing}
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
                      key={task.id}
                      task={task}
                      index={index}
                      isDone
                      isEditing={isEditing}
                    />
                  );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
