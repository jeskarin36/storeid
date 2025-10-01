"use client"
import { avatarPlaceholderUrl, navItems } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props{
  fullName:string,
  avatar:string,
  email:string
}

const Sidebar = ({fullName,avatar,email}:Props) => {

    const pathname= usePathname();

  return (
     <aside className='sidebar'>
      <Link href="/">
       <img src="/assets/icons/logo-full-brand.svg"
       width={160}
       height={50}
       className='hidden h-auto lg:block'
       alt="" />


     <img src="/assets/icons/logo-brand.svg"
       width={52}
       height={52}
       className='lg:hidden'
       alt="" />


      </Link>


     <nav className='sidebar-nav'>
      <ul className='flex flex-1 flex-col gap-6'>
          {
            navItems.map(({url,name,icon})=>
              
             <Link key={name} href={url} className='lg:w-full'>
                <li className={cn("sidebar-nav-item",pathname===url && "shad-active")}>
                  <img src={icon} alt={name} width={24} height={24} className={cn("nav-icon",pathname=== url && "nav-icon-active")} />
                  <p className='hidden lg:block'>{name} </p>
                </li>
              </Link>
            )
          }
      </ul>

     </nav>

      <img src="/assets/images/files-2.png" width={506} height={418} alt=""  className='w-full' />

    
    <div className='sidebar-user-info'>
        <img src={avatarPlaceholderUrl} alt="" width={44} height={44} className='sidebar-user-info' />
        <div className="hidden lg:block">
              <p className='subtitle-2 capitalize'>{fullName} </p>
                      <p className='caption'>{email} </p>
        </div>
    </div>

     
     </aside>
  )
}

export default Sidebar