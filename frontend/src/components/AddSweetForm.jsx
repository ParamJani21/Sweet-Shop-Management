import React from 'react';

function AddSweetForm({ form, onInput, onSubmit, loading, error, success }) {
  return (
    <form className="add-sweet-form" onSubmit={onSubmit} autoComplete="off">
      <label>
        Name:
        <input name="name" value={form.name} onChange={onInput} required />
      </label>
      <label>
        Category:
        <input name="category" value={form.category} onChange={onInput} required />
      </label>
      <label>
        Price:
        <input name="price" type="number" min="0.01" step="0.01" value={form.price} onChange={onInput} required />
      </label>
      <label>
        Quantity:
        <input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={onInput} required />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Sweet'}</button>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
    </form>
  );
}

export default AddSweetForm; 