import { FormEvent, useState } from "react";
import { Check } from "phosphor-react";
import { Checkbox } from "./Checkbox"
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado"
]

export function NewHabitForm() {

  const [ title, setTitle ] = useState('')
  const [ weekDays, setWeekDays ] = useState<number[]>([])
  
  async function handleCreateHabit(event: FormEvent) {
    event.preventDefault()

    //error handling:
    if (!title || weekDays.length == 0) {
      return
    }

    await api.post("/habits", {
      title, weekDays
    })

    setTitle('')
    setWeekDays([])

    alert("Hábito salvo com sucesso!")

  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  return (
    <form 
      className="w-full flex flex-col mt-6"
      onSubmit={handleCreateHabit}
    >
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento
      </label>

      <input
        type="text"
        id="title"
        placeholder="ex: Exercício, dormir bem, etc"
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        onChange={event => setTitle(event.target.value)}
        value={title}   //just to clear component after form submit; I already got it's value on the state with the onChange
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      {/* list of weekdays */}
      <div className="flex flex-col mt-3 gap-2">

        {
          availableWeekDays.map((weekday, i) => {
            return (
              <Checkbox 
                key={weekday}
                title={weekday}
                checked={weekDays.includes(i)}                     //just to clear component after form submit; I already got it's value on the state with the onChange
                // disabled  //not applicable
                // onCheckedChange={() => handleToggleWeekDay(i)}  //prop from Radix Checkbox
                onChange={() => handleToggleWeekDay(i)}            //prop from my custom component
              />
            )
          })
        }

      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}