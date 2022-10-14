import "./SuccessMsg.css"
import * as Icon from "react-feather"
import { Link } from "react-router-dom"
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate"

const SuccessMsg = () => {
  return (
    <Animate play={true} start={{ opacity: 0 }} end={{ opacity: 1 }} duration={0.1}>
      <div className="success-msg">
        <div className="msg">
          <span className="icon">
            <span>
              <Icon.Check size={40} />
            </span>
          </span>
          <span className="msg-1">Thank you for providing the feedback.</span>
          <span className="msg-2">We will work towards improving your experience.</span>
          <Link to="/">
            <button>Close</button>
          </Link>
        </div>
      </div>
    </Animate>
  )
}
export default SuccessMsg
