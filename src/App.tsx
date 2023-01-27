import { useState } from 'react';
import { InputField, Yuho } from './components';
import Button from './components/Button';
import OutputField from './components/OutputField';
import { useStateContext } from './context/StateContext';
import './index.css'
import { buttonStyles, iconStyles, styles } from './style'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineEuroSymbol } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { FaHashtag } from 'react-icons/fa'

export default function App() {

  const { deliveryFee, calculateDeliveryFee, cartValue, setCartValue,
    deliveryDistance, setDeliveryDistance, numberOfItems, setNumberOfItems,
    orderTimeDate, setOrderTimeDate, isValidInputs, validateInputs,
    orderTimeHour, setOrderTimeHour, isValidStates,
    setErrorStates
  } = useStateContext();

  const { isCartValueValid, isDeliveryDistanceValid, isNumberOfItemsValid,
    isOrderTimeDateValid, isOrderTimeHourValid } = isValidStates;

  const [notANumberErrorMessage, setNotANumberErrorMessage] = useState('Please enter a number');
  const [notADateErrorMessage, setNotADateErrorMessage] = useState('Please enter a date');
  const [notATimeErrorMessage, setNotATimeErrorMessage] = useState('Please enter a time');

  const [flyingYuho, setFlyingYuho] = useState(false);
  const [yuhoNormal, setYuhoNormal] = useState(true);

  const [calculateIsClicked, setCalculateIsClicked] = useState(false);

  //calculate button
  const handleClick = () => {
    setCalculateIsClicked((prevState) => true);

    if (isValidInputs) {
      calculateDeliveryFee();

      //yuho goes flying for 8,5 seconds
      if (yuhoNormal && !flyingYuho) {
        setYuhoNormal((prevState) => false)
        setFlyingYuho((prevState) => true)
        const yuhoWillFlyBack = setTimeout(() => {
          setFlyingYuho((prevState) => false)
        }, 1000)
        const yuhoWillBeNormal = setTimeout(() => {
          setYuhoNormal((prevState) => true)
        }, 7500)
      }
    }
  }

  //can press enter to calculate
  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className={` pt-8 xss:pt-10 ${styles.flexCol}`}>
      <Yuho flyingYuho={flyingYuho} yuhoNormal={yuhoNormal} />
      <h1 className={`${styles.h1} text-center mb-8 xss:mb-10 drop-shadow-xl`}>
        Delivery Fee Calculator
      </h1>
      <div className={`${styles.flexCenter}`}>
        <div className={`${styles.borderMain}  border-opacity-25 p-4 
        rounded-xl focus-within:bg-opacity-20 hover:bg-opacity-25 ease-in-out duration-500 
        bg-sec backdrop-blur-[24px] bg-opacity-0 z-[1]`}>
          <form id='calculator' className={`flex-col ${styles.flexCenter}`}>
            <InputField
              placeholder={''}
              type={'text'}
              text={'Cart value:'}
              errorMessage={notANumberErrorMessage}
              id={'cart-value'}
              onChange={(e: any) => setCartValue(e.target.value)}
              defaultValue={cartValue}
              showErrorMessage={calculateIsClicked && !isCartValueValid}
              onKeyDown={handleKeyPress}
              icon={<MdOutlineEuroSymbol />} />
            <InputField
              placeholder={''}
              type={'text'}
              text={'Delivery distance:'}
              errorMessage={notANumberErrorMessage}
              id={'delivery-distance'}
              onChange={(e: any) => setDeliveryDistance(e.target.value)}
              defaultValue={deliveryDistance}
              showErrorMessage={calculateIsClicked && !isDeliveryDistanceValid}
              onKeyDown={handleKeyPress}
              icon={'m'} />
            <InputField
              placeholder={''}
              type={'text'}
              text={'Number of items:'}
              errorMessage={notANumberErrorMessage}
              id={'number-of-items'}
              onChange={(e: any) => setNumberOfItems(e.target.value)}
              defaultValue={numberOfItems}
              showErrorMessage={calculateIsClicked && !isNumberOfItemsValid}
              onKeyDown={handleKeyPress}
              icon={<FaHashtag />} />
            <InputField
              placeholder={''}
              type={'date'}
              text={'Order date:'}
              errorMessage={notADateErrorMessage}
              id={'order-date'}
              value={orderTimeDate}
              onChange={(e: any) => setOrderTimeDate((prev: any) => e.target.value)}
              showErrorMessage={calculateIsClicked && !isOrderTimeDateValid}
              onKeyDown={handleKeyPress}
              icon={<AiOutlineCalendar />}
            />
            <InputField
              type={'time'}
              text={'Order time:'}
              errorMessage={notATimeErrorMessage}
              id={'order-time'}
              value={orderTimeHour}
              onChange={(e: any) => setOrderTimeHour((prev: any) => e.target.value)}
              showErrorMessage={calculateIsClicked && !isOrderTimeHourValid}
              onKeyDown={handleKeyPress}
              icon={<BiTimeFive />}
            />
            <Button
              onClick={handleClick}
              styles={`${buttonStyles.blue}`}
              text={'Calculate'} />
            <div className={`${!deliveryFee && 'opacity-0 translate-y-[-100%]'}
              ease-in-out duration-1000 opacity-100 translate-y-0
              `}>
              {deliveryFee &&
                <OutputField
                  form={'calculator'}
                  htmlFor={'cart-value delivery-distance number-of-items order-date order-time'}
                  output={deliveryFee}
                  errorMessage={''}
                  showErrorMessage={false}
                  text={'Delivery Fee:'} />
              }
            </div>
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
