import React from 'react';

function SweetsTable({ sweets, loading, error, filters, onFilterChange, onResetFilters }) {
  return (
    <>
      <div className="sweets-controls">
        <input name="name" placeholder="Search by name" value={filters.name} onChange={onFilterChange} />
        <input name="category" placeholder="Category" value={filters.category} onChange={onFilterChange} />
        <input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={onFilterChange} />
        <input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={onFilterChange} />
        <button onClick={onResetFilters} type="button">Reset</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="sweets-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {sweets.length === 0 ? (
                <tr><td colSpan="5">No sweets found.</td></tr>
              ) : (
                sweets.map(sweet => (
                  <tr key={sweet.id || sweet.name}>
                    <td>{sweet.id}</td>
                    <td>{sweet.name}</td>
                    <td>{sweet.category}</td>
                    <td>{sweet.price}</td>
                    <td>{sweet.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default SweetsTable; 