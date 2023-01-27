import { createContext, ReactNode, useContext, useEffect, useState } from "react"

const Context = createContext<any>(undefined);

type StateContextProps = {
    children: ReactNode
}

export default function StateContext({ children }: StateContextProps) {

    const [cartValue, setCartValue] = useState<string>('1');
    const [deliveryDistance, setDeliveryDistance] = useState<string>('1');
    const [numberOfItems, setNumberOfItems] = useState<string>('1');

    const date = new Date(); //current date and time
    const [orderTimeDate, setOrderTimeDate] = useState<string>(
        new Date().toISOString().slice(0, 10));//Date in ISO format (YYYY-MM-DD)
    const [orderTimeHour, setOrderTimeHour] = useState<string>(
        new Date().toISOString().slice(11, 16)); //UTC Time in ISO format (HH:MM)

    const [deliveryFee, setDeliveryFee] = useState<string>('');

    //must be true to calculate
    const [isValidInputs, setIsValidInputs] = useState(false);

    //format date + time to unix time to be able to use Date.getDay() and Date.getHours()
    date.setDate(parseInt(orderTimeDate.slice(8, 10)));
    date.setUTCHours(parseInt(orderTimeHour.slice(0, 2)));
    date.setMinutes(parseInt(orderTimeHour.slice(3, 5)));

    //convert input strings to numbers / validate inputs
    const calculatorValues = {
        parsedCartValue: parseFloat(cartValue),
        parsedDeliveryDistance: parseInt(deliveryDistance),
        parsedNumberOfItems: parseInt(numberOfItems), //
        parsedOrderTimeDate: date.getDay(), //getDay() returns day of the week (0 = sunday, 1 = monday etc.)
        parsedOrderTimeHour: date.getHours(), //getHours() returns UTC time
    }

    const { parsedCartValue, parsedDeliveryDistance, parsedNumberOfItems,
        parsedOrderTimeDate, parsedOrderTimeHour } = calculatorValues;

    //calculator settings
    const cartValueSurchargeUntilEuros = 10; //add surcharge if cart value is less than 10
    const freeDeliveryEuros = 100; //free delivery if cart value is more than 100
    const distanceBaseFeeEuros = 2; //distance base fee for first 1km
    const distanceBaseFeeMeters = 1000; //distance base fee 
    const addDistanceFeeEveryMeters = 500; //add 0.50€ for every 500m
    const numberOfItemsSurchargeStart = 5; //start adding surcharge at 5 items
    const numberOfItemsSurchargeEuros = 0.50; //add 0.50€ for every item after 5
    const rushHourDay = 5; //5 = friday, 6 = saturday, 7 = sunday etc.
    const rushHourStart = 15; //15:00
    const rushHourEnd = 19; //19:00
    const rushHourMultiplier = 1.2; //20% surcharge for rush hour
    const maxDeliveryFeeEuros = 15; //max delivery fee is 15€

    const calculateDeliveryFee = () => {
        //reset delivery fee
        let fee = 0;

        //add surcharge if cart value is less than 10
        if (parsedCartValue < cartValueSurchargeUntilEuros) {
            fee += cartValueSurchargeUntilEuros - parsedCartValue;
        }
        //add distance base fee for first 1km
        if (parsedDeliveryDistance <= distanceBaseFeeMeters) {
            fee += distanceBaseFeeEuros;
        }
        //add 0.50€ for every 500m
        if (parsedDeliveryDistance > distanceBaseFeeMeters) {
            fee += distanceBaseFeeEuros + Math.ceil((parsedDeliveryDistance - distanceBaseFeeMeters)
                / addDistanceFeeEveryMeters)
        }
        //add 0.50€ for every item after 5
        if (parsedNumberOfItems >= numberOfItemsSurchargeStart) {
            fee += (parsedNumberOfItems - numberOfItemsSurchargeStart + 1)
                * numberOfItemsSurchargeEuros;
        }
        //20% surcharge for rush hour
        if (parsedOrderTimeDate === rushHourDay &&
            parsedOrderTimeHour >= rushHourStart &&
            parsedOrderTimeHour < rushHourEnd) {
            fee *= rushHourMultiplier;
        }
        //free delivery if cart value is more than 100
        if (parsedCartValue >= freeDeliveryEuros) {
            fee = 0;
        }
        //max delivery fee is 15€
        fee > maxDeliveryFeeEuros ? fee = maxDeliveryFeeEuros : fee;

        //round to 2 decimals
        let fixedFee = fee.toFixed(2);
        setDeliveryFee((prevFee) => fixedFee)
    }

    //valid input states
    const [isValidStates, setIsValidStates] = useState<any>([
        {
            isCartValueValid: false,
            isDeliveryDistanceValid: false,
            isNumberOfItemsValid: false,
            isOrderTimeDateValid: false,
            isOrderTimeHourValid: false
        }
    ])

    const { isCartValueValid, isDeliveryDistanceValid, isNumberOfItemsValid,
        isOrderTimeDateValid, isOrderTimeHourValid } = isValidStates;

    //set valid input states
    const setErrorStates = () => {
        parsedCartValue ? setIsValidStates((prevState: any) => ({
            ...prevState, isCartValueValid: true
        })) : setIsValidStates((prevState: any) => ({
            ...prevState, isCartValueValid: false
        }))
        parsedDeliveryDistance ? setIsValidStates((prevState: any) => ({
            ...prevState, isDeliveryDistanceValid: true
        })) : setIsValidStates((prevState: any) => ({
            ...prevState, isDeliveryDistanceValid: false
        }))
        parsedNumberOfItems ? setIsValidStates((prevState: any) => ({
            ...prevState, isNumberOfItemsValid: true
        })) : setIsValidStates((prevState: any) => ({
            ...prevState, isNumberOfItemsValid: false
        }))
        orderTimeDate ? setIsValidStates((prevState: any) => ({
            ...prevState, isOrderTimeDateValid: true
        })) : setIsValidStates((prevState: any) => ({
            ...prevState, isOrderTimeDateValid: false
        }))
        orderTimeHour ? setIsValidStates((prevState: any) => ({
            ...prevState, isOrderTimeHourValid: true
        })) : setIsValidStates((prevState: any) => ({
            ...prevState, isOrderTimeHourValid: false
        }))
    }

    //update error states after 200ms on every input change
    useEffect(() => {
        const setErrorStatesTimeout = setTimeout(() => {
            setErrorStates();
        }, 200)
        return () => {
            clearTimeout(setErrorStatesTimeout);
        }
    }, [cartValue, deliveryDistance, numberOfItems, orderTimeDate, orderTimeHour]);

    //set valid input states on every input change
    const setValidInputs = () => {
        //check if inputs are valid
        if (isCartValueValid && isDeliveryDistanceValid && isNumberOfItemsValid
            && isOrderTimeDateValid && isOrderTimeHourValid) {

            //can calculate delivery fee if all inputs are valid
            setIsValidInputs((prevState) => true);
        } else {
            setIsValidInputs((prevState) => false);

            //set delivery fee to empty string if inputs are not valid / hide delivery fee
            setDeliveryFee((prevFee) => '')
        }
    }

    //check if inputs are valid on every input change
    useEffect(() => {
        setValidInputs();
    }, [isValidStates])

    return (
        <Context.Provider
            value={{
                deliveryFee,
                setDeliveryFee,
                calculateDeliveryFee,
                cartValue,
                setCartValue,
                deliveryDistance,
                setDeliveryDistance,
                numberOfItems,
                setNumberOfItems,
                orderTimeDate,
                setOrderTimeDate,
                isValidInputs,
                setValidInputs,
                setIsValidInputs,
                calculatorValues,
                orderTimeHour,
                setOrderTimeHour,
                isValidStates,
                setIsValidStates,
                setErrorStates
            }}
        >
            {children}
        </Context.Provider>
    )
}

export function useStateContext() {
    return useContext(Context);
}