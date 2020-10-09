import React from 'react'
import '../../assets/style/Error.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown} from '@fortawesome/free-solid-svg-icons'
function Error() {
    return (
            <div className="error-container">
                <div className="error">
                    <div className="error-content center-container">
                        <FontAwesomeIcon style={{color : "rgba(87, 151, 255, 0.7)"}} size="8x" icon={faFrown} />
                        <h4 className="">Cek Koneksi Internet Anda</h4>
                    </div>
                </div>
            </div>

    )
}

export default Error
