import Profile from "@/app/profile/[id]/profile.component";

export default async function ProfilePage({ params }: { params: { id: string } }) {
    return <Profile id={params.id} />;
}
