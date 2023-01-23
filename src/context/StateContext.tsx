import { createContext, ReactNode, SetStateAction, useContext, useState } from "react"

const Context = createContext<any>(undefined);

export default function StateContext({ children }: any) {

    const [cartValue, setCartValue] = useState<string>('');
    const [deliveryDistance, setDeliveryDistance] = useState<string>('');
    const [numberOfItems, setNumberOfItems] = useState<string>('');

    const date = new Date().getTime() + 0 * 60 * 60 * 1000;
    const [orderTime, setOrderTime] = useState<any>(new Date(date));


    const validateInput = (state: SetStateAction<any>, type: string | string[],
        setErrorMessageState: SetStateAction<any>) => {
        let parsedInput = state;

        switch (type) {
            case 'int': parsedInput = parseInt(state); break;
            case 'float': parsedInput = parseFloat(state); break;
            case 'fixed': parsedInput = parseFloat(state).toFixed(2); break;
            case 'date': parsedInput = new Date(state.getTime() + 0 * 60 * 60 * 1000); break;
        }
        if (!isNaN(parsedInput) && parsedInput !== undefined && parsedInput !== null
        ) {
            setErrorMessageState('');
            return parsedInput;
        } else {
            setErrorMessageState('Please type a number.');
        }

    }


    //calculator values
    const cartValueSurchargeLimit = 10; //add surcharge
    const freeDeliveryAmount = 100;
    const distanceBaseFee = 2;
    const firstDistanceFeeMeters = 1000;
    const addDistanceFeeEveryMeters = 500;
    const numberOfItemsSurchargeStart = 5; //start adding surcharge at 5 items
    const numberOfItemsSurchargeAmount = 0.50;
    const rushHourDay = 5; //5 = friday, 6 = saturday, etc.
    const rushHourStart = 15; //15:00
    const rushHourEnd = 19; //19:00
    const rushHourMultiplier = 1.2;
    const maxDeliveryFee = 15;

    const [cartValueErrorMessage, setCartValueErrorMessage] = useState<string>('');
    const [deliveryDistanceErrorMessage, setDeliveryDistanceErrorMessage] = useState<string>('');
    const [numberOfItemsErrorMessage, setNumberOfItemsErrorMessage] = useState<string>('');
    const [orderTimeErrorMessage, setOrderTimeErrorMessage] = useState<string>('');
    const [deliveryFeeErrorMessage, setDeliveryFeeErrorMessage] = useState<string>('');

    const [deliveryFee, setDeliveryFee] = useState<number>();

    const calculateDeliveryFee = () => {
        let parsedCartValue = validateInput(cartValue, 'float', setCartValueErrorMessage);
        let parsedDeliveryDistance = validateInput(deliveryDistance, 'int', setDeliveryDistanceErrorMessage);
        let parsedNumberOfItems = validateInput(numberOfItems, 'int', setNumberOfItemsErrorMessage);
        let parsedOrderTime = validateInput(orderTime, 'date', setOrderTimeErrorMessage);


        let fee = 0;

        if (parsedCartValue >= freeDeliveryAmount) {
            return setDeliveryFee(0)
        }
        if (parsedCartValue < cartValueSurchargeLimit) {
            fee += cartValueSurchargeLimit - parsedCartValue;
        }
        if (parsedDeliveryDistance <= firstDistanceFeeMeters) {
            fee += distanceBaseFee;
        }
        if (parsedDeliveryDistance > firstDistanceFeeMeters) {
            fee += distanceBaseFee + Math.ceil((parsedDeliveryDistance - firstDistanceFeeMeters)
                / addDistanceFeeEveryMeters)
        }
        if (parsedNumberOfItems >= numberOfItemsSurchargeStart) {
            fee += (parsedNumberOfItems - numberOfItemsSurchargeStart + 1)
                * numberOfItemsSurchargeAmount;
        }
        if (parsedOrderTime.getDay() === rushHourDay &&
            parsedOrderTime.getHours() >= rushHourStart &&
            parsedOrderTime.getHours() < rushHourEnd) {
            fee *= rushHourMultiplier;
        }

        fee > maxDeliveryFee ? fee = maxDeliveryFee : fee;

        setDeliveryFee(validateInput(fee, 'fixed', setDeliveryFeeErrorMessage))

        console.log(parsedCartValue, parsedDeliveryDistance, parsedNumberOfItems, parsedOrderTime, fee)

    }


    return (
        <Context.Provider
            value={{
                deliveryFee,
                setDeliveryFee,
                cartValue,
                setCartValue,
                deliveryDistance,
                setDeliveryDistance,
                numberOfItems,
                setNumberOfItems,
                orderTime,
                setOrderTime,
                calculateDeliveryFee,
                cartValueErrorMessage,
                deliveryDistanceErrorMessage,
                numberOfItemsErrorMessage,
                orderTimeErrorMessage,
                setCartValueErrorMessage,
                setDeliveryDistanceErrorMessage,
                setNumberOfItemsErrorMessage,
                setOrderTimeErrorMessage,
                deliveryFeeErrorMessage
            }}
        >
            {children}
        </Context.Provider>
    )
}

export function useStateContext() {
    return useContext(Context);
}