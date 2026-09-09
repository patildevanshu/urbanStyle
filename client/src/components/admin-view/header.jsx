import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { resetTokenAndCredentials } from "@/store/auth-slice";
import { useNavigate } from "react-router";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/login');
  }

  return (
    <header className="flex items-center justify-between px-3 sm:px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} variant="outline" size="icon" className="lg:hidden h-9 w-9">
        <AlignJustify className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          size="sm"
          className="inline-flex gap-2 items-center text-xs sm:text-sm"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
