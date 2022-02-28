import { Handler } from "@netlify/functions";
import { supabase } from "./supabase/supabase";
import createError from "http-errors"


const handler: Handler = async (event, context) => {

    const accessToken = JSON.parse(event.body).accessToken

    try {
        const { error } = await supabase.auth.api.signOut(
            accessToken,
          )
        
        if (error){
            throw createError(error.status, error.message)
        }
        return {
            statusCode: 200
        }
    } catch (error) {
        return {
            statusCode: error.status || 500,
            body: JSON.stringify({error})
          } 
    }
}

export { handler };