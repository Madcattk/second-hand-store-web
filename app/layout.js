"use client"
import '@/styles/globals.css'
import NavMember from '@components/NavMember'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import { store } from '@redux/store';
import { Provider } from 'react-redux'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <NavMember>
            {children}
          </NavMember>
          <ToastContainer position={'bottom-right'} icon={false}/>
        </Provider>
      </body>
    </html>
  )
}
