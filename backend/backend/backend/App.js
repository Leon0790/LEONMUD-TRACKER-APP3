async function payAccess(){

await fetch("http://localhost:5000/pay",{
method:"POST"
})

alert("Check your phone for M-Pesa prompt")

}
