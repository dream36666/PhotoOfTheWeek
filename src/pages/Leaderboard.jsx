import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Trophy, Medal, Star } from 'lucide-react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const querySnapshot = await getDocs(collection(db, "weekly_uploads"));
      const uploads = querySnapshot.docs.map(doc => doc.data());

      // Group data by user
      const userStats = uploads.reduce((acc, photo) => {
        const id = photo.uploaderId;
        if (!acc[id]) {
          acc[id] = { 
            name: photo.uploaderName, 
            totalVotes: 0, 
            uploadCount: 0,
            id: id 
          };
        }
        acc[id].totalVotes += (photo.votes || 0);
        acc[id].uploadCount += 1;
        return acc;
      }, {});

      // Convert to array and sort by votes
      const sortedLeaders = Object.values(userStats)
        .sort((a, b) => b.totalVotes - a.totalVotes)
        .slice(0, 10); // Top 10

      setLeaders(sortedLeaders);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div style={{ padding: '40px' }}>Calculating rankings...</div>;

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Trophy color="gold" style={{ marginRight: '10px' }} /> 
        All-Time Leaderboard
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {leaders.map((user, index) => (
          <div key={user.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '15px', 
            background: index === 0 ? '#fffdf0' : '#f9f9f9',
            borderRadius: '12px',
            border: index === 0 ? '2px solid gold' : '1px solid #eee',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <div style={{ width: '40px', fontWeight: 'bold', fontSize: '1.2rem' }}>
              {index === 0 ? <Medal color="gold" /> : index + 1}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '1.1rem' }}>{user.name}</strong>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>{user.uploadCount} Photos Submitted</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 'bold', color: '#333' }}>{user.totalVotes}</div>
              <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase' }}>Total Votes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
