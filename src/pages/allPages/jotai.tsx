import { Link } from "react-router"

const Jotai = () => {
  return (
    <>
      <main>
        <section className="flex gap-6 p-6">
          
          <Link
            to="/asyncJotai"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Async Jotai</h3>
          </Link>

          <Link
            to="/syncJotai"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Sync Jotai</h3>
          </Link>

        </section>
      </main>
    </>
  )
}

export default Jotai
