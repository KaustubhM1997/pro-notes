const Aside = () => {
  return (
    <aside className="aside-wrapper">
      <ul className="aside-list">
        <li className="aside-item aside-item-active">
          <i className="fa-solid fa-house aside-icons"></i>{" "}
          <a className="aside-link active" href="/">
            Home
          </a>
        </li>
        <li className="aside-item">
          <i className="fa-solid fa-tags aside-icons"></i>
          <a className="aside-link" href="/labels">
            Label
          </a>
        </li>
        <li className="aside-item">
          <i className="fa-solid fa-box-archive aside-icons"></i>
          <a className="aside-link" href="/archive">
            Archives
          </a>
        </li>
        <li className="aside-item active">
          <i className="fa-solid fa-trash aside-icons"></i>
          <a className="aside-link" href="/trash">
            Trash
          </a>
        </li>
      </ul>

      {/* <Link>Profile</Link> */}

      <button className="create-note-btn">Create Note</button>
    </aside>
  );
};

export { Aside };
