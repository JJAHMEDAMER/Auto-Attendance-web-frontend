import { Nav } from '../comp'
import { FiUpload } from "react-icons/fi"
import { BsImages } from "react-icons/bs"
// import { IoMdImages } from "react-icons/Io"
import { useEffect, useState, useContext } from 'react'
import { myFetchPost } from '../utils/myFetch'

// Router
import { Navigate } from "react-router-dom";

//context
import UserContext from '../utils/UserContext'

export const UploadImg = () => {
    const { token, setToken } = useContext(UserContext)
    console.log(typeof token)
    
    if (token === null) {
        return <Navigate to="/login" replace />;
    }

    const acceptableFileFormate = ".png, .jpeg, .jpg"
    const [dragActive, setDragActive] = useState(false)
    const [fileError, setFileError] = useState<"No Image is Selected" | "Wrong Formate (jpg, jpeg or pngs)" | "">("")
    const [fileSelected, setFileSelected] = useState<null | { name: string, size: number }>(null)

    function getImg(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        createFormData(e.target.files![0])
    }

    function handleDrag(e: React.DragEvent) {
        e.preventDefault();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else {
            setDragActive(false)
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false)
        createFormData(e.dataTransfer!.files[0])
    }

    function createFormData(inImg: null | File) {
        if (!inImg) {
            setFileError("No Image is Selected")
        }
        else if (!acceptableFileFormate.includes(inImg.name.split(".").at(-1)!)) {
            setFileError("Wrong Formate (jpg, jpeg or pngs)")
        }
        else {
            setFileSelected({ name: inImg.name, size: inImg.size })
            // const img = {
            //     preview: URL.createObjectURL(inImg),
            //     data: inImg,
            // }
            // let formData = new FormData()
            // formData.append('file', img.data)
            // uploadImage(formData)

            const fileReader = new FileReader()
            fileReader.onload = () => {
                const srcData = fileReader.result;
                // console.log('base64:', srcData)
                myFetchPost("imgs/", { image: srcData }, token)
            }
            fileReader.readAsDataURL(inImg);
        }
    }

    useEffect(() => {
        const time = setTimeout(() => {
            setFileError("")
        }, 2000)

        const time2 = setTimeout(() => {
            setFileSelected(null)
        }, 7000)
    }, [fileError, fileSelected])

    return (
        <div className="min-h-screen flex flex-col">
            <Nav />
            <div className='flex-grow flex flex-col justify-center items-center gap-3'>
                <p style={{ opacity: `${fileError ? "1" : "0"}` }} className='text-xs font-bold text-red-500 bg-red-500 px-3 py-1 border-red-500 rounded-md border bg-opacity-30'>Error: {fileError}</p>
                <label
                    onDragEnter={(e) => handleDrag(e)}
                    onDragOver={(e) => handleDrag(e)}
                    onDragLeave={(e) => handleDrag(e)}
                    onDrop={(e) => handleDrop(e)}
                    className={`h-72 w-2/3 lg:w-1/3 flex flex-col justify-center items-center gap-4 border-dashed border-sky-600 rounded-xl p-8 cursor-pointer bg-slate-800 border-2 ${dragActive ? "bg-slate-600 border-4" : ""}`}
                >
                    <BsImages size={120} />
                    {/* <IoMdImages size={120} /> */}
                    {
                        fileSelected
                            ? <p className='w-2/3 text-center text-gray-200'>File name: <span className='font-bold'>{fileSelected.name}</span> File size: <span className='font-bold'>{fileSelected.size}</span></p>
                            : <p className='w-2/3 text-center text-gray-200'>Darg your documents, photos, or images here to start uploading</p>
                    }
                    <input
                        type="file"
                        accept={acceptableFileFormate}
                        onChange={(e) => getImg(e)}
                    />
                </label>
                <div className='flex items-center gap-6'>
                    <div className='h-1 w-16 bg-slate-700 rounded-full' />
                    <p className='font-semibold'>OR</p>
                    <div className='h-1 w-16 bg-slate-700 rounded-full' />
                </div>
                <label className='flex items-center gap-2 bg-pink-500 px-8 py-2 rounded-full cursor-pointer'>
                    <FiUpload />Upload
                    <input
                        type="file"
                        accept={acceptableFileFormate}
                        onChange={(e) => getImg(e)}
                    />
                </label>
                <p className="mt-1 text-sm text-gray-500">PNG, JPG or JPEG.</p>
            </div>
        </div >
    )
}
