import React, { useState, useEffect } from 'react';
import './App.css';
import DashboardCards from './components/DashboardCards';
import AddSweetForm from './components/AddSweetForm';
import SweetsTable from './components/SweetsTable';
import PurchaseRestock from './components/PurchaseRestock';

const API_URL = 'http://localhost:3001';

function App() {
  const [view, setView] = useState(null); // null, 'add', 'view', 'manage'
  const [addForm, setAddForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // View Sweets state
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });
  const [filteredSweets, setFilteredSweets] = useState([]);

  // Purchase/Restock state
  const [prLoading, setPrLoading] = useState(false);
  const [prError, setPrError] = useState('');
  const [prSuccess, setPrSuccess] = useState('');

  useEffect(() => {
    if (view === 'view' || view === 'manage') {
      fetchSweets();
    }
    // eslint-disable-next-line
  }, [view]);

  useEffect(() => {
    // Apply filters client-side
    let filtered = sweets;
    if (filters.name.trim()) {
      filtered = filtered.filter(s => s.name.toLowerCase().includes(filters.name.trim().toLowerCase()));
    }
    if (filters.category.trim()) {
      filtered = filtered.filter(s => s.category.toLowerCase().includes(filters.category.trim().toLowerCase()));
    }
    if (filters.minPrice) {
      filtered = filtered.filter(s => Number(s.price) >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(s => Number(s.price) <= Number(filters.maxPrice));
    }
    setFilteredSweets(filtered);
  }, [filters, sweets]);

  const fetchSweets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/sweets`);
      if (!res.ok) throw new Error('Failed to fetch sweets');
      const data = await res.json();
      setSweets(data);
    } catch (err) {
      setError('Failed to fetch sweets.');
    }
    setLoading(false);
  };

  const handleAddInput = (e) => {
    const { name, value } = e.target;
    setAddForm(f => ({ ...f, [name]: value }));
    setAddError('');
    setAddSuccess('');
  };

  const validateAddForm = () => {
    if (!addForm.name.trim() || !addForm.category.trim() || !addForm.price || !addForm.quantity) {
      return 'All fields are required.';
    }
    if (isNaN(addForm.price) || Number(addForm.price) <= 0) {
      return 'Price must be a positive number.';
    }
    if (isNaN(addForm.quantity) || Number(addForm.quantity) < 0) {
      return 'Quantity must be 0 or more.';
    }
    return '';
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const err = validateAddForm();
    if (err) {
      setAddError(err);
      return;
    }
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');
    try {
      // Generate a unique numeric ID
      const newId = Date.now();
      const sweetToAdd = {
        id: newId,
        name: addForm.name.trim(),
        category: addForm.category.trim(),
        price: Number(addForm.price),
        quantity: Number(addForm.quantity)
      };
      const res = await fetch(`${API_URL}/sweets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sweetToAdd)
      });
      if (!res.ok) throw new Error('Failed to add sweet');
      setAddSuccess('Sweet added successfully!');
      setAddForm({ name: '', category: '', price: '', quantity: '' });
    } catch (err) {
      setAddError('Failed to add sweet. Please try again.');
    }
    setAddLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ name: '', category: '', minPrice: '', maxPrice: '' });
  };

  // Handle purchase/restock submit
  const handlePurchaseRestock = async ({ id, action, quantity }) => {
    console.log('handlePurchaseRestock called with:', id, typeof id, action, quantity);
    setPrLoading(true);
    setPrError('');
    setPrSuccess('');
    try {
      const res = await fetch(`${API_URL}/sweets/${id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Operation failed');
      setPrSuccess(data.message || 'Success!');
      fetchSweets(); // Refresh sweets list
    } catch (err) {
      setPrError(err.message);
    }
    setPrLoading(false);
  };

  return (
    <div className="dashboard-gradient-bg">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">Sweet Shop Management</div>
        <div className="dashboard-center">
          {!view && (
            <DashboardCards onSelect={setView} />
          )}
          {view === 'add' && (
            <div className="dashboard-content">
              <button onClick={() => setView(null)}>Back</button>
              <h2>Add Sweet</h2>
              <AddSweetForm
                form={addForm}
                onInput={handleAddInput}
                onSubmit={handleAddSubmit}
                loading={addLoading}
                error={addError}
                success={addSuccess}
              />
            </div>
          )}
          {view === 'view' && (
            <div className="dashboard-content">
              <button onClick={() => setView(null)}>Back</button>
              <h2>All Sweets</h2>
              <SweetsTable
                sweets={filteredSweets}
                loading={loading}
                error={error}
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
            </div>
          )}
          {view === 'manage' && (
            <div className="dashboard-content">
              <button onClick={() => setView(null)}>Back</button>
              <h2>Purchase/Restock Sweet</h2>
              <PurchaseRestock
                sweets={sweets}
                onSubmit={handlePurchaseRestock}
                loading={prLoading}
                error={prError}
                success={prSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
