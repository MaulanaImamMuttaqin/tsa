import React from 'react'
import '../style/Profile.css'
import { Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore , faUserCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
function Profile() {
    return (
        <div className="profile-dropdown">
            <div className="profile-content">
                <Link style={{ textDecoration: 'none' }} to="/Profile">
                    <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faUserCircle} />Profile
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/Toko">
                    <FontAwesomeIcon style={{ marginRight: "7px" }} size="xs" icon={faStore} />Toko Anda
                </Link>
                <Link style={{ textDecoration: 'none' }} to="/Keluar">
                    <FontAwesomeIcon style={{ marginRight: "7px" }} size="sm" icon={faSignOutAlt} />Keluar
                </Link>
            </div>
        </div>
    )
}

export default Profile
