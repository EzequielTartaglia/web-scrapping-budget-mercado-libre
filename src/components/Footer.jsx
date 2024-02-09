import Link from "next/link";
import { Linkedin } from 'react-feather';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white p-1 text-center fixed bottom-0 w-full">
      <p>
        Powered by{' '}
        <Link href={"https://www.linkedin.com/in/ezequieltartaglia/"} className="text-sky-500 hover:text-sky-400">
            Ezequiel M. Tartaglia
            <Linkedin className="ml-1 inline-flex" size={10} />

        </Link>
      </p>
    </footer>
  );
};

export default Footer;
