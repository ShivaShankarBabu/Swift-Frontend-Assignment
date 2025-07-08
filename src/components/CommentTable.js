import React from 'react';

const CommentTable = ({ 
  comments, onSort, sortConfig, searchTerm, onSearch 
}) => {
  return (
    <div className="comment-table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search name, email, comment"
          value={searchTerm}
          onChange={onSearch}
        />
      </div>
      <table className="comment-table">
        <thead>
          <tr>
            <th onClick={() => onSort('postId')}>
              Post ID {sortConfig.key === 'postId' && (
                sortConfig.direction === 'asc' ? '↑' : '↓'
              )}
            </th>
            <th onClick={() => onSort('name')}>
              Name {sortConfig.key === 'name' && (
                sortConfig.direction === 'asc' ? '↑' : '↓'
              )}
            </th>
            <th onClick={() => onSort('email')}>
              Email {sortConfig.key === 'email' && (
                sortConfig.direction === 'asc' ? '↑' : '↓'
              )}
            </th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td>{comment.postId}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td className="comment-body">{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentTable;