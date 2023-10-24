import React, { useState, useEffect } from "react";
import Cat from "../../components/category/category";
import Link from "next/link";
import { data } from "../../../data/data-des.js"; // Import the JSON data
import { useRouter } from "next/router";
import CategoryPage from "@/components/categories/cate-page";
import { motion, useScroll } from "framer-motion";

const Page = ({ equipments }) => {
  const router = useRouter();
  const catId = router.query.id;// takes name of the category
  const [equipment, setEquipment] = useState(null);

  
  useEffect(() => {
    const equipment = equipments.find((e) => e.name === catId);
    if (equipment) {
      setEquipment(equipment);
    }
  }, [catId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.3 }}

    
      className="m-8"
    >
      <div className="flex flex-row">
        <Link href={"/"}>
          <p className="hover:cursor-pointer">/Home/</p>
        </Link>
        <Link href={`/learn-more/${catId}`}>
          <p className="hover:cursor-pointer">{catId}</p>
        </Link>
      </div>

      <div className="m-auto h-[70vh] w-[80vh] rounded-md border-neutral-300 my-8 shadow-xl">
        {equipment && (
          <Cat
            equipment={equipment}
            catId={equipment.name}
            image={equipment.image}
            category={equipment.category}
            price={equipment.price}
          />
        )}
      </div>
      <div>
        <CategoryPage />
      </div>
    </motion.div>
  );
};

export default Page;

export async function getStaticProps() {
  // Use the imported data directly
  const equipments = data;

  
  return {
    props: {
      equipments,
    },
  };
}

// Define getStaticPaths to specify dynamic routes
export async function getStaticPaths() {
  // Fetch the list of dynamic IDs from your data or an API
  const dynamicIds = data.map((equipment) => ({
    params: { id: equipment.name }, // Use 'name' instead of 'id'
  }));

  return {
    paths: dynamicIds,
    fallback: false, // Change to 'true' or 'blocking' if needed
  };
}
