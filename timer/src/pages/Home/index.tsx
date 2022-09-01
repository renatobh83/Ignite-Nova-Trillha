import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { HandPalm, Play } from "phosphor-react";
import { CountDown } from "./CountDown";
import { NewCycleForm } from "./NewCycleForm";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { CycleContext } from "../../contexts/CycleContext";

interface INewCycleForm {
  task: string;
  minutesAmount: number;
}

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CycleContext);
  const newCycleForm = useForm<INewCycleForm>();
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: INewCycleForm) {
    createNewCycle(data);
    reset();
  }
  const task = watch("task");
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={!task}>
            <Play size={24} />
            começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
