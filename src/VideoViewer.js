import React, { useState } from 'react';
import axios from 'axios';
import FileDownload from 'react-file-download';
import loadingSpinner from "./Iphone-spinner-2.gif";

const VideoViewer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoEmbedCode, setVideoEmbedCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoadVideo = async () => {
    setLoading(true);

    const options = {
      method: 'GET',
      url: 'https://instagram-downloader-download-instagram-videos-stories.p.rapidapi.com/index',
      params: {
        url: videoUrl,
      },
      headers: {
        'X-RapidAPI-Key': '9bb9db8617mshc76c44fceb9b639p1e502bjsn84454e0822b1',
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-stories.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const data = response.data;
      console.log(data.media);
      setVideoEmbedCode(data.media);
    } catch (error) {
      console.error(error);
      setVideoEmbedCode('<p>Error loading video. Please check the URL.</p>');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadVideo = () => {
    // Use react-file-download to trigger the download
    FileDownload(videoEmbedCode, 'downloaded_video.mp4');
  };

  return (
    <div className="container" style={styles.container}>
      <h1 style={styles.heading}>Instagram reel downloader</h1>
      <div className="input-container" style={styles.inputContainer}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste video URL here"
          style={styles.input}
          required
        />
        <button onClick={handleLoadVideo} style={styles.loadButton}>
          Load Video
        </button>
      </div>

      {loading && <img src={loadingSpinner} alt="loading..." style={styles.loadingSpinner} />}

      {videoEmbedCode && !loading && (
        <div>
          <video controls width="100%" style={styles.video}>
            <source src={videoEmbedCode} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleDownloadVideo} style={styles.downloadButton}>
            Download Video
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '50px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    maxWidth: '600px', // Set a maximum width to make the content more readable on larger screens
    margin: 'auto', // Center the container
  },
  heading: {
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '100%', // Use full width on smaller screens
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  loadButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  loadingSpinner: {
    marginTop: '20px',
    width: '50px',
  },
  video: {
    marginTop: '20px',
    maxWidth: '100%', // Ensure the video does not overflow its container
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default VideoViewer;