import DesktopNav from "@/components/layout/desktopnav";
import MobileNav from "@/components/layout/mobilenav";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b py-3 @container ">
      <nav className="w-full flex items-center justify-between px-2 pl-10 sm:px-4 lg:px-6">
        <DesktopNav />
        <MobileNav />
        <div className="flex items-center gap-x-2"></div>
      </nav>
    </header>
  );
};

export default Header;
