import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
      <div className="flex justify-center items-start min-h-screen pt-24">
        <SignIn />
      </div>
    )
}