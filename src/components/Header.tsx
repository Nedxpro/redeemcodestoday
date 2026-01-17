import { GooglePlayIconSimple } from "./GooglePlayIcon";

const Header = () => {
  return (
    <header className="gradient-header py-3 px-4 flex items-center gap-3 shadow-lg sticky top-0 z-50">
      <div className="bg-white rounded-lg p-1.5 shadow-md">
        <GooglePlayIconSimple className="w-6 h-6" />
      </div>
      <h1 className="text-lg md:text-2xl font-bold text-white text-shadow">
        Google Play Giveaway
      </h1>
    </header>
  );
};

export default Header;
