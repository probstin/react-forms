import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import DetailsIcon from '@mui/icons-material/Details';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeList = () => {
    const [employees, setEmployees] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('http://localhost:4500/employees')
            .then(response => response.json())
            .then(data => {
                setEmployees(data);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: any): Promise<void> => {
        await fetch(`http://localhost:4500/employees/${id}`, { method: 'DELETE' })
            .then(() => {
                let updatedEmployees = [...employees].filter((i: any) => i.id !== id);
                setEmployees(updatedEmployees);
            });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <List>
            {employees.map((employee: any) => {
                return <ListItem key={employee.id} secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="view employee details" component={Link} to={`/employees/${employee.id}`}>
                            <DetailsIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="edit employee" component={Link} to={`/employees/${employee.id}`}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete employee" onClick={() => handleDelete(employee.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }>
                    <ListItemText primary={JSON.stringify(employee)} />
                </ListItem>
            })}
        </List>
    );
}

export default EmployeeList;