import React, { useState } from 'react';

function PurchaseRestock({ sweets, onSubmit, loading, error, success }) {
  const [selectedId, setSelectedId] = useState('');
  const [action, setAction] = useState('purchase');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SelectedId:', selectedId, typeof selectedId);
    if (!selectedId || !quantity) return;
    onSubmit({ id: Number(selectedId), action, quantity: Number(quantity) });
  };

  return (
    <form className="purchase-restock-form" onSubmit={handleSubmit} autoComplete="off">
      <label>
        Select Sweet:
        <select value={selectedId} onChange={e => setSelectedId(e.target.value)} required>
          <option value="" disabled>Select a sweet</option>
          {sweets.filter(s => typeof s.id === 'number' && !isNaN(s.id)).map(s => (
            <option key={s.id} value={s.id}>{s.name} (Stock: {s.quantity})</option>
          ))}
        </select>
      </label>
      <div className="pr-action-toggle">
        <label>
          <input type="radio" name="action" value="purchase" checked={action === 'purchase'} onChange={() => setAction('purchase')} />
          Purchase
        </label>
        <label>
          <input type="radio" name="action" value="restock" checked={action === 'restock'} onChange={() => setAction('restock')} />
          Restock
        </label>
      </div>
      <label>
        Quantity:
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} required />
      </label>
      <button type="submit" disabled={loading || !selectedId || !quantity}>{loading ? (action === 'purchase' ? 'Purchasing...' : 'Restocking...') : (action === 'purchase' ? 'Purchase' : 'Restock')}</button>
      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}
    </form>
  );
}

export default PurchaseRestock; 