import React, { useEffect, useState } from "react";
import { storage } from "utils/firebase.js";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const EditNews = () => {
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "news/");

  useEffect(() => {
    listAll(imageListRef)
      .then((snapshot) => {
        const promises = snapshot.items.map((item) =>
          getDownloadURL(item).then((url) => url)
        );
        return Promise.all(promises);
      })
      .then((urls) => {
        setImageList(urls.reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  const uploadImage = () => {
    if (file == null) return;
    const storageRef = ref(storage, `news/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        alert("Image uploaded!");
        setImageList((prev) => [...prev, url].reverse());
        setFile(null);
      });
    });
  };

  const deleteImage = async (url) => {
    const imageRef = ref(storage, url.replace(storage.toString(), ""));
    try {
      await deleteObject(imageRef);
      alert("Are you sure you want to delete the image?");
      setImageList((prev) => prev.filter((u) => u !== url));
      alert("Image deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete image!");
    }
  };

  console.log(imageList.length);

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={uploadImage}
        >
          Upload Image
        </button>
      </div>

      <div className="w-[70vh] m-auto flex flex-col justify-center items-center overflow-scroll">
        {imageList.map((url) => {
          return (
            <div key={url} className="gap-2  overflow-scroll">
              <img
                src={url}
                alt="im"
                className="w-[40vh] h-auto max-w-xl m-4 rounded-sm  "
              />
              <button
                className="bg-blue-500 hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-64"
                onClick={() => deleteImage(url)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditNews;
