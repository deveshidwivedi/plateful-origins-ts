import React from 'react';
import './Loader.scss';
import { loader } from '../../utils/images';

const Loader: React.FC = () => {
  return (
    <div className="loader my-5">
      <div className="container flex align-center justify-center">
        <img src={loader} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
