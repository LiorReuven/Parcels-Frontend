import React, { useRef } from 'react';

import classes from './SearchBar.module.css';

const SearchBar = (props) => {
  const searchInput = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (
      searchInput.current.value.trim().toUpperCase().length <= 5 &&
      searchInput.current.value.trim().toUpperCase().length > 0
    ) {
      props.setNotification({
        invalid: 'Must contain 6 characters to search',
        canShow: true,
      });
    } else if (searchInput.current.value.trim().toUpperCase().length === 0) {
      props.setNotification({});
      props.setSearchTerm(searchInput.current.value.trim().toUpperCase());
    } else {
      props.setNotification({});
      props.setSearchTerm(searchInput.current.value.trim().toUpperCase());
    }
  };

  return (
    <div className={classes['searchbar-div']}>
      <form onSubmit={onSubmitHandler}>
        <input
          ref={searchInput}
          type="search"
          placeholder="Enter barcode number"
          className={classes['search-input']}
        />
      </form>
    </div>
  );
};

export default React.memo(SearchBar);
