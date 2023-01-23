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
    orderTime, setOrderTime, calculateDeliveryFee, cartValueErrorMessage,
    deliveryDistanceErrorMessage,
    numberOfItemsErrorMessage,
    orderTimeErrorMessage, setCartValueErrorMessage,
    setDeliveryDistanceErrorMessage,
    setNumberOfItemsErrorMessage,
    setOrderTimeErrorMessage,
    deliveryFeeErrorMessage
  } = useStateContext();


  const [flyingYuho, setFlyingYuho] = useState(false);
  const [yuhoNormal, setYuhoNormal] = useState(true);

  const handleClick = () => {
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
              errorMessage={cartValueErrorMessage}
              id={'cart-value'}
              onChange={(e: any) => setCartValue(e.target.value)}
              value={cartValue} />
            <InputField
              placeholder={'m'}
              type={'text'}
              text={'Delivery distance:'}
              errorMessage={deliveryDistanceErrorMessage}
              id={'delivery-distance'}
              onChange={(e: any) => setDeliveryDistance(e.target.value)}
              value={deliveryDistance} />
            <InputField
              placeholder={'0'}
              type={'text'}
              text={'Number of items:'}
              errorMessage={numberOfItemsErrorMessage}
              id={'number-of-items'}
              onChange={(e: any) => setNumberOfItems(e.target.value)}
              value={numberOfItems} />

            <InputField
              placeholder={''}
              type={'datetime-local'}
              text={'Order time:'}
              errorMessage={orderTimeErrorMessage}
              id={'order-time'}
              value={
                new Date((orderTime).getTime() + 0 * 60 * 60 * 1000).toISOString().substring(0, 16)}
              onChange={(e: any) => setOrderTime(new Date(e.target.value))}
            />
            <Button onClick={handleClick}
              styles={`${buttonStyles.blue}`}
              text={'Calculate'} />
            {deliveryFee &&
              <OutputField
                form={'calculator'}
                htmlFor={'cart-value delivery-distance number-of-items order-time'}
                output={deliveryFee}
                errorMessage={deliveryFeeErrorMessage} />
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
