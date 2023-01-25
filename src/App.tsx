import { SetStateAction, useEffect, useRef, useState } from 'react';
import { InputField, Yuho } from './components';
import Button from './components/Button';
import DatePicker from './components/DatePicker';
import OutputField from './components/OutputField';
import { useStateContext } from './context/StateContext';
import './index.css'
import { buttonStyles, styles } from './style'
import { IoSettingsOutline } from 'react-icons/io5'

export default function App() {

  const { deliveryFee, cartValue, setCartValue,
    deliveryDistance, setDeliveryDistance, numberOfItems, setNumberOfItems,
    orderTimeDate, setOrderTimeDate, calculateDeliveryFee,
    deliveryDistanceErrorMessage, setIsNumberOfItemsValid, setIsOrderTimeDateValid,
    setIsCartValueValid, setIsDeliveryDistanceValid, setIsDeliveryFeeValid,
    calculatorValues, orderTimeHour, setOrderTimeHour,
    isValidStates, setIsValidStates,
    isValidInputs, validateInput
  } = useStateContext();

  const { isCartValueValid, isDeliveryDistanceValid, isNumberOfItemsValid,
    isOrderTimeDateValid, isOrderTimeHourValid } = isValidStates;

  const [notANumberErrorMessage, setNotANumberErrorMessage] = useState('Please enter a number');

  const [flyingYuho, setFlyingYuho] = useState(false);
  const [yuhoNormal, setYuhoNormal] = useState(true);



  const handleClick = () => {
    console.log('@handleClick', isValidStates)
    validateInput();

    if (isValidInputs) {
      calculateDeliveryFee();


      //yuho flies
      if (yuhoNormal && !flyingYuho) {
        setYuhoNormal(false)
        setFlyingYuho(true)
        setTimeout(() => {
          setFlyingYuho(false)
        }, 1000)
        setTimeout(() => {
          setYuhoNormal(true)
        }, 8500)
      }
    }
  }


  useEffect(() => {
    console.log('@useEffect', isValidStates)
    if (!isCartValueValid || !isDeliveryDistanceValid ||
      !isNumberOfItemsValid || isOrderTimeDateValid) {

    }
  }, [cartValue, deliveryDistance, numberOfItems, orderTimeDate, orderTimeHour]);


  return (
    <div className={` pt-8 xss:pt-10`}>
      <Yuho flyingYuho={flyingYuho} yuhoNormal={yuhoNormal} />
      <h1 className={`${styles.h1} text-center mb-8 xss:mb-10 drop-shadow-xl`}>
        Delivery Fee Calculator
      </h1>
      <div className={`${styles.flexCenter}`}>
        <div className={`border-white border-opacity-25 border-[1px] p-4 
        rounded-xl focus-within:bg-opacity-20 hover:bg-opacity-20 ease-in-out duration-500 
        bg-sec backdrop-blur-[24px] bg-opacity-0 z-[1]`}>
          <form id='calculator' className={`flex-col ${styles.flexCenter} ${styles.boxWidth}`}>
            <InputField
              placeholder={'€'}
              type={'text'}
              text={'Cart value:'}
              errorMessage={notANumberErrorMessage}
              id={'cart-value'}
              onChange={(e: any) => setCartValue((prevState: any) =>
                e.target.value)}
              defaultValue={''}
              showErrorMessage={isCartValueValid} />
            <InputField
              placeholder={'m'}
              type={'text'}
              text={'Delivery distance:'}
              errorMessage={notANumberErrorMessage}
              id={'delivery-distance'}
              onChange={(e: any) => setDeliveryDistance((prevState: any) =>
                e.target.value)}
              defaultValue={''}
              showErrorMessage={isDeliveryDistanceValid} />
            <InputField
              placeholder={'0'}
              type={'text'}
              text={'Number of items:'}
              errorMessage={notANumberErrorMessage}
              id={'number-of-items'}
              onChange={(e: any) => setNumberOfItems((prevState: any) =>
                e.target.value)}
              defaultValue={''}
              showErrorMessage={isNumberOfItemsValid} />
            <InputField
              placeholder={''}
              type={'date'}
              text={'Order date:'}
              errorMessage={notANumberErrorMessage}
              id={'order-date'}
              // .getTime() === new Date().getTime() ? '' : new Date(orderTime).toISOString().slice(0, 10) */
              defaultValue={''}
              onChange={(e: any) => setOrderTimeDate((prevState: any) =>
                e.target.value)}
              showErrorMessage={isOrderTimeDateValid} />
            <InputField
              placeholder={''}
              type={'time'}
              text={'Order time:'}
              errorMessage={notANumberErrorMessage}
              id={'order-time'}
              defaultValue={''}
              onChange={(e: any) => setOrderTimeHour((prevState: any) =>
                e.target.value)}
              showErrorMessage={isOrderTimeDateValid} />
            <Button onClick={handleClick}
              styles={`${buttonStyles.blue}`}
              text={'Calculate'} />
            {isValidInputs && deliveryFee &&
              <OutputField
                form={'calculator'}
                htmlFor={'cart-value delivery-distance number-of-items order-date order-time'}
                output={deliveryFee}
                errorMessage={deliveryDistanceErrorMessage}
                showErrorMessage={isDeliveryDistanceValid} />
            }
          </form>
        </div>
      </div>
      <nav className={`justify-around bottom-0 flex z-[999] p-4`}>
        <Button onClick={() => { }}
          styles={`${buttonStyles.icon}`}
          text={''}
          icon={<IoSettingsOutline className='w-[34px] h-[34px]' />} />
      </nav>
    </div>
  )
}
