/* eslint-disable @typescript-eslint/no-explicit-any */
interface SwapData {
  fromValue: string | null;
  fromToken: string;
  toValue: string | null;
  toToken: string;
}

type FormFieldProps = {
  className: string;
  placeholder: string;
  name: string;
  register: any;
  valueAsNumber: boolean;
};

type Token = {
  currency: string;
  date?: Date;
  price: number;
};

interface ChainSelectorProps {
  chains: Token[];
  currentChain: Token | null;
  click?: (token: string, price: number) => void;
}
