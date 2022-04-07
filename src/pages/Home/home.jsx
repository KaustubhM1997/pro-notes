import "./home.css";

const Home = () => {
  return (
    <div className="main-wrapper">
      <div className="note-wrapper">
        <form className="notes-input-form" action="">
          <input type="text" placeholder="Title" />
          <textarea
            placeholder="Take a note"
          ></textarea>
        </form>
      </div>
    </div>
  );
};

export { Home };
