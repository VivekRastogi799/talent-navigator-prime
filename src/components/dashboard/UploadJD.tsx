// src/components/UploadJD.tsx
import React, { useState } from 'react'

const UploadJD = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return alert("No file selected")

    const formData = new FormData()
    formData.append('jd', file)

    const res = await fetch('/api/upload-jd', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) alert("Upload successful!")
    else alert("Upload failed!")
  }

  return (
    <div className="p-4 border rounded-lg w-fit mx-auto mt-6">
      <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleChange} />
      <button onClick={handleUpload}>Upload JD</button>

        Upload JD
      </button>
    </div>
  )
}

export default UploadJD
