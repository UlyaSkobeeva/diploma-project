// import "../../App.css"
import PropTypes from 'prop-types'
import './HomePage.css'
import InfoCalendar from './InfoCalendar/InfoCalendar'
import News from './News/News'
import Birthday from './Birthday/Birthday'

export default function Home(props) {
  return (
    <>
      <div className="info">
        <div className="container">
          <div className="info__inner">
            {/* Ближайшие события */}
            <InfoCalendar user={props.user} />

            <div className="info-age">
              <Birthday />
            </div>
          </div>
        </div>
      </div>
      <News user={props.user} />
    </>
  )
}

Home.propTypes = {
  user: PropTypes.object,
}
