// import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'
import { setStepCompleted } from '../../store/actions/home-edit.actions'
import { useSelector } from 'react-redux'

export function HomeEditStepOneB(){
    const step = useSelector(state => state.homeEditModule.step)
    useEffect(()=>{
        if (step.status === false ) setStepCompleted()
    }, [])

    return(
        <h1>step oneB</h1>
        // <section className='home-edit-step-3-container'>
        //     <article className="home-edit-step-3-title">
        //         <h1>Where's your place located?</h1>
        //         <p>Your address is only shared with guests after they’ve made a reservation.</p>
        //     </article>
        //     <article className="home-edit-step-3-map-container">
        //         <APIProvider apiKey={API_KEY}>
        //             <Map
        //             defaultZoom={13}
        //             center={{
        //                 lat: home.loc.lat,
        //                 lng: home.loc.lng,
        //             }}
        //             gestureHandling={'greedy'}
        //             disableDefaultUI={false}
        //             style={{ height: '400px', width: '100%' }}
        //             />
        //             <Marker
        //             position={{ lat: home.loc.lat, lng: home.loc.lng }}
        //             clickable={true}
        //             onClick={() => alert('marker was clicked!')}
        //             title={'clickable google.maps.Marker'}
        //             />
        //         </APIProvider>
        //     </article>
        // </section>
    )
}