import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) navigate("sign-in");
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="leftsidebar-wrapper">
        <div className="flex flex-col gap-11">
          <Link to="/" className="flex  gap-3 items-center">
            <img
              src="/assets/images/logo.svg"
              width={170}
              height={36}
              alt="to homepage."
            />
          </Link>
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="go to profile."
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>

          <ul className="flex flex-col gap-6">
            {sidebarLinks.map((link: INavLink) => {
              const isActive: boolean = pathname === link.route;

              const liClassNames = `leftsidebar-link group ${
                isActive && "bg-primary-500"
              }`;

              const imgClassNames = `group-hover:invert-white ${
                isActive && "invert-white"
              }`;

              return (
                <li className={liClassNames} key={link.label}>
                  <NavLink
                    to={link.route}
                    className="flex gap-4 items-center p-4"
                  >
                    <img
                      src={
                        link.imgURL || "/assets/images/profile-placeholder.svg"
                      }
                      alt={`go to ${link.label}.`}
                      className={imgClassNames}
                    />
                    <p>{link.label}</p>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LeftSidebar;
