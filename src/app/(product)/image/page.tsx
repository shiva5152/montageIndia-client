"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { spawn } from "child_process";
interface FormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  category: string;
  name: string;
  description: string;
}

interface responseData {
  msg: string;
  imgName: string;
  width: number;
  height: number;
}
const getName = (array: any): string => {
  console.log(array, "from function");
  let name = "";
  for (let index = 0; index < array.length; index++) {
    if (index != 0) name += ", ";
    name += array[index].name;
  }
  return name;
};
const uploadImage = async (
  files: File[],
  category: string,
  description: string,
  setUploadProgress: (num: number) => void,
  setData: React.Dispatch<React.SetStateAction<responseData[]>>
) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("image", files[i]);
    }
    formData.append("category", JSON.stringify(category));
    formData.append("description", JSON.stringify(description));

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
    console.log(serverUrl);
    const { data } = await axios.post(
      `${serverUrl}/api/v1/media/img/reduceImg`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          if (data.total) {
            console.log(Math.round((data.loaded / data.total) * 100));
            setUploadProgress(Math.round((data.loaded / data.total) * 100));
          }
        },
      }
    );
    setData(data.results);
    console.log("Upload successful:", data);
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};

// const uploadImage = async (
//   file: File,
//   category: string,
//   description: string,
//   setUploadProgress: (num: number) => void,
//   setData: (obj: null | { width: number; height: number }) => void
// ) => {
//   try {
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("category", JSON.stringify(category));
//     formData.append("description", JSON.stringify(description));

//     const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
//     // const serverUrl = "http://localhost:8000";
//     console.log(serverUrl);
//     const { data } = await axios.post(
//       `${serverUrl}/api/v1/media/img/reduceImg`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         onUploadProgress: (data) => {
//           if (data.total)
//             console.log(Math.round((data.loaded / data.total) * 100));
//           if (data.total)
//             setUploadProgress(Math.round((data.loaded / data.total) * 100));
//         },
//       }
//     );
//     setData({ width: data.width, height: data.height });
//     console.log("Upload successful:", data);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// };
const getImg = (imgName: string, width: number, height: number) => {
  return [
    {
      folder: "Images/Original",
      filename: `Original-${imgName}`,
      quality: `${width}x${height}`,
    },
    {
      folder: "Images/Medium",
      filename: `Medium-${imgName}`,
      quality: `${width / 2}x${height / 2}`,
    },
    {
      folder: "Images/Small",
      filename: `Small-${imgName}`,
      quality: `${width / 4}x${height / 4}`,
    },
    {
      folder: "Images/ProductPage",
      filename: `ProductPage-${imgName}`,
      quality: `${width / 4}x${height / 4}`,
    },
    {
      folder: "Images/Thumbnail",
      filename: `Thumbnail-${imgName}`,
      quality: `${150}x${Math.round(150 * (height / width))}`,
    },
  ];
};

const awsHost = "https://montage-india.s3.eu-north-1.amazonaws.com";

