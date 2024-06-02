import React from 'react';
import { Field, FieldProps } from 'formik';
import { getCountries } from 'react-phone-number-input/input';
import Select from 'react-select';
import 'react-phone-number-input/style.css';
import { get as getCountryFlagEmoji } from 'country-flag-emoji';
import { cn } from '@/utils/helpers';
import styled from '@emotion/styled';

interface CountrySelectProps extends FieldProps {
    labels: Record<string, string>;
  }
  
  interface CountryOption {
    value: string;
    label: string;
  }

  const StyledSelect = styled(Select)`
  > input {
    width: 100%;
  }
      .css-13cymwt-control {
        border-width: 0px;
        width: 100% !important;
        outline: none;
      }

      .css-1dimb5e-singleValue {
        border-width: 0px !important;
      }

      .css-1fdsijx-ValueContainer {
        width: 100% !important;
        outline: none;
        background-color: red;
        border-width: 0px;
      }

      .css-1xc3v61-indicatorContainer {

      }


  `
  
  const getCountryOptions = (labels: Record<string, string>): CountryOption[] => {
    return getCountries().map((country) => ({
      value: country,
      label: `${((getCountryFlagEmoji(country)) as unknown as  {emoji: any}).emoji} ${labels[country]}`,
    }));
  };
  
  const CountrySelect: React.FC<CountrySelectProps> = ({ field, form, labels, ...rest }) => {
    const options = getCountryOptions(labels);
  
    const handleChange = (option: CountryOption | null | any) => {
      form.setFieldValue(field.name, option ? option.value : '');
    };
  
    return (
      <StyledSelect
        {...rest}
        options={options}
        value={options.find(option => option.value === field.value)}
        onChange={handleChange}
        placeholder={labels['ZZ']}
        className={cn(`w-full border h-16 items-center flex ring-0 outline-none rounded-lg`)}
        // isClearable
      />
    );
  };
  
  interface CountrySelectFieldProps {
    name: string;
    labels: Record<string, string>;
    [key: string]: any;
  }
  
 const CountrySelectField: React.FC<CountrySelectFieldProps> = ({ name, labels, ...rest }) => (
    <Field name={name}>
      {(fieldProps: FieldProps) => <CountrySelect {...fieldProps} labels={labels} {...rest} />}
    </Field>
  );
  
  export default CountrySelectField;


