import React, {useState} from 'react';
import St from './style';

const ArtistSearch = ({navigate}: any) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/', {state: searchInput});
  };
  return (
    <St.SearchForm onSubmit={handleSearchBtn}>
      <St.SearchInput
        type="text"
        value={searchInput}
        onChange={e => handleSearchInput(e)}
        placeholder="검색어를 입력해주세요"
      />
    </St.SearchForm>
  );
};

export default ArtistSearch;
