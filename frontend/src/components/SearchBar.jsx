function SearchBar({ value, onChange }) {
    return (
        <input
            className="search-box"
            placeholder="🔍 Search decisions..."
            value={value}
            onChange={onChange}
        />
    );
}

export default SearchBar;