const Button = ({ text, loading = false, disabled  }) => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl w-96 h-12 py-1 rounded focus:outline-none focus:shadow-outline disabled:opacity-25" disabled={loading} type="submit">
        {!loading ? text : 
          (
            <div className="flex justify-center items-center"> 
              <img src="/loader.svg" className='animate-spin'/> 
            </div>
          )}
      </button>
    </>
  )
}

export default Button