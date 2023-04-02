import './globals.css'
import { Roboto } from 'next/font/google'
import Nav from './auth/Nav'
import QueryWrapper from './auth/QueryWrapper'

export const metadata = {
  title: 'Quarrel',
  description: 'Created by Ca-Jaye Clarke',
}

const roboto = Roboto({
    subsets: ['latin'],
    weight: ["400", "700"],
    variable:'--font-roboto',
})

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`mx-4 md:mx-48 lg:mx-96 bg-gray-200 ${roboto.variable}`}>
        <QueryWrapper>
          <Nav/>
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
