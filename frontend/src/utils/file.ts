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

export function formatFileSize(size: number) {
    if (size < 1024) {
        return `${size} B`;
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}