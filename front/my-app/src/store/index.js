import { configureStore } from '@reduxjs/toolkit'
import heroReduser from './heroSlice'

export default configureStore({
    reducer: {
        heros: heroReduser,
    }
})