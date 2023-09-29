"use client"
import '@/styles/globals.css'
import { usePathname } from 'next/navigation'
import NavMember from '@components/NavMember'
import NavBackOffice from '@app/layoutBackOffice.js'
import { ToastContainer } from 'react-toastify';
import { store } from '@redux/store';
import { Provider } from 'react-redux'
import scheduleCutLot from '@utils/scheduleCutLot';

scheduleCutLot(); // Start scheduling

const RootLayout = ({ children }) => {
  const pathname = usePathname()
  const isBackOffice = /backoffice*/.test(pathname)
  const isPDF = /pdf*/.test(pathname)
  
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {
            isBackOffice ? (
              <NavBackOffice>
                {children}
              </NavBackOffice>
            ) : isPDF ? <>{children}</> : (
              <NavMember>
                {children}
              </NavMember>
            )
          }
          <ToastContainer position={'bottom-right'} icon={false}/>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout

