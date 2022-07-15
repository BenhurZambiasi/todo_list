import React from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleDone, deleteTask } from "../../redux/todoSlice";
import styles from "./styles.module.scss";

interface ITaskItem {
  name: string;
  done: boolean;
  id: number;
}

interface ITask {
  task: ITaskItem;
  index: number;
  openEdit?: (task: ITaskItem) => void;
  isDone: boolean;
  isEditing: boolean;
}

const TaskItem: React.FC<ITask> = ({
  task,
  index,
  isDone,
  isEditing,
  openEdit,
}: ITask) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.content}>
      <input
        type="checkbox"
        disabled={isEditing ? true : false}
        checked={task.done ? true : false}
        defaultChecked={task.done}
        onClick={() => dispatch(toggleDone(task))}
      />
      <span className={task.done ? styles.done : ""}>{task.name}</span>
      {!isEditing && (
        <div className={styles.actions}>
          {!isDone && (
            <FiEdit
              onClick={() => openEdit && openEdit(task)}
              size={16}
              color="var(--blue-700)"
            />
          )}
          <FiTrash
            onClick={() => dispatch(deleteTask(index))}
            color="var(--red-900)"
          />
        </div>
      )}
    </li>
  );
};

export default TaskItem;
