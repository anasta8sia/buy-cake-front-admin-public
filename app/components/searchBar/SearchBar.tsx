import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './searchBar.module.scss';

const SearchBar = ({ searchTable }: { searchTable: (newSearchValue: string) => void }) => {
  const [searchValue, setSearchValue] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>(undefined);

  function submitForm (ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    searchTable(searchValue);
  };

  const updateParentSearchValueWithDebounce = (_searchValue: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const _timeoutId = setTimeout(() => searchTable(_searchValue), 300);

    setTimeoutId(_timeoutId);
  };

  const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(ev.target.value);

    updateParentSearchValueWithDebounce(ev.target.value);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          className={styles.search_bar_input}
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={onInputChange}>
        </input>
      </form>

    </div>
  );
};

export default SearchBar;
