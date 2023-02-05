import { useState } from "react";
import { BoxMain, Button, InputField } from "."
import { useStateContext } from "../context/StateContext"
import { buttonStyles, styles } from "../style"
import { MdOutlineEuroSymbol } from "react-icons/md"
import { AiOutlineCalendar } from "react-icons/ai"
import { FaHashtag } from "react-icons/fa"
import { BiTimeFive } from "react-icons/bi"
import { RiPercentFill } from "react-icons/ri"

export default function Settings() {

    const { cartValueSurchargeUntilEuros, setCartValueSurchargeUntilEuros,
        distanceBaseFeeEuros, setDistanceBaseFeeEuros, distanceBaseFeeMeters,
        setDistanceBaseFeeMeters, addDistanceFeeEveryMeters, setAddDistanceFeeEveryMeters,
        numberOfItemsSurchargeStart, setNumberOfItemsSurchargeStart, numberOfItemsSurchargeEuros,
        setNumberOfItemsSurchargeEuros, rushHourDay, setRushHourDay, rushHourEnd,
        setRushHourEnd, rushHourMultiplier, setRushHourMultiplier, freeDeliveryEuros,
        setFreeDeliveryEuros, maxDeliveryFeeEuros, setMaxDeliveryFeeEuros,
        handleInputChange, rushHourStart, setRushHourStart, extraDistanceFeeEuros,
        setExtraDistanceFeeEuros
    } = useStateContext();

    const [cartValueSurchargeUntilEurosInput, setCartValueSurchargeUntilEurosInput] = useState(cartValueSurchargeUntilEuros);
    const [distanceBaseFeeEurosInput, setDistanceBaseFeeEurosInput] = useState(distanceBaseFeeEuros);
    const [distanceBaseFeeMetersInput, setDistanceBaseFeeMetersInput] = useState(distanceBaseFeeMeters);
    const [addDistanceFeeEveryMetersInput, setAddDistanceFeeEveryMetersInput] = useState(addDistanceFeeEveryMeters);
    const [extraDistanceFeeEurosInput, setExtraDistanceFeeEurosInput] = useState(extraDistanceFeeEuros);
    const [numberOfItemsSurchargeStartInput, setNumberOfItemsSurchargeStartInput] = useState(numberOfItemsSurchargeStart);
    const [numberOfItemsSurchargeEurosInput, setNumberOfItemsSurchargeEurosInput] = useState(numberOfItemsSurchargeEuros);
    const [rushHourDayInput, setRushHourDayInput] = useState(rushHourDay);
    const [rushHourStartInput, setRushHourStartInput] = useState(rushHourStart);
    const [rushHourEndInput, setRushHourEndInput] = useState(rushHourEnd);
    const [rushHourMultiplierInput, setRushHourMultiplierInput] = useState(rushHourMultiplier);
    const [freeDeliveryEurosInput, setFreeDeliveryEurosInput] = useState(freeDeliveryEuros);
    const [maxDeliveryFeeEurosInput, setMaxDeliveryFeeEurosInput] = useState(maxDeliveryFeeEuros);

    //convert the input strings to numbers and if they are not numbers, set them to 0
    const calculatorSettings = {
        parsedCartValueSurchargeUntilEuros: parseFloat(cartValueSurchargeUntilEurosInput || 0),
        parsedDistanceBaseFeeEuros: parseFloat(distanceBaseFeeEurosInput || 0),
        parsedDistanceBaseFeeMeters: parseInt(distanceBaseFeeMetersInput || 0),
        parsedAddDistanceFeeEveryMeters: parseInt(addDistanceFeeEveryMetersInput || 0),
        parsedExtraDistanceFeeEuros: parseFloat(extraDistanceFeeEurosInput || 0),
        parsedNumberOfItemsSurchargeStart: parseInt(numberOfItemsSurchargeStartInput || 0),
        parsedNumberOfItemsSurchargeEuros: parseFloat(numberOfItemsSurchargeEurosInput || 0),
        parsedRushHourDay: parseInt(rushHourDayInput || 0),
        parsedRushHourStart: parseInt(rushHourStartInput || 0),
        parsedRushHourEnd: parseInt(rushHourEndInput || 0),
        parsedRushHourMultiplier: parseFloat(rushHourMultiplierInput || 0),
        parsedFreeDeliveryEuros: parseFloat(freeDeliveryEurosInput || 0),
        parsedMaxDeliveryFeeEuros: parseFloat(maxDeliveryFeeEurosInput || 0),
    }

    const { parsedCartValueSurchargeUntilEuros, parsedDistanceBaseFeeEuros, parsedDistanceBaseFeeMeters,
        parsedAddDistanceFeeEveryMeters, parsedNumberOfItemsSurchargeStart, parsedNumberOfItemsSurchargeEuros,
        parsedRushHourMultiplier, parsedFreeDeliveryEuros, parsedMaxDeliveryFeeEuros,
        parsedRushHourDay, parsedRushHourStart, parsedRushHourEnd, parsedExtraDistanceFeeEuros
    } = calculatorSettings;

    //set the calculator settings and update the inputs fields when apply is clicked
    const setCalculatorSettings = () => {
        setCartValueSurchargeUntilEuros(parsedCartValueSurchargeUntilEuros);
        setDistanceBaseFeeEuros(parsedDistanceBaseFeeEuros);
        setDistanceBaseFeeMeters(parsedDistanceBaseFeeMeters);
        setAddDistanceFeeEveryMeters(parsedAddDistanceFeeEveryMeters);
        setExtraDistanceFeeEuros(parsedExtraDistanceFeeEuros);
        setNumberOfItemsSurchargeStart(parsedNumberOfItemsSurchargeStart);
        setNumberOfItemsSurchargeEuros(parsedNumberOfItemsSurchargeEuros);
        setRushHourDay(parsedRushHourDay);
        setRushHourStart(parsedRushHourStart);
        setRushHourEnd(parsedRushHourEnd);
        setRushHourMultiplier(parsedRushHourMultiplier);
        setFreeDeliveryEuros(parsedFreeDeliveryEuros);
        setMaxDeliveryFeeEuros(parsedMaxDeliveryFeeEuros);
        setCartValueSurchargeUntilEurosInput(parsedCartValueSurchargeUntilEuros);
        setDistanceBaseFeeEurosInput(parsedDistanceBaseFeeEuros);
        setDistanceBaseFeeMetersInput(parsedDistanceBaseFeeMeters);
        setAddDistanceFeeEveryMetersInput(parsedAddDistanceFeeEveryMeters);
        setExtraDistanceFeeEurosInput(parsedExtraDistanceFeeEuros);
        setNumberOfItemsSurchargeStartInput(parsedNumberOfItemsSurchargeStart);
        setNumberOfItemsSurchargeEurosInput(parsedNumberOfItemsSurchargeEuros);
        setRushHourDayInput(parsedRushHourDay);
        setRushHourStartInput(parsedRushHourStart);
        setRushHourEndInput(parsedRushHourEnd);
        setRushHourMultiplierInput(parsedRushHourMultiplier);
        setFreeDeliveryEurosInput(parsedFreeDeliveryEuros);
        setMaxDeliveryFeeEurosInput(parsedMaxDeliveryFeeEuros);
    }

    //reset calculator settings to default values and update the inputs fields when reset is clicked
    const resetCalculatorSettings = () => {
        setCartValueSurchargeUntilEuros(10);
        setDistanceBaseFeeEuros(2);
        setDistanceBaseFeeMeters(1000);
        setAddDistanceFeeEveryMeters(500);
        setExtraDistanceFeeEuros(1);
        setNumberOfItemsSurchargeStart(5);
        setNumberOfItemsSurchargeEuros(0.5);
        setRushHourDay(5);
        setRushHourStart(15);
        setRushHourEnd(19);
        setRushHourMultiplier(1.2);
        setFreeDeliveryEuros(100);
        setMaxDeliveryFeeEuros(15);
        setCartValueSurchargeUntilEurosInput('10');
        setDistanceBaseFeeEurosInput('2');
        setDistanceBaseFeeMetersInput('1000');
        setAddDistanceFeeEveryMetersInput('500');
        setExtraDistanceFeeEurosInput('1');
        setNumberOfItemsSurchargeStartInput('5');
        setNumberOfItemsSurchargeEurosInput('0.5');
        setRushHourDayInput('5');
        setRushHourStartInput('15');
        setRushHourEndInput('19');
        setRushHourMultiplierInput('1.2');
        setFreeDeliveryEurosInput('100');
        setMaxDeliveryFeeEurosInput('15');
    }

    //settings are mapped to InputField components
    const calculatorSettingsData = [
        {
            id: "cartValueSurchargeUntilEurosInput",
            text: "Cart value surcharge",
            icon: <MdOutlineEuroSymbol />,
            infoMessage: `Add a surcharge to orders under x(${cartValueSurchargeUntilEurosInput}) euros. (${cartValueSurchargeUntilEurosInput} - cart value = surcharge amount)`,
            value: cartValueSurchargeUntilEurosInput,
            onChange: (e: any) => handleInputChange(e.target.value, setCartValueSurchargeUntilEurosInput),
        },
        {
            id: "distanceBaseFeeEurosInput",
            text: "Base distance fee amount",
            icon: <MdOutlineEuroSymbol />,
            infoMessage: `The base distance fee is added after the first ${distanceBaseFeeMetersInput} meters.`,
            value: distanceBaseFeeEurosInput,
            onChange: (e: any) => handleInputChange(e.target.value, setDistanceBaseFeeEurosInput),
        },
        {
            id: "distanceBaseFeeMetersInput",
            text: "Base distance",
            icon: 'm',
            infoMessage: `The distance required to add the base distance fee(${distanceBaseFeeEurosInput}€).`,
            value: distanceBaseFeeMetersInput,
            onChange: (e: any) => handleInputChange(e.target.value, setDistanceBaseFeeMetersInput),
        },
        {
            id: "addDistanceFeeEveryMetersInput",
            text: "Extra distance",
            icon: 'm',
            infoMessage: `For every x(${addDistanceFeeEveryMetersInput}) meters, an extra distance fee of ${extraDistanceFeeEurosInput}€ is added.`,
            value: addDistanceFeeEveryMetersInput,
            onChange: (e: any) => handleInputChange(e.target.value, setAddDistanceFeeEveryMetersInput),
        },
        {
            id: "extraDistanceFeeEurosInput",
            text: "Extra distance fee amount",
            icon: <MdOutlineEuroSymbol />,
            infoMessage: `The amount of euros added x(${extraDistanceFeeEurosInput}) for every ${addDistanceFeeEveryMetersInput} meters.`,
            value: extraDistanceFeeEurosInput,
            onChange: (e: any) => handleInputChange(e.target.value, setExtraDistanceFeeEurosInput),
        },
        {
            id: "numberOfItemsSurchargeStartInput",
            text: "Number of items surcharge",
            icon: <FaHashtag />,
            infoMessage: `Add a surcharge to orders with more than x(${numberOfItemsSurchargeStartInput}) items.`,
            value: numberOfItemsSurchargeStartInput,
            onChange: (e: any) => handleInputChange(e.target.value, setNumberOfItemsSurchargeStartInput),
        },
        {
            id: "numberOfItemsSurchargeEurosInput",
            text: "Number of items surcharge amount",
            icon: <MdOutlineEuroSymbol />,
            infoMessage: `Add a surcharge of x(${numberOfItemsSurchargeEurosInput}) euros to orders with more than ${numberOfItemsSurchargeStartInput} items.`,
            value: numberOfItemsSurchargeEurosInput,
            onChange: (e: any) => handleInputChange(e.target.value, setNumberOfItemsSurchargeEurosInput),
        },
        {
            id: "rushHourDayInput",
            text: "Rush hour day",
            icon: <AiOutlineCalendar />,
            infoMessage: `The day of the rush hour. 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday.`,
            value: rushHourDayInput,
            onChange: (e: any) => handleInputChange(e.target.value, setRushHourDayInput),
        },
        {
            id: "rushHourStartInput",
            text: "Rush hour start time",
            icon: <BiTimeFive />,
            infoMessage: `The hour that the rush hour starts. (0-23, 0 = 00:00, 23 = 23:00, etc.)`,
            value: rushHourStartInput,
            onChange: (e: any) => handleInputChange(e.target.value, setRushHourStartInput),
        },
        {
            id: "rushHourEndInput",
            text: "Rush hour end time",
            icon: <BiTimeFive />,
            infoMessage: `The hour that the rush hour ends. (0-23, 0 = 00:00, 23 = 23:00, etc.)`,
            value: rushHourEndInput,
            onChange: (e: any) => handleInputChange(e.target.value, setRushHourEndInput),
        },
        {
            id: "rushHourMultiplierInput",
            text: "Rush hour multiplier",
            icon: < RiPercentFill />,
            infoMessage: `Multiplies the delivery fee during the rush hour. (1 = no multiplier, 1.2 = 20% extra, 2 = double, etc.)`,
            value: rushHourMultiplierInput,
            onChange: (e: any) => handleInputChange(e.target.value, setRushHourMultiplierInput),
        },
        {
            id: "freeDeliveryEurosInput",
            text: "Free delivery amount",
            icon: <MdOutlineEuroSymbol />,
            infoMessage: `The amount of euros that need to be spent to get free delivery.`,
            value: freeDeliveryEurosInput,
            onChange: (e: any) => handleInputChange(e.target.value, setFreeDeliveryEurosInput),
        },
        {
            id: "maxDeliveryFeeEurosInput",
            text: "Maximum delivery fee",
            icon: <MdOutlineEuroSymbol />,
            infoMessage: `The maximum amount of euros that can be charged for delivery.`,
            value: maxDeliveryFeeEurosInput,
            onChange: (e: any) => handleInputChange(e.target.value, setMaxDeliveryFeeEurosInput),
        },
    ];

    const handleClickResetSettings = () => {
        resetCalculatorSettings();
    }

    const handleClickApply = () => {
        setCalculatorSettings();
    }

    //can press enter to apply settings
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleClickApply();
        }
    }

    return (
        <div className={`${styles.flexCol} ${styles.flexCenter} p-4`}>
            <h1 className={`${styles.h1} text-center mb-8 drop-shadow-xl`}>
                Settings
            </h1>
            <div className={`${styles.flexCenter}`}>
                <BoxMain>
                    <form id='settings' onKeyDown={handleKeyDown}
                        className={`max-w-[1300px] flex-wrap
                        ${styles.flexCenter}
                        `}>
                        {calculatorSettingsData.map((item: any, key: any) => (
                            <InputField
                                key={item.id}
                                type='text'
                                text={item.text}
                                id={item.id}
                                value={item.value}
                                onChange={item.onChange}
                                textStyles={item.textStyles}
                                infoMessage={item.infoMessage}
                                showInfoMessage={true}
                                icon={item.icon}
                            />
                        ))}
                    </form>
                    <div className={`${styles.flexCenter} flex-wrap-reverse mt-4`}>
                        <div className={`${styles.flexCol} m-4 `}>
                            <Button
                                onClick={handleClickApply}
                                buttonStyles={`${buttonStyles.blue}`}
                                text={'Apply'}
                                messageText={'Settings applied'}
                                showMessage={true}
                            />
                        </div>
                        <div className={`${styles.flexCol} m-4`}>
                            <Button
                                onClick={handleClickResetSettings}
                                buttonStyles={`${buttonStyles.white}`}
                                text={'Reset to defaults'}
                                messageText={'Settings reset'}
                                showMessage={true}
                            />
                        </div>
                    </div>
                </BoxMain>
            </div>
        </div>
    )
}
