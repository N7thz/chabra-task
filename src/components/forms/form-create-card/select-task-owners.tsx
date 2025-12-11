import { findManyUsers } from '@/actions/users/find-many-users'
import { MultiSelect, Option } from '@/components/multiselect'
import { Button } from '@/components/ui/button'
import { CreateCardProps } from '@/schemas/create-card-schema'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const SelectTaskOwners = ({ index }: { index: number }) => {

  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["find-many-users"],
    queryFn: () => findManyUsers({
      select: {
        id: true,
        name: true
      }
    })
  })

  const { setValue } = useFormContext<CreateCardProps>()

  const [owners, setOwners] = useState<Option[]>([])

  if (!data || isLoading) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className={"w-full justify-start h-auto text-muted-foreground"}
      >
        Selecione um responsavel
      </Button>
    )
  }

  const users = data.map(({ id, name }) => ({
    value: id,
    label: name
  }))

  return (
    <MultiSelect
      options={users}
      owners={owners}
      setOwners={setOwners}
      setValue={setValue}
      setValueInput={`tasks.${index}.ownersId`}
    />
  )
}
