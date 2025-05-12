import React, { useState } from 'react';
import './Header.scss';
import { BsSearch } from 'react-icons/bs';
import { useMealContext } from '../../context/mealContext';
import { useNavigate } from 'react-router-dom';
import { startFetchMealsBySearch } from '../../actions/mealsActions';

const SearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { dispatch } = useMealContext();

  const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.replace(/[^\w\s]/gi, '').length !== 0) {
      setSearchTerm(value);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid search term ...');
    }
  };

  const handleSearchResult = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
    startFetchMealsBySearch(dispatch, searchTerm);
  };

  return (
    <form className="search-form flex align-center" onSubmit={handleSearchResult}>
      <input
        type="text"
        className="form-control-input text-dark-gray fs-15"
        placeholder="Explore authentic recipes"
        onChange={handleSearchTerm}
      />
      <button type="submit" className="form-submit-btn text-white text-uppercase fs-14">
        <BsSearch className="btn-icon" size={20} />
      </button>
    </form>
  );
};

export default SearchForm;
