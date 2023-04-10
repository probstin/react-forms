import { yupResolver } from '@hookform/resolvers/yup';
import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import SearchBar, { SearchBarProps } from './components/SearchBar';

function App(): JSX.Element {
  const identifiers: string[] = ['SSN', 'Badge No.'].sort();
  const [identifierType, setIdentifierType] = useState(identifiers[0]);
  const [identifierValue, setIdentifierValue] = useState('');

  const handleSelectChange = ({ target }: SelectChangeEvent): void => {
    !!identifierValue.length && setIdentifierValue('');
    reset();
    setIdentifierType(target.value);
  };

  const submitSearch = (data: any): void => {
    console.log(data); // call the submit handler from the props
  };

  const validationSchema = object().shape({
    identifierValue:
      (identifierType === 'SSN') // don't string compare, use our enum
        ? string().min(9, 'SSN must be 9 characters') // use a matcher with your RegEx
        : string().min(7, 'Badge No. must be 7 characters')  // use a matcher with your RegEx
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const searchBarProps: SearchBarProps = {
    register,
    errors,
    identifiers,
    identifierType,
    identifierValue,
    submitSearch,
    handleSelectChange,
    handleSubmit,
    isValid
  };

  return (
    <SearchBar {...searchBarProps} />
  );
}

export default App;
