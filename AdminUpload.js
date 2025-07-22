import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image || !name || !price) {
      alert("Please fill all fields and choose an image.");
      return;
    }

    const storageRef = ref(storage, `products/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(prog);
      },
      (error) => {
        console.log(error);
        alert("Upload failed.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setUrl(downloadURL);
          try {
            await addDoc(collection(db, "products"), {
              name,
              price,
              imageUrl: downloadURL,
              timestamp: new Date()
            });
            alert("Product uploaded successfully!");
            setImage(null);
            setName('');
            setPrice('');
            setProgress(0);
          } catch (err) {
            console.error("Error adding document: ", err);
            alert("Failed to save product info.");
          }
        });
      }
    );
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        className="w-full border p-2 mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Price"
        className="w-full border p-2 mb-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input type="file" onChange={handleImageChange} />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Upload Product
      </button>
      <h3 className="mt-4">Upload Progress: {progress}%</h3>
      {url && (
        <div className="mt-4">
          <img src={url} alt="Uploaded" className="mt-2 w-full" />
        </div>
      )}
    </div>
  );
};

export default AdminUpload;
