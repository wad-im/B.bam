import { Handler } from "@netlify/functions";
import { supabase } from "./supabase/supabase";
import createError from "http-errors"


const handler: Handler = async (event, context) => {

    const accessToken = JSON.parse(event.body).accessToken

    try {
        const { user, error } = await supabase.auth.api.getUser(
            accessToken,
          )
        
        if (error){
            throw createError(error.status, "You are not authorized")
        }
        return {
            statusCode: 200,
            body:JSON.stringify({user: user})
        }
    } catch (error) {
        return {
            statusCode: error.status || 500,
            body: JSON.stringify({error})
          } 
    }
}

export { handler };