import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('http://127.0.0.1:5000/generate-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.video_url) {
      setVideoUrl(data.video_url);
    } else {
      alert('Failed to generate video');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generate AI Video</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Video'}
          </button>
        </form>
        {videoUrl && (
          <div className="video-container">
            <h2>Generated Video</h2>
            <video controls src={videoUrl} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
