import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Profile() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [stats, setStats] = useState({ totalVotes: 0, uploads: 0 });

  useEffect(() => {
    const fetchUserPhotos = async () => {
      const q = query(collection(db, "weekly_uploads"), where("uploaderId", "==", userId));
      const snapshot = await getDocs(q);
      const userPhotos = snapshot.docs.map(doc => doc.data());
      
      setPhotos(userPhotos);
      
      // Calculate Stats
      const totalVotes = userPhotos.reduce((acc, curr) => acc + (curr.votes || 0), 0);
      setStats({ totalVotes, uploads: userPhotos.length });
    };
    
    if (userId) fetchUserPhotos();
  }, [userId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
        <p><strong>Total Uploads:</strong> {stats.uploads}</p>
        <p><strong>Total Votes Received:</strong> {stats.totalVotes}</p>
      </div>

      <h3>Gallery</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {photos.map((photo, index) => (
          <div key={index}>
             <img src={photo.imageUrl} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
             <p style={{fontSize: '0.8em'}}>Week: {photo.weekId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
