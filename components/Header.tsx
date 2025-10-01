import React, { use } from 'react'
import { Button } from './ui/button'
import Search from '@/components/Search'

import { signOutUser } from '@/lib/actions/user.action'
import FileUploader from './FileUploader'

const Header = ({
  userId,accountId
}:{userId:string; accountId:string;}) => {
  return (
     <header className='header'>
       <Search/>
        <div className='header-wrapper'>
          <FileUploader ownerId={userId} accountId={accountId} ></FileUploader>
             <form action={async()=>{
               "use server";
               await signOutUser();
             }}>
              <Button
               type="submit" className="sign-out-button">
                  <img src="/assets/icons/logout.svg" alt="" width={24}  height={24}  className='w-6' />
              </Button>
             </form>
        </div>
     </header>
  )
}

export default Header