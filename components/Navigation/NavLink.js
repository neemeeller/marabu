import Link from 'next/link';

const NavLink = ({ href, label }) => {
  return (
    <li className="p-5">
      <Link
        href={`${href}`}
        className="text-cloud hover:text-orange transition-all font-extrabold tracking-wider whitespace-nowrap"
      >
        {label}
      </Link>
    </li>
  );
};
export default NavLink;
