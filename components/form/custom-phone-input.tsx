import React from 'react'
import PhoneInput from 'react-phone-number-input'
import styled from '@emotion/styled'
import 'react-phone-number-input/style.css'
import { ErrorMessage, useFormikContext } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import FormError from './form-error-component'



export const StyledInput = styled(PhoneInput)`
  input {
    border-color: #818181 !important;
    border-width: 1;
    outline: none;
    
  }
  background-color: #fff;

  input[type='tel']:focus {
    outline: none;
    box-shadow: none;
    border-color: #d9d9d9 !important;
    border-width: 1 !important;
  }
  padding-left: 10px;
`

const CustomPhoneInput: React.FC<{ name: string; text?: string, disabled?: boolean }> = ({
  name,
  disabled,
  text = 'Phone'
}) => {
  const { getFieldProps, handleBlur, setFieldValue, getFieldMeta } =
    useFormikContext()

  const fieldProps = getFieldProps(name!)
  const { error, touched } = getFieldMeta(name!)

  if (!fieldProps) {
    return null
  }

  const { value } = fieldProps

  const handleChange = (value: any) => {
    const stringValue =
      value === undefined || value === null ? '' : String(value)
    setFieldValue(name, stringValue || '')
  }

  return (
    <div className="-translate-y-2">
       {text && text.trim().length > 0 && (
        <label
          htmlFor={name}
          className="ml-1 font-semibold text-lg mb-0.5 text-black"
        >
          {text}
        </label>
      )}
      <div
      className='mb-2'
      >
       
        <div className="relative focus-within:border-s_blue border rounded-[0.625rem] overflow-hidden border-[#818181] h-[64px] flex items-center">
          <StyledInput
            name={name}
            international
            defaultCountry="NG"
            countryCallingCodeEditable={false}
            onChange={handleChange}
            value={value}
            onBlur={handleBlur}
            readOnly={disabled}
            className={`px-2 py-3 w-full`}
          />
        </div>
      </div>
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}

export default CustomPhoneInput
