import { Button } from "@/components/ui/button"
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CreateCardProps } from "@/schemas/create-card-schema"
import { Check, ChevronDown, X } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import { UseFormSetValue } from "react-hook-form"

export type Option = {
  label: string, value: string
}

type MultiSelectProps = {
  options: Option[]
  owners: Option[],
  setOwners: Dispatch<SetStateAction<Option[]>>
  setValue: UseFormSetValue<CreateCardProps>
  setValueInput: "title" | "cnpj" | "description" | "status" | "term" | "color" | "ownersId" | "tasks" | `ownersId.${number}` | `tasks.${number}` | `tasks.${number}.term` | `tasks.${number}.ownersId` | `tasks.${number}.name` | `tasks.${number}.completed` | `tasks.${number}.ownersId.${number}`
}

export const MultiSelect = ({
  options,
  owners,
  setOwners,
  setValue,
  setValueInput
}: MultiSelectProps) => {

  function addOwenerToList({ label, value }: Option) {
    setOwners(oldData => {

      const exists = oldData.some(owner => owner.value === value)

      if (exists) {

        const ownersFilterd = oldData.filter(owner => owner.value !== value)

        setValue(setValueInput, ownersFilterd.map(owner => owner.value))

        return ownersFilterd
      }

      setValue(setValueInput, [...oldData.map(item => item.value), value])

      return [...oldData, { label, value }]
    })
  }

  function removeItemToList(value: string) {
    setOwners(oldData => {

      setValue(
        setValueInput,
        oldData
          .filter(owner => owner.value !== value)
          .map(owner => owner.value)
      )

      return oldData.filter(owner => owner.value !== value)
    })
  }

  const values = owners.map(({ value }) => value)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "w-full  h-auto",
            owners.length === 0
              ? "text-muted-foreground flex justify-between"
              : "whitespace-normal flex-wrap justify-start"
          )}
        >
          {
            owners.length === 0
              ? <>
                <span>
                  Selecione um responsavel
                </span>
                <ChevronDown />
              </>
              : owners.map(({ label, value }) => (
                <span
                  key={value}
                  onClick={() => removeItemToList(value)}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex items-center gap-1 group capitalize"
                >
                  {label}
                  <span
                    className="hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    <X size={14} />
                  </span>
                </span>
              ))
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex flex-col h-60 overflow-y-scroll w-104"
      >
        {
          options.map(({ label, value }) => {
            return (
              <Button
                key={value}
                type="button"
                variant={"ghost"}
                className="justify-between capitalize"
                onClick={() => addOwenerToList({ label, value })}
              >
                {label}
                {
                  values.includes(value) &&
                  <Check size={18} className="text-primary" />
                }
              </Button>
            )
          })
        }
      </PopoverContent>
    </Popover>
  )
}