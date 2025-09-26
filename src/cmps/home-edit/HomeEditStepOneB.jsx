import { useEffect, useState, useRef } from 'react'
import { updatePotentialHome } from '../../store/actions/home-edit.actions'
import { useSelector } from 'react-redux'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { getCityFromCoordinates } from '../../services/util.service'

export function HomeEditStepOneB() {
  const potentialHome = useSelector(
    (state) => state.homeEditModule.potentialHome
  )
  const homeLoc = useSelector((state) => state.homeEditModule.home) || {
    loc: { lat: 37.7749, lng: -122.4194 },
  }
  const [position, setPosition] = useState(null)
  const [geoError, setGeoError] = useState(null)
  const [mapCenter, setMapCenter] = useState(homeLoc.loc)
  const [homeLocation, setHomeLocation] = useState(homeLoc.loc)
  const [searchValue, setSearchValue] = useState('')
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //   useEffectUpdate(()=>{
  //     const updatedPotentialHome = { ...potentialHome, loc: homeLocation }
  //     updatePotentialHome(updatedPotentialHome)
  // }, [homeLocation])

  useEffectUpdate(() => {
    async function updateLocation() {
      if (homeLocation) {
        try {
          const locationData = await getCityFromCoordinates(
            homeLocation.lat,
            homeLocation.lng
          )
          const updatedPotentialHome = { ...potentialHome, loc: locationData }
          updatePotentialHome(updatedPotentialHome)
        } catch (err) {
          console.error('Failed to update location data', err)
        }
      }
    }
    updateLocation()
  }, [homeLocation])

  const autocompleteService = useRef(null)
  const placesService = useRef(null)
  const mapRef = useRef(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }
          console.log('Current Position:', currentPos)

          setPosition(pos.coords)
          setMapCenter(currentPos)
          setHomeLocation(currentPos)
          setGeoError(null)
          setIsLoading(false)
        },
        (err) => {
          setGeoError('Unable to retrieve your location.')
          setIsLoading(false)
        }
      )
    } else {
      setGeoError('Geolocation is not supported by your browser.')
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  const handleMapLoad = (map) => {
    mapRef.current = map
    autocompleteService.current =
      new window.google.maps.places.AutocompleteService()
    placesService.current = new window.google.maps.places.PlacesService(map)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)

    if (value.length > 2 && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setPredictions(predictions || [])
          } else {
            setPredictions([])
            console.log('Places API error:', status)
          }
        }
      )
    } else {
      setPredictions([])
    }
  }

  const searchWithGeocoding = () => {
    if (!searchValue.trim()) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: searchValue }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location
        const newLocation = {
          lat: location.lat(),
          lng: location.lng(),
        }
        setHomeLocation(newLocation)
        setMapCenter(newLocation)
        setPredictions([])
        console.log('Found location:', results[0].formatted_address)
      } else {
        console.log('Geocoder failed:', status)
        alert('Location not found. Please try a different search term.')
      }
    })
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (predictions.length > 0) {
        handlePlaceSelect(predictions[0].place_id, predictions[0].description)
      } else {
        searchWithGeocoding()
      }
    }
  }

  const handlePlaceSelect = (placeId, description) => {
    setSearchValue(description)
    setPredictions([])

    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: placeId,
          fields: ['geometry', 'formatted_address'],
        },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place.geometry
          ) {
            const newLocation = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }
            setHomeLocation(newLocation)
            setMapCenter(newLocation)
          }
        }
      )
    }
  }

  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    }
    setHomeLocation(newLocation)
  }

  if (!homeLoc?.loc) return <div>Loading map...</div>

  return (
    <div className="home-edit-step-3">
      <div
        className="step-header"
        style={{ textAlign: 'center', marginBottom: '1.5em' }}
      >
        <h1 className="step-title">Where's your place located?</h1>
        <p className="step-subtitle">
          The address will be shared in the reservation details.
        </p>
      </div>

      <div className="location-section">
        <div className="location-controls">
          <div className="search-section">
            <div className="search-input-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search for an address, city, or landmark..."
                  className="search-input"
                />
                <button
                  onClick={searchWithGeocoding}
                  className="btn btn-success search-btn"
                  style={{
                    backgroundColor: '#ff385c',
                    borderColor: '#ff385c',
                    color: 'white',
                  }}
                >
                  Search
                </button>
              </div>

              {predictions.length > 0 && (
                <div className="predictions-dropdown">
                  {predictions.map((prediction) => (
                    <div
                      key={prediction.place_id}
                      onClick={() =>
                        handlePlaceSelect(
                          prediction.place_id,
                          prediction.description
                        )
                      }
                      className="prediction-item"
                    >
                      <div className="prediction-main">
                        {prediction.structured_formatting.main_text}
                      </div>
                      <div className="prediction-secondary">
                        {prediction.structured_formatting.secondary_text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={getLocation}
            disabled={isLoading}
          >
            {isLoading ? 'Getting Location...' : 'My Location'}
          </button>
        </div>

        <div className="map-container">
          <APIProvider apiKey={import.meta.env.VITE_API_GOOGLE_KEY}>
            <Map
              defaultZoom={13}
              center={mapCenter}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
              className="map"
              onLoad={handleMapLoad}
              onClick={handleMapClick}
            >
              <Marker
                position={homeLocation}
                clickable={true}
                onClick={() => alert('This is your selected home location!')}
                title={'Your home location'}
              />

              {position &&
                (position.latitude !== homeLocation.lat ||
                  position.longitude !== homeLocation.lng) && (
                  <Marker
                    position={{
                      lat: position.latitude,
                      lng: position.longitude,
                    }}
                    clickable={true}
                    onClick={() => alert('This is your current location!')}
                    title={'Your current location'}
                  />
                )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  )
}
