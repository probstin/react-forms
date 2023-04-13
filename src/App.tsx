import { Route, Routes } from 'react-router-dom';
import EmployeeDetails from './containers/EmployeeDetails';
import EmployeeList from './containers/EmployeeList';
import Home from './containers/Home';
import Layout from './containers/Layout';

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/:id" element={<EmployeeDetails/>}/>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
