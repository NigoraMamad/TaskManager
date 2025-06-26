import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading your workspace...</p>
      </div>
    </div>
  );
};

export default Loader;
