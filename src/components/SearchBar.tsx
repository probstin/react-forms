import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface SearchBarProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    identifiers: string[];
    identifierType: string;
    identifierValue: string;
    submitSearch: (data: any) => void;
    handleSubmit: UseFormHandleSubmit<FieldValues>;
    handleSelectChange: ({ target }: SelectChangeEvent) => void;
    isValid: boolean;
}

const SearchBar = ({ ...props }: SearchBarProps): JSX.Element => {
    return (
        <form onSubmit={props.handleSubmit(props.submitSearch)}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* IDENTIFIER TYPE SELECT */}
                <FormControl variant="outlined" size="small" sx={{ marginRight: '.5rem' }}>
                    <InputLabel id="identifier-select-label">Identifier</InputLabel>
                    <Select
                        labelId="identifier-select-label"
                        id="identifier-select"
                        value={props.identifierType}
                        onChange={props.handleSelectChange}
                        label="Identifier"
                    >
                        {props.identifiers.map((identifier, i) => <MenuItem key={i} value={identifier}>{identifier}</MenuItem>)}
                    </Select>
                </FormControl>
                {/* IDENTIFIER VALUE INPUT */}
                {/* probably should figure out a way to dnamically render the input along with its controls.*/}
                {/* Knowing about the 'identifierValue' name is probably too much knowledge for a 'dumb' component */}
                <TextField
                    id="identifier-input"
                    label={props.identifierType}
                    variant="outlined"
                    size="small"
                    sx={{ marginRight: '.5rem' }}
                    {...props.register('identifierValue')}
                    error={props.errors.identifierValue ? true : false}
                    helperText={props.errors.identifierValue?.message?.toString()}
                />
                {/* FORM SUBMISSION */}
                <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    disabled={!props.isValid}>
                    Search
                </Button>
            </Box >
        </form>
    );
}

export default SearchBar;
