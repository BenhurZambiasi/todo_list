import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import styles from "./styles.module.scss";

interface ITaskItem {
  name: string;
  done: boolean;
  id: number;
}

interface ITask {
  task: ITaskItem;
  index: number;
  checkDone: (task: ITaskItem, index: number) => void;
  openEdit?: (task: ITaskItem) => void;
  removeTask: (index: number) => void;
  isDone: boolean;
}

const TaskItem: React.FC<ITask> = ({
  task,
  index,
  isDone,
  openEdit,
  checkDone,
  removeTask,
}: ITask) => {
  return (
    <li key={task.id} className={styles.content}>
      <input
        type="checkbox"
        checked={task.done}
        onClick={() => checkDone(task, index)}
      />
      <span className={task.done ? styles.done : ""}>{task.name}</span>
      <div className={styles.actions}>
        {!isDone && (
          <FiEdit
            onClick={() => openEdit && openEdit(task)}
            size={16}
            color="var(--blue-700)"
          />
        )}
        <FiTrash onClick={() => removeTask(index)} color="var(--red-900)" />
      </div>
    </li>
  );
};

export default TaskItem;
