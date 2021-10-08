


export async function getApi(endpoint){
    try {
        const res = await fetch(`http://localhost:3001${endpoint}`,{
            method: 'GET',
        })
        const json = await res.json()
        return json

    } catch (error) {
        console.log(error);
        return error
    }
}