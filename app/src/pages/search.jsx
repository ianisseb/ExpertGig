import SearchGridItem from "../components/Search/SearchGridItem";
import { SEARCH_GIGS_ROUTE } from "../utils/constants";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
function Search() {
  const router = useRouter();
  const { category, q } = router.query;
  const [gigs, setGigs] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { gigs },
        } = await axios.get(
          `${SEARCH_GIGS_ROUTE}?searchTerm=${q}&category=${category}`
        );
        setGigs(gigs);
      } catch (err) {
        console.error(err);
      }
    };
    if (category || q) getData();
  }, [category, q]);
  return (
    <>
      {gigs && (
        <div className="mx-24 mb-24">
          {q && (
            <h3 className="text-4xl mb-10">
              Results for <strong>{q}</strong>
            </h3>
          )}
          <div>
            <div className="my-4">
              <span className="text-[#74767e] font-medium ">
                {gigs.length} services available
              </span>
            </div>
            <div className="grid grid-cols-4">
              {gigs.map((gig) => (
                <SearchGridItem gig={gig} key={gig.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
