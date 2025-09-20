import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx'

interface Props {
  placeholder?: string
  data: {
    value: string
    label: string
  }[]
  value?: string
  className?: string
  disabled?: boolean
  onChangeValue?: (value: string) => void
  defaultValue?: string
}

export const SelectCustom = ({
  disabled,
  className,
  value,
  onChangeValue,
  placeholder,
  defaultValue,
  data,
}: Props) => {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChangeValue}
      disabled={disabled}
    >
      <SelectTrigger className={`focus-visible:ring-0 text-black ${className}`}>
        <SelectValue className={''} placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem key={item.value.toString()} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
