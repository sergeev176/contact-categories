import './App.css';
// import {  useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AddCategory from './components/AddCategory';
import HomePage from './components/HomePage';
import ActiveCategory from './components/ActiveCategory';
import Some from './components/Some';
import Header from './components/Header';

function App() {

  // const categories = useSelector(state => state.categories.categories)
  // console.log(categories)

  return (
    <div className='container'>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add' element={<AddCategory />} />
          <Route path='/active' element={<ActiveCategory />} />
          <Route path='/some' element={<Some />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
