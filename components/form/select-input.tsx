import React, { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { ConfigProvider, Select, SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import { BaseOptionType } from "antd/es/select";
import { ErrorMessage, useFormikContext } from "formik";
import FormError from "./form-error-component";
import { Option } from "antd/es/mentions";
import { getCountries } from "react-phone-number-input/input";
import { get as getCountryFlagEmoji } from "country-flag-emoji";
import en from "react-phone-number-input/locale/en";
import { SearchOutlined } from '@ant-design/icons';
import { FiCheck } from 'react-icons/fi';

interface CountryOption {
  value: string;
  label?: string;
  key?: string;
}

const getCountryOptions = (labels: Record<string, string>): CountryOption[] => {
  return getCountries().map((country) => ({
    value: `${
      (getCountryFlagEmoji(country) as unknown as { emoji: any }).emoji
    }&nbsp;&nbsp; ${labels[country]}`,
    key: country,
    label: `${
      (getCountryFlagEmoji(country) as unknown as { emoji: any }).emoji
    } ${labels[country]}`,
  }));
};

export type ISelect = Omit<
  SelectProps<unknown, BaseOptionType | DefaultOptionType>,
  "mode" | "getInputElement" | "getRawInputElement" | "backfill" | "placement"
> & {
  name: string;
  option: { key: string; value: string; label: string }[];
  placeholder?: string;
  overide?: boolean;
};

const StyledSelect = styled(Select)`
  #blinker {
    color: transparent;
    text-shadow: 0 0 0 gray;
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    .ant-select-item-option-selected {
        background-color: #f0f8ff !important; /* Your desired background color */
        font-weight: bold; /* Optional: Make the font bold */
      }
  }

  .popupClassName {
    .ant-select-item-option-selected {
      color: red !important;
    }
    
  }

  && {
    height: 64px !important;

    .ant-select-selector {
      border: none !important;
      outline: none !important;
    }

    .ant-select-selection-search {
      position: relative;
    }
  }
`;

export const SelectInput: React.FC<ISelect> = ({
  name,
  option,
  placeholder,
  overide,
  ...rest
}) => {
  const {
    getFieldProps,
    handleBlur,
    getFieldMeta,
    isValidating,
    setFieldValue,
    setFieldTouched,
    values
  } = useFormikContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(option ?? getCountryOptions(en));
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [f, setF] = useState(false);
  
  const fieldProps = getFieldProps(name!);
  console.log(fieldProps.value)

  useEffect(() => {
    setFilteredOptions(
      (option ?? getCountryOptions(en)).filter((opt) =>
        opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, option]);

  if (!fieldProps) {
    return null;
  }

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "white"
      }
    }}
    >
    <div className="w-full">
      <div
        className={`focus-within:border-s_blue border-2 rounded-2xl overflow-hidden w-full h-[64px] flex items-center`}
      >
        <StyledSelect
          {...rest}
          id="blinker"
          loading={isValidating}
          onChange={
            !overide
              ? (e) => {
                  setFieldValue(name!, e);
                }
              : (e) => (rest as { onChange: (e: any) => void }).onChange(e)
          }
          size="large"
          onBlur={
            !overide
              ? (e) => {
                  handleBlur(e);
                  setFieldTouched(name!);
                }
              : (e) => (rest as { onBlur: (e: any) => void }).onBlur(e)!
          }
          className={`w-full h-full ring-transparent relative`}
          optionFilterProp="children"
          showSearch
          placeholder={placeholder}
          rootClassName="blinker"
          onSearch={setSearchTerm}
          filterOption={false}
          notFoundContent={null}
          onDropdownVisibleChange={(open) => {
            setDropdownVisible(open)
          }}
          
        >
          {filteredOptions.map((st) => (
            <Option
              className="border-b"
              key={st.key}
              value={st.key}
            >
              <div
                className="py-2 text-md flex items-center justify-between"
                dangerouslySetInnerHTML={{
                  __html: st.value,
                }}
              />
              {(fieldProps.value === st.key) && dropdownVisible && (
                <div className="absolute right-4 top-[50%] -translate-y-[50%]">
                  <FiCheck color='blue' />
                </div>
              )}
            </Option>
          ))}
        </StyledSelect>
      </div>
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
    </ConfigProvider>
  );
};
