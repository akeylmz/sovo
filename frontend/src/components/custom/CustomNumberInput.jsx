import { NumericFormat } from 'react-number-format'

function CustomNumberInput({ field, form, decimalScale, disabled }) {
  const { setFieldValue, setFieldTouched } = form

  return (
    <NumericFormat
      className='field-control'
      onValueChange={(e) => setFieldValue(field.name, e.floatValue)}
      value={disabled ? '' : field.value}
      placeholder='0,00'
      thousandSeparator='.'
      decimalSeparator=','
      decimalScale={decimalScale ? decimalScale : 2}
      fixedDecimalScale
      onBlur={() => setFieldTouched(field.name, true)}
      disabled={disabled}
    />
  )
}

export default CustomNumberInput
