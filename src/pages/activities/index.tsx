import { Link } from "react-router-dom";

export default function ActivitiesPage() {
  return (
    <>
      <nav className="panel">
        <p className="panel-tabs">
          <Link to="/" className="is-active">
            Activités
          </Link>
          <Link to="/topics">Sujets</Link>
        </p>
        <p className="panel-heading">Activités</p>

        <div className="panel-block">
          <p className="control has-icons-left">
            <input className="input" type="text" placeholder="Search" />
            <span className="icon is-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
          </p>
        </div>

        <a className="panel-block is-active">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          bulma
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          marksheet
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          minireset.css
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true"></i>
          </span>
          jgthms.github.io
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-code-branch" aria-hidden="true"></i>
          </span>
          daniellowtw/infboard
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-code-branch" aria-hidden="true"></i>
          </span>
          mojs
        </a>

        <div className="panel-block">
          <button className="button is-link is-outlined is-fullwidth">
            Reset all filters
          </button>
        </div>
      </nav>
    </>
  );
}
