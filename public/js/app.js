console.log('client side js is loaded');
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message1')
const message2=document.querySelector('#message2')

// message1.textContent='From Javascript'



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message2.textContent=' '
    
    const location=search.value
    console.log(location)
    weatherForm.reset()
    message1.textContent='Loading.....'
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message1.textContent=' '
            message2.textContent='Error'
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
            message1.textContent=data.location
            message2.textContent=data.forecast
        }

    })
})
})







