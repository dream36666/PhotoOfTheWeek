import React from 'react';
import { HelpCircle, Upload, Vote, Trophy } from 'lucide-react';

export default function Info() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1><HelpCircle style={{ verticalAlign: 'middle', marginRight: '10px' }} /> How it Works</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h3><Upload size={20} /> The Upload Cycle (Monday - Sunday)</h3>
        <p>
          Every week from Monday morning to Sunday night, you can upload <strong>one photo</strong>. 
          If you change your mind, just upload a new one—it will automatically replace your previous entry for that week.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3><Vote size={20} /> The Voting Cycle</h3>
        <p>
          While you are uploading for the <em>current</em> week, you are also voting for <em>last week's</em> photos! 
          Winners are determined by the community. You get one vote per photo.
        </p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3><Trophy size={20} /> Profiles & Wins</h3>
        <p>
          Your profile tracks how many photos you've submitted and how many total votes you've received across all weeks. 
          Search by tags like <code>#nature</code> or <code>#city</code> to find specific styles!
        </p>
      </section>

      <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', borderLeft: '5px solid #333' }}>
        <p><strong>Need help?</strong> If your photo isn't appearing, ensure you are logged in with your Google account and that the file size is under 5MB.</p>
      </div>
    </div>
  );
}
