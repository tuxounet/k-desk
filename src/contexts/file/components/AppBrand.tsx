import logo from "../../../assets/logo.png";
interface AppBrandProps {
  filename?: string;
}

export default function AppBrand(props: AppBrandProps) {
  return (
    <div className="level-left ml-2">
      <div className="level-item">
        <p className="subtitle is-5">
          <img src={logo} title="logo" />
        </p>
      </div>
      <div className="level-item">
        <p className="subtitle is-5">
          {!props.filename && (
            <span className="has-text-weight-bold">k-desk</span>
          )}
          {props.filename && <span>{props.filename}</span>}
        </p>
      </div>
    </div>
  );
}
