import React from 'react';
import { alpha, Box, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Form, FormikProvider, useFormik } from 'formik';

interface SearchProps {
    /** Color of Search Bar when hovering */
    hoverColor: string;

    /** Color of Search Bar (default) */
    defaultColor: string;

    /** Placeholder text in search */
    placeHolder: string;

    /** Function to set state for 'Enter' key press for search bar */
    handleSubmit: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar = ({ hoverColor, defaultColor, placeHolder, handleSubmit }: SearchProps) => {
    const searchFormik = useFormik({
        initialValues: { query: '' },
        onSubmit: async (values) => {
            handleSubmit(values.query);
        }
    });

    return (
        <Box sx={{ justifyContent: 'center', width: '100%' }}>
            <FormikProvider value={searchFormik}>
                <Form>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        id="query"
                        name="query"
                        label="Search"
                        placeholder={placeHolder}
                        value={searchFormik.values.query}
                        onChange={searchFormik.handleChange}
                        sx={{
                            backgroundColor: alpha(defaultColor, 0.15),
                            '&:hover': {
                                backgroundColor: alpha(hoverColor, 0.25)
                            },
                            width: '84%'
                        }}
                    />
                    <Box
                        alignItems="center"
                        justifySelf="center"
                        display="inline-flex"
                        sx={{ ml: 1, mt: 1 }}
                    >
                        <Button
                            endIcon={<SearchIcon />}
                            variant="outlined"
                            size="large"
                            sx={{ textAlign: 'center' }}
                            type="submit"
                        >
                            Search
                        </Button>
                    </Box>
                </Form>
            </FormikProvider>
        </Box>
    );
};
