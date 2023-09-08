import React from "react";

const ArticleSortControls = ({ onSortChange, sortOptions }) => {
  const { sortBy, sortOrder } = sortOptions;

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    onSortChange(name, value);
  };

  return (
    <div className="mb-3">
      <label className="me-2">Sort By:</label>
      <select
        name="sortBy"
        value={sortBy}
        onChange={handleSortChange}
        className="me-3"
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <label className="me-2">Sort Order:</label>
      <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
};

export default ArticleSortControls;
