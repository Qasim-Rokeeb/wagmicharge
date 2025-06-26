import { ProfileDetails } from "@/components/profile-details"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Profile Settings 👤</h1>
        <p className="text-lg text-muted-foreground">Manage your account settings and security</p>
      </div>

      <ProfileDetails />
    </div>
  )
}
