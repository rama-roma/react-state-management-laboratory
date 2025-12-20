import React from "react";
import { Link } from "react-router";

const ReactQuery = () => {
  return (
    <>
      <main className="flex gap-6 p-6">
        <Link
          to="/tanStack"
          className="w-48 rounded-xl border border-gray-200 p-5 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">TanStack Query</h3>
        </Link>
      </main>
    </>
  );
};

export default ReactQuery;
