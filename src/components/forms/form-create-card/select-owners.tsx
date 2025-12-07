import { MultiSelect } from '@/components/multiselect'
import { useState } from 'react'
import { Option } from '@/components/multiselect'
import { useFormContext } from 'react-hook-form'
import { CreateCardProps } from '@/schemas/create-card-schema'
import { useQuery } from '@tanstack/react-query'
import { findManyUsers } from '@/actions/users/find-many-users'
import { Button } from '@/components/ui/button'

export const SelectOwners = () => {

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
      setValueInput={`ownersId`}
    />
  )
}
