import createError from "http-errors"
import { Handler } from "@netlify/functions";
import { supabase } from "./supabase/supabase";


const handler: Handler = async (event, context) => {

  const accessToken = event.headers["x-supabase-auth"] 
  // direct request to correct function by httpMethod
  const {httpMethod} = event

  try {
    if(httpMethod === 'GET'){
      return await fetchBookings(accessToken)
    } else if (httpMethod === 'POST'){
      return await createBooking(event.body, accessToken)
    } else if(httpMethod === 'DELETE'){
      return await updateBooking(event.body, accessToken)
    } else {
      throw createError (405, 'Method not allowed')
    }
  } catch (error) {

    console.log(error.status, error.message)
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({error})
    }

  }
};



export { handler };

const fetchBookings = async (accessToken)=> {
  supabase.auth.setAuth(accessToken)
  // get all bookings that the user made from database
  let { data: booking, error } = await supabase
    .from('booking')
    .select('booking_id, created_at, booking_time, booked_location, booking_status, product (*)')
  // if there is an error, throw it and send it to the console and the user (see above)
  if(error){
    throw createError(400, error.message)
  }
  // return successful response to user/client
  return {
    statusCode: 200,
    body:JSON.stringify({booking: booking, error: error})
  }
}

const createBooking = async (requestBody, accessToken) =>{
  supabase.auth.setAuth(accessToken)
  const {product, location, booked_time, user} = JSON.parse(requestBody)
  
  // send the new booking of the user to the database
  const { data, error } = await supabase
        .from('booking')
        .insert([
            { 
                booked_by: user.data.id, 
                booked_product: product.product_id,
                booking_time: booked_time,
                booked_location: location,
            },
        ])
    // if there is an error, throw it and send it to the console and the user (see above)
    if(error){
      throw createError(400, error.message)
    }
    // return successful response to user/client
    return {
      statusCode: 200,
      body:JSON.stringify({data: data, error: error})
    }
}

const updateBooking = async (requestBody, accessToken)=>{
  supabase.auth.setAuth(accessToken)
  const {booking_id} = JSON.parse(requestBody)
  const { data, error } = await supabase
    .from('booking')
    .update({ booking_status: 'cancelled' })
    .eq('booking_id', booking_id)

    if(error){
      throw createError(400, error.message)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({data: data})
    }
}