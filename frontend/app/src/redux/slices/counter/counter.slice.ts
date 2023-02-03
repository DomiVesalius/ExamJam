import { createSlice, Draft } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state
interface CounterState {
    value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state: Draft<CounterState>) => {
            state.value += 1;
        },
        decrement: (state: Draft<CounterState>) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state: Draft<CounterState>, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
});

// Actions to be used in useAppDispatch. Ex: useAppDispatch(increment())
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Selector to be used in useAppSelector. Ex: useAppSelector(selectCount)
export const selectCount = (state: RootState) => state.counterReducer.value;

// This is added to store.ts
const counterReducer = counterSlice.reducer;

export default counterReducer;
