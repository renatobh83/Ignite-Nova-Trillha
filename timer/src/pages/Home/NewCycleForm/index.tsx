import { useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CycleContext } from "../../../contexts/CycleContext";

import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm() {
  const { register } = useFormContext();
  const { activeCycle } = useContext(CycleContext);

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-suggestion"
        disabled={!!activeCycle}
        placeholder="De um nome para o seu projeto"
        {...register("task")}
      />
      <datalist id="task-suggestion">
        <option value="Projeto 1"></option>
        <option value="Projeto 2"></option>
        <option value="Projeto 3"></option>
        <option value="Projeto 4"></option>
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        disabled={!!activeCycle}
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register("minutesAmount", { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
