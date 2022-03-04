import createError from "http-errors"
import { Handler } from "@netlify/functions";
import { supabase } from "./supabase/supabase";


const handler: Handler = async (event, context) => {

  const accessToken = event.headers["x-supabase-auth"] 
  supabase.auth.setAuth(accessToken)

  try {
    let { data: product, error } = await supabase
        .from('product')
        .select('*')

    if(error){
      throw createError(400, error.message)
    }

    return {
      statusCode: 200,
      body:JSON.stringify({product: product, error: error})
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