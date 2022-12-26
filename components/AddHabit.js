
export default function AddHabit(props) {
  
  return ( 
    <div className='card' style={{ backgroundColor: props.color}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg> */}
      <style jsx>{`
        svg {
          width: 100px;
          height: 100px;
        }

        .button:focus {
          outline: 2px solid transparent;
          outline-offset: 2px;
        }

        .button:focus-visible {
          box-shadow: none;
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          border: 10px solid black;
          border-radius: 15px;
          border-style: dashed;
          transition: color 0.3s ease, border-color 0.3s ease;
          height: 370px;
          width: 383px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          /* border: 2px solid green; */
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }
      `}</style>
    </div>
  )
}