import { configureStore } from "@reduxjs/toolkit";
import nameTrainer from "./slices/nameTrainer.slice";


export default configureStore({
    reducer: {
        //Aquí van todos nuestros estados globales (slices)
        nameTrainer
    }
})