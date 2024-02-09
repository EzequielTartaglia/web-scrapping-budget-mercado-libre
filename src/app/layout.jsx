import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
      <div className="flex justify-center mt-[70px] mb-[70px]">
      {children}
      </div>
      <Footer/>
      </body>
    </html>
  )
}
