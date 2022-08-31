import { createContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { differenceInSeconds } from "date-fns";
import { HandPalm, Play } from "phosphor-react";

import { CountDown } from "./CountDown";
import { NewCycleForm } from "./NewCycleForm";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface INewCycleForm {
  task: string;
  minutesAmount: number;
}
interface CycleContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPast: number;
  setSecondsPast: (seconds: number) => void;
}

export const CycleContext = createContext({} as CycleContextData);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPast, setAmountSecondsPast] = useState(0);

  const newCycleForm = useForm<INewCycleForm>();
  const { handleSubmit, watch, reset } = newCycleForm;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  function setSecondsPast(seconds: number) {
    setAmountSecondsPast(seconds);
  }
  const task = watch("task");

  const onSubmitForm = (data: INewCycleForm) => {
    const newCycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    // setCycles([...cycles, newCycle]);
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPast(0);
    reset();
  };
  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPast,
            setSecondsPast,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CycleContext.Provider>
        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
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