const page = () => {
  const [file, setFile] = useState<File[] | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imgName, setImgName] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [data, setData] = useState<responseData[]>([]);
  // console.log(file);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    description: "",
    name: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadProgress(0);
    if (acceptedFiles && acceptedFiles[0].name.split(".")[1] === "jpg") {
      setFile(acceptedFiles);
      setFormData({ ...formData, name: acceptedFiles[0].name });
      const fileName = getName(acceptedFiles);
      setImgName(fileName);
    } else {
      alert("please upload valid image datatype");
    }
  }, []);
  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    if (!file) {
      alert("file is not there");
      return;
    }
    if (!formData.category) {
      alert("please provide category of image");
    }
    if (!formData.description) {
      alert("please provide description of image");
    }
    setLoading(true);
    await uploadImage(
      file,
      formData.category,
      formData.description,
      setUploadProgress,
      setData
    );
    setImgName(file[0].name);
    setFile(null);
    setLoading(false);
    setFormData({
      category: "",
      description: "",
      name: "",
    });
    setUploaded(true);
  };
  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     onSubmit(formData);
  //   };
  console.log("here are the files", data);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <section className="flex w-full">
      <section className="p-4 w-[50%] flex justify-center items-center flex-col">
        <h2 className="text-2xl max-w-md p-4 py-2 underline underline-offset-8 mb-8 font-bold ">
          Upload image
        </h2>
        <div className="w-full">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="bg-sky-50 w-[75%] mx-auto px-3 py-2 rounded-md border-[2px] mt-3  mb-[1.5rem]  border-blue-500 cursor-pointer shadow-lg hover:shadow-xl transition duration-400 ease-in-out">
              <div className="flex flex-col gap-3 justify-center items-center">
                <span className="bg-blue-500 rounded-full p-2">
                  {/* <img src="/upload.png" width={56} alt="" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </span>

                <p className="w-full text-center">Upload Image</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%] p-4">
          <form className="space-y-4 w-full">
            <div>
              <label htmlFor="category" className="block text-gray-700">
                Name of Image:
              </label>
              {file && (
                <p className="w-full bg-white flex flex-wrap gap-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                  {file &&
                    file.map((obj) => (
                      <span
                        className="bg-blue-400  text-white p-1 rounded-md"
                        key={obj.name + obj.size}
                      >
                        {" "}
                        {obj.name}{" "}
                      </span>
                    ))}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter category"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                rows={4} // Set the number of rows for the textarea
                placeholder="Enter description"
                required
              />
            </div>
            <div>
              <button
                onClick={handleUpload}
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                upload
              </button>
            </div>
            {/* <div className=" border-2 flex justify-center border-green-600 text-center text-white rounded">
            <div
              className=" bg-green-500"
              role="progressbar"
              aria-valuemax={0}
              aria-valuenow={uploadProgress}
              aria-valuemin={100}
              style={{ width: `${uploadProgress}%` }}
            >
              {`${uploadProgress}%`}
            </div>
          </div> */}
            {loading && (
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                      Upload Progress
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                      {uploadProgress == 100 && loading
                        ? "99%"
                        : `${uploadProgress.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
                <div className="flex mb-2 items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="w-full bg-teal-300 rounded-full h-2"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                    {/* <div
                    className={`w-full ${
                      loading ? "bg-blue-300" : "bg-teal-300"
                    } rounded-full h-2`}
                    style={{ width: `${uploadProgress}%` }}
                  ></div> */}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
        {/* <form>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4} // Set the number of rows for the textarea
            required
          />
        </div>
        <button type="submit" onClick={handleUpload}>
          Submit
        </button>
      </form> */}
      </section>
      <section className="w-[50%] flex-col h-screen flex items-center overflow-y-auto  p-4 ">
        <h2 className="text-2xl max-w-md p-4 py-2 underline underline-offset-8 mb-8 font-bold ">
          All versions
        </h2>
        {data &&
          data.map((temp, index) => (
            <>
              {true && (
                <div key={index} className="w-full all_img_container mb-4">
                  <h3 className="underline underline-offset-1 text-gray-600">
                    {temp.imgName}
                  </h3>
                  <ul className="flex gap-3 flex-col ">
                    {getImg(temp.imgName, temp.width, temp.height).map(
                      (obj, index) => {
                        return (
                          <li
                            key={index}
                            className="flex justify-around w-[80%] bg-blue-500  px-3 py-2 rounded text-white"
                          >
                            <span>{obj.quality} </span>
                            <span>{obj.folder.split("/")[1]} </span>
                            <a
                              className="text-sky-50 underline"
                              href={`${awsHost}/${obj.folder}/${obj.filename}`}
                              target="_blank"
                            >
                              view
                            </a>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              )}
            </>
          ))}
      </section>
    </section>
  );
};

export default page;
