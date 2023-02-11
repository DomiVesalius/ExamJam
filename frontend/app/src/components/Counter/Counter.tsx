import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
    decrement,
    increment,
    incrementByAmount,
    selectCount
} from '../../redux/slices/counter/counter.slice';

function Counter() {
    const incrementAmount = 2;
    const value = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div>
                <Typography variant="h1">{value}</Typography>
            </div>

            <ButtonGroup variant="contained">
                <Button onClick={() => dispatch(increment())}>Increment</Button>
                <Button onClick={() => dispatch(decrement())}>Decrement</Button>
                <Button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
                    Increment by {incrementAmount}
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Counter;
