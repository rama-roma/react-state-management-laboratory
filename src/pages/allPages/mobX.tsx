import { Link } from "react-router"

const MobX = () => {
  return (
    <>
      <main>
        <section className="flex gap-6 p-6">
          <Link
            to="/asyncMobX"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Async MobX</h3>
          </Link>

          <Link
            to="/syncMobX"
            className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">Sync MobX</h3>
          </Link>

        </section>
      </main>
    </>
  )
}

export default MobX
