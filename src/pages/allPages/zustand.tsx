import { Link } from "react-router"

const Zustand = () => {
  return (
    <>
      <main>
        <section className="flex gap-6 p-6">
          
          <Link
            to="/asyncZustand"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Async Zustand</h3>
          </Link>

          <Link
            to="/syncZustand"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Sync Zustand</h3>
          </Link>

        </section>
      </main>
    </>
  )
}

export default Zustand
