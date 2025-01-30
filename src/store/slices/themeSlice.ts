import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { usePrefersTheme } from 'react-haiku';
// Define a type for the slice state
interface ThemeState {
    theme: "light" | 'dark' | 'system'
}

// Define the initial state using that type
const initialState: ThemeState = {
    theme: 'system',
}

export const themeSlice = createSlice({
    name: 'theme',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setLight: (state) => {
            state.theme = 'light'
        }
        ,
        setDark: (state) => {
            state.theme = 'dark'
        },
        setSystem: (state) => {
            state.theme = 'system'
        },
        setTheme: (state, action: PayloadAction<"dark" | "light" | 'system'>) => {
            state.theme = action.payload
        }

    },
})

export const { setDark, setLight, setSystem, setTheme } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default themeSlice.reducer