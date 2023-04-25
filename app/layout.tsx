import {Nunito} from 'next/font/google'
import Modal from './components/modal/Modal'
import RegisterModal from './components/modal/RegisterModal'
import LoginModal from './components/modal/LoginModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import ToastProvider from './providers/ToastProvider'
import getCurrentUser from './actions/getCurrentUser'
import PostModal from './components/modal/PostModal'
import SearchModal from './components/modal/SearchModal'
// import OnlyClient from './components/OnlyClient'

export const metadata = {
  title: 'SN-Hustler',
  description: 'Blog',
}
const font = Nunito({
  subsets: ["cyrillic-ext"],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
})
  
 {
  const currentUser = await getCurrentUser()
  return (
    // console.log(currentUser)
    <html lang="en">
      <body className={font.className}>
        {/* <Modal actionLabel='Submit' isOpen title='Login'/> */}
        {/* <OnlyClient> */}
          <ToastProvider/>
          <LoginModal/>
          <RegisterModal/>
          <PostModal/>
          <SearchModal/>
          <Navbar currentUser={currentUser}/>
        {/* </OnlyClient> */}
        <div className='pb-20 pt-28'>
          {children}
        </div>
        </body>
    </html>
  )
}
