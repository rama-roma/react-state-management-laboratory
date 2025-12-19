import { Link } from "react-router"

const Redux = () => {
  return (
    <>
      <main>
        <section className="flex gap-6 p-6">
          
          <Link
            to="/asyncRedux"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Async Redux</h3>
          </Link>

          <Link
            to="/syncRedux"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Sync Redux</h3>
          </Link>

          <Link
            to="/asyncRTK"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">RTK Query</h3>
          </Link>

        </section>
      </main>
    </>
  )
}

export default Redux
