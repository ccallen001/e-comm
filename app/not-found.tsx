import Link from 'next/link';

function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <span className="text-8xl font-bold">404</span>
        <h1>Oops! The page doesn&apos;t exist...</h1>
        <Link className="font-bold" href="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
