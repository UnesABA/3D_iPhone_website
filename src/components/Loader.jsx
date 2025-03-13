const Loader = () => {
  return (
    <div center wrapperClass="loading-spinner">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm font-medium"></p>
      </div>
    </div>
  )
}

export default Loader
