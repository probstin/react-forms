import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
    const initialFormState = {
        first_name: '',
        last_name: '',
    };
    const { id } = useParams();
    const [employee, setEmployee] = useState<any>(initialFormState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:4500/employees/${id}`)
            .then(response => response.json())
            .then((data: any) => {
                setEmployee(data);
                setLoading(false);
            });
    }, [id, setEmployee]);

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setEmployee({ ...employee, [name]: value });
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        await fetch(`http://localhost:4500/employees/${employee.id}`, {
            method: 'PUT',
            body: JSON.stringify(employee)
        }).then(data => setEmployee(data));
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h1>{employee.name}</h1>
            <form onSubmit={handleSubmit}>
                <TextField id="outlined-basic" name="first_name" label="First Name" variant="outlined" value={employee.first_name || ''} onChange={handleChange} />
                <TextField id="outlined-basic" name="last_name" label="Last Name" variant="outlined" value={employee.last_name || ''} onChange={handleChange} />
                <Button color="primary" type="submit">Save</Button>
            </form>
        </Container>
    );
}

export default EmployeeDetails;