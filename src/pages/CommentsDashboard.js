import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComments } from '../services/api';
import { getSavedState, saveState } from '../services/storage';
import CommentTable from '../components/CommentTable';
import Pagination from '../components/Pagination';
import { sortData, filterData } from '../utils/helpers';

const CommentsDashboard = () => {
  const [rawComments, setRawComments] = useState([]);
  const [displayComments, setDisplayComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getComments();
        setRawComments(data);
        
        const savedState = getSavedState();
        if (savedState) {
          setCurrentPage(savedState.currentPage || 1);
          setPageSize(savedState.pageSize || 10);
          setSortConfig(savedState.sortConfig || { key: null, direction: 'asc' });
          setSearchTerm(savedState.searchTerm || '');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading comments:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (rawComments.length === 0) return;
    
    // Apply filtering and sorting
    let processed = [...rawComments];
    processed = filterData(processed, searchTerm);
    processed = sortData(processed, sortConfig.key, sortConfig.direction);
    
    setDisplayComments(processed);
    setCurrentPage(1); // Reset to first page when filters change
  }, [rawComments, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    
    const newSortConfig = direction ? { key, direction } : { key: null, direction: 'asc' };
    setSortConfig(newSortConfig);
    saveState({ currentPage, pageSize, sortConfig: newSortConfig, searchTerm });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    saveState({ currentPage, pageSize, sortConfig, searchTerm: e.target.value });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    saveState({ currentPage: page, pageSize, sortConfig, searchTerm });
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    saveState({ currentPage: 1, pageSize: size, sortConfig, searchTerm });
  };

  const totalPages = Math.ceil(displayComments.length / pageSize);
  const paginatedComments = displayComments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <div className="loading">Loading comments...</div>;

  return (
    <div className="comments-dashboard">
      <header>
        <h1>SWIFT</h1>
      </header>
      
      <CommentTable
        comments={paginatedComments}
        onSort={handleSort}
        sortConfig={sortConfig}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      
      <button 
        className="view-profile-btn"
        onClick={() => navigate('/profile')}
      >
        View Profile
      </button>
    </div>
  );
};

export default CommentsDashboard;