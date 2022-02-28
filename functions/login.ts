import createError from "http-errors"
import { Handler } from "@netlify/functions";
import { supabase } from "./supabase/supabase";


const handler: Handler = async (event, context) => {

  const {email, password} = JSON.parse(event.body).values
  try {
    const { session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if(error){
      throw createError(400, error.message)
    }

    return {
      statusCode: 200,
      body:JSON.stringify({session: session, error: error})
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
