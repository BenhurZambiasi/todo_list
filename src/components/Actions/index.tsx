import React from "react";
import styles from "./styles.module.scss";

interface IActionsProps {
  onChangeName: (value: string) => void;
  handleFocus: () => void;
  inputValue: string;
  error: string;
  edit: boolean;
  handleCacelarEdicao: () => void;
  handleClickAction: () => void;
}
const Actions: React.FC<IActionsProps> = ({
  onChangeName,
  inputValue,
  edit,
  error,
  handleCacelarEdicao,
  handleClickAction,
  handleFocus,
}) => {
  return (
    <div className={styles.actions}>
      <div className={styles.input}>
        <input
          type="text"
          placeholder="Digite a descrição"
          value={inputValue}
          onFocus={handleFocus}
          onChange={({ target }) => onChangeName(String(target.value))}
        />
        <span>{error}</span>
      </div>
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
