"use client"
import{ useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-separator';
import { navItems } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import FileUploader from './FileUploader';
import { signOutUser } from '@/lib/actions/user.action';


interface Props{
  $id:string,
  accountId:string,
  fullName:string,
  avatar:string,
  email:string
}

const MobileNavigation = ({$id:ownerId,accountId,fullName,avatar,email}:Props) => {
 
  const [open,setOpen]=useState(false);
  const pathname= usePathname()

  return (
    <header className='mobile-header'>
      <img src="/assets/icons/logo-full-brand.svg" alt="" width={120} height={52} className='h-auto ' />
    <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>
    <img src="/assets/icons/menu.svg" alt="" width={30} height={30}/>
  </SheetTrigger>
  <SheetContent className='shad-sheet h-screen px-3'>
    <SheetHeader>
      <SheetTitle>
        <div className='header-user'>
          <img src={avatar}  alt="" width={44} height={44} className='header-user-avatar' />
         <div className='sm:hidden lg:block'>
            <p className='subtitle-2 capitalize'>{fullName} </p>
             <p className='caption'>{email} </p>
         </div>
        </div>
        <Separator className='mb-4 bg-light-200/20'></Separator>
      </SheetTitle>
      <nav className='mobile-nav'>
        <ul className='mobile-nav-list'>
           {
              navItems.map(({url,name,icon})=>
              
             <Link key={name} href={url} className='lg:w-full'>
                <li className={cn("mobile-nav-item",pathname===url && "shad-active")}>
                  <img src={icon} alt={name} width={24} height={24} className={cn("nav-icon",pathname=== url && "nav-icon-active")} />
                  <p >{name} </p>
                </li>
              </Link>
            )
           }

        </ul>

      </nav>
      <Separator className='my-5 bg-light-200/20'>
      <div className="flex flex-col justify-between gap-5 pb-5">
          <FileUploader ownerId={ownerId} accountId={accountId}></FileUploader>
              <Button
               type="submit" className="mobile-sign-out-button" onClick={async()=>{ await signOutUser}}>
                  <img src="/assets/icons/logout.svg" alt="" width={24}  height={24}  />
              <p>Logout</p>
              </Button>
       
      </div>
      </Separator>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </header>
  )
}

export default MobileNavigation