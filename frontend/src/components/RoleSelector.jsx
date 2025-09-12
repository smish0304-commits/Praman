import { useNavigate } from 'react-router-dom'

function RoleSelector() {
  const navigate = useNavigate()

  return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
  {/* Contributor Card */}
  <div className="group cursor-pointer" onClick={() => navigate('/contributor')}>
    <div className="bg-gradient-to-b from-[#FFFDF8] to-[#FFF8E7] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-transparent hover:border-blue-400">
      <div className="mb-3 flex justify-center">
        <img
          src="/public/contributor.png" // <-- replace with your own image path
          alt="Contributor"
          className="h-14 w-14 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Contributor
      </h2>
      <p className="text-base font-medium text-gray-700">
        Share your expertise and contribute to the community
      </p>
    </div>
  </div>

  {/* Consumer Card */}
  <div className="group cursor-pointer">
    <div className="bg-gradient-to-b from-[#FFFDF8] to-[#FFF8E7] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-transparent hover:border-green-400">
      <div className="mb-3 flex justify-center">
        <img
          src="/public/consumer.png" // <-- replace with your own image path
          alt="Consumer"
          className="h-14 w-14 object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Consumer
      </h2>
      <p className="text-base font-medium text-gray-700">
        Access services and solutions from contributors
      </p>
    </div>
  </div>
</div>

  )
}

export default RoleSelector
