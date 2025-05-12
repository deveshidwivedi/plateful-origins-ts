import React from 'react';
import './Header.scss';
import Navbar from './Navbar';
import SearchForm from './SearchForm';

const Header: React.FC = () => {
  return (
    <header className="header">
      <Navbar />
      <div className="header-content flex align-center justify-center flex-column text-center">
        <SearchForm />
        <h1 className="text-white header-title ls-2">
          Tell us what makes your taste buds dance!
        </h1>
        <p className="text-uppercase text-white my-3 ls-1">
          Select your go-to cuisines and we’ll guide you through a world of authentic flavors.
        </p>
      </div>
    </header>
  );
};

export default Header;
