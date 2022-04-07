import "./home.css";

const Home = () => {
  return (
    <div className="main-wrapper">
      <div className="note-wrapper">
        <form className="notes-input-form" action="">
          <input type="text" placeholder="Title" />
          <textarea placeholder="Take a note"></textarea>
          <div className="cta-buttons">
            <div className="operations">
              <i class="fa-solid fa-palette operation-btn"></i>
              <i class="fa-solid fa-tags operation-btn-2"></i>
            </div>

              <button type="submits" className="notes-btn">Add Note</button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export { Home };
