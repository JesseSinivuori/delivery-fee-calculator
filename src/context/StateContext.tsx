import { createContext, ReactNode, useContext, useEffect, useState } from "react"

const Context = createContext<any>(undefined);

type StateContextProps = {
    children: ReactNode
}

export default function StateContext({ children }: StateContextProps) {

    const [cartValue, setCartValue] = useState<string>(''); //euros
    const [deliveryDistance, setDeliveryDistance] = useState<string>(''); //meters
    const [numberOfItems, setNumberOfItems] = useState<string>('');

    const date = new Date(); //current date and time
    const [orderTimeDate, setOrderTimeDate] = useState<string>(
        new Date().toISOString().slice(0, 10));//Date in ISO format (YYYY-MM-DD)
    const [orderTimeHour, setOrderTimeHour] = useState<string>(
        new Date().toISOString().slice(11, 16)); //UTC Time in ISO format (HH:MM)

    const [deliveryFee, setDeliveryFee] = useState<string>('');

    //must be true to calculate
    const [isValidInputs, setIsValidInputs] = useState(false);

    //must be true to calculate
    const [isValidSettings, setIsValidSettings] = useState(false);

    //format date + time to unix time to be able to use Date.getDay() and Date.getHours()
    date.setHours(parseInt(orderTimeHour.slice(0, 2)));
    date.setMinutes(parseInt(orderTimeHour.slice(3, 5)));

    //convert input strings to numbers / validate inputs
    const calculatorValues = {
        parsedCartValue: parseFloat(cartValue), //euros
        parsedDeliveryDistance: parseInt(deliveryDistance), //meters
        parsedNumberOfItems: parseInt(numberOfItems),
        parsedOrderTimeDate: new Date(orderTimeDate).getDay(), //getDay() returns day of the week (0 = sunday, 1 = monday etc.)
        parsedOrderTimeHour: date.getHours(), //getHours() returns UTC time
    }

    const { parsedCartValue, parsedDeliveryDistance, parsedNumberOfItems,
        parsedOrderTimeDate, parsedOrderTimeHour } = calculatorValues;

    //calculator settings
    const [cartValueSurchargeUntilEuros, setCartValueSurchargeUntilEuros] = useState(10); //add surcharge if cart value is less than 10
    const [freeDeliveryEuros, setFreeDeliveryEuros] = useState(100); //free delivery if cart value is more than 100
    const [distanceBaseFeeEuros, setDistanceBaseFeeEuros] = useState(2); //distance base fee for first 1km
    const [distanceBaseFeeMeters, setDistanceBaseFeeMeters] = useState(1000); //distance base fee
    const [addDistanceFeeEveryMeters, setAddDistanceFeeEveryMeters] = useState(500); //add extra distance fee every 500m
    const [extraDistanceFeeEuros, setExtraDistanceFeeEuros] = useState(1); //extra distance fee is 1€
    const [numberOfItemsSurchargeStart, setNumberOfItemsSurchargeStart] = useState(5); //start adding surcharge at 5 items
    const [numberOfItemsSurchargeEuros, setNumberOfItemsSurchargeEuros] = useState(0.50); //add 0.50€ for every item after 5
    const [rushHourDay, setRushHourDay] = useState(5); //5 = friday, 6 = saturday, 7 = sunday etc.
    const [rushHourStart, setRushHourStart] = useState(15); //15:00
    const [rushHourEnd, setRushHourEnd] = useState(19); //19:00
    const [rushHourMultiplier, setRushHourMultiplier] = useState(1.2); //20% surcharge for rush hour
    const [maxDeliveryFeeEuros, setMaxDeliveryFeeEuros] = useState(15); //max delivery fee is 15€

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
        //add 1€ for every 500m after 1km
        if (parsedDeliveryDistance > distanceBaseFeeMeters) {
            fee += distanceBaseFeeEuros + Math.ceil((parsedDeliveryDistance - distanceBaseFeeMeters)
                / addDistanceFeeEveryMeters) * extraDistanceFeeEuros;
        }
        console.log(Math.ceil((parsedDeliveryDistance - distanceBaseFeeMeters)
        / addDistanceFeeEveryMeters))

        //add 0.50€ for every item after 5
        if (parsedNumberOfItems >= numberOfItemsSurchargeStart) {
            fee += (parsedNumberOfItems - numberOfItemsSurchargeStart + 1)
                * numberOfItemsSurchargeEuros;
        }
        //20% surcharge for rush hour, friday 15:00 - 19:00
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

    //set valid input states on every input change
    const setValidInputs = () => {
        //check if all of the inputs are numbers and over the minimum values
        if (Object.values(calculatorValues).every((value) => !isNaN(value)
            && value !== undefined
            && parsedCartValue >= 0.01
            && parsedDeliveryDistance >= 1
            && parsedNumberOfItems >= 1
        )) {

            //can calculate delivery fee if all inputs are valid
            setIsValidInputs((prevState) => true);

        } else {
            setIsValidInputs((prevState) => false);

            //set delivery fee to empty string if inputs are not valid / hide delivery fee
            setDeliveryFee((prevFee) => '')
        }
    }

    //makes the inputs only accept numbers
    //setting disable0 = true will make the input not accept typing 0
    const handleInputChange = (input: any, setState: any, disable0?: boolean) => {
        if (!isNaN(input)) {
            setState((prev: any) => input);
        }

        if (disable0 && input === '0') {
            setState((prev: any) => '');
        }

        else {
            setState((prev: any) => prev);
        }

    }

    //update valid states on every input change
    useEffect(() => {
        setValidInputs();
    }, [cartValue, deliveryDistance, numberOfItems, orderTimeDate, orderTimeHour]);


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
                cartValueSurchargeUntilEuros,
                setCartValueSurchargeUntilEuros,
                distanceBaseFeeEuros,
                setDistanceBaseFeeEuros,
                distanceBaseFeeMeters,
                setDistanceBaseFeeMeters,
                addDistanceFeeEveryMeters,
                setAddDistanceFeeEveryMeters,
                numberOfItemsSurchargeStart,
                setNumberOfItemsSurchargeStart,
                numberOfItemsSurchargeEuros,
                setNumberOfItemsSurchargeEuros,
                rushHourDay,
                setRushHourDay,
                rushHourStart,
                setRushHourStart,
                rushHourEnd,
                setRushHourEnd,
                rushHourMultiplier,
                setRushHourMultiplier,
                freeDeliveryEuros,
                setFreeDeliveryEuros,
                maxDeliveryFeeEuros,
                setMaxDeliveryFeeEuros,
                extraDistanceFeeEuros,
                setExtraDistanceFeeEuros,
                handleInputChange
            }}
        >
            {children}
        </Context.Provider>
    )
}

export function useStateContext() {
    return useContext(Context);
}