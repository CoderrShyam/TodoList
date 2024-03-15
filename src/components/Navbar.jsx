import todo from "../../todo.ico";

const Navbar = () => {
  return (
    <header>
      <nav className="flex py-2 gap-2 justify-center bg-indigo-900 text-white items-center">
        <img src={todo} alt="logo img" className="w-10" />
        <div className="logo text-2xl cursor-pointer font-bold">iTask</div>
      </nav>
    </header>
  );
};

export default Navbar;
