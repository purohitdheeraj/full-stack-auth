export default async function ProfilePage({params}:any){
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Profile ID: {params.id}</p>
    </div>
  )
}