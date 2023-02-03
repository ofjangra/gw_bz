import React from 'react'


const Dashboard = ({url, isMobile}) =>{
    return(
    <section  className="sheetFrame">
        <iframe  src={url} name="myFrame" style = {{marginTop: isMobile ? "24px" : "-100px"}}></iframe>
    </section>
    )
}

// "https://gaadiwalaonline.com/tc.php"


const TrafficEChallan = ({url, isMobile}) => {
    return(
        <>
            <section  className="sheetFrame">
        <iframe  src={url} name="myFrame" style = {{marginTop: isMobile ? "24px" : "-100px"}}></iframe>
    </section>
        </>
    )
}




const Forms = () => {
    return(
        <>
            <div className='blogFrame'>
                <iframe src = "https://gaadiwalaonline.com/rtoforms.php"/>
            </div>
        </>
    )
}



const RTOCircular = () => {
    return(
        <>
            <div className='blogFrame'>
                <iframe src = "https://gaadiwalaonline.com/parinoti.php"/>
            </div>
        </>
    )
}

export {Dashboard,  TrafficEChallan, Forms, RTOCircular}