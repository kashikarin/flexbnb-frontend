import { useContext } from "react";
import { ScrollContext } from "../context/ScrollContext";
import { FaStar } from 'react-icons/fa'
import { useSelector } from "react-redux";
import { PotentialOrderContext } from "../context/potential-order/PotentialOrderContext";
import { getAvgRating, roundToDecimals } from "../services/util.service";
import { BuyingStepOneModal } from "./BuyingStepOneModal";

export function HeaderHomeDetails() {
    const {isStickyScrolledPast} = useContext(ScrollContext)
    const {potentialOrder, onConfirmOrder, openConfirmationModal, closeConfirmationModal, isConfirmationModalOpen} = useContext(PotentialOrderContext)
    const home = useSelector(state => state.homeModule.home)
    
    return(
        <header className="home-details-scrolled-header">
            <nav>
                <div>Photos</div>
                <div>Amenities</div>
                <div>Location</div>
            </nav>
            {isStickyScrolledPast && <div className="reservation-header-modal">
                <div className="reservation-header-modal-text-container">
                    <div>
                        <span>{roundToDecimals(home.price).toLocaleString()}$</span>
                        <span>{'\u00A0'}night</span> 
                    </div>
                    <div className='home-details-reviews'>
                        <span>
                            <FaStar
                                style={{
                                width: '8px',
                                height: '8px',
                                marginInlineEnd: '2px',
                                verticalAlign: 'middle',
                                }}
                            />
                            <span style={{ fontWeight: 'bold' }}>
                                {roundToDecimals(getAvgRating(home)).toLocaleString()}{' '}
                            </span>
                        </span>
                        <span>•</span>
                        <span>{home.reviews.length} reviews </span>
                    </div>
                </div>
                <button onClick={openConfirmationModal}>Reserve</button>
            </div>}
            
            {isConfirmationModalOpen && (
                <BuyingStepOneModal
                potentialOrder={potentialOrder}
                homePrice={home.price}
                homeType={home.type}
                homeCity={home.loc.city}
                homeCountry={home.loc.country}
                homeSummary={home.summary}
                onConfirmOrder={onConfirmOrder}
                closeConfirmationModal={closeConfirmationModal}
                />
                  )}
            

        </header>
    )
}