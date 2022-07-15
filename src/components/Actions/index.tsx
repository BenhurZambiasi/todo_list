import React from "react";
import styles from "./styles.module.scss";

interface IActionsProps {
  onChangeName: (value: string) => void;
  inputValue: string;
  edit: boolean;
  handleCacelarEdicao: () => void;
  handleClickAction: () => void;
}
const Actions: React.FC<IActionsProps> = ({
  onChangeName,
  inputValue,
  edit,
  handleCacelarEdicao,
  handleClickAction,
}) => {
  return (
    <div className={styles.actions}>
      <input
        type="text"
        onChange={({ target }) => onChangeName(String(target.value))}
        value={inputValue}
        placeholder="Digite a descrição"
      />
      <button
        style={{
          backgroundColor: edit ? "var(--blue-900)" : "var(--green-900)",
        }}
        onClick={handleClickAction}>
        {edit ? "Editar tarefa" : "Adicionar nova tarefa"}
      </button>
      {edit && (
        <button
          style={{
            backgroundColor: "var(--red-900)",
          }}
          onClick={handleCacelarEdicao}>
          Cancelar
        </button>
      )}
    </div>
  );
};

export default Actions;
