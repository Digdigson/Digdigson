export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-sm text-gray-600">
          Copyright © {currentYear} Music Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

