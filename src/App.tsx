import { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { FaHashtag } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineEuroSymbol } from 'react-icons/md';
import { BoxMain, Button, InputField, OutputField, Settings, Yuho } from './components';
import { useStateContext } from './context/StateContext';
import './index.css'
import { buttonStyles, styles } from './style'
import { AiOutlineHome } from 'react-icons/ai'

export default function App() {

  const { deliveryFee, calculateDeliveryFee, cartValue, setCartValue,
    deliveryDistance, setDeliveryDistance, numberOfItems, setNumberOfItems,
    orderTimeDate, setOrderTimeDate, orderTimeHour, setOrderTimeHour,
    isValidInputs, handleInputChange,
  } = useStateContext();

  const notANumberErrorMessage = 'Please enter a number';
  const notADateErrorMessage = 'Please enter a date';
  const notATimeErrorMessage = 'Please enter a time';

  const [calculateIsClicked, setCalculateIsClicked] = useState(false)
  const [flyYuho, setFlyYuho] = useState(false)

  //calculate button
  const handleClick = () => {
    setCalculateIsClicked((prev) => true);

    if (isValidInputs) {
      calculateDeliveryFee();

      //fly yuho
      setFlyYuho((prev) => true);
      const yuhoTimeout = setTimeout(() => {
        setFlyYuho((prev) => false);
      }, 100);
    }
  }

  const [toggleSettings, setToggleSettings] = useState(false)

  const handleClickSettings = () => {
    setToggleSettings((prev: boolean) => !prev)
  }

  //can press enter to calculate
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  return (
    <div className={`${styles.flexCol} ${styles.flexCenter} pt-8`}>
      {/** <Yuho flyYuho={flyYuho} /> */}
      {!toggleSettings &&
        <div>
          <h1 className={`${styles.h1} text-center mb-8 drop-shadow-xl h1-gradient`}>
            Delivery Fee Calculator
          </h1>
          <div className={`${styles.flexCenter}`}>
            <BoxMain>
              <form id='calculator' onKeyDown={handleKeyDown}
                className={`flex-col ${styles.flexCenter}`}>
                <InputField
                  type={'text'}
                  text={'Cart value'}
                  textRows={1}
                  errorMessage={notANumberErrorMessage}
                  id={'cart-value'}
                  onChange={(e: any) => handleInputChange(e.target.value, setCartValue)}
                  value={cartValue}
                  showErrorMessage={calculateIsClicked && (!cartValue || cartValue < 0.01)}
                  infoMessage={'The total value of your cart in euros.'}
                  showInfoMessage={true}
                  icon={<MdOutlineEuroSymbol />} />
                <InputField
                  type={'text'}
                  text={'Delivery distance'}
                  textRows={1}
                  errorMessage={notANumberErrorMessage}
                  id={'delivery-distance'}
                  onChange={(e: any) => handleInputChange(e.target.value, setDeliveryDistance, true)}
                  value={deliveryDistance}
                  showErrorMessage={calculateIsClicked && (!deliveryDistance || deliveryDistance < 1)}
                  infoMessage={`The distance between the restaurant and you in meters. (1000 meters = 1 km)`}
                  showInfoMessage={true}
                  icon={'m'} />
                <InputField
                  type={'text'}
                  text={'Number of items'}
                  textRows={1}
                  errorMessage={notANumberErrorMessage}
                  id={'number-of-items'}
                  onChange={(e: any) => handleInputChange(e.target.value, setNumberOfItems, true)}
                  value={numberOfItems}
                  showErrorMessage={calculateIsClicked && (!numberOfItems || numberOfItems < 1)}
                  infoMessage={'The number of items in your cart.'}
                  showInfoMessage={true}
                  icon={<FaHashtag />} />
                <InputField
                  type={'date'}
                  text={'Order date'}
                  textRows={1}
                  errorMessage={notADateErrorMessage}
                  id={'order-date'}
                  value={orderTimeDate}
                  onChange={(e: any) => setOrderTimeDate(e.target.value)}
                  showErrorMessage={calculateIsClicked && !orderTimeDate}
                  infoMessage={'The date of your order.'}
                  showInfoMessage={true}
                  icon={<AiOutlineCalendar />}
                />
                <InputField
                  type={'time'}
                  text={'Order time'}
                  textRows={1}
                  errorMessage={notATimeErrorMessage}
                  id={'order-time'}
                  value={orderTimeHour}
                  onChange={(e: any) => setOrderTimeHour(e.target.value)}
                  showErrorMessage={calculateIsClicked && !orderTimeHour}
                  infoMessage={'The time of your order in UTC time.'}
                  showInfoMessage={true}
                  icon={<BiTimeFive />}
                />
                <Button
                  onClick={handleClick}
                  buttonStyles={`${buttonStyles.blue} mt-8 m-4 `}
                  text={'Calculate'} />
                {deliveryFee &&
                  <OutputField
                    form={'calculator'}
                    htmlFor={'cart-value delivery-distance number-of-items order-date order-time'}
                    output={deliveryFee}
                    text={'Delivery Fee'} />
                }
              </form>
            </BoxMain>
          </div>
        </div>
      }
      {toggleSettings &&
        <Settings />
      }
      <nav className={`${styles.flexCenter} p-4`}>
        <Button onClick={handleClickSettings}
          buttonStyles={`${buttonStyles.icon} 
                `}
          text={''}
          icon={
            !toggleSettings ?
              <IoSettingsOutline className='w-[34px] h-[34px]' />
              : <AiOutlineHome className='w-[34px] h-[34px]' />
          } />
      </nav>
    </div>
  )
}
