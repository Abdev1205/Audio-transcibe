import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"


const ProfileDropdown = ({ visblity }) => {
  if (!visblity) {
    return;
  }
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  const userName = session?.user.name
  return (
    <>

    </>
  )
}

export default ProfileDropdown
