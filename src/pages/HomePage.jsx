import { Link } from 'react-router-dom'
import { HomePreview } from '../cmps/HomePreview'

export function HomePage() {
  const home = {
    amenities: ['Free parking on premises'],
    bathCount: 1,
    bedRoomsCount: 3,
    bedsCount: 7,
    capacity: 7,
    host: {_id: 'u101', fullname: 'Hosty Hosterson', imageURL: 'https://picsum.photos/200?random=0.45186430261555843'},
    imageUrls: ['https://picsum.photos/200?random=0.6993343729750893', 'https://picsum.photos/200?random=0.6993343729750893', 'https://picsum.photos/200?random=0.6993343729750893', 'https://picsum.photos/200?random=0.6993343729750893'],
    labels: ['Top of the world'],
    likedByUsers: ['was above this happened', 'tuned', 'The sky', 'The sky', 'as generally', 'a different story in such cases this happened', 'The sky', 'more or less a pleasure the port', '. a dead channel a different story ', 'All the port .'],
    loc: {address: "127-135 Rotherhithe Street, Canada Water, London, SE16 4LG, United Kingdom", city: 'london', country: 'unitedKingdom', countryCode: 'UK', lat: 51.502429, lng: -0.051923},
    name: "happens to a pleasure The sky was from various people a dead channel more or less to happens the story had",
    price: 505,
    reviews: [{
      by: {_id: 'u102', fullname: 'Sue Percritical', imageUrl: 'https://picsum.photos/200?random=0.15923008700155328'},
      id: 'FkWY8W',
      rate: 2,
      txt: 'as generally it happens I from various people and bit by bit each time . the port . it it'
    }],
    summary: 'as generally it happens I from various people and bit by bit each time . the port . it it',
    type: 'apartment',
    _id: 'as generally it happens I from various people and bit by bit each time . the port . it it'
  }
  return (
    <section>
      <h1>Home sweet Home</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt ea
        omnis blanditiis deleniti impedit illo ullam, magnam aut minus veritatis
        corporis quos iure fugiat repellat assumenda fugit mollitia illum!
        Delectus velit fugit dolores maiores quam laudantium minima similique
        sapiente minus deserunt vel cum tenetur molestias commodi eos
        distinctio, consequatur ducimus dolorum odio itaque natus soluta fuga!
        Deserunt in hic harum magnam quos. Expedita, quis corrupti quia esse
        excepturi alias aperiam repudiandae soluta animi modi temporibus veniam
        vero eveniet nemo ipsa?
      </p>
      <HomePreview home={home}/>

      <Link to='/home'>Check Our homes!</Link>
    </section>
  )
}
