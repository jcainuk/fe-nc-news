import React from "react";

const ArticleSortControls = ({
  onSortChange,
  sortOptions,
  onApplyFilters,
  onResetFilters
}) => {
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
        <option value="">None</option>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <label className="me-2">Sort Order:</label>
      <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="">None</option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <button
        onClick={onApplyFilters}
        disabled={!sortBy || !sortOrder}
        className="btn btn-primary mx-2"
      >
        Apply filters
      </button>
      <button onClick={onResetFilters} className="btn btn-secondary">
        Reset filters
      </button>
    </div>
  );
};

export default ArticleSortControls;
