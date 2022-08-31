import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "..";
import { CountDownContainer, Separator } from "./styles";

export function CountDown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPast,
    setSecondsPast,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (secondsDiff >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPast(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPast(secondsDiff);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished]);

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPast : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
