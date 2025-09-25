import { Routes, Route, Navigate, useLocation } from 'react-router'
import { userService } from './services/user'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { HomeIndex } from './pages/HomeIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'
import { HomeDetails } from './pages/HomeDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { ScrollToTop } from './cmps/ScrollToTop.jsx'
import { Hosting } from './pages/Hosting.jsx'
import { HomeEdit } from './pages/HomeEdit.jsx'
import { useEffect, useRef } from 'react'
import { HomeEditFooter } from './cmps/home-edit/HomeEditFooter.jsx'
import { Wishlist } from './cmps/Wishlist.jsx'
import MyTravels from './cmps/MyTravels.jsx'
import { Book } from 'lucide-react'
import { BookingDashboard } from './pages/BookingDashboard.jsx'
import { initUser } from './store/actions/user.actions.js'
import { BookingPlaceholder } from './cmps/BookingPlaceholder.jsx'
import { BuyingStepOneModal } from './cmps/BuyingStepOneModal.jsx'
import { useSelector } from 'react-redux'
import { draftOrderService } from './services/draft-order/draft-order.service.local.js'
import { addOrder } from './store/actions/order.actions.js'
import { closeOrderConfirmationModal } from './store/actions/draft-order.actions.js'

export function RootCmp({ mainRef }) {
  //const mainRef = useRef()
  const location = useLocation()
  const isHomeIndex = location.pathname === '/'
  const isHomeEdit = location.pathname === '/hosting/edit'
  const isBookingDashboard = location.pathname === '/hosting/reservations/'
  const isMobile = useSelector((state) => state.systemModule.isMobile)
  console.log('isMobile', isMobile)
  // console.log('isBookingDashboard', isBookingDashboard)
  const isOrderConfirmationModalOpen = useSelector(
    (state) => state.draftOrderModule.isOrderConfirmationModalOpen
  )
  const { getNumberOfNights } = draftOrderService
  const home = useSelector((state) => state.homeModule.home)
  const draftOrder = useSelector((state) => state.draftOrderModule.draftOrder)

  useEffect(() => {
    initUser()
  }, [])
  return (
    <>
      <ScrollToTop />
      <div className={isHomeIndex ?
                      (isMobile ? 'narrow-layout' : 'wide-layout') :
                      'narrow-layout'}>
        {/* <AppHeader scrollContainerRef={mainRef} /> */}

        <UserMsg />
        <main ref={mainRef}>
          {/* {isIndex && <LabelsSlider />} */}
          <Routes>
            {/* <Route path='' element={<HomePage />} /> */}
            <Route path="" element={<HomeIndex />} />

            <Route path="about" element={<AboutUs />}>
              <Route path="team" element={<AboutTeam />} />
              <Route path="vision" element={<AboutVision />} />
            </Route>
            <Route path="home" element={<HomeIndex />} />
            <Route path="home/:homeId" element={<HomeDetails />} />
            <Route path="/wishlists" element={<Wishlist />} />
            <Route path="/my-travels" element={<MyTravels />} />

            <Route path="review" element={<ReviewIndex />} />
            <Route path="chat" element={<ChatApp />} />
            <Route
              path="admin"
              element={
                <AuthGuard checkAdmin={true}>
                  <AdminIndex />
                </AuthGuard>
              }
            />
            <Route path="login" element={<LoginSignup />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="hosting" element={<Hosting />}>
              <Route index element={<BookingPlaceholder />} />
              <Route path="edit" element={<HomeEdit />} />
              <Route path="reservations" element={<BookingDashboard />} />
            </Route>
          </Routes>
        </main>
        {home && draftOrder && isOrderConfirmationModalOpen && (
          <BuyingStepOneModal
            draftOrder={draftOrder}
            homePrice={home.price}
            nightsNum={getNumberOfNights(
              draftOrder.checkIn,
              draftOrder.checkOut
            )}
            homeType={home.type}
            homeCity={home.loc?.city || ''}
            homeCountry={home.loc?.country || ''}
            homeSummary={home.summary}
            addOrder={addOrder}
            closeOrderConfirmationModal={closeOrderConfirmationModal}
          />
        )}
        {isHomeEdit && <HomeEditFooter />}
        
      </div>
      
    </>
  )
}

function AuthGuard({ children, checkAdmin = false }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
  if (isNotAllowed) {
    console.log('Not Authenticated!')
    return <Navigate to="/" />
  }
  return children
}
