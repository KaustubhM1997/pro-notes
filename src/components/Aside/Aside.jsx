const Aside = () => {
  return (
    <div className="child-wrapper">
      <aside className="aside-wrapper">
        <ul className="aside-list">
          <li className="aside-item aside-item-active">
            {" "}
            <i class="fa-solid fa-house aside-icons"></i>{" "}
            <a className="aside-link active" href="/">
              Home
            </a>
          </li>
          <li className="aside-item">
            {" "}
            <i class="fa-solid fa-tags aside-icons"></i>
            <a className="aside-link" href="/labels">
              Label
            </a>
          </li>
          <li className="aside-item">
            {" "}
            <i class="fa-solid fa-box-archive aside-icons"></i>
            <a className="aside-link" href="/archive">
              Archives
            </a>
          </li>
          <li className="aside-item active">
            {" "}
            <i class="fa-solid fa-trash aside-icons"></i>
            <a className="aside-link" href="/trash">
              Trash
            </a>
          </li>
        </ul>

        {/* <Link>Profile</Link> */}

        <button className="create-note-btn">Create Note</button>
      </aside>
      <div className="content-wrapper"></div>
    </div>
  );
};

export { Aside };
