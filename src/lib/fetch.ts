import axios from 'axios'


//the database has the token, you just need to fetch it out
export const refreshToken = async(token:string)=>{
    const refresh_token = await axios.get(`${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`)

    //now it can be called to refresh the token
    return refresh_token.data
}