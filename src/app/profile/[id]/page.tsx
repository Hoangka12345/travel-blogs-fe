import Profile from "@/components/profile/profile.component";

export default async function ProfilePage({ params }: { params: { id: string } }) {
    return <Profile id={params.id} />;
}
