
const getLead = async (lid) => {
    try {   
        const res = await fetch(`${process.env.NEXT_PUBLIC_LOCALIVE_API_URL}/webform/api/lead/${lid}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch Data");
        }
        const resDatalist = res.json();
        return resDatalist;

    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};

const Leadget = async({lid}) => {
    const leadfetch = await getLead(lid);
    
  return (
    <>
        {leadfetch.data  ? (
        <div className="preview-data">   
            <h2>Here's your RestDB lead data ID:{lid} </h2>
            <h3><span>Fulname:</span> {leadfetch.data.fullname}</h3>
            <h3><span>Email:</span> {leadfetch?.data.email}</h3>
            <h3><span>Phone:</span> {leadfetch?.data.phone}</h3>
            <h3><span>Web Service:</span> {leadfetch?.data.webservice}</h3>
            <h3><span>Description:</span> {leadfetch?.data.desc}</h3>
            <h3><span>Lead Date Entry:</span> {leadfetch?.data.datelog}</h3>
            <h3><span>Website:</span> {leadfetch?.data.website}</h3>
        </div> 
    ): (
        <div>
            <h4>Your data is not found</h4>
        </div>
    )}

    </>
  )
}

export default Leadget
