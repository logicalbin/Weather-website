const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibG9naWNhbGJpbiIsImEiOiJja2toOW02emwxYjU2MnBxdDRmN216ZHI4In0.zm6hoWvAQ4lYf-HVwWuZ1w&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location. try another search',undefined)
        }
        else{
            const latlon=(body.features[0].center);
            //  console.log('lat= '+latlon[0]+' lon= '+latlon[1]);
            callback(undefined,{
                latitude:latlon[0],
                longitude:latlon[1],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports=geocode



