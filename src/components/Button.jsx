import Link from 'next/link';

function Button({ href, text }) {
  return (
    <Link href={href} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        {text}
    </Link>
  );
}

export default Button;
