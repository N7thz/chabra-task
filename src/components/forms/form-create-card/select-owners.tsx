import { MultiSelect } from '@/components/multi-select'
import { useFormContext } from 'react-hook-form'
import { CreateCardProps } from '@/schemas/create-card-schema'
import { useQuery } from '@tanstack/react-query'
import { findManyUsers } from '@/actions/users/find-many-users'
import { Button } from '@/components/ui/button'
import { ChevronDown, RotateCw } from 'lucide-react'
import { queryKeys } from '@/utils/query-keys'
import { toast } from '@/components/toast'

type SelectOwnersProps = {
  selected: string[],
  onSelectionChange: (value: string[]) => void
}

export const SelectOwners = ({
  selected, onSelectionChange
}: SelectOwnersProps) => {

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.user.findMany(),
    queryFn: () => findManyUsers({
      select: {
        id: true,
        name: true
      }
    })
  })

  if (error) {
    return (
      toast({
        title: error.name,
        description: error.message,
        variant: "destructive",
        duration: Infinity,
        closeButton: true,
        action: {
          label: (
            <span className="flex items-center gap-2 group">
              Tentar novamente
              <RotateCw className="size-3 group-hover:rotate-180 transition-transform" />
            </span>
          ),
          onClick: () => refetch()
        }
      })
    )
  }

  if (!data || isLoading) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled
        className={"w-full justify-between h-auto text-muted-foreground"}
      >
        Selecione um responsavel
        <ChevronDown />
      </Button>
    )
  }

  const users = data.map(({ id, name }) => ({
    value: id,
    label: name
  }))

  return (
    <MultiSelect
      name="owners"
      id="owners-select"
      description="Escolha um ou mais responsáveis"
      options={users}
      selected={selected}
      onSelectionChange={onSelectionChange}
      placeholder="Clique para selecionar os responsáveis..."
    />
  )
}