import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';

type HeaderProps = {
  title: string;
  showSearch?: boolean;
};

function Header({ title, showSearch = true }: HeaderProps) {
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <>
      <header
        id="header"
        className="d-flex  justify-content-between w-100
        align-items-center p-2 bg-secondary shadow"
      >
        <img
          className="w-50"
          src="/src/images/logomd.svg"
          alt="Logo Svg"
        />
        <div
          id="header-profile"
          className="d-flex justify-content-center align-items-center gap-2"
        >
          {showSearch && (
            <button
              id="header-search"
              className="btn btn-outline-primary border-2 bg-tertiary w-50 p-1"
              type="button"
              onClick={ handleSearch }
            >
              <img
                src={ SearchIcon }
                alt="Search Icon"
                data-testid="search-top-btn"
              />
            </button>
          )}
          <button
            className="btn btn-outline-primary border-2 bg-tertiary w-50 p-1"
            type="button"
            onClick={ () => navigate('/profile') }
          >
            <img
              src={ ProfileIcon }
              alt="Profile Icon"
              data-testid="profile-top-btn"
            />
          </button>
        </div>
      </header>
      {search && <SearchBar />}
      <h1
        className="text-primary display-3 mt-3"
        data-testid="page-title"
      >
        {title}
      </h1>
    </>
  );
}

export default Header;
