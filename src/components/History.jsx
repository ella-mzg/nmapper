import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

const History = () => {
  const [queryHistory, setQueryHistory] = useState([])

  useEffect(() => {
    fetchQueryHistory()
  }, [])

  const fetchQueryHistory = async () => {
    try {
      const response = await axios.get("/api/getHistory")
      setQueryHistory(response.data)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching query history:", error)
    }
  }

  return (
    <div>
      <h2 className="text-center text-2xl text-gray-800 font-bold mb-5 mt-5">
        Query History
      </h2>
      {queryHistory ? (
        queryHistory.length > 0 ? (
          <ul className="space-y-4">
            {queryHistory.map((query) => (
              <li
                key={query._id}
                className="bg-gradient-to-l from-stone-100 to-purple-100 mx-auto rounded-sm shadow-sm p-5 w-6/12"
              >
                <div>{query.input}</div>
                <div>
                  <Link
                    className="text-purple-500 font-medium cursor-pointer hover:text-[#00ff00]"
                    href={`/${query._id}`}
                  >
                    View Details
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">History is empty.</p>
        )
      ) : (
        <p className="text-gray-500">No query history found.</p>
      )}
    </div>
  )
}

export default History
