import React, { useState } from 'react'
import Layout from '../layout/layout'
import CartItems from '../components/cartItems'
import { useDispatch, useSelector } from 'react-redux'
import {PaystackButton} from 'react-paystack'
import { saveShippingAddressAction } from '../redux/action/cartAction'
import { orderAction } from '../redux/action/order'

const CompleteOrder = () => {

  const publicKey= "pk_test_a9f72060c19c7fee52fa662aa8d4dbc04ce27213"

 
    
    const cart= useSelector((state)=> state.cartReducer)

    const {cartItems, shippingAddress}= cart


    const [address, setAddress]= useState()
    const [city, setCity]= useState()
    const [postalCode, setPostalCode]= useState()
    const [country, setCountry]= useState()

    const [email, setEmail]= useState()
    

   
    const subTotal = cartItems.reduce((total, item)=> total + item.qty * item.price, 0).toFixed(2)

    const addDecimal=(num)=> {
        return (Math.round(num * 100)/ 100).toFixed(2)
    }

    const taxPrice = addDecimal(Number(0.15 * subTotal).toFixed(2))

    const shippingPrice = addDecimal(subTotal > 100 ? 20 : 0)

    const total = (Number(subTotal) + Number(taxPrice) + Number(shippingPrice)).toFixed(2)

const dispatch = useDispatch()
    const successPaymentHandler = async () => {
      try {
        dispatch(
          orderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            totalPrice: total,
            paymentMethod: "PAYSTACK",
            price: subTotal,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    const saveShippingAddress = () => {
      console.log("Save Shipping Address button clicked!")
      dispatch(
        saveShippingAddressAction({
          address,
          city,
          postalCode,
          country,
        })
      );
    };


     const componentProps= {
  email,
    amount: total * 100,
    // currency: "USD",
    metadata:{
      city,
      address,
      postalCode,
      country
    },
    publicKey,
    text:'Pay Now',
    onSuccess: (detail) => {
      successPaymentHandler(detail); // Call the payment handler on success
      alert('Payment Successful')
  }
}
  return (
    <div>
        <Layout>
      
      
        <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

      <div class="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
        <form action="#" class="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
          <div class="mb-6 flex flex-col text-left gap-4">
          <div class="col-span-2 sm:col-span-1">
              <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Email  </label>
              <input type="text" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Address" required />
            </div>
          <div class="col-span-2 sm:col-span-1">
              <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Address  </label>
              <input type="text" id="address" value={address} onChange={(e)=> setAddress(e.target.value)} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Address" required />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> City </label>
              <input type="text" id="city"  value={city} onChange={(e)=> setCity(e.target.value)} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="City" required />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Postal Code </label>
              <input type="text" id="postalCode"  value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Postal code" required />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label for="full_name" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Country </label>
              <input type="text" id="country"  value={country} onChange={(e)=> setCountry(e.target.value)} class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Country" required />
            </div>

            <button
                  onClick={saveShippingAddress}
                  className=" mb-10 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Save Shipping Address
                </button>
        
          </div>

          <PaystackButton
                     
                      className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    {...componentProps}
                    />
                     
                    
        </form>

       
        <div class="mt-6 grow sm:mt-8 lg:mt-0">
        <p className="leading-relaxed mb-4">
                  <CartItems cartItems={cartItems}/>
                </p>
          <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
            <div class="space-y-2">
              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${subTotal}</dd>
              </dl>

              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Shipping Fee</dt>
                <dd class="text-base font-medium text-gray-900">${shippingPrice}</dd>
              </dl>


              <dl class="flex items-center justify-between gap-4">
                <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd class="text-base font-medium text-gray-900 dark:text-white">${taxPrice}</dd>
              </dl>
            </div>

            <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt class="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <dd class="text-base font-bold text-gray-900 dark:text-white">${total}</dd>
            </dl>
          </div>

          <div class="mt-6 flex items-center justify-center gap-8">
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
            <img class="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
            <img class="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
          </div>
        </div> 
     
    </div>
      
      </div>

      
  </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
</Layout>
    </div>
  )
}

export default CompleteOrder