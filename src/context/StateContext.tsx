import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

const Context = createContext<any>(undefined);

type StateContextProps = {
    children: ReactNode,
    cartValue: string,
    deliveryDistance: string,
    numberOfItems: string,
    orderTime: Date,
    deliveryFee: string,
}

export default function StateContext({ children }: StateContextProps) {

    const [cartValue, setCartValue] = useState<string>('');
    const [deliveryDistance, setDeliveryDistance] = useState<string>('');
    const [numberOfItems, setNumberOfItems] = useState<string>('');

    const [orderTimeDate, setOrderTimeDate] = useState<string>(
        new Date().toISOString().slice(0, 10));
    const [orderTimeHour, setOrderTimeHour] = useState<string>(
        new Date().toISOString().slice(11, 16));

    const [deliveryFee, setDeliveryFee] = useState<string>('');

    const [isValidInputs, setIsValidInputs] = useState<boolean>(false);


    const checkInputType = (input: any) => {
        let validInput = input;
        if (validInput !== 'NaN' && validInput !== null && validInput !== undefined
            && validInput !== '' && validInput !== 0) {
            return validInput;
        } else {
            return 'bad input';
        }
    }




    const validateInputffdddd = (state: SetStateAction<any>, type: string,
        setValidState: SetStateAction<any>) => {

        let parsedInput = state;

        if (isCartValueValid && isDeliveryDistanceValid &&
            isNumberOfItemsValid && isOrderTimeDateValid) {
            setIsValidInputs((prev: any) => true);
        } else if (!isCartValueValid || !isDeliveryDistanceValid ||
            !isNumberOfItemsValid || !isOrderTimeDateValid) {
            setIsValidInputs((prev: any) => false);
        }

        switch (type) {
            case 'cartValue': parsedInput = parseFloat(state); break;
            case 'deliveryDistance': parsedInput = parseInt(state); break;
            case 'numberOfItems': parsedInput = parseInt(state); break;
            case 'deliveryFee': parsedInput = parseFloat(state).toFixed(2); break;
            case 'orderTimeDate': parsedInput = new Date(state).getDay(); break;
            case 'hour': parsedInput = new Date(state).getHours(); break;
        }
        if (parsedInput !== 'NaN' && parsedInput !== null && parsedInput !== undefined
            && parsedInput !== '' && parsedInput !== 0) {
            setValidState((prev: any) => true);
            return parsedInput;
        } else {
            setValidState((prev: any) => false);
            return state;
        }

    }



    //calculator settings
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

    const calculatorValues = {
        parsedCartValue: parseFloat(cartValue),
        parsedDeliveryDistance: parseInt(deliveryDistance),
        parsedNumberOfItems: parseInt(numberOfItems),
        parsedOrderTimeDay: new Date(orderTimeDate).getDay(),
        parsedOrderHour: new Date(orderTimeHour).getHours()
    }
    const { parsedCartValue, parsedDeliveryDistance, parsedNumberOfItems,
        parsedOrderTimeDay, parsedOrderHour } = calculatorValues;

    const [isValidStates, setIsValidStates] = useState<any>([
        {
            isCartValueValid: {
                state: false,
                id: 'cartValue'
            }
        },
        { isDeliveryDistanceValid: false },
        { isNumberOfItemsValid: false },
        { isOrderTimeDateValid: false },
        { isOrderTimeHourValid: false },
    ]
    )

    const [{ isCartValueValid, isDeliveryDistanceValid, isNumberOfItemsValid,
        isOrderTimeDateValid, isOrderTimeHourValid }] = isValidStates;




    const validateInput = (state: any) => {
        if (Object.values(calculatorValues).every(value => value !== undefined
            && !isNaN(value) && value !== null && value !== 0)) {

            setIsValidInputs((prevState) => true);
            console.log(calculatorValues)
        } else {
            setIsValidInputs((prevState) => false);
        }
        switch (state) {
            case isCartValueValid.id === 'cartValue': setIsValidStates((prev: any) => (
                {
                    ...prev, isCartValueValid: {
                        ...prev.isCartValueValid,
                        state: true
                    }
                })

            )
        }
        console.log(isCartValueValid.state)
    }


    const calculateDeliveryFee = () => {

        let fee = 0;

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
        if (parsedOrderTimeDay === rushHourDay &&
            parsedOrderHour >= rushHourStart &&
            parsedOrderHour < rushHourEnd) {
            fee *= rushHourMultiplier;
        }

        if (parsedCartValue >= freeDeliveryAmount) {
            fee = 0;
        }

        fee > maxDeliveryFee ? fee = maxDeliveryFee : fee;

        let fixedFee = fee.toFixed(2);
        setDeliveryFee(fixedFee)
    }


    return (
        <Context.Provider
            value={{
                deliveryFee,
                setDeliveryFee,
                calculateDeliveryFee,
                isCartValueValid,
                isDeliveryDistanceValid,
                isNumberOfItemsValid,
                cartValue,
                setCartValue,
                deliveryDistance,
                setDeliveryDistance,
                numberOfItems,
                setNumberOfItems,
                orderTimeDate,
                setOrderTimeDate,
                isValidInputs,
                validateInput,
                setIsValidInputs,
                isOrderTimeDateValid,
                calculatorValues,
                orderTimeHour,
                setOrderTimeHour,
                isValidStates,
                setIsValidStates

            }}
        >
            {children}
        </Context.Provider>
    )
}

export function useStateContext() {
    return useContext(Context);
}