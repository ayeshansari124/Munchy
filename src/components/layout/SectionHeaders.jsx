const SectionHeaders = ({ subHeader, mainHeader }) => {
  return (
    <div className="text-center mt-16">
      <p className="text-lg font-semibold tracking-[0.35em] text-gray-500 uppercase">
        {subHeader}
      </p>
      <h2 className="mt-3 text-5xl font-extrabold text-red-600 italic">
        {mainHeader}
      </h2>
    </div>
  )
}

export default SectionHeaders
