// const uploadImgToCloudinary = async (file) => {
//   const uploadData = new FormData();
//   uploadData.append("file", file);
//   uploadData.append("upload_preset", "yekdqhpc");
//   uploadData.append("cloud_name", "dtkn9lef8");

//   try {
//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/dtkn9lef8/image/upload`,
//       {
//         method: "POST",
//         body: uploadData,
//       }
//     );

//     if (!res.ok) {
//       throw new Error(`Upload failed with status ${res.status}`);
//     }

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     return null;
//   }
// };

// export default uploadImgToCloudinary;



const uploadImgToCloudinary = async(file)=>{
    const uploadData=new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset","yekdqhpc");
    uploadData.append("cloud_name", "dtkn9lef8");

    const res=await fetch(
        "https://api.cloudinary.com/v1_1/dtkn9lef8/image/upload",
        {
            method: "post",
            body: uploadData
        }
    );

    const data=await res.json();
    return data;
}

export default uploadImgToCloudinary;