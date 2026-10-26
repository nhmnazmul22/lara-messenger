export const getImgUrl = (url : string)=>{
    let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

    if(!baseUrl){
        throw  new Error('BASE URL not found!')
    }

    if(baseUrl && baseUrl.includes('/api')){
        baseUrl = baseUrl.replace('/api', "/")
    }

    return `${baseUrl}storage/${url}`;
}