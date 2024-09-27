import {useRef, useState} from "react";

const FileUpload = ({ files, setFiles, handleCancel }) => {
    const fileRef = useRef();

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        event.target.value = "";
    };


    return(
        <div className={"file_upload"}>
            <input
                type="file"
                ref={fileRef}
                onChange={handleFileChange}
                multiple
            />
            <button
                className={"button"}
                onClick={() => {
                    if (fileRef.current) {
                        fileRef.current.click();
                    }
                }}
            >
                파일첨부
            </button>
            <div className={"file_list"}>
                {files?.length > 0 && (
                    <ul>
                        {files.map((file, index) => (
                            <li key={index} className={"file_item"}>
                                {file.name}
                                <button className={"button_cancel"} onClick={() => handleCancel(index)}>삭제</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default FileUpload
