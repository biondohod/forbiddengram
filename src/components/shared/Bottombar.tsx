import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Bottombar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive: boolean = pathname === link.route;

        const linkClassNames = `flex-center flex-col gap-1 p-2 transition ${
          isActive && "bg-primary-500 rounded-[10px]"
        }`;

        const imgClassNames = `${isActive && "invert-white"}`;

        return (
          <Link to={link.route} className={linkClassNames} key={link.label}>
            <img
              src={link.imgURL || "/assets/images/profile-placeholder.svg"}
              alt={`go to ${link.label}.`}
              className={imgClassNames}
              width={16}
              height={16}
            />
            <p className="tiny-medium  text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
