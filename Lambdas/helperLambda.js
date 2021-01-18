exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from CORS handler!'), 
        headers: { 
            "Access-Control-Allow-Origin": "*" ,
            "Access-Control-Allow-Headers": "Authorization",
            "Access-Control-Allow-Methods": "*" 
        } 
    }; 
    return response; 
};