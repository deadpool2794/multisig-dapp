import styles from "./styles.module.css";
import { usePathname } from "next/navigation";

type MenuLink = {
    id: number;
    tabName: string;
    href: string;
};

const menuLinks: MenuLink[] = [
    {
        id: 1,
        tabName: "Home",
        href: "/home",
    },
    {
        id: 2,
        tabName: "Transactions",
        href: "/transactions",
    },
    {
        id: 3,
        tabName: "Events",
        href: "/events",
    },
];

const HeaderMenuLinks = () => {
    return (
        <>
            {menuLinks.map((eachMenuLink: MenuLink) => {
                const isActive = usePathname().startsWith(eachMenuLink.href);
                return (
                    <a
                        key={eachMenuLink.id}
                        href={eachMenuLink.href}
                        className={`${styles.headermenulink} ${isActive ? styles.active : ""}`}
                    >
                        {eachMenuLink.tabName}
                    </a>
                );
            })}
        </>
    );
};

export default HeaderMenuLinks;
