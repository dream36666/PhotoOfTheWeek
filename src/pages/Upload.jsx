import React, { useState } from 'react';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { getCurrentWeekId } from '../utils';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !currentUser) return;

    setLoading(true);
    const weekId = getCurrentWeekId();
    
    // 1. Storage Reference (Folder: photos/2023-W42/userId)
    const storageRef = ref(storage, `photos/${weekId}/${currentUser.uid}`);
    
    try {
      // Upload Image
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // 2. Database Entry
      // ID format: weekId_userId ensures strict 1 entry per user per week
      const docId = `${weekId}_${currentUser.uid}`;
      
      await setDoc(doc(db, "weekly_uploads", docId), {
        imageUrl: url,
        uploaderId: currentUser.uid,
        uploaderName: currentUser.displayName,
        weekId: weekId,
        tags: tags.toLowerCase().split(',').map(t => t.trim()), // "Nature, Tree" -> ["nature", "tree"]
        votes: 0,
        voters: [], // Tracks who voted to prevent double voting
        createdAt: new Date()
      }, { merge: true }); // Merge allows updating the entry if they upload again

      alert("Photo uploaded successfully! Your previous photo for this week (if any) was replaced.");
      setFile(null);
      setTags("");
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Error uploading photo.");
    }
    setLoading(false);
  };

  if (!currentUser) return <h3>Please login to upload.</h3>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload for Week: {getCurrentWeekId()}</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" required />
        <input 
          type="text" 
          placeholder="Tags (e.g. nature, sky, blue)" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
          required 
        />
        <button disabled={loading} type="submit">
          {loading ? "Uploading..." : "Submit Photo"}
        </button>
      </form>
      <p style={{marginTop: '20px', fontSize: '0.9em', color: '#666'}}>
        Note: You can only have one photo per week. Uploading again will replace your current submission.
      </p>
    </div>
  );
}
