import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import FormField from "@/components/ui/text-input";
import { Noise } from "@/components/ui/noice";
import Switch from '../../public/assets/img/change.svg';
import RawIcon from "@/components/ui/icon";
import usePrice from "@/hooks/usePrice";
import ChainSelector from "@/components/chainSelector/chain-selector";
import Cancel from '../../public/assets/img/cancel.svg'
import Done from '../../public/assets/img/done.svg'

const SwapPage: React.FC = () => {
    const [balance, setBalance] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean | null>(null)
    const price = usePrice();

    const { control, handleSubmit, setValue, watch } = useForm({
        mode: "onSubmit",
        defaultValues: {
            fromToken: 'OKB',
            fromValue: '',
            fromPrice: 42.97562059322034,
            toToken: '',
            toValue: '',
            toPrice: 0,
        }
    });

    const values = watch();
    const fromInputRef = useRef<HTMLInputElement | null>(null);
    const toInputRef = useRef<HTMLInputElement | null>(null);


    const switchSwap = () => {
        document.body.querySelector('.switch')?.classList.remove('rotate');
        setTimeout(function () { document.body.querySelector('.switch')?.classList.add('rotate') }, 0);
        const { fromPrice, fromToken } = values
        setValue('fromPrice', values.toPrice);
        setValue('fromToken', values.toToken);
        setValue('toPrice', fromPrice);
        setValue('toToken', fromToken);
    };

    const selectToken = (token: string, price: number, typeSelect: "FROM" | "TO") => {
        switch (typeSelect) {
            case "FROM":
                if (token === values.toToken) {
                    if (values.fromToken !== '') {
                        setValue("toToken", values.fromToken);
                        setValue("toPrice", values.fromPrice);
                    } else {
                        setValue("toToken", '');
                        setValue("toPrice", 0);
                    }
                    setValue("fromToken", token);
                    setValue("fromPrice", price);
                } else {
                    setValue("fromToken", token);
                    setValue("fromPrice", price);
                }
                break;
            case "TO":
                if (token === values.fromToken) {
                    if (values.toToken !== '') {
                        setValue("fromToken", values.toToken);
                        setValue("fromPrice", values.toPrice);
                    } else {
                        setValue("fromToken", '');
                        setValue("fromPrice", 0);
                    }
                    setValue("toToken", token);
                    setValue("toPrice", price);
                } else {
                    setValue("toToken", token);
                    setValue("toPrice", price);
                }
                break;
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {
        setLoading(true);
        console.log(data)
        setTimeout(function () { setLoading(false), setValue("fromValue", ''), setValue("toValue", ''), setResult(true); }, 3000);

    };

    const handleClickMax = () => {
        setValue('fromValue', balance)
        if (values.toToken !== '') {
            const toValue = String((parseFloat(balance) * values.toPrice / values.fromPrice).toFixed(6));
            setValue('toValue', parseFloat(toValue) === 0 ? '0' : toValue);
        }
    }

    useEffect(() => {
        if (values.fromToken === 'OKB') {
            setBalance('1000');
        }
        else {
            setBalance('0')
        }
    }, [values.fromToken]);

    useEffect(() => {
        if (document.activeElement === fromInputRef.current) {
            if (values.toToken !== "") {
                const toValue = values.fromValue ? String((parseFloat(values.fromValue) * values.toPrice / values.fromPrice).toFixed(6)) : '';
                setValue('toValue', parseFloat(toValue) === 0 ? "0" : toValue);
            }
        }

        if (document.activeElement === toInputRef.current) {
            if (values.fromToken !== "" && values.toToken !== "") {
                const fromValue = values.toValue ? String((parseFloat(values.toValue) * values.fromPrice / values.toPrice).toFixed(6)) : '';
                setValue('fromValue', parseFloat(fromValue) === 0 ? '0' : fromValue);
            }
        }
    }, [values.fromValue, values.toValue, values.fromToken, values.fromPrice]);

    useEffect(() => {
        if (values.toToken !== "") {
            const toValue = values.fromValue !== '' && values.fromValue !== '0' ? String((parseFloat(values.fromValue) * values.toPrice / values.fromPrice).toFixed(6)) : '0';
            setValue('toValue', parseFloat(toValue) === 0 ? '' : toValue);
        }
    }, [values.toToken, values.fromToken]);

    useEffect(() => {
        result !== null && setTimeout(() => {
            setResult(null)
        }, 3000);
    }, [result])

    return (
        <div className="flex w-full justify-center">
            <form className="relative w-[600px] z-50 bg-neutral-900 p-5 bg-opacity-60 backdrop-blur-xl rounded-lg" onSubmit={handleSubmit(onSubmit)}>
                <Noise />
                <div className="z-10 h-full w-full flex flex-col justify-between">
                    <h5 className="text-4xl font-bold text-sky-300 w-full text-center">Swap</h5>
                    <div className="flex flex-col gap-6 relative">
                        <div className="rounded overflow-hidden py-5 h-32">
                            <span className="text-slate-200">From</span>
                            <div className="flex gap-2">
                                <Controller
                                    name="fromValue"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            className="bg-transparent font-bold text-4xl text-blue-300 focus:outline-none"
                                            placeholder="0"
                                            {...field}
                                            ref={fromInputRef}
                                        />
                                    )}
                                />

                                <ChainSelector key="Selector1" chains={price} currentChain={{ currency: values.fromToken, price: values.fromPrice }} click={(token, price) => selectToken(token, price, "FROM")} />
                            </div>

                            <div className="h-4 flex justify-between text-slate-500 mt-2 font-black text-xs">
                                {balance && (
                                    <>
                                        <div>{values.fromValue !== '' ? `≈$${(parseFloat(values.fromValue) * values.fromPrice).toFixed(6)}` : ''} </div>
                                        <div className="flex gap-2"><span>Balance: {balance} {values.fromToken}</span><button type="button" className="hover:text-blue-300 duration-300" onClick={handleClickMax}>(Max)</button></div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="divider left-0"></div>
                        <button type="button" className="switch" onClick={switchSwap}>
                            <RawIcon className="bg-slate-200" src={Switch} size={24} />
                        </button>
                        <div className="divider right-0"></div>

                        <div className="rounded overflow-hidden py-5 h-28">
                            <span className="text-slate-200">To</span>
                            <div className="flex gap-2">
                                <Controller
                                    name="toValue"
                                    control={control}
                                    render={({ field }) => (
                                        <FormField
                                            className="bg-transparent font-bold text-4xl text-blue-300 focus:outline-none"
                                            placeholder="0"
                                            {...field}
                                            ref={toInputRef}
                                        />
                                    )}
                                />
                                <ChainSelector key="Selector2" chains={price} currentChain={{ currency: values.toToken, price: values.toPrice }} click={(token, price) => selectToken(token, price, "TO")} />
                            </div>
                        </div>
                    </div>
                    <button disabled={loading || values.toToken === '' || !values.fromValue || !values.toValue || parseFloat(values.fromValue) > parseFloat(balance) || values.fromValue === '' || values.fromValue === '0'} className="w-full bg-sky-300 h-12 rounded font-bold disabled:bg-sky-300 disabled:bg-opacity-65 duration-200" type="submit">{loading ? 'LOADING...' : values.fromValue !== '' && parseFloat(values.fromValue) > parseFloat(balance) ? `${values.fromToken} not enough to swap` : 'CONFIRM SWAP'}</button>

                    <div className={`${values.toToken !== "" && values.fromToken !== "" ? 'h-4' : 'h-0'} duration-300 flex justify-between text-slate-500 mt-6`}>
                        {
                            values.toToken !== "" && values.fromToken !== "" && <div className="flex gap-2 font-black text-xs"><span>1 {values.fromToken} = {`${(values.toPrice / values.fromPrice).toFixed(10)} ${values.toToken}`} </span></div>
                        }
                    </div>
                </div>

                <div className={`absolute w-full ${result !== null ? 'h-12' : 'h-0'} left-0 translate-y-full -bottom-2 overflow-hidden rounded duration-300 text-white font-black`}>
                    {result === true && <div className="flex gap-2 bg-green-600 w-full h-full items-center p-4"><img className="h-8 w-8" src={Done} /> <span>Swap success</span> </div>}
                    {result !== null && result === false && <div className="flex gap-2 bg-red-600 w-full h-full items-center p-4"><img className="h-8 w-8" src={Cancel} /><span>Swap failed</span></div>}
                </div>
            </form >
        </div >
    );
}

export default SwapPage;
