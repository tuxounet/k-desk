import logo from "../../../assets/logo.png";
export default function AppBrand() {
  return (
    <div className="level-left ml-2">
      <div className="level-item">
        <p className="subtitle is-5">
          <img src={logo} title="logo" />
        </p>
      </div>
      <div className="level-item">
        <p className="subtitle is-5">
          <span className="has-text-weight-semibold">k-desk</span>
        </p>
      </div>
    </div>
  );
}
