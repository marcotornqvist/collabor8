import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link href="/settings/profile">
            <a>Profile Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/account">
            <a>Account Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/settings/socials">
            <a>Social Accounts</a>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
