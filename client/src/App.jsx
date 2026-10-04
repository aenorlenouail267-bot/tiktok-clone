import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api';

function formatCount(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value;
}

function App() {
  const [feed, setFeed] = useState([]);
  const [users, setUsers] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState('nina');
  const [profile, setProfile] = useState(null);
  const [auth, setAuth] = useState({
    username: 'nina',
    password: 'demo123',
    fullName: 'Nina Harper'
  });

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    const [usersRes, feedRes, discoverRes, messagesRes] = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/feed`),
      fetch(`${API_URL}/discover`),
      fetch(`${API_URL}/messages`)
    ]);

    const usersData = await usersRes.json();
    const feedData = await feedRes.json();
    const discoverData = await discoverRes.json();
    const messagesData = await messagesRes.json();

    setUsers(usersData);
    setFeed(feedData);
    setDiscover(discoverData);
    setMessages(messagesData);

    const profileRes = await fetch(`${API_URL}/profile/${selectedUser}`);
    const profileData = await profileRes.json();
    setProfile(profileData);
  };

  useEffect(() => {
    if (!selectedUser) return;

    fetch(`${API_URL}/profile/${selectedUser}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [selectedUser]);

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: auth.username,
        password: auth.password
      })
    });

    const data = await response.json();
    if (data.user) {
      setSelectedUser(data.user.username);
      alert(`Welcome ${data.user.fullName}!`);
    }
  };

  const handleRegister = async () => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: auth.username,
        fullName: auth.fullName,
        password: auth.password
      })
    });

    const data = await response.json();
    if (data.user) {
      setSelectedUser(data.user.username);
      alert(`Account created for ${data.user.fullName}`);
    }
  };

  const handleLike = async (videoId) => {
    const response = await fetch(`${API_URL}/videos/${videoId}/like`, {
      method: 'POST'
    });

    const updatedVideo = await response.json();
    setFeed((current) =>
      current.map((video) => (video.id === updatedVideo.id ? updatedVideo : video))
    );
  };

  const handleComment = async (videoId) => {
    const text = window.prompt('Write a comment:');

    if (!text) return;

    const response = await fetch(`${API_URL}/videos/${videoId}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    if (data.count) {
      setFeed((current) =>
        current.map((video) =>
          video.id === videoId ? { ...video, comments: data.count } : video
        )
      );
    }
  };

  const currentUser = users.find((user) => user.username === selectedUser) || users[0];

  return (
    <div className="app-shell">
      <aside className="sidebar left-panel">
        <div className="logo-wrap">
          <div className="logo-badge">♪</div>
          <h1>TikTok</h1>
        </div>

        <nav className="nav-menu">
          <button className="nav-item active">Home</button>
          <button className="nav-item">Discover</button>
          <button className="nav-item">Inbox</button>
          <button className="nav-item">Profile</button>
        </nav>

        <div className="mini-card">
          <div className="mini-label">Suggested accounts</div>
          <div className="suggested-list">
            {users.slice(0, 3).map((user) => (
              <button key={user.id} className="user-chip" onClick={() => setSelectedUser(user.username)}>
                <img src={user.avatar} alt={user.fullName} />
                <span>{user.username}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="feed-panel">
        <header className="top-bar">
          <div className="tabs">
            <button className="tab active">Following</button>
            <button className="tab">For You</button>
          </div>

          <div className="search-box">
            <span>⌕</span>
            <input type="text" placeholder="Search creators" />
          </div>
        </header>

        <div className="video-feed">
          {feed.map((video) => (
            <article className="video-card" key={video.id}>
              <img src={video.thumbnail} alt={video.caption} className="video-poster" />
              <div className="video-overlay">
                <div className="video-meta">
                  <div className="creator-row">
                    <img src={video.avatar} alt={video.fullName} className="small-avatar" />
                    <div>
                      <strong>{video.fullName}</strong>
                      <span>{video.username}</span>
                    </div>
                    <button className="follow-btn">Follow</button>
                  </div>

                  <p className="caption">{video.caption}</p>
                  <div className="music-row">♫ {video.song}</div>
                </div>

                <div className="side-actions">
                  <button className="action-btn" onClick={() => handleLike(video.id)}>
                    <span>{video.liked ? '♥' : '♡'}</span>
                    <strong>{formatCount(video.likes)}</strong>
                  </button>
                  <button className="action-btn" onClick={() => handleComment(video.id)}>
                    <span>💬</span>
                    <strong>{formatCount(video.comments)}</strong>
                  </button>
                  <button className="action-btn">
                    <span>↗</span>
                    <strong>{formatCount(video.shares)}</strong>
                  </button>
                  <button className="action-btn profile-circle">
                    <span>◉</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <aside className="sidebar right-panel">
        <div className="profile-panel">
          <div className="profile-banner" style={{ background: `linear-gradient(135deg, ${currentUser?.accent || '#ff2d55'} 0%, #111827 100%)` }} />
          <div className="profile-header">
            <img src={currentUser?.avatar} alt={currentUser?.fullName} />
            <div>
              <h3>{currentUser?.fullName}</h3>
              <p>@{currentUser?.username}</p>
            </div>
          </div>

          <div className="stats-row">
            <div>
              <strong>{formatCount(currentUser?.followers || 0)}</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>{formatCount(currentUser?.following || 0)}</strong>
              <span>Following</span>
            </div>
          </div>

          <p className="profile-bio">{currentUser?.bio}</p>
        </div>

        <div className="mini-card">
          <div className="mini-label">Discover</div>
          <div className="trending-list">
            {discover.map((item) => (
              <div key={item.id} className="trend-item">
                <span>#{item.title.replace('#', '')}</span>
                <small>{formatCount(item.posts)} posts</small>
              </div>
            ))}
          </div>
        </div>

        <div className="mini-card messages-box">
          <div className="mini-label">Inbox</div>
          {messages.map((message) => (
            <div key={message.id} className="message-item">
              <div className="dot" />
              <div>
                <strong>{message.from}</strong>
                <p>{message.preview}</p>
              </div>
              <span>{message.time}</span>
            </div>
          ))}
        </div>

        <div className="auth-card">
          <h4>Login or create account</h4>
          <input
            type="text"
            value={auth.username}
            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
            placeholder="username"
          />
          <input
            type="text"
            value={auth.fullName}
            onChange={(e) => setAuth({ ...auth, fullName: e.target.value })}
            placeholder="full name"
          />
          <input
            type="password"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
            placeholder="password"
          />
          <div className="auth-actions">
            <button className="primary-btn" onClick={handleLogin}>Login</button>
            <button className="secondary-btn" onClick={handleRegister}>Register</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;
