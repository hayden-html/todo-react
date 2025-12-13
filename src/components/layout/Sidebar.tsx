import "../../styles/layout.scss";

export default function Sidebar() {
  return (
    <nav className="p-4 border-r-2 border-amber-300 grid grid-cols-1 items-center">
      <fieldset className="workspaces flex flex-col gap-4" name="workspace">
        <label htmlFor="all" className="active">
          <input type="radio" value="all" defaultChecked></input>
          All
        </label>
      </fieldset>
    </nav>
  );
}
