import { Models } from "node-appwrite"
import Thumbnail from "./Thumbnail"
import FormattedDateTime from "./FormattedDateTime"
import { convertFileSize, formatDateTime } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

 
const ImageThumbnail =({file}:{file:Models.Document})=>(
     <div className="file-details-thumbnail">
     <Thumbnail type={file.type} extension={file.extension} url={file.url}></Thumbnail>
    <div className="flex flex-col">
       <p className="subtitle-2 mb-1">{file.name} </p>
     <FormattedDateTime date={file.$createdAt} className="caption">

     </FormattedDateTime>
    </div>
  </div>
)


const DetailRow=({label,value}:{label:string,value:string})=>(
    <div className="flex">
        <p className="file-details-label text-left">{label} </p>
        <p className="file-details-value text-left">{value} </p>

    </div>
)


export const FileDetails = ({file}:{file:Models.Document})=>{
    return (
        <>
    <ImageThumbnail file={file}/>
    <div className="space-y- px-2 pt-2">
         <DetailRow label="Format:" value={file.extension}></DetailRow>
    <DetailRow label="Size:" value={convertFileSize(file.size)}></DetailRow>
    <DetailRow label="Owner:" value={file.owner.fullName}></DetailRow>
    <DetailRow label="Last Edit:" value={formatDateTime(file.$updatedAt)}></DetailRow>
    </div>
    </>
    )
}

interface Props{
  file:Models.Document;
  onInputChange:React.Dispatch<React.SetStateAction<string[]>>;
  onRemove:(email:string)=>void;
}

export const ShareInput = ({file,onInputChange,onRemove}:Props) => {
  return (
    <>
    <ImageThumbnail file={file}></ImageThumbnail>
    <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100"> Share file with other users</p>
        <Input type="email" placeholder="Enter email address" onChange={(e)=>onInputChange(e.target.value.trim().split(",")) }  className="share-input-field"></Input>
        <div className="pt-4 ">
            <div className="pt-4">
                <div className="flex justify-between">
                   <p className="subtitle-2 text-light-100">Share with</p>
                                      <p className="subtitle-2 text-light-200">{file.users.lenght} Users </p>
                </div>
                
                <ul className="pt-2">
                    {
                        file.users.map((email:string)=>(
                            <li key={email} className="flex items-center justify-between gap-2">
                                <p className="subtitle-2">{email} </p>
                                <Button onClick={()=>onRemove(email)} className="share-remove-user">
                                    <img src="/assets/icons/remove.svg" width={24} height={24} alt=""  className="remove-icon"/>
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}