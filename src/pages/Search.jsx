import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Searches for photos where the 'tags' array contains the search term
    const q = query(collection(db, "weekly_uploads"), where("tags", "array-contains", searchTerm.toLowerCase()));
    const snapshot = await getDocs(q);
    setResults(snapshot.docs.map(doc => doc.data()));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Photos</h2>
      <form onSubmit={handleSearch}>
        <input 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder="Search by tag (e.g. nature)" 
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {results.map((photo, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', border: '1px solid #eee', padding: '10px' }}>
            <img src={photo.imageUrl} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
            <div>
              <p>By: {photo.uploaderName}</p>
              <p>Week: {photo.weekId}</p>
              <p>Votes: {photo.votes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
