import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { getVotingWeekId } from '../utils';

export default function Vote() {
  const [photos, setPhotos] = useState([]);
  const { currentUser } = useAuth();
  const votingWeek = getVotingWeekId();

  useEffect(() => {
    const fetchPhotos = async () => {
      const q = query(collection(db, "weekly_uploads"), where("weekId", "==", votingWeek));
      const snapshot = await getDocs(q);
      setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPhotos();
  }, [votingWeek]);

  const handleVote = async (photo) => {
    if (!currentUser) return alert("Please login to vote");
    if (photo.voters && photo.voters.includes(currentUser.uid)) return alert("You already voted for this!");

    const photoRef = doc(db, "weekly_uploads", photo.id);
    await updateDoc(photoRef, {
      votes: increment(1),
      voters: arrayUnion(currentUser.uid)
    });

    // Optimistic UI update
    setPhotos(prev => prev.map(p => 
      p.id === photo.id ? { ...p, votes: p.votes + 1, voters: [...p.voters, currentUser.uid] } : p
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Voting for Week: {votingWeek}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {photos.map(photo => (
          <div key={photo.id} style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={photo.imageUrl} alt="submission" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '10px' }}>
              <p>By: {photo.uploaderName}</p>
              <p>Votes: {photo.votes}</p>
              <button 
                onClick={() => handleVote(photo)} 
                disabled={photo.voters?.includes(currentUser?.uid)}
              >
                {photo.voters?.includes(currentUser?.uid) ? "Voted" : "Vote"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
