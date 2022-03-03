import createError from "http-errors"
import { Handler } from "@netlify/functions";
import { supabase } from "./supabase/supabase";


const handler: Handler = async (event, context) => {

    const {product, location, booked_time, accessToken, user} = JSON.parse(event.body)
    supabase.auth.setAuth(accessToken)

  try {
    const { data, error } = await supabase
        .from('booking')
        .insert([
            { 
                booked_by: user.data.id, 
                booked_product: product.product_id,
                booking_time: booked_time,
                booked_location: location
            },
        ])

    if(error){
      throw createError(400, error.message)
    }

    return {
      statusCode: 200,
      body:JSON.stringify({data: data, error: error})
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
