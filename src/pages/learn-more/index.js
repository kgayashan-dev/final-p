import React from "react";
import Cat from "../../components/category/category";
import Link from "next/link";
import { useRouter } from "next/router";

const IndexPage = ({ data }) => {
  const router = useRouter();
  const catId = router.query;

  return (
    <div className="m-8">
      <div>
        <Link href={"/"}>
          <p className="hover:cursor-pointer">/Home</p>
        </Link>
      </div>

      <div className=" m-auto h-[70vh] w-[80vh] rounded-md border-neutral-300 my-8  shadow-lg">
        {/* <Cat data={data} /> */}
      </div>
    </div>
  );
};

export default IndexPage;
