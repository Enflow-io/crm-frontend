import {Form, Input, Spin, Tooltip} from "antd";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {InfoCircleOutlined, UserOutlined} from '@ant-design/icons';
import Api from "../../../services/Api";
import debounce from "lodash/debounce";
import {FormInstance} from "antd/lib/form/hooks/useForm";

interface PriceInputProps {
    onChange?: (newPrice: any) => void
    value?: any
    setFieldsValue: (params: any) => void
    currency: string
    id?: string
    disabled?: boolean
}
function useStateCallback(initialState: any) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks

    const setStateCallback = useCallback((state, cb) => {
        cbRef.current = cb; // store current, passed callback in ref
        setState(state);
    }, []); // keep object reference stable, exactly like `useState`

    useEffect(() => {
        // cb.current is `null` on initial render,
        // so we only invoke callback on state *updates*
        if (cbRef.current) {
            // @ts-ignore
            cbRef.current(state);
            cbRef.current = null; // reset callback after execution
        }
    }, [state]);

    return [state, setStateCallback];
}

const PriceInput = (props: PriceInputProps) => {

    const isDisabled = props?.disabled === true;
    const currencies = ['RUB', 'USD', 'EUR'];
    const symbols = {
        RUB: '₽',
        USD: '$',
        EUR: '€',
    }

    const [currency, setCurrency] = useState<string>()


    const [dontUpdateAmounts, setDontUpdateAmounts] = useState(false)



    const [rates, setRates] = useState<any>({})


    const [amountState, setAmountState] = useStateCallback(undefined)

    const [amounts, setAmounts] = useState<any>({})
    const [isAmountsLoaded, setIsAmountsLoaded] = useState(false)


    const getAmount = async (amount: any, currency: string, rates: any) => {

        setIsAmountsLoaded(false)
        if (!amount) {
            let newAmounts: any = {}
            for (let nextCurrency of currencies) {
                newAmounts[nextCurrency] = undefined;
            }
            setAmounts(newAmounts);
            setIsAmountsLoaded(true);
            return;
        } else {
            let newAmounts: any = {}
            let newRates: any = {}

            for (let nextCurrency of currencies) {
                if (currency === nextCurrency) {

                    newAmounts[nextCurrency] = amount;


                } else {
                    const data = await Api.convertPrice(currency, nextCurrency, amount)

                    if (data.data.error) {
                        const newAmount = undefined;
                        newAmounts[nextCurrency] = newAmount;

                    } else {
                        const newAmount = data.data.result.toFixed(2)
                        newAmounts[nextCurrency] = newAmount;
                        newRates = data.data.rates;

                        // if(nextCurrency === 'RUB'){
                        //     if (!newRates[currency]) {
                        //         newRates[currency] = {}
                        //     }
                        //     newRates[currency][nextCurrency] = data.data.price.toFixed(2);
                        //
                        // }else{
                        //     if (!newRates[nextCurrency]) {
                        //         newRates[nextCurrency] = {}
                        //     }
                        //     newRates[nextCurrency][currency] = data.data.price.toFixed(2);
                        //
                        // }

                    }

                }

            }
            setAmounts(newAmounts);
            // console.log(rates)
            // console.log(newRates)
            // debugger
            setRates({...rates, ...newRates});
            // console.log(newRates)

            setIsAmountsLoaded(true);

        }
    }

    const debounceGetAmount = React.useMemo(() => {
        return debounce(getAmount, 500);
    }, []);



    // first effect
    useEffect(()=>{
        setAmountState(props.value)
    }, [props.value])


    useEffect(()=>{
        if(currency){
            setDontUpdateAmounts(true)
        }
        // console.log(amounts)
        // setAmountState(amounts[props.currency] || props.value, ()=>{
        //     setDontUpdateAmounts(false)
        // })


        setAmountState(amounts[props.currency] || props.value, ()=>{
            setDontUpdateAmounts(false)

        })

        setCurrency(props.currency)
    }, [props.currency]);

    useEffect(() => {
        if(!currency){
            return;
        }
        // console.log(dontUpdateAmounts)
        // console.log(isAmountsLoaded)
        if(!dontUpdateAmounts){
            debounceGetAmount(amountState, currency, rates);
        }
    }, [amountState, currency]);


    const onChange = (newVal: any, currency: string) => {
        setAmountState(newVal.target.value)
        if(props.onChange){
            props.onChange(newVal.target.value)
        }

        // props.setFieldsValue({
        //     [name + 'Amount']: newVal.target.value
        // })

    };




    return <div id={props.id}>
        {currencies.map(curr => {
            // @ts-ignore
            const symb = symbols[curr];
            const title = curr !== 'RUB' ? `${symb}1 = ₽${rates['RUB']?.[curr].toFixed(2)}` : ``


            const isBaseCurrency = currency === curr;

            const finalAmount = amounts[curr];
            return <Input id={props.id+'_'+curr} key={curr} style={{width: 150, marginRight: '1em'}}

                          placeholder="0.00"
                // @ts-ignore
                          prefix={(isAmountsLoaded || isBaseCurrency) ? <span>{symbols[curr]}</span> :
                              <Spin size={'small'}/>}
                          disabled={isDisabled || !isBaseCurrency}
                          value={isBaseCurrency ? amountState : finalAmount}
                          // value={finalAmount}
                          onChange={(e) => {
                              onChange(e, curr)
                          }
                          }
                          suffix={title ?
                              <Tooltip title={title}>
                                  <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                              </Tooltip> : null
                          }
            />

        })}


    </div>
}


export default PriceInput