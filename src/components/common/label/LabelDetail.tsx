interface Props {
  value: string | number
  label: string
  classNameValue?: string
  classNameLabel?: string
  className?: string
}
const LabelDetail = (props: Props) => {
  const { classNameLabel, label, value, className, classNameValue } = props
  return (
    <div className={` flex gap-4 items-center justify-between ${className}`}>
      <div className={`text-gray-500 text-sm ${classNameLabel}`}>{label}</div>
      <div className={`font-semibold text-primary text-sm ${classNameValue}`}>{value}</div>
    </div>
  )
}

export default LabelDetail
