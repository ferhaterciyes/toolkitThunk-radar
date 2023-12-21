// flightActions.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constants/constants";

export const getFlights = createAsyncThunk("flight", async () => {
    // res değişkenini tanımlamadan önce axios request'i yapın
    const res = await axios.request(options);

   const refined = res.data.aircraft.map((i)=>({
        id:i[0],
        code:i[1],
        lat:i[2],
        lng:i[3]
    }))

    return refined; 
  
});
