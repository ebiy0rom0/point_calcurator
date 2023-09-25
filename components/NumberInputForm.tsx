import { FC } from "react";
import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField
} from "chakra-ui";

export const NumberInputForm: FC<Props & OptionalProps> = ({
  label,
  value,
  onChange,
  isReadOnly = false,
  format = defaultNumberFormat,
  labelSize = "sm",
  inputSize = "sm",
  w = "8.0em"
}) => (
  <FormControl onChange={ 
    (e: React.ChangeEvent<HTMLInputElement>) => { onChange(toNumeric(e.target.value)) }
  }>
    <FormLabel fontSize={ labelSize } mb={1}>
      { label }
    </FormLabel>
    <NumberInput 
      inputMode="numeric"
      value={ value }
      isReadOnly={ isReadOnly }
      format={ format }
      size={ inputSize }
      w={ w }
    >
      <NumberInputField />
    </NumberInput>
  </FormControl>
)

const defaultNumberFormat = (v: number | string): string => {
  if (typeof v === "number") {
    return v.toLocaleString();
  }
  return v;
}

const toNumeric = (locale: string): number => {
  return (+locale.replace(/,/g, ""))
}

type Size = "xs" | "sm" | "md" | "lg"

type Props = {
  label: string,
  value: number,
  onChange: (n: number) => void,
}

type OptionalProps = {
  isReadOnly?: boolean,
  format?: (value: string | number) => string,
  labelSize?: Size,
  inputSize?: Size,
  w?: number | string,
}