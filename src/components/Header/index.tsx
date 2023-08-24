import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';

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
    <header id="header">
      <div id="header-profile">
        <h1 data-testid="page-title">{title}</h1>
        <button
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
      {showSearch && (
        <div id="header-search">
          <button
            type="button"
            onClick={ handleSearch }
          >
            <img
              src={ SearchIcon }
              alt="Search Icon"
              data-testid="search-top-btn"
            />
          </button>
        </div>
      )}
      {search && (
        <div>
          <input
            type="text"
            placeholder="Search"
            data-testid="search-input"
          />
          <button
            type="button"
          >
            Search
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
