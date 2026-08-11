import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Название Студии | Веб-разработка и Архитектура',
  description: 'Портфолио нашей студии',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header>
          {/* Здесь позже будет наш компонент Navbar */}
          <nav>Навигация студии</nav>
        </header>
        
        <main>{children}</main>
        
        <footer>
          {/* Здесь позже будет наш Footer */}
          <p>© 2026 Название Студии. Все права защищены.</p>
        </footer>
      </body>
    </html>
  );
}