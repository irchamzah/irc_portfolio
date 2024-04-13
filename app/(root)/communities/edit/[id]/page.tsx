import CommunityProfile from "@/components/forms/CommunityProfile";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser, useOrganization } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);
  if (!communityDetails) return null;

  const communityAuthMemberId: any = communityDetails.members.find(
    (member: any) => member.id === user.id
  );

  if (communityAuthMemberId?.id !== user.id) redirect("/communities");

  const communityData = {
    id: user?.id,
    objectId: communityDetails?.id,
    username: communityDetails ? communityDetails?.username : user?.username,
    name: communityDetails ? communityDetails?.name : user?.firstName || "",
    bio: communityDetails ? communityDetails?.bio : "",
    image: communityDetails ? communityDetails?.image : user?.imageUrl,
  };

  return (
    <>
      <h1 className="head-text">Edit Community</h1>
      <p className="mt-3 text-base-regular text-light-2">Make any changes</p>
      <section className="mt-12">
        <CommunityProfile community={communityData} btnTitle="Save" />
      </section>
    </>
  );
}

export default Page;
