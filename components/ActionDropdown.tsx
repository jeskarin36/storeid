"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { actionsDropdownItems } from "@/constants";
import { constructDownloadUrl } from "@/lib/utils";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/file.action";
import { usePathname } from "next/navigation";
import { FileDetails,ShareInput } from "./ActionsModalContent";


const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [isLoading,setIsLoading]=useState(false)
  const [name,setName]=useState(file.name)
  const [emails,setEmails]=useState<string[]>([])
   const path= usePathname()

   const closeAllModalss=()=>{
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name)
   }

   const handleAction = async()=>{
      if(!action) return;
      setIsLoading(true);
      let success=false;

      const actions={
        rename:()=>renameFile({ fileId:file.$id,name,extension: file.extension,path
        }),
        share:()=>updateFileUsers({fileId:file.$id,emails,path}),
        delete:()=>deleteFile({fileId:file.$id,path,bucketFileId:file.bucketFileId})
      }

      success= await actions[action.value as keyof typeof actions]();

      if(success) closeAllModalss();
      setIsLoading(false)


   }


   const handleRemoveUser=async(email:string)=>{
       const updateEmails= emails.filter((e)=>e!==email);
       const success= await updateFileUsers({fileId:file.$id,emails,path})
   
       if(success) setEmails(updateEmails);
       closeAllModalss()

      }


  const renderDialogContent = () => {
    if(!action) return null;
    const {value,label}= action;
    return (
        <DialogContent className="shad-dialog button">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="text-center text-light-200">{label} </DialogTitle>
            
              {value ==="rename" &&  <Input type="text" value={name}  onChange={(e)=>setName(e.target.value)} />
              }   

              {
                value === "share" && (
                  <ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser}></ShareInput>
                )
              }
        
          {
            value=== "details" && <FileDetails file={file}></FileDetails>
          }



       {
        value === "delete" && (
          <p className="delete-confirmation">Are you sure you want to delete `${}` <span className="delete-file-name">{file.name} </span>? </p>
        )
       }

          </DialogHeader>
          {["rename","delete","share"].includes(value)&& (
            <DialogFooter className="flex flex-col gap-3">
                          <Button onClick={closeAllModalss} className="modal-cancel-button">
                            Cancel
                          </Button>
                          <Button onClick={handleAction} className="modal-submit-button">
                            <p className="capitalize">{value} 
                              {
                                isLoading && (
                                  <img src="/assets/icons/loader.svg" alt="" width={24} height={24} className="animate-spin"/>
                                )
                              } </p>
                          </Button>
            </DialogFooter>
          )}
        </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <img src="/assets/icons/dots.svg" alt="" width={34} height={34} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate ">
            {file.name}{" "}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);
                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <img src={actionItem.icon} alt="" width={30} height={30} />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <img src={actionItem.icon} alt="" width={30} height={30} />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
