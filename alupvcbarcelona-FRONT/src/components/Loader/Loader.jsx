import './Loader.css'

const Loader = ({ w = 120, h = 20 }) => {
  return (
    <div
      className='loader__content'
      style={{
        width: `${w}px`,
        height: `${h}px`
      }}
    >
      <span className='loader'></span>
    </div>
  )
}

export default Loader
